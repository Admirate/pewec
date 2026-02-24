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
export type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
};

export type Enquiry = {
  id: string;
  contact_id: string;
  enquiry_type: "course" | "general" | "admission" | "fees" | "facilities" | "other";
  enquiry_details: string | null;
  phone: string | null;
  course_length: "long_term" | "short_term" | null;
  course_name: string | null;
  is_read: boolean;
  created_at: string;
};
