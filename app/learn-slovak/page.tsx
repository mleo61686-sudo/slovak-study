import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Learn Slovak Language Online (A0–B2) | Flunio",
  description:
    "Learn Slovak language online with A0–B2 lessons, exercises, pronunciation, grammar and dictionary. Study Slovak step by step and track your progress with Flunio.",

  alternates: {
    canonical: `${SITE_URL}/learn-slovak`,
  },

  openGraph: {
    title: "Learn Slovak Language Online (A0–B2) | Flunio",
    description:
      "Learn Slovak online with lessons, pronunciation, grammar explanations, exercises and dictionary in one platform.",
    url: `${SITE_URL}/learn-slovak`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Can I learn Slovak language online for free?",
    a: "Yes. Flunio offers free lessons, exercises, pronunciation and progress tracking for beginners.",
  },
  {
    q: "Is Flunio good for beginners?",
    a: "Yes. You can start from level A0 and learn Slovak step by step with short lessons and simple exercises.",
  },
  {
    q: "How long does it take to learn Slovak?",
    a: "It depends on your pace, but many learners can reach a basic level with regular daily practice in a few months.",
  },
  {
    q: "Does Flunio include grammar explanations?",
    a: "Yes. Flunio includes grammar topics with explanations, examples and useful vocabulary.",
  },
  {
    q: "Can I use dictionary and grammar together with lessons?",
    a: "Yes. You can combine lessons, dictionary and grammar pages to learn Slovak more effectively.",
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
      <Script
        id="faq-schema-learn-slovak"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Learn Slovak Language Online (A0–B2)
        </h1>

        <p className="text-slate-700">
          Flunio is an online platform where you can learn Slovak language step
          by step. The course includes short lessons, pronunciation, exercises,
          grammar explanations and dictionary tools in one place.
        </p>

        <p className="text-slate-700">
          You can start from beginner level A0 and continue through A1, A2, B1
          and B2. Each lesson is designed to help you build vocabulary, improve
          understanding and practise Slovak in a structured way.
        </p>

        <p className="text-slate-700">
          This page is useful for learners who want to study Slovak for daily
          life, work, documents, relocation, study or communication in
          Slovakia.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            className="rounded-xl bg-black px-4 py-2 text-white"
            href="/learning"
          >
            Start Learning
          </Link>

          <Link className="rounded-xl border px-4 py-2" href="/grammar">
            Slovak Grammar
          </Link>

          <Link className="rounded-xl border px-4 py-2" href="/dictionary">
            Slovak Dictionary
          </Link>

          <Link
            className="rounded-xl border px-4 py-2"
            href="/vyvchennia-slovatskoi-movy-online"
          >
            Ukrainian Version →
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">1) Structured Slovak Lessons</h2>

          <p className="mt-2 text-slate-700">
            Learn Slovak with structured lessons from A0 to B2. Each lesson
            contains useful vocabulary and exercises.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">2) Pronunciation Practice</h2>

          <p className="mt-2 text-slate-700">
            Listen to pronunciation and improve your Slovak listening and word
            recognition skills.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">3) Slovak Dictionary</h2>

          <p className="mt-2 text-slate-700">
            Search Slovak words, check translations and learn vocabulary with
            examples.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">4) Grammar Explanations</h2>

          <p className="mt-2 text-slate-700">
            Study Slovak grammar with clear explanations, practical examples and
            additional learning support.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">How to Start Learning Slovak</h2>

        <ol className="list-decimal space-y-2 pl-5 text-slate-700">
          <li>Start from level A0 if you are a beginner.</li>
          <li>Learn vocabulary lesson by lesson.</li>
          <li>Practise every day for 10–20 minutes.</li>
          <li>Use exercises to remember words better.</li>
          <li>Open grammar and dictionary pages when you need more context.</li>
        </ol>

        <div className="pt-2">
          <Link
            className="inline-flex rounded-xl bg-black px-4 py-2 text-white"
            href="/learning"
          >
            Go to Courses →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Who This Slovak Course Is For</h2>

        <div className="space-y-3 text-slate-700">
          <p>
            Flunio is suitable for beginners and intermediate learners who want
            to study Slovak online in a simple and structured format.
          </p>

          <p>
            It is especially useful for people who want to improve Slovak for
            everyday life, relocation, work, study or communication in Slovakia.
          </p>

          <p>
            You can also explore the dedicated pages for{" "}
            <Link href="/grammar" className="underline">
              grammar
            </Link>{" "}
            and{" "}
            <Link href="/dictionary" className="underline">
              dictionary
            </Link>{" "}
            while progressing through the course.
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