import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a transactional email via Resend.
 * Soft-fail: errors are logged but never thrown so a failed email
 * never causes the caller's request to fail.
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  try {
    const from = process.env.EMAIL_FROM ?? "noreply@pewec.com";
    await resend.emails.send({ from, to, subject, html });
  } catch (error) {
    console.error("Email send failed:", { to, subject, error });
  }
}
