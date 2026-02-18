"use client";

import { Mulish, Lora } from "next/font/google";
import Navbar from "@/components/Navbar";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});


export default function AboutPage() {
  return (
    <div className="w-full bg-[#f3f3f3]">
      <section className="relative w-full h-auto lg:h-300  overflow-hidden">
        {/* IMAGE */}
        <img
          src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/3.png"
          alt="college"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />
        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <div className="absolute lg:bottom-32 bottom-12 left-6 md:left-16 lg:left-48">
          <h1
            className={`${mulish.className} text-white text-3xl md:text-5xl font-semibold`}
          >
            About Us
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-16">
        <h2
          className={`${mulish.className} text-[#c44944] text-3xl md:text-3xl lg:text-5xl font-bold mb-4`}
        >
          Who We Are
        </h2>

        <p
          className={`${mulish.className} text-gray-700 text-[20px] md:text-xl lg:text-3xl leading-relaxed`}
        >
          Princess Esin Women's Educational Centre works under the Nazima
          Hyderabad Women's Association Trust. The Trust was established in 1999
          to support women through education and social development. PEWEC was
          created to give women access to learning that improves confidence,
          skills and opportunities. We believe every woman deserves the chance
          to learn, grow, and build a better life.
        </p>

        {/* Divider */}
        <div className="w-full border-b-5 border-[#7EACB5] mt-6"></div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3
              className={`${mulish.className} text-[#c44944] text-3xl md:text-3xl lg:text-5xl font-semibold mb-4`}
            >
              Management
            </h3>
            <p
              className={`${mulish.className} text-gray-700 text-[20px] md:text-xl lg:text-3xl leading-relaxed`}
            >
              The centre is guided by experienced members who believe in
              education as support from across all walks of life. The management
              ensures that courses remain affordable, practical and focused on
              real outcomes.
            </p>
          </div>

          <div>
            <h3
              className={`${mulish.className} text-[#c44944] text-3xl md:text-3xl lg:text-5xl font-semibold mb-4`}
            >
              Faculty
            </h3>
            <p
              className={`${mulish.className} text-gray-700 text-[20px] md:text-xl lg:text-3xl leading-relaxed`}
            >
              Our teachers and instructors are trained, patient and supportive.
              They focus on clear teaching and practical learning so students
              feel comfortable and confident.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/5.png"
              alt="students"
              className="w-full h-72 object-cover rounded-xl"
            />
          </div>

          <div>
            <h3
              className={`${mulish.className} text-[#c44944] text-3xl md:text-3xl lg:text-5xl font-semibold mb-4`}
            >
              Infrastructure
            </h3>

            <p
              className={`${mulish.className} text-gray-700 text-[20px] md:text-xl lg:text-3xl mb-4`}
            >
              The campus offers a calm and safe place to learn. Facilities
              include:
            </p>

            <ul
              className={`${mulish.className} text-gray-700 text-[20px] md:text-xl lg:text-3xl space-y-2`}
            >
              <li>• Spacious classrooms</li>
              <li>• Practical training rooms</li>
              <li>• Computer laboratory</li>
              <li>• Library support</li>
              <li>• Secure campus environment</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
