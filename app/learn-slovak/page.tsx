import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Learn Slovak Online from A0 to B2 | Flunio",
  description:
    "Learn Slovak online with structured A0–B2 lessons, vocabulary, grammar, audio pronunciation and exercises. Start Slovak from scratch and build daily practice.",

  alternates: {
    canonical: `${SITE_URL}/learn-slovak`,
  },

  openGraph: {
    title: "Learn Slovak Online from A0 to B2 | Flunio",
    description:
      "Study Slovak step by step with short lessons, vocabulary, grammar, audio and practice exercises.",
    url: `${SITE_URL}/learn-slovak`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Can I learn Slovak online from scratch?",
    a: "Yes. Flunio is designed for beginners, so you can start with A0 lessons, learn basic Slovak words, listen to pronunciation and practice step by step.",
  },
  {
    q: "How much time should I study Slovak every day?",
    a: "About 10–20 minutes a day is enough to build a steady habit. Short daily practice usually works better than long but irregular study sessions.",
  },
  {
    q: "What is included in the Slovak course?",
    a: "The course includes structured lessons, vocabulary, grammar pages, audio pronunciation, dictionary search and exercises for review and practice.",
  },
  {
    q: "Is Slovak difficult to learn?",
    a: "Slovak can feel challenging because of cases, verb forms and pronunciation, but it becomes easier when you learn gradually with examples and regular practice.",
  },
  {
    q: "Is this course useful for life or work in Slovakia?",
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
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-10">
      <Script
        id="faq-schema-slovak-en"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Learn Slovak online — structured course from A0 to B2
        </h1>

        <p className="text-slate-700">
          Flunio helps you learn Slovak online in a structured and practical
          way. Instead of jumping between random vocabulary lists, videos and
          grammar explanations, you can follow short lessons, practice useful
          words, listen to pronunciation and build your Slovak step by step.
        </p>

        <p className="text-slate-700">
          The Slovak course is useful for learners who want to start from
          scratch, improve everyday communication or prepare for life, work,
          study or travel in Slovakia. You can begin with A0 basics and
          gradually move through A1, A2, B1 and B2.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/learning"
            className="rounded-xl bg-black px-4 py-2 text-white"
          >
            Start learning Slovak
          </Link>

          <Link href="/learning/a0-1" className="rounded-xl border px-4 py-2">
            Start with A0 →
          </Link>

          <Link href="/dictionary" className="rounded-xl border px-4 py-2">
            Slovak dictionary
          </Link>

          <Link href="/grammar" className="rounded-xl border px-4 py-2">
            Slovak grammar
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">1) Slovak lessons by level</h2>
          <p className="mt-2 text-slate-700">
            Lessons are organized from A0 to B2, so you always know what to
            learn next. This helps you avoid chaos and build Slovak vocabulary
            and grammar in a logical order.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">2) Short daily practice</h2>
          <p className="mt-2 text-slate-700">
            Each lesson is short enough for daily learning. You can study for
            10–20 minutes, complete exercises and return the next day without
            feeling overloaded.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">3) Audio pronunciation</h2>
          <p className="mt-2 text-slate-700">
            Slovak pronunciation becomes easier when you hear words often.
            Audio helps you recognize sounds, repeat words aloud and improve
            your listening skills.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-bold">4) Vocabulary and grammar together</h2>
          <p className="mt-2 text-slate-700">
            Flunio combines vocabulary, grammar, dictionary search and practice
            exercises, so you can learn words and understand how to use them in
            real sentences.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          How to start learning Slovak online
        </h2>

        <p className="text-slate-700">
          If you are a beginner, the best way to start is not to memorize long
          grammar rules immediately. First, build a base: common words, simple
          phrases, pronunciation and basic sentence patterns. After that,
          grammar becomes easier because you already recognize the words in
          context.
        </p>

        <ol className="list-decimal space-y-2 pl-5 text-slate-700">
          <li>Start with A0 if you are learning Slovak from scratch.</li>
          <li>Learn a small group of useful words in each lesson.</li>
          <li>Listen to the audio and repeat words aloud.</li>
          <li>Complete exercises right after the lesson.</li>
          <li>Use the dictionary when you want to search or review words.</li>
          <li>Open grammar pages when you need a clear explanation.</li>
          <li>Move to A1, A2, B1 and B2 gradually, without rushing.</li>
        </ol>

        <div className="pt-2">
          <Link
            href="/learning/a0-1"
            className="inline-flex rounded-xl bg-black px-4 py-2 text-white"
          >
            Go to A0 lessons →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          What makes Slovak challenging for beginners?
        </h2>

        <p className="text-slate-700">
          Slovak is a Slavic language with rich grammar and word endings.
          Beginners often notice that nouns, adjectives and verbs change their
          forms depending on the sentence. This is normal. The key is to learn
          Slovak in small steps and connect grammar with real examples.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Pronunciation</h3>
            <p className="mt-2 text-sm text-slate-700">
              Slovak has long and short vowels, soft sounds and letters such as
              č, š, ž, ľ and ô. Audio practice helps you recognize and repeat
              them.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Cases</h3>
            <p className="mt-2 text-sm text-slate-700">
              Nouns and adjectives change depending on their role in a sentence.
              This becomes easier with examples and repetition.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Verb forms</h3>
            <p className="mt-2 text-sm text-slate-700">
              Slovak verbs change by person, tense and meaning. Start with
              common verbs and simple present tense patterns.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Learn Slovak vocabulary for real situations
        </h2>

        <p className="text-slate-700">
          A good Slovak course should not only teach isolated words. You need
          vocabulary that helps you understand real situations: introducing
          yourself, asking for information, shopping, using transport, talking
          about work, handling documents and communicating in everyday life.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Everyday Slovak</h3>
            <p className="mt-2 text-slate-700">
              Learn common words and phrases for greetings, food, shopping,
              family, housing, transport and daily routines.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">Slovak for work and study</h3>
            <p className="mt-2 text-slate-700">
              Build vocabulary connected with jobs, schedules, instructions,
              documents, school, communication and practical tasks.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Use grammar when it actually helps
        </h2>

        <p className="text-slate-700">
          Grammar is important, but it should support your learning instead of
          blocking it. With Flunio, you can first learn useful words and phrases,
          then open grammar topics when you want to understand why a sentence is
          built in a certain way.
        </p>

        <p className="text-slate-700">
          This approach is especially useful for Slovak because grammar becomes
          easier when you already have examples in your memory. You can connect
          rules with words you have seen before instead of learning theory in
          isolation.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/grammar" className="rounded-xl border px-4 py-2">
            Open grammar topics
          </Link>

          <Link href="/dictionary" className="rounded-xl border px-4 py-2">
            Search vocabulary
          </Link>

          <Link href="/practice" className="rounded-xl border px-4 py-2">
            Practice exercises
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Who this Slovak course is for</h2>

        <div className="space-y-3 text-slate-700">
          <p>
            Flunio is a good option for learners who want a simple, structured
            and practical way to study Slovak online without overload. It is
            useful if you are starting from zero, returning to Slovak after a
            break or trying to build a regular study habit.
          </p>

          <p>
            The course can also help if you need Slovak for everyday life in
            Slovakia, work communication, study, documents, travel or basic
            conversations. You can learn at your own pace and return to previous
            lessons whenever you need revision.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">FAQ</h2>

        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className="rounded-xl border p-4">
              <div className="font-semibold">{item.q}</div>
              <div className="mt-2 text-slate-700">{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}