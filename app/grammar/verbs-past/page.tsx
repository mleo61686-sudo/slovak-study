import type { Metadata } from "next";
import VerbsPastClient from "./VerbsPastClient";

export const metadata: Metadata = {
  title: "Минулий час | Flunio",
  description:
    "Минулий час у словацькій, чеській та польській мовах: як сказати я робив, ти був, ми пішли.",
  alternates: {
    canonical: "https://flunio.com/grammar/verbs-past",
  },
  openGraph: {
    title: "Минулий час | Flunio",
    description:
      "Минулий час у словацькій, чеській та польській мовах з прикладами та міні-вправою.",
    url: "https://flunio.com/grammar/verbs-past",
    siteName: "Flunio",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VerbsPastPage() {
  return <VerbsPastClient />;
}