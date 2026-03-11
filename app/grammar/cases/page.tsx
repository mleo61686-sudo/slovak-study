import type { Metadata } from "next";
import CasesClient from "./CasesClient";

export const metadata: Metadata = {
  title: "Відмінки | Slovak Study",
  description:
    "Відмінки у словацькій та чеській мовах: питання, форми, приклади речень і прості пояснення.",
  alternates: {
    canonical: "https://slovak-study.com/grammar/cases",
  },
  openGraph: {
    title: "Відмінки | Slovak Study",
    description:
      "Відмінки у словацькій та чеській мовах: питання, форми, приклади речень і прості пояснення.",
    url: "https://slovak-study.com/grammar/cases",
    siteName: "Slovak Study",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CasesPage() {
  return <CasesClient />;
}