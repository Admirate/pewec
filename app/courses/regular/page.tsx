import type { Metadata } from "next";
import CoursesByTypeClient from "../CoursesByTypeClient";

export const metadata: Metadata = {
  title: "Regular Courses | PEWEC",
  description:
    "SIVE recognised regular courses at PEWEC including ECHE, HCMPW, Office Automation, and Inservice training.",
};

export default function RegularCoursesPage() {
  return <CoursesByTypeClient type="regular" />;
}
