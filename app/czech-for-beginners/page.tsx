import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";
const PAGE_URL = `${SITE_URL}/czech-for-beginners`;

export const metadata: Metadata = {
  title: "Czech for Beginners: Learn Czech from Zero | Flunio",
  description:
    "Learn Czech from zero with a practical beginner roadmap: pronunciation, first words, useful phrases, grammar order and a simple 30-day study plan.",

  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      ru: `${SITE_URL}/ru/czech-for-beginners`,
      "x-default": PAGE_URL,
    },
  },

  openGraph: {
    title: "Czech for Beginners: A Step-by-Step Guide | Flunio",
    description:
      "A practical Czech beginner guide with a first-week plan, 30-day roadmap, useful phrases, pronunciation and grammar foundations.",
    url: PAGE_URL,
    siteName: "Flunio",
    type: "article",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Czech for Beginners: A Step-by-Step Guide | Flunio",
    description:
      "Start Czech in the right order with a first-week plan, useful phrases, pronunciation and grammar foundations.",
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
    q: "What should I learn first in Czech as a complete beginner?",
    a: "Start with Czech pronunciation, greetings, personal information, numbers, common verbs and short sentence patterns. Learn useful words inside phrases instead of memorizing isolated vocabulary.",
  },
  {
    q: "Can I learn Czech from zero online?",
    a: "Yes. A beginner can learn Czech online with a structured A0 path, regular listening, short daily lessons and spaced review. The important part is following a clear order instead of jumping between unrelated grammar topics.",
  },
  {
    q: "Is Czech difficult for English speakers?",
    a: "Czech is more demanding than many Western European languages because it uses seven cases, grammatical gender and changing word endings. However, beginners do not need to master the full system immediately. Everyday phrases and common patterns can be learned step by step.",
  },
  {
    q: "How many Czech words should I learn first?",
    a: "A practical first target is 100 high-frequency words across greetings, people, home, food, transport, work, time, numbers and common verbs. They become much more useful when learned inside short phrases.",
  },
  {
    q: "How long should I study Czech every day?",
    a: "Ten to twenty focused minutes per day is enough to build a strong beginner habit. A useful session can include one short lesson, several minutes of listening and a quick vocabulary review.",
  },
  {
    q: "When should a Czech beginner start learning cases?",
    a: "Learn what cases do early, but do not begin by memorizing every ending in every table. Start with common phrases and gradually notice how endings change after frequent verbs and prepositions.",
  },
] as const;

const firstWeek = [
  {
    day: "Day 1",
    title: "Hear the language",
    text: "Listen to the Czech alphabet and the sounds č, š, ž, ř, ě and long vowels. Learn ahoj, dobrý den, prosím and děkuji.",
  },
  {
    day: "Day 2",
    title: "Introduce yourself",
    text: "Learn já, ty, jméno, člověk, muž, žena and phrases such as Jmenuji se… and Jsem z…",
  },
  {
    day: "Day 3",
    title: "Use být and mít",
    text: "Practice the two most useful beginner verbs in simple patterns: Jsem…, Nejsem…, Mám… and Nemám…",
  },
  {
    day: "Day 4",
    title: "Learn numbers and time",
    text: "Study numbers 1–20, basic time words and simple questions such as Kolik? and V kolik?",
  },
  {
    day: "Day 5",
    title: "Handle everyday situations",
    text: "Learn useful words for a shop, café and transport: obchod, voda, káva, autobus, vlak, zastávka.",
  },
  {
    day: "Day 6",
    title: "Build survival phrases",
    text: "Practice Potřebuji…, Chci…, Hledám…, Nerozumím and Můžete mi pomoct?",
  },
  {
    day: "Day 7",
    title: "Review actively",
    text: "Repeat difficult words aloud, rebuild phrases from memory and review everything without adding a large new topic.",
  },
] as const;

