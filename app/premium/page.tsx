import type { Metadata } from "next";
import PremiumClient from "./PremiumClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flunio Premium | Learn without daily limits",
  description:
    "Unlock all Flunio levels, unlimited lessons, the full trainer, progress statistics, streaks, records, and the Premium Flunio theme.",

  alternates: {
    canonical: `${SITE_URL}/premium`,
  },

  openGraph: {
    title: "Flunio Premium | Learn without daily limits",
    description:
      "Get unlimited lessons, all levels, the full trainer, progress statistics, streaks, records, and the Premium Flunio theme.",
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