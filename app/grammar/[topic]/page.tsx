import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AlphabetPage from "../alphabet/page";
import VerbsPresentPage from "../verbs-present/page";
import CasesPage from "../cases/page";

const baseUrl = "https://slovak-study.vercel.app";

const TOPICS: Record<
  string,
  { title: string; description: string; canonical: string }
> = {
  alphabet: {
    title: "Алфавіт і вимова словацької мови | Slovak Study",
    description:
      "Словацький алфавіт і вимова: правила читання, звуки та приклади. Пояснення українською.",
    canonical: `${baseUrl}/grammar/alphabet`,
  },
  "verbs-present": {
    title: "Дієслова теперішнього часу в словацькій | Slovak Study",
    description:
      "Як відмінюються словацькі дієслова в теперішньому часі: таблиці, приклади та міні-вправа.",
    canonical: `${baseUrl}/grammar/verbs-present`,
  },
  cases: {
    title: "Відмінки в словацькій мові з прикладами | Slovak Study",
    description:
      "6 відмінків у словацькій мові: питання, закінчення та приклади речень. Просте пояснення для українців.",
    canonical: `${baseUrl}/grammar/cases`,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const meta = TOPICS[topic];

  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.canonical },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      siteName: "Slovak Study",
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

export default async function GrammarTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;

  switch (topic) {
    case "alphabet":
      return <AlphabetPage />;

    case "verbs-present":
      return <VerbsPresentPage />;

    case "cases":
      return <CasesPage />;

    default:
      return notFound();
  }
}
