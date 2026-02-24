"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Mulish, Poppins } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useEnquiryModal } from "@/components/GlobalEnquiryModal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  const { openModal } = useEnquiryModal();

  return (
    <main className="w-full bg-[#f2f2f2] overflow-x-hidden">
      <Navbar />

      <section className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        {/* Hero */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mx-auto w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px] rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          <Image
            src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/1.png"
            alt="hero"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute bottom-4 sm:bottom-6 md:bottom-12 lg:bottom-20 left-4 right-4 sm:left-6 sm:right-6 md:left-10 md:right-10 lg:left-16 lg:right-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`${mulish.className} text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight max-w-xl`}
              >
                Education for women.
                <br />
                Skills for life.
                <br />
                Support for a better future.
              </motion.h1>

              <motion.div
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${mulish.className}
                    bg-[#006457] hover:bg-[#f8f8ff] hover:text-[#043d36] text-white font-semibold 
                    text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
                    px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 mt-4 sm:mt-6 md:mt-8 
                    rounded-full shadow-md transition`}
                  onClick={openModal}
                >
                  Enquire Now
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="max-w-6xl">
            <p
              className={`${poppins.className} text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed`}
            >
              Princess Esin Women's Educational Centre is a place where women learn, grow, and gain
              confidence. We focus on education and skills that are useful in daily life and help
              women stand on their own.
            </p>

            <p
              className={`${poppins.className} text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed mt-3 sm:mt-4`}
            >
              Our aim is to support women from all backgrounds with learning that is simple,
              affordable, and meaningful.
            </p>

            <motion.div
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center"
            >
              <Link href="/courses">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${mulish.className} bg-[#006457] hover:bg-[#f8f8ff] hover:text-[#006457] text-white font-semibold
                    text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                    px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 mt-6 sm:mt-8 md:mt-10 
                    rounded-full shadow-md transition`}
                >
                  View Courses
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="border-b-4 border-[#7EACB5] my-10 sm:my-12 md:my-16"
          />

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-center">
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2
                className={`${mulish.className} text-[#c44944] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl mb-4 sm:mb-6`}
              >
                What We Believe In
              </h2>

              <ul
                className={`${poppins.className} space-y-3 sm:space-y-4 text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl`}
              >
                <li>• Education that is easy to understand</li>
                <li>• Skills that lead to work and independence</li>
                <li>• A safe and respectful learning space</li>
                <li>• Support at every step of learning</li>
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ x: 80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden"
            >
              <Image
                src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/2.png"
                alt="classroom"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
