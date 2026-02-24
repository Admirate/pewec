-- contacts: the person, deduplicated by email
CREATE TABLE contacts (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name  text        NOT NULL,
  last_name   text        NOT NULL,
  email       text        NOT NULL UNIQUE,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- enquiries: each interaction, linked to a contact
CREATE TABLE enquiries (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id       uuid        NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  enquiry_type     text        NOT NULL CHECK (enquiry_type IN ('course', 'general', 'admission', 'fees', 'facilities', 'other')),
  enquiry_details  text,
  phone            text,
  course_length    text        CHECK (course_length IN ('long_term', 'short_term') OR course_length IS NULL),
  course_name      text,
  is_read          boolean     NOT NULL DEFAULT false,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- index for querying all enquiries for a given contact
CREATE INDEX idx_enquiries_contact_id ON enquiries(contact_id);
