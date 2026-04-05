"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";
import SpeakButton from "@/app/components/SpeakButton";
import { getSlangByCourse, SlangCategory, SlangItem } from "@/data/slang";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

type LocalizedText = Partial<Record<Lang, string>>;

const CAT_LABEL: Record<SlangCategory, LocalizedText> = {
  daily: { ua: "Побут", ru: "Быт", en: "Daily life" },
  work: { ua: "Робота", ru: "Работа", en: "Work" },
  friends: { ua: "Друзі", ru: "Друзья", en: "Friends" },
  street: { ua: "Вулиця", ru: "Улица", en: "Street" },
  reactions: { ua: "Реакції", ru: "Реакции", en: "Reactions" },
};

const LEVELS = ["A1", "A2", "B1", "B2"] as const;

const UI: Record<string, LocalizedText> = {
  titleSk: {
    ua: "Сленг і розмовна мова 🇸🇰",
    ru: "Сленг и разговорная речь 🇸🇰",
    en: "Slang and spoken language 🇸🇰",
  },
  titleCs: {
    ua: "Сленг і розмовна мова 🇨🇿",
    ru: "Сленг и разговорная речь 🇨🇿",
    en: "Slang and spoken language 🇨🇿",
  },
  introSk: {
    ua: "Живі фрази та вирази, які ти реально почуєш у Словаччині: на роботі, в магазині, між друзями.",
    ru: "Живые фразы и выражения, которые ты реально услышишь в Словакии.",
    en: "Real-life phrases and expressions you’ll actually hear in Slovakia: at work, in shops, and among friends.",
  },
  introCs: {
    ua: "Живі чеські розмовні фрази та сленг, які реально використовують у Чехії.",
    ru: "Живые чешские разговорные фразы и сленг, которые реально используют в Чехии.",
    en: "Real Czech colloquial phrases and slang that people actually use in the Czech Republic.",
  },
  practice: {
    ua: "Практикувати сленг →",
    ru: "Практиковать сленг →",
    en: "Practice slang →",
  },
  totals: {
    ua: "Всього",
    ru: "Всего",
    en: "Total",
  },
  shown: {
    ua: "Показано",
    ru: "Показано",
    en: "Shown",
  },
  searchPlaceholder: {
    ua: "Пошук: слово / переклад / приклад…",
    ru: "Поиск: слово / перевод / пример…",
    en: "Search: word / translation / example…",
  },
  levelAll: {
    ua: "Рівень: всі",
    ru: "Уровень: все",
    en: "Level: all",
  },
  categoryAll: {
    ua: "Категорія: всі",
    ru: "Категория: все",
    en: "Category: all",
  },
  showMore: {
    ua: "Показати ще",
    ru: "Показать ещё",
    en: "Show more",
  },
  nothingFound: {
    ua: "Нічого не знайдено 😅",
    ru: "Ничего не найдено 😅",
    en: "Nothing found 😅",
  },
  example: {
    ua: "Приклад",
    ru: "Пример",
    en: "Example",
  },
};

function tr(text: LocalizedText, lang: Lang) {
  return text[lang] ?? text.ua ?? "";
}

function trPair(ua: string, ru: string | undefined, lang: Lang) {
  if (lang === "ru") return ru ?? ua;
  return ua;
}

export default function SlangClient() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const slang = getSlangByCourse(courseId);
  const isCzech = courseId === "cs";

  const [q, setQ] = useState("");
  const [level, setLevel] = useState<(typeof LEVELS)[number] | "ALL">("ALL");
  const [cat, setCat] = useState<SlangCategory | "ALL">("ALL");

  const PAGE_SIZE = 20;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [q, level, cat]);

  const filtered = useMemo(() => {
    const query = q.toLowerCase().trim();

    return slang.filter((item) => {
      const matchesQ =
        !query ||
        item.sk.toLowerCase().includes(query) ||
        item.ua.toLowerCase().includes(query) ||
        item.ru.toLowerCase().includes(query) ||
        item.exampleSk.toLowerCase().includes(query);

      const matchesLevel = level === "ALL" || item.level === level;
      const matchesCat = cat === "ALL" || item.category === cat;

      return matchesQ && matchesLevel && matchesCat;
    });
  }, [q, level, cat, slang]);

  const practiceHref = useMemo(() => {
    const params = new URLSearchParams();

    params.set("pack", "slang");

    if (level !== "ALL") params.set("level", level);
    if (cat !== "ALL") params.set("cat", cat);

    return `/practice?${params.toString()}`;
  }, [level, cat]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          {isCzech ? tr(UI.titleCs, lang) : tr(UI.titleSk, lang)}
        </h1>

        <p className="text-slate-700">
          {isCzech ? tr(UI.introCs, lang) : tr(UI.introSk, lang)}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={practiceHref}
            className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-sm text-white transition hover:bg-black/90"
          >
            {tr(UI.practice, lang)}
          </Link>

          <div className="self-center text-sm text-slate-500">
            {tr(UI.totals, lang)}: {slang.length} • {tr(UI.shown, lang)}: {filtered.length}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tr(UI.searchPlaceholder, lang)}
            className="h-11 w-full rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as (typeof LEVELS)[number] | "ALL")}
            className="h-11 w-full rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          >
            <option value="ALL">{tr(UI.levelAll, lang)}</option>

            {LEVELS.map((lv) => (
              <option key={lv} value={lv}>
                {lv}
              </option>
            ))}
          </select>

          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as SlangCategory | "ALL")}
            className="h-11 w-full rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          >
            <option value="ALL">{tr(UI.categoryAll, lang)}</option>

            {Object.keys(CAT_LABEL).map((k) => {
              const key = k as SlangCategory;

              return (
                <option key={key} value={key}>
                  {tr(CAT_LABEL[key], lang)}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.slice(0, visibleCount).map((item) => (
          <SlangCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length > visibleCount && (
        <div className="flex justify-center pt-3">
          <button
            onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
            className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
          >
            {tr(UI.showMore, lang)}
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="rounded-2xl border bg-white p-6 text-slate-600">
          {tr(UI.nothingFound, lang)}
        </div>
      )}
    </div>
  );
}

function SlangCard({ item }: { item: SlangItem }) {
  const { lang } = useLanguage();

  const meaning =
    lang === "ru" ? item.ru : item.ua;
  const example =
    lang === "ru" ? item.exampleRu : item.exampleUa;

  return (
    <div className="space-y-3 rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">{item.sk}</div>
          <div className="text-slate-700">{meaning}</div>
        </div>

        <SpeakButton
          text={item.sk}
          asChild
          label="🔊"
          className="rounded-lg border bg-white px-2 py-1 text-xs hover:bg-slate-50"
        />
      </div>

      <div className="rounded-xl bg-slate-50 p-3">
        <div className="text-xs uppercase tracking-wide text-slate-500">
          {tr(UI.example, lang)}
        </div>

        <div className="text-sm italic text-slate-700">{item.exampleSk}</div>
        <div className="text-sm text-slate-500">{example}</div>

        <div className="pt-2">
          <SpeakButton
            kind="phrase"
            text={item.exampleSk}
            asChild
            label="🔊"
            className="rounded-lg border bg-white px-2 py-1 text-xs hover:bg-slate-50"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded-full border px-2 py-1 text-slate-600">
          {item.level}
        </span>

        <span className="rounded-full border px-2 py-1 text-slate-600">
          {tr(CAT_LABEL[item.category], lang)}
        </span>
      </div>

      {item.caution && (
        <div className="text-sm text-amber-700">
          ⚠ {trPair(item.caution.ua, item.caution.ru, lang)}
        </div>
      )}
    </div>
  );
}