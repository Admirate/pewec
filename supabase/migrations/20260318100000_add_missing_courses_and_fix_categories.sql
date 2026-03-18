-- ---------------------------------------------------------------------------
-- Move Art and Craft from short_term to long_term (per issue #23)
-- ---------------------------------------------------------------------------

UPDATE courses SET type = 'long_term' WHERE name = 'Art and Craft';

-- ---------------------------------------------------------------------------
-- Add the 5 missing short term courses
-- ---------------------------------------------------------------------------

INSERT INTO courses (name, type, description, image, rep_email, is_active) VALUES
  (
    'Calligraphy Course',
    'short_term',
    'A creative course that teaches decorative writing and lettering. Suitable for artistic learning and skill development.',
    'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/13.png',
    'pewecpewec@yahoo.com, princessesingnm@gmail.com, essentials@admirate.in',
    true
  ),
  (
    'Computer Courses',
    'short_term',
    'Basic computer training for everyday and office use. Includes computer fundamentals and essential digital skills.',
    'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/13.png',
    'pewecpewec@yahoo.com, princessesingnm@gmail.com, essentials@admirate.in',
    true
  ),
  (
    'Cookery Courses',
    'short_term',
    'Training in cooking skills for home and professional use. Includes different styles of cooking and food preparation. Suitable for home catering and food related work.',
    'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/13.png',
    'pewecpewec@yahoo.com, princessesingnm@gmail.com, essentials@admirate.in',
    true
  ),
  (
    'Tailoring Courses',
    'short_term',
    'Practical training in garment stitching and tailoring. Students learn to stitch, design, and prepare garments.',
    'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/13.png',
    'pewecpewec@yahoo.com, princessesingnm@gmail.com, essentials@admirate.in',
    true
  ),
  (
    'Spoken English Courses',
    'short_term',
    'This course helps improve English speaking, reading, and writing. Focuses on confidence and daily communication skills.',
    'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/13.png',
    'pewecpewec@yahoo.com, princessesingnm@gmail.com, essentials@admirate.in',
    true
  );

-- ---------------------------------------------------------------------------
-- Update rep_email for all existing courses to the new distribution list
-- ---------------------------------------------------------------------------

UPDATE courses SET rep_email = 'pewecpewec@yahoo.com, princessesingnm@gmail.com, essentials@admirate.in';
