-- courses: one record per course offering, with rep email for notifications
CREATE TABLE courses (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text        NOT NULL,
  type        text        NOT NULL CHECK (type IN ('long_term', 'short_term')),
  description text,
  rep_email   text        NOT NULL,
  is_active   boolean     NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- seed the 9 existing courses (rep emails should be updated via the admin UI)
INSERT INTO courses (name, type, rep_email) VALUES
  ('Teacher Training',    'long_term',  'rep@pewec.com'),
  ('General Nursing',     'long_term',  'rep@pewec.com'),
  ('Intermediate - BiPC', 'long_term',  'rep@pewec.com'),
  ('Intermediate - MPC',  'long_term',  'rep@pewec.com'),
  ('Intermediate - CEC',  'long_term',  'rep@pewec.com'),
  ('Intermediate - MEC',  'long_term',  'rep@pewec.com'),
  ('Homecare Nursing',    'long_term',  'rep@pewec.com'),
  ('Beautician Course',   'short_term', 'rep@pewec.com'),
  ('Art and Craft',       'short_term', 'rep@pewec.com');

-- add course_id FK to enquiries; nullable so existing rows are unaffected
ALTER TABLE enquiries
  ADD COLUMN course_id uuid REFERENCES courses(id) ON DELETE SET NULL;

-- drop course_length — type is now derived from courses.type via the FK
ALTER TABLE enquiries
  DROP COLUMN course_length;

-- index for looking up all enquiries for a given course
CREATE INDEX idx_enquiries_course_id ON enquiries(course_id);
