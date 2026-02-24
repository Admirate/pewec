"use client";

import Navbar from "@/components/Navbar";
import { Mulish, Poppins } from "next/font/google";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { useEnquiryModal } from "@/components/GlobalEnquiryModal";

const mulish = Mulish({ subsets: ["latin"], weight: ["400", "600", "700"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function CoursesPage() {
  const { openModal } = useEnquiryModal();

  return (
    <div className="w-full bg-neutral-100 overflow-hidden">
      {/* Hero */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen overflow-hidden">
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/6.png"
          alt="courses"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        {/* Navbar */}
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
            All courses are listed on this single page. Courses are divided into long term and short
            term programs. Each course has an enquiry option.
          </motion.p>
        </div>
      </section>

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
            Long Term Courses
          </h2>

          <p
            className={`${poppins.className} text-gray-600 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
          >
            These courses focus on academic education and professional preparation.
          </p>

          {/* divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-10 md:mt-12 border-b-4 border-[#7EACB5] w-full origin-left"
          />
        </motion.div>

        <div className="mt-10 sm:mt-12 md:mt-16 flex flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-28">
          {courses.map((course, index) => (
            <div key={course.id}>
              <CourseCard
                title={course.title}
                description={course.description}
                points={course.points}
                image={course.image}
                reverse={index % 2 !== 0}
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-12 sm:pt-16 md:pt-20"
        >
          <h2
            className={`${mulish.className} text-[#c44944] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold`}
          >
            Short Term Courses
          </h2>

          <p
            className={`${poppins.className} text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
          >
            Practical skills courses in shorter duration.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="border-b-4 border-[#7EACB5] mt-4 sm:mt-6 origin-left"
          />
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[600px] xl:h-screen rounded-2xl sm:rounded-3xl overflow-hidden mt-10 sm:mt-14 md:mt-20"
        >
          <img
            src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/13.png"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 rounded-2xl sm:rounded-3xl" />

          <div className="absolute bottom-4 sm:bottom-8 md:bottom-16 lg:bottom-24 left-4 sm:left-6 md:left-12 lg:left-20">
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`${mulish.className} text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold`}
            >
              Beautician Courses
            </motion.h1>

            <motion.p
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className={`${mulish.className} text-white mt-2 sm:mt-3 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl`}
            >
              Training in beauty and grooming skills such as skincare, makeup, and hair styling.
              Suitable for salon work or personal services.
            </motion.p>

            {/* Button */}
            <motion.button
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.95 }}
              className={`${mulish.className}
                text-white mt-3 sm:mt-4 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-medium
                flex items-center gap-2`}
              onClick={() => openModal()}
            >
              Enquire Now
              <span className="text-xl sm:text-2xl md:text-3xl">→</span>
            </motion.button>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
