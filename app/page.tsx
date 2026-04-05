import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { SITE_URL } from "@/lib/site";
import { UPDATES } from "@/app/updates/updates";

export const metadata: Metadata = {
  title: "Flunio — вивчення мов онлайн (A0–B2)",

  description:
    "Flunio — онлайн платформа для вивчення мов: словацька та чеська, уроки A0–B2, словник, граматика з прикладами, вправи та озвучка.",

  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      uk: `${SITE_URL}/`,
      ru: `${SITE_URL}/`,
      en: `${SITE_URL}/`,
      "x-default": `${SITE_URL}/`,
    },
  },

  openGraph: {
    title: "Flunio — вивчення мов онлайн",
    description:
      "Вивчай словацьку та чеську онлайн: уроки A0–B2, словник, граматика з прикладами, вправи та озвучка.",
    url: `${SITE_URL}/`,
    siteName: "Flunio",
    type: "website",
    images: ["/opengraph-image"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Flunio — вивчення мов онлайн",
    description:
      "Словацька та чеська онлайн: уроки A0–B2, граматика, словник, вправи та озвучка.",
    images: ["/opengraph-image"],
  },

  robots: { index: true, follow: true },
};

export default function HomePage() {
  const latestDate = UPDATES[0]?.date;
  const latestBadge = latestDate
    ? latestDate.slice(5).replace("-", ".").split(".").reverse().join(".")
    : null;

  return <HomeClient latestBadge={latestBadge} />;
}