import type { Metadata } from "next";
import GrammarClient from "./GrammarClient";
import CourseGate from "@/app/components/CourseGate";

export const metadata: Metadata = {
  title: "Граматика | Flunio",
  description:
    "Граматика словацької та чеської мов: алфавіт, відмінки, дієслова, приклади речень та міні-вправи.",
  alternates: {
    canonical: "https://flunio.com/grammar",
  },
  openGraph: {
    title: "Граматика — Flunio",
    description:
      "Алфавіт, відмінки, дієслова та приклади речень для словацької й чеської мов.",
    url: "https://flunio.com/grammar",
    siteName: "Flunio",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GrammarPage() {
  return (
    <CourseGate>
      <GrammarClient />
    </CourseGate>
  );
}