import type { Metadata } from "next";
import LearningClient from "./LearningClient";

export const metadata: Metadata = {
  title: "Вивчення словацької мови по рівнях A0–B2 | Slovak Study",
  description:
    "Навчання словацької мови онлайн для українців: рівні A0–B2, уроки по 10 слів, вправи та прогрес. Почни з A0.",
  alternates: {
    canonical: "https://slovak-study.vercel.app/learning",
  },
  openGraph: {
    title: "Навчання словацької — рівні A0–B2 | Slovak Study",
    description:
      "Уроки по рівнях A0–B2, вправи та прогрес. Вивчай словацьку системно.",
    url: "https://slovak-study.vercel.app/learning",
    siteName: "Slovak Study",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function LearningPage() {
  return <LearningClient />;
}
