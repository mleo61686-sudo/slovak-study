import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";
const PAGE_URL = `${SITE_URL}/czech-grammar`;

export const metadata: Metadata = {
  title: "Czech Grammar: Cases, Verbs and Sentence Structure | Flunio",
  description:
    "Learn Czech grammar step by step: seven cases, verb conjugation, grammatical gender, word order, pronunciation and practical examples for beginners.",

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title: "Czech Grammar: Cases, Verbs and Sentence Structure | Flunio",
    description:
      "A practical Czech grammar guide covering cases, verbs, gender, sentence structure, pronunciation and common beginner mistakes.",
    url: PAGE_URL,
    siteName: "Flunio",
    type: "article",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Czech Grammar: Cases, Verbs and Sentence Structure | Flunio",
    description:
      "Learn Czech cases, verbs, gender and sentence structure through clear explanations and practical examples.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const FAQ = [
  {
    q: "Is Czech grammar difficult?",
    a: "Czech grammar can seem difficult because nouns and adjectives change through seven cases, verbs change by person and tense, and grammatical gender affects many endings. It becomes much easier when each rule is learned through short phrases and practical examples.",
  },
  {
    q: "What should I learn first in Czech grammar?",
    a: "Start with pronunciation, personal pronouns, the verb být, grammatical gender and basic present-tense patterns. After that, begin learning the most useful case forms through everyday phrases.",
  },
  {
    q: "How many cases does Czech have?",
    a: "Czech has seven grammatical cases: nominative, genitive, dative, accusative, vocative, locative and instrumental. Each case expresses a different relationship or function in a sentence.",
  },
  {
    q: "Do I need to memorize every Czech case table?",
    a: "No. Beginners should first understand what each case does and learn common forms inside useful phrases. Complete declension tables become more helpful after you already recognize the main patterns.",
  },
  {
    q: "Is Czech word order flexible?",
    a: "Yes. Czech word order is more flexible than English word order because case endings show grammatical relationships. However, word order also changes emphasis, so beginners should start with simple and reliable sentence patterns.",
  },
  {
    q: "Can I learn Czech grammar together with vocabulary?",
    a: "Yes. This is usually the most effective approach. Vocabulary gives you useful material, while grammar explains why words and endings change inside real sentences.",
  },
] as const;

const grammarRoadmap = [
  {
    step: "01",
    title: "Pronunciation and spelling",
    text: "Learn how Czech letters and diacritics work, especially č, š, ž, ř, ě and long vowels such as á, é, í, ú and ý.",
  },
  {
    step: "02",
    title: "Personal pronouns and být",
    text: "Begin with já, ty, on, ona, my and vy together with forms such as jsem, jsi, je, jsme and jste.",
  },
  {
    step: "03",
    title: "Grammatical gender",
    text: "Recognise masculine, feminine and neuter nouns because gender affects adjectives, pronouns, past-tense verbs and case endings.",
  },
  {
    step: "04",
    title: "Present-tense verbs",
    text: "Learn common verbs and compare recurring endings for different persons instead of trying to memorise every verb pattern at once.",
  },
  {
    step: "05",
    title: "Useful case forms",
    text: "Start cases through practical meanings: direct objects, possession, location, direction, giving and speaking about someone.",
  },
  {
    step: "06",
    title: "Longer sentences",
    text: "After the foundations are stable, add adjectives, past and future tense, modal verbs, conjunctions and more flexible word order.",
  },
] as const;

