import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Learn Czech Online from A0 to B2 | Flunio",
  description:
    "Learn Czech online with structured A0–B2 lessons, vocabulary, grammar, audio pronunciation and exercises. Start Czech from scratch and build daily practice.",

  alternates: {
    canonical: `${SITE_URL}/learn-czech`,
  },

  openGraph: {
    title: "Learn Czech Online from A0 to B2 | Flunio",
    description:
      "Study Czech step by step with short lessons, vocabulary, grammar, audio and practice exercises.",
    url: `${SITE_URL}/learn-czech`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Can I learn Czech online from scratch?",
    a: "Yes. Flunio is designed for beginners, so you can start with A0 lessons, learn basic Czech words, listen to pronunciation and practice step by step.",
  },
  {
    q: "How much time should I study Czech every day?",
    a: "About 10–20 minutes a day is enough to build a steady habit. Short daily practice usually works better than long but irregular study sessions.",
  },
  {
    q: "What is included in the Czech course?",
    a: "The course includes structured lessons, vocabulary, grammar pages, audio pronunciation, dictionary search and exercises for review and practice.",
  },
  {
    q: "Is Czech difficult to learn?",
    a: "Czech can feel challenging because of pronunciation, cases and verb forms, but it becomes much easier when you learn it gradually with clear examples and regular practice.",
  },
  {
    q: "Is this course useful for life or work in the Czech Republic?",
    a: "Yes. Flunio focuses on practical vocabulary and everyday topics that are useful for work, study, documents, travel and daily communication.",
  },
];

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
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-10 text-white">
      <Script
        id="faq-schema-czech-en"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-4">
          <div className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100">
            Flunio · Czech course
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Learn Czech online — structured course from A0 to B2
          </h1>

          <p className="text-white/70">
            Flunio helps you learn Czech online in a clear and structured way.
            Instead of jumping between random word lists, videos and grammar
            tables, you can follow short lessons, practice vocabulary, listen to
            pronunciation and build your Czech step by step.
          </p>

          <p className="text-white/70">
            The Czech course is designed for learners who want to start from
            scratch, improve everyday communication or prepare for life, work,
            study or travel in the Czech Republic.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/learning"
              className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-4 py-2 font-semibold text-white shadow-[0_0_18px_rgba(59,130,246,0.35)]"
            >
              Start learning Czech
            </Link>

            {[
              ["Start with A0 →", "/learning/a0-1"],
              ["Czech dictionary", "/dictionary"],
              ["Czech grammar", "/grammar"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-semibold text-white transition hover:border-cyan-400/35 hover:bg-white/10"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {[
          ["1) Czech lessons by level", "Lessons are organized from A0 to B2, so you always know what to learn next. This helps you avoid chaos and build Czech vocabulary and grammar in a logical order."],
          ["2) Short daily practice", "Each lesson is short enough for daily learning. You can study for 10–20 minutes, complete exercises and return the next day without feeling overloaded."],
          ["3) Audio pronunciation", "Czech pronunciation can be difficult at first. Audio helps you hear how words and phrases sound, repeat them aloud and improve your listening skills."],
          ["4) Vocabulary and grammar together", "Flunio combines vocabulary, grammar, dictionary search and practice exercises, so you can learn words and understand how to use them in real sentences."],
        ].map(([title, text]) => (
          <div
            key={title}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_24px_rgba(34,211,238,0.08)] backdrop-blur"
          >
            <h2 className="text-lg font-bold text-cyan-100">{title}</h2>
            <p className="mt-2 text-white/70">{text}</p>
          </div>
        ))}
      </section>

      {[
        {
          title: "How to start learning Czech online",
          body: (
            <>
              <p>
                If you are a beginner, the best way to start is not to memorize
                long grammar rules immediately. First, build a base: common
                words, simple phrases, pronunciation and basic sentence patterns.
              </p>

              <ol className="list-decimal space-y-2 pl-5">
                <li>Start with A0 if you are learning Czech from scratch.</li>
                <li>Learn a small group of useful words in each lesson.</li>
                <li>Listen to the audio and repeat words aloud.</li>
                <li>Complete exercises right after the lesson.</li>
                <li>Use the dictionary when you want to search or review words.</li>
                <li>Open grammar pages when you need a clear explanation.</li>
                <li>Move to A1, A2, B1 and B2 gradually.</li>
              </ol>

              <Link
                href="/learning/a0-1"
                className="inline-flex rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-4 py-2 font-semibold text-white"
              >
                Go to A0 lessons →
              </Link>
            </>
          ),
        },
        {
          title: "Learn Czech vocabulary for real situations",
          body: (
            <p>
              A good Czech course should not only teach isolated words. You need
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
                  <Link
                    key={href}
                    href={href}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-semibold text-white transition hover:border-cyan-400/35 hover:bg-white/10"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </>
          ),
        },
        {
          title: "Who this Czech course is for",
          body: (
            <>
              <p>
                Flunio is a good option for learners who want a simple,
                structured and practical way to study Czech online without
                overload.
              </p>
              <p>
                The course can also help if you need Czech for everyday life in
                the Czech Republic, work communication, study, documents, travel
                or basic conversations.
              </p>
            </>
          ),
        },
      ].map((section) => (
        <section
          key={section.title}
          className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_0_24px_rgba(34,211,238,0.08)] backdrop-blur"
        >
          <h2 className="text-2xl font-bold text-white">{section.title}</h2>
          <div className="space-y-4 text-white/70">{section.body}</div>
        </section>
      ))}

      <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_0_24px_rgba(34,211,238,0.08)] backdrop-blur">
        <h2 className="text-2xl font-bold">What makes Czech challenging for beginners?</h2>

        <p className="text-white/70">
          Czech is a Slavic language with a rich grammar system. Beginners often
          notice that words change their endings, verbs have different forms and
          pronunciation includes sounds that may not exist in their native
          language.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Pronunciation", "Czech has special letters and sounds such as ř, č, š, ž and ě."],
            ["Cases", "Nouns and adjectives change depending on their role in a sentence."],
            ["Verb forms", "Czech verbs change by person, tense and meaning."],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="font-semibold text-cyan-100">{title}</h3>
              <p className="mt-2 text-sm text-white/65">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_0_24px_rgba(34,211,238,0.08)] backdrop-blur">
        <h2 className="text-2xl font-bold">FAQ</h2>

        <div className="space-y-4">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="font-semibold text-cyan-100">{item.q}</div>
              <div className="mt-2 text-white/70">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}