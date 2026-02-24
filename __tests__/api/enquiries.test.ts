import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/enquiries/route";
import { getSupabaseAdmin } from "@/lib/supabase";

// Mock the entire supabase module — getSupabaseAdmin becomes a controllable vi.fn()
vi.mock("@/lib/supabase", () => ({
  getSupabaseAdmin: vi.fn(),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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
  course_length: "long_term",
  course_name: "Teacher Training",
};

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

/**
 * Sets up the Supabase mock for tests that reach the DB layer.
 * Returns the individual mock functions so tests can assert on call arguments.
 */
function setupSupabaseMock({
  contactData = { id: "contact-uuid" } as { id: string } | null,
  contactError = null as object | null,
  enquiryError = null as object | null,
} = {}) {
  const upsertFn = vi.fn();
  const selectFn = vi.fn();
  const singleFn = vi.fn().mockResolvedValue({ data: contactData, error: contactError });
  const insertFn = vi.fn().mockResolvedValue({ error: enquiryError });

  selectFn.mockReturnValue({ single: singleFn });
  upsertFn.mockReturnValue({ select: selectFn });

  vi.mocked(getSupabaseAdmin).mockReturnValue({
    from: vi.fn((table: string) => {
      if (table === "contacts") return { upsert: upsertFn };
      if (table === "enquiries") return { insert: insertFn };
      throw new Error(`Unexpected table: ${table}`);
    }),
  } as unknown as ReturnType<typeof getSupabaseAdmin>);

  return { upsertFn, selectFn, singleFn, insertFn };
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

  it("returns 400 for a course enquiry missing course_length", async () => {
    const { course_length: _, ...body } = validCourseBody;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("course_length");
  });

  it("returns 400 for a course enquiry missing course_name", async () => {
    const { course_name: _, ...body } = validCourseBody;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("course_name");
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

  it("sets course_length and course_name to null for non-course enquiries", async () => {
    const { insertFn } = setupSupabaseMock();
    await POST(makeRequest({ ...validContactBody, enquiry_type: "general" }));
    expect(insertFn).toHaveBeenCalledWith(
      expect.objectContaining({ course_length: null, course_name: null }),
    );
  });

  it("passes course_length and course_name through for course enquiries", async () => {
    const { insertFn } = setupSupabaseMock();
    await POST(makeRequest(validCourseBody));
    expect(insertFn).toHaveBeenCalledWith(
      expect.objectContaining({
        course_length: "long_term",
        course_name: "Teacher Training",
      }),
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
});
