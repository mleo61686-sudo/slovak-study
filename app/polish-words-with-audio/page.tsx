import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Polish Words with Audio: Listen and Learn Vocabulary | Flunio",
  description:
    "Learn Polish words with audio in Flunio. Listen to pronunciation, practice basic vocabulary, repeat words and build your Polish step by step.",

  alternates: {
    canonical: `${SITE_URL}/polish-words-with-audio`,
  },

  openGraph: {
    title: "Polish Words with Audio | Flunio",
    description:
      "Listen to Polish words, learn pronunciation and practice useful vocabulary with Flunio lessons.",
    url: `${SITE_URL}/polish-words-with-audio`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Can I learn Polish words with audio in Flunio?",
    a: "Yes. Flunio includes Polish vocabulary lessons with audio so you can listen to pronunciation, repeat words and practice them in exercises.",
  },
  {
    q: "Why is audio important when learning Polish words?",
    a: "Audio helps you connect spelling with pronunciation. This is important in Polish because learners need to hear sounds such as sz, cz, rz, ą, ę, ł and ń.",
  },
  {
    q: "Should beginners learn Polish vocabulary with audio?",
    a: "Yes. Beginners should listen to words from the start because pronunciation habits are easier to build early than to fix later.",
  },
  {
    q: "How many Polish words should I learn per day?",
    a: "A good starting point is 10–20 words per day with audio, repetition and short practice exercises.",
  },
];

const audioTopics = [
  {
    title: "Everyday Polish words",
    text: "Start with simple words for people, home, food, transport, time and daily situations. These words appear often and are useful in real conversations.",
    examples: ["dom", "woda", "miasto", "praca", "czas"],
  },
  {
    title: "Polish pronunciation practice",
    text: "Listening helps you notice sounds that are difficult to guess from spelling alone, especially sz, cz, rz, ą, ę, ł and ń.",
    examples: ["szkoła", "człowiek", "żona", "rzeka", "dziękuję"],
  },
  {
    title: "Words and short phrases",
    text: "Vocabulary becomes stronger when you hear words inside short phrases. This helps you remember meaning, rhythm and natural usage.",
    examples: ["Dzień dobry", "Dziękuję", "Jestem w domu", "Mam czas"],
  },
];

const card = "flunio-card rounded-3xl";
const softCard = "theme-home-soft-card rounded-2xl";
const primaryButton =
  "theme-primary-button inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0";
const secondaryButton =
  "theme-secondary-button inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0";
const secondaryBlock =
  "theme-secondary-button rounded-2xl p-4 font-semibold transition hover:-translate-y-0.5 active:translate-y-0";

const wordPill =
  "rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-bold theme-text shadow-sm theme-simple:border-slate-300 theme-simple:bg-slate-100 theme-simple:text-slate-950";

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
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 theme-text">
      <Script
        id="faq-schema-polish-words-with-audio"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={`${card} space-y-4 p-8`}>
        <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
          Polish words with audio
        </h1>

        <p className="theme-text-muted">
          Learning Polish words is much easier when you can hear them. Audio
          helps you connect written vocabulary with real pronunciation, repeat
          words correctly and remember them better. In Flunio, you can learn
          Polish vocabulary through short lessons, audio and practice exercises.
        </p>

        <p className="theme-text-muted">
          This page is for beginners who want to build Polish vocabulary with
          pronunciation from the start. You can begin with basic A0–A1 words,
          listen to them, repeat them aloud and then review them in exercises.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learning/a0-1" className={primaryButton}>
            Start Polish lessons →
          </Link>

          <Link href="/polish-vocabulary" className={secondaryButton}>
            Polish vocabulary
          </Link>

          <Link href="/learn-polish" className={secondaryButton}>
            Learn Polish online
          </Link>

          <Link href="/practice" className={secondaryButton}>
            Practice words
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {audioTopics.map((topic) => (
          <div key={topic.title} className={`${card} p-5`}>
            <h2 className="text-lg font-bold theme-text">{topic.title}</h2>

            <p className="mt-2 text-sm theme-text-muted">{topic.text}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {topic.examples.map((word) => (
                <span key={word} className={wordPill}>
                  {word}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Why learn Polish vocabulary with audio?
        </h2>

        <p className="theme-text-muted">
          Polish pronunciation can be hard to predict from text only. If you only
          read word lists, you may remember the meaning but pronounce words
          incorrectly. Audio gives you a model to copy and helps you build
          listening habits from the beginning.
        </p>

        <ul className="list-disc space-y-2 pl-5 theme-text-muted">
          <li>You hear how Polish words actually sound.</li>
          <li>You notice difficult Polish sounds more easily.</li>
          <li>You can repeat words aloud after listening.</li>
          <li>You connect vocabulary with listening practice.</li>
          <li>You build better pronunciation habits from A0.</li>
        </ul>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Polish sounds beginners should hear early
        </h2>

        <p className="theme-text-muted">
          Some Polish sounds are difficult to understand from text only. Learners
          should hear them many times in real words and short phrases. This is
          especially true for sounds and letters such as sz, cz, rz, ż, ą, ę, ł
          and ń.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Consonant sounds</h3>
            <p className="mt-2 theme-text-muted">
              Words with sz, cz, rz and ż are much easier to learn when you hear
              them instead of only reading them.
            </p>
          </div>

          <div className={`${softCard} p-4`}>
            <h3 className="font-semibold theme-text">Nasal vowels and ł</h3>
            <p className="mt-2 theme-text-muted">
              Polish ą, ę and ł often confuse beginners. Audio helps you connect
              the spelling with the real sound.
            </p>
          </div>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          How to practice Polish words with audio
        </h2>

        <p className="theme-text-muted">
          The best method is simple: listen, repeat, check meaning and review.
          Do not try to memorize too many words at once. A small group of words
          with audio and exercises is more useful than a long list you read only
          once.
        </p>

        <ol className="list-decimal space-y-2 pl-5 theme-text-muted">
          <li>Choose a short Polish lesson.</li>
          <li>Listen to each word carefully.</li>
          <li>Repeat the word aloud after the audio.</li>
          <li>Check the meaning and example usage.</li>
          <li>Complete vocabulary exercises.</li>
          <li>Return to older words later for review.</li>
        </ol>

        <div className="pt-2">
          <Link href="/learning/a0-1" className={primaryButton}>
            Start with the first lesson →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Learn Polish words, then use them
        </h2>

        <p className="theme-text-muted">
          Audio is only one part of learning. After you hear and repeat a Polish
          word, you need to use it in practice. Flunio connects vocabulary with
          lessons, dictionary search and exercises so that words do not stay as
          isolated items in a list.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/polish-vocabulary" className={secondaryBlock}>
            Polish vocabulary →
          </Link>

          <Link href="/polish-grammar" className={secondaryBlock}>
            Polish grammar →
          </Link>

          <Link href="/learn-polish" className={secondaryBlock}>
            Learn Polish online →
          </Link>

          <Link href="/practice" className={secondaryBlock}>
            Practice Polish →
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