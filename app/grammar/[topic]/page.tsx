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

type TopicSlug = "alphabet" | "verbs-present" | "cases";

const TOPICS: Record<TopicSlug, TopicConfig> = {
  alphabet: {
    title: "Alphabet and pronunciation | Flunio",
    description:
      "Alphabet and pronunciation for Slovak and Czech: reading rules, sounds, examples, and mini practice.",
    path: "/grammar/alphabet",
    render: () => <AlphabetPage />,
  },
  "verbs-present": {
    title: "Present tense verbs | Flunio",
    description:
      "Present tense verbs in Slovak and Czech: tables, examples, and mini exercises.",
    path: "/grammar/verbs-present",
    render: () => <VerbsPresentPage />,
  },
  cases: {
    title: "Cases | Flunio",
    description:
      "Cases in Slovak and Czech: question patterns, forms, example sentences, and simple explanations.",
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
  const config = TOPICS[topic as TopicSlug];

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
      siteName: "Flunio",
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
  const config = TOPICS[topic as TopicSlug];

  if (!config) {
    notFound();
  }

  return config.render();
}