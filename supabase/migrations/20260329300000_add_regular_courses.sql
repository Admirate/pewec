-- Add 'regular' to the courses type CHECK constraint

ALTER TABLE courses DROP CONSTRAINT IF EXISTS courses_type_check;
ALTER TABLE courses ADD CONSTRAINT courses_type_check
  CHECK (type IN ('long_term', 'short_term', 'regular'));

-- Insert the 4 regular courses (SIVE recognised)

INSERT INTO courses (name, type, description, image, bullet_points, rep_email, is_active) VALUES
  (
    'ECHE (SIVE)',
    'regular',
    'Early Childhood Education course recognised by SIVE. Equips students with skills in child care, early learning methods, and child development. Ideal for women seeking a career in education and childcare.',
    'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/9.png',
    ARRAY['Duration: 1 year', 'Recognised by SIVE'],
    'pewecpewec@yahoo.com, princessesingnm@gmail.com, essentials@admirate.in',
    true
  ),
  (
    'HCMPW (SIVE)',
    'regular',
    'Home Care Management for Professional Women, recognised by SIVE. Covers home management, nutrition, family welfare, and professional housekeeping skills for personal and career development.',
    'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/11.png',
    ARRAY['Duration: 1 year', 'Recognised by SIVE'],
    'pewecpewec@yahoo.com, princessesingnm@gmail.com, essentials@admirate.in',
    true
  ),
  (
    'Office Automation (SIVE)',
    'regular',
    'A SIVE-recognised course covering computer and office automation skills. Includes essential digital tools, MS Office applications, data entry, and professional office management techniques.',
    'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/13.png',
    ARRAY['Duration: 6 months', 'Recognised by SIVE'],
    'pewecpewec@yahoo.com, princessesingnm@gmail.com, essentials@admirate.in',
    true
  ),
  (
    'Inservice',
    'regular',
    'A professional development course designed for working women to enhance and update their existing skills. Focuses on practical knowledge and competency improvement in their respective fields.',
    'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/7.png',
    ARRAY['Duration: 6 months'],
    'pewecpewec@yahoo.com, princessesingnm@gmail.com, essentials@admirate.in',
    true
  );
