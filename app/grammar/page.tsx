import type { Metadata } from "next";
import GrammarClient from "./GrammarClient";
import CourseGate from "@/app/components/CourseGate";

export const metadata: Metadata = {
  title: "Граматика | Slovak Study",
  description:
    "Граматика словацької та чеської мов для українців: алфавіт, відмінки, дієслова, приклади речень та міні-вправи.",
  alternates: {
    canonical: "https://slovak-study.com/grammar",
  },
  openGraph: {
    title: "Граматика — Slovak Study",
    description:
      "Алфавіт, відмінки, дієслова та приклади речень для словацької й чеської мов.",
    url: "https://slovak-study.com/grammar",
    siteName: "Slovak Study",
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