"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mulish } from "next/font/google";
import { motion } from "framer-motion";

const mulish = Mulish({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function EventsClient() {
  return (
    <div className="w-full bg-neutral-100 overflow-hidden">
      {/* Hero */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[60vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/images/8.png"
          alt="events"
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
            Events
          </motion.h1>

          <motion.p
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className={`${mulish.className} text-white mt-2 sm:mt-3 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl`}
          >
            Celebrations, programs, and milestones from the PEWEC community.
          </motion.p>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-md"
          >
            <img
              src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/images/events_pewec.jpeg"
              alt="PEWEC Event"
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-md max-h-72 sm:max-h-80 md:max-h-96"
          >
            <img
              src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/images/events_2_pewec.jpeg"
              alt="PEWEC Event"
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