const roadmap = [
  {
    period: "Days 1–7",
    title: "Pronunciation and survival Czech",
    text: "Learn how Czech sounds, basic greetings, numbers, personal information and phrases for asking for help.",
  },
  {
    period: "Days 8–14",
    title: "Everyday vocabulary",
    text: "Add words for home, food, transport, work, study and common daily actions. Continue listening every day.",
  },
  {
    period: "Days 15–21",
    title: "Verbs and sentence patterns",
    text: "Practice být, mít, dělat, jít, jet, chtít, potřebovat, mluvit and rozumět inside short sentences.",
  },
  {
    period: "Days 22–30",
    title: "Grammar foundations",
    text: "Learn grammatical gender, present-tense patterns and the purpose of Czech cases through practical examples.",
  },
] as const;

const starterPhrases = [
  ["Dobrý den.", "Hello / Good day."],
  ["Jmenuji se…", "My name is…"],
  ["Jsem z…", "I am from…"],
  ["Nerozumím.", "I do not understand."],
  ["Mluvte prosím pomaleji.", "Please speak more slowly."],
  ["Můžete mi pomoct?", "Can you help me?"],
  ["Kolik to stojí?", "How much does it cost?"],
  ["Kde je zastávka?", "Where is the stop?"],
  ["Potřebuji…", "I need…"],
  ["Hledám…", "I am looking for…"],
] as const;

const vocabularyGroups = [
  {
    title: "Greetings and politeness",
    words: "ahoj, dobrý den, na shledanou, prosím, děkuji, promiňte",
  },
  {
    title: "People and identity",
    words: "já, ty, on, ona, člověk, muž, žena, dítě, rodina, kamarád",
  },
  {
    title: "Home and daily life",
    words: "dům, byt, pokoj, dveře, stůl, voda, jídlo, ráno, večer",
  },
  {
    title: "City and transport",
    words: "město, ulice, obchod, zastávka, autobus, vlak, auto, cesta",
  },
  {
    title: "Common verbs",
    words: "být, mít, dělat, jít, jet, chtít, potřebovat, mluvit, rozumět",
  },
  {
    title: "Questions and useful words",
    words: "kdo, co, kde, kdy, proč, jak, kolik, ano, ne, tady",
  },
] as const;

