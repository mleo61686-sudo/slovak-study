import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
  title: "Vocabulary in Polish: Basic Words by Topic | Flunio",
  description:
    "Build your vocabulary in Polish with basic words by topic, useful phrases, example sentences, pronunciation tips and audio practice for beginners.",

  alternates: {
    canonical: `${SITE_URL}/polish-vocabulary`,
  },

  openGraph: {
    title: "Vocabulary in Polish: Basic Words by Topic | Flunio",
    description:
      "Learn vocabulary in Polish by topic: greetings, family, food, home, transport, work, verbs, adjectives and pronunciation tips.",
    url: `${SITE_URL}/polish-vocabulary`,
    siteName: "Flunio",
    type: "website",
  },

  robots: { index: true, follow: true },
};

type VocabularyWord = {
  pl: string;
  en: string;
  example: string;
};

type VocabularySection = {
  title: string;
  description: string;
  words: VocabularyWord[];
};

const FAQ = [
  {
    q: "What does “vocabulary in Polish” mean?",
    a: "Vocabulary in Polish means the words and short phrases you need to understand and speak Polish: greetings, everyday nouns, verbs, adjectives, food, transport, work, home and useful expressions.",
  },
  {
    q: "What Polish vocabulary should beginners learn first?",
    a: "Beginners should start with greetings, numbers, family, food, home, transport, time, common verbs and everyday words that can be used in simple sentences.",
  },
  {
    q: "What are some easy Polish words for beginners?",
    a: "Easy Polish words include tak, nie, dom, mama, tata, kawa, woda, sklep, praca, czas, dobry and mały. They are useful because they appear often in everyday Polish.",
  },
  {
    q: "How can I pronounce Polish words better?",
    a: "Listen to Polish words with audio, repeat them aloud and pay attention to sounds such as sz, cz, rz, ł, ą and ę. Short daily practice is better than memorizing silent word lists.",
  },
  {
    q: "How many Polish words do I need for basic communication?",
    a: "For simple everyday communication, 500–1000 common Polish words can be enough if you also learn how to use them in short phrases and basic sentence patterns.",
  },
  {
    q: "How can I remember Polish vocabulary better?",
    a: "Learn words in small groups, connect them with real situations, listen to pronunciation, repeat aloud, use examples and review older words regularly.",
  },
];

