"use client";

import { useState } from "react";
import { Mulish } from "next/font/google";
import { motion } from "framer-motion";
import { ENQUIRY_TYPES } from "@/lib/constants";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function EnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    enquiry_type: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.first_name || !form.last_name || !form.email || !form.phone || !form.enquiry_type) {
      setError("Please fill all required fields");
      return false;
    }

    const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;

    if (!nameRegex.test(form.first_name.trim())) {
      setError("First name should contain only alphabets and single spaces");
      return false;
    }

    if (!nameRegex.test(form.last_name.trim())) {
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

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess("Enquiry submitted successfully! We will contact you soon.");
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        enquiry_type: "",
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
        <div className="text-green-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg bg-green-50 p-3 rounded-lg">
          {success}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <form className="space-y-8 sm:space-y-10 md:space-y-12" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* FIRST NAME */}
          <div>
            <label className="block text-gray-500 text-sm mb-1">First Name *</label>
            <input
              name="first_name"
              type="text"
              placeholder="First Name"
              value={form.first_name}
              onChange={(e) => {
                let value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                value = value.replace(/\s{2,}/g, " ");
                setForm({ ...form, first_name: value });
              }}
              className="w-full bg-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl placeholder:text-gray-400 border-b-2 border-gray-500 focus:outline-none focus:border-black pb-2 sm:pb-3"
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label className="block text-gray-500 text-sm mb-1">Last Name *</label>
            <input
              name="last_name"
              type="text"
              placeholder="Last Name"
              value={form.last_name}
              onChange={(e) => {
                let value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                value = value.replace(/\s{2,}/g, " ");
                setForm({ ...form, last_name: value });
              }}
              className="w-full bg-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl placeholder:text-gray-400 border-b-2 border-gray-500 focus:outline-none focus:border-black pb-2 sm:pb-3"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* EMAIL */}
          <div>
            <label className="block text-gray-500 text-sm mb-1">Email *</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl placeholder:text-gray-400 border-b-2 border-gray-500 focus:outline-none focus:border-black pb-2 sm:pb-3"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-gray-500 text-sm mb-1">Phone Number *</label>
            <input
              name="phone"
              type="tel"
              placeholder="10-digit Number"
              value={form.phone}
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setForm({ ...form, phone: value });
              }}
              className="w-full bg-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl placeholder:text-gray-400 border-b-2 border-gray-500 focus:outline-none focus:border-black pb-2 sm:pb-3"
            />
          </div>
        </div>

        {/* ENQUIRY TYPE */}
        <div>
          <label className="block text-gray-500 text-sm mb-1">Enquiry Type *</label>
          <select
            name="enquiry_type"
            value={form.enquiry_type}
            onChange={handleChange}
            className="w-full bg-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl border-b-2 border-gray-500 focus:outline-none focus:border-black pb-2 sm:pb-3 cursor-pointer"
          >
            <option value="">Select enquiry type</option>
            {ENQUIRY_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* MESSAGE */}
        <div>
          <label className="block text-gray-500 text-sm mb-1">Message (optional)</label>
          <textarea
            name="message"
            placeholder="Tell us more about your enquiry..."
            rows={2}
            value={form.message}
            onChange={handleChange}
            className="w-full bg-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl placeholder:text-gray-400 border-b-2 border-gray-500 focus:outline-none focus:border-black pb-2 sm:pb-3 resize-none"
          />
        </div>

        <div className="flex justify-center md:justify-end pt-6 sm:pt-8 md:pt-10">
          <motion.button
            type="submit"
            disabled={loading}
            className="bg-[#0d6b57] hover:bg-[#095647] text-white 
              text-base sm:text-lg md:text-xl lg:text-2xl 
              px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 
              rounded-full shadow-md transition disabled:opacity-50"
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
