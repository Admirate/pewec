import type { Metadata } from "next";
import CoursesByTypeClient from "../CoursesByTypeClient";

export const metadata: Metadata = {
  title: "Long Term Courses | PEWEC",
  description:
    "Explore long-term academic and professional preparation courses at PEWEC including Teacher Training, General Nursing, Intermediate Education, and Homecare Nursing.",
  alternates: {
    canonical: "/courses/long-term",
  },
  openGraph: {
    title: "Long Term Courses | PEWEC",
    description: "Academic education and professional preparation courses for women at PEWEC.",
    url: "/courses/long-term",
  },
  twitter: {
    title: "Long Term Courses | PEWEC",
    description: "Academic education and professional preparation courses for women at PEWEC.",
  },
};

export default function LongTermCoursesPage() {
  return <CoursesByTypeClient type="long_term" />;
}
