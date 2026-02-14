import type { Metadata } from "next";
import DictionaryClient from "./DictionaryClient";

export const metadata: Metadata = {
  title: "Словацький словник онлайн | Slovak Study",
  description:
    "Словацький словник для українців: переклад слів, вимова, приклади та зручний пошук. Вивчайте словацьку мову онлайн.",
  alternates: {
    canonical: "https://slovak-study.vercel.app/dictionary",
  },
  openGraph: {
    title: "Словацький словник — Slovak Study",
    description:
      "Переклад словацьких слів, вимова та приклади. Онлайн словник для українців.",
    url: "https://slovak-study.vercel.app/dictionary",
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
