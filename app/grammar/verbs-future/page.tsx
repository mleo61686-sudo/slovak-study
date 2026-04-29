import type { Metadata } from "next";
import VerbsFutureClient from "./VerbsFutureClient";

export const metadata: Metadata = {
  title: "Майбутній час | Flunio",
  description:
    "Майбутній час у словацькій, чеській та польській мовах: як сказати я буду робити, я зроблю, ми підемо.",
  alternates: {
    canonical: "https://flunio.com/grammar/verbs-future",
  },
  openGraph: {
    title: "Майбутній час | Flunio",
    description:
      "Майбутній час у словацькій, чеській та польській мовах з прикладами та міні-вправою.",
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
  return <VerbsFutureClient />;
}