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
  titlePl: {
    ua: "Сленг і розмовна мова 🇵🇱",
    ru: "Сленг и разговорная речь 🇵🇱",
    en: "Slang and spoken language 🇵🇱",
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
  introPl: {
    ua: "Живі польські розмовні фрази та сленг, які реально використовують у Польщі.",
    ru: "Живые польские разговорные фразы и сленг, которые реально используют в Польше.",
    en: "Real Polish colloquial phrases and slang that people actually use in Poland.",
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

const card = "flunio-card rounded-3xl";

const softCard = "theme-home-soft-card rounded-2xl";

const ghostButton =
  "theme-secondary-button rounded-xl px-4 py-2 text-sm font-semibold";

const activeButton =
  "theme-primary-button rounded-xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0";

const inputClass =
  "theme-input slang-filter-field h-11 w-full rounded-xl px-3 text-sm outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20";

const iconButton =
  "theme-secondary-button rounded-xl px-3 py-2 text-xs transition";

function tr(text: LocalizedText, lang: Lang) {
  return text[lang] ?? text.ua ?? "";
}

export default function SlangClient() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const activeCourseId = courseId === "cs" || courseId === "pl" ? courseId : "sk";
  const slang = getSlangByCourse(activeCourseId);

  const isCzech = activeCourseId === "cs";
  const isPolish = activeCourseId === "pl";

  const [q, setQ] = useState("");
  const [level, setLevel] = useState<(typeof LEVELS)[number] | "ALL">("ALL");
  const [cat, setCat] = useState<SlangCategory | "ALL">("ALL");

  const PAGE_SIZE = 20;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [q, level, cat, activeCourseId]);

  const filtered = useMemo(() => {
    const query = q.toLowerCase().trim();

    return slang.filter((item) => {
      const matchesQ =
        !query ||
        item.sk.toLowerCase().includes(query) ||
        item.ua.toLowerCase().includes(query) ||
        item.ru.toLowerCase().includes(query) ||
        item.en.toLowerCase().includes(query) ||
        item.exampleSk.toLowerCase().includes(query) ||
        item.exampleUa.toLowerCase().includes(query) ||
        item.exampleRu.toLowerCase().includes(query) ||
        item.exampleEn.toLowerCase().includes(query);

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

  const title = isCzech
    ? tr(UI.titleCs, lang)
    : isPolish
      ? tr(UI.titlePl, lang)
      : tr(UI.titleSk, lang);

  const intro = isCzech
    ? tr(UI.introCs, lang)
    : isPolish
      ? tr(UI.introPl, lang)
      : tr(UI.introSk, lang);

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10 theme-text">
      <div className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-4">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Grammar · Slang
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight theme-text sm:text-4xl">
            {title}
          </h1>

          <p className="max-w-3xl text-base leading-relaxed theme-text-muted">
            {intro}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={practiceHref} className={activeButton}>
              {tr(UI.practice, lang)}
            </Link>

            <div className="theme-home-soft-card self-center rounded-2xl px-4 py-2 text-sm theme-text-muted">
              {tr(UI.totals, lang)}:{" "}
              <span className="font-semibold theme-accent-text">
                {slang.length}
              </span>{" "}
              • {tr(UI.shown, lang)}:{" "}
              <span className="font-semibold theme-accent-text">
                {filtered.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="slang-filter-panel rounded-3xl p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tr(UI.searchPlaceholder, lang)}
            className={inputClass}
          />

          <select
            value={level}
            onChange={(e) =>
              setLevel(e.target.value as (typeof LEVELS)[number] | "ALL")
            }
            className={inputClass}
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
            className={inputClass}
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
            className={ghostButton}
          >
            {tr(UI.showMore, lang)}
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className={`${card} p-6 theme-text-muted`}>
          {tr(UI.nothingFound, lang)}
        </div>
      )}
    </div>
  );
}

function SlangCard({ item }: { item: SlangItem }) {
  const { lang } = useLanguage();

  const meaning =
    lang === "ru" ? item.ru : lang === "en" ? item.en : item.ua;

  const example =
    lang === "ru"
      ? item.exampleRu
      : lang === "en"
        ? item.exampleEn
        : item.exampleUa;

  const caution =
    item.caution
      ? lang === "ru"
        ? item.caution.ru
        : lang === "en"
          ? item.caution.en
          : item.caution.ua
      : null;

  return (
    <div className={`${card} space-y-4 p-5 transition hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold theme-accent-text">
            {item.sk}
          </div>
          <div className="mt-1 theme-text-muted">{meaning}</div>
        </div>

        <SpeakButton
          text={item.sk}
          asChild
          label="🔊"
          className={iconButton}
        />
      </div>

      <div className={`${softCard} p-3`}>
        <div className="text-xs font-semibold uppercase tracking-wide theme-text-subtle">
          {tr(UI.example, lang)}
        </div>

        <div className="mt-2 text-sm italic theme-text">{item.exampleSk}</div>
        <div className="mt-1 text-sm theme-text-muted">{example}</div>

        <div className="pt-3">
          <SpeakButton
            kind="phrase"
            text={item.exampleSk}
            asChild
            label="🔊"
            className={iconButton}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <span className="theme-pill rounded-full px-3 py-1 font-semibold">
          {item.level}
        </span>

        <span className="theme-home-soft-card rounded-full px-3 py-1 theme-text-muted">
          {tr(CAT_LABEL[item.category], lang)}
        </span>
      </div>

      {caution && (
        <div className="theme-warning-box rounded-2xl px-4 py-3 text-sm font-medium">
          ⚠ {caution}
        </div>
      )}
    </div>
  );
}