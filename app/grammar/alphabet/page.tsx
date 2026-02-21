import type { Metadata } from "next";
import AlphabetClient from "./AlphabetClient";

export const metadata: Metadata = {
  title: "Алфавіт і вимова словацької мови | Slovak Study",
  description:
    "Словацький алфавіт і вимова: правила читання, звуки та приклади. Пояснення українською.",
  alternates: {
    canonical: "/grammar/alphabet",
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
  return <AlphabetClient />;
}