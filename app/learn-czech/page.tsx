import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Learn Czech Language Online (A0–B2) | Flunio",
  description:
    "Learn Czech language online with A0–B2 lessons, vocabulary, grammar, exercises and audio. Study Czech step by step and track your progress with Flunio.",

  alternates: {
    canonical: `${SITE_URL}/learn-czech`,
  },

  openGraph: {
    title: "Learn Czech Language Online (A0–B2) | Flunio",
    description:
      "Learn Czech online with lessons, pronunciation, grammar explanations, exercises and dictionary in one platform.",
    url: `${SITE_URL}/learn-czech`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Can I learn Czech online from scratch?",
    a: "Yes. You can start with A0 lessons, learn basic words, listen to audio and practice with exercises step by step.",
  },
  {
    q: "How much time should I study every day?",
    a: "About 10–20 minutes a day is enough for steady progress. Regular practice works better than long sessions.",
  },
  {
    q: "What is included besides lessons?",
    a: "Flunio includes vocabulary, grammar pages, word and phrase audio, plus exercises for review and practice.",
  },
  {
    q: "Is this useful for life or work in the Czech Republic?",
    a: "Yes. You learn everyday vocabulary, grammar and useful phrases for real-life communication.",
  },
  {
    q: "Can I use grammar and dictionary with lessons?",
    a: "Yes. You can combine lessons with grammar and dictionary pages to improve faster.",
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
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-10">
      <Script
        id="faq-schema-czech-en"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Learn Czech Language Online (A0–B2)
        </h1>

        <p className="text-slate-700">
          Flunio is an online platform where you can learn Czech language step
          by step. The course includes structured lessons, pronunciation,
          exercises, grammar explanations and dictionary tools.
        </p>

        <p className="text-slate-700">
          You can start from beginner level A0 and continue through A1, A2, B1
          and B2. Each lesson helps you build vocabulary, improve understanding
          and practise Czech in a structured way.
        </p>

        <p className="text-slate-700">
          This course is useful for learners who want to study Czech for life,
          work, relocation, study or everyday communication in the Czech
          Republic.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/learning"
            className="rounded-xl bg-black px-4 py-2 text-white"
          >
            Start Learning
          </Link>

          <Link href="/grammar" className="rounded-xl border px-4 py-2">
            Czech Grammar
          </Link>

          <Link href="/dictionary" className="rounded-xl border px-4 py-2">
            Czech Dictionary
          </Link>

          <Link
            href="/vyvchennia-cheskoi-movy-online"
            className="rounded-xl border px-4 py-2"
          >
            Ukrainian Version →
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">1) Structured Czech Lessons</h2>
          <p className="mt-2 text-slate-700">
            Learn Czech with structured lessons from A0 to B2 and clear
            progression.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">2) Practice After Each Lesson</h2>
          <p className="mt-2 text-slate-700">
            New words are reinforced through exercises and repetition.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">3) Pronunciation Practice</h2>
          <p className="mt-2 text-slate-700">
            Listen to audio and improve your Czech listening skills.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">4) Grammar and Vocabulary</h2>
          <p className="mt-2 text-slate-700">
            Use grammar pages and dictionary to understand Czech better.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          How to Start Learning Czech Online
        </h2>

        <ol className="list-decimal space-y-2 pl-5 text-slate-700">
          <li>Start from A0 if you are a beginner.</li>
          <li>Learn vocabulary lesson by lesson.</li>
          <li>Practice every day for 10–20 minutes.</li>
          <li>Repeat words regularly.</li>
          <li>Use grammar and dictionary when needed.</li>
        </ol>

        <div className="pt-2">
          <Link
            href="/learning"
            className="inline-flex rounded-xl bg-black px-4 py-2 text-white"
          >
            Go to Courses →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Who This Czech Course Is For
        </h2>

        <div className="space-y-3 text-slate-700">
          <p>
            Flunio is suitable for beginners and intermediate learners who want
            to study Czech online in a simple and structured way.
          </p>

          <p>
            It is especially useful for people who want to improve Czech for
            everyday life, relocation, work or study.
          </p>

          <p>
            You can also explore{" "}
            <Link href="/grammar" className="underline">
              grammar
            </Link>{" "}
            and{" "}
            <Link href="/dictionary" className="underline">
              dictionary
            </Link>{" "}
            pages while learning.
          </p>
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