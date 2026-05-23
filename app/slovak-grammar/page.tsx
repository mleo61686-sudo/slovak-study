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

const card = "flunio-card rounded-3xl";
const softCard = "theme-home-soft-card rounded-2xl";
const primaryButton =
  "theme-primary-button inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0";
const secondaryButton =
  "theme-secondary-button inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0";
const textLink =
  "font-semibold theme-accent-text underline decoration-cyan-300/40 underline-offset-4 transition hover:opacity-80";

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
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 theme-text">
      <Script
        id="faq-schema-slovak-grammar-en"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={`${card} space-y-4 p-8`}>
        <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
          Slovak grammar online — cases, verbs, alphabet and examples
        </h1>

        <p className="theme-text-muted">
          Slovak grammar becomes much easier when you learn it in a clear order.
          Instead of memorizing rules without context, Flunio helps you connect
          grammar with real words, examples and practice. You can start with the
          alphabet and pronunciation, then continue with verbs, cases and useful
          sentence patterns.
        </p>

        <p className="theme-text-muted">
          This page is a starting point for learning Slovak grammar online. It
          is useful for beginners who want to understand how Slovak works, and
          for learners who already know some vocabulary but feel confused by
          word endings, verb forms or sentence structure.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link className={primaryButton} href="/grammar">
            Open grammar topics
          </Link>

          <Link className={secondaryButton} href="/slovak-for-beginners">
            Slovak for beginners
          </Link>

          <Link className={secondaryButton} href="/learn-slovak">
            Learn Slovak online
          </Link>

          <Link className={secondaryButton} href="/learning/a0-1">
            Start A0 lessons →
          </Link>

          <Link className={secondaryButton} href="/dictionary">
            Open dictionary
          </Link>

          <Link className={secondaryButton} href="/practice">
            Practice exercises
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            1) Alphabet and pronunciation
          </h2>
          <p className="mt-2 theme-text-muted">
            Start with Slovak letters, long and short vowels, soft sounds and
            pronunciation rules. This helps you read words correctly from the
            beginning.
          </p>

          <div className="mt-3">
            <Link className={textLink} href="/grammar/alphabet">
              Start with the Slovak alphabet →
            </Link>
          </div>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">2) Slovak verbs</h2>
          <p className="mt-2 theme-text-muted">
            Learn how Slovak verbs change by person and tense. Begin with common
            verbs and present tense patterns before moving to more complex
            forms.
          </p>

          <div className="mt-3">
            <Link className={textLink} href="/grammar/verbs-present">
              Learn present tense verbs →
            </Link>
          </div>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">3) Slovak cases</h2>
          <p className="mt-2 theme-text-muted">
            Cases explain why nouns, adjectives and pronouns change their
            endings. Learn them through examples instead of memorizing tables
            alone.
          </p>

          <div className="mt-3">
            <Link className={textLink} href="/grammar/cases">
              Learn Slovak cases →
            </Link>
          </div>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            4) Practice and vocabulary
          </h2>
          <p className="mt-2 theme-text-muted">
            Grammar is easier when you see it in vocabulary and sentences. Use
            lessons, dictionary search and exercises to reinforce what you learn.
          </p>

          <div className="mt-3">
            <Link className={textLink} href="/slovak-for-beginners">
              Follow the beginner roadmap →
            </Link>
          </div>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          How to learn Slovak grammar step by step
        </h2>

        <p className="theme-text-muted">
          The best way to learn Slovak grammar is to combine rules with real
          examples. If you only read grammar tables, it is easy to forget them.
          But when you see a rule inside words and sentences that you already
          know, it becomes more natural.
        </p>

        <ol className="list-decimal space-y-2 pl-5 theme-text-muted">
          <li>Learn the Slovak alphabet and pronunciation first.</li>
          <li>Build basic vocabulary with short daily lessons.</li>
          <li>Study simple sentence structure and word order.</li>
          <li>Learn present tense verb forms with common verbs.</li>
          <li>Start cases gradually, using examples and phrases.</li>
          <li>Practice grammar through exercises, not only reading.</li>
          <li>Return to difficult topics regularly instead of rushing.</li>
        </ol>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/slovak-for-beginners" className={primaryButton}>
            Open Slovak beginner roadmap →
          </Link>

          <Link href="/learn-slovak" className={secondaryButton}>
            Full Slovak course →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Why Slovak cases are important
        </h2>

        <p className="theme-text-muted">
          Cases are one of the most important parts of Slovak grammar. They show
          the role of a word in a sentence: who is doing something, who receives
          the action, where something is, where it goes, or who owns something.
          This is why Slovak words often change their endings.
        </p>

        <p className="theme-text-muted">
          At first, cases can look complicated. But you do not need to master
          all forms immediately. Start with common examples and everyday
          phrases, then slowly notice patterns. This is much more effective than
          trying to memorize every table at once.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/grammar/cases" className={secondaryButton}>
            Open Slovak cases →
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Search Slovak words →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Slovak verbs and present tense
        </h2>

        <p className="theme-text-muted">
          Slovak verbs change depending on the person: I, you, he, she, we, you
          plural and they. This is why a verb can have several forms. For
          beginners, the present tense is the best place to start because it is
          used in everyday communication all the time.
        </p>

        <p className="theme-text-muted">
          Learn common verbs first, such as to be, to have, to go, to do, to
          want and to know. When you understand how these verbs work, it becomes
          easier to recognize similar patterns in new words.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/grammar/verbs-present" className={secondaryButton}>
            Open present tense →
          </Link>

          <Link href="/learning/a0-1" className={secondaryButton}>
            Start first lesson →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Learn grammar together with vocabulary
        </h2>

        <p className="theme-text-muted">
          Grammar should not block your progress. A practical approach is to
          learn useful vocabulary first, then use grammar to explain what you
          already see in examples. This works especially well for Slovak because
          endings and verb forms become clearer when they appear in real
          phrases.
        </p>

        <p className="theme-text-muted">
          Flunio connects grammar with lessons, dictionary search and practice.
          You can learn a word, hear its pronunciation, review it in exercises
          and then open a grammar topic when you want to understand the rule
          behind the sentence.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learn-slovak" className={secondaryButton}>
            Learn Slovak online
          </Link>

          <Link href="/slovak-for-beginners" className={secondaryButton}>
            Slovak for beginners
          </Link>

          <Link href="/learning" className={secondaryButton}>
            Open lessons
          </Link>

          <Link href="/dictionary" className={secondaryButton}>
            Search vocabulary
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Practice Slovak
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Not sure where to start?
        </h2>

        <p className="theme-text-muted">
          If you are new to Slovak, start with pronunciation, basic words and
          short phrases before diving deep into grammar. The beginner roadmap
          shows the first 7 days, first 30 days and first 100 Slovak words to
          learn.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/slovak-for-beginners" className={primaryButton}>
            Open Slovak for beginners →
          </Link>

          <Link href="/learn-slovak" className={secondaryButton}>
            Full Slovak course →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">FAQ</h2>

        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className={`${softCard} p-4`}>
              <div className="font-semibold theme-text">{item.q}</div>
              <div className="mt-2 theme-text-muted">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}