const vocabularySections: VocabularySection[] = [
  {
    title: "Greetings and polite Polish words",
    description:
      "Start with polite words and greetings. They are short, frequent and useful in almost every conversation.",
    words: [
      {
        pl: "Cześć",
        en: "hi / hello",
        example: "Cześć, jak się masz?",
      },
      {
        pl: "Dzień dobry",
        en: "good morning / good day",
        example: "Dzień dobry, poproszę kawę.",
      },
      {
        pl: "Dobry wieczór",
        en: "good evening",
        example: "Dobry wieczór, mam pytanie.",
      },
      {
        pl: "Dziękuję",
        en: "thank you",
        example: "Dziękuję bardzo.",
      },
      {
        pl: "Proszę",
        en: "please / here you are",
        example: "Proszę, to dla ciebie.",
      },
      {
        pl: "Przepraszam",
        en: "sorry / excuse me",
        example: "Przepraszam, gdzie jest sklep?",
      },
      {
        pl: "Tak",
        en: "yes",
        example: "Tak, rozumiem.",
      },
      {
        pl: "Nie",
        en: "no",
        example: "Nie, dziękuję.",
      },
    ],
  },
  {
    title: "People and family",
    description:
      "These Polish words help you talk about people, relatives and everyday relationships.",
    words: [
      {
        pl: "człowiek",
        en: "person",
        example: "To dobry człowiek.",
      },
      {
        pl: "mężczyzna",
        en: "man",
        example: "Ten mężczyzna pracuje tutaj.",
      },
      {
        pl: "kobieta",
        en: "woman",
        example: "Ta kobieta mówi po polsku.",
      },
      {
        pl: "dziecko",
        en: "child",
        example: "Dziecko jest w domu.",
      },
      {
        pl: "rodzina",
        en: "family",
        example: "Moja rodzina mieszka w Polsce.",
      },
      {
        pl: "mama",
        en: "mom",
        example: "Moja mama jest w pracy.",
      },
      {
        pl: "ojciec",
        en: "father",
        example: "Mój ojciec lubi kawę.",
      },
      {
        pl: "przyjaciel",
        en: "friend",
        example: "To mój przyjaciel.",
      },
    ],
  },
  {
    title: "Home and everyday life",
    description:
      "Basic Polish vocabulary for home is important because these words appear in daily conversations very often.",
    words: [
      {
        pl: "dom",
        en: "house / home",
        example: "Jestem w domu.",
      },
      {
        pl: "mieszkanie",
        en: "apartment",
        example: "Mam małe mieszkanie.",
      },
      {
        pl: "pokój",
        en: "room",
        example: "To mój pokój.",
      },
      {
        pl: "kuchnia",
        en: "kitchen",
        example: "Kawa jest w kuchni.",
      },
      {
        pl: "drzwi",
        en: "door",
        example: "Drzwi są zamknięte.",
      },
      {
        pl: "okno",
        en: "window",
        example: "Okno jest otwarte.",
      },
      {
        pl: "łóżko",
        en: "bed",
        example: "Łóżko jest duże.",
      },
      {
        pl: "stół",
        en: "table",
        example: "Na stole jest woda.",
      },
    ],
  },
  {
    title: "Food and drinks",
    description:
      "Food words are some of the easiest Polish words to use immediately in shops, cafés and restaurants.",
    words: [
      {
        pl: "chleb",
        en: "bread",
        example: "Poproszę chleb.",
      },
      {
        pl: "woda",
        en: "water",
        example: "Chcę wodę.",
      },
      {
        pl: "kawa",
        en: "coffee",
        example: "Lubię kawę.",
      },
      {
        pl: "herbata",
        en: "tea",
        example: "Piję herbatę.",
      },
      {
        pl: "mleko",
        en: "milk",
        example: "Mleko jest zimne.",
      },
      {
        pl: "mięso",
        en: "meat",
        example: "Nie jem mięsa.",
      },
      {
        pl: "ryż",
        en: "rice",
        example: "Ryż jest gotowy.",
      },
      {
        pl: "zupa",
        en: "soup",
        example: "Ta zupa jest dobra.",
      },
    ],
  },
  {
    title: "Transport and city",
    description:
      "Use these Polish words when you travel, ask for directions or talk about places in the city.",
    words: [
      {
        pl: "samochód",
        en: "car",
        example: "Mam samochód.",
      },
      {
        pl: "autobus",
        en: "bus",
        example: "Autobus jest spóźniony.",
      },
      {
        pl: "pociąg",
        en: "train",
        example: "Pociąg jedzie do Krakowa.",
      },
      {
        pl: "przystanek",
        en: "stop",
        example: "Gdzie jest przystanek?",
      },
      {
        pl: "droga",
        en: "road / way",
        example: "To długa droga.",
      },
      {
        pl: "ulica",
        en: "street",
        example: "Ta ulica jest spokojna.",
      },
      {
        pl: "miasto",
        en: "city",
        example: "To duże miasto.",
      },
      {
        pl: "sklep",
        en: "shop",
        example: "Sklep jest blisko.",
      },
    ],
  },
  {
    title: "Work and study",
    description:
      "These words are useful if you learn Polish for work, school, documents or daily communication.",
    words: [
      {
        pl: "praca",
        en: "work",
        example: "Idę do pracy.",
      },
      {
        pl: "szkoła",
        en: "school",
        example: "Szkoła jest blisko domu.",
      },
      {
        pl: "nauczyciel",
        en: "teacher",
        example: "Nauczyciel mówi powoli.",
      },
      {
        pl: "student",
        en: "student",
        example: "Jestem studentem.",
      },
      {
        pl: "kolega",
        en: "colleague / friend",
        example: "Mój kolega pracuje tutaj.",
      },
      {
        pl: "firma",
        en: "company",
        example: "Ta firma jest duża.",
      },
      {
        pl: "pieniądze",
        en: "money",
        example: "Potrzebuję pieniędzy.",
      },
      {
        pl: "czas",
        en: "time",
        example: "Nie mam czasu.",
      },
    ],
  },
  {
    title: "Basic Polish verbs",
    description:
      "Verbs are essential because they help you turn vocabulary into real sentences.",
    words: [
      {
        pl: "być",
        en: "to be",
        example: "Chcę być spokojny.",
      },
      {
        pl: "mieć",
        en: "to have",
        example: "Mam pytanie.",
      },
      {
        pl: "iść",
        en: "to go",
        example: "Idę do sklepu.",
      },
      {
        pl: "robić",
        en: "to do / to make",
        example: "Co robisz?",
      },
      {
        pl: "wiedzieć",
        en: "to know",
        example: "Nie wiem.",
      },
      {
        pl: "chcieć",
        en: "to want",
        example: "Chcę kawę.",
      },
      {
        pl: "widzieć",
        en: "to see",
        example: "Widzę dom.",
      },
      {
        pl: "mówić",
        en: "to speak",
        example: "Mówię trochę po polsku.",
      },
    ],
  },
  {
    title: "Useful adjectives",
    description:
      "Adjectives help you describe people, things and situations in simple Polish.",
    words: [
      {
        pl: "dobry",
        en: "good",
        example: "To dobry pomysł.",
      },
      {
        pl: "zły",
        en: "bad",
        example: "To zły dzień.",
      },
      {
        pl: "duży",
        en: "big",
        example: "To duży dom.",
      },
      {
        pl: "mały",
        en: "small",
        example: "Mam mały pokój.",
      },
      {
        pl: "nowy",
        en: "new",
        example: "To nowy telefon.",
      },
      {
        pl: "stary",
        en: "old",
        example: "To stary samochód.",
      },
      {
        pl: "szybki",
        en: "fast",
        example: "To szybki pociąg.",
      },
      {
        pl: "ważny",
        en: "important",
        example: "To ważny dokument.",
      },
    ],
  },
];

