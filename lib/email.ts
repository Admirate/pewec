/**
 * Email helper — single nodemailer transport configured via env vars.
 *
 * Required env vars:
 *   EMAIL_SMTP_HOST — SMTP hostname (e.g. "smtp.resend.com", "127.0.0.1")
 *   EMAIL_SMTP_PORT — SMTP port (e.g. 465, 587, 54325)
 *
 * Optional:
 *   EMAIL_SMTP_SECURE — set to "true" for TLS (default: false)
 *   EMAIL_SMTP_USER   — SMTP username (omit for no-auth servers like Mailpit)
 *   EMAIL_SMTP_PASS   — SMTP password (required when EMAIL_SMTP_USER is set)
 *   EMAIL_FROM         — sender address (default: noreply@pewec-pptt.org)
 *
 * Soft-fail: errors are logged but never thrown, so a failed email
 * never causes the caller's request to fail.
 */

import nodemailer from "nodemailer";

const smtpHost = process.env.EMAIL_SMTP_HOST;
const smtpPort = process.env.EMAIL_SMTP_PORT;

if (!smtpHost || !smtpPort) {
  throw new Error("EMAIL_SMTP_HOST and EMAIL_SMTP_PORT must be set");
}

if (process.env.EMAIL_SMTP_USER && !process.env.EMAIL_SMTP_PASS) {
  throw new Error("EMAIL_SMTP_PASS is required when EMAIL_SMTP_USER is set");
}

const FROM = process.env.EMAIL_FROM ?? "noreply@pewec-pptt.org";

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: Number(smtpPort),
  secure: process.env.EMAIL_SMTP_SECURE === "true",
  ...(process.env.EMAIL_SMTP_USER
    ? {
        auth: {
          user: process.env.EMAIL_SMTP_USER,
          pass: process.env.EMAIL_SMTP_PASS,
        },
      }
    : {}),
});

export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  try {
    await transporter.sendMail({ from: FROM, to, subject, html });
  } catch (error) {
    console.error("Email send failed:", { to, subject, error });
  }
}
