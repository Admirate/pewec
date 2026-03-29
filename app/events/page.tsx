import type { Metadata } from "next";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Events | PEWEC",
  description:
    "Stay updated with the latest events, programs, and activities at Princess Esin Women's Educational Centre.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Events | PEWEC",
    description:
      "Stay updated with the latest events, programs, and activities at Princess Esin Women's Educational Centre.",
    url: "/events",
  },
  twitter: {
    title: "Events | PEWEC",
    description:
      "Stay updated with the latest events, programs, and activities at Princess Esin Women's Educational Centre.",
  },
};

export default function EventsPage() {
  return <EventsClient />;
}
