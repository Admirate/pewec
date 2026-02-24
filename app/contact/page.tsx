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

      <section className="px-3 sm:px-4 md:px-6 lg:px-12 mt-4 sm:mt-6">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden"
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
            className="absolute bottom-4 sm:bottom-6 md:bottom-12 lg:bottom-16 left-4 sm:left-6 md:left-12 lg:left-24"
          >
            <h1
              className={`${mulish.className} text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold`}
            >
              Contact Us
            </h1>
          </motion.div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-10 sm:py-12 md:py-14 space-y-10 sm:space-y-12 md:space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-16"
        >
          {/* Visit */}
          <div>
            <h2
              className={`${mulish.className} text-[#c44944] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6`}
            >
              Visit Us
            </h2>

            <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
              223, 6A3 Building adjacent to Durru Shehvar Hospital, No 5 Purani Haveli Road,
              <br /> Hyderabad Telangana 500002
            </p>
          </div>

          {/* Hours */}
          <div>
            <h2
              className={`${mulish.className} text-[#c44944] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6`}
            >
              Office Hours
            </h2>

            <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
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
            className={`${mulish.className} text-[#c44944] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-8`}
          >
            Contact
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <p className="text-[#7EACB5] font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                Phone
              </p>
              <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl mt-2 sm:mt-3">
                +91 40 24578078
              </p>
              <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl">
                +91 40 24520761
              </p>
            </div>

            <div>
              <p className="text-[#7EACB5] font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                Email
              </p>
              <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl mt-2 sm:mt-3 break-all">
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
