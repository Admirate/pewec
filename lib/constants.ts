export const ENQUIRY_TYPES = [
  { id: "general", name: "General Inquiry" },
  { id: "admission", name: "Admission Related" },
  { id: "fees", name: "Fees & Payment" },
  { id: "facilities", name: "Facilities & Campus" },
  { id: "other", name: "Other" },
];

// ---------------------------------------------------------------------------
// Database types
// ---------------------------------------------------------------------------

export type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
};

export type Course = {
  id: string;
  name: string;
  type: "long_term" | "short_term";
  description: string | null;
  rep_email: string;
  is_active: boolean;
  created_at: string;
};

export type Enquiry = {
  id: string;
  contact_id: string;
  course_id: string | null;
  enquiry_type: "course" | "general" | "admission" | "fees" | "facilities" | "other";
  enquiry_details: string | null;
  phone: string | null;
  course_name: string | null;
  is_read: boolean;
  created_at: string;
};

export type EnquiryWithContact = Enquiry & {
  first_name: string;
  last_name: string;
  email: string;
};
