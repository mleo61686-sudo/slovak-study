"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";
import SpeakButton from "@/app/components/SpeakButton";
import { getSlangByCourse, SlangCategory, SlangItem } from "@/data/slang";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

const CAT_LABEL: Record<SlangCategory, { ua: string; ru: string }> = {
  daily: { ua: "Побут", ru: "Быт" },
  work: { ua: "Робота", ru: "Работа" },
  friends: { ua: "Друзі", ru: "Друзья" },
  street: { ua: "Вулиця", ru: "Улица" },
  reactions: { ua: "Реакції", ru: "Реакции" },
};

const LEVELS = ["A1", "A2", "B1"] as const;

export default function SlangClient() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const slang = getSlangByCourse(courseId);
  const isCzech = courseId === "cs";

  const t = (ua: string, ru: string) => (lang === "ru" ? ru : ua);

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
    <div className="max-w-5xl mx-auto py-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          {isCzech
            ? t("Сленг і розмовна мова 🇨🇿", "Сленг и разговорная речь 🇨🇿")
            : t("Сленг і розмовна мова 🇸🇰", "Сленг и разговорная речь 🇸🇰")}
        </h1>

        <p className="text-slate-700">
          {isCzech
            ? t(
                "Живі чеські розмовні фрази та сленг, які реально використовують у Чехії.",
                "Живые чешские разговорные фразы и сленг, которые реально используют в Чехии."
              )
            : t(
                "Живі фрази та вирази, які ти реально почуєш у Словаччині: на роботі, в магазині, між друзями.",
                "Живые фразы и выражения, которые ты реально услышишь в Словакии."
              )}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={practiceHref}
            className="inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2 text-sm hover:bg-black/90 transition"
          >
            {t("Практикувати сленг →", "Практиковать сленг →")}
          </Link>

          <div className="text-sm text-slate-500 self-center">
            {t(
              `Всього: ${slang.length} • Показано: ${filtered.length}`,
              `Всего: ${slang.length} • Показано: ${filtered.length}`
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t(
              "Пошук: слово / переклад / приклад…",
              "Поиск: слово / перевод / пример…"
            )}
            className="h-11 w-full rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as any)}
            className="h-11 w-full rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          >
            <option value="ALL">{t("Рівень: всі", "Уровень: все")}</option>

            {LEVELS.map((lv) => (
              <option key={lv} value={lv}>
                {lv}
              </option>
            ))}
          </select>

          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as any)}
            className="h-11 w-full rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
          >
            <option value="ALL">
              {t("Категорія: всі", "Категория: все")}
            </option>

            {Object.keys(CAT_LABEL).map((k) => {
              const key = k as SlangCategory;

              return (
                <option key={key} value={key}>
                  {t(CAT_LABEL[key].ua, CAT_LABEL[key].ru)}
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
            {t("Показати ще", "Показать ещё")}
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="rounded-2xl border bg-white p-6 text-slate-600">
          {t("Нічого не знайдено 😅", "Ничего не найдено 😅")}
        </div>
      )}
    </div>
  );
}

function SlangCard({ item }: { item: SlangItem }) {
  const { lang } = useLanguage();

  const t = (ua: string, ru: string) => (lang === "ru" ? ru : ua);

  const meaning = lang === "ru" ? item.ru : item.ua;
  const example = lang === "ru" ? item.exampleRu : item.exampleUa;

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
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
          {t("Приклад", "Пример")}
        </div>

        <div className="text-sm text-slate-700 italic">{item.exampleSk}</div>
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
          {t(CAT_LABEL[item.category].ua, CAT_LABEL[item.category].ru)}
        </span>
      </div>

      {item.caution && (
        <div className="text-sm text-amber-700">
          ⚠ {t(item.caution.ua, item.caution.ru)}
        </div>
      )}
    </div>
  );
}