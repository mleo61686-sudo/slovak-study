import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Polish Grammar for Beginners: Cases, Verbs, Word Order | Flunio",
  description:
    "Learn Polish grammar for beginners: Polish cases, verbs, alphabet, pronunciation, word order, sentence patterns and simple examples with Flunio.",

  alternates: {
    canonical: `${SITE_URL}/polish-grammar`,
  },

  openGraph: {
    title: "Polish Grammar for Beginners | Flunio",
    description:
      "Learn Polish grammar step by step: alphabet, pronunciation, verbs, cases, word order, sentence patterns and practical examples.",
    url: `${SITE_URL}/polish-grammar`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

type GrammarTopic = {
  title: string;
  description: string;
  example: string;
  href: string;
  linkText: string;
};

type CaseItem = {
  name: string;
  use: string;
  example: string;
};

type VerbItem = {
  polish: string;
  english: string;
  example: string;
};

const FAQ = [
  {
    q: "Is Polish grammar difficult?",
    a: "Polish grammar can feel difficult at first because of cases, endings, verb forms and pronunciation. It becomes easier when you learn it step by step with examples instead of memorizing tables alone.",
  },
  {
    q: "What should I learn first in Polish grammar?",
    a: "Start with the Polish alphabet and pronunciation, then basic sentence structure, present tense verbs and the most common Polish cases.",
  },
  {
    q: "Does Polish have cases?",
    a: "Yes. Polish uses cases, so nouns, adjectives and pronouns can change their endings depending on their role in a sentence.",
  },
  {
    q: "How many cases does Polish have?",
    a: "Polish has seven main cases: nominative, genitive, dative, accusative, instrumental, locative and vocative.",
  },
  {
    q: "Can I learn Polish grammar together with vocabulary?",
    a: "Yes. It is usually better to learn useful words and short phrases first, then use grammar to understand how those words change in real sentences.",
  },
  {
    q: "What is the best way to learn Polish grammar online?",
    a: "The best way is to combine short explanations, real examples, pronunciation, vocabulary and exercises. This helps you understand grammar in context.",
  },
];

const grammarTopics: GrammarTopic[] = [
  {
    title: "1) Polish alphabet and pronunciation",
    description:
      "Before you study grammar deeply, learn how Polish letters and sounds work. Sounds like sz, cz, rz, ą, ę, ł and ń appear often.",
    example: "Example: dziękuję, szkoła, człowiek, łóżko",
    href: "/polish-words-with-audio",
    linkText: "Practice Polish pronunciation with audio →",
  },
  {
    title: "2) Basic Polish sentence structure",
    description:
      "Beginners should start with simple patterns: I am, I have, I want, I go, this is, there is. These patterns make grammar easier to notice.",
    example: "Example: To jest dom. Mam pytanie. Idę do pracy.",
    href: "/polish-for-beginners",
    linkText: "Follow the beginner roadmap →",
  },
  {
    title: "3) Polish verbs",
    description:
      "Polish verbs change by person, tense and meaning. Start with common verbs such as być, mieć, iść, robić, chcieć and mówić.",
    example: "Example: jestem, mam, idę, robię, chcę, mówię",
    href: "/learning",
    linkText: "Learn verbs in lessons →",
  },
  {
    title: "4) Polish cases",
    description:
      "Cases explain why Polish nouns, adjectives and pronouns change endings. Learn them through examples, not only through tables.",
    example: "Example: dom → w domu, praca → do pracy",
    href: "/polish-vocabulary",
    linkText: "Build vocabulary first →",
  },
];

const polishCases: CaseItem[] = [
  {
    name: "Nominative",
    use: "basic form; the subject of a sentence",
    example: "To jest dom.",
  },
  {
    name: "Genitive",
    use: "often used for possession, absence and quantity",
    example: "Nie mam czasu.",
  },
  {
    name: "Dative",
    use: "often shows the indirect object",
    example: "Daję książkę mamie.",
  },
  {
    name: "Accusative",
    use: "often shows the direct object",
    example: "Widzę dom.",
  },
  {
    name: "Instrumental",
    use: "often used with “with” or after “to be” in identity phrases",
    example: "Jestem studentem.",
  },
  {
    name: "Locative",
    use: "often used after prepositions about place or topic",
    example: "Mieszkam w Polsce.",
  },
  {
    name: "Vocative",
    use: "used when addressing someone directly",
    example: "Mamo, chodź tutaj.",
  },
];

const basicVerbs: VerbItem[] = [
  {
    polish: "być",
    english: "to be",
    example: "Jestem w domu.",
  },
  {
    polish: "mieć",
    english: "to have",
    example: "Mam pytanie.",
  },
  {
    polish: "iść",
    english: "to go",
    example: "Idę do sklepu.",
  },
  {
    polish: "robić",
    english: "to do / to make",
    example: "Co robisz?",
  },
  {
    polish: "chcieć",
    english: "to want",
    example: "Chcę kawę.",
  },
  {
    polish: "mówić",
    english: "to speak",
    example: "Mówię trochę po polsku.",
  },
];

const commonPatterns = [
  {
    pattern: "To jest...",
    meaning: "This is...",
    example: "To jest mój dom.",
  },
  {
    pattern: "Mam...",
    meaning: "I have...",
    example: "Mam małe mieszkanie.",
  },
  {
    pattern: "Chcę...",
    meaning: "I want...",
    example: "Chcę wodę.",
  },
  {
    pattern: "Idę do...",
    meaning: "I am going to...",
    example: "Idę do pracy.",
  },
  {
    pattern: "Mieszkam w...",
    meaning: "I live in...",
    example: "Mieszkam w Polsce.",
  },
  {
    pattern: "Nie wiem",
    meaning: "I do not know",
    example: "Przepraszam, nie wiem.",
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
const textLink =
  "font-semibold theme-accent-text underline decoration-cyan-300/40 underline-offset-4 transition hover:opacity-80";

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
        id="faq-schema-polish-grammar"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={`${card} space-y-4 p-8`}>
        <p className="text-sm font-semibold uppercase tracking-wide theme-text-muted">
          Polish grammar guide for A0–A1 learners
        </p>

        <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
          Polish grammar for beginners: cases, verbs and word order
        </h1>

        <p className="theme-text-muted">
          Polish grammar becomes easier when you learn it in a clear order.
          Start with pronunciation and simple sentences, then move to Polish
          verbs, cases, endings and word order. You do not need to understand
          every table at once — examples and short phrases help much more.
        </p>

        <p className="theme-text-muted">
          This guide explains the most important grammar Polish learners need at
          the beginning: the alphabet, pronunciation, basic sentence patterns,
          present tense verbs, Polish cases and how grammar connects with
          vocabulary.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link className={primaryButton} href="/learn-polish">
            Learn Polish online →
          </Link>

          <Link className={secondaryButton} href="/polish-for-beginners">
            Polish for beginners
          </Link>

          <Link className={secondaryButton} href="/polish-vocabulary">
            Polish vocabulary
          </Link>

          <Link className={secondaryButton} href="/polish-words-with-audio">
            Polish words with audio
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {grammarTopics.map((topic) => (
          <div key={topic.title} className={`${card} p-5`}>
            <h2 className="text-lg font-bold theme-text">{topic.title}</h2>

            <p className="mt-2 theme-text-muted">{topic.description}</p>

            <p className="mt-3 text-sm font-semibold theme-text">
              {topic.example}
            </p>

            <div className="mt-3">
              <Link className={textLink} href={topic.href}>
                {topic.linkText}
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          How to learn Polish grammar step by step
        </h2>

        <p className="theme-text-muted">
          The best way to learn Polish grammar online is to combine rules with
          real examples. If you only read tables, it is easy to forget them. But
          when you see grammar inside words and sentences that you already know,
          the language becomes more natural.
        </p>

        <ol className="list-decimal space-y-2 pl-5 theme-text-muted">
          <li>Learn the Polish alphabet and pronunciation first.</li>
          <li>Build basic Polish vocabulary with short daily lessons.</li>
          <li>Study simple sentence patterns and word order.</li>
          <li>Learn present tense verbs with common examples.</li>
          <li>Start Polish cases gradually through short phrases.</li>
          <li>Practice grammar through exercises, not only reading.</li>
          <li>Return to difficult topics regularly instead of rushing.</li>
        </ol>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/polish-for-beginners" className={primaryButton}>
            Open Polish beginner roadmap →
          </Link>

          <Link href="/polish-vocabulary" className={secondaryButton}>
            Learn basic Polish words →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Polish cases explained simply
        </h2>

        <p className="theme-text-muted">
          Polish cases are one of the most important parts of Polish grammar.
          They show the role of a word in a sentence: who is doing something,
          who receives the action, where something is, where it goes, or who owns
          something. This is why Polish words often change their endings.
        </p>

        <p className="theme-text-muted">
          Polish has seven main cases. Beginners should not try to memorize every
          ending at once. First, learn common phrases and notice patterns.
        </p>

        <div className="overflow-hidden rounded-2xl border border-white/10 theme-simple:border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-left theme-text-muted theme-simple:bg-slate-50">
              <tr>
                <th className="px-3 py-2 font-semibold">Case</th>
                <th className="px-3 py-2 font-semibold">Use</th>
                <th className="hidden px-3 py-2 font-semibold sm:table-cell">
                  Example
                </th>
              </tr>
            </thead>
            <tbody>
              {polishCases.map((item) => (
                <tr
                  key={item.name}
                  className="border-t border-white/10 theme-simple:border-slate-200"
                >
                  <td className="px-3 py-2 font-medium theme-text">
                    {item.name}
                  </td>
                  <td className="px-3 py-2 theme-text-muted">{item.use}</td>
                  <td className="hidden px-3 py-2 theme-text-muted sm:table-cell">
                    {item.example}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
          Basic Polish verbs for beginners
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

        <div className="grid gap-3 sm:grid-cols-2">
          {basicVerbs.map((verb) => (
            <div key={verb.polish} className={`${softCard} p-4`}>
              <p className="text-lg font-bold theme-text">{verb.polish}</p>
              <p className="mt-1 text-sm theme-text-muted">{verb.english}</p>
              <p className="mt-2 text-sm font-semibold theme-text">
                {verb.example}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/polish-for-beginners" className={secondaryButton}>
            Beginner learning order →
          </Link>

          <Link href="/polish-vocabulary" className={secondaryButton}>
            Learn verb vocabulary →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Polish word order and simple sentence patterns
        </h2>

        <p className="theme-text-muted">
          Polish word order can be flexible, but beginners should start with
          simple patterns. These patterns help you use vocabulary immediately and
          understand grammar in real sentences.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {commonPatterns.map((item) => (
            <div key={item.pattern} className={`${softCard} p-4`}>
              <p className="font-bold theme-text">{item.pattern}</p>
              <p className="mt-1 text-sm theme-text-muted">{item.meaning}</p>
              <p className="mt-2 text-sm font-semibold theme-text">
                {item.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Learn Polish grammar together with vocabulary
        </h2>

        <p className="theme-text-muted">
          Grammar should not block your progress. A practical approach is to
          learn useful vocabulary first, then use grammar to explain what you
          already see in examples. This works especially well for Polish because
          endings and verb forms become clearer when they appear in real phrases.
        </p>

        <p className="theme-text-muted">
          For example, if you know the Polish word dom, you can later understand
          w domu. If you know praca, you can learn why people say do pracy. This
          is grammar in context, not just theory.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/polish-vocabulary" className={secondaryBlock}>
            Polish vocabulary →
          </Link>

          <Link href="/polish-words-with-audio" className={secondaryBlock}>
            Polish words with audio →
          </Link>

          <Link href="/polish-for-beginners" className={secondaryBlock}>
            Polish for beginners →
          </Link>

          <Link href="/learn-polish" className={secondaryBlock}>
            Learn Polish online →
          </Link>

          <Link href="/learning" className={secondaryBlock}>
            Start lessons in Flunio →
          </Link>

          <Link href="/dictionary" className={secondaryBlock}>
            Open dictionary →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Common mistakes when learning Polish grammar
        </h2>

        <div className="space-y-3 theme-text-muted">
          <p>
            <strong className="theme-text">
              1. Trying to memorize all cases at once.
            </strong>{" "}
            It is better to learn common phrases first and return to the case
            system gradually.
          </p>

          <p>
            <strong className="theme-text">
              2. Studying grammar without vocabulary.
            </strong>{" "}
            Grammar is easier when you already know useful words and can see how
            they change in sentences.
          </p>

          <p>
            <strong className="theme-text">3. Ignoring pronunciation.</strong>{" "}
            Polish spelling and grammar feel much easier when you also listen to
            words and repeat them aloud.
          </p>

          <p>
            <strong className="theme-text">
              4. Reading rules but not practicing.
            </strong>{" "}
            Exercises, examples and review are what turn grammar from theory
            into active knowledge.
          </p>
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