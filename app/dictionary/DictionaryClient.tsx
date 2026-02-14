"use client";

import SpeakButton from "@/app/components/SpeakButton";
import { WORDS } from "@/app/data/words";
import { useLanguage } from "@/lib/src/useLanguage";
import { trWord } from "@/lib/src/tr";

export default function DictionaryClient() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Словник 📚</h1>

      <div className="grid gap-3 sm:grid-cols-2">
        {WORDS.map((word, index) => (
          <div
            key={`${word.sk}-${index}`}
            className="rounded-2xl border bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">{word.sk}</span>
                  <SpeakButton text={word.sk} />
                </div>

                {word.ipa && (
                  <span className="text-xs text-slate-500">{word.ipa}</span>
                )}

                <span className="text-slate-700">{trWord(word, lang)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
