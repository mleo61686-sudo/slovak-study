import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
    title: "Czech Words with Audio: Listen and Learn Vocabulary | Flunio",
    description:
        "Learn Czech words with audio in Flunio. Listen to pronunciation, practice basic vocabulary, repeat words and build your Czech step by step.",

    alternates: {
        canonical: `${SITE_URL}/czech-words-with-audio`,
    },

    openGraph: {
        title: "Czech Words with Audio | Flunio",
        description:
            "Listen to Czech words, learn pronunciation and practice useful vocabulary with Flunio lessons.",
        url: `${SITE_URL}/czech-words-with-audio`,
        siteName: "Flunio",
        type: "website",
    },

    robots: { index: true, follow: true },
};

const FAQ = [
    {
        q: "Can I learn Czech words with audio in Flunio?",
        a: "Yes. Flunio includes Czech vocabulary lessons with audio so you can listen to pronunciation, repeat words and practice them in exercises.",
    },
    {
        q: "Why is audio important when learning Czech words?",
        a: "Audio helps you connect spelling with pronunciation. This is important in Czech because learners need to hear long vowels, soft sounds and letters such as ř, č, š and ž.",
    },
    {
        q: "Should beginners learn Czech vocabulary with audio?",
        a: "Yes. Beginners should listen to words from the start because pronunciation habits are easier to build early than to fix later.",
    },
    {
        q: "How many Czech words should I learn per day?",
        a: "A good starting point is 10–20 words per day with audio, repetition and short practice exercises.",
    },
];

