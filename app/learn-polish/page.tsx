import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Learn Polish online — course A0–B2 | Flunio",
  description:
    "Learn Polish online with Flunio: A0–B2 lessons, vocabulary, grammar, exercises and audio. Start from scratch and learn step by step.",

  alternates: {
    canonical: `${SITE_URL}/learn-polish`,
  },

  openGraph: {
    title: "Learn Polish online — course A0–B2 | Flunio",
    description:
      "Polish course with A0–B2 lessons, vocabulary, grammar, exercises and audio — all in one platform.",
    url: `${SITE_URL}/learn-polish`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Can I learn Polish online from scratch?",
    a: "Yes. You can start with A0 lessons, learn basic words, listen to audio and practice with exercises step by step.",
  },
  {
    q: "How much time should I study every day?",
    a: "About 10–20 minutes a day is enough for steady progress. Regular practice works better than long but rare study sessions.",
  },
  {
    q: "What is included besides lessons?",
    a: "Flunio also includes vocabulary, grammar pages, word and phrase audio, plus exercises for review and practice.",
  },
  {
    q: "Is this useful for life or work in Poland?",
    a: "Yes. The platform helps you learn everyday vocabulary, basic grammar and useful words for work, study, documents and daily communication.",
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
        id="faq-schema-polish-en"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Learn Polish online — course A0–B2
        </h1>

        <p className="text-slate-700">
          Flunio is an online platform for learning Polish in a structured way.
          You can study by levels, learn useful vocabulary, practice with
          exercises and improve your understanding of grammar step by step.
        </p>

        <p className="text-slate-700">
          This course is useful for people who want to learn Polish for life,
          work, study or everyday communication in Poland.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className="rounded-xl bg-black px-4 py-2 text-white">
            Start learning
          </Link>

          <Link href="/learning/a0" className="rounded-xl border px-4 py-2">
            Start with A0 →
          </Link>

          <Link href="/dictionary" className="rounded-xl border px-4 py-2">
            Open dictionary
          </Link>

          <Link href="/grammar" className="rounded-xl border px-4 py-2">
            Grammar
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">1) Learn by levels</h2>
          <p className="mt-2 text-slate-700">
            Lessons are organized from A0 to B2, so you can move forward step by
            step.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">2) Practice after each lesson</h2>
          <p className="mt-2 text-slate-700">
            New words are reinforced through exercises and repetition.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">3) Audio for words and phrases</h2>
          <p className="mt-2 text-slate-700">
            Listen to pronunciation and improve your Polish listening skills.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">4) Vocabulary and grammar</h2>
          <p className="mt-2 text-slate-700">
            The platform includes searchable vocabulary and grammar pages with
            examples and explanations.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">How to start learning Polish online</h2>

        <ol className="list-decimal space-y-2 pl-5 text-slate-700">
          <li>Start with A0 if you are learning Polish from scratch.</li>
          <li>Complete short lessons and do the exercises right away.</li>
          <li>Repeat words using the vocabulary section and audio.</li>
          <li>Open grammar pages when you want to understand a topic better.</li>
          <li>Move on to A1, A2, B1 and B2 at your own pace.</li>
        </ol>

        <div className="pt-2">
          <Link href="/learning/a0" className="inline-flex rounded-xl bg-black px-4 py-2 text-white">
            Go to A0 →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Who this Polish course is for</h2>

        <div className="space-y-3 text-slate-700">
          <p>
            Flunio is a good option for learners who want a simple, structured
            and practical way to study Polish online without overload.
          </p>

          <p>
            It works well if you want to build everyday vocabulary, understand
            grammar better and gradually become more confident in Polish.
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