const cases = [
  {
    number: "1",
    name: "Nominative",
    czech: "nominativ",
    question: "kdo? co?",
    use: "The basic dictionary form and the usual subject of a sentence.",
    example: "Student pracuje.",
    translation: "The student is working.",
  },
  {
    number: "2",
    name: "Genitive",
    czech: "genitiv",
    question: "koho? čeho?",
    use: "Often expresses possession, absence, quantity or movement from somewhere.",
    example: "Jdu z práce.",
    translation: "I am going from work.",
  },
  {
    number: "3",
    name: "Dative",
    czech: "dativ",
    question: "komu? čemu?",
    use: "Often marks the person or thing receiving something.",
    example: "Dávám knihu kamarádovi.",
    translation: "I am giving a book to my friend.",
  },
  {
    number: "4",
    name: "Accusative",
    czech: "akuzativ",
    question: "koho? co?",
    use: "Commonly marks the direct object of a verb.",
    example: "Mám novou knihu.",
    translation: "I have a new book.",
  },
  {
    number: "5",
    name: "Vocative",
    czech: "vokativ",
    question: "oslovujeme",
    use: "Used when directly addressing a person.",
    example: "Petře, pojď sem.",
    translation: "Petr, come here.",
  },
  {
    number: "6",
    name: "Locative",
    czech: "lokál",
    question: "o kom? o čem?",
    use: "Used after certain prepositions, often when speaking about location or a topic.",
    example: "Mluvím o práci.",
    translation: "I am talking about work.",
  },
  {
    number: "7",
    name: "Instrumental",
    czech: "instrumentál",
    question: "s kým? s čím?",
    use: "Often expresses accompaniment, means or identity after certain verbs.",
    example: "Jdu s kamarádem.",
    translation: "I am going with a friend.",
  },
] as const;

const verbExamples = [
  {
    infinitive: "být",
    meaning: "to be",
    forms: "jsem · jsi · je · jsme · jste · jsou",
    example: "Jsem doma.",
    translation: "I am at home.",
  },
  {
    infinitive: "mít",
    meaning: "to have",
    forms: "mám · máš · má · máme · máte · mají",
    example: "Mám čas.",
    translation: "I have time.",
  },
  {
    infinitive: "dělat",
    meaning: "to do / make",
    forms: "dělám · děláš · dělá · děláme · děláte · dělají",
    example: "Co děláš?",
    translation: "What are you doing?",
  },
  {
    infinitive: "chtít",
    meaning: "to want",
    forms: "chci · chceš · chce · chceme · chcete · chtějí",
    example: "Chci kávu.",
    translation: "I want coffee.",
  },
  {
    infinitive: "potřebovat",
    meaning: "to need",
    forms:
      "potřebuji · potřebuješ · potřebuje · potřebujeme · potřebujete · potřebují",
    example: "Potřebuji pomoc.",
    translation: "I need help.",
  },
  {
    infinitive: "mluvit",
    meaning: "to speak",
    forms: "mluvím · mluvíš · mluví · mluvíme · mluvíte · mluví",
    example: "Mluvím trochu česky.",
    translation: "I speak a little Czech.",
  },
] as const;

const genderExamples = [
  {
    gender: "Masculine",
    label: "mužský rod",
    examples: "muž, student, dům, stůl",
    phrase: "nový dům",
    translation: "a new house",
  },
  {
    gender: "Feminine",
    label: "ženský rod",
    examples: "žena, škola, kniha, práce",
    phrase: "nová kniha",
    translation: "a new book",
  },
  {
    gender: "Neuter",
    label: "střední rod",
    examples: "město, auto, dítě, jídlo",
    phrase: "nové auto",
    translation: "a new car",
  },
] as const;

const sentencePatterns = [
  {
    pattern: "Subject + verb + object",
    example: "Student čte knihu.",
    translation: "The student is reading a book.",
    note: "This is a safe basic structure for beginners.",
  },
  {
    pattern: "Time + verb + subject",
    example: "Dnes pracuji doma.",
    translation: "Today I am working at home.",
    note: "Time expressions often appear near the beginning.",
  },
  {
    pattern: "Object first for emphasis",
    example: "Tu knihu už znám.",
    translation: "I already know that book.",
    note: "Moving an object forward can give it stronger emphasis.",
  },
  {
    pattern: "Question word + verb",
    example: "Kde bydlíš?",
    translation: "Where do you live?",
    note: "Many basic Czech questions begin with kdo, co, kde, kdy, proč or jak.",
  },
] as const;

