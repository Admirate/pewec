-- Reset descriptions to originals and set sub-courses as bullet_points

UPDATE courses SET
  description = 'Basic computer training for everyday and office use. Includes computer fundamentals and essential digital skills.',
  bullet_points = ARRAY['PGDCP (6 months)', 'Tally / MS-Office (2 months)']
WHERE name = 'Computer Courses';

UPDATE courses SET
  description = 'Training in beauty and grooming skills such as skincare, makeup, and hair styling. Suitable for salon work or personal services.',
  bullet_points = ARRAY['Beauty Therapy - Professional (3 months)', 'Beauty Therapy - Advanced (3 months)', 'Self-Grooming (1 month)', 'Self-Makeup (1 month)']
WHERE name = 'Beautician Course';

UPDATE courses SET
  description = 'Training in cooking skills for home and professional use. Includes different styles of cooking and food preparation. Suitable for home catering and food related work.',
  bullet_points = ARRAY['Bakery (2 weeks)', 'Kebabs (2 weeks)', 'Mixed Cookery (3 weeks)', 'Professional Non-Veg. Cookery (45 days)', 'Chat (1 week)']
WHERE name = 'Cookery Courses';

UPDATE courses SET
  description = 'A creative course that teaches decorative writing and lettering. Suitable for artistic learning and skill development.',
  bullet_points = ARRAY['Calligraphy Level 1 (1 month)', 'Calligraphy Level 2 (1 month)', 'Calligraphy Spenserian (1 month)', 'Draw-Sketch (1 month)', 'Fabric Painting (1 month)']
WHERE name = 'Calligraphy Course';

UPDATE courses SET
  description = 'This course helps improve English speaking, reading, and writing. Focuses on confidence and daily communication skills.',
  bullet_points = ARRAY['English Level 1 (1 month)', 'English Level 2 (1 month)', 'English Level 3 (1 month)', 'English Professional (6 months)']
WHERE name = 'Spoken English Courses';

UPDATE courses SET
  description = 'Practical training in garment stitching and tailoring. Students learn to stitch, design, and prepare garments.',
  bullet_points = ARRAY['Tailoring Basic (2 months)', 'Tailoring Advanced (2 months)', 'Garment Designing (3 months)', 'Customised Garment Design (1 month)']
WHERE name = 'Tailoring Courses';
