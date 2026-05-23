import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://flunio.com";

export const metadata: Metadata = {
    title: "Czech Vocabulary for Beginners: Basic Words by Topic | Flunio",
    description:
        "Learn basic Czech vocabulary for beginners: greetings, family, home, food, transport, work, common verbs and useful words with Flunio lessons.",

    alternates: {
        canonical: `${SITE_URL}/czech-vocabulary`,
    },

    openGraph: {
        title: "Czech Vocabulary for Beginners | Flunio",
        description:
            "Basic Czech words by topic for beginners: greetings, home, food, transport, work, verbs and useful vocabulary.",
        url: `${SITE_URL}/czech-vocabulary`,
        siteName: "Flunio",
        type: "website",
    },

    robots: { index: true, follow: true },
};

const FAQ = [
    {
        q: "What Czech vocabulary should beginners learn first?",
        a: "Start with greetings, numbers, family, food, home, transport, time, common verbs and everyday words you can use in simple sentences.",
    },
    {
        q: "How many Czech words do I need for basic communication?",
        a: "For simple everyday communication, 500–1000 common words can be enough if you also learn how to use them in short sentences.",
    },
    {
        q: "How can I remember Czech words better?",
        a: "Learn words in small groups, listen to pronunciation, repeat them aloud, use them in short phrases and review them regularly.",
    },
];

