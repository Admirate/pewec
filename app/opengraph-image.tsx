import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #006457 0%, #043d36 100%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={siteConfig.logo}
        alt=""
        width={120}
        height={120}
        style={{ borderRadius: 20, marginBottom: 32 }}
      />
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          textAlign: "center",
          maxWidth: 800,
          lineHeight: 1.2,
        }}
      >
        {siteConfig.name}
      </div>
      <div
        style={{
          fontSize: 24,
          marginTop: 16,
          opacity: 0.85,
          textAlign: "center",
          maxWidth: 600,
        }}
      >
        Education for Women in Hyderabad
      </div>
    </div>,
    { ...size },
  );
}
