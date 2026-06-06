import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Learn Polish Online from A0 to B2 | Flunio",
  description:
    "Learn Polish through short interactive lessons, pronunciation, practical vocabulary and exercises. Start the complete Polish A0 level for free.",

  alternates: {
    canonical: `${SITE_URL}/learn-polish`,
  },

  openGraph: {
    title: "Learn Polish Online from A0 to B2 | Flunio",
    description:
      "Start Polish from zero with short interactive lessons. Complete A0 for free and continue through A1–B2 with Flunio Premium.",
    url: `${SITE_URL}/learn-polish`,
    siteName: "Flunio",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Learn Polish Online from A0 to B2 | Flunio",
    description:
      "Interactive Polish lessons with vocabulary, pronunciation and exercises. Start A0 for free.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const FAQ = [
  {
    q: "Can I start learning Polish for free?",
    a: "Yes. The complete Polish A0 level is available for free. You can begin with the first lesson, learn essential words and complete interactive exercises without buying Premium.",
  },
  {
    q: "What does Flunio Premium unlock?",
    a: "Premium unlocks Polish levels A1, A2, B1 and B2, together with premium practice and word review. One subscription also gives access to all active Flunio courses.",
  },
  {
    q: "Is Flunio suitable for complete Polish beginners?",
    a: "Yes. The course starts at A0, so no previous knowledge is required. Vocabulary and exercises are introduced gradually.",
  },
  {
    q: "Is the course useful for living and working in Poland?",
    a: "Yes. The course includes practical vocabulary for work, housing, shopping, transport, healthcare, documents and daily communication in Poland.",
  },
  {
    q: "Does the Polish course include pronunciation?",
    a: "Yes. Words include audio pronunciation so you can hear Polish sounds and letter combinations such as sz, cz, rz, ż, ś, ć and ł.",
  },
];

const FREE_FEATURES = [
  "Complete Polish A0 level",
  "Lessons unlocked step by step",
  "Vocabulary with pronunciation",
  "Seven interactive exercise types",
  "Free Polish grammar explanations",
  "Free dictionary access",
];

const PREMIUM_FEATURES = [
  "Polish levels A1, A2, B1 and B2",
  "Premium practice and word review",
  "Access to every active Flunio course",
  "Continue beyond beginner Polish",
];

const LESSON_STEPS = [
  {
    number: "01",
    title: "Learn useful Polish words",
    text: "Each lesson introduces a focused group of words connected to everyday situations instead of a large random vocabulary list.",
  },
  {
    number: "02",
    title: "Hear Polish pronunciation",
    text: "Listen to every word and become familiar with sounds and combinations such as sz, cz, rz, ż, ś, ć and ł.",
  },
  {
    number: "03",
    title: "Practise words actively",
    text: "Recognise, type, match and use new vocabulary instead of only reading translations.",
  },
  {
    number: "04",
    title: "Progress in the correct order",
    text: "A0 lessons unlock sequentially, giving you a clear path from your first words to basic Polish communication.",
  },
];

const EXAMPLE_WORDS = [
  {
    pl: "dom",
    en: "house",
  },
  {
    pl: "praca",
    en: "work",
  },
  {
    pl: "sklep",
    en: "shop",
  },
  {
    pl: "rodzina",
    en: "family",
  },
  {
    pl: "zdrowie",
    en: "health",
  },
  {
    pl: "podróżować",
    en: "to travel",
  },
];

const TOPICS = [
  "Introductions",
  "Family",
  "Housing",
  "Shopping",
  "Food",
  "Transport",
  "Work",
  "Healthcare",
  "Weather",
  "Daily routine",
  "Documents",
  "City life",
];

const POLISH_CHALLENGES = [
  {
    title: "Consonant combinations",
    text: "Combinations such as sz, cz, rz and szcz look difficult at first, but they become easier when heard regularly.",
  },
  {
    title: "Soft sounds",
    text: "Letters such as ś, ć, ź and ń require listening practice so you can recognise and pronounce them naturally.",
  },
  {
    title: "Cases and word endings",
    text: "Polish nouns and adjectives change form, but you can learn these patterns gradually through useful examples.",
  },
];

