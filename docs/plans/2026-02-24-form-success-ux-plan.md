# Form Post-Submission UX Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the underwhelming post-submission banner with a prominent SuccessConfirmation panel that auto-closes after 5 seconds, and surface specific API error messages on failure.

**Architecture:** Shared `SuccessConfirmation` component rendered conditionally by both form components. Each form tracks `submitted` state — when true, the confirmation replaces the form. An optional `onSuccess` callback decouples the form from its container (modal vs inline page).

**Tech Stack:** React 19, TypeScript, Framer Motion (already installed), lucide-react (already installed), Tailwind CSS v4

---

### Task 1: Create SuccessConfirmation Component

**Files:**

- Create: `components/SuccessConfirmation.tsx`

**Step 1: Create the component file**

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type SuccessConfirmationProps = {
  message: string;
  subtitle: string;
  onClose: () => void;
  autoCloseMs?: number;
};

export default function SuccessConfirmation({
  message,
  subtitle,
  onClose,
  autoCloseMs = 5000,
}: SuccessConfirmationProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 50;
        if (next >= autoCloseMs) {
          clearInterval(interval);
          onClose();
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [autoCloseMs, onClose]);

  const progress = Math.max(0, 1 - elapsed / autoCloseMs);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`${mulish.className} flex flex-col items-center justify-center text-center py-16 sm:py-20 md:py-24 lg:py-28 px-4`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
      >
        <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-[#006457] mb-6" strokeWidth={1.5} />
      </motion.div>

      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
        {message}
      </h3>

      <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-8">{subtitle}</p>

      <button
        onClick={onClose}
        className="text-sm sm:text-base text-[#006457] hover:text-[#05443c] font-medium underline underline-offset-4 transition mb-8"
      >
        Close
      </button>

      {/* Auto-close progress bar */}
      <div className="w-32 sm:w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#006457] rounded-full"
          style={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.05 }}
        />
      </div>
    </motion.div>
  );
}
```

**Step 2: Verify the build compiles**

Run: `pnpm build`
Expected: Build succeeds (component is created but not imported anywhere yet, so tree-shaking removes it — no errors)

**Step 3: Commit**

```bash
but commit -m "feat: add SuccessConfirmation component with auto-close and progress bar"
```

---

### Task 2: Integrate SuccessConfirmation into CourseEnquiryForm

**Files:**

- Modify: `components/CourseEnquiryForm.tsx`

**Step 1: Add submitted state, onSuccess prop, and import SuccessConfirmation**

At the top of the file, add the import:

```tsx
import SuccessConfirmation from "@/components/SuccessConfirmation";
```

Change the component signature to accept an `onSuccess` prop:

```tsx
type CourseEnquiryFormProps = {
  onSuccess?: () => void;
};

export default function CourseEnquiryForm({ onSuccess }: CourseEnquiryFormProps) {
```

Add `submitted` state alongside existing state:

```tsx
const [submitted, setSubmitted] = useState(false);
```

**Step 2: Update the success handler**

In `handleSubmit`, replace the current success block:

```tsx
// OLD:
setSuccess("Enquiry submitted successfully! We will contact you soon.");
setForm({ ... });

// NEW:
setForm({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  course_length: "",
  course_name: "",
  message: "",
});
setSubmitted(true);
```

**Step 3: Improve the error handler**

Replace the catch block:

```tsx
// OLD:
} catch {
  setError("Something went wrong. Try again.");
}

// NEW:
} catch (err) {
  if (err instanceof Response || (err && typeof err === "object" && "message" in err)) {
    setError((err as Error).message || "Something went wrong. Try again.");
  } else {
    setError("Something went wrong. Try again.");
  }
}
```

Also update the `if (!res.ok)` block to parse the API error:

```tsx
// OLD:
if (!res.ok) throw new Error("Failed");

// NEW:
if (!res.ok) {
  const errorData = await res.json().catch(() => null);
  throw new Error(errorData?.error || "Something went wrong. Try again.");
}
```

**Step 4: Conditionally render SuccessConfirmation instead of the form**

In the component's return, wrap everything in a conditional:

```tsx
if (submitted) {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl shadow-lg">
      <SuccessConfirmation
        message="Thank you for your enquiry!"
        subtitle="Our team will contact you about your course soon."
        onClose={() => {
          setSubmitted(false);
          onSuccess?.();
        }}
      />
    </div>
  );
}

