import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Explore long-term and short-term courses at PEWEC including academic programs, computer training, beautician courses, and vocational skills for women.",
  alternates: {
    canonical: "/courses",
  },
  openGraph: {
    title: "Courses | PEWEC",
    description:
      "Explore long-term and short-term courses at PEWEC including academic programs, computer training, and vocational skills.",
    url: "/courses",
  },
  twitter: {
    title: "Courses | PEWEC",
    description:
      "Explore long-term and short-term courses at PEWEC including academic programs, computer training, and vocational skills.",
  },
};

export default function CoursesPage() {
  return <CoursesClient />;
}
