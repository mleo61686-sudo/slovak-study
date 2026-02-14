import type { Metadata } from "next";
import GrammarClient from "./GrammarClient";

export const metadata: Metadata = {
  title: "Граматика словацької мови з прикладами | Slovak Study",
  description:
    "Граматика словацької мови для українців: алфавіт, відмінки, дієслова, приклади речень та міні-вправи.",
  alternates: {
    canonical: "https://slovak-study.com/grammar",
  },
  openGraph: {
    title: "Граматика словацької мови — Slovak Study",
    description:
      "Алфавіт, відмінки, дієслова та приклади речень. Пояснення українською.",
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
  return <GrammarClient />;
}
