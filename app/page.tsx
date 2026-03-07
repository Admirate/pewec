import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | Education for Women in Hyderabad`,
  },
  description:
    "PEWEC offers education, vocational training, and skill development for women in Hyderabad. Courses in academics, computers, beauty, and more.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Education for Women in Hyderabad`,
    description:
      "PEWEC offers education, vocational training, and skill development for women in Hyderabad.",
    url: "/",
  },
  twitter: {
    title: `${siteConfig.name} | Education for Women in Hyderabad`,
    description:
      "PEWEC offers education, vocational training, and skill development for women in Hyderabad.",
  },
};

export default function Home() {
  return <HomeClient />;
}
