"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Mulish, Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  return (
    <main className="w-full bg-[#f2f2f2] ">
      <Navbar />
      {/* Hero */}
      <section className="w-full px-4 md:px-8 py-6">
        <div className="relative mx-auto w-full  h-96 md:h-128 lg:h-192 rounded-3xl overflow-hidden">
          {/* IMAGE */}
          <Image
            src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/1.png"
            alt="hero"
            fill
            priority
            className="object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute bottom-6 md:bottom-24 left-6 right-6 md:left-16 md:right-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              {/* TEXT */}
              <h1
                className={`${mulish.className} text-white text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight max-w-xl`}
              >
                Education for women.
                <br />
                Skills for life.
                <br />
                Support for a better future.
              </h1>

              {/* BUTTON */}
              <button
                className={`${mulish.className}
              bg-[#006457] hover:bg-[#043d36]
              text-white font-semibold
              text-[20px] md:text-2xl lg:text-3xl
              px-8 py-4  rounded-full
              shadow-md transition w-fit`}
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="w-full px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-6xl">
            <p
              className={`${poppins.className} text-gray-700 text-lg md:text-xl lg:text-3xl leading-relaxed`}
            >
              Princess Esin Women’s Educational Centre is a place where women
              learn, grow, and gain confidence. We focus on education and skills
              that are useful in daily life and help women stand on their own.
            </p>

            <p
              className={`${poppins.className} text-gray-700 text-lg md:text-xl lg:text-3xl leading-relaxed mt-4`}
            >
              Our aim is to support women from all backgrounds with learning
              that is simple, affordable, and meaningful.
            </p>

            <Link href="/courses">
              <button
                className={`${mulish.className}
              bg-[#006457] hover:bg-[#043d36]
              text-white font-semibold
              text-[20px] md:text-2xl lg:text-3xl
              px-8 py-4 mt-10 rounded-full
              shadow-md transition`}
              >
                View Courses
              </button>
            </Link>
          </div>

          {/* DIVIDER */}
          <div className="w-full border-b-4 border-[#7EACB5] my-16"></div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT */}
            <div>
              <h2
                className={`${mulish.className} text-[#c44944] font-semibold text-3xl md:text-4xl lg:text-5xl mb-6`}
              >
                What We Believe In
              </h2>

              <ul
                className={`${poppins.className} space-y-4 text-gray-700 text-lg md:text-xl lg:text-3xl`}
              >
                <li>• Education that is easy to understand</li>
                <li>• Skills that lead to work and independence</li>
                <li>• A safe and respectful learning space</li>
                <li>• Support at every step of learning</li>
              </ul>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden">
              <Image
                src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/2.png"
                alt="classroom"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

