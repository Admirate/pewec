# Local Supabase + Form Submission Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Wire up both frontend forms to persist data in a local Supabase database via a single RESTful API endpoint.

**Architecture:** Two Postgres tables (contacts + enquiries) behind one Next.js API route (`/api/enquiries`). Both forms POST to the same endpoint. Contact records are deduplicated by email via upsert. Local Supabase runs via Docker through the Supabase CLI.

**Tech Stack:** Next.js 16 App Router, Supabase (local via CLI), PostgreSQL, TypeScript, pnpm

**Note:** No test suite is configured for this project. Verification is done via `pnpm build` (type checking) and manual smoke tests through the browser forms + Supabase Studio.

---

### Task 1: Add Supabase temp files to .gitignore

**Files:**

- Modify: `.gitignore`

**Step 1: Add supabase local dev entries to .gitignore**

Add these lines to the end of `.gitignore`:

```
# supabase local dev
supabase/.branches
supabase/.temp
```

**Step 2: Commit**

```bash
but commit <branch> -c -m "chore: gitignore supabase local dev artifacts" --changes <gitignore-id> --json --status-after
```

---

### Task 2: Initialize local Supabase project

The `supabase/` directory exists but has no `config.toml`. We need to initialize properly.

**Step 1: Remove the empty supabase directory and re-init**

```bash
rm -rf supabase/
supabase init
```

This creates `supabase/config.toml` with default settings.

**Step 2: Verify config.toml was created**

```bash
ls supabase/config.toml
```

Expected: file exists.

**Step 3: Commit**

```bash
but commit <branch> -c -m "chore: initialize supabase project config" --changes <config-id> --json --status-after
```

---

### Task 3: Create database migration

**Files:**

- Create: `supabase/migrations/<timestamp>_create_contacts_and_enquiries.sql`

**Step 1: Generate a migration file**

```bash
supabase migration new create_contacts_and_enquiries
```

This creates a timestamped file in `supabase/migrations/`.

**Step 2: Write the migration SQL**

Write this exact SQL into the generated migration file:

```sql
-- contacts: the person, deduplicated by email
CREATE TABLE contacts (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name  text        NOT NULL,
  last_name   text        NOT NULL,
  email       text        NOT NULL UNIQUE,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- enquiries: each interaction, linked to a contact
CREATE TABLE enquiries (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id       uuid        NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  enquiry_type     text        NOT NULL CHECK (enquiry_type IN ('course', 'general', 'admission', 'fees', 'facilities', 'other')),
  enquiry_details  text,
  phone            text,
  course_length    text        CHECK (course_length IN ('long_term', 'short_term') OR course_length IS NULL),
  course_name      text,
  is_read          boolean     NOT NULL DEFAULT false,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- index for querying all enquiries for a given contact
CREATE INDEX idx_enquiries_contact_id ON enquiries(contact_id);
```

**Step 3: Commit**

```bash
but commit <branch> -c -m "feat: add migration for contacts and enquiries tables" --changes <migration-id> --json --status-after
```

---

### Task 4: Start local Supabase and update .env

**Step 1: Start local Supabase**

```bash
supabase start
```

This spins up Postgres, Auth, Storage, Studio via Docker. Takes 1-2 minutes on first run. The output will display connection info including:

- `API URL`: should be `http://127.0.0.1:54321`
- `anon key`: local dev anon key
- `service_role key`: the key we need

**Step 2: Apply migration**

The migration should apply automatically on start. Verify by checking Studio at `http://127.0.0.1:54323` or running:

```bash
supabase db reset
```

**Step 3: Update .env with the service role key**

Update the `SUPABASE_SERVICE_ROLE_KEY` line in `.env` with the value from `supabase start` output. Also update the anon key if it differs from the current value.

```
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key-from-supabase-start>"
SUPABASE_SERVICE_ROLE_KEY="<service-role-key-from-supabase-start>"
```

**Step 4: Verify tables exist**

Open Supabase Studio at `http://127.0.0.1:54323` and confirm both `contacts` and `enquiries` tables exist with the correct columns.

**Note:** `.env` is gitignored — no commit needed for this step.

---

