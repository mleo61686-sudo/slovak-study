import type { Metadata } from "next";
import Link from "next/link";


const SITE_URL = "https://slovak-study.com";

export const metadata: Metadata = {
  title: "Slovak Grammar Online (Cases, Verbs, Alphabet) | Slovak Study",
  description:
    "Slovak grammar online with clear explanations and examples: alphabet, pronunciation, verbs and cases. Learn Slovak step by step with exercises.",

  alternates: {
    canonical: `${SITE_URL}/slovak-grammar`,
  },

  openGraph: {
    title: "Slovak Grammar Online | Slovak Study",
    description:
      "Learn Slovak grammar: alphabet, pronunciation, verbs and cases with examples.",
    url: `${SITE_URL}/slovak-grammar`,
    siteName: "Slovak Study",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Is Slovak grammar difficult?",
    a: "Slovak grammar can feel difficult at first because of cases and verb forms, but it becomes easier with a clear step-by-step plan and practice.",
  },
  {
    q: "What should I learn first in Slovak grammar?",
    a: "Start with the alphabet and pronunciation, then basic verb forms and the most common cases used in everyday speech.",
  },
  {
    q: "Does Slovak Study include grammar topics with examples?",
    a: "Yes. Slovak Study provides grammar topics with explanations and examples to help you understand how Slovak works.",
  },
];

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Slovak Grammar Online
        </h1>

        <p className="text-slate-700">
          Slovak Study helps you learn Slovak grammar step by step. Start with
          the alphabet and pronunciation, then continue with verbs and cases.
          Each topic includes explanations and examples.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link className="px-4 py-2 rounded-xl bg-black text-white" href="/grammar">
            Open Grammar Topics
          </Link>
          <Link className="px-4 py-2 rounded-xl border" href="/learning">
            Start Lessons
          </Link>
          <Link className="px-4 py-2 rounded-xl border" href="/dictionary">
            Open Dictionary
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">Alphabet & Pronunciation</h2>
          <p className="mt-2 text-slate-700">
            Learn Slovak letters, pronunciation rules and common sounds.
          </p>
          <div className="mt-3">
            <Link className="underline" href="/grammar/alphabet">
              Start with Alphabet →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">Verbs</h2>
          <p className="mt-2 text-slate-700">
            Learn basic verb forms and present tense patterns.
          </p>
          <div className="mt-3">
            <Link className="underline" href="/grammar/verbs-present">
              Present Tense →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">Cases</h2>
          <p className="mt-2 text-slate-700">
            Understand Slovak cases and how they change words in sentences.
          </p>
          <div className="mt-3">
            <Link className="underline" href="/grammar/cases">
              Learn Cases →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">Practice</h2>
          <p className="mt-2 text-slate-700">
            Use exercises to reinforce grammar and vocabulary.
          </p>
          <div className="mt-3">
            <Link className="underline" href="/practice">
              Go to Exercises →
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className="rounded-xl border p-4">
              <div className="font-semibold">{item.q}</div>
              <div className="mt-2 text-slate-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}