return (
  // ... existing form JSX unchanged ...
);
```

**Step 5: Remove old success banner and `success` state**

- Delete the `const [success, setSuccess] = useState("");` line
- Delete the `{success && ( ... )}` JSX block
- Delete `setSuccess("")` from `handleSubmit` at the top

**Step 6: Verify the build compiles**

Run: `pnpm build`
Expected: Build succeeds

**Step 7: Commit**

```bash
but commit -m "feat: replace CourseEnquiryForm success banner with SuccessConfirmation panel"
```

---

### Task 3: Wire GlobalEnquiryModal to close on success

**Files:**

- Modify: `components/GlobalEnquiryModal.tsx`

**Step 1: Pass onSuccess prop to CourseEnquiryForm**

Change the `CourseEnquiryForm` usage from:

```tsx
<CourseEnquiryForm />
```

To:

```tsx
<CourseEnquiryForm onSuccess={closeModal} />
```

That's the only change. When the user clicks Close or the 5-second timer fires inside SuccessConfirmation, the form calls `onSuccess()` which calls `closeModal()` which sets `open = false` and the modal disappears.

**Step 2: Verify the build compiles**

Run: `pnpm build`
Expected: Build succeeds

**Step 3: Commit**

```bash
but commit -m "feat: close enquiry modal on successful submission via onSuccess callback"
```

---

### Task 4: Integrate SuccessConfirmation into EnquiryForm

**Files:**

- Modify: `components/EnquiryForm.tsx`

**Step 1: Add import, submitted state, and onSuccess prop**

At the top of the file, add:

```tsx
import SuccessConfirmation from "@/components/SuccessConfirmation";
```

Change the component signature to accept an optional `onSuccess` prop:

```tsx
type EnquiryFormProps = {
  onSuccess?: () => void;
};

export default function EnquiryForm({ onSuccess }: EnquiryFormProps) {
```

Add `submitted` state:

```tsx
const [submitted, setSubmitted] = useState(false);
```

**Step 2: Update the success handler**

In `handleSubmit`, replace the current success block:

```tsx
// OLD:
setSuccess("Enquiry submitted successfully! We will contact you soon.");
setForm({ ... });

// NEW:
setForm({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  enquiry_type: "",
  message: "",
});
setSubmitted(true);
```

**Step 3: Improve the error handler**

Replace the `if (!res.ok)` line:

```tsx
// OLD:
if (!res.ok) throw new Error("Failed");

// NEW:
if (!res.ok) {
  const errorData = await res.json().catch(() => null);
  throw new Error(errorData?.error || "Something went wrong. Try again.");
}
```

And update the catch block:

```tsx
// OLD:
} catch {
  setError("Something went wrong. Try again.");
}

// NEW:
} catch (err) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Something went wrong. Try again.");
  }
}
```

**Step 4: Conditionally render SuccessConfirmation instead of the form**

In the component's return, add a conditional before the existing `<div>`:

```tsx
if (submitted) {
  return (
    <div>
      <SuccessConfirmation
        message="Thank you for your enquiry!"
        subtitle="Our team will get back to you shortly."
        onClose={() => {
          setSubmitted(false);
          onSuccess?.();
        }}
      />
    </div>
  );
}

return (
  // ... existing form JSX unchanged ...
);
```

**Step 5: Remove old success banner and `success` state**

- Delete the `const [success, setSuccess] = useState("");` line
- Delete the `{success && ( ... )}` JSX block
- Delete `setSuccess("")` from `handleSubmit` at the top

**Step 6: Verify the build compiles**

Run: `pnpm build`
Expected: Build succeeds

**Step 7: Commit**

```bash
but commit -m "feat: replace EnquiryForm success banner with SuccessConfirmation panel"
```

---

### Task 5: Visual smoke test — verify both flows in the browser

**Files:** None (verification only)

**Step 1: Start the dev server**

Run: `pnpm dev`
Expected: Server starts on localhost:3000

**Step 2: Test the modal flow (CourseEnquiryForm)**

1. Open the site, click an "Enquire Now" button to open the modal
2. Fill out the course enquiry form with test data and submit
3. Verify: The form is replaced by a centered confirmation with green checkmark, message, subtitle, Close button, and depleting progress bar
4. Verify: After ~5 seconds, the modal auto-closes
5. Reopen the modal — verify the form is shown again (not the confirmation)

**Step 3: Test the inline flow (EnquiryForm on /contact)**

1. Navigate to the /contact page
2. Fill out the enquiry form with test data and submit
3. Verify: The form is replaced by the confirmation panel
4. Either click Close or wait 5 seconds
5. Verify: The form reappears ready for new input

**Step 4: Test error handling**

1. Stop the Supabase local server (or submit with invalid data)
2. Try submitting — verify a specific error message appears (not just "Something went wrong")
3. Verify the form stays visible with all user input preserved

**Step 5: Final build check**

Run: `pnpm build`
Expected: Build succeeds with no errors

**Step 6: Commit any fixes if needed**

```bash
but commit -m "fix: address issues found during smoke testing"
```

---

## Summary

| Task | Files                            | What                                                                    |
| ---- | -------------------------------- | ----------------------------------------------------------------------- |
| 1    | Create `SuccessConfirmation.tsx` | Animated checkmark + message + auto-close progress bar                  |
| 2    | Modify `CourseEnquiryForm.tsx`   | Replace success banner with SuccessConfirmation, improve error messages |
| 3    | Modify `GlobalEnquiryModal.tsx`  | Pass `onSuccess={closeModal}` to CourseEnquiryForm                      |
| 4    | Modify `EnquiryForm.tsx`         | Same treatment as CourseEnquiryForm                                     |
| 5    | None                             | Visual smoke test of both flows + build verification                    |
