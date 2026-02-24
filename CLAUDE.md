# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server (localhost:3000)
pnpm build        # Production build
pnpm lint         # Run ESLint
```

No test suite is configured.

## Architecture

**Next.js 16 App Router** project using React 19, TypeScript, Tailwind CSS v4, and Supabase.

### Route Structure

- `/` — Public website (Home, About, Courses, Sister Institutions, Contact)
- `/admin` — Admin dashboard with sidebar layout (`app/admin/layout.tsx`)
- `/admin/login` — Admin login (auth via `localStorage` — marked TODO for proper implementation)
- `/admin/course-enquiries` and `/admin/contact-enquiries` — Enquiry management views
- `/api/course-enquiry` and `/api/contact-enquiry` — POST routes (currently stub implementations, not yet wired to Supabase)

### Key Architectural Patterns

**Global Enquiry Modal:** `GlobalEnquiryModal` wraps the entire app in `app/layout.tsx` and provides a React Context (`EnquiryContext`). Any page/component can call `useEnquiryModal().openModal()` to open the course enquiry modal from anywhere.

**Supabase:** Two clients in `lib/supabase.ts`:

- `supabase` — browser client using `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `getSupabaseAdmin()` — server-only client using `SUPABASE_SERVICE_ROLE_KEY` (throws if not set)

**Types & Constants:** `lib/constants.ts` exports the unified DB table types (`Contact`, `Enquiry`), course lists, and enquiry type options. These are re-exported from `lib/supabase.ts`.

**PillNav:** Custom animated desktop nav (`components/PillNav.tsx`) using GSAP for hover animations. Used in the public `Navbar` with active-route detection via `usePathname`.

**Styling:** Tailwind CSS v4 (PostCSS plugin), shadcn/ui (New York style, neutral base), Framer Motion for page animations, GSAP for the navbar pill animation. Brand colors: `#c44944` (red), `#006457` (dark green), `#7EACB5` (teal). Background: `#f2f2f2`.

**Fonts:** Geist/Geist Mono loaded in root layout; Poppins and Mulish loaded per-page via `next/font/google`.

### Outstanding TODOs (marked in code)

- `app/api/course-enquiry/route.ts` and `app/api/contact-enquiry/route.ts` are stubs — need Supabase inserts + email sending via `lib/email-templates.ts`
- `app/admin/layout.tsx` — auth uses `localStorage` ("admin_authenticated") as a temporary placeholder; needs real auth (Supabase Auth or JWT)
- `app/admin/page.tsx` — dashboard stats are hardcoded to 0; needs Supabase queries via `getSupabaseAdmin()`

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # server-side only
```

Images are served from `aytfswwvnsuazudapbuo.supabase.co` (whitelisted in `next.config.ts`).
