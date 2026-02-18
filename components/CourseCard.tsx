"use client";

import { Mulish } from "next/font/google";

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
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">
      <div className={`relative ${reverse ? "md:order-2" : ""}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-72 md:h-128 object-cover rounded-[53px]"
        />

        <div className="absolute inset-0 bg-black/40 rounded-[53px]" />
      </div>

      <div className={`space-y-2 ${reverse ? "md:order-1" : ""}`}>
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

        {/* BULLETS IF AVAILABLE */}
        {points && (
          <ul
            className={`${mulish.className} space-y-2 text-gray-700 text-lg md:text-xl lg:text-[28px]`}
          >
            {points.map((p, i) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        )}

        <button
          className={`${mulish.className}
              bg-[#006457] hover:bg-[#043d36]
              text-white font-semibold mt-4 md:mt-12
              text-[20px] md:text-lg lg:text-[24px]
              px-8 py-4  rounded-full
              shadow-md transition w-fit`}
        >
          Enquire Now
        </button>
      </div>
    </div>
  );
}