const mistakes = [
  {
    title: "Trying to memorise all seven cases at once",
    text: "Learn what the cases express first. Then add frequent endings through phrases you actually use.",
  },
  {
    title: "Ignoring noun gender",
    text: "Gender affects adjectives, pronouns, past-tense verbs and declension. Learn a noun together with its gender from the beginning.",
  },
  {
    title: "Learning only infinitives",
    text: "Knowing být or mít is not enough. Learn useful personal forms such as jsem, jsi, mám and máš inside complete sentences.",
  },
  {
    title: "Translating English word for word",
    text: "Czech sentence structure and case use do not always match English. Copy natural Czech patterns instead of translating each word separately.",
  },
  {
    title: "Studying rules without examples",
    text: "A rule is much easier to remember when it explains a sentence you already understand and can use.",
  },
  {
    title: "Waiting for perfect grammar before speaking",
    text: "Use simple sentences early. Mistakes are part of turning passive grammar knowledge into active communication.",
  },
] as const;

const card = "flunio-card rounded-3xl";
const softCard = "theme-home-soft-card rounded-2xl";

const primaryButton =
  "theme-primary-button inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold";

const secondaryButton =
  "theme-secondary-button inline-flex items-center justify-center rounded-xl px-4 py-2.5 font-semibold";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl space-y-2">
      {eyebrow ? (
        <p className="text-sm font-bold uppercase tracking-[0.16em] theme-accent-text">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-2xl font-extrabold tracking-tight theme-text sm:text-3xl">
        {title}
      </h2>

      {description ? (
        <p className="leading-7 theme-text-muted">{description}</p>
      ) : null}
    </div>
  );
}

