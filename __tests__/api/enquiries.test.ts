import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/enquiries/route";
import { getSupabaseAdmin } from "@/lib/supabase";

// Mock the entire supabase module — getSupabaseAdmin becomes a controllable vi.fn()
vi.mock("@/lib/supabase", () => ({
  getSupabaseAdmin: vi.fn(),
}));

// Mock the email module so tests never attempt real SMTP/Resend connections
vi.mock("@/lib/email", () => ({
  sendEmail: vi.fn().mockResolvedValue(undefined),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const COURSE_UUID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";

const validContactBody = {
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  phone: "9876543210",
  enquiry_type: "general",
  message: "Hello there",
};

const validCourseBody = {
  ...validContactBody,
  enquiry_type: "course",
  course_id: COURSE_UUID,
};

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

type SupabaseMockOptions = {
  contactData?: { id: string } | null;
  contactError?: object | null;
  courseData?: { name: string; description: string | null; rep_email: string | null } | null;
  courseError?: object | null;
  enquiryError?: object | null;
};

/**
 * Sets up the Supabase mock for tests that reach the DB layer.
 * Returns the individual mock functions so tests can assert on call arguments.
 */
function setupSupabaseMock({
  contactData = { id: "contact-uuid" },
  contactError = null,
  courseData = { name: "Teacher Training", description: "A great course", rep_email: "rep@pewec.com" },
  courseError = null,
  enquiryError = null,
}: SupabaseMockOptions = {}) {
  // contacts chain: .upsert().select().single()
  const contactSingleFn = vi.fn().mockResolvedValue({ data: contactData, error: contactError });
  const contactSelectFn = vi.fn().mockReturnValue({ single: contactSingleFn });
  const upsertFn = vi.fn().mockReturnValue({ select: contactSelectFn });

  // courses chain: .select().eq().single()
  const courseSingleFn = vi.fn().mockResolvedValue({ data: courseData, error: courseError });
  const courseEqFn = vi.fn().mockReturnValue({ single: courseSingleFn });
  const courseSelectFn = vi.fn().mockReturnValue({ eq: courseEqFn });

  // enquiries chain: .insert()
  const insertFn = vi.fn().mockResolvedValue({ error: enquiryError });

  vi.mocked(getSupabaseAdmin).mockReturnValue({
    from: vi.fn((table: string) => {
      if (table === "contacts") return { upsert: upsertFn };
      if (table === "courses") return { select: courseSelectFn };
      if (table === "enquiries") return { insert: insertFn };
      throw new Error(`Unexpected table: ${table}`);
    }),
  } as unknown as ReturnType<typeof getSupabaseAdmin>);

  return { upsertFn, insertFn, courseSelectFn, courseEqFn };
}

// ---------------------------------------------------------------------------
// Validation — these all fail before any DB call is made
// ---------------------------------------------------------------------------

describe("validation", () => {
  it("returns 400 when body is empty", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.error).toBeTruthy();
  });

  it("returns 400 for an invalid email", async () => {
    const res = await POST(makeRequest({ ...validContactBody, email: "not-an-email" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
  });

  it("returns 400 for a phone with fewer than 10 digits", async () => {
    const res = await POST(makeRequest({ ...validContactBody, phone: "12345" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for a phone with more than 10 digits", async () => {
    const res = await POST(makeRequest({ ...validContactBody, phone: "123456789012" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when first_name contains numbers", async () => {
    const res = await POST(makeRequest({ ...validContactBody, first_name: "John99" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when last_name contains numbers", async () => {
    const res = await POST(makeRequest({ ...validContactBody, last_name: "Doe42" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for an unrecognised enquiry_type", async () => {
    const res = await POST(makeRequest({ ...validContactBody, enquiry_type: "unknown" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for a course enquiry missing course_id", async () => {
    const { course_id: _, ...body } = validCourseBody;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("course_id");
  });

  it("returns 400 for a course enquiry with a non-UUID course_id", async () => {
    const res = await POST(makeRequest({ ...validCourseBody, course_id: "not-a-uuid" }));
    expect(res.status).toBe(400);
  });
});

// ---------------------------------------------------------------------------
// Data transformation — verify sanitisation and mapping before DB writes
// ---------------------------------------------------------------------------

describe("data transformation", () => {
  it("strips non-digit characters from phone before validating", async () => {
    // "987-654-3210" → strip non-digits → "9876543210" (10 digits, valid)
    setupSupabaseMock();
    const res = await POST(makeRequest({ ...validContactBody, phone: "987-654-3210" }));
    expect(res.status).toBe(200);
  });

  it("lowercases and trims email before writing to contacts", async () => {
    const { upsertFn } = setupSupabaseMock();
    await POST(makeRequest({ ...validContactBody, email: "  JOHN@EXAMPLE.COM  " }));
    expect(upsertFn).toHaveBeenCalledWith(
      expect.objectContaining({ email: "john@example.com" }),
      expect.any(Object),
    );
  });

  it("strips HTML tags from the message field", async () => {
    const { insertFn } = setupSupabaseMock();
    await POST(
      makeRequest({
        ...validContactBody,
        message: '<script>alert("xss")</script>Hello',
      }),
    );
    expect(insertFn).toHaveBeenCalledWith(expect.objectContaining({ enquiry_details: "Hello" }));
  });

  it("sets course_id to null for non-course enquiries", async () => {
    const { insertFn } = setupSupabaseMock();
    await POST(makeRequest({ ...validContactBody, enquiry_type: "general" }));
    expect(insertFn).toHaveBeenCalledWith(
      expect.objectContaining({ course_id: null }),
    );
  });

  it("passes course_id through for course enquiries", async () => {
    const { insertFn } = setupSupabaseMock();
    await POST(makeRequest(validCourseBody));
    expect(insertFn).toHaveBeenCalledWith(
      expect.objectContaining({ course_id: COURSE_UUID }),
    );
  });
});

// ---------------------------------------------------------------------------
// Happy path
// ---------------------------------------------------------------------------

describe("happy path", () => {
  beforeEach(() => {
    setupSupabaseMock();
  });

  it("returns 200 with success:true for a valid general enquiry", async () => {
    const res = await POST(makeRequest(validContactBody));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("returns 200 with success:true for a valid course enquiry", async () => {
    const res = await POST(makeRequest(validCourseBody));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("uses the contact id returned from upsert when inserting the enquiry", async () => {
    const { insertFn } = setupSupabaseMock({ contactData: { id: "abc-123" } });
    await POST(makeRequest(validContactBody));
    expect(insertFn).toHaveBeenCalledWith(expect.objectContaining({ contact_id: "abc-123" }));
  });
});

// ---------------------------------------------------------------------------
// Database errors
// ---------------------------------------------------------------------------

describe("database errors", () => {
  it("returns 500 with 'Failed to create contact' when the contact upsert fails", async () => {
    setupSupabaseMock({ contactData: null, contactError: { message: "unique violation" } });
    const res = await POST(makeRequest(validContactBody));
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.error).toBe("Failed to create contact");
  });

  it("returns 500 with 'Failed to create enquiry' when the enquiry insert fails", async () => {
    setupSupabaseMock({ enquiryError: { message: "foreign key violation" } });
    const res = await POST(makeRequest(validContactBody));
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.error).toBe("Failed to create enquiry");
  });

  it("returns 400 when course_id is not found in DB", async () => {
    setupSupabaseMock({ courseData: null, courseError: { message: "not found" } });
    const res = await POST(makeRequest(validCourseBody));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Course not found");
  });
});
