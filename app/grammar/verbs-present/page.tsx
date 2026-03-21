import type { Metadata } from "next";
import VerbsPresentClient from "./VerbsPresentClient";

export const metadata: Metadata = {
  title: "Дієслова теперішнього часу | Flunio",
  description:
    "Дієслова теперішнього часу у словацькій та чеській мовах: таблиці, приклади та міні-вправи.",
  alternates: {
    canonical: "https://flunio.com/grammar/verbs-present",
  },
  openGraph: {
    title: "Дієслова теперішнього часу | Flunio",
    description:
      "Дієслова теперішнього часу у словацькій та чеській мовах: таблиці, приклади та міні-вправи.",
    url: "https://flunio.com/grammar/verbs-present",
    siteName: "Flunio",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VerbsPresentPage() {
  return <VerbsPresentClient />;
}