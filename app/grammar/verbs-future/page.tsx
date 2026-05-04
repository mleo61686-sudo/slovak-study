import type { Metadata } from "next";
import VerbsFutureClient from "./VerbsFutureClient";
import VerbsFutureSeo from "./VerbsFutureSeo";

export const metadata: Metadata = {
  title: "Майбутній час | Flunio",
  description:
    "Майбутній час у словацькій, чеській та польській мовах: budem robiť, urobím, budu dělat, udělám, będę pracować, zrobię, pôjdem, půjdu, pójdę.",
  alternates: {
    canonical: "https://flunio.com/grammar/verbs-future",
  },
  openGraph: {
    title: "Майбутній час | Flunio",
    description:
      "Практичний гід по майбутньому часу у словацькій, чеській та польській мовах з прикладами, типовими помилками та міні-вправою.",
    url: "https://flunio.com/grammar/verbs-future",
    siteName: "Flunio",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VerbsFuturePage() {
  return (
    <div className="space-y-10">
      <VerbsFutureSeo />
      <VerbsFutureClient />
    </div>
  );
}