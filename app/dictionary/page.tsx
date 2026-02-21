import type { Metadata } from "next";
import DictionaryClient from "./DictionaryClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Словацький словник онлайн | Slovak Study",
  description:
    "Словацький словник для українців: переклад слів, вимова, приклади та зручний пошук. Вивчайте словацьку мову онлайн.",

  alternates: {
    canonical: `${SITE_URL}/dictionary`,
  },

  openGraph: {
    title: "Словацький словник — Slovak Study",
    description:
      "Переклад словацьких слів, вимова та приклади. Онлайн словник для українців.",
    url: `${SITE_URL}/dictionary`,
    siteName: "Slovak Study",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function DictionaryPage() {
  return <DictionaryClient />;
}