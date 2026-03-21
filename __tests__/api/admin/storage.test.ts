import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/admin/storage/route";
import { POST } from "@/app/api/admin/storage/upload/route";
import { getSupabaseAdmin } from "@/lib/supabase";

vi.mock("@/lib/supabase", () => ({
  getSupabaseAdmin: vi.fn(),
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({ getAll: () => [], set: vi.fn() }),
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: "test-user" } } }),
    },
  })),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function setupListMock(data: { name: string; id: string }[] | null, error: object | null = null) {
  const listFn = vi.fn().mockResolvedValue({ data, error });
  vi.mocked(getSupabaseAdmin).mockReturnValue({
    storage: { from: vi.fn().mockReturnValue({ list: listFn }) },
  } as unknown as ReturnType<typeof getSupabaseAdmin>);
  return { listFn };
}

function setupUploadMock(error: object | null = null) {
  const uploadFn = vi.fn().mockResolvedValue({ data: { path: "images/test.png" }, error });
  vi.mocked(getSupabaseAdmin).mockReturnValue({
    storage: { from: vi.fn().mockReturnValue({ upload: uploadFn }) },
  } as unknown as ReturnType<typeof getSupabaseAdmin>);
  return { uploadFn };
}

function makeUploadRequest(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return new Request("http://localhost/api/admin/storage/upload", {
    method: "POST",
    body: formData,
  });
}

// ---------------------------------------------------------------------------
// GET /api/admin/storage
// ---------------------------------------------------------------------------

describe("GET /api/admin/storage", () => {
  it("returns image list on success", async () => {
    setupListMock([
      { name: "1.png", id: "abc" },
      { name: "2.jpg", id: "def" },
    ]);
    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data).toHaveLength(2);
    expect(json.data[0]).toHaveProperty("name", "1.png");
    expect(json.data[0]).toHaveProperty("url");
  });

  it("filters out .emptyFolderPlaceholder", async () => {
    setupListMock([
      { name: ".emptyFolderPlaceholder", id: "x" },
      { name: "real.png", id: "y" },
    ]);
    const res = await GET();
    const json = await res.json();
    expect(json.data).toHaveLength(1);
    expect(json.data[0].name).toBe("real.png");
  });

  it("returns 500 on storage error", async () => {
    setupListMock(null, { message: "storage error" });
    const res = await GET();
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// POST /api/admin/storage/upload
// ---------------------------------------------------------------------------

describe("POST /api/admin/storage/upload", () => {
  beforeEach(() => {
    setupUploadMock();
  });

  it("returns URL on successful upload", async () => {
    const file = new File(["hello"], "test.png", { type: "image/png" });
    const res = await POST(makeUploadRequest(file));
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data).toHaveProperty("name");
    expect(json.data).toHaveProperty("url");
  });

  it("returns 400 for invalid file type", async () => {
    const file = new File(["hello"], "test.txt", { type: "text/plain" });
    const res = await POST(makeUploadRequest(file));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("Invalid file type");
  });

  it("returns 400 for oversized file", async () => {
    const bigContent = new Uint8Array(6 * 1024 * 1024); // 6 MB
    const file = new File([bigContent], "big.png", { type: "image/png" });
    const res = await POST(makeUploadRequest(file));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("5 MB");
  });

  it("returns 400 when no file is provided", async () => {
    const req = new Request("http://localhost/api/admin/storage/upload", {
      method: "POST",
      body: new FormData(),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("No file");
  });

  it("returns 500 on storage upload error", async () => {
    setupUploadMock({ message: "upload failed" });
    const file = new File(["hello"], "test.png", { type: "image/png" });
    const res = await POST(makeUploadRequest(file));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.success).toBe(false);
  });
});
