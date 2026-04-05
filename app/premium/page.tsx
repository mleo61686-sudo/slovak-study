import type { Metadata } from "next";
import PremiumClient from "./PremiumClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Premium | Flunio",
  description:
    "Flunio Premium: unlimited lessons, full trainer access, audio, statistics, streaks, and records.",

  alternates: {
    canonical: `${SITE_URL}/premium`,
  },

  openGraph: {
    title: "Premium | Flunio",
    description:
      "Unlock unlimited lessons, full trainer access, audio, statistics, streaks, and records with Flunio Premium.",
    url: `${SITE_URL}/premium`,
    siteName: "Flunio",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function PremiumPage() {
  return <PremiumClient />;
}