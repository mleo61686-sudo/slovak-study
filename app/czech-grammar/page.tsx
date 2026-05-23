import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Czech Grammar Online: Cases, Verbs, Alphabet | Flunio",
  description:
    "Learn Czech grammar online with clear explanations, examples and practice: alphabet, pronunciation, verbs, cases, word order and beginner grammar.",

  alternates: {
    canonical: `${SITE_URL}/czech-grammar`,
  },

  openGraph: {
    title: "Czech Grammar Online: Cases, Verbs, Alphabet | Flunio",
    description:
      "Learn Czech grammar step by step: alphabet, pronunciation, verbs, cases, word order and practical examples.",
    url: `${SITE_URL}/czech-grammar`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Is Czech grammar difficult?",
    a: "Czech grammar can feel difficult at first because of cases, endings, verb forms and word order, but it becomes easier when you learn it step by step with examples.",
  },
  {
    q: "What should I learn first in Czech grammar?",
    a: "Start with the Czech alphabet and pronunciation, then continue with basic sentence structure, present tense verbs and the most common cases.",
  },
  {
    q: "Does Czech have cases?",
    a: "Yes. Czech uses cases, which means nouns, adjectives and pronouns can change their endings depending on their role in a sentence.",
  },
  {
    q: "Can I learn Czech grammar together with vocabulary?",
    a: "Yes. It is usually better to learn basic words and phrases first, then use grammar to understand how those words change in real sentences.",
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
        id="faq-schema-czech-grammar"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={`${card} space-y-4 p-8`}>
        <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
          Czech grammar online — cases, verbs, alphabet and examples
        </h1>

        <p className="theme-text-muted">
          Czech grammar becomes easier when you learn it in a clear order.
          Instead of memorizing rules without context, Flunio helps you connect
          grammar with real words, examples and practice. You can start with the
          alphabet and pronunciation, then continue with verbs, cases and useful
          sentence patterns.
        </p>

        <p className="theme-text-muted">
          This page is a starting point for learning Czech grammar online. It is
          useful for beginners who want to understand how Czech works, and for
          learners who already know some vocabulary but feel confused by endings,
          verb forms or word order.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link className={primaryButton} href="/learning/a0-1">
            Start Czech lessons →
          </Link>

          <Link className={secondaryButton} href="/learn-czech">
            Learn Czech online
          </Link>

          <Link className={secondaryButton} href="/czech-for-beginners">
            Czech for beginners
          </Link>

          <Link className={secondaryButton} href="/czech-vocabulary">
            Czech vocabulary
          </Link>

          <Link className={secondaryButton} href="/czech-words-with-audio">
            Czech audio practice
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            1) Alphabet and pronunciation
          </h2>
          <p className="mt-2 theme-text-muted">
            Start with Czech letters, long and short vowels, soft sounds and
            pronunciation rules. Pay attention to sounds such as ř, č, š, ž, ě
            and long vowels marked with accents.
          </p>

          <div className="mt-3">
            <Link className={textLink} href="/czech-words-with-audio">
              Practice Czech pronunciation with audio →
            </Link>
          </div>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">2) Czech verbs</h2>
          <p className="mt-2 theme-text-muted">
            Czech verbs change by person, tense and meaning. Begin with common
            verbs like být, mít, jít, dělat, chtít and mluvit before moving to
            more complex patterns.
          </p>

          <div className="mt-3">
            <Link className={textLink} href="/learning/a0-1">
              Learn verbs in lessons →
            </Link>
          </div>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">3) Czech cases</h2>
          <p className="mt-2 theme-text-muted">
            Czech cases explain why nouns, adjectives and pronouns change their
            endings. They are easier to learn through examples and phrases than
            through tables alone.
          </p>

          <div className="mt-3">
            <Link className={textLink} href="/czech-vocabulary">
              Build vocabulary first →
            </Link>
          </div>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            4) Word order and sentences
          </h2>
          <p className="mt-2 theme-text-muted">
            Czech word order can be flexible, but beginners should start with
            simple sentence patterns. Practice helps you understand what sounds
            natural.
          </p>

          <div className="mt-3">
            <Link className={textLink} href="/czech-for-beginners">
              Follow the beginner roadmap →
            </Link>
          </div>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          How to learn Czech grammar step by step
        </h2>

        <p className="theme-text-muted">
          The best way to learn Czech grammar is to combine rules with real
          examples. If you only read tables, it is easy to forget them. But when
          you see grammar inside words and sentences that you already know, the
          language becomes more natural.
        </p>

        <ol className="list-decimal space-y-2 pl-5 theme-text-muted">
          <li>Learn the Czech alphabet and pronunciation first.</li>
          <li>Build basic vocabulary with short daily lessons.</li>
          <li>Study simple sentence structure and word order.</li>
          <li>Learn present tense verb forms with common verbs.</li>
          <li>Start Czech cases gradually through examples.</li>
          <li>Practice grammar through exercises, not only reading.</li>
          <li>Return to difficult topics regularly instead of rushing.</li>
        </ol>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/czech-for-beginners" className={primaryButton}>
            Open Czech beginner roadmap →
          </Link>

          <Link href="/czech-vocabulary" className={secondaryButton}>
            Learn first Czech words →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Why Czech cases are important
        </h2>

        <p className="theme-text-muted">
          Cases are one of the most important parts of Czech grammar. They show
          the role of a word in a sentence: who is doing something, who receives
          the action, where something is, where it goes, or who owns something.
          This is why Czech words often change their endings.
        </p>

        <p className="theme-text-muted">
          At first, cases can look complicated. You do not need to master every
          form immediately. Start with common phrases and everyday examples, then
          slowly notice patterns. This is more effective than trying to memorize
          every table at once.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/czech-vocabulary" className={secondaryButton}>
            Learn useful Czech words →
          </Link>

          <Link href="/learn-czech" className={secondaryButton}>
            Learn Czech online →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Czech verbs and everyday sentences
        </h2>

        <p className="theme-text-muted">
          Czech verbs change depending on the person: I, you, he, she, we, you
          plural and they. For beginners, the present tense is the best place to
          start because it appears in everyday communication all the time.
        </p>

        <p className="theme-text-muted">
          Learn common verbs first, such as to be, to have, to go, to do, to
          want and to speak. When you understand these verbs, it becomes easier
          to recognize similar patterns in new Czech words.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning/a0-1" className={secondaryButton}>
            Start the first Czech lesson →
          </Link>

          <Link href="/czech-for-beginners" className={secondaryButton}>
            Beginner learning order →
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
          already see in examples. This works especially well for Czech because
          endings and verb forms become clearer when they appear in real
          phrases.
        </p>

        <p className="theme-text-muted">
          Flunio connects grammar with lessons, dictionary search and practice.
          You can learn a word, review it in exercises and then return to grammar
          when you want to understand the rule behind a sentence.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learn-czech" className={secondaryButton}>
            Learn Czech online
          </Link>

          <Link href="/czech-for-beginners" className={secondaryButton}>
            Czech for beginners
          </Link>

          <Link href="/czech-vocabulary" className={secondaryButton}>
            Czech vocabulary
          </Link>

          <Link href="/czech-words-with-audio" className={secondaryButton}>
            Czech words with audio
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Practice Czech
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Not sure where to start?
        </h2>

        <p className="theme-text-muted">
          If you are new to Czech, start with pronunciation, basic words and
          short phrases before diving deep into grammar. The beginner roadmap
          shows the first 7 days, first 30 days and first 100 Czech words to
          learn.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/czech-for-beginners" className={primaryButton}>
            Open Czech for beginners →
          </Link>

          <Link href="/czech-words-with-audio" className={secondaryButton}>
            Practice pronunciation →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">FAQ</h2>

        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className={`${softCard} p-4`}>
              <p className="font-semibold theme-text">{item.q}</p>
              <p className="mt-2 theme-text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}