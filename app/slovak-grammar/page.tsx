import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Slovak Grammar Online: Cases, Verbs, Alphabet | Flunio",
  description:
    "Learn Slovak grammar online with clear explanations, examples and practice: alphabet, pronunciation, verbs, cases and sentence structure.",

  alternates: {
    canonical: `${SITE_URL}/slovak-grammar`,
  },

  openGraph: {
    title: "Slovak Grammar Online: Cases, Verbs, Alphabet | Flunio",
    description:
      "Learn Slovak grammar step by step: alphabet, pronunciation, verbs, cases and practical examples.",
    url: `${SITE_URL}/slovak-grammar`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Is Slovak grammar difficult?",
    a: "Slovak grammar can feel difficult at first because of cases, endings and verb forms, but it becomes easier when you learn it step by step with examples.",
  },
  {
    q: "What should I learn first in Slovak grammar?",
    a: "Start with the Slovak alphabet and pronunciation, then continue with basic sentence structure, present tense verbs and the most common cases.",
  },
  {
    q: "Does Flunio include Slovak grammar with examples?",
    a: "Yes. Flunio includes grammar topics with explanations, examples and links to practice, vocabulary and lessons.",
  },
  {
    q: "Do I need grammar before learning Slovak words?",
    a: "No. It is usually better to learn basic words and phrases first, then use grammar to understand how those words change in real sentences.",
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
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-10">
      <Script
        id="faq-schema-slovak-grammar-en"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Slovak grammar online — cases, verbs, alphabet and examples
        </h1>

        <p className="text-slate-700">
          Slovak grammar becomes much easier when you learn it in a clear order.
          Instead of memorizing rules without context, Flunio helps you connect
          grammar with real words, examples and practice. You can start with the
          alphabet and pronunciation, then continue with verbs, cases and useful
          sentence patterns.
        </p>

        <p className="text-slate-700">
          This page is a starting point for learning Slovak grammar online. It
          is useful for beginners who want to understand how Slovak works, and
          for learners who already know some vocabulary but feel confused by
          word endings, verb forms or sentence structure.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link className="rounded-xl bg-black px-4 py-2 text-white" href="/grammar">
            Open grammar topics
          </Link>

          <Link className="rounded-xl border px-4 py-2" href="/learning/a0-1">
            Start A0 lessons →
          </Link>

          <Link className="rounded-xl border px-4 py-2" href="/dictionary">
            Open dictionary
          </Link>

          <Link className="rounded-xl border px-4 py-2" href="/practice">
            Practice exercises
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">1) Alphabet and pronunciation</h2>
          <p className="mt-2 text-slate-700">
            Start with Slovak letters, long and short vowels, soft sounds and
            pronunciation rules. This helps you read words correctly from the
            beginning.
          </p>

          <div className="mt-3">
            <Link className="underline" href="/grammar/alphabet">
              Start with the Slovak alphabet →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">2) Slovak verbs</h2>
          <p className="mt-2 text-slate-700">
            Learn how Slovak verbs change by person and tense. Begin with common
            verbs and present tense patterns before moving to more complex
            forms.
          </p>

          <div className="mt-3">
            <Link className="underline" href="/grammar/verbs-present">
              Learn present tense verbs →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">3) Slovak cases</h2>
          <p className="mt-2 text-slate-700">
            Cases explain why nouns, adjectives and pronouns change their
            endings. Learn them through examples instead of memorizing tables
            alone.
          </p>

          <div className="mt-3">
            <Link className="underline" href="/grammar/cases">
              Learn Slovak cases →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">4) Practice and vocabulary</h2>
          <p className="mt-2 text-slate-700">
            Grammar is easier when you see it in vocabulary and sentences. Use
            lessons, dictionary search and exercises to reinforce what you learn.
          </p>

          <div className="mt-3">
            <Link className="underline" href="/practice">
              Go to exercises →
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          How to learn Slovak grammar step by step
        </h2>

        <p className="text-slate-700">
          The best way to learn Slovak grammar is to combine rules with real
          examples. If you only read grammar tables, it is easy to forget them.
          But when you see a rule inside words and sentences that you already
          know, it becomes more natural.
        </p>

        <ol className="list-decimal space-y-2 pl-5 text-slate-700">
          <li>Learn the Slovak alphabet and pronunciation first.</li>
          <li>Build basic vocabulary with short daily lessons.</li>
          <li>Study simple sentence structure and word order.</li>
          <li>Learn present tense verb forms with common verbs.</li>
          <li>Start cases gradually, using examples and phrases.</li>
          <li>Practice grammar through exercises, not only reading.</li>
          <li>Return to difficult topics regularly instead of rushing.</li>
        </ol>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Why Slovak cases are important
        </h2>

        <p className="text-slate-700">
          Cases are one of the most important parts of Slovak grammar. They show
          the role of a word in a sentence: who is doing something, who receives
          the action, where something is, where it goes, or who owns something.
          This is why Slovak words often change their endings.
        </p>

        <p className="text-slate-700">
          At first, cases can look complicated. But you do not need to master
          all forms immediately. Start with common examples and everyday
          phrases, then slowly notice patterns. This is much more effective than
          trying to memorize every table at once.
        </p>

        <div className="pt-2">
          <Link href="/grammar/cases" className="rounded-xl border px-4 py-2">
            Open Slovak cases →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Slovak verbs and present tense
        </h2>

        <p className="text-slate-700">
          Slovak verbs change depending on the person: I, you, he, she, we, you
          plural and they. This is why a verb can have several forms. For
          beginners, the present tense is the best place to start because it is
          used in everyday communication all the time.
        </p>

        <p className="text-slate-700">
          Learn common verbs first, such as to be, to have, to go, to do, to
          want and to know. When you understand how these verbs work, it becomes
          easier to recognize similar patterns in new words.
        </p>

        <div className="pt-2">
          <Link
            href="/grammar/verbs-present"
            className="rounded-xl border px-4 py-2"
          >
            Open present tense →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Learn grammar together with vocabulary
        </h2>

        <p className="text-slate-700">
          Grammar should not block your progress. A practical approach is to
          learn useful vocabulary first, then use grammar to explain what you
          already see in examples. This works especially well for Slovak because
          endings and verb forms become clearer when they appear in real
          phrases.
        </p>

        <p className="text-slate-700">
          Flunio connects grammar with lessons, dictionary search and practice.
          You can learn a word, hear its pronunciation, review it in exercises
          and then open a grammar topic when you want to understand the rule
          behind the sentence.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning" className="rounded-xl border px-4 py-2">
            Open lessons
          </Link>

          <Link href="/dictionary" className="rounded-xl border px-4 py-2">
            Search vocabulary
          </Link>

          <Link href="/practice" className="rounded-xl border px-4 py-2">
            Practice Slovak
          </Link>
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