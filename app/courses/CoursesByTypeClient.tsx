"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Mulish, Poppins } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Course } from "@/lib/constants";

const mulish = Mulish({ subsets: ["latin"], weight: ["400", "600", "700"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const TYPE_CONFIG = {
  regular: {
    heading: "Regular Courses",
    subtitle: "SIVE recognised vocational programs for professional certification.",
    heroImage:
      "https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/10.png",
  },
  long_term: {
    heading: "Long Term Courses",
    subtitle: "These courses focus on academic education and professional preparation.",
    heroImage:
      "https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/7.png",
  },
  short_term: {
    heading: "Short Term Courses",
    subtitle: "Practical skills courses in shorter duration.",
    heroImage:
      "https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/13.png",
  },
} as const;

export default function CoursesByTypeClient({
  type,
}: {
  type: "long_term" | "short_term" | "regular";
}) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((json) => {
        const all: Course[] = json.data ?? [];
        setCourses(all.filter((c) => c.type === type));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [type]);

  const config = TYPE_CONFIG[type];

  return (
    <div className="w-full bg-neutral-100 overflow-hidden">
      {/* Hero */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen overflow-hidden">
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          src={config.heroImage}
          alt={config.heading}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <div className="absolute bottom-4 sm:bottom-8 md:bottom-16 lg:bottom-24 left-4 sm:left-6 md:left-12 lg:left-20 xl:left-40">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className={`${mulish.className} text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold`}
          >
            {config.heading}
          </motion.h1>

          <motion.p
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className={`${mulish.className} text-white mt-2 sm:mt-3 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl`}
          >
            {config.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Course List */}
      <section className="max-w-7xl mx-auto py-10 sm:py-12 md:py-16 px-4 sm:px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className={`${mulish.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-[#c44944]`}
          >
            {config.heading}
          </h2>

          <p
            className={`${poppins.className} text-gray-600 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
          >
            {config.subtitle}
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-10 md:mt-12 border-b-4 border-[#7EACB5] w-full origin-left"
          />
        </motion.div>

        {loading ? (
          <div className="mt-10 sm:mt-12 md:mt-16 flex flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-28">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-20 items-center animate-pulse"
              >
                <div className="bg-gray-200 rounded-2xl sm:rounded-3xl md:rounded-[40px] lg:rounded-[53px] h-48 sm:h-56 md:h-72 lg:h-96" />
                <div className="space-y-4">
                  <div className="bg-gray-200 h-8 w-2/3 rounded" />
                  <div className="bg-gray-200 h-4 w-full rounded" />
                  <div className="bg-gray-200 h-4 w-5/6 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 sm:mt-12 md:mt-16 flex flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-28">
            {courses.map((course, index) => (
              <div key={course.id}>
                <CourseCard
                  title={course.name}
                  description={course.description ?? ""}
                  bullet_points={course.bullet_points ?? undefined}
                  image={course.image ?? ""}
                  reverse={index % 2 !== 0}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-[#7EACB5] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link
            href="/courses"
            className={`${mulish.className} text-white text-lg sm:text-xl md:text-2xl font-semibold hover:underline`}
          >
            ← Back to All Courses
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
