"use client";

import Navbar from "@/components/Navbar";
import { Mulish, Lora, Poppins } from "next/font/google";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";

const mulish = Mulish({ subsets: ["latin"], weight: ["400", "600", "700"] });
const lora = Lora({ subsets: ["latin"], weight: ["400", "600"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],});

export default function CoursesPage() {
  return (
    <div className="w-full bg-neutral-100">
      {/* Hero */}
      <section className="relative w-full h-90  md:h-screen overflow-hidden">
        <img
          src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/6.png"
          alt="courses"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <div className="absolute bottom-4 md:bottom-24 left-6 md:left-20 lg:left-40">
          <h1
            className={`${mulish.className} text-white mt-8 text-3xl md:text-6xl font-semibold`}
          >
            Courses
          </h1>

          <p
            className={`${mulish.className} text-white mt-3 max-w-xl text-m md:text-3xl`}
          >
            All courses are listed on this single page. Courses are divided into
            long term and short term programs. Each course has an enquiry
            option.
          </p>
        </div>
      </section>

      {/* content */}
      <section className="max-w-7xl mx-auto py-16 px-5 ">
        <div>
          <h2
            className={`${mulish.className} text-2xl md:text-3xl lg:text-5xl font-semibold text-[#c44944]`}
          >
            Long Term Courses
          </h2>
          <p
            className={`${poppins.className} text-gray-600 mt-6 text-2xl  lg:text-3xl`}
          >
            These courses focus on academic education and professional
            preparation.
          </p>

          <div className="mt-12 border-b-4 border-[#7EACB5] w-full"></div>
        </div>

        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <div className="flex flex-col gap-20 md:gap-28">
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                points={course.points}
                image={course.image}
                reverse={index % 2 !== 0}
              />
            ))}
          </div>
        </section>

        <div className="pt-10">
          <h2
            className={`${mulish.className} text-[#c44944] text-2xl md:text-3xl lg:text-5xl font-semibold`}
          >
            Short Term Courses
          </h2>
          <p
            className={`${poppins.className} text-gray-600 mt-4 text-2xl  lg:text-3xl`}
          >
            Practical skills courses in shorter duration.
          </p>

          <div className="border-b-5 border-[#7EACB5] mt-6"></div>
        </div>

        <div className="relative w-full h-90 md:h-150 rounded-3xl overflow-hidden mt-20">
          <img
            src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/13.png"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 rounded-3xl" />

          <div className="absolute bottom-4 md:bottom-24 left-6 md:left-20 lg:left-20">
            <h1
              className={`${mulish.className} text-white mt-8 text-3xl md:text-5xl font-semibold`}
            >
              Beautician Courses
            </h1>

            <p
              className={`${mulish.className}  text-white mt-3  text-m md:text-3xl`}
            >
              Training in beauty and grooming skills such as skincare, makeup,
              and hair styling. Suitable for salon work or personal services.
            </p>

            <button
              className={`${mulish.className}
            text-white mt-4 text-lg md:text-3xl font-medium  flex items-center gap-2 hover:gap-4 transition-all duration-300`}
            >
              Enquire Now
              <span className="text-3xl">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
