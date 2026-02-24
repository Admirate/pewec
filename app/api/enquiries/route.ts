import { NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

const sanitize = (val: string) =>
  sanitizeHtml(val, { allowedTags: [], allowedAttributes: {} }).trim();

// Required plain-text field: sanitize, trim, enforce non-empty and max length
const plainText = (max: number) => z.string().transform(sanitize).pipe(z.string().min(1).max(max));

// Optional plain-text field: empty/null/undefined → absent; otherwise sanitize and cap length
// z.preprocess is needed because .optional() only skips undefined, not ""
const optionalText = (max: number) =>
  z.preprocess(
    (val) => (val === "" || val == null ? undefined : val),
    z.string().transform(sanitize).pipe(z.string().max(max)).optional(),
  );

const EnquirySchema = z
  .object({
    first_name: plainText(100).pipe(
      z
        .string()
        .regex(
          /^[A-Za-z]+( [A-Za-z]+)*$/,
          "first_name must contain only letters and single spaces",
        ),
    ),
    last_name: plainText(100).pipe(
      z
        .string()
        .regex(/^[A-Za-z]+( [A-Za-z]+)*$/, "last_name must contain only letters and single spaces"),
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
    course_length: z.enum(["long_term", "short_term"]).optional(),
    course_name: optionalText(200),
  })
  .superRefine((data, ctx) => {
    if (data.enquiry_type === "course") {
      if (!data.course_length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["course_length"],
          message: "Required for course enquiries",
        });
      }
      if (!data.course_name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["course_name"],
          message: "Required for course enquiries",
        });
      }
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

    const {
      first_name,
      last_name,
      email,
      phone,
      enquiry_type,
      message,
      course_length,
      course_name,
    } = result.data;

    const supabase = getSupabaseAdmin();

    // Upsert contact by email
    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .upsert({ first_name, last_name, email }, { onConflict: "email" })
      .select("id")
      .single();

    if (contactError || !contact) {
      console.error("Contact upsert error:", contactError);
      return NextResponse.json(
        { success: false, error: "Failed to create contact" },
        { status: 500 },
      );
    }

    // Insert enquiry
    const { error: enquiryError } = await supabase.from("enquiries").insert({
      contact_id: contact.id,
      enquiry_type,
      enquiry_details: message ?? null,
      phone,
      course_length: enquiry_type === "course" ? course_length : null,
      course_name: enquiry_type === "course" ? course_name : null,
    });

    if (enquiryError) {
      console.error("Enquiry insert error:", enquiryError);
      return NextResponse.json(
        { success: false, error: "Failed to create enquiry" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully" });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
