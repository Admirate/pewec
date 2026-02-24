import { describe, it, expect, vi } from "vitest";
import { GET } from "@/app/api/courses/route";
import { supabase } from "@/lib/supabase";

// The public courses route uses the browser `supabase` client directly
vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
  // getSupabaseAdmin is not used by this route but must be present to avoid
  // "No export" errors if other modules import it
  getSupabaseAdmin: vi.fn(),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ACTIVE_COURSES = [
  { id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", name: "Teacher Training", type: "long_term" },
  { id: "b2c3d4e5-f6a7-8901-bcde-f12345678901", name: "Computer Basics", type: "short_term" },
];

function setupMock(data: typeof ACTIVE_COURSES | null, error: object | null = null) {
  const orderFn2 = vi.fn().mockResolvedValue({ data, error });
  const orderFn1 = vi.fn().mockReturnValue({ order: orderFn2 });
  const eqFn = vi.fn().mockReturnValue({ order: orderFn1 });
  const selectFn = vi.fn().mockReturnValue({ eq: eqFn });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vi.mocked(supabase.from).mockReturnValue({ select: selectFn } as any);
  return { eqFn };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("GET /api/courses", () => {
  it("returns 200 with the courses list on success", async () => {
    setupMock(ACTIVE_COURSES);
    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.data).toHaveLength(2);
  });

  it("filters to only active courses (is_active = true)", async () => {
    const { eqFn } = setupMock(ACTIVE_COURSES);
    await GET();
    // The route calls .eq("is_active", true)
    expect(eqFn).toHaveBeenCalledWith("is_active", true);
  });

  it("returns 500 when Supabase returns an error", async () => {
    setupMock(null, { message: "connection error" });
    const res = await GET();
    expect(res.status).toBe(500);
  });
});
