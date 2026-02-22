import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://slovak-study.com";

export const metadata: Metadata = {
    title: "Вивчення словацької мови онлайн — курс A0–B2, вправи, словник | Slovak Study",
    description:
        "Вивчення словацької мови онлайн для українців: уроки A0–B2, вправи, озвучка, словник та граматика. Почни з нуля і відстежуй прогрес.",
    alternates: {
        canonical: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
        languages: {
            uk: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
            ru: `${SITE_URL}/ru/vyvchennia-slovatskoi-movy-online`,
        },
    },
    openGraph: {
        title: "Вивчення словацької мови онлайн | Slovak Study",
        description:
            "Онлайн-курс словацької: A0–B2, вправи, словник, граматика та прогрес. Почни навчання з нуля.",
        url: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
        siteName: "Slovak Study",
        type: "website",
    },
};

const FAQ = [
    {
        q: "Чи підходить Slovak Study для навчання словацької онлайн з нуля?",
        a: "Так. Почни з A0: короткі уроки по 10 слів, озвучка та вправи. Далі — A1 і A2 з поступовим ускладненням.",
    },
    {
        q: "Скільки часу потрібно займатись щодня?",
        a: "Достатньо 10–20 хвилин на день. Головне — регулярність: слова + короткі вправи + повторення.",
    },
    {
        q: "Чи є тут словник і граматика?",
        a: "Так. Є словник з пошуком і озвучкою, а також граматика з прикладами, щоб закривати прогалини під час навчання.",
    },
    {
        q: "Чи зберігається прогрес?",
        a: "Так. Прогрес уроків зберігається, щоб ти бачив, що вже пройшов і що повторити.",
    },
    {
        q: "Чим онлайн-формат кращий за підручник?",
        a: "Ти одразу тренуєшся: вибір відповіді, введення слова, аудіо-вправи, пари та складання речень — це швидше дає результат.",
    },
];

export default function Page() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    };

    return (
        <main className="mx-auto max-w-4xl px-4 py-10 space-y-10">
            <Script
                id="faq-schema-online-uk"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <section className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold">
                    Вивчення словацької мови онлайн — курс A0–B2
                </h1>
                <p className="text-slate-700">
                    Slovak Study — онлайн-тренажер для українців: короткі уроки, озвучка, вправи, словник і граматика.
                    Підійде для життя та роботи у Словаччині: вчишся системно і бачиш прогрес.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                    <Link className="px-4 py-2 rounded-xl bg-black text-white" href="/learning">
                        Почати навчання
                    </Link>
                    <Link className="px-4 py-2 rounded-xl border" href="/learning/a0">
                        Старт з A0 →
                    </Link>
                    <Link className="px-4 py-2 rounded-xl border" href="/dictionary">
                        Словник
                    </Link>
                    <Link className="px-4 py-2 rounded-xl border" href="/grammar">
                        Граматика
                    </Link>

                    <Link
                        className="px-4 py-2 rounded-xl border"
                        href="/ru/vyvchennia-slovatskoi-movy-online"
                        hrefLang="ru"
                    >
                        Русская версия →
                    </Link>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border bg-white p-5">
                    <h2 className="font-bold text-lg">1) Навчання по рівнях</h2>
                    <p className="mt-2 text-slate-700">
                        Рівні A0–B2: уроки по 10 слів + вправи. Легко тримати темп і не вигоріти.
                    </p>
                </div>
                <div className="rounded-2xl border bg-white p-5">
                    <h2 className="font-bold text-lg">2) Практика, а не тільки читання</h2>
                    <p className="mt-2 text-slate-700">
                        Вибір відповіді, введення слова, аудіо-вправи, пари та складання речень.
                    </p>
                </div>
                <div className="rounded-2xl border bg-white p-5">
                    <h2 className="font-bold text-lg">3) Озвучка</h2>
                    <p className="mt-2 text-slate-700">
                        Слухай вимову слів і фраз — це сильно прокачує “на слух”.
                    </p>
                </div>
                <div className="rounded-2xl border bg-white p-5">
                    <h2 className="font-bold text-lg">4) Словник + граматика</h2>
                    <p className="mt-2 text-slate-700">
                        Паралельно закриваєш граматику і поповнюєш словниковий запас.
                    </p>
                </div>
            </section>

            <section className="rounded-2xl border bg-white p-6 space-y-4">
                <h2 className="text-2xl font-bold">Як почати вчитись онлайн (план на 7 днів)</h2>
                <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                    <li>День 1: стартуй з A0 і пройди 2 уроки.</li>
                    <li>День 2–3: ще 2–4 уроки + вправи.</li>
                    <li>День 4: відкрий граматику (алфавіт/вимова) і повтори слова.</li>
                    <li>День 5–6: продовж A0 + слухай озвучку і повторюй уголос.</li>
                    <li>День 7: закріпи — пройди вправи з попередніх уроків.</li>
                </ol>
                <div className="pt-2">
                    <Link className="inline-flex rounded-xl bg-black px-4 py-2 text-white" href="/learning/levels/a0">
                        Почати з A0 →
                    </Link>
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