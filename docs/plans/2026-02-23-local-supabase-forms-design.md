# Local Supabase + Form Submission Design

**Date:** 2026-02-23
**Scope:** Wire up form submissions to a local Supabase database. No email sending, no admin dashboard wiring, no auth changes.

## Context

The PEWEC site has two working frontend forms (course enquiry and contact enquiry) that POST to API routes, but both routes are stubs that log and return success without persisting data. The existing schema split data across two tables with inconsistent field naming. This design replaces that with a normalized two-table CRM-oriented schema.

## Database Schema

### contacts

The person. Deduplicated by email.

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, default `gen_random_uuid()` |
| first_name | text | NOT NULL |
| last_name | text | NOT NULL |
| email | text | NOT NULL, UNIQUE |
| created_at | timestamptz | default `now()` |

### enquiries

Each interaction, linked to a contact.

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, default `gen_random_uuid()` |
| contact_id | uuid | NOT NULL, FK -> contacts(id) |
| enquiry_type | text | NOT NULL, CHECK IN ('course', 'general', 'admission', 'fees', 'facilities', 'other') |
| enquiry_details | text | nullable (free-text message) |
| phone | text | nullable |
| course_length | text | nullable, CHECK IN ('long_term', 'short_term') or NULL |
| course_name | text | nullable |
| is_read | boolean | default false |
| created_at | timestamptz | default `now()` |

**Index:** `enquiries.contact_id` for efficient contact-based queries. `contacts.email` is indexed via the UNIQUE constraint.

## API Route Logic

Single RESTful endpoint: **`/api/enquiries`**. Both forms POST to the same route. The `enquiry_type` field distinguishes them.

### POST /api/enquiries

1. Parse body, validate required fields: first_name, last_name, email, phone, enquiry_type
2. If `enquiry_type === 'course'`, additionally validate: course_length, course_name (required)
3. Upsert into `contacts` by email (ON CONFLICT update first_name, last_name)
4. Insert into `enquiries` with contact_id and all provided fields
5. Return `{ success: true }` or `{ success: false, error }` with appropriate status codes

Uses `getSupabaseAdmin()` (server-side client with service role key).

**Future methods** (out of scope for this milestone):
- GET — list/filter enquiries (admin dashboard)
- PATCH — mark as read, update details
- DELETE — remove enquiries

The old `/api/course-enquiry` and `/api/contact-enquiry` stub routes will be removed.

## Form Component Changes

### CourseEnquiryForm.tsx

- Replace single `name` field with `first_name` + `last_name`
- Rename `course_type` to `course_length` in payload
- Change POST target from `/api/course-enquiry` to `/api/enquiries`
- Add `enquiry_type: 'course'` to payload
- Keep existing validation patterns (alpha-only, email regex, phone 10-digit)
- New POST body: `{ first_name, last_name, email, phone, enquiry_type: 'course', course_length, course_name, message }`

### EnquiryForm.tsx

- Already has first_name + last_name
- Change POST target from `/api/contact-enquiry` to `/api/enquiries`
- Align field names in POST body: `{ first_name, last_name, email, phone, enquiry_type, message }`

### lib/constants.ts

- Replace `CourseEnquiry` and `ContactEnquiry` types with `Contact` and `Enquiry` types matching the new schema
- Keep course lists and enquiry type options

## Local Supabase Setup

1. Run `supabase init` to generate `supabase/config.toml`
2. Create migration in `supabase/migrations/` with both tables, constraints, indexes
3. Run `supabase start` to spin up local Postgres + Studio via Docker
4. Update `.env` with local `SUPABASE_SERVICE_ROLE_KEY` from `supabase start` output

## Out of Scope

- Email sending (templates exist in `lib/email-templates.ts` but not wired)
- Admin dashboard stats and enquiry list pages
- Admin authentication (remains localStorage placeholder)
- Production deployment

## Decision Log

| Decision | Rationale |
|----------|-----------|
| Single contacts table | CRM-oriented: one person, many enquiries. Enables future drip campaigns, unsubscribe tracking. |
| Deduplicate by email | Email is the natural unique identifier for a contact. Upsert on conflict. |
| Phone on enquiries, not contacts | Phone numbers change; keeping per-enquiry preserves history. |
| Nullable course fields | General enquiries don't have course info. Cleaner than separate tables. |
| Supabase CLI local dev | Matches production exactly. Version-controlled migrations. Studio UI for browsing. |
| first_name + last_name everywhere | Consistent across both forms. Replaces the inconsistent single `name` field on course enquiry. |
| Single /api/enquiries endpoint | RESTful resource endpoint. Both forms POST to the same route. Less code, one validation path, one place to maintain. Ready for GET/PATCH/DELETE when admin dashboard is wired. |
| Remove old stub routes | `/api/course-enquiry` and `/api/contact-enquiry` are deleted. No dead code. |
