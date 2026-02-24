import { NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import {
  courseEnquiryEmailTemplate,
  contactEnquiryEmailTemplate,
  repNotificationEmailTemplate,
  EMAIL_SUBJECTS,
} from "@/lib/email-templates";

const sanitize = (val: string) =>
  sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} }).trim();

const plainText = (max: number) => z.string().transform(sanitize).pipe(z.string().min(1).max(max));

const optionalText = (max: number) =>
  z.preprocess(
    (val) => (val === "" || val == null ? undefined : val),
    z.string().transform(sanitize).pipe(z.string().max(max)).optional(),
  );

const EnquirySchema = z
  .object({
    first_name: plainText(100).pipe(
      z.string().regex(/^[A-Za-z]+( [A-Za-z]+)*$/, "first_name must contain only letters and single spaces"),
    ),
    last_name: plainText(100).pipe(
      z.string().regex(/^[A-Za-z]+( [A-Za-z]+)*$/, "last_name must contain only letters and single spaces"),
    ),
    email: z
      .string()
      .transform((val) => val.trim().toLowerCase())
      .pipe(z.string().email("Invalid email address").max(254)),
    phone: z
      .string()
      .transform((val) => val.replace(/\D/g, ""))
      .pipe(z.string().regex(/^[0-9]{10}$/, "Phone must be exactly 10 digits")),
    enquiry_type: z.enum(["course", "general", "admission", "fees", "facilities", "other"]),
    message: optionalText(2000),
    course_id: z.string().uuid().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.enquiry_type === "course" && !data.course_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["course_id"],
        message: "Required for course enquiries",
      });
    }
  });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = EnquirySchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
      return NextResponse.json({ success: false, error: errors }, { status: 400 });
    }

    const { first_name, last_name, email, phone, enquiry_type, message, course_id } = result.data;

    const supabase = getSupabaseAdmin();

    // Upsert contact by email
    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .upsert({ first_name, last_name, email }, { onConflict: "email" })
      .select("id")
      .single();

    if (contactError || !contact) {
      console.error("Contact upsert error:", contactError);
      return NextResponse.json({ success: false, error: "Failed to create contact" }, { status: 500 });
    }

    // For course enquiries look up the course record to get name/description/rep_email
    let courseName: string | null = null;
    let courseDescription: string | null = null;
    let repEmail: string | null = null;

    if (enquiry_type === "course" && course_id) {
      const { data: course, error: courseError } = await supabase
        .from("courses")
        .select("name, description, rep_email")
        .eq("id", course_id)
        .single();

      if (courseError || !course) {
        return NextResponse.json({ success: false, error: "Course not found" }, { status: 400 });
      }

      courseName = course.name;
      courseDescription = course.description;
      repEmail = course.rep_email;
    }

    // Insert enquiry
    const { error: enquiryError } = await supabase.from("enquiries").insert({
      contact_id: contact.id,
      enquiry_type,
      enquiry_details: message ?? null,
      phone,
      course_id: enquiry_type === "course" ? course_id : null,
      course_name: enquiry_type === "course" ? courseName : null,
    });

    if (enquiryError) {
      console.error("Enquiry insert error:", enquiryError);
      return NextResponse.json({ success: false, error: "Failed to create enquiry" }, { status: 500 });
    }

    // Send emails — soft-fail, errors logged inside sendEmail
    if (enquiry_type === "course" && courseName) {
      await Promise.all([
        // Confirmation to requester
        sendEmail(
          email,
          EMAIL_SUBJECTS.courseEnquiry,
          courseEnquiryEmailTemplate({
            name: `${first_name} ${last_name}`,
            email,
            course_name: courseName,
            course_description: courseDescription,
          }),
        ),
        // Notification to course rep
        repEmail
          ? sendEmail(
              repEmail,
              EMAIL_SUBJECTS.repNotification(courseName),
              repNotificationEmailTemplate({
                first_name,
                last_name,
                email,
                phone,
                course_name: courseName,
                message: message ?? null,
              }),
            )
          : Promise.resolve(),
      ]);
    } else {
      // Confirmation for contact/general enquiry
      await sendEmail(
        email,
        EMAIL_SUBJECTS.contactEnquiry,
        contactEnquiryEmailTemplate({ first_name, last_name, email, enquiry_type }),
      );
    }

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully" });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
