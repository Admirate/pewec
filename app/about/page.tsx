import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Princess Esin Women's Educational Centre (PEWEC), its management, faculty, and infrastructure dedicated to women's education in Hyderabad.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | PEWEC",
    description:
      "Learn about PEWEC's mission, management, faculty, and infrastructure dedicated to women's education in Hyderabad.",
    url: "/about",
  },
  twitter: {
    title: "About Us | PEWEC",
    description:
      "Learn about PEWEC's mission, management, faculty, and infrastructure dedicated to women's education in Hyderabad.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
