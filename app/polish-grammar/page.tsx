import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Polish Grammar Online: Cases, Verbs, Alphabet | Flunio",
  description:
    "Learn Polish grammar online with clear explanations, examples and practice: alphabet, pronunciation, verbs, cases, word order and beginner grammar.",

  alternates: {
    canonical: `${SITE_URL}/polish-grammar`,
  },

  openGraph: {
    title: "Polish Grammar Online: Cases, Verbs, Alphabet | Flunio",
    description:
      "Learn Polish grammar step by step: alphabet, pronunciation, verbs, cases, word order and practical examples.",
    url: `${SITE_URL}/polish-grammar`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Is Polish grammar difficult?",
    a: "Polish grammar can feel difficult at first because of cases, endings, verb forms and pronunciation, but it becomes easier when you learn it step by step with examples.",
  },
  {
    q: "What should I learn first in Polish grammar?",
    a: "Start with the Polish alphabet and pronunciation, then continue with basic sentence structure, present tense verbs and the most common cases.",
  },
  {
    q: "Does Polish have cases?",
    a: "Yes. Polish uses cases, which means nouns, adjectives and pronouns can change their endings depending on their role in a sentence.",
  },
  {
    q: "Can I learn Polish grammar together with vocabulary?",
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
        id="faq-schema-polish-grammar"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={`${card} space-y-4 p-8`}>
        <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
          Polish grammar online — cases, verbs, alphabet and examples
        </h1>

        <p className="theme-text-muted">
          Polish grammar becomes easier when you learn it in a clear order.
          Instead of memorizing rules without context, Flunio helps you connect
          grammar with real words, examples and practice. You can start with the
          alphabet and pronunciation, then continue with verbs, cases and useful
          sentence patterns.
        </p>

        <p className="theme-text-muted">
          This page is a starting point for learning Polish grammar online. It is
          useful for beginners who want to understand how Polish works, and for
          learners who already know some vocabulary but feel confused by endings,
          verb forms or word order.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link className={primaryButton} href="/learning/a0-1">
            Start Polish lessons →
          </Link>

          <Link className={secondaryButton} href="/learn-polish">
            Learn Polish online
          </Link>

          <Link className={secondaryButton} href="/polish-for-beginners">
            Polish for beginners
          </Link>

          <Link className={secondaryButton} href="/polish-vocabulary">
            Polish vocabulary
          </Link>

          <Link className={secondaryButton} href="/polish-words-with-audio">
            Polish audio practice
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            1) Alphabet and pronunciation
          </h2>
          <p className="mt-2 theme-text-muted">
            Start with Polish letters, pronunciation and sounds such as sz, cz,
            rz, ą, ę, ł and ń. This makes reading and listening much easier from
            the beginning.
          </p>

          <div className="mt-3">
            <Link className={textLink} href="/polish-words-with-audio">
              Practice Polish pronunciation with audio →
            </Link>
          </div>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">2) Polish verbs</h2>
          <p className="mt-2 theme-text-muted">
            Polish verbs change by person, tense and meaning. Begin with common
            verbs like być, mieć, iść, robić, chcieć and mówić before moving to
            more complex patterns.
          </p>

          <div className="mt-3">
            <Link className={textLink} href="/learning/a0-1">
              Learn verbs in lessons →
            </Link>
          </div>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">3) Polish cases</h2>
          <p className="mt-2 theme-text-muted">
            Polish cases explain why nouns, adjectives and pronouns change their
            endings. They are easier to learn through examples and phrases than
            through tables alone.
          </p>

          <div className="mt-3">
            <Link className={textLink} href="/polish-vocabulary">
              Build vocabulary first →
            </Link>
          </div>
        </div>

        <div className={`${card} p-5`}>
          <h2 className="text-lg font-bold theme-text">
            4) Word order and sentences
          </h2>
          <p className="mt-2 theme-text-muted">
            Polish word order can be flexible, but beginners should start with
            simple sentence patterns. Practice helps you understand what sounds
            natural.
          </p>

          <div className="mt-3">
            <Link className={textLink} href="/polish-for-beginners">
              Follow the beginner roadmap →
            </Link>
          </div>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          How to learn Polish grammar step by step
        </h2>

        <p className="theme-text-muted">
          The best way to learn Polish grammar is to combine rules with real
          examples. If you only read tables, it is easy to forget them. But when
          you see grammar inside words and sentences that you already know, the
          language becomes more natural.
        </p>

        <ol className="list-decimal space-y-2 pl-5 theme-text-muted">
          <li>Learn the Polish alphabet and pronunciation first.</li>
          <li>Build basic vocabulary with short daily lessons.</li>
          <li>Study simple sentence structure and word order.</li>
          <li>Learn present tense verb forms with common verbs.</li>
          <li>Start Polish cases gradually through examples.</li>
          <li>Practice grammar through exercises, not only reading.</li>
          <li>Return to difficult topics regularly instead of rushing.</li>
        </ol>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/polish-for-beginners" className={primaryButton}>
            Open Polish beginner roadmap →
          </Link>

          <Link href="/polish-vocabulary" className={secondaryButton}>
            Learn first Polish words →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Why Polish cases are important
        </h2>

        <p className="theme-text-muted">
          Cases are one of the most important parts of Polish grammar. They show
          the role of a word in a sentence: who is doing something, who receives
          the action, where something is, where it goes, or who owns something.
          This is why Polish words often change their endings.
        </p>

        <p className="theme-text-muted">
          At first, cases can look complicated. You do not need to master every
          form immediately. Start with common phrases and everyday examples, then
          slowly notice patterns. This is more effective than trying to memorize
          every table at once.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/polish-vocabulary" className={secondaryButton}>
            Learn useful Polish words →
          </Link>

          <Link href="/learn-polish" className={secondaryButton}>
            Learn Polish online →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Polish verbs and everyday sentences
        </h2>

        <p className="theme-text-muted">
          Polish verbs change depending on the person: I, you, he, she, we, you
          plural and they. For beginners, the present tense is the best place to
          start because it appears in everyday communication all the time.
        </p>

        <p className="theme-text-muted">
          Learn common verbs first, such as to be, to have, to go, to do, to
          want and to speak. When you understand these verbs, it becomes easier
          to recognize similar patterns in new Polish words.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning/a0-1" className={secondaryButton}>
            Start the first Polish lesson →
          </Link>

          <Link href="/polish-for-beginners" className={secondaryButton}>
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
          already see in examples. This works especially well for Polish because
          endings and verb forms become clearer when they appear in real
          phrases.
        </p>

        <p className="theme-text-muted">
          Flunio connects grammar with lessons, dictionary search and practice.
          You can learn a word, review it in exercises and then return to grammar
          when you want to understand the rule behind a sentence.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learn-polish" className={secondaryButton}>
            Learn Polish online
          </Link>

          <Link href="/polish-for-beginners" className={secondaryButton}>
            Polish for beginners
          </Link>

          <Link href="/polish-vocabulary" className={secondaryButton}>
            Polish vocabulary
          </Link>

          <Link href="/polish-words-with-audio" className={secondaryButton}>
            Polish words with audio
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Practice Polish
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Not sure where to start?
        </h2>

        <p className="theme-text-muted">
          If you are new to Polish, start with pronunciation, basic words and
          short phrases before diving deep into grammar. The beginner roadmap
          shows the first 7 days, first 30 days and first 100 Polish words to
          learn.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/polish-for-beginners" className={primaryButton}>
            Open Polish for beginners →
          </Link>

          <Link href="/polish-words-with-audio" className={secondaryButton}>
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