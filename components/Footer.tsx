"use client";

import Image from "next/image";
import { Mulish } from "next/font/google";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEnquiryModal } from "@/components/GlobalEnquiryModal";
import { MapPin, Phone, Printer, Facebook, Linkedin, Instagram } from "lucide-react";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Footer() {
  const { openModal } = useEnquiryModal();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full bg-[#c44944] text-white py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full flex justify-center mb-8 sm:mb-10 md:mb-12 origin-left"
        >
          <div className="w-full max-w-6xl h-1 sm:h-1.5 bg-[#e6c068] shadow-[0px_10px_9.4px_1px_#0000002E]" />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-8 sm:gap-10 lg:gap-16 xl:gap-32">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="shrink-0"
          >
            <Image
              src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/logo/peweclogo.png"
              alt="logo"
              width={180}
              height={180}
              className="w-28 sm:w-36 md:w-40 lg:w-48 h-auto object-contain"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`${mulish.className} space-y-4 sm:space-y-5 md:space-y-6 text-center lg:text-left`}
          >
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 justify-center lg:justify-start">
              <MapPin size={18} className="shrink-0 mt-1 sm:mt-0 sm:w-5 sm:h-5" />
              <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-none">
                22-3-643/660, Building No.5, Purani Haveli • Hyderabad – 500002, Telangana, India
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center lg:justify-start">
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone size={16} className="sm:w-5 sm:h-5" />
                <p className="text-sm sm:text-base md:text-lg">(+91) 40 24578078</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Printer size={16} className="sm:w-5 sm:h-5" />
                <p className="text-sm sm:text-base md:text-lg">(+91) 40 24520761</p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 justify-center lg:justify-start mt-3 sm:mt-4">
              <p className="text-xs sm:text-sm opacity-80">Social Media</p>

              <div className="flex gap-4 sm:gap-5">
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 transition" />
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 transition" />
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 transition" />
              </div>
            </div>
          </motion.div>

          {/* Enquiry Button */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={`${mulish.className}
                bg-[#0d6b5f] hover:bg-[#0b574d] text-white
                text-base sm:text-lg md:text-xl lg:text-2xl
                px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5
                rounded-full shadow-lg transition`}
              onClick={openModal}
            >
              Enquire Now
            </motion.button>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full flex justify-center mt-10 sm:mt-12 md:mt-14 mb-6 sm:mb-8 origin-left"
        >
          <div className="w-full max-w-6xl h-1 sm:h-1.5 bg-[#e6c068] shadow-[0px_10px_9.4px_1px_#0000002E]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className={`${mulish.className}
            flex flex-wrap justify-center lg:justify-start lg:ml-32
            gap-4 sm:gap-6 md:gap-8 lg:gap-16
            text-xs sm:text-sm md:text-base lg:text-lg tracking-wide`}
        >
          <Link href="/about" className="hover:opacity-80">
            ABOUT US
          </Link>
          <Link href="/contact" className="hover:opacity-80">
            CONTACT US
          </Link>
          <Link href="/contact" className="hover:opacity-80">
            HELP
          </Link>
          <Link href="/sister-institutions" className="hover:opacity-80">
            SISTER INSTITUTIONS
          </Link>
          <p className="hover:opacity-80 cursor-pointer">DISCLAIMER</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
