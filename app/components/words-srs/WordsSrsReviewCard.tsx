import SpeakButton from "@/app/components/SpeakButton";
import type { WordsSrsTexts } from "./words-srs-texts";

type Props = {
  term: string;
  translation: string;
  ipa?: unknown;
  show: boolean;
  lastInfo: string;
  isGrading: boolean;
  left: number;
  reviewed: number;
  sessionSize: number;
  t: WordsSrsTexts;
  onShow: () => void;
  onSkip: () => void;
  onGrade: (grade: 0 | 1 | 2 | 3) => void;
};

export default function WordsSrsReviewCard({
  term,
  translation,
  ipa,
  show,
  lastInfo,
  isGrading,
  left,
  reviewed,
  sessionSize,
  t,
  onShow,
  onSkip,
  onGrade,
}: Props) {
  const ipaText = typeof ipa === "string" ? ipa : undefined;

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:space-y-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
        <span>
          {t.left}: <b>{left}</b>
        </span>
        <span>
          {reviewed}/{sessionSize || 0}
        </span>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-0 break-words text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {term}
          </div>

          <SpeakButton text={term} />

          {show && ipaText ? (
            <span className="rounded-full bg-white px-3 py-1 text-sm text-slate-500 ring-1 ring-slate-200">
              {ipaText}
            </span>
          ) : null}
        </div>

        {lastInfo ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
            {lastInfo}
          </div>
        ) : null}

        {!show ? (
          <div
            onClick={onShow}
            className="mt-5 cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center transition hover:border-slate-400 hover:bg-slate-50 active:scale-[0.99] sm:mt-6 sm:p-6"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onShow();
            }}
          >
            <div className="text-base font-semibold text-slate-900">
              {t.showAnswer}
            </div>
            <div className="mt-1 text-sm leading-5 text-slate-500">
              {t.tapToReveal}
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:mt-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {t.showAnswer}
            </div>
            <div className="mt-1 break-words text-2xl font-bold text-emerald-800">
              {translation}
            </div>
          </div>
        )}
      </div>

      {!show ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            onClick={onShow}
            className="min-h-11 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black active:scale-[0.98]"
            type="button"
          >
            {t.showAnswer}
          </button>

          <button
            onClick={onSkip}
            className="min-h-11 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
            type="button"
          >
            {t.skip} · {t.skipHint}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
          <button
            disabled={isGrading}
            onClick={() => onGrade(0)}
            className="min-h-12 rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            type="button"
          >
            {t.forgot}
          </button>

          <button
            disabled={isGrading}
            onClick={() => onGrade(1)}
            className="min-h-12 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            type="button"
          >
            {t.hard}
          </button>

          <button
            disabled={isGrading}
            onClick={() => onGrade(2)}
            className="min-h-12 rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            type="button"
          >
            {t.good}
          </button>

          <button
            disabled={isGrading}
            onClick={() => onGrade(3)}
            className="min-h-12 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            type="button"
          >
            {t.easy}
          </button>
        </div>
      )}
    </section>
  );
}