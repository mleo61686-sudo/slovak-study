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
    <section className="flunio-card space-y-4 rounded-3xl p-4 text-white sm:space-y-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 text-sm text-white/55">
        <span>
          {t.left}: <b className="text-white">{left}</b>
        </span>
        <span>
          {reviewed}/{sessionSize || 0}
        </span>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-0 break-words text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {term}
          </div>

          <SpeakButton text={term} />

          {show && ipaText ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/55 backdrop-blur">
              {ipaText}
            </span>
          ) : null}
        </div>

        {lastInfo ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/65 backdrop-blur">
            {lastInfo}
          </div>
        ) : null}

        {!show ? (
          <div
            onClick={onShow}
            className="mt-5 cursor-pointer rounded-2xl border border-dashed border-cyan-400/35 bg-white/5 p-5 text-center backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-400/55 hover:bg-white/10 active:scale-[0.99] sm:mt-6 sm:p-6"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onShow();
            }}
          >
            <div className="text-base font-semibold text-white">
              {t.showAnswer}
            </div>
            <div className="mt-1 text-sm leading-5 text-white/55">
              {t.tapToReveal}
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 shadow-[0_0_18px_rgba(16,185,129,0.16)] sm:mt-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-emerald-200">
              {t.showAnswer}
            </div>
            <div className="mt-1 break-words text-2xl font-bold text-emerald-100">
              {translation}
            </div>
          </div>
        )}
      </div>

      {!show ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            onClick={onShow}
            className="min-h-11 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 active:scale-[0.98]"
            type="button"
          >
            {t.showAnswer}
          </button>

          <button
            onClick={onSkip}
            className="min-h-11 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 backdrop-blur transition hover:border-cyan-400/35 hover:bg-white/10 hover:text-white active:scale-[0.98]"
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
            className="min-h-12 rounded-2xl border border-red-400/30 bg-red-500/15 px-4 py-3 text-sm font-semibold text-red-100 shadow-[0_0_16px_rgba(239,68,68,0.14)] transition hover:bg-red-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            type="button"
          >
            {t.forgot}
          </button>

          <button
            disabled={isGrading}
            onClick={() => onGrade(1)}
            className="min-h-12 rounded-2xl border border-orange-400/30 bg-orange-500/15 px-4 py-3 text-sm font-semibold text-orange-100 shadow-[0_0_16px_rgba(249,115,22,0.14)] transition hover:bg-orange-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            type="button"
          >
            {t.hard}
          </button>

          <button
            disabled={isGrading}
            onClick={() => onGrade(2)}
            className="min-h-12 rounded-2xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-sm font-semibold text-emerald-100 shadow-[0_0_16px_rgba(16,185,129,0.14)] transition hover:bg-emerald-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            type="button"
          >
            {t.good}
          </button>

          <button
            disabled={isGrading}
            onClick={() => onGrade(3)}
            className="min-h-12 rounded-2xl border border-cyan-400/30 bg-cyan-500/15 px-4 py-3 text-sm font-semibold text-cyan-100 shadow-[0_0_16px_rgba(34,211,238,0.14)] transition hover:bg-cyan-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            type="button"
          >
            {t.easy}
          </button>
        </div>
      )}
    </section>
  );
}