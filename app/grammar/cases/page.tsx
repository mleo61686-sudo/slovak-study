import type { Metadata } from "next";
import CasesClient from "./CasesClient";

export const metadata: Metadata = {
  title: "Відмінки | Flunio",
  description:
    "Відмінки у словацькій та чеській мовах: питання, форми, приклади речень і прості пояснення.",
  alternates: {
    canonical: "https://flunio.com/grammar/cases",
  },
  openGraph: {
    title: "Відмінки | Flunio",
    description:
      "Відмінки у словацькій та чеській мовах: питання, форми, приклади речень і прості пояснення.",
    url: "https://flunio.com/grammar/cases",
    siteName: "Flunio",
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