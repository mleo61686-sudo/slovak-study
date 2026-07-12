import type { Metadata } from "next";
import Script from "next/script";
import AlphabetClient from "./AlphabetClient";
import AlphabetSeo from "./AlphabetSeo";

export const metadata: Metadata = {
  title: "Алфавіт і вимова: словацька, чеська та польська | Flunio",
  description:
    "Алфавіт і вимова словацької, чеської та польської мов: правила читання, особливі звуки, приклади, аудіо та міні-тренажер.",
  alternates: {
    canonical: "https://flunio.com/grammar/alphabet",
  },
  openGraph: {
    title: "Алфавіт і вимова: словацька, чеська та польська | Flunio",
    description:
      "Алфавіт і вимова словацької, чеської та польської мов: правила читання, особливі звуки, приклади, аудіо та міні-тренажер.",
    url: "https://flunio.com/grammar/alphabet",
    siteName: "Flunio",
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