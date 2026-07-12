import type { Metadata } from "next";
import Script from "next/script";
import VerbsFutureClient from "./VerbsFutureClient";
import VerbsFutureSeo from "./VerbsFutureSeo";

export const metadata: Metadata = {
  title: "Майбутній час у словацькій, чеській і польській | Flunio",
  description:
    "Майбутній час у словацькій, чеській і польській мовах: правила, доконаний і недоконаний вид, приклади та інтерактивні вправи.",
  alternates: {
    canonical: "https://flunio.com/grammar/verbs-future",
  },
  openGraph: {
    title: "Майбутній час у словацькій, чеській і польській | Flunio",
    description:
      "Практичний гід по майбутньому часу у словацькій, чеській і польській мовах з прикладами, типовими помилками та вправами.",
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
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Граматика",
        item: "https://flunio.com/grammar",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Майбутній час",
        item: "https://flunio.com/grammar/verbs-future",
      },
    ],
  };

  return (
    <div className="space-y-10">
      <Script
        id="breadcrumb-schema-verbs-future"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <VerbsFutureSeo />
      <VerbsFutureClient />
    </div>
  );
}