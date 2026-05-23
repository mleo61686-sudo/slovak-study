import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Polish for Beginners: Learn Polish from Zero | Flunio",
  description:
    "Polish for beginners: learn what to study first, how to start from zero, first Polish words, pronunciation basics, grammar order and a simple 30-day learning plan.",

  alternates: {
    canonical: `${SITE_URL}/polish-for-beginners`,
  },

  openGraph: {
    title: "Polish for Beginners: Learn Polish from Zero | Flunio",
    description:
      "A beginner roadmap for learning Polish: first words, pronunciation, grammar order, common mistakes and daily practice.",
    url: `${SITE_URL}/polish-for-beginners`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "What should I learn first in Polish as a beginner?",
    a: "Start with pronunciation, greetings, basic everyday words, simple phrases and the most common verbs. After that, learn basic sentence structure and gradually move into cases and grammar.",
  },
  {
    q: "Can I learn Polish from zero online?",
    a: "Yes. You can start Polish from zero online if you follow a structured path, practice a small amount every day, listen to pronunciation and review vocabulary regularly.",
  },
  {
    q: "Is Polish hard for beginners?",
    a: "Polish can be difficult at first because of pronunciation, cases and word endings. But it becomes easier when you learn in small steps instead of trying to memorize everything at once.",
  },
  {
    q: "How many Polish words should a beginner learn first?",
    a: "A good first goal is 100 useful Polish words: greetings, people, home, food, transport, work, time, numbers and common verbs.",
  },
  {
    q: "How long should I study Polish every day?",
    a: "For beginners, 10–20 minutes a day is enough to build a habit. Short daily practice is usually better than long irregular study sessions.",
  },
];

const card = "flunio-card rounded-3xl";

const softCard = "theme-home-soft-card rounded-2xl";

const primaryButton =
  "theme-primary-button rounded-xl px-4 py-2 font-semibold";

