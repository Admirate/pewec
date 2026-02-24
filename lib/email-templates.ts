// Email Templates for PEWEC
// Backend Engineer: Use these templates with Resend or any email service

export const courseEnquiryEmailTemplate = (data: {
  name: string;
  email: string;
  course_type: string;
  course_name: string;
}) => {
  const courseTypeLabel = data.course_type === "long_term" ? "Long Term" : "Short Term";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Enquiry Confirmation - PEWEC</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #c44944; padding: 30px 40px; text-align: center;">
              <img src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/logo/peweclogo.png" alt="PEWEC Logo" style="width: 80px; height: 80px; background: white; border-radius: 50%; padding: 10px;">
              <h1 style="color: #ffffff; margin: 20px 0 0 0; font-size: 24px; font-weight: 600;">
                Princess Esin Women's Educational Centre
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 22px;">
                Thank You for Your Enquiry! 🎓
              </h2>
              
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear <strong>${data.name}</strong>,
              </p>
              
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for showing interest in our courses at PEWEC. We have received your enquiry and our team will get back to you shortly.
              </p>
              
              <!-- Enquiry Details Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f9fa; border-radius: 12px; margin: 30px 0;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: #c44944; margin: 0 0 15px 0; font-size: 18px;">
                      Your Enquiry Details
                    </h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #888888; font-size: 14px; width: 120px;">Course Type:</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600;">${courseTypeLabel} Course</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888888; font-size: 14px;">Course Name:</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600;">${data.course_name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888888; font-size: 14px;">Email:</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px;">${data.email}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Our admissions team will contact you within <strong>24-48 hours</strong> to discuss the course details, fees, and admission process.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="https://pewec.com/courses" style="display: inline-block; background-color: #006457; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 50px; font-size: 16px; font-weight: 600;">
                      View All Courses
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px 40px; border-top: 1px solid #eeeeee;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="text-align: center;">
                    <p style="color: #888888; font-size: 14px; margin: 0 0 10px 0;">
                      <strong>Contact Us</strong>
                    </p>
                    <p style="color: #888888; font-size: 13px; margin: 0 0 5px 0;">
                      📞 +91 40 24578078 | +91 40 24520761
                    </p>
                    <p style="color: #888888; font-size: 13px; margin: 0 0 5px 0;">
                      📧 pewecpewec@yahoo.co.in
                    </p>
                    <p style="color: #888888; font-size: 13px; margin: 0 0 20px 0;">
                      📍 223, 6A3 Building, Purani Haveli Road, Hyderabad - 500002
                    </p>
                    <p style="color: #aaaaaa; font-size: 12px; margin: 0;">
                      © ${new Date().getFullYear()} Princess Esin Women's Educational Centre. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

export const contactEnquiryEmailTemplate = (data: {
  first_name: string;
  last_name: string;
  email: string;
  enquiry_type: string;
}) => {
  const enquiryTypeLabels: Record<string, string> = {
    general: "General Inquiry",
    admission: "Admission Related",
    fees: "Fees & Payment",
    facilities: "Facilities & Campus",
    other: "Other",
  };

  const enquiryTypeLabel = enquiryTypeLabels[data.enquiry_type] || data.enquiry_type;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enquiry Confirmation - PEWEC</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #006457; padding: 30px 40px; text-align: center;">
              <img src="https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/website-assets/logo/peweclogo.png" alt="PEWEC Logo" style="width: 80px; height: 80px; background: white; border-radius: 50%; padding: 10px;">
              <h1 style="color: #ffffff; margin: 20px 0 0 0; font-size: 24px; font-weight: 600;">
                Princess Esin Women's Educational Centre
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 22px;">
                We've Received Your Message! 📩
              </h2>
              
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear <strong>${data.first_name} ${data.last_name}</strong>,
              </p>
              
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for reaching out to us. We have received your enquiry and appreciate you taking the time to contact PEWEC.
              </p>
              
              <!-- Enquiry Details Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f0f9f7; border-radius: 12px; margin: 30px 0; border-left: 4px solid #006457;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: #006457; margin: 0 0 15px 0; font-size: 18px;">
                      Enquiry Summary
                    </h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #888888; font-size: 14px; width: 120px;">Enquiry Type:</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600;">${enquiryTypeLabel}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888888; font-size: 14px;">Email:</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px;">${data.email}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 10px 0;">
                Our team will review your enquiry and respond within <strong>24-48 hours</strong>.
              </p>
              
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                If your matter is urgent, please don't hesitate to call us directly.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="https://pewec.com" style="display: inline-block; background-color: #c44944; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 50px; font-size: 16px; font-weight: 600;">
                      Visit Our Website
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px 40px; border-top: 1px solid #eeeeee;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="text-align: center;">
                    <p style="color: #888888; font-size: 14px; margin: 0 0 10px 0;">
                      <strong>Contact Us</strong>
                    </p>
                    <p style="color: #888888; font-size: 13px; margin: 0 0 5px 0;">
                      📞 +91 40 24578078 | +91 40 24520761
                    </p>
                    <p style="color: #888888; font-size: 13px; margin: 0 0 5px 0;">
                      📧 pewecpewec@yahoo.co.in
                    </p>
                    <p style="color: #888888; font-size: 13px; margin: 0 0 20px 0;">
                      📍 223, 6A3 Building, Purani Haveli Road, Hyderabad - 500002
                    </p>
                    <p style="color: #aaaaaa; font-size: 12px; margin: 0;">
                      © ${new Date().getFullYear()} Princess Esin Women's Educational Centre. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

// Subject lines for emails
export const EMAIL_SUBJECTS = {
  courseEnquiry: "Thank You for Your Course Enquiry - PEWEC",
  contactEnquiry: "We've Received Your Message - PEWEC",
};
