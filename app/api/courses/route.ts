import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("courses")
    .select("id, name, type")
    .eq("is_active", true)
    .order("type")
    .order("name");

  if (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }

  return NextResponse.json({ data });
}
