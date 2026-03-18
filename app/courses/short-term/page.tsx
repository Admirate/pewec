import type { Metadata } from "next";
import CoursesByTypeClient from "../CoursesByTypeClient";

export const metadata: Metadata = {
  title: "Short Term Courses | PEWEC",
  description:
    "Explore short-term practical skills courses at PEWEC including Beautician Courses, Art and Craft, and more.",
  alternates: {
    canonical: "/courses/short-term",
  },
  openGraph: {
    title: "Short Term Courses | PEWEC",
    description: "Practical skills courses in shorter duration for women at PEWEC.",
    url: "/courses/short-term",
  },
  twitter: {
    title: "Short Term Courses | PEWEC",
    description: "Practical skills courses in shorter duration for women at PEWEC.",
  },
};

export default function ShortTermCoursesPage() {
  return <CoursesByTypeClient type="short_term" />;
}
