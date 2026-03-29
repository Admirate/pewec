import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getSessionUser } from "@/lib/auth";

// ---------------------------------------------------------------------------
// GET /api/admin/events — list all events (published and unpublished)
// ---------------------------------------------------------------------------

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Events fetch error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch events" },
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
// POST /api/admin/events — create a new event
// ---------------------------------------------------------------------------

const eventDateField = z.preprocess(
  (val) => (!val || val === "" ? null : val),
  z.string().nullable(),
);

const EventCreateSchema = z.object({
  title: z.string().min(1).max(200),
  category: z.string().max(100).optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  image: z.string().max(2000).optional().nullable(),
  event_date: eventDateField,
  is_published: z.boolean().default(true),
});

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = EventCreateSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
      return NextResponse.json({ success: false, error: errors }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("events")
      .insert(result.data)
      .select("*")
      .single();

    if (error) {
      console.error("Event insert error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to create event" },
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
// PATCH /api/admin/events — update an existing event
// ---------------------------------------------------------------------------

const EventUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  category: z.string().max(100).optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  image: z.string().max(2000).optional().nullable(),
  event_date: eventDateField.optional(),
  is_published: z.boolean().optional(),
});

export async function PATCH(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = EventUpdateSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
      return NextResponse.json({ success: false, error: errors }, { status: 400 });
    }

    const { id, ...updates } = result.data;

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("events")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Event update error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to update event" },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
