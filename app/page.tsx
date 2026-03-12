import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { SITE_URL } from "@/lib/site";
import { UPDATES } from "@/app/updates/updates";

export const metadata: Metadata = {
  title: "Slovak Study — словацька мова онлайн (A0–B2)",

  description:
    "Slovak Study — онлайн навчання словацької мови: уроки A0–B2, словник, граматика з прикладами, вправи та озвучка. Вивчайте словацьку мову з нуля онлайн.",

  alternates: {
    canonical: `${SITE_URL}/`,
  },

  openGraph: {
    title: "Slovak Study — словацька мова онлайн",
    description:
      "Уроки A0–B2, словник, граматика з прикладами та вправи для практики. Онлайн навчання словацької мови.",
    url: `${SITE_URL}/`,
    siteName: "Slovak Study",
    type: "website",
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