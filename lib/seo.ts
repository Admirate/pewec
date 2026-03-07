export const siteConfig = {
  name: "Princess Esin Women's Educational Centre",
  shortName: "PEWEC",
  description:
    "Princess Esin Women's Educational Centre (PEWEC) offers education and vocational training for women in Hyderabad, India. Courses in academics, computer skills, beauty, and more.",
  url: process.env.NEXT_PUBLIC_CANONICAL_URL?.replace(/\/+$/, "") ?? "https://pewec.com",
  logo: "https://aytfswwvnsuazudapbuo.supabase.co/storage/v1/object/public/email-creatives/images/logo.png",
  address: {
    street: "223, 6A3 Building adjacent to Durru Shehvar Hospital",
    locality: "No 5 Purani Haveli Road",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500002",
    country: "IN",
  },
  phone: ["+91 40 24578078", "+91 40 24520761"],
  email: "pewecpewec@yahoo.co.in",
  parentOrganization: "Nizamia Hyderabad Women's Association Trust",
};
