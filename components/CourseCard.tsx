"use client";

import { Mulish } from "next/font/google";
import { motion } from "framer-motion";
import { useEnquiryModal } from "@/components/GlobalEnquiryModal";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

type CourseCardProps = {
  title: string;
  description: string;
  points?: string[];
  image: string;
  reverse?: boolean;
};

export default function CourseCard({
  title,
  description,
  points,
  image,
  reverse = false,
}: CourseCardProps) {
  const { openModal } = useEnquiryModal();
  return (
    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-20 items-center">
      {/* Images */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 120 : -120 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[40px] lg:rounded-[53px] ${
          reverse ? "md:order-2" : ""
        }`}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-48 sm:h-56 md:h-72 lg:h-96 xl:h-[450px] object-cover rounded-2xl sm:rounded-3xl md:rounded-[40px] lg:rounded-[53px] transition-transform duration-700 hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/40 rounded-2xl sm:rounded-3xl md:rounded-[40px] lg:rounded-[53px]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reverse ? -120 : 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className={`space-y-2 sm:space-y-3 ${reverse ? "md:order-1" : ""}`}
      >
        <h3
          className={`${mulish.className} text-[#7EACB5] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold`}
        >
          {title}
        </h3>

        <p
          className={`${mulish.className} text-gray-700 mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
        >
          {description}
        </p>

        {points && (
          <ul
            className={`${mulish.className} space-y-1.5 sm:space-y-2 text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
          >
            {points.map((p, i) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        )}

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`${mulish.className}
            bg-[#006457] hover:bg-[#043d36] text-white font-semibold 
            mt-4 sm:mt-6 md:mt-8 lg:mt-12
            text-sm sm:text-base md:text-lg lg:text-xl 
            px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 
            rounded-full shadow-md transition w-fit`}
          onClick={() => openModal(title)}
        >
          Enquire Now
        </motion.button>
      </motion.div>
    </div>
  );
}