const audioTopics = [
    {
        title: "Everyday Czech words",
        text: "Start with simple words for people, home, food, transport, time and daily situations. These words appear often and are useful in real conversations.",
        examples: ["dům", "voda", "město", "práce", "čas"],
    },
    {
        title: "Czech pronunciation practice",
        text: "Listening helps you notice sounds that are difficult to guess from spelling alone, especially ř, č, š, ž, ě and long vowels.",
        examples: ["řeka", "čaj", "škola", "žena", "dobrý"],
    },
    {
        title: "Words and short phrases",
        text: "Vocabulary becomes stronger when you hear words inside short phrases. This helps you remember meaning, rhythm and natural usage.",
        examples: ["Dobrý den", "Děkuji", "Jsem doma", "Mám čas"],
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

    return (
        <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 theme-text">
            <Script
                id="faq-schema-czech-words-with-audio"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <section className={`${card} space-y-4 p-8`}>
                <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
                    Czech words with audio
                </h1>

                <p className="theme-text-muted">
                    Learning Czech words is much easier when you can hear them. Audio helps
                    you connect written vocabulary with real pronunciation, repeat words
                    correctly and remember them better. In Flunio, you can learn Czech
                    vocabulary through short lessons, audio and practice exercises.
                </p>

                <p className="theme-text-muted">
                    This page is for beginners who want to build Czech vocabulary with
                    pronunciation from the start. You can begin with basic A0–A1 words,
                    listen to them, repeat them aloud and then review them in exercises.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                    <Link href="/learning/a0-1" className={primaryButton}>
                        Start Czech lessons →
                    </Link>

                    <Link href="/czech-for-beginners" className={secondaryButton}>
                        Czech for beginners
                    </Link>

                    <Link href="/czech-vocabulary" className={secondaryButton}>
                        Czech vocabulary
                    </Link>

                    <Link href="/learn-czech" className={secondaryButton}>
                        Learn Czech online
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
                                <span
                                    key={word}
                                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-bold theme-text shadow-sm theme-simple:border-slate-300 theme-simple:bg-slate-100 theme-simple:text-slate-950"
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            <section className={`${card} space-y-4 p-6`}>
                <h2 className="text-2xl font-bold theme-text">
                    Why learn Czech vocabulary with audio?
                </h2>

                <p className="theme-text-muted">
                    Czech spelling is more regular than English, but pronunciation still
                    needs practice. If you only read word lists, you may remember the
                    meaning but pronounce words incorrectly. Audio gives you a model to
                    copy and helps you build listening habits from the beginning.
                </p>

                <ul className="list-disc space-y-2 pl-5 theme-text-muted">
                    <li>You hear how Czech words actually sound.</li>
                    <li>You notice long and short vowels more easily.</li>
                    <li>You can repeat words aloud after listening.</li>
                    <li>You connect vocabulary with listening practice.</li>
                    <li>You build better pronunciation habits from A0.</li>
                </ul>

                <div className="flex flex-wrap gap-3 pt-2">
                    <Link href="/czech-vocabulary" className={secondaryButton}>
                        Learn basic Czech vocabulary →
                    </Link>

                    <Link href="/czech-grammar" className={secondaryButton}>
                        Czech grammar guide →
                    </Link>
                </div>
            </section>

            <section className={`${card} space-y-4 p-6`}>
                <h2 className="text-2xl font-bold theme-text">
                    How audio fits into a Czech beginner roadmap
                </h2>

                <p className="theme-text-muted">
                    Beginners should not learn Czech only from written word lists. Audio
                    should come early, together with pronunciation, first words and short
                    phrases. This helps you avoid building bad pronunciation habits and
                    makes vocabulary easier to remember.
                </p>

                <p className="theme-text-muted">
                    If you are starting from zero, the beginner roadmap explains what to
                    learn in the first 7 days, how to plan the first 30 days and how to
                    choose the first 100 useful Czech words.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                    <Link href="/czech-for-beginners" className={primaryButton}>
                        Open Czech beginner roadmap →
                    </Link>

                    <Link href="/learn-czech" className={secondaryButton}>
                        Full Czech course →
                    </Link>
                </div>
            </section>

            <section className={`${card} space-y-4 p-6`}>
                <h2 className="text-2xl font-bold theme-text">
                    Czech sounds beginners should hear early
                </h2>

                <p className="theme-text-muted">
                    Some Czech sounds are difficult to understand from text only. Learners
                    should hear them many times in real words and short phrases. This is
                    especially true for letters and combinations such as ř, č, š, ž, ě,
                    ou and long vowels like á, é, í, ó, ú and ý.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                    <div className={`${softCard} p-4`}>
                        <h3 className="font-semibold theme-text">Soft and sharp sounds</h3>
                        <p className="mt-2 theme-text-muted">
                            Words with č, š, ž and ř are much easier to learn when you hear
                            them instead of only reading them.
                        </p>
                    </div>

                    <div className={`${softCard} p-4`}>
                        <h3 className="font-semibold theme-text">Long vowels</h3>
                        <p className="mt-2 theme-text-muted">
                            Czech uses long vowels, and the difference can matter. Audio helps
                            you feel the rhythm of the word.
                        </p>
                    </div>
                </div>
            </section>

            <section className={`${card} space-y-4 p-6`}>
                <h2 className="text-2xl font-bold theme-text">
                    How to practice Czech words with audio
                </h2>

                <p className="theme-text-muted">
                    The best method is simple: listen, repeat, check meaning and review.
                    Do not try to memorize too many words at once. A small group of words
                    with audio and exercises is more useful than a long list you read only
                    once.
                </p>

                <ol className="list-decimal space-y-2 pl-5 theme-text-muted">
                    <li>Choose a short Czech lesson.</li>
                    <li>Listen to each word carefully.</li>
                    <li>Repeat the word aloud after the audio.</li>
                    <li>Check the meaning and example usage.</li>
                    <li>Complete vocabulary exercises.</li>
                    <li>Return to older words later for review.</li>
                </ol>

                <div className="flex flex-wrap gap-3 pt-2">
                    <Link href="/learning/a0-1" className={primaryButton}>
                        Start with the first lesson →
                    </Link>

                    <Link href="/czech-vocabulary" className={secondaryButton}>
                        Czech word list →
                    </Link>
                </div>
            </section>

            <section className={`${card} space-y-4 p-6`}>
                <h2 className="text-2xl font-bold theme-text">
                    Learn Czech words, then use them
                </h2>

                <p className="theme-text-muted">
                    Audio is only one part of learning. After you hear and repeat a Czech
                    word, you need to use it in practice. Flunio connects vocabulary with
                    lessons, dictionary search and exercises so that words do not stay as
                    isolated items in a list.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                    <Link href="/czech-for-beginners" className={secondaryBlock}>
                        Czech for beginners →
                    </Link>

                    <Link href="/czech-vocabulary" className={secondaryBlock}>
                        Czech vocabulary →
                    </Link>

                    <Link href="/czech-grammar" className={secondaryBlock}>
                        Czech grammar →
                    </Link>

                    <Link href="/learn-czech" className={secondaryBlock}>
                        Learn Czech online →
                    </Link>

                    <Link href="/practice" className={secondaryBlock}>
                        Practice Czech →
                    </Link>

                    <Link href="/learning/a0-1" className={secondaryBlock}>
                        Start A0 lesson →
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