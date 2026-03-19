import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

async function getSessionUser() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        },
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

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

    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const images = (data ?? [])
      .filter((file) => file.name !== ".emptyFolderPlaceholder" && file.id)
      .map((file) => ({
        name: file.name,
        url: `${baseUrl}/storage/v1/object/public/email-creatives/images/${file.name}`,
      }));

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
