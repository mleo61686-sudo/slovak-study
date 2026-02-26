import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://slovak-study.com";

export const metadata: Metadata = {
  title: "Словацька мова: навчання онлайн A0–B2 | Slovak Study",
  description:
    "Словацька мова онлайн: навчання A0–B2, уроки, словник, граматика, вправи та прогрес. Підійде для життя, роботи й навчання у Словаччині.",

  alternates: {
    canonical: `${SITE_URL}/slovak-for-ukrainians`,
  },

  openGraph: {
    title: "Словацька мова онлайн (A0–B2) | Slovak Study",
    description:
      "Уроки A0–B2, словник і граматика — вчи словацьку системно, з вправами та прогресом.",
    url: `${SITE_URL}/slovak-for-ukrainians`,
    siteName: "Slovak Study",
    type: "website",
  },

  robots: { index: true, follow: true },
};

const FAQ = [
  {
    q: "Чи підходить Slovak Study, якщо я живу/планую жити у Словаччині?",
    a: "Так. Тут фокус на практичній лексиці та граматиці для життя, роботи й документів: короткі уроки, вправи та озвучка.",
  },
  {
    q: "З чого краще почати?",
    a: "Почни з рівня A0: пройди 5–10 уроків і роби вправи щодня по 10–20 хвилин.",
  },
  {
    q: "Чи є переклад українською?",
    a: "Так, усі слова мають український переклад, а в словнику можна швидко шукати й слухати вимову.",
  },
  {
    q: "Чи є граматика з прикладами?",
    a: "Так. У розділі граматики є теми з прикладами, озвучкою і міні-вправами.",
  },
  {
    q: "Чи зберігається прогрес?",
    a: "Так, прогрес уроків зберігається, щоб ти бачив що пройдено і що повторити.",
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
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-10">
      <Script
        id="faq-schema-uk-slovak-for-ukrainians"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Словацька мова — навчання онлайн (A0–B2)
        </h1>
        <p className="text-slate-700">
          Slovak Study — тренажер для системного вивчення словацької: короткі
          уроки, озвучка, вправи, словник та граматика. Підійде, якщо ти
          живеш/плануєш жити у Словаччині та хочеш швидко підтягнути мову.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link className="px-4 py-2 rounded-xl bg-black text-white" href="/learning">
            Почати навчання
          </Link>
          <Link className="px-4 py-2 rounded-xl border" href="/learning/levels/a0">
            Старт з A0 →
          </Link>
          <Link className="px-4 py-2 rounded-xl border" href="/dictionary">
            Словник
          </Link>
          <Link className="px-4 py-2 rounded-xl border" href="/grammar">
            Граматика
          </Link>

          <Link className="px-4 py-2 rounded-xl border" href="/ru/slovak-for-ukrainians">
            Русская версия →
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">1) Практика для життя</h2>
          <p className="mt-2 text-slate-700">
            Лексика і теми, які реально потрібні у Словаччині: робота, документи, побут.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">2) Короткі уроки</h2>
          <p className="mt-2 text-slate-700">
            По 10 слів на урок + вправи — легко займатися щодня без вигорання.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">3) Озвучка</h2>
          <p className="mt-2 text-slate-700">
            Слухай вимову слів і фраз та повторюй — це швидко прокачує “на слух”.
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-lg">4) Словник + граматика</h2>
          <p className="mt-2 text-slate-700">
            Швидкий пошук слів і теми граматики з прикладами — все в одному місці.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Як почати (план на 7 днів)</h2>
        <ol className="list-decimal pl-5 space-y-2 text-slate-700">
          <li>День 1: пройди 2 уроки A0.</li>
          <li>День 2–3: ще 2–4 уроки + вправи.</li>
          <li>День 4: відкрий граматику (алфавіт/вимова) і повтори слова.</li>
          <li>День 5–6: продовжуй A0 + слухай озвучку і повторюй уголос.</li>
          <li>День 7: закріпи — пройди вправи по попередніх уроках.</li>
        </ol>
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