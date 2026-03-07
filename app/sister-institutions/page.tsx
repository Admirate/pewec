import type { Metadata } from "next";
import SisterInstitutionsClient from "./SisterInstitutionsClient";

export const metadata: Metadata = {
  title: "Sister Institutions",
  description:
    "Discover the sister institutions managed under the Nizamia Hyderabad Women's Association Trust alongside PEWEC.",
  alternates: {
    canonical: "/sister-institutions",
  },
  openGraph: {
    title: "Sister Institutions | PEWEC",
    description:
      "Discover the sister institutions managed under the Nizamia Hyderabad Women's Association Trust alongside PEWEC.",
    url: "/sister-institutions",
  },
  twitter: {
    title: "Sister Institutions | PEWEC",
    description:
      "Discover the sister institutions managed under the Nizamia Hyderabad Women's Association Trust alongside PEWEC.",
  },
};

export default function SisterInstitutionsPage() {
  return <SisterInstitutionsClient />;
}