const mistakes = [
  {
    title: "Starting with complete case tables",
    text: "Cases matter, but a beginner benefits more from understanding their purpose and learning frequent examples before memorizing every ending.",
  },
  {
    title: "Ignoring vowel length",
    text: "Czech á, é, í, ó, ú, ů and ý are not decorative marks. Vowel length affects pronunciation and can distinguish words.",
  },
  {
    title: "Trying to pronounce ř perfectly on day one",
    text: "The Czech ř takes time. Listen to it and practise gently, but do not let one sound stop you from speaking.",
  },
  {
    title: "Learning nouns without context",
    text: "A word is easier to remember inside a useful phrase. Learn obchod together with Jdu do obchodu, not only as an isolated translation.",
  },
  {
    title: "Translating English word order directly",
    text: "Czech word order is flexible, but emphasis changes. Start with reliable sentence patterns and copy natural examples.",
  },
  {
    title: "Avoiding speech until grammar is perfect",
    text: "You can communicate with short, imperfect sentences. Waiting for perfect grammar slows down active vocabulary.",
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
      name: "Czech for Beginners: A Step-by-Step Guide to Learning Czech",
      description:
        "A practical Czech beginner roadmap covering pronunciation, first words, useful phrases, grammar order and a 30-day study plan.",
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Flunio",
      },
      about: {
        "@type": "Language",
        name: "Czech",
        alternateName: "čeština",
      },
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
          name: "Czech for beginners",
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
        id="czech-for-beginners-structured-data"
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
            Czech for beginners
          </li>
        </ol>
      </nav>

      <article className="space-y-10">
        <header className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-9">
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative max-w-4xl space-y-5">
            <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide">
              Czech beginner guide · A0 roadmap
            </div>

            <h1 className="text-3xl font-black leading-tight tracking-tight theme-text sm:text-5xl">
              Czech for beginners: how to start learning Czech from zero
            </h1>

            <p className="max-w-3xl text-lg leading-8 theme-text-muted">
              Start Czech in the right order: pronunciation first, useful words
              and phrases next, then verbs and grammar in manageable pieces.
              This guide gives you a practical first-week plan, a 30-day roadmap
              and the exact topics worth learning at A0.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/register" className={primaryButton}>
                Create a free account
              </Link>

              <a href="#first-7-days" className={secondaryButton}>
                See the 7-day plan
              </a>
            </div>

            <p className="max-w-3xl text-sm leading-6 theme-text-muted">
              After registration, open the course selector on the learning page
              and choose <strong className="theme-text">Czech</strong>. Flunio
              keeps the selected course for your lessons and vocabulary.
            </p>
          </div>
        </header>

        <section
          aria-label="Page contents"
          className={`${card} p-5 sm:p-6`}
        >
          <p className="font-bold theme-text">In this guide</p>

          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {[
              ["What to learn first", "#what-to-learn-first"],
              ["Your first 7 days", "#first-7-days"],
              ["A 30-day Czech plan", "#thirty-day-plan"],
              ["First phrases", "#first-czech-phrases"],
              ["First 100 words", "#first-100-words"],
              ["Pronunciation basics", "#pronunciation"],
              ["Grammar order", "#grammar-order"],
              ["Beginner mistakes", "#beginner-mistakes"],
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
          id="what-to-learn-first"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="Start here"
            title="What should a Czech beginner learn first?"
            description="The fastest route is not a giant grammar table. Build a small practical system in which every new sound, word and rule immediately helps you understand or say something."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                n: "01",
                title: "Czech sounds and spelling",
                text: "Learn how č, š, ž, ř, ě and long vowels sound. Czech spelling is relatively consistent, so pronunciation work pays off early.",
              },
              {
                n: "02",
                title: "Survival vocabulary",
                text: "Prioritise greetings, numbers, people, food, transport, work, time, directions and words used in common questions.",
              },
              {
                n: "03",
                title: "Reusable sentence patterns",
                text: "Practise Jsem…, Mám…, Chci…, Potřebuji…, Hledám… and Kde je…? before trying to create complex sentences.",
              },
              {
                n: "04",
                title: "High-frequency verbs",
                text: "Start with být, mít, dělat, jít, jet, chtít, potřebovat, mluvit and rozumět.",
              },
              {
                n: "05",
                title: "Grammar with examples",
                text: "Learn gender, present tense and cases through real phrases. A rule is easier to remember when it explains language you already use.",
              },
              {
                n: "06",
                title: "Daily review",
                text: "Review old material before adding too much new vocabulary. Short active recall is more useful than repeatedly rereading a list.",
              },
            ].map((item) => (
              <div key={item.n} className={`${softCard} p-5`}>
                <div className="text-xs font-black tracking-[0.2em] theme-accent-text">
                  {item.n}
                </div>

                <h3 className="mt-2 text-lg font-bold theme-text">
                  {item.title}
                </h3>

                <p className="mt-2 leading-7 theme-text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="first-7-days"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="Week one"
            title="Your first 7 days of learning Czech"
            description="The goal of the first week is not fluency. It is to understand how Czech sounds, remember a small group of high-value phrases and prove that you can study consistently."
          />

          <div className="grid gap-4">
            {firstWeek.map((item) => (
              <div
                key={item.day}
                className={`${softCard} grid gap-2 p-5 sm:grid-cols-[100px_1fr] sm:gap-5`}
              >
                <div className="font-black theme-accent-text">{item.day}</div>

                <div>
                  <h3 className="font-bold theme-text">{item.title}</h3>

                  <p className="mt-1 leading-7 theme-text-muted">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={`${softCard} p-5`}>
            <h3 className="font-bold theme-text">
              A realistic daily routine
            </h3>

            <p className="mt-2 leading-7 theme-text-muted">
              Spend about 10–20 minutes: one short lesson, several minutes of
              listening and pronunciation, then a quick review without looking
              at the answers. Consistency matters more than a single long study
              session.
            </p>
          </div>
        </section>

        <section
          id="thirty-day-plan"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="First month"
            title="A simple 30-day Czech study plan"
            description="Use the first month to create a foundation. Do not measure progress only by the number of words learned; measure whether you can recognise, recall and use them."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {roadmap.map((item) => (
              <div key={item.period} className={`${softCard} p-5`}>
                <p className="text-sm font-black theme-accent-text">
                  {item.period}
                </p>

                <h3 className="mt-2 text-lg font-bold theme-text">
                  {item.title}
                </h3>

                <p className="mt-2 leading-7 theme-text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Daily", "10–20 minutes of focused learning"],
              [
                "Weekly",
                "One review day with little or no new material",
              ],
              [
                "By day 30",
                "Basic A0 phrases, common verbs and a clear next step",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className={`${softCard} p-5 text-center`}
              >
                <div className="font-black theme-accent-text">{title}</div>

                <p className="mt-2 text-sm leading-6 theme-text-muted">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="first-czech-phrases"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="Speak early"
            title="10 Czech phrases every beginner should know"
            description="These patterns are useful because you can replace one word and create many new sentences."
          />

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-2 gap-4 border-b border-white/10 px-4 py-3 text-sm font-bold theme-text">
              <div>Czech</div>
              <div>English</div>
            </div>

            {starterPhrases.map(([cs, en]) => (
              <div
                key={cs}
                className="grid grid-cols-2 gap-4 border-b border-white/10 px-4 py-3 last:border-b-0"
              >
                <div lang="cs" className="font-semibold theme-text">
                  {cs}
                </div>

                <div className="theme-text-muted">{en}</div>
              </div>
            ))}
          </div>

          <p className="leading-7 theme-text-muted">
            Do not only read the phrases. Cover the English column, recall the
            meaning, then say the Czech phrase aloud. Replace the final word to
            create your own examples.
          </p>

          <Link
            href="/czech-words-with-audio"
            className={secondaryButton}
          >
            Learn Czech pronunciation with audio
          </Link>
        </section>

        <section
          id="first-100-words"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="Vocabulary"
            title="Which first 100 Czech words should you learn?"
            description="Choose frequent words that connect to daily situations. A themed core vocabulary is easier to review and immediately useful in lessons and conversations."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {vocabularyGroups.map((group) => (
              <div key={group.title} className={`${softCard} p-5`}>
                <h3 className="font-bold theme-accent-text">
                  {group.title}
                </h3>

                <p lang="cs" className="mt-2 leading-7 theme-text-muted">
                  {group.words}
                </p>
              </div>
            ))}
          </div>

          <div className={`${softCard} p-5`}>
            <h3 className="font-bold theme-text">
              Learn words as small language blocks
            </h3>

            <p className="mt-2 leading-7 theme-text-muted">
              Instead of memorising only <span lang="cs">obchod</span>, learn{" "}
              <span lang="cs">Jdu do obchodu</span>. Instead of only{" "}
              <span lang="cs">pomoc</span>, learn{" "}
              <span lang="cs">Potřebuji pomoc</span>. Context improves recall
              and introduces grammar naturally.
            </p>
          </div>

          <Link href="/czech-vocabulary" className={secondaryButton}>
            Explore Czech vocabulary by topic
          </Link>
        </section>

        <section
          id="pronunciation"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="Pronunciation"
            title="Czech pronunciation basics for beginners"
            description="Czech spelling is systematic, but several sounds and diacritics need deliberate listening. Begin with accuracy, not speed."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Č, š and ž",
                text: "These are similar to the sounds in English church, shoe and measure. Practise them inside complete words.",
              },
              {
                title: "Ř",
                text: "This sound is strongly associated with Czech and usually takes time. Listen regularly, but keep speaking even before it is perfect.",
              },
              {
                title: "Ě",
                text: "The letter ě changes the pronunciation of the consonant before it. Learn it through frequent words such as město and děti.",
              },
              {
                title: "Long vowels",
                text: "The marks in á, é, í, ó, ú, ů and ý show vowel length. Hold the vowel longer instead of adding extra stress.",
              },
              {
                title: "Stress",
                text: "Czech stress usually falls on the first syllable. Long vowels may appear elsewhere, so vowel length and stress are different.",
              },
              {
                title: "Listen before repeating",
                text: "Hear the full word first, then repeat it slowly. Comparing your version with the recording helps prevent persistent mistakes.",
              },
            ].map((item) => (
              <div key={item.title} className={`${softCard} p-5`}>
                <h3 className="font-bold theme-accent-text">
                  {item.title}
                </h3>

                <p className="mt-2 leading-7 theme-text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="grammar-order"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="Grammar"
            title="The best order for learning Czech grammar"
            description="Czech grammar becomes manageable when each topic answers a question that appeared in vocabulary or a real sentence."
          />

          <ol className="grid gap-4">
            {[
              [
                "1. Personal pronouns and the verb být",
                "Learn basic forms such as jsem, jsi, je and nejsme inside introductions and descriptions.",
              ],
              [
                "2. Grammatical gender",
                "Recognise masculine, feminine and neuter nouns because gender affects adjectives, pronouns and some verb forms.",
              ],
              [
                "3. Present-tense verb patterns",
                "Study a few common verbs at a time and compare recurring endings instead of memorising every possible verb.",
              ],
              [
                "4. Accusative in everyday phrases",
                "Use it with practical verbs such as mít, chtít, potřebovat and hledat before studying the full case system.",
              ],
              [
                "5. Location and movement",
                "Learn frequent preposition-and-case combinations through phrases about where something is and where someone is going.",
              ],
              [
                "6. Expand the case system gradually",
                "Add cases through useful contexts: possession, giving, speaking about someone, location and movement.",
              ],
            ].map(([title, text]) => (
              <li key={title} className={`${softCard} p-5`}>
                <h3 className="font-bold theme-accent-text">{title}</h3>

                <p className="mt-2 leading-7 theme-text-muted">
                  {text}
                </p>
              </li>
            ))}
          </ol>

          <Link href="/czech-grammar" className={secondaryButton}>
            Open the Czech grammar guide
          </Link>
        </section>

        <section
          id="beginner-mistakes"
          className={`${card} space-y-6 p-6 sm:p-8`}
        >
          <SectionHeading
            eyebrow="Avoid these"
            title="Common mistakes when learning Czech from zero"
            description="Most beginner problems come from an inefficient learning order, not from a lack of talent."
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
            title="Turn this roadmap into daily Czech practice"
            description="Use this page as your map, then practise the language in small lessons. On Flunio, select Czech as your active course before opening the lesson path."
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/register" className={primaryButton}>
              Create an account and choose Czech
            </Link>

            <Link href="/learn-czech" className={secondaryButton}>
              Explore the complete Czech course
            </Link>

            <Link href="/czech-vocabulary" className={secondaryButton}>
              Study Czech vocabulary by topic
            </Link>

            <Link href="/czech-grammar" className={secondaryButton}>
              Learn Czech grammar step by step
            </Link>

            <Link
              href="/czech-words-with-audio"
              className={secondaryButton}
            >
              Practise Czech words with audio
            </Link>

            <Link href="/dictionary" className={secondaryButton}>
              Search the Czech dictionary
            </Link>
          </div>
        </section>

        <section id="faq" className={`${card} space-y-6 p-6 sm:p-8`}>
          <SectionHeading
            eyebrow="FAQ"
            title="Czech for beginners: frequently asked questions"
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