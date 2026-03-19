import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getSessionUser } from "@/lib/auth";
import { getImagePublicUrl } from "@/lib/storage";

// ---------------------------------------------------------------------------
// GET /api/admin/storage — list images in the email-creatives bucket
// ---------------------------------------------------------------------------

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.storage
      .from("email-creatives")
      .list("images", { limit: 100, sortBy: { column: "name", order: "asc" } });

    if (error) {
      console.error("Storage list error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to list images" },
        { status: 500 },
      );
    }

    const images = (data ?? [])
      .filter((file) => file.name !== ".emptyFolderPlaceholder" && file.id)
      .map((file) => ({
        name: file.name,
        url: getImagePublicUrl(file.name),
      }));

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
