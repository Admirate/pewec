"use client";

import Navbar from "@/components/Navbar";
import { Mulish } from "next/font/google";
import EnquiryForm from "@/components/EnquiryForm";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ContactPage() {
  return (
    <div className="w-full bg-neutral-100 overflow-hidden">
      <Navbar />

      <section className="px-6 md:px-12 mt-6">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-70 md:h-85 rounded-3xl overflow-hidden"
        >
          <img
            src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/15.png"
            alt="contact"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute bottom-6 md:bottom-16 left-6 md:left-24"
          >
            <h1
              className={`${mulish.className} text-white text-3xl md:text-5xl font-semibold`}
            >
              Contact Us
            </h1>
          </motion.div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 space-y-14">
      
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-10 md:gap-16"
        >
          {/* Visit */}
          <div>
            <h2
              className={`${mulish.className} text-[#c44944] text-3xl lg:text-5xl font-semibold mb-6`}
            >
              Visit Us
            </h2>

            <p className="text-gray-700 text-lg md:text-xl lg:text-[25px] leading-relaxed">
              223, 6A3 Building adjacent to Durru Shehvar Hospital, No 5 Purani
              Haveli Road,
              <br /> Hyderabad Telangana 500002
            </p>
          </div>

          {/* Hours */}
          <div>
            <h2
              className={`${mulish.className} text-[#c44944] text-3xl lg:text-5xl font-semibold mb-6`}
            >
              Office Hours
            </h2>

            <p className="text-gray-700 text-lg md:text-xl lg:text-[25px] leading-relaxed">
              Monday to Friday <br />
              9:30 am to 5:00 pm <br />
              Second and fourth Saturdays and Sundays <br />
              Closed
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className={`${mulish.className} text-[#c44944] text-3xl lg:text-5xl font-semibold mb-8`}
          >
            Contact
          </h2>

          <div className="space-y-8">
            <div>
              <p className="text-[#7EACB5] font-medium text-2xl lg:text-4xl">
                Phone
              </p>
              <p className="text-gray-700 text-lg md:text-xl lg:text-[25px] mt-3">
                +91 40 24578078
              </p>
              <p className="text-gray-700 text-lg md:text-xl lg:text-[25px]">
                +91 40 24520761
              </p>
            </div>

            <div>
              <p className="text-[#7EACB5] font-medium text-2xl lg:text-4xl">
                Email
              </p>
              <p className="text-gray-700 text-lg md:text-xl lg:text-[25px] mt-3">
                pewecpewec@yahoo.co.in
              </p>
            </div>
          </div>
        </motion.div>

        {/* form */}
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <EnquiryForm />
        </motion.div>
      </section>

      {/* footer */}
      <Footer />
    </div>
  );
}
