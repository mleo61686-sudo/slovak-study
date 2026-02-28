import type { Metadata } from "next";
import Link from "next/link";


const SITE_URL = "https://slovak-study.com";

export const metadata: Metadata = {
  title: "Learn Slovak Language Online (A0–B2) | Slovak Study",
  description:
    "Learn Slovak online with lessons A0–B2, exercises, grammar and dictionary. Study Slovak step by step and track your progress.",

  alternates: {
    canonical: `${SITE_URL}/learn-slovak`,
  },

  openGraph: {
    title: "Learn Slovak Language Online | Slovak Study",
    description:
      "Learn Slovak online with lessons, grammar explanations, exercises and dictionary.",
    url: `${SITE_URL}/learn-slovak`,
    siteName: "Slovak Study",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Can I learn Slovak language online for free?",
    a: "Yes. Slovak Study offers free lessons with exercises, pronunciation and progress tracking.",
  },
  {
    q: "Is Slovak Study good for beginners?",
    a: "Yes. You can start from level A0 and learn step by step using short lessons and exercises.",
  },
  {
    q: "How long does it take to learn Slovak?",
    a: "Basic level A1 usually takes 1–2 months with regular daily practice.",
  },
  {
    q: "Does Slovak Study include grammar explanations?",
    a: "Yes. Grammar topics include explanations and examples with pronunciation.",
  },
];

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
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
          Learn Slovak Language Online (A0–B2)
        </h1>

        <p className="text-slate-700">
          Slovak Study is an online platform where you can learn Slovak language
          step by step. The course includes short lessons, pronunciation,
          exercises, grammar explanations and dictionary.
        </p>

        <p className="text-slate-700">
          You can start from beginner level A0 and continue to A1, A2 and B1.
          Each lesson contains vocabulary and exercises to help you remember
          words faster.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">

          <Link
            className="px-4 py-2 rounded-xl bg-black text-white"
            href="/learning"
          >
            Start Learning
          </Link>

          <Link
            className="px-4 py-2 rounded-xl border"
            href="/grammar"
          >
            Slovak Grammar
          </Link>

          <Link
            className="px-4 py-2 rounded-xl border"
            href="/dictionary"
          >
            Slovak Dictionary
          </Link>

        </div>

      </section>

      <section className="grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">
            1) Structured Lessons
          </h2>

          <p className="mt-2 text-slate-700">
            Learn Slovak using structured lessons from A0 to B2.
            Each lesson contains vocabulary and exercises.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">
            2) Pronunciation
          </h2>

          <p className="mt-2 text-slate-700">
            Listen to pronunciation and improve your Slovak listening skills.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">
            3) Slovak Dictionary
          </h2>

          <p className="mt-2 text-slate-700">
            Search Slovak words and learn translations with examples.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">
            4) Slovak Grammar
          </h2>

          <p className="mt-2 text-slate-700">
            Grammar explanations with examples help you understand Slovak language better.
          </p>
        </div>

      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">

        <h2 className="text-2xl font-bold">
          How to Start Learning Slovak
        </h2>

        <ol className="list-decimal pl-5 space-y-2 text-slate-700">

          <li>Start from level A0.</li>

          <li>Learn 10 words per lesson.</li>

          <li>Practice every day for 10–20 minutes.</li>

          <li>Repeat previous lessons regularly.</li>

        </ol>

      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">

        <h2 className="text-2xl font-bold">
          FAQ
        </h2>

        <div className="space-y-4">

          {FAQ.map((item) => (
            <div key={item.q} className="rounded-xl border p-4">
              <div className="font-semibold">
                {item.q}
              </div>

              <div className="mt-2 text-slate-700">
                {item.a}
              </div>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}