import Link from "next/link";
import WordsStats from "./components/WordsStats";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вивчення словацької мови онлайн для українців | Slovak Study",
  description:
    "Slovak Study — граматика з прикладами, словник і вправи для практики. Системне навчання по рівнях A0–B2. Інтерфейс українською.",
  alternates: {
    canonical: "https://slovak-study.vercel.app/",
  },
  openGraph: {
    title: "Slovak Study — вивчення словацької онлайн",
    description:
      "Граматика, словник і тренажер вправ. Системне навчання по рівнях A0–B2 для україномовних.",
    url: "https://slovak-study.vercel.app/",
    siteName: "Slovak Study",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Вивчай словацьку мову 🇸🇰 онлайн — для українців
          </h1>

          <p className="max-w-2xl text-slate-700">
            Slovak Study — граматика з прикладами, тематичний словник та вправи
            для практики. Швидкий старт українською і системне навчання по рівнях.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/learning"
              className="bg-black text-white px-4 py-2 rounded-xl"
            >
              Перейти до навчання 🚀
            </Link>

            <Link
              href="/dictionary"
              className="rounded-2xl border bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Відкрити словник
            </Link>

            <Link
              href="/grammar"
              className="rounded-2xl border bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Перейти до граматики
            </Link>
          </div>
        </div>
      </section>

      {/* SEO CONTENT BLOCK */}
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">
          Онлайн курс словацької мови для українців
        </h2>

        <p className="text-slate-700 mb-3">
          Slovak Study — це онлайн платформа для вивчення словацької мови з нуля.
          Тут ви знайдете граматику словацької мови з прикладами, тематичний словник,
          вправи для тренування та системне навчання по рівнях A0–B2.
        </p>

        <p className="text-slate-700">
          Сайт підходить для українців, які планують працювати, навчатися або
          переїхати до Словаччини. Вивчайте словацьку мову онлайн безкоштовно,
          у зручному форматі з поступовим ускладненням матеріалу.
        </p>
      </section>

      {/* MAIN CARDS */}
      <section className="grid gap-4 sm:grid-cols-3">
        <WordsStats />

        <Link
          href="/grammar"
          className="rounded-3xl border bg-white p-6 shadow-sm hover:bg-slate-50 transition block"
        >
          <div className="text-2xl">📘</div>
          <h2 className="mt-3 text-lg font-semibold">Граматика</h2>
          <p className="mt-1 text-sm text-slate-700">
            Теми коротко й по суті + приклади та міні-вправи.
          </p>
          <div className="mt-4 text-sm font-semibold">Відкрити →</div>
        </Link>

        <Link
          href="/dictionary"
          className="rounded-3xl border bg-white p-6 shadow-sm hover:bg-slate-50 transition block"
        >
          <div className="text-2xl">📚</div>
          <h2 className="mt-3 text-lg font-semibold">Словник</h2>
          <p className="mt-1 text-sm text-slate-700">
            Пошук, теми, приклади речень і «в обране».
          </p>
          <div className="mt-4 text-sm font-semibold">Відкрити →</div>
        </Link>

        <Link
          href="/learning"
          className="rounded-3xl border bg-white p-6 shadow-sm hover:bg-slate-50 transition block"
        >
          <div className="text-2xl">🏋️</div>
          <h2 className="mt-3 text-lg font-semibold">Рівні</h2>
          <p className="mt-1 text-sm text-slate-700">
            Вправи: вибір відповіді, вставити слово, скласти речення.
          </p>
          <div className="mt-4 text-sm font-semibold">Почати →</div>
        </Link>
      </section>
    </div>
  );
}
