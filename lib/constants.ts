// Course options for the forms
export const LONG_TERM_COURSES = [
  { id: "teacher_training", name: "Teacher Training" },
  { id: "general_nursing", name: "General Nursing" },
  { id: "intermediate_bipc", name: "Intermediate - BiPC" },
  { id: "intermediate_mpc", name: "Intermediate - MPC" },
  { id: "intermediate_cec", name: "Intermediate - CEC" },
  { id: "intermediate_mec", name: "Intermediate - MEC" },
  { id: "homecare_nursing", name: "Homecare Nursing" },
];

export const SHORT_TERM_COURSES = [
  { id: "beautician", name: "Beautician Course" },
  { id: "art_craft", name: "Art and Craft" },
];

export const ENQUIRY_TYPES = [
  { id: "general", name: "General Inquiry" },
  { id: "admission", name: "Admission Related" },
  { id: "fees", name: "Fees & Payment" },
  { id: "facilities", name: "Facilities & Campus" },
  { id: "other", name: "Other" },
];

// Type definitions for our tables
export type CourseEnquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  course_type: "long_term" | "short_term";
  course_name: string;
  message: string | null;
  created_at: string;
  is_read: boolean;
};

export type ContactEnquiry = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  enquiry_type: "general" | "admission" | "fees" | "facilities" | "other";
  message: string | null;
  created_at: string;
  is_read: boolean;
};
