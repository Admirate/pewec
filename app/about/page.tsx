"use client";

import { Mulish } from "next/font/google";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function AboutPage() {
  return (
    <div className="w-full bg-[#f3f3f3]">
      <motion.section
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen overflow-hidden"
      >
        {/* Image */}
        <img
          src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/3.png"
          alt="college"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        {/* navbar */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        {/* title */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-6 sm:bottom-10 md:bottom-16 lg:bottom-24 xl:bottom-32 left-4 sm:left-6 md:left-12 lg:left-24 xl:left-48"
        >
          <h1
            className={`${mulish.className} text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold`}
          >
            About Us
          </h1>
        </motion.div>
      </motion.section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 md:py-16 space-y-12 sm:space-y-16 md:space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2
            className={`${mulish.className} text-[#c44944] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6`}
          >
            Who We Are
          </h2>

          <p
            className={`${mulish.className} text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed`}
          >
            Princess Esin Women's Educational Centre works under the Nazima
            Hyderabad Women's Association Trust. The Trust was established in
            1999 to support women through education and social development.
            PEWEC was created to give women access to learning that improves
            confidence, skills and opportunities. We believe every woman
            deserves the chance to learn, grow, and build a better life.
          </p>

          <div className="w-full border-b-4 border-[#7EACB5] mt-6 sm:mt-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3
              className={`${mulish.className} text-[#c44944] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4`}
            >
              Management
            </h3>

            <p
              className={`${mulish.className} text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed`}
            >
              The centre is guided by experienced members who believe in
              education as support from across all walks of life. The management
              ensures that courses remain affordable, practical and focused on
              real outcomes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3
              className={`${mulish.className} text-[#c44944] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4`}
            >
              Faculty
            </h3>

            <p
              className={`${mulish.className} text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed`}
            >
              Our teachers and instructors are trained, patient and supportive.
              They focus on clear teaching and practical learning so students
              feel comfortable and confident.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/5.png"
              alt="students"
              className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3
              className={`${mulish.className} text-[#c44944] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4`}
            >
              Infrastructure
            </h3>

            <p
              className={`${mulish.className} text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-3 sm:mb-4`}
            >
              The campus offers a calm and safe place to learn. Facilities
              include:
            </p>

            <ul
              className={`${mulish.className} text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl space-y-1.5 sm:space-y-2`}
            >
              <li>• Spacious classrooms</li>
              <li>• Practical training rooms</li>
              <li>• Computer laboratory</li>
              <li>• Library support</li>
              <li>• Secure campus environment</li>
            </ul>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
