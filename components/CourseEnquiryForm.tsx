"use client";

import { useState } from "react";
import { Mulish } from "next/font/google";
import { LONG_TERM_COURSES, SHORT_TERM_COURSES } from "@/lib/constants";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function CourseEnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course_type: "" as "long_term" | "short_term" | "",
    course_name: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    
    if (name === "course_type") {
      setForm({ ...form, course_type: value as "long_term" | "short_term" | "", course_name: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.course_type || !form.course_name) {
      setError("Please fill all required fields");
      return false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      setError("Enter valid email");
      return false;
    }

    const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
    if (!nameRegex.test(form.name.trim())) {
      setError("Name should contain only alphabets and single spaces");
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

      const res = await fetch("/api/course-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess("Enquiry submitted successfully! We will contact you soon.");
      setForm({
        name: "",
        email: "",
        phone: "",
        course_type: "",
        course_name: "",
        message: "",
      });
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const availableCourses = form.course_type === "long_term" 
    ? LONG_TERM_COURSES 
    : form.course_type === "short_term" 
      ? SHORT_TERM_COURSES 
      : [];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl shadow-lg">
      <h2
        className={`${mulish.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6 text-[#c44944]`}
      >
        Course Enquiry Form
      </h2>

      {/* SUCCESS */}
      {success && (
        <div className="bg-green-100 text-green-700 p-2 sm:p-3 rounded mb-3 sm:mb-4 text-sm sm:text-base">
          {success}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 sm:p-3 rounded mb-3 sm:mb-4 text-sm sm:text-base">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
        {/* NAME */}
        <div>
          <label className="block text-gray-600 text-sm mb-1">Full Name *</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) => {
              let value = e.target.value;
              value = value.replace(/[^a-zA-Z\s]/g, "");
              value = value.replace(/\s{2,}/g, " ");
              setForm({ ...form, name: value });
            }}
            className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-transparent"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-gray-600 text-sm mb-1">Email *</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-transparent"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-gray-600 text-sm mb-1">Phone *</label>
          <input
            name="phone"
            type="tel"
            placeholder="Enter 10-digit phone number"
            value={form.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setForm({ ...form, phone: value });
            }}
            maxLength={10}
            className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-transparent"
          />
        </div>

        {/* COURSE TYPE */}
        <div>
          <label className="block text-gray-600 text-sm mb-1">Course Type *</label>
          <select
            name="course_type"
            value={form.course_type}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-transparent cursor-pointer"
          >
            <option value="">Select course type</option>
            <option value="long_term">Long Term Course</option>
            <option value="short_term">Short Term Course</option>
          </select>
        </div>

        {/* COURSE NAME */}
        <div>
          <label className="block text-gray-600 text-sm mb-1">Course Name *</label>
          <select
            name="course_name"
            value={form.course_name}
            onChange={handleChange}
            disabled={!form.course_type}
            className={`w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-transparent ${
              !form.course_type ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <option value="">
              {form.course_type ? "Select a course" : "First select course type"}
            </option>
            {availableCourses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* MESSAGE */}
        <div>
          <label className="block text-gray-600 text-sm mb-1">Message (optional)</label>
          <textarea
            name="message"
            placeholder="Any additional information..."
            value={form.message}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-2 sm:py-3 resize-none text-sm sm:text-base md:text-lg bg-transparent"
            rows={3}
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`${mulish.className}
            bg-[#006457] hover:bg-[#05443c]
            text-white font-semibold
            px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full
            text-sm sm:text-base md:text-lg lg:text-xl
            transition w-full md:w-fit disabled:opacity-50`}
        >
          {loading ? "Submitting..." : "Submit Enquiry"}
        </button>
      </form>
    </div>
  );
}
