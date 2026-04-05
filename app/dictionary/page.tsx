import type { Metadata } from "next";
import DictionaryClient from "./DictionaryClient";
import { SITE_URL } from "@/lib/site";
import CourseGate from "@/app/components/CourseGate";

export const metadata: Metadata = {
  title: "Online dictionary | Flunio",
  description:
    "Flunio online dictionary: word translations, pronunciation, examples, and convenient search for learning Slovak and Czech.",

  alternates: {
    canonical: `${SITE_URL}/dictionary`,
  },

  openGraph: {
    title: "Online dictionary | Flunio",
    description:
      "Word translations, pronunciation, examples, and convenient search for learning Slovak and Czech.",
    url: `${SITE_URL}/dictionary`,
    siteName: "Flunio",
    type: "website",
    images: ["/opengraph-image"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Online dictionary | Flunio",
    description:
      "Word translations, pronunciation, examples, and convenient search for learning Slovak and Czech.",
    images: ["/opengraph-image"],
  },

  robots: { index: true, follow: true },
};

export default function DictionaryPage() {
  return (
    <CourseGate>
      <DictionaryClient />
    </CourseGate>
  );
}