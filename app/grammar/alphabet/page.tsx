import type { Metadata } from "next";
import AlphabetClient from "./AlphabetClient";
import AlphabetSeo from "./AlphabetSeo";

export const metadata: Metadata = {
  title: "Алфавіт і вимова | Flunio",
  description:
    "Алфавіт і вимова словацької та чеської мов: правила читання, звуки, приклади та міні-тренажер.",
  alternates: {
    canonical: "https://flunio.com/grammar/alphabet",
  },
  openGraph: {
    title: "Алфавіт і вимова | Flunio",
    description:
      "Алфавіт і вимова словацької та чеської мов: правила читання, звуки, приклади та міні-тренажер.",
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