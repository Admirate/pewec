import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getSessionUser } from "@/lib/auth";

const commaEmails = z
  .string()
  .max(500)
  .refine((val) => val.split(",").every((e) => z.string().email().safeParse(e.trim()).success), {
    message: "Each comma-separated value must be a valid email",
  });

// ---------------------------------------------------------------------------
// GET /api/admin/courses — list all courses (active and inactive)
// ---------------------------------------------------------------------------

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("type", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      console.error("Courses fetch error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch courses" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// POST /api/admin/courses — create a new course
// ---------------------------------------------------------------------------

const CourseCreateSchema = z.object({
  name: z.string().min(1).max(200),
  type: z.enum(["long_term", "short_term"]),
  description: z.string().max(2000).optional().nullable(),
  image: z.string().max(2000).optional().nullable(),
  bullet_points: z.array(z.string()).optional().nullable(),
  rep_email: commaEmails,
  is_active: z.boolean().default(true),
});

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = CourseCreateSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
      return NextResponse.json({ success: false, error: errors }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from("courses").insert(result.data).select("*").single();

    if (error) {
      console.error("Course insert error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to create course" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// PATCH /api/admin/courses — update an existing course
// ---------------------------------------------------------------------------

const CourseUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  type: z.enum(["long_term", "short_term"]).optional(),
  description: z.string().max(2000).optional().nullable(),
  image: z.string().max(2000).optional().nullable(),
  bullet_points: z.array(z.string()).optional().nullable(),
  rep_email: commaEmails.optional(),
  is_active: z.boolean().optional(),
});

export async function PATCH(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = CourseUpdateSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
      return NextResponse.json({ success: false, error: errors }, { status: 400 });
    }

    const { id, ...updates } = result.data;

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("courses")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Course update error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to update course" },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
