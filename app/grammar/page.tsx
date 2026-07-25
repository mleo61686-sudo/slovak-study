import type { Metadata } from "next";
import GrammarClient from "./GrammarClient";
import CourseGate from "@/app/components/CourseGate";

export const metadata: Metadata = {
  title: "Slovak, Czech & Polish Grammar Online | Flunio",
  description:
    "Learn Slovak, Czech and Polish grammar online: alphabet, pronunciation, cases, verbs, tenses, sentence structure, examples and short exercises.",
  alternates: {
    canonical: "https://flunio.com/grammar",
  },
  openGraph: {
    title: "Slovak, Czech & Polish Grammar Online | Flunio",
    description:
      "Grammar guides for Slovak, Czech and Polish: cases, verbs, pronunciation, sentence structure and practical examples.",
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
