"use client";

import { useState } from "react";
import { Mulish } from "next/font/google";
import { LONG_TERM_COURSES, SHORT_TERM_COURSES } from "@/lib/constants";
import SuccessConfirmation from "@/components/SuccessConfirmation";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type CourseEnquiryFormProps = {
  onSuccess?: () => void;
};

export default function CourseEnquiryForm({ onSuccess }: CourseEnquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    course_length: "" as "long_term" | "short_term" | "",
    course_name: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "course_length") {
      setForm({ ...form, course_length: value as "long_term" | "short_term" | "", course_name: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    if (!form.first_name || !form.last_name || !form.email || !form.phone || !form.course_length || !form.course_name) {
      setError("Please fill all required fields");
      return false;
    }

    const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;

    if (!nameRegex.test(form.first_name.trim())) {
      setError("First name should contain only alphabets");
      return false;
    }

    if (!nameRegex.test(form.last_name.trim())) {
      setError("Last name should contain only alphabets");
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

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          enquiry_type: "course",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || "Something went wrong. Try again.");
      }

      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        course_length: "",
        course_name: "",
        message: "",
      });
      setSubmitted(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const availableCourses = form.course_length === "long_term"
    ? LONG_TERM_COURSES
    : form.course_length === "short_term"
      ? SHORT_TERM_COURSES
      : [];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl shadow-lg">
      {submitted ? (
        <SuccessConfirmation
          message="Thank you for your enquiry!"
          subtitle="Our team will contact you about your course soon."
          onClose={() => {
            setSubmitted(false);
            setError("");
            onSuccess?.();
          }}
        />
      ) : (
      <>
      <h2
        className={`${mulish.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6 text-[#c44944]`}
      >
        Course Enquiry Form
      </h2>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 sm:p-3 rounded mb-3 sm:mb-4 text-sm sm:text-base">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
        {/* NAME FIELDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-gray-600 text-sm mb-1">First Name *</label>
            <input
              name="first_name"
              type="text"
              placeholder="First name"
              value={form.first_name}
              onChange={(e) => {
                let value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                value = value.replace(/\s{2,}/g, " ");
                setForm({ ...form, first_name: value });
              }}
              className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Last Name *</label>
            <input
              name="last_name"
              type="text"
              placeholder="Last name"
              value={form.last_name}
              onChange={(e) => {
                let value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                value = value.replace(/\s{2,}/g, " ");
                setForm({ ...form, last_name: value });
              }}
              className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-transparent"
            />
          </div>
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
            name="course_length"
            value={form.course_length}
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
            disabled={!form.course_length}
            className={`w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-transparent ${
              !form.course_length ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <option value="">
              {form.course_length ? "Select a course" : "First select course type"}
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
      </>
      )}
    </div>
  );
}
