import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Learn Polish Online from A0 to B2 | Flunio",
  description:
    "Learn Polish online with structured A0–B2 lessons, vocabulary, grammar, audio pronunciation and exercises. Start Polish from scratch and build daily practice.",

  alternates: {
    canonical: `${SITE_URL}/learn-polish`,
  },

  openGraph: {
    title: "Learn Polish Online from A0 to B2 | Flunio",
    description:
      "Study Polish step by step with short lessons, vocabulary, grammar, audio and practice exercises.",
    url: `${SITE_URL}/learn-polish`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Can I learn Polish online from scratch?",
    a: "Yes. Flunio is designed for beginners, so you can start with A0 lessons, learn basic Polish words, listen to pronunciation and practice step by step.",
  },
  {
    q: "How much time should I study Polish every day?",
    a: "About 10–20 minutes a day is enough to build a steady habit. Short daily practice usually works better than long but irregular study sessions.",
  },
  {
    q: "What is included in the Polish course?",
    a: "The course includes structured lessons, vocabulary, grammar pages, audio pronunciation, dictionary search and exercises for review and practice.",
  },
  {
    q: "Is Polish difficult to learn?",
    a: "Polish can feel challenging because of pronunciation, cases and verb forms, but it becomes easier when you learn gradually with examples and regular practice.",
  },
  {
    q: "Is this course useful for life or work in Poland?",
    a: "Yes. Flunio focuses on practical vocabulary and everyday topics that are useful for work, study, documents, travel and daily communication.",
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
        id="faq-schema-polish-en"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-4">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Flunio · Polish course
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight theme-text sm:text-4xl">
            Learn Polish online — structured course from A0 to B2
          </h1>

          <p className="theme-text-muted">
            Flunio helps you learn Polish online in a structured and practical
            way. Instead of jumping between random word lists, videos and grammar
            explanations, you can follow short lessons, practice vocabulary,
            listen to pronunciation and build your Polish step by step.
          </p>

          <p className="theme-text-muted">
            The Polish course is useful for learners who want to start from
            scratch, improve everyday communication or prepare for life, work,
            study or travel in Poland.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/learning" className={primaryButton}>
              Start learning Polish
            </Link>

            {[
              ["Start with A0 →", "/learning/a0-1"],
              ["Polish dictionary", "/dictionary"],
              ["Polish grammar", "/grammar"],
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
            "1) Polish lessons by level",
            "Lessons are organized from A0 to B2, so you always know what to learn next. This helps you avoid chaos and build Polish vocabulary and grammar in a logical order.",
          ],
          [
            "2) Short daily practice",
            "Each lesson is short enough for daily learning. You can study for 10–20 minutes, complete exercises and return the next day without feeling overloaded.",
          ],
          [
            "3) Audio pronunciation",
            "Polish pronunciation can be difficult at first. Audio helps you hear how words and phrases sound, repeat them aloud and improve your listening skills.",
          ],
          [
            "4) Vocabulary and grammar together",
            "Flunio combines vocabulary, grammar, dictionary search and practice exercises, so you can learn words and understand how to use them in real sentences.",
          ],
        ].map(([title, text]) => (
          <div key={title} className={`${card} p-5`}>
            <h2 className="text-lg font-bold theme-accent-text">{title}</h2>
            <p className="mt-2 theme-text-muted">{text}</p>
          </div>
        ))}
      </section>

      {[
        {
          title: "How to start learning Polish online",
          body: (
            <>
              <p>
                If you are a beginner, the best way to start is not to memorize
                long grammar rules immediately. First, build a base: common
                words, simple phrases, pronunciation and basic sentence patterns.
              </p>

              <ol className="list-decimal space-y-2 pl-5">
                <li>Start with A0 if you are learning Polish from scratch.</li>
                <li>Learn a small group of useful words in each lesson.</li>
                <li>Listen to the audio and repeat words aloud.</li>
                <li>Complete exercises right after the lesson.</li>
                <li>Use the dictionary when you want to search or review words.</li>
                <li>Open grammar pages when you need a clear explanation.</li>
                <li>Move to A1, A2, B1 and B2 gradually.</li>
              </ol>

              <Link href="/learning/a0-1" className={primaryButton}>
                Go to A0 lessons →
              </Link>
            </>
          ),
        },
        {
          title: "Learn Polish vocabulary for real situations",
          body: (
            <p>
              A good Polish course should not only teach isolated words. You need
              vocabulary for real situations: introducing yourself, shopping,
              using transport, talking about work, handling documents and daily
              communication.
            </p>
          ),
        },
        {
          title: "Use grammar when it actually helps",
          body: (
            <>
              <p>
                Grammar is important, but it should support your learning instead
                of blocking it. With Flunio, you can first learn useful words and
                phrases, then open grammar topics when you want to understand why
                a sentence is built in a certain way.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  ["Open grammar topics", "/grammar"],
                  ["Search vocabulary", "/dictionary"],
                  ["Practice exercises", "/practice"],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className={secondaryButton}>
                    {label}
                  </Link>
                ))}
              </div>
            </>
          ),
        },
        {
          title: "Who this Polish course is for",
          body: (
            <>
              <p>
                Flunio is a good option for learners who want a simple,
                structured and practical way to study Polish online without
                overload.
              </p>
              <p>
                The course can also help if you need Polish for everyday life in
                Poland, work communication, study, documents, travel or basic
                conversations.
              </p>
            </>
          ),
        },
      ].map((section) => (
        <section key={section.title} className={`${card} space-y-4 p-6`}>
          <h2 className="text-2xl font-bold theme-text">{section.title}</h2>
          <div className="space-y-4 theme-text-muted">{section.body}</div>
        </section>
      ))}

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          What makes Polish challenging for beginners?
        </h2>

        <p className="theme-text-muted">
          Polish is a Slavic language with rich grammar and pronunciation that
          can feel unusual at first. Learners often notice special sounds,
          changing word endings, verb forms and cases.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            [
              "Pronunciation",
              "Polish has sounds and letter combinations such as sz, cz, rz, ż, ś, ć and ł.",
            ],
            [
              "Cases",
              "Nouns and adjectives change depending on their role in a sentence.",
            ],
            ["Verb forms", "Polish verbs change by person, tense and meaning."],
          ].map(([title, text]) => (
            <div key={title} className={`${softCard} p-4`}>
              <h3 className="font-semibold theme-accent-text">{title}</h3>
              <p className="mt-2 text-sm theme-text-muted">{text}</p>
            </div>
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