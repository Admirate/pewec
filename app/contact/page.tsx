import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Princess Esin Women's Educational Centre. Visit us in Hyderabad, call, email, or send an enquiry online.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | PEWEC",
    description:
      "Get in touch with PEWEC. Visit us in Hyderabad, call, email, or send an enquiry online.",
    url: "/contact",
  },
  twitter: {
    title: "Contact Us | PEWEC",
    description:
      "Get in touch with PEWEC. Visit us in Hyderabad, call, email, or send an enquiry online.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