### Task 5: Update TypeScript types in constants.ts

**Files:**

- Modify: `lib/constants.ts` (lines 26-48)

**Step 1: Replace old types with new types**

Replace the `CourseEnquiry` and `ContactEnquiry` type definitions (lines 26-48) with:

```typescript
// Type definitions for our tables
export type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
};

export type Enquiry = {
  id: string;
  contact_id: string;
  enquiry_type: "course" | "general" | "admission" | "fees" | "facilities" | "other";
  enquiry_details: string | null;
  phone: string | null;
  course_length: "long_term" | "short_term" | null;
  course_name: string | null;
  is_read: boolean;
  created_at: string;
};
```

**Step 2: Run build to verify no type errors**

```bash
pnpm build
```

Expected: build succeeds. If there are errors, they will be in files that import the old types — fix any references. Check `lib/supabase.ts` (re-exports from constants — should still work). Check admin pages that reference `CourseEnquiry` or `ContactEnquiry`.

**Step 3: Commit**

```bash
but commit <branch> -c -m "refactor: replace CourseEnquiry/ContactEnquiry types with Contact and Enquiry" --changes <constants-id> --json --status-after
```

---

### Task 6: Create the /api/enquiries route

**Files:**

- Create: `app/api/enquiries/route.ts`

**Step 1: Create the API route**

Create `app/api/enquiries/route.ts` with this content:

```typescript
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    const { first_name, last_name, email, phone, enquiry_type, message } = body;

    if (!first_name || !last_name || !email || !phone || !enquiry_type) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: first_name, last_name, email, phone, enquiry_type",
        },
        { status: 400 },
      );
    }

    const validTypes = ["course", "general", "admission", "fees", "facilities", "other"];
    if (!validTypes.includes(enquiry_type)) {
      return NextResponse.json(
        { success: false, error: `Invalid enquiry_type. Must be one of: ${validTypes.join(", ")}` },
        { status: 400 },
      );
    }

    // Course-specific validation
    const { course_length, course_name } = body;
    if (enquiry_type === "course") {
      if (!course_length || !course_name) {
        return NextResponse.json(
          { success: false, error: "Course enquiries require course_length and course_name" },
          { status: 400 },
        );
      }
      if (!["long_term", "short_term"].includes(course_length)) {
        return NextResponse.json(
          { success: false, error: "course_length must be 'long_term' or 'short_term'" },
          { status: 400 },
        );
      }
    }

    const supabase = getSupabaseAdmin();

    // Upsert contact by email
    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .upsert({ first_name, last_name, email }, { onConflict: "email" })
      .select("id")
      .single();

    if (contactError || !contact) {
      console.error("Contact upsert error:", contactError);
      return NextResponse.json(
        { success: false, error: "Failed to create contact" },
        { status: 500 },
      );
    }

    // Insert enquiry
    const { error: enquiryError } = await supabase.from("enquiries").insert({
      contact_id: contact.id,
      enquiry_type,
      enquiry_details: message || null,
      phone,
      course_length: enquiry_type === "course" ? course_length : null,
      course_name: enquiry_type === "course" ? course_name : null,
    });

    if (enquiryError) {
      console.error("Enquiry insert error:", enquiryError);
      return NextResponse.json(
        { success: false, error: "Failed to create enquiry" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
```

**Step 2: Run build to verify**

```bash
pnpm build
```

Expected: build succeeds.

**Step 3: Commit**

```bash
but commit <branch> -c -m "feat: add POST /api/enquiries route with contact upsert" --changes <route-id> --json --status-after
```

---

### Task 7: Delete old stub API routes

**Files:**

- Delete: `app/api/course-enquiry/route.ts`
- Delete: `app/api/contact-enquiry/route.ts`

**Step 1: Remove both stub route directories**

```bash
rm -rf app/api/course-enquiry
rm -rf app/api/contact-enquiry
```

**Step 2: Run build to verify nothing breaks**

```bash
pnpm build
```

Expected: build succeeds. These routes are only called by the form components (which we update in the next tasks), so removing them first is safe — the forms still function, they just POST to a URL that 404s until we update them.

**Step 3: Commit**

