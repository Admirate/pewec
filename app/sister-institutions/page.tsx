"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Mulish, Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import { useEnquiryModal } from "@/components/GlobalEnquiryModal";
import { motion } from "framer-motion";

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
    <main className="w-full bg-[#f2f2f2] overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="w-full px-4 md:px-8 py-6">
        <div className="relative mx-auto w-full h-96 md:h-128 lg:h-192 rounded-3xl overflow-hidden">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/14.png"
              alt="hero"
              fill
              priority
              className="object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute bottom-6 md:bottom-24 left-6 right-6 md:left-16 md:right-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className={`${mulish.className} text-white text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight max-w-xl`}
              >
                Sister Institutions
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
                bg-[#006457] hover:bg-[#043d36] text-white font-semibold
                text-[20px] md:text-lg lg:text-3xl
                px-8 py-3 rounded-full shadow-md transition w-fit`}
                  onClick={openModal}
                >
                  Enquire Now
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl"
          >
            <p
              className={`${poppins.className} text-gray-700 text-lg md:text-xl lg:text-3xl leading-relaxed`}
            >
              PEWEC is part of institutions managed under the Nizamia Hyderabad
              Women’s Association Trust. These institutions work together to
              support women through education and training.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
