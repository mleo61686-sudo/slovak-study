import type { Metadata } from "next";
import VerbsPastClient from "./VerbsPastClient";
import VerbsPastSeo from "./VerbsPastSeo";

export const metadata: Metadata = {
  title: "Минулий час | Flunio",
  description:
    "Минулий час у словацькій, чеській та польській мовах: robil som, robila som, dělal jsem, dělala jsem, zrobiłem, zrobiłam, byliśmy.",
  alternates: {
    canonical: "https://flunio.com/grammar/verbs-past",
  },
  openGraph: {
    title: "Минулий час | Flunio",
    description:
      "Практичний гід по минулому часу у словацькій, чеській та польській мовах з прикладами, типовими помилками та міні-вправою.",
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
  return (
    <div className="space-y-10">
      <VerbsPastSeo />
      <VerbsPastClient />
    </div>
  );
}