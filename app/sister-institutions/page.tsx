"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Mulish, Poppins } from "next/font/google";

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
            src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/14.png"
            alt="hero"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute bottom-6 md:bottom-24 left-6 right-6 md:left-16 md:right-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h1
                className={`${mulish.className} text-white text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight max-w-xl`}
              >
                Sister Institutions
              </h1>

              <button
                className={`${mulish.className}
              bg-[#006457] hover:bg-[#043d36]
              text-white font-semibold
              text-[20px] md:text-lg lg:text-3xl
              px-8 py-3  rounded-full
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
          <div className="max-w-7xl">
            <p
              className={`${poppins.className} text-gray-700 text-lg md:text-xl lg:text-3xl leading-relaxed`}
            >
              PEWEC is part of institutions managed under the Nizamia Hyderabad
              Women’s Association Trust. These institutions work together to
              support women through education and training.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
