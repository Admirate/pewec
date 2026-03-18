-- Add display columns for the public courses page
ALTER TABLE courses ADD COLUMN image text;
ALTER TABLE courses ADD COLUMN bullet_points text[];

-- ---------------------------------------------------------------------------
-- Backfill existing courses with images, descriptions, and bullet_points
-- (descriptions were defined in the schema but never populated by the seed)
-- ---------------------------------------------------------------------------

UPDATE courses SET
  description = 'This course is for women who wish to become teachers. It focuses on teaching methods, classroom skills, and child development.',
  image  = 'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/7.png',
  bullet_points = ARRAY['9 Months Program', '6 Months Program', '3 Months Program']
WHERE name = 'Teacher Training';

UPDATE courses SET
  description = 'This course helps students develop creative and artistic skills. Suitable for teaching, creative work, and home based income opportunities.',
  image = 'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/8.png'
WHERE name = 'Art and Craft';

UPDATE courses SET
  description = 'A professional diploma program started in 1991. Recognized by the General Nursing Council, Government of Telangana. The course prepares students for nursing work through theory and practical training.',
  image = 'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/9.png'
WHERE name = 'General Nursing';

UPDATE courses SET
  description = 'This course trains students to care for patients in home settings. Focuses on basic nursing care and patient support.',
  image = 'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/11.png'
WHERE name = 'Homecare Nursing';

UPDATE courses SET
  description = 'Training in beauty and grooming skills such as skincare, makeup, and hair styling. Suitable for salon work or personal services.',
  image = 'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/13.png'
WHERE name = 'Beautician Course';

-- ---------------------------------------------------------------------------
-- Consolidate the four Intermediate stream rows into a single course
-- with the streams listed in the bullet_points array.
--
-- The DELETE cascades SET NULL on enquiries.course_id (no data loss —
-- enquiries.course_name is stored separately as text).
-- ---------------------------------------------------------------------------

DELETE FROM courses WHERE name LIKE 'Intermediate - %';

INSERT INTO courses (name, type, description, image, bullet_points, rep_email, is_active)
VALUES (
  'Intermediate Education',
  'long_term',
  'Offered through Princess Esin Junior College for Women. This course supports students preparing for higher education.',
  'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/10.png',
  ARRAY['BiPC', 'MPC', 'CEC', 'MEC'],
  'rep@pewec.com',
  true
);