const sections = [
    {
        title: "Greetings and polite words",
        words: [
            ["Ahoj", "hi / hello"],
            ["Dobrý den", "good day"],
            ["Dobrý večer", "good evening"],
            ["Děkuji", "thank you"],
            ["Prosím", "please / here you are"],
            ["Promiňte", "excuse me / sorry"],
            ["Ano", "yes"],
            ["Ne", "no"],
        ],
    },
    {
        title: "People and family",
        words: [
            ["člověk", "person"],
            ["muž", "man"],
            ["žena", "woman"],
            ["dítě", "child"],
            ["rodina", "family"],
            ["máma", "mom"],
            ["otec", "father"],
            ["přítel", "friend / boyfriend"],
        ],
    },
    {
        title: "Home and everyday life",
        words: [
            ["dům", "house"],
            ["byt", "apartment"],
            ["pokoj", "room"],
            ["kuchyně", "kitchen"],
            ["dveře", "door"],
            ["okno", "window"],
            ["postel", "bed"],
            ["stůl", "table"],
        ],
    },
    {
        title: "Food and drinks",
        words: [
            ["chléb", "bread"],
            ["voda", "water"],
            ["káva", "coffee"],
            ["čaj", "tea"],
            ["mléko", "milk"],
            ["maso", "meat"],
            ["rýže", "rice"],
            ["polévka", "soup"],
        ],
    },
    {
        title: "Transport and city",
        words: [
            ["auto", "car"],
            ["autobus", "bus"],
            ["vlak", "train"],
            ["zastávka", "stop"],
            ["cesta", "road / way"],
            ["ulice", "street"],
            ["město", "city"],
            ["obchod", "shop"],
        ],
    },
    {
        title: "Work and study",
        words: [
            ["práce", "work"],
            ["škola", "school"],
            ["učitel", "teacher"],
            ["student", "student"],
            ["kolega", "colleague"],
            ["firma", "company"],
            ["peníze", "money"],
            ["čas", "time"],
        ],
    },
    {
        title: "Basic Czech verbs",
        words: [
            ["být", "to be"],
            ["mít", "to have"],
            ["jít", "to go"],
            ["dělat", "to do / to make"],
            ["vědět", "to know"],
            ["chtít", "to want"],
            ["vidět", "to see"],
            ["mluvit", "to speak"],
        ],
    },
    {
        title: "Useful adjectives",
        words: [
            ["dobrý", "good"],
            ["špatný", "bad"],
            ["velký", "big"],
            ["malý", "small"],
            ["nový", "new"],
            ["starý", "old"],
            ["rychlý", "fast"],
            ["důležitý", "important"],
        ],
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
                id="faq-schema-czech-vocabulary"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <section className={`${card} space-y-4 p-8`}>
                <h1 className="text-3xl font-extrabold theme-text sm:text-4xl">
                    Czech vocabulary for beginners
                </h1>

                <p className="theme-text-muted">
                    If you are starting to learn Czech, the best first step is to build a
                    useful base of everyday words. Basic Czech vocabulary helps you
                    understand simple phrases, create your first sentences and feel more
                    confident when you move to grammar and listening practice.
                </p>

                <p className="theme-text-muted">
                    Below you will find Czech words by topic: greetings, people, home,
                    food, transport, work, common verbs and adjectives. This is a practical
                    starting point for A0–A1 learners.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                    <Link href="/learning/a0-1" className={primaryButton}>
                        Start Czech lessons →
                    </Link>

                    <Link href="/learn-czech" className={secondaryButton}>
                        Learn Czech online
                    </Link>

                    <Link href="/czech-for-beginners" className={secondaryButton}>
                        Czech for beginners
                    </Link>

                    <Link href="/dictionary" className={secondaryButton}>
                        Open dictionary
                    </Link>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
                {sections.map((section) => (
                    <div key={section.title} className={`${card} p-5`}>
                        <h2 className="text-lg font-bold theme-text">{section.title}</h2>

                        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 theme-simple:border-slate-200">
                            <table className="w-full text-sm">
                                <thead className="bg-white/5 text-left theme-text-muted theme-simple:bg-slate-50">
                                    <tr>
                                        <th className="px-3 py-2 font-semibold">Czech</th>
                                        <th className="px-3 py-2 font-semibold">English</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {section.words.map(([cs, en]) => (
                                        <tr
                                            key={cs}
                                            className="border-t border-white/10 theme-simple:border-slate-200"
                                        >
                                            <td className="px-3 py-2 font-medium theme-text">{cs}</td>
                                            <td className="px-3 py-2 theme-text-muted">{en}</td>
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
                    How to learn Czech vocabulary effectively
                </h2>

                <p className="theme-text-muted">
                    Do not try to memorize a huge list of Czech words in one sitting. It
                    is better to learn small groups of words, listen to pronunciation,
                    repeat them aloud and use them in short phrases. Czech becomes easier
                    when vocabulary is connected to real situations.
                </p>

                <ul className="list-disc space-y-2 pl-5 theme-text-muted">
                    <li>Learn 10–20 new words at a time.</li>
                    <li>Group words by topic: home, food, work, transport.</li>
                    <li>Repeat older words regularly.</li>
                    <li>Use new vocabulary in simple sentences.</li>
                    <li>Combine vocabulary with listening and exercises.</li>
                </ul>

                <div className="flex flex-wrap gap-3 pt-2">
                    <Link href="/learning" className={primaryButton}>
                        Learn words in Flunio →
                    </Link>

                    <Link href="/czech-words-with-audio" className={secondaryButton}>
                        Practice Czech words with audio →
                    </Link>
                </div>
            </section>

            <section className={`${card} space-y-4 p-6`}>
                <h2 className="text-2xl font-bold theme-text">
                    How this vocabulary fits into a beginner Czech roadmap
                </h2>

                <p className="theme-text-muted">
                    Vocabulary works best when it has a clear order. If you are starting
                    from zero, first learn pronunciation, greetings, daily words and simple
                    sentence patterns. Then connect these words with basic verbs and Czech
                    grammar.
                </p>

                <p className="theme-text-muted">
                    The beginner roadmap explains what to learn in your first 7 days, how
                    to organize the first 30 days and which first 100 Czech words are most
                    useful.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                    <Link href="/czech-for-beginners" className={primaryButton}>
                        Open Czech beginner roadmap →
                    </Link>

                    <Link href="/czech-grammar" className={secondaryButton}>
                        Czech grammar guide →
                    </Link>
                </div>
            </section>

            <section className={`${card} space-y-4 p-6`}>
                <h2 className="text-2xl font-bold theme-text">
                    Common mistakes when learning Czech words
                </h2>

                <div className="space-y-3 theme-text-muted">
                    <p>
                        <strong className="theme-text">1. Learning words without context.</strong>{" "}
                        It is easier to remember a word when you also learn a short example
                        phrase.
                    </p>

                    <p>
                        <strong className="theme-text">2. Ignoring pronunciation.</strong>{" "}
                        Czech spelling is quite regular, but pronunciation still needs
                        practice, especially long vowels and sounds such as ř, č, š and ž.
                    </p>

                    <p>
                        <strong className="theme-text">3. Learning too many words at once.</strong>{" "}
                        A smaller list with regular review is usually more useful than a
                        large list you read only once.
                    </p>

                    <p>
                        <strong className="theme-text">4. Not using words actively.</strong>{" "}
                        Try to use new Czech words in questions, answers and simple
                        sentences as soon as possible.
                    </p>
                </div>
            </section>

            <section className={`${card} space-y-4 p-6`}>
                <h2 className="text-2xl font-bold theme-text">
                    What to learn after basic Czech vocabulary
                </h2>

                <p className="theme-text-muted">
                    After you know your first Czech words, continue with short phrases,
                    basic questions and simple sentence patterns. This helps you use
                    vocabulary instead of only recognizing it.
                </p>

                <p className="theme-text-muted">
                    The next step is to connect vocabulary with grammar: verbs, word order,
                    cases and common sentence structures. Flunio helps you combine lessons,
                    dictionary search and practice in one place.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                    <Link href="/learn-czech" className={secondaryBlock}>
                        Learn Czech online →
                    </Link>

                    <Link href="/czech-for-beginners" className={secondaryBlock}>
                        Czech for beginners →
                    </Link>

                    <Link href="/czech-grammar" className={secondaryBlock}>
                        Czech grammar guide →
                    </Link>

                    <Link href="/czech-words-with-audio" className={secondaryBlock}>
                        Czech words with audio →
                    </Link>

                    <Link href="/dictionary" className={secondaryBlock}>
                        Open Czech dictionary →
                    </Link>

                    <Link href="/practice" className={secondaryBlock}>
                        Practice vocabulary →
                    </Link>

                    <Link href="/learning/a0-1" className={secondaryBlock}>
                        Start the first lesson →
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