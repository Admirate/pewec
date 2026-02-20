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
    <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">
      {/* Images */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 120 : -120 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className={`relative overflow-hidden rounded-[53px] ${
          reverse ? "md:order-2" : ""
        }`}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-72 md:h-128 object-cover rounded-[53px] transition-transform duration-700 hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/40 rounded-[53px]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reverse ? -120 : 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className={`space-y-2 ${reverse ? "md:order-1" : ""}`}
      >
        <h3
          className={`${mulish.className} text-[#7EACB5] text-2xl md:text-3xl lg:text-5xl font-semibold`}
        >
          {title}
        </h3>

        <p
          className={`${mulish.className} text-gray-700 mt-4 text-lg md:text-xl lg:text-[25px]`}
        >
          {description}
        </p>

        {points && (
          <ul
            className={`${mulish.className} space-y-2 text-gray-700 text-lg md:text-xl lg:text-[28px]`}
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
          bg-[#006457] hover:bg-[#043d36] text-white font-semibold mt-4 md:mt-12
          text-[20px] md:text-lg lg:text-[24px] px-8 py-4 rounded-full shadow-md transition w-fit`}
          onClick={openModal}
        >
          Enquire Now
        </motion.button>
      </motion.div>
    </div>
  );
}
