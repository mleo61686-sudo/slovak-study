import type { Metadata } from "next";
import Script from "next/script";
import VerbsPastClient from "./VerbsPastClient";
import VerbsPastSeo from "./VerbsPastSeo";

export const metadata: Metadata = {
  title: "Минулий час у словацькій, чеській і польській | Flunio",
  description:
    "Минулий час у словацькій, чеській і польській мовах: правила, таблиці, приклади, типові помилки та інтерактивні вправи.",
  alternates: {
    canonical: "https://flunio.com/grammar/verbs-past",
  },
  openGraph: {
    title: "Минулий час у словацькій, чеській і польській | Flunio",
    description:
      "Практичний гід по минулому часу у словацькій, чеській і польській мовах з прикладами, типовими помилками та вправами.",
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
        name: "Минулий час",
        item: "https://flunio.com/grammar/verbs-past",
      },
    ],
  };

  return (
    <div className="space-y-10">
      <Script
        id="breadcrumb-schema-verbs-past"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <VerbsPastSeo />
      <VerbsPastClient />
    </div>
  );
}