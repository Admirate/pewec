# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev            # Start development server (localhost:3000)
pnpm build          # Production build
pnpm lint           # Run ESLint (oxlint)
pnpm test           # Run Vitest (single pass)
pnpm test:watch     # Run Vitest in watch mode
```

Local Supabase (required for dev):

```bash
supabase start      # Start local Supabase + Mailpit
supabase stop       # Stop local Supabase
supabase db reset   # Re-run all migrations (reseeds courses)
supabase status     # Show service URLs and ports
```

## Architecture

**Next.js 16 App Router** project using React 19, TypeScript, Tailwind CSS v4, and Supabase.

### Route Structure

**Public**
- `/` — Home
- `/about`, `/courses`, `/sister-institutions`, `/contact` — Static public pages
- `/api/courses` — GET active courses (used by the enquiry form dropdown)
- `/api/enquiries` — POST submit a course or contact enquiry

**Admin** (protected by `proxy.ts`)
- `/admin` — Dashboard (stats hardcoded to 0 — TODO)
- `/admin/login` — Supabase Auth login
- `/admin/course-enquiries` — Course enquiry list (UI only, not yet wired to DB — TODO)
- `/admin/contact-enquiries` — Contact enquiry list (UI only, not yet wired to DB — TODO)
- `/admin/courses` — Course CRUD (fully wired)
- `/api/admin/courses` — GET/POST/PATCH courses (admin only)

### Key Architectural Patterns

**Proxy / Auth middleware:** `proxy.ts` (Next.js 16 renames `middleware.ts` → `proxy.ts` and `export function middleware` → `export function proxy`). Protects all `/admin/*` and `/api/admin/*` routes by checking the Supabase session cookie. Login page is explicitly excluded.

**Global Enquiry Modal:** `GlobalEnquiryModal` wraps the entire app in `app/layout.tsx` and provides `EnquiryContext`. Signature: `openModal(courseName?: string)`. Pass a course name to pre-select it in the form; omit to open blank. **Important:** always wrap in an arrow function when used as a button `onClick` — `onClick={() => openModal()}` or `onClick={() => openModal(title)}` — never `onClick={openModal}` (TypeScript will reject it because the event object would be passed as `courseName`).

**CourseEnquiryForm:** Fetches active courses from `/api/courses` on mount and renders a single flat `<select>` with `<optgroup>` separators for Long Term / Short Term. Accepts `initialCourseName` prop for pre-selection by name string match (case-insensitive).

**Supabase clients** (`lib/supabase.ts`):
- `supabase` — browser client (`NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`). Used in public API routes.
- `getSupabaseAdmin()` — server-only admin client (`SUPABASE_SERVICE_ROLE_KEY`). Used in all `/api/admin/*` routes and `/api/enquiries`.
- `createAdminBrowserClient()` — `@supabase/ssr` browser client that stores the session in cookies (readable by `proxy.ts`). Used in admin client components (`admin/layout.tsx`, `admin/login/page.tsx`).

**Email** (`lib/email.ts`): Transport-aware `sendEmail(to, subject, html)` helper. Uses Mailpit SMTP (`127.0.0.1:54325`) when `NODE_ENV === "development"`, Resend (via `RESEND_API_KEY`) in production. Always soft-fails — errors are logged but never thrown, so a failed email never loses a lead.

**Email templates** (`lib/email-templates.ts`): `courseEnquiryEmailTemplate` (confirmation to requester), `repNotificationEmailTemplate` (notification to course rep), `contactEnquiryEmailTemplate` (confirmation for general enquiries).

**Types & Constants** (`lib/constants.ts`): DB types (`Contact`, `Course`, `Enquiry`, `EnquiryWithContact`), `ENQUIRY_TYPES` list. Note: `LONG_TERM_COURSES` and `SHORT_TERM_COURSES` arrays were removed — courses now live in the DB.

**Static course display data** (`data/courses.ts`): Used only by the public `/courses` page for images, descriptions, and bullet points. Not the source of truth for the enquiry form — those come from `/api/courses`. The two are linked only by course name string matching.

**PillNav:** Custom animated desktop nav (`components/PillNav.tsx`) using GSAP for hover animations. Used in the public `Navbar` with active-route detection via `usePathname`.

**Styling:** Tailwind CSS v4 (PostCSS plugin), shadcn/ui (New York style, neutral base), Framer Motion for page animations, GSAP for the navbar pill animation. Brand colors: `#c44944` (red), `#006457` (dark green), `#7EACB5` (teal). Background: `#f2f2f2`.

**Fonts:** Geist/Geist Mono loaded in root layout; Poppins and Mulish loaded per-page via `next/font/google`.

### Database

Migrations live in `supabase/migrations/`. Always add schema changes there — never apply manual SQL.

**Tables:**
- `contacts` — upserted on every enquiry submission (deduped by email)
- `enquiries` — one row per submission; `enquiry_type` is `course | general | admission | fees | facilities | other`; course enquiries have a `course_id` FK and a denormalised `course_name` snapshot
- `courses` — source of truth for the enquiry form; `type` is `long_term | short_term`; `is_active` controls visibility; `rep_email` receives notification emails

### Testing

Vitest 4 + `vite-tsconfig-paths`. All tests are in `__tests__/`.

- `__tests__/proxy.test.ts` — middleware auth logic (9 tests)
- `__tests__/api/enquiries.test.ts` — POST /api/enquiries validation, transformation, DB errors (20 tests)
- `__tests__/api/courses.test.ts` — GET /api/courses (3 tests)
- `__tests__/api/admin/courses.test.ts` — GET/POST/PATCH /api/admin/courses (13 tests)

Mocking conventions:
- `vi.mock("@/lib/supabase", ...)` — mock `getSupabaseAdmin` (returns a chainable query builder mock) and/or `supabase` (the browser client)
- `vi.mock("@/lib/email", ...)` — mock `sendEmail` as `vi.fn().mockResolvedValue(undefined)` to prevent real SMTP/Resend calls

### Outstanding TODOs

- `app/admin/page.tsx` — dashboard stats hardcoded to 0; needs `getSupabaseAdmin()` queries
- `app/admin/course-enquiries/page.tsx` — needs real data from Supabase (UI scaffold exists)
- `app/admin/contact-enquiries/page.tsx` — needs real data from Supabase (UI scaffold exists)
- `lib/resend.ts` — superseded by `lib/email.ts` but the file still exists; safe to delete

### Environment Variables

```
# Supabase (local dev values printed by `supabase status`)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server-side only

# Email
RESEND_API_KEY=                   # production only (ignored in development)
EMAIL_FROM=                       # e.g. noreply@pewec.com (defaults to noreply@pewec.com if unset)
```

In development, emails are sent via Mailpit (bundled with `supabase start`).
- Web UI: http://127.0.0.1:54324
- SMTP: 127.0.0.1:54325 (no auth required)

Images are served from `aytfswwvnsuazudapbuo.supabase.co` (whitelisted in `next.config.ts`).
