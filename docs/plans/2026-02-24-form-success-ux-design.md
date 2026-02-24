# Form Post-Submission UX Design

**Date:** 2026-02-24
**Scope:** Improve the post-submission experience for both enquiry forms (course enquiry modal + contact page inline form).

## Problem

After a successful form submission, the form resets to empty and shows a small green banner. The user is left staring at a blank form with no clear "you're done" signal. The success moment is underwhelming and the next action is unclear.

## Solution

Replace the form with a prominent success confirmation panel on successful submission. Auto-close after 5 seconds, or let the user close manually.

## New Component: SuccessConfirmation

**File:** `components/SuccessConfirmation.tsx`

**Props:**

- `message: string` — primary confirmation text (e.g., "Thank you for your enquiry!")
- `subtitle: string` — secondary text (e.g., "Our team will contact you soon.")
- `onClose: () => void` — callback when user clicks close or auto-timer fires
- `autoCloseMs?: number` — defaults to 5000

**Behavior:**

- Renders a centered confirmation panel with animated checkmark icon, message, subtitle, and a "Close" button
- Starts a 5-second countdown timer on mount
- Shows a subtle progress bar that depletes over 5 seconds (visual cue for auto-close)
- When timer expires, calls `onClose`
- If user clicks "Close" early, calls `onClose` immediately and clears the timer
- Uses Framer Motion for fade-in entrance (already in project)

**Visual style:**

- Green checkmark using brand color `#006457`
- Clean white background
- Same container dimensions as the form so the modal doesn't jump in size
- Consistent typography with Mulish font

## Form Component Changes

### Both CourseEnquiryForm and EnquiryForm

**New state:**

- Add `submitted: boolean` (default `false`)

**New prop:**

- `onSuccess?: () => void` — optional callback fired on successful submission

**Success flow:**

1. On successful API response: set `submitted = true`, reset form fields
2. When `submitted === true`: render `<SuccessConfirmation>` instead of the form
3. SuccessConfirmation's `onClose`: sets `submitted = false` AND calls `onSuccess()` if provided

**Error flow (improved):**

1. On API failure: try to parse response JSON for `error` field
2. Display the specific error message from the API if available
3. Fall back to "Something went wrong. Try again." if parsing fails
4. Form stays visible with all user data preserved — user can fix and resubmit

### GlobalEnquiryModal

- Pass `onSuccess={closeModal}` to `CourseEnquiryForm`
- When SuccessConfirmation auto-closes or user clicks Close -> `closeModal()` fires -> modal disappears

### EnquiryForm on contact page

- No `onSuccess` prop needed
- When SuccessConfirmation auto-closes, it resets back to the empty form inline on the page

## Decision Log

| Decision                             | Rationale                                                                                          |
| ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Shared SuccessConfirmation component | DRY — one component for both forms. Consistent success UI everywhere.                              |
| Replace form on success (not banner) | Current banner is easy to miss. Replacing the form creates an unmistakable "done" moment.          |
| 5-second auto-close                  | Comfortable reading time. Prevents users from getting stuck on the success screen.                 |
| Progress bar on auto-close           | Visual affordance that the screen will dismiss itself. No surprise.                                |
| Keep inline error banner             | User needs to see the form to fix errors. Replacing it with an error panel would lose their input. |
| Surface API error messages           | "Something went wrong" is unhelpful. Specific errors help users fix the issue.                     |
| onSuccess callback prop              | Decouples form from its container. Modal can close itself; inline form can just reset.             |