const card = "flunio-card rounded-3xl";
const softCard = "theme-home-soft-card rounded-2xl";

const primaryButton =
  "theme-primary-button inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-center font-bold";

const secondaryButton =
  "theme-secondary-button inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 text-center font-semibold";

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

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Learn Polish Online from A0 to B2",
    description:
      "An interactive online Polish course with structured lessons, vocabulary, pronunciation and exercises from A0 to B2.",
    provider: {
      "@type": "Organization",
      name: "Flunio",
      url: SITE_URL,
    },
    url: `${SITE_URL}/learn-polish`,
    inLanguage: "en",
    educationalLevel: "A0–B2",
    isAccessibleForFree: true,
  };

  return (
    <main className="mx-auto max-w-6xl space-y-12 px-4 py-8 theme-text sm:py-12">
      <Script
        id="faq-schema-polish-en"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="course-schema-polish-en"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema),
        }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="theme-pill inline-flex rounded-full px-4 py-2 text-sm font-semibold">
              🇵🇱 Polish course · A0 is free
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight theme-text sm:text-5xl">
                Learn Polish for life, work and communication in Poland
              </h1>

              <p className="max-w-2xl text-lg leading-8 theme-text-muted">
                Start from zero with short interactive lessons. Learn useful
                Polish words, hear their pronunciation and practise them through
                seven exercise types.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/learning/a0-1" className={primaryButton}>
                Start Polish A0 for free
              </Link>

              <Link href="/learning" className={secondaryButton}>
                View all course levels
              </Link>
            </div>

            <div className="grid gap-2 text-sm theme-text-muted sm:grid-cols-3">
              <div>✓ Complete A0 without payment</div>
              <div>✓ Short structured lessons</div>
              <div>✓ Learn on phone or desktop</div>
            </div>
          </div>

          <div className={`${softCard} relative overflow-hidden p-5 sm:p-6`}>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest theme-accent-text">
                  Example lesson
                </div>

                <div className="mt-1 text-xl font-bold theme-text">
                  Polish A0
                </div>
              </div>

              <div className="theme-pill rounded-full px-3 py-1 text-xs font-semibold">
                10 words
              </div>
            </div>

            <div className="space-y-3">
              {EXAMPLE_WORDS.slice(0, 4).map((word, index) => (
                <div
                  key={word.pl}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold theme-accent-text">
                      {index + 1}
                    </div>

                    <div>
                      <div className="font-bold theme-text">{word.pl}</div>
                      <div className="text-sm theme-text-muted">{word.en}</div>
                    </div>
                  </div>

                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5"
                    aria-hidden="true"
                  >
                    🔊
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500" />
            </div>

            <div className="mt-2 text-xs theme-text-muted">
              Hear Polish, recognise it and use it immediately.
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <div className="text-sm font-bold uppercase tracking-widest theme-accent-text">
            How the course works
          </div>

          <h2 className="text-3xl font-extrabold theme-text">
            A clear Polish learning path from A0 to B2
          </h2>

          <p className="theme-text-muted">
            Follow lessons in order instead of trying to combine unrelated
            videos, grammar tables and vocabulary lists.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {LESSON_STEPS.map((step) => (
            <article key={step.number} className={`${card} p-6`}>
              <div className="flex items-start gap-4">
                <div className="theme-pill flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold">
                  {step.number}
                </div>

                <div>
                  <h3 className="text-xl font-bold theme-text">{step.title}</h3>

                  <p className="mt-2 leading-7 theme-text-muted">
                    {step.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${card} overflow-hidden p-6 sm:p-8`}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="text-sm font-bold uppercase tracking-widest theme-accent-text">
              Interactive practice
            </div>

            <h2 className="text-3xl font-extrabold theme-text">
              Practise every Polish word in several ways
            </h2>

            <p className="leading-7 theme-text-muted">
              You do not just read a translation once. Flunio helps you
              recognise, hear, type, match and use every new word.
            </p>

            <Link href="/learning/a0-1" className={primaryButton}>
              Try the first Polish lesson
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Choose the translation",
              "Choose the Polish word",
              "Write the correct word",
              "Recognise the word by audio",
              "Match words and translations",
              "Build a Polish sentence",
              "Build the translation",
            ].map((exercise, index) => (
              <div
                key={exercise}
                className={`${softCard} flex items-center gap-3 p-4`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold theme-accent-text">
                  {index + 1}
                </div>

                <div className="font-semibold theme-text">{exercise}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className={`${card} flex flex-col p-6 sm:p-8`}>
          <div className="theme-pill w-fit rounded-full px-3 py-1 text-xs font-bold">
            FREE
          </div>

          <h2 className="mt-4 text-3xl font-extrabold theme-text">
            Complete the Polish A0 level for free
          </h2>

          <p className="mt-3 leading-7 theme-text-muted">
            Build your first Polish vocabulary base without a subscription. A0
            lessons open one by one, giving you a simple learning sequence.
          </p>

          <ul className="mt-6 flex-1 space-y-3">
            {FREE_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3 theme-text">
                <span className="theme-accent-text">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link href="/learning/a0-1" className={`${primaryButton} mt-8`}>
            Start free Polish A0
          </Link>
        </article>

        <article
          className={`${card} relative flex flex-col overflow-hidden p-6 sm:p-8`}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />

          <div className="relative flex h-full flex-col">
            <div className="theme-pill w-fit rounded-full px-3 py-1 text-xs font-bold">
              PREMIUM
            </div>

            <h2 className="mt-4 text-3xl font-extrabold theme-text">
              Continue with Polish A1–B2
            </h2>

            <p className="mt-3 leading-7 theme-text-muted">
              Premium unlocks the higher Polish levels, advanced practice and all
              other active courses available on Flunio.
            </p>

            <ul className="mt-6 flex-1 space-y-3">
              {PREMIUM_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 theme-text">
                  <span className="theme-accent-text">★</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/premium" className={`${secondaryButton} mt-8`}>
              See Flunio Premium
            </Link>
          </div>
        </article>
      </section>

      <section className={`${card} space-y-6 p-6 sm:p-8`}>
        <div className="max-w-3xl space-y-3">
          <div className="text-sm font-bold uppercase tracking-widest theme-accent-text">
            Everyday Polish vocabulary
          </div>

          <h2 className="text-3xl font-extrabold theme-text">
            Learn words for real situations in Poland
          </h2>

          <p className="leading-7 theme-text-muted">
            Build practical vocabulary for daily life, work, transport,
            healthcare, shopping and communication with Polish speakers.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {TOPICS.map((topic) => (
            <div
              key={topic}
              className="theme-pill rounded-full px-4 py-2 text-sm font-semibold"
            >
              {topic}
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMPLE_WORDS.map((word) => (
            <div key={word.pl} className={`${softCard} p-4`}>
              <div className="text-lg font-bold theme-accent-text">
                {word.pl}
              </div>

              <div className="mt-1 theme-text-muted">{word.en}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-6 p-6 sm:p-8`}>
        <div className="max-w-3xl space-y-3">
          <div className="text-sm font-bold uppercase tracking-widest theme-accent-text">
            Polish pronunciation
          </div>

          <h2 className="text-3xl font-extrabold theme-text">
            Polish sounds become easier when you hear them often
          </h2>

          <p className="leading-7 theme-text-muted">
            Polish spelling can look complicated at first, but many sound
            patterns repeat. Listening to words regularly helps you recognise
            them faster and pronounce them more naturally.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {POLISH_CHALLENGES.map((item) => (
            <article key={item.title} className={`${softCard} p-5`}>
              <h3 className="text-lg font-bold theme-accent-text">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 theme-text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Living in Poland",
            text: "Learn vocabulary for housing, shopping, healthcare, transport, documents and everyday conversations.",
          },
          {
            title: "Working in Poland",
            text: "Build practical Polish for instructions, colleagues, schedules and common workplace situations.",
          },
          {
            title: "Studying or travelling",
            text: "Practise Polish for university, accommodation, directions, food and communication with local people.",
          },
        ].map((item) => (
          <article key={item.title} className={`${card} p-6`}>
            <h2 className="text-xl font-bold theme-text">{item.title}</h2>

            <p className="mt-3 leading-7 theme-text-muted">{item.text}</p>
          </article>
        ))}
      </section>

      <section className={`${card} space-y-6 p-6 sm:p-8`}>
        <div className="space-y-3">
          <div className="text-sm font-bold uppercase tracking-widest theme-accent-text">
            Free Polish resources
          </div>

          <h2 className="text-3xl font-extrabold theme-text">
            Combine lessons with grammar, vocabulary and audio
          </h2>

          <p className="max-w-3xl leading-7 theme-text-muted">
            Use the course as your main learning path, then open focused Flunio
            resources when you need pronunciation practice, grammar explanations
            or extra vocabulary.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/polish-grammar" className={`${softCard} block p-5`}>
            <div className="text-lg font-bold theme-accent-text">
              Polish grammar
            </div>

            <div className="mt-2 text-sm leading-6 theme-text-muted">
              Understand pronunciation, verbs, cases and sentence structure.
            </div>
          </Link>

          <Link href="/polish-vocabulary" className={`${softCard} block p-5`}>
            <div className="text-lg font-bold theme-accent-text">
              Polish vocabulary
            </div>

            <div className="mt-2 text-sm leading-6 theme-text-muted">
              Explore useful Polish words organised by everyday topic.
            </div>
          </Link>

          <Link
            href="/polish-words-with-audio"
            className={`${softCard} block p-5`}
          >
            <div className="text-lg font-bold theme-accent-text">
              Polish words with audio
            </div>

            <div className="mt-2 text-sm leading-6 theme-text-muted">
              Hear Polish sounds and practise pronunciation more effectively.
            </div>
          </Link>

          <Link
            href="/polish-for-beginners"
            className={`${softCard} block p-5`}
          >
            <div className="text-lg font-bold theme-accent-text">
              Beginner roadmap
            </div>

            <div className="mt-2 text-sm leading-6 theme-text-muted">
              See what to study first during your first weeks of Polish.
            </div>
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6 sm:p-8`}>
        <div className="text-sm font-bold uppercase tracking-widest theme-accent-text">
          Frequently asked questions
        </div>

        <h2 className="text-3xl font-extrabold theme-text">
          Learning Polish with Flunio
        </h2>

        <div className="space-y-4">
          {FAQ.map((item) => (
            <article key={item.q} className={`${softCard} p-5`}>
              <h3 className="text-lg font-bold theme-text">{item.q}</h3>

              <p className="mt-2 leading-7 theme-text-muted">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flunio-card relative overflow-hidden rounded-3xl px-6 py-10 text-center sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="relative mx-auto max-w-3xl space-y-5">
          <div className="theme-pill inline-flex rounded-full px-4 py-2 text-sm font-semibold">
            Start Polish without a subscription
          </div>

          <h2 className="text-3xl font-extrabold theme-text sm:text-4xl">
            Open your first Polish lesson
          </h2>

          <p className="text-lg leading-8 theme-text-muted">
            Learn your first Polish words, hear their pronunciation and complete
            the exercises. The complete A0 level is free.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/learning/a0-1" className={primaryButton}>
              Start Polish A0 lesson 1
            </Link>

            <Link href="/learning" className={secondaryButton}>
              Explore all levels
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}