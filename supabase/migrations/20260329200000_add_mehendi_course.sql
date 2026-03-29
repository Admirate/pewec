-- Add Mehendi as a new short-term course

INSERT INTO courses (name, type, description, image, bullet_points, rep_email, is_active)
VALUES (
  'Mehendi Course',
  'short_term',
  'A traditional art course teaching the application of henna designs on hands and feet. Students learn classic and contemporary Mehendi patterns suitable for weddings, festivals, and everyday use. A great skill for personal enjoyment or professional service.',
  'https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/13.png',
  ARRAY['Mehendi Basic (1 month)', 'Mehendi Advanced (3 months)'],
  'pewecpewec@yahoo.com, princessesingnm@gmail.com, essentials@admirate.in',
  true
);
