import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { proxy } from "../proxy";

// Mock @supabase/ssr so we control what getUser() returns in each test
vi.mock("@supabase/ssr");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeRequest(path: string) {
  return new NextRequest(`http://localhost${path}`);
}

/** Make createServerClient return a client whose getUser resolves to the given user */
function mockUser(user: object | null) {
  vi.mocked(createServerClient).mockReturnValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user } }),
    },
  } as unknown as ReturnType<typeof createServerClient>);
}

const FAKE_USER = { id: "user-123", email: "admin@pewec.com" };

// ---------------------------------------------------------------------------
// Unauthenticated requests (getUser returns null)
// ---------------------------------------------------------------------------

describe("unauthenticated", () => {
  beforeEach(() => mockUser(null));

  it("redirects /admin to /admin/login", async () => {
    const res = await proxy(makeRequest("/admin"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("http://localhost/admin/login");
  });

  it("redirects /admin/course-enquiries to /admin/login", async () => {
    const res = await proxy(makeRequest("/admin/course-enquiries"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("http://localhost/admin/login");
  });

  it("returns 401 for /api/admin/stats", async () => {
    const res = await proxy(makeRequest("/api/admin/stats"));
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toBe("Unauthorized");
  });

  it("returns 401 for /api/admin/course-enquiries", async () => {
    const res = await proxy(makeRequest("/api/admin/course-enquiries"));
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toBe("Unauthorized");
  });

  it("allows /admin/login through (shows the login page)", async () => {
    const res = await proxy(makeRequest("/admin/login"));
    // NextResponse.next() — not a redirect, not an error
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Authenticated requests (getUser returns a real user)
// ---------------------------------------------------------------------------

describe("authenticated", () => {
  beforeEach(() => mockUser(FAKE_USER));

  it("allows /admin through", async () => {
    const res = await proxy(makeRequest("/admin"));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it("allows /admin/course-enquiries through", async () => {
    const res = await proxy(makeRequest("/admin/course-enquiries"));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it("allows /api/admin/stats through", async () => {
    const res = await proxy(makeRequest("/api/admin/stats"));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });

  it("redirects /admin/login to /admin (already logged in)", async () => {
    const res = await proxy(makeRequest("/admin/login"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("http://localhost/admin");
  });
});