export default function Page() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Czech Grammar: Cases, Verbs and Sentence Structure",
      description:
        "A practical Czech grammar guide covering cases, verbs, grammatical gender, pronunciation, word order and beginner examples.",
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Flunio",
      },
      about: [
        {
          "@type": "Language",
          name: "Czech",
          alternateName: "čeština",
        },
        {
          "@type": "Thing",
          name: "Czech grammar",
        },
      ],
      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Flunio",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Learn Czech",
          item: `${SITE_URL}/learn-czech`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Czech grammar",
          item: PAGE_URL,
        },
      ],
    },
    {
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
    },
  ];

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-4 py-8 theme-text sm:py-12">
      <Script
        id="czech-grammar-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <nav aria-label="Breadcrumb" className="text-sm theme-text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:underline">
              Flunio
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li>
            <Link href="/learn-czech" className="hover:underline">
              Learn Czech
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li aria-current="page" className="theme-text">
            Czech grammar
          </li>
        </ol>
      </nav>

      <article className="space-y-10">
        <header className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-9">
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative max-w-4xl space-y-5">
            <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide">
              Czech grammar guide
            </div>

            <h1 className="text-3xl font-black leading-tight tracking-tight theme-text sm:text-5xl">
              Czech grammar: cases, verbs, gender and sentence structure
            </h1>

            <p className="max-w-3xl text-lg leading-8 theme-text-muted">
              Czech grammar becomes manageable when you learn it in the right
              order. This guide explains the seven Czech cases, present-tense
              verbs, grammatical gender, word order and common beginner patterns
              through practical examples.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/register" className={primaryButton}>
                Create a free account
              </Link>

              <a href="#czech-cases" className={secondaryButton}>
                Explore the seven cases
              </a>
            </div>

            <p className="max-w-3xl text-sm leading-6 theme-text-muted">
              Flunio combines vocabulary, listening and exercises with grammar.
              After registration, choose <strong className="theme-text">Czech</strong>{" "}
              as your active course on the learning page.
            </p>
          </div>
        </header>

        <section
          aria-label="Page contents"
          className={`${card} p-5 sm:p-6`}
        >
          <p className="font-bold theme-text">In this grammar guide</p>

          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {[
              ["How Czech grammar works", "#how-czech-grammar-works"],
              ["Best learning order", "#grammar-roadmap"],
              ["The seven Czech cases", "#czech-cases"],
              ["Czech verb conjugation", "#czech-verbs"],
              ["Grammatical gender", "#grammatical-gender"],
              ["Word order", "#word-order"],
              ["Grammar with vocabulary", "#grammar-and-vocabulary"],
              ["Common mistakes", "#grammar-mistakes"],
              ["Frequently asked questions", "#faq"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-xl px-3 py-2 theme-text-muted hover:underline"
              >
                {label}
              </a>
            ))}
          </div>
        </section>

        <section
          id="how-czech-grammar-works"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="The foundation"
            title="How Czech grammar works"
            description="Czech uses endings to show relationships between words. This makes the language more flexible than English, but it also means nouns, adjectives, pronouns and verbs can change form."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Nouns change through cases",
                text: "A Czech noun can change according to whether it is the subject, object, recipient, location, possession or companion.",
              },
              {
                title: "Adjectives agree with nouns",
                text: "Adjective endings change according to the gender, number and case of the noun they describe.",
              },
              {
                title: "Verbs change by person",
                text: "The form of a verb changes according to who performs the action: I, you, he, she, we, you plural or they.",
              },
              {
                title: "Gender affects many endings",
                text: "Masculine, feminine and neuter nouns use different adjective, pronoun, past-tense and case patterns.",
              },
              {
                title: "Word order carries emphasis",
                text: "Case endings make Czech word order flexible, but changing the order can change what information sounds most important.",
              },
              {
                title: "Aspect expresses the type of action",
                text: "Czech verbs often distinguish ongoing or repeated actions from completed actions. This becomes important after the beginner foundations.",
              },
            ].map((item) => (
              <div key={item.title} className={`${softCard} p-5`}>
                <h3 className="text-lg font-bold theme-accent-text">
                  {item.title}
                </h3>

                <p className="mt-2 leading-7 theme-text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className={`${softCard} p-5`}>
            <p className="font-bold theme-text">A simple example</p>

            <div className="mt-3 space-y-2">
              <p lang="cs" className="text-lg font-semibold theme-text">
                Student má novou knihu.
              </p>

              <p className="theme-text-muted">
                The student has a new book.
              </p>

              <p className="leading-7 theme-text-muted">
                <span lang="cs">Student</span> is the subject in the nominative.
                The noun <span lang="cs">kniha</span> changes to{" "}
                <span lang="cs">knihu</span> because it is the direct object.
                The adjective also changes from{" "}
                <span lang="cs">nová</span> to{" "}
                <span lang="cs">novou</span>.
              </p>
            </div>
          </div>
        </section>

        <section
          id="grammar-roadmap"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="Learning order"
            title="The best order for learning Czech grammar"
            description="Do not begin by memorising every table. Build a practical foundation first, then add more complex forms when they explain sentences you already understand."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {grammarRoadmap.map((item) => (
              <div key={item.step} className={`${softCard} p-5`}>
                <div className="text-xs font-black tracking-[0.2em] theme-accent-text">
                  {item.step}
                </div>

                <h3 className="mt-2 text-lg font-bold theme-text">
                  {item.title}
                </h3>

                <p className="mt-2 leading-7 theme-text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/czech-for-beginners" className={secondaryButton}>
              Open the Czech beginner roadmap
            </Link>

            <Link href="/czech-vocabulary" className={secondaryButton}>
              Learn Czech vocabulary first
            </Link>
          </div>
        </section>

        <section
          id="czech-cases"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="Declension"
            title="The seven Czech cases explained"
            description="Cases show the role of a noun, adjective or pronoun in a sentence. Beginners should first learn the meaning of each case, then practise common endings through phrases."
          />

          <div className="grid gap-4">
            {cases.map((item) => (
              <div
                key={item.number}
                className={`${softCard} grid gap-4 p-5 sm:grid-cols-[52px_1fr]`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl theme-pill font-black">
                  {item.number}
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold theme-text">
                      {item.name}{" "}
                      <span className="font-normal theme-text-muted">
                        · {item.czech}
                      </span>
                    </h3>

                    <p className="mt-1 text-sm font-semibold theme-accent-text">
                      {item.question}
                    </p>
                  </div>

                  <p className="leading-7 theme-text-muted">{item.use}</p>

                  <div className="rounded-xl border border-white/10 p-4">
                    <p lang="cs" className="font-semibold theme-text">
                      {item.example}
                    </p>

                    <p className="mt-1 text-sm theme-text-muted">
                      {item.translation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`${softCard} p-5`}>
            <h3 className="font-bold theme-text">
              Do you need to memorise every ending?
            </h3>

            <p className="mt-2 leading-7 theme-text-muted">
              Not at the beginning. Learn frequent combinations first, such as{" "}
              <span lang="cs">do práce</span>,{" "}
              <span lang="cs">v Praze</span>,{" "}
              <span lang="cs">s kamarádem</span> and{" "}
              <span lang="cs">mám knihu</span>. These examples help you notice
              recurring patterns before you study complete declension tables.
            </p>
          </div>
        </section>

        <section
          id="czech-verbs"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="Conjugation"
            title="Czech verbs and present-tense conjugation"
            description="Czech usually does not need an explicit subject pronoun because the verb ending already shows who performs the action."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {verbExamples.map((verb) => (
              <div key={verb.infinitive} className={`${softCard} p-5`}>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 lang="cs" className="text-xl font-black theme-accent-text">
                    {verb.infinitive}
                  </h3>

                  <span className="text-sm theme-text-muted">
                    {verb.meaning}
                  </span>
                </div>

                <p lang="cs" className="mt-3 text-sm leading-6 theme-text-muted">
                  {verb.forms}
                </p>

                <div className="mt-4 rounded-xl border border-white/10 p-4">
                  <p lang="cs" className="font-semibold theme-text">
                    {verb.example}
                  </p>

                  <p className="mt-1 text-sm theme-text-muted">
                    {verb.translation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={`${softCard} space-y-3 p-5`}>
            <h3 className="font-bold theme-text">
              Why Czech often omits subject pronouns
            </h3>

            <p className="leading-7 theme-text-muted">
              Both <span lang="cs">Já pracuji doma</span> and{" "}
              <span lang="cs">Pracuji doma</span> mean “I work at home.” The
              ending <span lang="cs">-uji</span> already identifies the speaker.
              The pronoun <span lang="cs">já</span> is usually added only for
              contrast or emphasis.
            </p>
          </div>
        </section>

        <section
          id="grammatical-gender"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="Nouns and agreement"
            title="Grammatical gender in Czech"
            description="Every Czech noun belongs to a grammatical gender. Learn the gender together with the noun because it affects many other words in the sentence."
          />

          <div className="grid gap-4 sm:grid-cols-3">
            {genderExamples.map((item) => (
              <div key={item.gender} className={`${softCard} p-5`}>
                <p className="text-sm font-black theme-accent-text">
                  {item.gender}
                </p>

                <p lang="cs" className="mt-1 text-sm theme-text-muted">
                  {item.label}
                </p>

                <p lang="cs" className="mt-4 leading-7 theme-text-muted">
                  {item.examples}
                </p>

                <div className="mt-4 rounded-xl border border-white/10 p-4">
                  <p lang="cs" className="font-semibold theme-text">
                    {item.phrase}
                  </p>

                  <p className="mt-1 text-sm theme-text-muted">
                    {item.translation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="leading-7 theme-text-muted">
            Masculine nouns are also divided into animate and inanimate groups.
            This difference is especially important in the accusative and in
            some plural forms. Beginners can add this distinction after they
            understand the three main genders.
          </p>
        </section>

        <section
          id="word-order"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="Sentence structure"
            title="Czech word order and basic sentence patterns"
            description="Czech word order is flexible, but not random. The beginning often contains familiar information, while new or emphasised information tends to appear later."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {sentencePatterns.map((item) => (
              <div key={item.pattern} className={`${softCard} p-5`}>
                <h3 className="font-bold theme-accent-text">
                  {item.pattern}
                </h3>

                <div className="mt-4 rounded-xl border border-white/10 p-4">
                  <p lang="cs" className="font-semibold theme-text">
                    {item.example}
                  </p>

                  <p className="mt-1 text-sm theme-text-muted">
                    {item.translation}
                  </p>
                </div>

                <p className="mt-3 leading-7 theme-text-muted">
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          <div className={`${softCard} space-y-3 p-5`}>
            <h3 className="font-bold theme-text">
              Compare the emphasis
            </h3>

            <div className="space-y-3 leading-7 theme-text-muted">
              <p>
                <span lang="cs" className="font-semibold theme-text">
                  Petr koupil nové auto.
                </span>{" "}
                — Petr bought a new car.
              </p>

              <p>
                <span lang="cs" className="font-semibold theme-text">
                  Nové auto koupil Petr.
                </span>{" "}
                — It was Petr who bought the new car.
              </p>

              <p>
                The grammatical meaning remains understandable because the
                endings show the relationships, but the emphasis changes.
              </p>
            </div>
          </div>
        </section>

        <section
          id="grammar-and-vocabulary"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="Study method"
            title="How to learn Czech grammar together with vocabulary"
            description="Grammar should explain language that you can recognise and use. Connect every new rule to a small group of words and phrases."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Learn nouns with gender",
                example: "ten dům · ta kniha · to město",
                text: "Adding a demonstrative word helps you remember whether the noun is masculine, feminine or neuter.",
              },
              {
                title: "Learn verbs with one useful form",
                example: "mít → mám čas",
                text: "Do not store only the infinitive. Add a frequent personal form and a short phrase.",
              },
              {
                title: "Learn cases inside phrases",
                example: "v Praze · do práce · s kamarádem",
                text: "A phrase gives you the preposition, case and ending together.",
              },
              {
                title: "Compare related sentences",
                example: "Mám knihu. · Nemám knihu.",
                text: "Small contrasts help you notice verb forms, negation and word order.",
              },
            ].map((item) => (
              <div key={item.title} className={`${softCard} p-5`}>
                <h3 className="font-bold theme-text">{item.title}</h3>

                <p
                  lang="cs"
                  className="mt-3 font-semibold theme-accent-text"
                >
                  {item.example}
                </p>

                <p className="mt-2 leading-7 theme-text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/czech-vocabulary" className={secondaryButton}>
              Explore Czech vocabulary
            </Link>

            <Link
              href="/czech-words-with-audio"
              className={secondaryButton}
            >
              Practise Czech pronunciation
            </Link>

            <Link href="/dictionary" className={secondaryButton}>
              Search the dictionary
            </Link>
          </div>
        </section>

        <section
          id="grammar-mistakes"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="Avoid these"
            title="Common mistakes when learning Czech grammar"
            description="Most learners do not fail because Czech grammar is impossible. They struggle because they study too many disconnected rules without enough examples and review."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {mistakes.map((item) => (
              <div key={item.title} className={`${softCard} p-5`}>
                <h3 className="font-bold theme-text">{item.title}</h3>

                <p className="mt-2 leading-7 theme-text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${card} space-y-5 p-6 sm:p-8`}>
          <SectionHeading
            eyebrow="Continue learning"
            title="Put Czech grammar into practice"
            description="Use this guide to understand the system, then reinforce the rules through vocabulary, listening and short exercises."
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/register" className={primaryButton}>
              Create an account and choose Czech
            </Link>

            <Link href="/learn-czech" className={secondaryButton}>
              Explore the complete Czech course
            </Link>

            <Link href="/czech-for-beginners" className={secondaryButton}>
              Follow the beginner roadmap
            </Link>

            <Link href="/czech-vocabulary" className={secondaryButton}>
              Learn vocabulary by topic
            </Link>

            <Link
              href="/czech-words-with-audio"
              className={secondaryButton}
            >
              Listen to Czech words
            </Link>

            <Link href="/dictionary" className={secondaryButton}>
              Open the dictionary
            </Link>
          </div>
        </section>

        <section id="faq" className={`${card} space-y-6 p-6 sm:p-8`}>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions about Czech grammar"
          />

          <div className="space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className={`${softCard} group p-5`}>
                <summary className="cursor-pointer list-none pr-6 font-bold theme-text">
                  {item.q}
                </summary>

                <p className="mt-3 leading-7 theme-text-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}