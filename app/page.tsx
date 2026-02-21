import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Вивчення словацької мови онлайн для українців | Slovak Study",
  description:
    "Slovak Study — граматика з прикладами, словник і вправи для практики. Системне навчання по рівнях A0–B2. Інтерфейс українською.",

  alternates: {
    canonical: `${SITE_URL}/`,
  },

  openGraph: {
    title: "Slovak Study — вивчення словацької онлайн",
    description:
      "Граматика, словник і тренажер вправ. Системне навчання по рівнях A0–B2 для україномовних.",
    url: `${SITE_URL}/`,
    siteName: "Slovak Study",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return <HomeClient />;
}