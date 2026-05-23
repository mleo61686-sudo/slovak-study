import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Czech for Beginners: Learn Czech from Zero | Flunio",
  description:
    "Czech for beginners: learn what to study first, how to start from zero, first Czech words, pronunciation basics, grammar order and a simple 30-day learning plan.",

  alternates: {
    canonical: `${SITE_URL}/czech-for-beginners`,
  },

  openGraph: {
    title: "Czech for Beginners: Learn Czech from Zero | Flunio",
    description:
      "A beginner roadmap for learning Czech: first words, pronunciation, grammar order, common mistakes and daily practice.",
    url: `${SITE_URL}/czech-for-beginners`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "What should I learn first in Czech as a beginner?",
    a: "Start with pronunciation, greetings, basic everyday words, simple phrases and the most common verbs. After that, learn basic sentence structure and only then move deeper into cases and grammar.",
  },
  {
    q: "Can I learn Czech from zero online?",
    a: "Yes. You can start Czech from zero online if you follow a structured path, practice a small amount every day, listen to pronunciation and review vocabulary regularly.",
  },
  {
    q: "Is Czech hard for beginners?",
    a: "Czech can be difficult at first because of pronunciation, cases and word endings. But it becomes easier when you learn in small steps instead of trying to memorize everything at once.",
  },
  {
    q: "How many Czech words should a beginner learn first?",
    a: "A good first goal is 100 useful Czech words: greetings, people, home, food, transport, work, time, numbers and common verbs.",
  },
  {
    q: "How long should I study Czech every day?",
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
        id="faq-schema-czech-for-beginners"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-4">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Flunio · Czech beginner roadmap
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight theme-text sm:text-4xl">
            Czech for beginners — what to learn first if you start from zero
          </h1>

          <p className="theme-text-muted">
            Learning Czech as a beginner can feel confusing because there are
            many things at once: pronunciation, new letters, cases, verbs and
            word endings. The best way to start is not to memorize everything
            randomly, but to follow a clear beginner roadmap.
          </p>

          <p className="theme-text-muted">
            This page explains what to learn first, how to organize your first 7
            and 30 days, which Czech words matter most at the beginning and when
            grammar should enter your study routine.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/learning" className={primaryButton}>
              Start Czech lessons
            </Link>

            {[
              ["Full Czech course", "/learn-czech"],
              ["Czech vocabulary", "/czech-vocabulary"],
              ["Czech grammar", "/czech-grammar"],
              ["Czech audio", "/czech-words-with-audio"],
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
            "Before learning many words, get used to Czech pronunciation. Listen to words with č, š, ž, ř, ě and long vowels so Czech starts to sound less strange.",
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
            "Czech grammar is important, but beginners should learn it in order: sentence structure, verbs, gender, cases and common endings.",
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
          The best Czech learning order for beginners
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
              "Learn how Czech letters sound, especially č, š, ž, ř, ě, á, é, í, ó, ú and ý. You do not need perfect pronunciation at the start, but you should hear the difference between sounds.",
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
              "Focus on common verbs such as být, mít, dělat, jít, chtít, potřebovat, mluvit and rozumět. Verbs help you create real sentences.",
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
          First 7 days of learning Czech
        </h2>

        <p className="theme-text-muted">
          The first week should help you feel that Czech is possible. Your goal
          is not to master grammar, but to create a small daily habit and
          understand the basic sound of the language.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [
              "Day 1",
              "Listen to Czech pronunciation and learn basic greetings: ahoj, dobrý den, prosím, děkuji.",
            ],
            [
              "Day 2",
              "Learn people and basic identity words: já, ty, člověk, žena, muž, dítě, rodina.",
            ],
            [
              "Day 3",
              "Learn home and daily objects: dům, byt, pokoj, stůl, voda, jídlo.",
            ],
            [
              "Day 4",
              "Learn city and transport words: město, ulice, zastávka, autobus, vlak.",
            ],
            [
              "Day 5",
              "Learn first verbs: být, mít, dělat, jít, chtít, potřebovat.",
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
          First 30 days: simple Czech study plan
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
              "Start learning gender, present tense and the idea of Czech cases without trying to memorize everything.",
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
          First 100 Czech words to learn
        </h2>

        <p className="theme-text-muted">
          Your first 100 Czech words should not be random. Choose words that
          appear in daily life and help you understand basic sentences.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [
              "People and family",
              "já, ty, on, ona, člověk, žena, muž, dítě, rodina, kamarád.",
            ],
            [
              "Home and city",
              "dům, byt, pokoj, stůl, dveře, město, ulice, obchod, škola.",
            ],
            [
              "Food and daily life",
              "voda, jídlo, chléb, káva, čaj, ráno, den, večer, práce.",
            ],
            [
              "Transport and movement",
              "autobus, vlak, auto, zastávka, cesta, jít, jet, přijít.",
            ],
            [
              "Basic verbs",
              "být, mít, dělat, chtít, potřebovat, mluvit, rozumět, vědět.",
            ],
            [
              "Useful phrases",
              "dobrý den, ahoj, děkuji, prosím, promiňte, nerozumím.",
            ],
          ].map(([title, text]) => (
            <div key={title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/czech-vocabulary" className={secondaryButton}>
            Open Czech vocabulary →
          </Link>
          <Link href="/dictionary" className={secondaryButton}>
            Search in dictionary →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Czech pronunciation basics for beginners
        </h2>

        <p className="theme-text-muted">
          Czech pronunciation is one of the first challenges for beginners. You
          do not need to sound perfect immediately, but you should listen often
          and repeat words aloud from the beginning.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            [
              "Special letters",
              "Pay attention to č, š, ž, ř, ě and long vowels like á, é, í, ú.",
            ],
            [
              "Long vowels",
              "Long and short vowels can change how natural a word sounds.",
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

        <Link href="/czech-words-with-audio" className={secondaryButton}>
          Practice Czech words with audio →
        </Link>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Common Czech beginner mistakes
        </h2>

        <div className="grid gap-4">
          {[
            [
              "Trying to learn all cases immediately",
              "Czech cases are important, but beginners should first understand the idea and learn common examples. Full tables can come later.",
            ],
            [
              "Memorizing words without audio",
              "If you only read Czech words, pronunciation may become harder later. Listen and repeat from the first lessons.",
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
            ["Start the Czech course", "/learn-czech"],
            ["Go to A0 lessons", "/learning/a0-1"],
            ["Czech grammar guide", "/czech-grammar"],
            ["Czech vocabulary", "/czech-vocabulary"],
            ["Audio practice", "/czech-words-with-audio"],
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