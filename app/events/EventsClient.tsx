"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mulish } from "next/font/google";
import { motion } from "framer-motion";

const mulish = Mulish({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function EventsClient() {
  return (
    <div className="w-full bg-neutral-100 overflow-hidden">
      {/* Hero */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[60vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/images/8.png"
          alt="events"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <div className="absolute bottom-4 sm:bottom-8 md:bottom-16 lg:bottom-24 left-4 sm:left-6 md:left-12 lg:left-20 xl:left-40">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className={`${mulish.className} text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold`}
          >
            Events
          </motion.h1>

          <motion.p
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className={`${mulish.className} text-white mt-2 sm:mt-3 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl`}
          >
            Celebrations, programs, and milestones from the PEWEC community.
          </motion.p>
        </div>
      </section>

      {/* Event Flyers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-stretch">
          {/* Flyer 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-md flex-1 flex items-center bg-white">
              <img
                src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/images/events_flyer.jpeg"
                alt="PEWEC Event Flyer"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex justify-center mt-4 sm:mt-6">
              <button
                onClick={async () => {
                  try {
                    const res = await fetch("https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/images/events_flyer.jpeg");
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "PEWEC_Event_Flyer.jpeg";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  } catch {
                    window.open("https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/images/events_flyer.jpeg", "_blank");
                  }
                }}
                className={`${mulish.className} inline-flex items-center gap-2 px-6 py-3 bg-[#c44944] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#a83b37] transition-colors duration-300 cursor-pointer`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                Download Flyer
              </button>
            </div>
          </motion.div>

          {/* Flyer 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-md flex-1 flex items-center bg-white">
              <img
                src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/images/PEWEC_new_flyer.jpeg"
                alt="PEWEC New Event Flyer"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex justify-center mt-4 sm:mt-6">
              <button
                onClick={async () => {
                  try {
                    const res = await fetch("https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/images/PEWEC_new_flyer.jpeg");
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "PEWEC_New_Flyer.jpeg";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  } catch {
                    window.open("https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/images/PEWEC_new_flyer.jpeg", "_blank");
                  }
                }}
                className={`${mulish.className} inline-flex items-center gap-2 px-6 py-3 bg-[#c44944] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#a83b37] transition-colors duration-300 cursor-pointer`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                Download Flyer
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IT Skills Sessions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-6 sm:mb-8"
        >
          <h2 className={`${mulish.className} text-[#c44944] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6`}>
            IT Skills Sessions
          </h2>
          <p className={`${mulish.className} text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed`}>
            IT Skills Sessions held at PEWEC.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            "https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/images/it_skillsesh.jpeg",
            "https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/images/it_skillsesh_2.jpeg",
            "https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/images/it_skill_sesh_3.jpeg",
          ].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-md"
            >
              <img
                src={src}
                alt={`IT Skills Session ${i + 1}`}
                className="w-full h-64 sm:h-72 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Summer Camp Shoot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-6 sm:mb-8"
        >
          <h2 className={`${mulish.className} text-[#c44944] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6`}>
            Summer Camp Shoot
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-md aspect-video max-w-4xl mx-auto"
        >
          <video
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl sm:rounded-3xl"
          >
            <source
              src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/videos/summer%20camp%20shoot-compressed.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
