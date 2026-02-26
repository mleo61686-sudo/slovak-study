"use client";
import { useMemo, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import { getDictionaryFromLessons } from "@/app/learning/data";
import { useLanguage } from "@/lib/src/useLanguage";


export default function DictionaryClient() {
  const { lang } = useLanguage();
  const [q, setQ] = useState("");

  const dict = useMemo(() => getDictionaryFromLessons(), []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return dict;

    return dict.filter((w: any) => {
      const sk = String(w.sk ?? "").toLowerCase();
      const ua = String(w.ua ?? "").toLowerCase();
      const ru = String(w.ru ?? "").toLowerCase();
      const ipa = String(w.ipa ?? "").toLowerCase();
      return (
        sk.includes(s) ||
        ua.includes(s) ||
        ru.includes(s) ||
        ipa.includes(s)
      );
    });
  }, [q, dict]);
  

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Словник 📚</h1>
      <div className="space-y-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Пошук: slovensky / українська / русский…"
          className="w-full rounded-2xl border bg-white px-4 py-3 outline-none focus:ring-2"
        />
        <div className="text-sm text-slate-500">
          Знайдено: {filtered.length}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((word: any) => (
          <div
            key={word.key}
            className="rounded-2xl border bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">{word.sk}</span>
                  <SpeakButton text={word.sk} kind="word" />
                </div>

                {word.ipa && (
                  <span className="text-xs text-slate-500">{word.ipa}</span>
                )}

                <span className="text-slate-700">
                  {lang === "ua" ? word.ua : word.ru ?? word.ua}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
