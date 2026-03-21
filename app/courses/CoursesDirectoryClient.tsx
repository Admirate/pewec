"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mulish, Poppins } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";

const mulish = Mulish({ subsets: ["latin"], weight: ["400", "600", "700"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const categories = [
  {
    title: "Long Term Courses",
    description:
      "Academic education and professional preparation programs including Teacher Training, General Nursing, Intermediate Education, and more.",
    href: "/courses/long-term",
    image:
      "https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/7.png",
  },
  {
    title: "Short Term Courses",
    description:
      "Practical skills courses in shorter duration including Beautician Courses, Art and Craft, and more.",
    href: "/courses/short-term",
    image:
      "https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/13.png",
  },
];

export default function CoursesDirectoryClient() {
  return (
    <div className="w-full bg-neutral-100 overflow-hidden">
      {/* Hero */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[60vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/6.png"
          alt="courses"
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
            Courses
          </motion.h1>

          <motion.p
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className={`${mulish.className} text-white mt-2 sm:mt-3 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl`}
          >
            Explore our long term and short term programs designed to empower women through
            education and practical skills.
          </motion.p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="max-w-7xl mx-auto py-10 sm:py-12 md:py-16 px-4 sm:px-5 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.href}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link href={cat.href} className="group block">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl h-62.5 sm:h-75 md:h-87.5 lg:h-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

                  <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8">
                    <h2
                      className={`${mulish.className} text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold`}
                    >
                      {cat.title}
                    </h2>
                    <p
                      className={`${poppins.className} text-white/80 mt-2 text-sm sm:text-base md:text-lg`}
                    >
                      {cat.description}
                    </p>
                    <span
                      className={`${mulish.className} inline-flex items-center gap-2 text-white mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-medium group-hover:gap-3 transition-all`}
                    >
                      View Courses
                      <span className="text-xl sm:text-2xl">&rarr;</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
