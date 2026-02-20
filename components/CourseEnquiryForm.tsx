"use client";

import { useState } from "react";
import { Mulish } from "next/font/google";

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
    course: "",
    message: "",
  });

  // handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // validation
 const validate = () => {
   if (!form.name || !form.email || !form.phone || !form.course) {
     setError("Please fill all required fields");
     return false;
   }

   // email validation
   const emailRegex = /^\S+@\S+\.\S+$/;
   if (!emailRegex.test(form.email)) {
     setError("Enter valid email");
     return false;
   }

   // name validation 
   const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
   if (!nameRegex.test(form.name.trim())) {
     setError("Name should contain only alphabets and single spaces");
     return false;
   }

   // phone validation 
   const phoneRegex = /^[0-9]{10}$/;
   if (!phoneRegex.test(form.phone)) {
     setError("Phone number must be exactly 10 digits");
     return false;
   }

   return true;
 };

  // submit
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

      setSuccess("Enquiry submitted successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: "",
      });
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-lg">
      <h2
        className={`${mulish.className} text-2xl md:text-4xl font-semibold mb-6 text-[#c44944]`}
      >
        Course Enquiry Form
      </h2>

      {/* SUCCESS */}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {success}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* NAME */}
        <input
          name="name"
          type="text"
          placeholder="Full Name *"
          value={form.name}
          onChange={(e) => {
            let value = e.target.value;

            value = value.replace(/[^a-zA-Z\s]/g, "");
            value = value.replace(/\s{2,}/g, " ");

            setForm({ ...form, name: value });
          }}
          className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-3"
        />

        {/* EMAIL */}
        <input
          name="email"
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
          className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-3"
        />

        {/* PHONE */}
        <input
          name="phone"
          type="tel"
          placeholder="Phone *"
          value={form.phone}
          onChange={(e) => {
            // only numbers allow
            const value = e.target.value.replace(/\D/g, "");
            setForm({ ...form, phone: value });
          }}
          maxLength={10}
          className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-3"
        />

        {/* COURSE */}
        <input
          name="course"
          placeholder="Course Name *"
          value={form.course}
          onChange={handleChange}
          className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-3"
        />

        {/* MESSAGE */}
        <textarea
          name="message"
          placeholder="Message (optional)"
          value={form.message}
          onChange={handleChange}
          className="w-full border-b-2 border-gray-400 focus:border-[#006457] outline-none py-3 resize-none"
          rows={4}
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`${mulish.className}
          bg-[#006457] hover:bg-[#05443c]
          text-white font-semibold
          px-10 py-4 rounded-full
          text-lg md:text-xl
          transition w-full md:w-fit`}
        >
          {loading ? "Submitting..." : "Submit Enquiry"}
        </button>
      </form>
    </div>
  );
}
