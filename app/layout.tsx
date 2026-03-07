import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalEnquiryModal from "@/components/GlobalEnquiryModal";
import { siteConfig } from "@/lib/seo";
import { getOrganizationJsonLd } from "@/lib/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.shortName}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = JSON.stringify(getOrganizationJsonLd());

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen overflow-x-hidden`}
      >
        <script type="application/ld+json">{jsonLd}</script>
        <GlobalEnquiryModal>{children}</GlobalEnquiryModal>
      </body>
    </html>
  );
}
