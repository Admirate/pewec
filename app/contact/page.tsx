"use client";

import Navbar from "@/components/Navbar";
import { Mulish } from "next/font/google";
import EnquiryForm from "@/components/EnquiryForm";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ContactPage() {
  return (
    <div className="w-full bg-neutral-100">
      <Navbar />

      {/* Hero */}
      <section className="px-6 md:px-12 mt-6">
        <div className="relative w-full  h-70 md:h-85 rounded-3xl overflow-hidden">
          <img
            src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/15.png"
            alt="contact"
            className="w-full h-full object-cover "
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute bottom-6 md:bottom-16 left-6 md:left-24">
            <h1
              className={`${mulish.className} text-white text-3xl md:text-5xl font-semibold`}
            >
              Contact Us
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-16">
          <div>
            <h2
              className={`${mulish.className} text-[#c44944] text-3xl md:text-3xl lg:text-5xl font-semibold mb-6`}
            >
              Visit Us
            </h2>
            <p className="text-gray-700  text-xl  lg:text-[25px] ">
              223, 6A3 Building adjacent to Durru Shehvar Hospital, No 5 Purani
              Haveli Road,
              <br /> Hyderabad Telangana 500002
            </p>
          </div>

          <div>
            <h2
              className={`${mulish.className} text-[#c44944]  text-3xl md:text-3xl lg:text-5xl font-semibold mb-6`}
            >
              Office Hours
            </h2>
            <p className="text-gray-700 text-xl  lg:text-[25px]">
              Monday to Friday <br />
              9 30 am to 5 00 pm <br />
              Second and fourth Saturdays and Sundays <br />
              Closed
            </p>
          </div>
        </div>

        <div>
          <h2
            className={`${mulish.className} text-[#c44944] text-3xl lg:text-5xl font-semibold mb-6`}
          >
            Contact
          </h2>

          <div className="space-y-6">
            <div>
              <p className="text-[#7EACB5] font-medium text-2xl lg:text-4xl">
                Phone
              </p>
              <p className="text-gray-700 text-xl lg:text-[25px] mt-3">
                +91 40 24578078
              </p>
              <p className="text-gray-700 text-xl  lg:text-[25px]">
                +91 40 24520761
              </p>
            </div>

            <div>
              <p className="text-[#7EACB5] font-medium text-2xl lg:text-4xl">
                Email
              </p>
              <p className="text-gray-700 text-xl lg:text-[25px] mt-3">
                pewecpewec@yahoo.co.in
              </p>
            </div>
          </div>
        </div>

        {/* ENQUIRY FORM */}
        <EnquiryForm />
        
      </section>
    </div>
  );
}