```bash
but commit <branch> -c -m "chore: remove old stub API routes (course-enquiry, contact-enquiry)" --changes <ids> --json --status-after
```

---

### Task 8: Update CourseEnquiryForm to use new schema and endpoint

**Files:**

- Modify: `components/CourseEnquiryForm.tsx`

**Step 1: Update form state**

Replace the form state initialization (line 17-24):

```typescript
const [form, setForm] = useState({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  course_length: "" as "long_term" | "short_term" | "",
  course_name: "",
  message: "",
});
```

**Step 2: Update handleChange**

Replace the `handleChange` function (lines 26-36) to use `course_length` instead of `course_type`:

```typescript
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
) => {
  const { name, value } = e.target;

  if (name === "course_length") {
    setForm({ ...form, course_length: value as "long_term" | "short_term" | "", course_name: "" });
  } else {
    setForm({ ...form, [name]: value });
  }
};
```

**Step 3: Update validate function**

Replace the validate function (lines 38-63):

```typescript
const validate = () => {
  if (
    !form.first_name ||
    !form.last_name ||
    !form.email ||
    !form.phone ||
    !form.course_length ||
    !form.course_name
  ) {
    setError("Please fill all required fields");
    return false;
  }

  const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;

  if (!nameRegex.test(form.first_name.trim())) {
    setError("First name should contain only alphabets");
    return false;
  }

  if (!nameRegex.test(form.last_name.trim())) {
    setError("Last name should contain only alphabets");
    return false;
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(form.email)) {
    setError("Enter valid email");
    return false;
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(form.phone)) {
    setError("Phone number must be exactly 10 digits");
    return false;
  }

  return true;
};
```

**Step 4: Update handleSubmit**

Change the fetch URL (line 75) and add `enquiry_type` to payload:

```typescript
const res = await fetch("/api/enquiries", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...form,
    enquiry_type: "course",
  }),
});
```

Update the form reset (lines 86-93) to match new field names:

```typescript
setForm({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  course_length: "",
  course_name: "",
  message: "",
});
```

**Step 5: Update availableCourses to use course_length**

Replace line 101-105:

```typescript
const availableCourses =
  form.course_length === "long_term"
    ? LONG_TERM_COURSES
    : form.course_length === "short_term"
      ? SHORT_TERM_COURSES
      : [];
```

**Step 6: Update the JSX**

Replace the Full Name input (lines 131-146) with First Name + Last Name side by side:

```tsx
{
  /* NAME FIELDS */
}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
  <div>
    <label className="block text-gray-600 text-sm mb-1">First Name *</label>
    <input
      name="first_name"
      type="text"
      placeholder="First name"
      value={form.first_name}
      onChange={(e) => {
        let value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
        value = value.replace(/\s{2,}/g, " ");
        setForm({ ...form, first_name: value });
      }}
      className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-transparent"
    />
  </div>
  <div>
    <label className="block text-gray-600 text-sm mb-1">Last Name *</label>
    <input
      name="last_name"
      type="text"
      placeholder="Last name"
      value={form.last_name}
      onChange={(e) => {
        let value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
        value = value.replace(/\s{2,}/g, " ");
        setForm({ ...form, last_name: value });
      }}
      className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-transparent"
    />
  </div>
</div>;
```

Update the Course Type select (lines 178-191) — change `name` and `value` from `course_type` to `course_length`:

```tsx
<div>
  <label className="block text-gray-600 text-sm mb-1">Course Type *</label>
  <select
    name="course_length"
    value={form.course_length}
    onChange={handleChange}
    className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-transparent cursor-pointer"
  >
    <option value="">Select course type</option>
    <option value="long_term">Long Term Course</option>
    <option value="short_term">Short Term Course</option>
  </select>
</div>
```

Update the Course Name select disabled check (line 200) and empty text (line 206) — change `course_type` to `course_length`:

