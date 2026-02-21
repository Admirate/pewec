"use client";

import { useState } from "react";
import { Mulish } from "next/font/google";
import { motion } from "framer-motion";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function EnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      setError("Please fill all required fields");
      return false;
    }

    const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;

    if (!nameRegex.test(form.firstName.trim())) {
      setError("First name should contain only alphabets and single spaces");
      return false;
    }

    if (!nameRegex.test(form.lastName.trim())) {
      setError("Last name should contain only alphabets and single spaces");
      return false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      setError("Enter valid email");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      setError("Phone number must be exactly 10 digits");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch("/api/contact-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess("Enquiry submitted successfully!");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2
        className={`${mulish.className} text-[#c44944] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4`}
      >
        Enquiry Form
      </h2>

      <p className="text-gray-600 mb-6 sm:mb-8 md:mb-10 text-base sm:text-lg md:text-xl lg:text-2xl">
        Please fill the form below and our team will contact you.
      </p>

      {/* Success */}
      {success && (
        <div className="text-green-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
          {success}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
          {error}
        </div>
      )}

      <form className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => {
              let value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
              value = value.replace(/\s{2,}/g, " ");
              setForm({ ...form, firstName: value });
            }}
            className="w-full bg-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl placeholder:text-black border-b-2 border-gray-500 focus:outline-none focus:border-black pb-2 sm:pb-3"
          />

          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => {
              let value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
              value = value.replace(/\s{2,}/g, " ");
              setForm({ ...form, lastName: value });
            }}
            className="w-full bg-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl placeholder:text-black border-b-2 border-gray-500 focus:outline-none focus:border-black pb-2 sm:pb-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl placeholder:text-black border-b-2 border-gray-500 focus:outline-none focus:border-black pb-2 sm:pb-3"
          />

          <input
            name="phone"
            type="tel"
            placeholder="Number"
            value={form.phone}
            maxLength={10}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setForm({ ...form, phone: value });
            }}
            className="w-full bg-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl placeholder:text-black border-b-2 border-gray-500 focus:outline-none focus:border-black pb-2 sm:pb-3"
          />
        </div>

        {/* MESSAGE */}
        <div>
          <textarea
            name="message"
            placeholder="Message"
            rows={2}
            value={form.message}
            onChange={handleChange}
            className="w-full bg-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl placeholder:text-black border-b-2 border-gray-500 focus:outline-none focus:border-black pb-2 sm:pb-3 resize-none"
          />
        </div>

        <div className="flex justify-center md:justify-end pt-6 sm:pt-8 md:pt-10">
          <motion.button
            type="submit"
            disabled={loading}
            className="bg-[#0d6b57] hover:bg-[#095647] text-white 
              text-base sm:text-lg md:text-xl lg:text-2xl 
              px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 
              rounded-full shadow-md transition"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
