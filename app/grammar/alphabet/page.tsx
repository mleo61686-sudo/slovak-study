import type { Metadata } from "next";
import AlphabetClient from "./AlphabetClient";
import AlphabetSeo from "./AlphabetSeo";

export const metadata: Metadata = {
  title: "Алфавіт і вимова словацької мови | Slovak Study",
  description:
    "Словацький алфавіт і вимова: правила читання, звуки та приклади. Пояснення українською.",
  alternates: {
    canonical: "/grammar/alphabet",
    languages: {
      uk: "/grammar/alphabet",
      ru: "/ru/grammar/alphabet",
    },
  },
  openGraph: {
    title: "Алфавіт і вимова словацької мови | Slovak Study",
    description:
      "Словацький алфавіт і вимова: правила читання, звуки та приклади. Пояснення українською.",
    url: "https://slovak-study.com/grammar/alphabet",
    siteName: "Slovak Study",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function AlphabetPage() {
  return (
    <div className="space-y-10">
      <AlphabetSeo />
      <AlphabetClient />
    </div>
  );
}