const easyPolishWords = [
  ["tak", "yes"],
  ["nie", "no"],
  ["dom", "home"],
  ["mama", "mom"],
  ["tata", "dad"],
  ["kawa", "coffee"],
  ["woda", "water"],
  ["sklep", "shop"],
  ["czas", "time"],
  ["praca", "work"],
  ["dobry", "good"],
  ["mały", "small"],
];

const pronunciationTips = [
  {
    sound: "sz",
    hint: "similar to “sh” in English",
    example: "szkoła",
  },
  {
    sound: "cz",
    hint: "similar to “ch” in English",
    example: "człowiek",
  },
  {
    sound: "ł",
    hint: "often sounds like English “w”",
    example: "łóżko",
  },
  {
    sound: "ą",
    hint: "a nasal vowel; listen and repeat slowly",
    example: "pieniądze",
  },
  {
    sound: "ę",
    hint: "another nasal vowel, common in Polish endings",
    example: "dziękuję",
  },
  {
    sound: "rz / ż",
    hint: "usually pronounced like Polish “ż”",
    example: "przepraszam",
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Learn Polish",
        item: `${SITE_URL}/learn-polish`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Polish vocabulary",
        item: `${SITE_URL}/polish-vocabulary`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 theme-text">
      <Script
        id="faq-schema-polish-vocabulary"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Script
        id="breadcrumb-schema-polish-vocabulary"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className={`${card} space-y-4 p-8`}>
        <p className="text-sm font-semibold uppercase tracking-wide theme-text-muted">
          Polish vocabulary list for A0–A1 learners
        </p>

        <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
          Vocabulary in Polish: basic words and phrases by topic
        </h1>

        <p className="theme-text-muted">
          If you search for vocabulary in Polish, start with the words you can
          use in real life: greetings, family, home, food, transport, work,
          common verbs and simple adjectives. A short, practical Polish
          vocabulary list is more useful than a huge word list you never review.
        </p>

        <p className="theme-text-muted">
          This page gives you easy Polish words for beginners, examples in short
          sentences and pronunciation tips. You can use it as a starting point,
          then continue with Polish lessons, audio practice and grammar in
          Flunio.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/learn-polish" className={primaryButton}>
            Learn Polish online →
          </Link>

          <Link href="/polish-words-with-audio" className={secondaryButton}>
            Polish words with audio
          </Link>

          <Link href="/polish-for-beginners" className={secondaryButton}>
            Polish for beginners
          </Link>

          <Link href="/polish-grammar" className={secondaryButton}>
            Polish grammar
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className={`${softCard} p-4`}>
          <h2 className="font-bold theme-text">Vocabulary in Polish</h2>
          <p className="mt-2 text-sm theme-text-muted">
            Learn common Polish words by topic instead of memorizing random
            lists.
          </p>
        </div>

        <div className={`${softCard} p-4`}>
          <h2 className="font-bold theme-text">Easy Polish words</h2>
          <p className="mt-2 text-sm theme-text-muted">
            Start with short, frequent words that appear in everyday speech.
          </p>
        </div>

        <div className={`${softCard} p-4`}>
          <h2 className="font-bold theme-text">Pronounce Polish words</h2>
          <p className="mt-2 text-sm theme-text-muted">
            Combine reading with audio and repeat difficult sounds aloud.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Easy Polish words to learn first
        </h2>

        <p className="theme-text-muted">
          These easy Polish words are short and common. They are useful for your
          first Polish phrases and help you understand simple sentences faster.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          {easyPolishWords.map(([pl, en]) => (
            <div key={pl} className={`${softCard} p-4`}>
              <p className="text-lg font-bold theme-text">{pl}</p>
              <p className="mt-1 text-sm theme-text-muted">{en}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {vocabularySections.map((section) => (
          <div key={section.title} className={`${card} p-5`}>
            <h2 className="text-lg font-bold theme-text">{section.title}</h2>

            <p className="mt-2 text-sm theme-text-muted">
              {section.description}
            </p>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 theme-simple:border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-left theme-text-muted theme-simple:bg-slate-50">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Polish</th>
                    <th className="px-3 py-2 font-semibold">English</th>
                    <th className="hidden px-3 py-2 font-semibold sm:table-cell">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {section.words.map((word) => (
                    <tr
                      key={word.pl}
                      className="border-t border-white/10 theme-simple:border-slate-200"
                    >
                      <td className="px-3 py-2 font-medium theme-text">
                        {word.pl}
                      </td>
                      <td className="px-3 py-2 theme-text-muted">{word.en}</td>
                      <td className="hidden px-3 py-2 theme-text-muted sm:table-cell">
                        {word.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          How to pronounce Polish words
        </h2>

        <p className="theme-text-muted">
          Polish pronunciation can look difficult at first, but it becomes much
          easier when you listen and repeat. Do not learn Polish vocabulary only
          as silent text. Try to hear the word, repeat it aloud and connect it
          with a short example phrase.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {pronunciationTips.map((item) => (
            <div key={item.sound} className={`${softCard} p-4`}>
              <h3 className="text-lg font-bold theme-text">{item.sound}</h3>
              <p className="mt-1 text-sm theme-text-muted">{item.hint}</p>
              <p className="mt-2 text-sm font-semibold theme-text">
                Example: {item.example}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <Link href="/polish-words-with-audio" className={primaryButton}>
            Practice Polish words with audio →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Polish words by topic: why this works better
        </h2>

        <p className="theme-text-muted">
          Learning Polish words by topic helps your brain connect vocabulary
          with real situations. For example, food words are useful in shops and
          restaurants, transport words help you travel, and work vocabulary helps
          with jobs, school and documents.
        </p>

        <p className="theme-text-muted">
          A good beginner plan is simple: learn a small group of words, listen
          to them, repeat them, use them in short sentences and review them
          later. This is how vocabulary becomes active instead of staying only
          passive.
        </p>

        <ul className="list-disc space-y-2 pl-5 theme-text-muted">
          <li>Learn 10–20 Polish words at a time.</li>
          <li>Group words by topic: home, food, work, transport.</li>
          <li>Repeat old words before adding too many new ones.</li>
          <li>Use every new word in a short phrase.</li>
          <li>Combine vocabulary with audio and grammar practice.</li>
        </ul>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Basic Polish words and grammar
        </h2>

        <p className="theme-text-muted">
          Vocabulary and grammar should work together. If you know the Polish
          word dom, you can say w domu. If you know praca, you can say idę do
          pracy. That is why Polish grammar becomes easier when you already know
          useful words and examples.
        </p>

        <p className="theme-text-muted">
          After you learn your first Polish vocabulary, continue with basic
          verbs, word order, cases and simple sentence patterns. You do not need
          to understand everything at once: start with examples and build the
          rules step by step.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/polish-grammar" className={primaryButton}>
            Open Polish grammar →
          </Link>

          <Link href="/polish-for-beginners" className={secondaryButton}>
            Beginner roadmap →
          </Link>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          Common mistakes when learning Polish vocabulary
        </h2>

        <div className="space-y-3 theme-text-muted">
          <p>
            <strong className="theme-text">
              1. Learning words without context.
            </strong>{" "}
            It is easier to remember a word when you also learn a short example
            phrase.
          </p>

          <p>
            <strong className="theme-text">2. Ignoring pronunciation.</strong>{" "}
            Polish spelling and pronunciation need practice, especially sounds
            such as sz, cz, rz, ą, ę, ł and ń.
          </p>

          <p>
            <strong className="theme-text">
              3. Learning too many words at once.
            </strong>{" "}
            A smaller list with regular review is usually more useful than a
            large list you read only once.
          </p>

          <p>
            <strong className="theme-text">4. Not using words actively.</strong>{" "}
            Try to use new Polish words in questions, answers and simple
            sentences as soon as possible.
          </p>
        </div>
      </section>

      <section className={`${card} space-y-4 p-6`}>
        <h2 className="text-2xl font-bold theme-text">
          What to learn after basic Polish vocabulary
        </h2>

        <p className="theme-text-muted">
          After you know your first Polish words, continue with short phrases,
          basic questions and simple sentence patterns. This helps you use
          vocabulary instead of only recognizing it.
        </p>

        <p className="theme-text-muted">
          The next step is to connect vocabulary with grammar: verbs, word
          order, cases and common sentence structures. Flunio helps you combine
          lessons, dictionary search and practice in one place.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/learn-polish" className={secondaryBlock}>
            Learn Polish online →
          </Link>

          <Link href="/polish-for-beginners" className={secondaryBlock}>
            Polish for beginners →
          </Link>

          <Link href="/polish-grammar" className={secondaryBlock}>
            Polish grammar guide →
          </Link>

          <Link href="/polish-words-with-audio" className={secondaryBlock}>
            Polish words with audio →
          </Link>

          <Link href="/dictionary" className={secondaryBlock}>
            Open dictionary →
          </Link>

          <Link href="/learning" className={secondaryBlock}>
            Start learning in Flunio →
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