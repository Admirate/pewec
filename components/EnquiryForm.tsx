"use client";

import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function EnquiryForm() {
  return (
    <div>
      <h2
        className={`${mulish.className} text-[#c44944] text-3xl md:text-3xl lg:text-5xl font-semibold mb-4`}
      >
        Enquiry Form
      </h2>

      <p className="text-gray-600 mb-10 text-xl lg:text-[25px]">
        Please fill the form below and our team will contact you.
      </p>

      <form className="space-y-16">
        {/* ROW 1 */}
        <div className="grid md:grid-cols-2 gap-16">
          <input
            type="text"
            placeholder="First Name"
            className="w-full bg-transparent text-2xl md:text-3xl placeholder:text-black border-b-2 border-gray-500 focus:outline-none focus:border-black pb-3"
          />

          <input
            type="text"
            placeholder="Last Name"
            className="w-full bg-transparent text-2xl md:text-3xl placeholder:text-black border-b-2 border-gray-500 focus:outline-none focus:border-black pb-3"
          />
        </div>

        {/* ROW 2 */}
        <div className="grid md:grid-cols-2 gap-16">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-transparent text-2xl md:text-3xl placeholder:text-black border-b-2 border-gray-500 focus:outline-none focus:border-black pb-3"
          />

          <input
            type="text"
            placeholder="Number"
            className="w-full bg-transparent text-2xl md:text-3xl placeholder:text-black border-b-2 border-gray-500 focus:outline-none focus:border-black pb-3"
          />
        </div>

        {/* MESSAGE */}
        <div>
          <textarea
            placeholder="Message"
            rows={2}
            className="w-full bg-transparent text-2xl md:text-3xl placeholder:text-black border-b-2 border-gray-500 focus:outline-none focus:border-black pb-3 resize-none"
          />
        </div>

        {/* BUTTON */}
        <div className="flex justify-end pt-10">
          <button className="bg-[#0d6b57] hover:bg-[#095647] text-white text-xl md:text-2xl px-12 py-5 rounded-full shadow-md transition">
            Submit Enquiry
          </button>
        </div>
      </form>
    </div>
  );
}