```tsx
            disabled={!form.course_length}
            className={`w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-transparent ${
              !form.course_length ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <option value="">
              {form.course_length ? "Select a course" : "First select course type"}
            </option>
```

**Step 7: Run build to verify**

```bash
pnpm build
```

Expected: build succeeds with no type errors.

**Step 8: Commit**

```bash
but commit <branch> -c -m "feat: update CourseEnquiryForm with first/last name fields and /api/enquiries endpoint" --changes <form-id> --json --status-after
```

---

### Task 9: Update EnquiryForm to use new endpoint

**Files:**

- Modify: `components/EnquiryForm.tsx` (line 76)

**Step 1: Change the fetch URL**

Replace line 76:

```typescript
      const res = await fetch("/api/enquiries", {
```

This is the only change — the form already uses `first_name`, `last_name`, and `enquiry_type` correctly.

**Step 2: Run build to verify**

```bash
pnpm build
```

Expected: build succeeds.

**Step 3: Commit**

```bash
but commit <branch> -c -m "feat: update EnquiryForm to POST to /api/enquiries" --changes <form-id> --json --status-after
```

---

### Task 10: Fix any remaining references to old types

**Step 1: Search for old type references**

Search the codebase for `CourseEnquiry` and `ContactEnquiry`:

```bash
grep -r "CourseEnquiry\|ContactEnquiry" --include="*.ts" --include="*.tsx" .
```

Expected: no results (or only the `lib/constants.ts` if already updated). If any admin pages reference these types, update their imports to use `Contact` and `Enquiry` instead.

**Step 2: Search for old API route references**

```bash
grep -r "course-enquiry\|contact-enquiry" --include="*.ts" --include="*.tsx" .
```

Expected: no results. If any files still reference the old routes, update them to `/api/enquiries`.

**Step 3: Run build**

```bash
pnpm build
```

Expected: clean build, no errors.

**Step 4: Commit (if any changes were made)**

```bash
but commit <branch> -c -m "fix: update remaining references to old types and routes" --changes <ids> --json --status-after
```

---

### Task 11: Manual smoke test — course enquiry

**Prerequisite:** Local Supabase is running (`supabase start`) and dev server is running (`pnpm dev`).

**Step 1: Open the course enquiry form**

Navigate to the page that triggers the course enquiry modal (any course page with "Enquire Now" button), or navigate directly to a page with the `CourseEnquiryForm`.

**Step 2: Submit a course enquiry**

Fill in:

- First Name: `Test`
- Last Name: `User`
- Email: `test@example.com`
- Phone: `1234567890`
- Course Type: `Long Term Course`
- Course Name: `Teacher Training`
- Message: `Testing local form submission`

Submit the form.

**Step 3: Verify success response**

The form should show the success message: "Enquiry submitted successfully! We will contact you soon."

**Step 4: Verify data in Supabase Studio**

Open `http://127.0.0.1:54323` → Table Editor.

Check `contacts` table: should have one row with `first_name: Test`, `last_name: User`, `email: test@example.com`.

Check `enquiries` table: should have one row with `enquiry_type: course`, `course_length: long_term`, `course_name: Teacher Training`, `enquiry_details: Testing local form submission`, `phone: 1234567890`.

---

### Task 12: Manual smoke test — contact enquiry

**Step 1: Navigate to the contact page**

Go to `http://localhost:3000/contact`.

**Step 2: Submit a contact enquiry**

Fill in:

- First Name: `Test`
- Last Name: `User`
- Email: `test@example.com` (same email — should reuse the contact)
- Phone: `9876543210`
- Enquiry Type: `General Inquiry`
- Message: `Testing contact form`

Submit the form.

**Step 3: Verify in Supabase Studio**

Check `contacts` table: should still have ONE row (same email, contact was reused).

Check `enquiries` table: should now have TWO rows — one course enquiry and one general enquiry, both with the same `contact_id`.

---

### Task 13: Manual smoke test — duplicate contact deduplication

**Step 1: Submit with same email, different name**

Submit a course enquiry with:

- First Name: `Updated`
- Last Name: `Name`
- Email: `test@example.com`

**Step 2: Verify contact was updated, not duplicated**

Check `contacts` table: should still have ONE row, but `first_name` should now be `Updated` and `last_name` should be `Name` (upsert updated the name).

Check `enquiries` table: should now have THREE rows, all with the same `contact_id`.

---
