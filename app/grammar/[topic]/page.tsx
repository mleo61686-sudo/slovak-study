import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site";

import AlphabetPage from "../alphabet/page";
import VerbsPresentPage from "../verbs-present/page";
import CasesPage from "../cases/page";

type TopicConfig = {
  title: string;
  description: string;
  path: string;
  render: () => React.ReactElement;
};

const TOPICS: Record<string, TopicConfig> = {
  alphabet: {
    title: "Алфавіт і вимова | Slovak Study",
    description:
      "Алфавіт і вимова словацької та чеської мов: правила читання, звуки, приклади та міні-тренажер.",
    path: "/grammar/alphabet",
    render: () => <AlphabetPage />,
  },
  "verbs-present": {
    title: "Дієслова теперішнього часу | Slovak Study",
    description:
      "Дієслова теперішнього часу у словацькій та чеській мовах: таблиці, приклади та міні-вправи.",
    path: "/grammar/verbs-present",
    render: () => <VerbsPresentPage />,
  },
  cases: {
    title: "Відмінки | Slovak Study",
    description:
      "Відмінки у словацькій та чеській мовах: питання, форми, приклади речень і прості пояснення.",
    path: "/grammar/cases",
    render: () => <CasesPage />,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const config = TOPICS[topic];

  if (!config) {
    return {};
  }

  const canonicalUrl = `${SITE_URL}${config.path}`;

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonicalUrl,
      siteName: "Slovak Study",
      type: "article",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function GrammarTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const config = TOPICS[topic];

  if (!config) {
    notFound();
  }

  return config.render();
}