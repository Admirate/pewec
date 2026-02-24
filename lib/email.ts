/**
 * Transport-aware email helper.
 *
 * - Development (NODE_ENV === "development"): sends via Mailpit SMTP
 *   bundled with the local Supabase stack (127.0.0.1:54325, no auth).
 * - Production: sends via Resend using RESEND_API_KEY.
 *
 * Soft-fail: errors are logged but never thrown, so a failed email
 * never causes the caller's request to fail.
 */

import nodemailer from "nodemailer";
import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM ?? "noreply@pewec.com";

async function sendViaMailpit(to: string, subject: string, html: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "127.0.0.1",
    port: 54325,
    secure: false,
    // Mailpit (Inbucket) requires no auth in local dev
  });

  await transporter.sendMail({ from: FROM, to, subject, html });
}

async function sendViaResend(to: string, subject: string, html: string): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({ from: FROM, to, subject, html });
}

export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  try {
    if (process.env.NODE_ENV === "development") {
      await sendViaMailpit(to, subject, html);
    } else {
      await sendViaResend(to, subject, html);
    }
  } catch (error) {
    console.error("Email send failed:", { to, subject, error });
  }
}
