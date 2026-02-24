import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    const { first_name, last_name, email, phone, enquiry_type, message } = body;

    if (!first_name || !last_name || !email || !phone || !enquiry_type) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: first_name, last_name, email, phone, enquiry_type" },
        { status: 400 }
      );
    }

    const validTypes = ["course", "general", "admission", "fees", "facilities", "other"];
    if (!validTypes.includes(enquiry_type)) {
      return NextResponse.json(
        { success: false, error: `Invalid enquiry_type. Must be one of: ${validTypes.join(", ")}` },
        { status: 400 }
      );
    }

    // Course-specific validation
    const { course_length, course_name } = body;
    if (enquiry_type === "course") {
      if (!course_length || !course_name) {
        return NextResponse.json(
          { success: false, error: "Course enquiries require course_length and course_name" },
          { status: 400 }
        );
      }
      if (!["long_term", "short_term"].includes(course_length)) {
        return NextResponse.json(
          { success: false, error: "course_length must be 'long_term' or 'short_term'" },
          { status: 400 }
        );
      }
    }

    const supabase = getSupabaseAdmin();

    // Upsert contact by email
    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .upsert(
        { first_name, last_name, email },
        { onConflict: "email" }
      )
      .select("id")
      .single();

    if (contactError || !contact) {
      console.error("Contact upsert error:", contactError);
      return NextResponse.json(
        { success: false, error: "Failed to create contact" },
        { status: 500 }
      );
    }

    // Insert enquiry
    const { error: enquiryError } = await supabase
      .from("enquiries")
      .insert({
        contact_id: contact.id,
        enquiry_type,
        enquiry_details: message || null,
        phone,
        course_length: enquiry_type === "course" ? course_length : null,
        course_name: enquiry_type === "course" ? course_name : null,
      });

    if (enquiryError) {
      console.error("Enquiry insert error:", enquiryError);
      return NextResponse.json(
        { success: false, error: "Failed to create enquiry" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
