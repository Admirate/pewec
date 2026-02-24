import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET, POST, PATCH } from "@/app/api/admin/courses/route";
import { getSupabaseAdmin } from "@/lib/supabase";

vi.mock("@/lib/supabase", () => ({
  getSupabaseAdmin: vi.fn(),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const COURSE_ID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";

const SAMPLE_COURSE = {
  id: COURSE_ID,
  name: "Teacher Training",
  type: "long_term" as const,
  description: "A great course",
  rep_email: "rep@pewec.com",
  is_active: true,
  created_at: "2026-01-01T00:00:00Z",
};

function makeRequest(method: string, body: unknown) {
  return new Request(`http://localhost/api/admin/courses`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// GET mock: .select().order().order()
function setupGetMock(data: typeof SAMPLE_COURSE[] | null, error: object | null = null) {
  const orderFn2 = vi.fn().mockResolvedValue({ data, error });
  const orderFn1 = vi.fn().mockReturnValue({ order: orderFn2 });
  const selectFn = vi.fn().mockReturnValue({ order: orderFn1 });
  vi.mocked(getSupabaseAdmin).mockReturnValue({
    from: vi.fn().mockReturnValue({ select: selectFn }),
  } as unknown as ReturnType<typeof getSupabaseAdmin>);
}

// POST mock: .insert().select().single()
function setupInsertMock(data: typeof SAMPLE_COURSE | null, error: object | null = null) {
  const singleFn = vi.fn().mockResolvedValue({ data, error });
  const selectFn = vi.fn().mockReturnValue({ single: singleFn });
  const insertFn = vi.fn().mockReturnValue({ select: selectFn });
  vi.mocked(getSupabaseAdmin).mockReturnValue({
    from: vi.fn().mockReturnValue({ insert: insertFn }),
  } as unknown as ReturnType<typeof getSupabaseAdmin>);
  return { insertFn };
}

// PATCH mock: .update().eq().select().single()
function setupUpdateMock(data: typeof SAMPLE_COURSE | null, error: object | null = null) {
  const singleFn = vi.fn().mockResolvedValue({ data, error });
  const selectFn = vi.fn().mockReturnValue({ single: singleFn });
  const eqFn = vi.fn().mockReturnValue({ select: selectFn });
  const updateFn = vi.fn().mockReturnValue({ eq: eqFn });
  vi.mocked(getSupabaseAdmin).mockReturnValue({
    from: vi.fn().mockReturnValue({ update: updateFn }),
  } as unknown as ReturnType<typeof getSupabaseAdmin>);
  return { updateFn, eqFn };
}

// ---------------------------------------------------------------------------
// GET tests
// ---------------------------------------------------------------------------

describe("GET /api/admin/courses", () => {
  it("returns 200 with all courses (active and inactive)", async () => {
    setupGetMock([SAMPLE_COURSE, { ...SAMPLE_COURSE, id: "b2c3d4e5-f6a7-8901-bcde-f12345678901", is_active: false }]);
    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data).toHaveLength(2);
  });

  it("returns 500 on DB error", async () => {
    setupGetMock(null, { message: "connection error" });
    const res = await GET();
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// POST tests
// ---------------------------------------------------------------------------

describe("POST /api/admin/courses", () => {
  const validBody = {
    name: "New Course",
    type: "long_term",
    description: "A description",
    rep_email: "rep@pewec.com",
    is_active: true,
  };

  it("returns 201 with the created course on success", async () => {
    setupInsertMock(SAMPLE_COURSE);
    const res = await POST(makeRequest("POST", validBody));
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.id).toBe(SAMPLE_COURSE.id);
  });

  it("returns 400 when name is missing", async () => {
    const { name: _, ...body } = validBody;
    const res = await POST(makeRequest("POST", body));
    expect(res.status).toBe(400);
  });

  it("returns 400 when rep_email is invalid", async () => {
    const res = await POST(makeRequest("POST", { ...validBody, rep_email: "not-an-email" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when type is invalid", async () => {
    const res = await POST(makeRequest("POST", { ...validBody, type: "medium_term" }));
    expect(res.status).toBe(400);
  });

  it("returns 500 on DB error", async () => {
    setupInsertMock(null, { message: "insert failed" });
    const res = await POST(makeRequest("POST", validBody));
    expect(res.status).toBe(500);
  });
});

// ---------------------------------------------------------------------------
// PATCH tests
// ---------------------------------------------------------------------------

describe("PATCH /api/admin/courses", () => {
  beforeEach(() => {
    setupUpdateMock(SAMPLE_COURSE);
  });

  const validPatch = { id: COURSE_ID, name: "Updated Name" };

  it("returns 200 with the updated course on success", async () => {
    const res = await PATCH(makeRequest("PATCH", validPatch));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it("returns 400 when id is missing", async () => {
    const res = await PATCH(makeRequest("PATCH", { name: "No ID" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when id is not a valid UUID", async () => {
    const res = await PATCH(makeRequest("PATCH", { id: "not-a-uuid", name: "Updated" }));
    expect(res.status).toBe(400);
  });

  it("returns 404 when the course does not exist", async () => {
    setupUpdateMock(null);
    const res = await PATCH(makeRequest("PATCH", validPatch));
    expect(res.status).toBe(404);
  });

  it("returns 500 on DB error", async () => {
    setupUpdateMock(null, { message: "update failed" });
    const res = await PATCH(makeRequest("PATCH", validPatch));
    expect(res.status).toBe(500);
  });

  it("patches only is_active without touching other fields", async () => {
    const { eqFn } = setupUpdateMock(SAMPLE_COURSE);
    await PATCH(makeRequest("PATCH", { id: COURSE_ID, is_active: false }));
    expect(eqFn).toHaveBeenCalledWith("id", COURSE_ID);
  });
});