const secondaryButton =
  "theme-secondary-button rounded-xl px-4 py-2 font-semibold";

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
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-10 theme-text">
      <Script
        id="faq-schema-polish-for-beginners"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-4">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Flunio · Polish beginner roadmap
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight theme-text sm:text-4xl">
            Polish for beginners — what to learn first if you start from zero
          </h1>

          <p className="theme-text-muted">
            Learning Polish as a beginner can feel overwhelming because there
            are many things at once: pronunciation, new letters, cases, verbs
            and word endings. The best way to start is not to memorize random
            grammar tables, but to follow a clear beginner roadmap.
          </p>

          <p className="theme-text-muted">
            This page explains what to learn first, how to organize your first 7
            and 30 days, which Polish words matter most at the beginning and
            when grammar should enter your study routine.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/learning" className={primaryButton}>
              Start Polish lessons
            </Link>

            {[
              ["Full Polish course", "/learn-polish"],
              ["Polish vocabulary", "/polish-vocabulary"],
              ["Polish grammar", "/polish-grammar"],
              ["Polish audio", "/polish-words-with-audio"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className={secondaryButton}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {[
          [
            "1) Start with sounds",
            "Before learning many words, get used to Polish pronunciation. Listen to words with ą, ę, ł, ś, ź, ż, cz, sz and rz so Polish starts to sound less strange.",
          ],
          [
            "2) Learn useful words first",
            "Begin with words you can use in daily life: people, home, food, transport, work, time, questions and basic verbs.",
          ],
          [
            "3) Build simple phrases",
            "Do not wait until you know all grammar. Start making short phrases: I am, I have, I need, where is, how much, I want.",
          ],
          [
            "4) Add grammar gradually",
            "Polish grammar is important, but beginners should learn it in order: sentence structure, verbs, gender, cases and common endings.",
          ],
        ].map(([title, text]) => (
          <div key={title} className={`${card} p-5`}>
            <h2 className="text-lg font-bold theme-accent-text">{title}</h2>
            <p className="mt-2 theme-text-muted">{text}</p>
          </div>
        ))}
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          The best Polish learning order for beginners
        </h2>

        <p className="theme-text-muted">
          A beginner should not start with the hardest grammar table. A better
          order is to build a practical base first and then connect grammar to
          words and phrases you already know.
        </p>

        <div className="grid gap-4">
          {[
            [
              "Step 1: Pronunciation and alphabet",
              "Learn how Polish letters and sounds work, especially ą, ę, ł, ś, ź, ż, cz, sz and rz. You do not need perfect pronunciation at the start, but you should hear the difference between sounds.",
            ],
            [
              "Step 2: First everyday words",
              "Learn words for greetings, people, home, city, food, work, study, numbers, time and transport. These words appear constantly in beginner conversations.",
            ],
            [
              "Step 3: Simple sentence patterns",
              "Practice short structures like “I am…”, “I have…”, “I want…”, “I need…”, “Where is…?” and “How much is…?”. These phrases make vocabulary useful.",
            ],
            [
              "Step 4: Basic verbs",
              "Focus on common verbs such as być, mieć, robić, iść, chcieć, potrzebować, mówić and rozumieć. Verbs help you create real sentences.",
            ],
            [
              "Step 5: Grammar in small pieces",
              "After you know some words and phrases, start learning gender, present tense, cases and word endings gradually. Grammar is easier when it explains sentences you already use.",
            ],
          ].map(([title, text]) => (
            <div key={title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{title}</h3>
              <p className="mt-2 theme-text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          First 7 days of learning Polish
        </h2>

        <p className="theme-text-muted">
          The first week should help you feel that Polish is possible. Your goal
          is not to master grammar, but to create a small daily habit and
          understand the basic sound of the language.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [
              "Day 1",
              "Listen to Polish pronunciation and learn basic greetings: cześć, dzień dobry, proszę, dziękuję.",
            ],
            [
              "Day 2",
              "Learn people and basic identity words: ja, ty, człowiek, kobieta, mężczyzna, dziecko, rodzina.",
            ],
            [
              "Day 3",
              "Learn home and daily objects: dom, mieszkanie, pokój, stół, woda, jedzenie.",
            ],
            [
              "Day 4",
              "Learn city and transport words: miasto, ulica, przystanek, autobus, pociąg.",
            ],
            [
              "Day 5",
              "Learn first verbs: być, mieć, robić, iść, chcieć, potrzebować.",
            ],
            [
              "Day 6",
              "Build simple phrases with “I am”, “I have”, “I want” and “I need”.",
            ],
            [
              "Day 7",
              "Review all words, listen again and repeat difficult words aloud.",
            ],
          ].map(([title, text]) => (
            <div key={title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{text}</p>
            </div>
          ))}
        </div>

        <Link href="/learning/a0-1" className={primaryButton}>
          Start with A0 lesson 1 →
        </Link>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          First 30 days: simple Polish study plan
        </h2>

        <p className="theme-text-muted">
          After the first week, your goal is to expand vocabulary, repeat often
          and slowly add grammar. The plan should stay simple enough to follow
          every day.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [
              "Week 1: Sounds and first words",
              "Focus on pronunciation, greetings, basic nouns and very simple phrases.",
            ],
            [
              "Week 2: Daily life vocabulary",
              "Learn words for home, food, transport, work, time and everyday actions.",
            ],
            [
              "Week 3: Verbs and short sentences",
              "Practice common verbs and build short sentences with words you already know.",
            ],
            [
              "Week 4: Grammar foundations",
              "Start learning gender, present tense and the idea of Polish cases without trying to memorize everything.",
            ],
          ].map(([title, text]) => (
            <div key={title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          First 100 Polish words to learn
        </h2>

        <p className="theme-text-muted">
          Your first 100 Polish words should not be random. Choose words that
          appear in daily life and help you understand basic sentences.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [
              "People and family",
              "ja, ty, on, ona, człowiek, kobieta, mężczyzna, dziecko, rodzina, przyjaciel.",
            ],
            [
              "Home and city",
              "dom, mieszkanie, pokój, stół, drzwi, miasto, ulica, sklep, szkoła.",
            ],
            [
              "Food and daily life",
              "woda, jedzenie, chleb, kawa, herbata, rano, dzień, wieczór, praca.",
            ],
            [
              "Transport and movement",
              "autobus, pociąg, samochód, przystanek, droga, iść, jechać, przyjść.",
            ],
            [
              "Basic verbs",
              "być, mieć, robić, chcieć, potrzebować, mówić, rozumieć, wiedzieć.",
            ],
            [
              "Useful phrases",
              "dzień dobry, cześć, dziękuję, proszę, przepraszam, nie rozumiem.",
            ],
          ].map(([title, text]) => (
            <div key={title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/polish-vocabulary" className={secondaryButton}>
            Open Polish vocabulary →
          </Link>
          <Link href="/dictionary" className={secondaryButton}>
            Search in dictionary →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Polish pronunciation basics for beginners
        </h2>

        <p className="theme-text-muted">
          Polish pronunciation is one of the first challenges for beginners. You
          do not need to sound perfect immediately, but you should listen often
          and repeat words aloud from the beginning.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            [
              "Special letters",
              "Pay attention to ą, ę, ł, ś, ź, ż and sound groups like cz, sz, rz.",
            ],
            [
              "Nasal vowels",
              "Sounds like ą and ę may feel unusual at first, so listening helps a lot.",
            ],
            [
              "Listen before memorizing",
              "Audio helps you avoid learning words only as written text.",
            ],
          ].map(([title, text]) => (
            <div key={title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{text}</p>
            </div>
          ))}
        </div>

        <Link href="/polish-words-with-audio" className={secondaryButton}>
          Practice Polish words with audio →
        </Link>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Common Polish beginner mistakes
        </h2>

        <div className="grid gap-4">
          {[
            [
              "Trying to learn all cases immediately",
              "Polish cases are important, but beginners should first understand the idea and learn common examples. Full tables can come later.",
            ],
            [
              "Memorizing words without audio",
              "If you only read Polish words, pronunciation may become harder later. Listen and repeat from the first lessons.",
            ],
            [
              "Learning random vocabulary",
              "A beginner needs useful words, not rare words. Focus on daily topics and common verbs first.",
            ],
            [
              "Waiting too long to make sentences",
              "Even with limited vocabulary, you can build simple sentences. This helps words become active, not just passive.",
            ],
          ].map(([title, text]) => (
            <div key={title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{title}</h3>
              <p className="mt-2 theme-text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Where to go after this beginner roadmap
        </h2>

        <p className="theme-text-muted">
          Once you understand what to learn first, the next step is to practice
          consistently. Start with short lessons, review words, use audio and
          open grammar only when it helps you understand a real sentence.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          {[
            ["Start the Polish course", "/learn-polish"],
            ["Go to A0 lessons", "/learning/a0-1"],
            ["Polish grammar guide", "/polish-grammar"],
            ["Polish vocabulary", "/polish-vocabulary"],
            ["Audio practice", "/polish-words-with-audio"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className={secondaryButton}>
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">FAQ</h2>

        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className={`${softCard} p-4`}>
              <div className="font-semibold theme-accent-text">{item.q}</div>
              <div className="mt-2 theme-text-muted">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}