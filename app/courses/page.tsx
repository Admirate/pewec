import type { Metadata } from "next";
import CoursesDirectoryClient from "./CoursesDirectoryClient";

export const metadata: Metadata = {
  title: "Courses | PEWEC",
  description:
    "Explore long-term and short-term courses at PEWEC including academic programs, beautician courses, and vocational skills for women.",
  alternates: {
    canonical: "/courses",
  },
  openGraph: {
    title: "Courses | PEWEC",
    description:
      "Explore long-term and short-term courses at PEWEC including academic programs, and vocational skills.",
    url: "/courses",
  },
  twitter: {
    title: "Courses | PEWEC",
    description:
      "Explore long-term and short-term courses at PEWEC including academic programs, and vocational skills.",
  },
};

export default function CoursesPage() {
  return <CoursesDirectoryClient />;
}
