import type { Metadata } from "next";
import LearningClient from "./LearningClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Вивчення словацької мови по рівнях A0–B2 | Slovak Study",
  description:
    "Навчання словацької мови онлайн для українців: рівні A0–B2, уроки по 10 слів, вправи та прогрес. Почни з A0.",

  alternates: {
    canonical: `${SITE_URL}/learning`,
  },

  openGraph: {
    title: "Навчання словацької — рівні A0–B2 | Slovak Study",
    description:
      "Уроки по рівнях A0–B2, вправи та прогрес. Вивчай словацьку системно.",
    url: `${SITE_URL}/learning`,
    siteName: "Slovak Study",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function LearningPage() {
  return <LearningClient />;
}