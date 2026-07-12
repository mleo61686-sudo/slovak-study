import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Learn Slovak Online: Slovak for Beginners A0–B2 | Flunio",
  description:
    "Learn Slovak online from zero with Flunio: Slovak for beginners, A0 lessons, pronunciation, vocabulary, grammar, phrases and practical exercises.",

  alternates: {
    canonical: `${SITE_URL}/learn-slovak`,
    languages: {
      en: `${SITE_URL}/learn-slovak`,
      ru: `${SITE_URL}/ru/learn-slovak`,
      uk: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
      "x-default": `${SITE_URL}/learn-slovak`,
    },
  },

  openGraph: {
    title: "Learn Slovak Online: Slovak for Beginners | Flunio",
    description:
      "Start Slovak from zero with short interactive lessons, pronunciation, vocabulary, grammar and practical exercises. Complete A0 for free.",
    url: `${SITE_URL}/learn-slovak`,
    siteName: "Flunio",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Learn Slovak Online: Slovak for Beginners | Flunio",
    description:
      "Interactive Slovak lessons with vocabulary, pronunciation and exercises. Start A0 for free.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

type RoadmapStep = {
  title: string;
  text: string;
};

type ExamplePhrase = {
  sk: string;
  en: string;
  note: string;
};

const FAQ = [
  {
    q: "Can I learn Slovak online as a complete beginner?",
    a: "Yes. Flunio starts with Slovak A0, so you can begin from zero. You learn basic words, pronunciation, short phrases and simple exercises step by step.",
  },
  {
    q: "Is Slovak hard to learn?",
    a: "Slovak can feel difficult because of cases, endings and pronunciation, but it becomes much easier when you learn useful words first and study grammar through examples.",
  },
  {
    q: "How should I learn Slovak as a beginner?",
    a: "Start with pronunciation, greetings, everyday vocabulary and simple sentence patterns. Then add grammar gradually through examples and regular practice.",
  },
  {
    q: "Can I start learning Slovak for free?",
    a: "Yes. The complete A0 level is available for free. You can start from the first lesson, learn essential words and complete interactive exercises without buying Premium.",
  },
  {
    q: "What does Flunio Premium unlock?",
    a: "Premium unlocks Slovak levels A1, A2, B1 and B2, together with premium practice and review features. One Premium subscription also covers all active Flunio language courses.",
  },
  {
    q: "Is the course useful for living and working in Slovakia?",
    a: "Yes. Lessons include practical vocabulary for everyday communication, work, shopping, transport, health, housing and other situations you may encounter in Slovakia.",
  },
  {
    q: "How long does one Slovak lesson take?",
    a: "Most lessons are designed for a short study session. You learn a small group of words and immediately practise them through several exercise types.",
  },
];

const FREE_FEATURES = [
  "Complete Slovak A0 level",
  "Lessons unlocked step by step",
  "Vocabulary with pronunciation",
  "Interactive exercises",
  "Free grammar explanations",
  "Free Slovak dictionary",
];

const PREMIUM_FEATURES = [
  "Slovak levels A1, A2, B1 and B2",
  "Premium practice and word review",
  "Access to every active Flunio course",
  "Continue beyond the beginner level",
];

const LESSON_STEPS = [
  {
    number: "01",
    title: "Learn useful Slovak words",
    text: "Each lesson introduces a focused group of Slovak words instead of overwhelming you with a large random list.",
  },
  {
    number: "02",
    title: "Listen to pronunciation",
    text: "Hear the Slovak word and become familiar with sounds such as č, š, ž, ľ and ô.",
  },
  {
    number: "03",
    title: "Complete exercises",
    text: "Choose translations, recognise Slovak words, type answers, listen, match words and build sentences.",
  },
  {
    number: "04",
    title: "Unlock the next lesson",
    text: "A0 lessons open sequentially, so you always have a clear next step and never need to choose from a confusing list.",
  },
];

const BEGINNER_ROADMAP: RoadmapStep[] = [
  {
    title: "Start with Slovak pronunciation",
    text: "Learn how Slovak letters sound before you memorize many words. Pay attention to č, š, ž, ľ, ä, ô and long vowels.",
  },
  {
    title: "Learn basic Slovak words",
    text: "Begin with greetings, family, food, home, shopping, transport and work vocabulary. These words are useful immediately.",
  },
  {
    title: "Use short Slovak phrases",
    text: "Do not learn only isolated words. Connect them with simple phrases like I have, I want, I need, where is and how much is it.",
  },
  {
    title: "Add grammar gradually",
    text: "Slovak grammar is easier after you already know examples. Learn cases, verbs and endings step by step, not all at once.",
  },
];

const EXAMPLE_WORDS = [
  {
    sk: "dom",
    en: "house",
  },
  {
    sk: "práca",
    en: "work",
  },
  {
    sk: "obchod",
    en: "shop",
  },
  {
    sk: "rodina",
    en: "family",
  },
  {
    sk: "zdravie",
    en: "health",
  },
  {
    sk: "cestovať",
    en: "to travel",
  },
];

const EXAMPLE_PHRASES: ExamplePhrase[] = [
  {
    sk: "Dobrý deň",
    en: "Good day / Hello",
    note: "polite greeting",
  },
  {
    sk: "Ako sa máš?",
    en: "How are you?",
    note: "basic conversation",
  },
  {
    sk: "Nerozumiem",
    en: "I do not understand",
    note: "useful beginner phrase",
  },
  {
    sk: "Prosím vás",
    en: "Please / Excuse me",
    note: "polite expression",
  },
  {
    sk: "Kde je obchod?",
    en: "Where is the shop?",
    note: "city and shopping",
  },
  {
    sk: "Chcem vodu",
    en: "I want water",
    note: "simple sentence",
  },
];

const TOPICS = [
  "Introductions",
  "Family",
  "Home",
  "Shopping",
  "Food",
  "Transport",
  "Work",
  "Health",
  "Weather",
  "Daily activities",
  "Documents",
  "Communication",
];

const card = "flunio-card rounded-3xl";

const softCard = "theme-home-soft-card rounded-2xl";

const primaryButton =
  "theme-primary-button inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-center font-bold";

const secondaryButton =
  "theme-secondary-button inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 text-center font-semibold";

const secondaryBlock =
  "theme-secondary-button rounded-2xl p-4 font-semibold transition hover:-translate-y-0.5 active:translate-y-0";

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
    name: "Learn Slovak Online from A0 to B2",
    description:
      "An interactive online Slovak course with structured lessons, vocabulary, pronunciation and exercises from A0 to B2.",
    provider: {
      "@type": "Organization",
      name: "Flunio",
      url: SITE_URL,
    },
    url: `${SITE_URL}/learn-slovak`,
    inLanguage: "en",
    educationalLevel: "A0–B2",
    isAccessibleForFree: true,
  };

  return (
    <main className="mx-auto max-w-6xl space-y-12 px-4 py-8 theme-text sm:py-12">
      <Script
        id="faq-schema-slovak-en"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="course-schema-slovak-en"
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
              🇸🇰 Slovak for beginners · A0 is free
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight theme-text sm:text-5xl">
                Learn Slovak online from zero with short daily lessons
              </h1>

              <p className="max-w-2xl text-lg leading-8 theme-text-muted">
                Start Slovak as a beginner with practical vocabulary,
                pronunciation, simple phrases and interactive exercises. Flunio
                gives you a clear path from A0 to more advanced Slovak.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/learning/a0-1" className={primaryButton}>
                Start Slovak A0 for free
              </Link>

              <Link href="/learning" className={secondaryButton}>
                View all course levels
              </Link>
            </div>

            <div className="grid gap-2 text-sm theme-text-muted sm:grid-cols-3">
              <div>✓ No payment for A0</div>
              <div>✓ Learn at your own pace</div>
              <div>✓ Works on phone and desktop</div>
            </div>
          </div>

          <div className={`${softCard} relative overflow-hidden p-5 sm:p-6`}>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest theme-accent-text">
                  Example lesson
                </div>

                <div className="mt-1 text-xl font-bold theme-text">
                  Slovak A0
                </div>
              </div>

              <div className="theme-pill rounded-full px-3 py-1 text-xs font-semibold">
                10 words
              </div>
            </div>

            <div className="space-y-3">
              {EXAMPLE_WORDS.slice(0, 4).map((word, index) => (
                <div
                  key={word.sk}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold theme-accent-text">
                      {index + 1}
                    </div>

                    <div>
                      <div className="font-bold theme-text">{word.sk}</div>
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
              Learn words, then practise them immediately.
            </div>
          </div>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6 sm:p-8`}>
        <div className="text-sm font-bold uppercase tracking-widest theme-accent-text">
          Slovak for beginners
        </div>

        <h2 className="text-3xl font-extrabold theme-text">
          How to learn Slovak step by step
        </h2>

        <p className="max-w-3xl leading-7 theme-text-muted">
          If you want to learn Slovak language from zero, do not begin with long
          grammar tables. Start with sounds, useful words and short phrases.
          Then add grammar gradually when the examples already feel familiar.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {BEGINNER_ROADMAP.map((step) => (
            <article key={step.title} className={`${softCard} p-5`}>
              <h3 className="text-lg font-bold theme-text">{step.title}</h3>
              <p className="mt-2 leading-7 theme-text-muted">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6 sm:p-8`}>
        <div className="text-sm font-bold uppercase tracking-widest theme-accent-text">
          Is Slovak hard to learn?
        </div>

        <h2 className="text-3xl font-extrabold theme-text">
          Slovak feels easier when you learn it through examples
        </h2>

        <p className="leading-7 theme-text-muted">
          Slovak can be challenging for beginners because it has cases, word
          endings, verb forms and sounds that may be new to you. But it is not
          impossible. The biggest mistake is trying to learn everything at once.
        </p>

        <p className="leading-7 theme-text-muted">
          A better approach is to learn practical words first, listen to
          pronunciation, use short sentences and then understand grammar step by
          step. This is exactly how Flunio structures the Slovak A0 course.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "Pronunciation",
              text: "č, š, ž, ľ, ô and long vowels need listening practice.",
            },
            {
              title: "Cases",
              text: "Endings are easier when you meet them in real phrases.",
            },
            {
              title: "Verbs",
              text: "Start with common verbs before studying complex patterns.",
            },
          ].map((item) => (
            <div key={item.title} className={`${softCard} p-4`}>
              <h3 className="font-bold theme-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 theme-text-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <div className="text-sm font-bold uppercase tracking-widest theme-accent-text">
            How Flunio works
          </div>

          <h2 className="text-3xl font-extrabold theme-text">
            One clear path from your first word to real Slovak
          </h2>

          <p className="theme-text-muted">
            You do not need to combine random videos, word lists and unrelated
            grammar pages. Flunio gives you a structured Slovak language
            learning sequence.
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
              Inside every lesson
            </div>

            <h2 className="text-3xl font-extrabold theme-text">
              Do more than just read translations
            </h2>

            <p className="leading-7 theme-text-muted">
              Flunio turns Slovak vocabulary into active practice. You
              repeatedly see, hear, recognise and use every word before
              completing the lesson.
            </p>

            <Link href="/learning/a0-1" className={primaryButton}>
              Try the first lesson
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Choose the translation",
              "Choose the Slovak word",
              "Write the correct word",
              "Recognise the word by audio",
              "Match words and translations",
              "Build a Slovak sentence",
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
            Start with the complete Slovak A0 level
          </h2>

          <p className="mt-3 leading-7 theme-text-muted">
            Learn the foundations of Slovak without a subscription. A0 lessons
            unlock sequentially, helping you progress in the correct order.
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
            Start free A0
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
              Continue from A1 to B2
            </h2>

            <p className="mt-3 leading-7 theme-text-muted">
              When you are ready to move beyond the foundations, Premium unlocks
              every advanced Slovak level and the complete Flunio course library.
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
            Practical Slovak vocabulary
          </div>

          <h2 className="text-3xl font-extrabold theme-text">
            Learn Slovak words you can actually use
          </h2>

          <p className="leading-7 theme-text-muted">
            The course covers vocabulary for everyday situations instead of
            focusing only on abstract grammar or rare textbook words.
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
            <div key={word.sk} className={`${softCard} p-4`}>
              <div className="text-lg font-bold theme-accent-text">
                {word.sk}
              </div>

              <div className="mt-1 theme-text-muted">{word.en}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-5 p-6 sm:p-8`}>
        <div className="text-sm font-bold uppercase tracking-widest theme-accent-text">
          Basic Slovak phrases
        </div>

        <h2 className="text-3xl font-extrabold theme-text">
          Useful Slovak phrases for beginners
        </h2>

        <p className="max-w-3xl leading-7 theme-text-muted">
          Beginner Slovak becomes easier when you connect words with short
          phrases. These examples help you understand how simple Slovak
          sentences work.
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          {EXAMPLE_PHRASES.map((phrase) => (
            <article key={phrase.sk} className={`${softCard} p-4`}>
              <h3 className="text-lg font-bold theme-text">{phrase.sk}</h3>
              <p className="mt-1 theme-text-muted">{phrase.en}</p>
              <p className="mt-2 text-sm font-semibold theme-accent-text">
                {phrase.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Living in Slovakia",
            text: "Learn vocabulary for housing, shopping, healthcare, transport, documents and everyday conversations.",
          },
          {
            title: "Working in Slovakia",
            text: "Build the basic vocabulary needed to understand instructions, speak with colleagues and handle common work situations.",
          },
          {
            title: "Studying or travelling",
            text: "Practise useful Slovak for introductions, directions, food, accommodation and communication with local people.",
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
            More free Slovak resources
          </div>

          <h2 className="text-3xl font-extrabold theme-text">
            Use lessons together with grammar and the dictionary
          </h2>

          <p className="max-w-3xl leading-7 theme-text-muted">
            Lessons give you the learning path. Grammar explanations help when
            you need to understand a rule, while the dictionary lets you search
            and review individual words.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/slovak-grammar" className={`${softCard} block p-5`}>
            <div className="text-lg font-bold theme-accent-text">
              Slovak grammar
            </div>

            <div className="mt-2 text-sm leading-6 theme-text-muted">
              Clear explanations of pronunciation, verbs, cases and sentence
              structure.
            </div>
          </Link>

          <Link href="/dictionary" className={`${softCard} block p-5`}>
            <div className="text-lg font-bold theme-accent-text">
              Slovak dictionary
            </div>

            <div className="mt-2 text-sm leading-6 theme-text-muted">
              Search Slovak words, translations and available pronunciation.
            </div>
          </Link>

          <Link
            href="/slovak-for-beginners"
            className={`${softCard} block p-5`}
          >
            <div className="text-lg font-bold theme-accent-text">
              Beginner roadmap
            </div>

            <div className="mt-2 text-sm leading-6 theme-text-muted">
              See what to learn first and how to organise your first weeks of
              Slovak study.
            </div>
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-5 p-6 sm:p-8`}>
        <div className="text-sm font-bold uppercase tracking-widest theme-accent-text">
          Frequently asked questions
        </div>

        <h2 className="text-3xl font-extrabold theme-text">
          Learning Slovak with Flunio
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
            Your first Slovak lesson is free
          </div>

          <h2 className="text-3xl font-extrabold theme-text sm:text-4xl">
            Start learning Slovak now
          </h2>

          <p className="text-lg leading-8 theme-text-muted">
            Open the first A0 lesson, learn your first words and complete the
            exercises. No subscription is required to finish the A0 level.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/learning/a0-1" className={primaryButton}>
              Start A0 lesson 1
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