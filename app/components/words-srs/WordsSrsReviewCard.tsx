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
    <section className="flunio-card space-y-4 rounded-3xl p-4 theme-text sm:space-y-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 text-sm theme-text-muted">
        <span>
          {t.left}: <b className="theme-text">{left}</b>
        </span>
        <span>
          {reviewed}/{sessionSize || 0}
        </span>
      </div>

      <div className="theme-inner-card rounded-3xl p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-0 break-words text-3xl font-bold tracking-tight theme-text sm:text-4xl">
            {term}
          </div>

          <SpeakButton text={term} />

          {show && ipaText ? (
            <span className="theme-pill rounded-full px-3 py-1 text-sm">
              {ipaText}
            </span>
          ) : null}
        </div>

        {lastInfo ? (
          <div className="mt-4 rounded-2xl border border-cyan-400/40 bg-cyan-400/15 px-4 py-3 text-sm font-semibold theme-accent-text shadow-[0_0_18px_rgba(34,211,238,0.14)]">
            {lastInfo}
          </div>
        ) : null}

        {!show ? (
          <div
            onClick={onShow}
            className="theme-inner-card mt-5 cursor-pointer rounded-2xl border-dashed p-5 text-center transition hover:-translate-y-0.5 hover:border-cyan-400/55 active:scale-[0.99] sm:mt-6 sm:p-6"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onShow();
            }}
          >
            <div className="text-base font-semibold theme-text">
              {t.showAnswer}
            </div>
            <div className="mt-1 text-sm leading-5 theme-text-muted">
              {t.tapToReveal}
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 shadow-[0_0_18px_rgba(16,185,129,0.16)] sm:mt-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
              {t.showAnswer}
            </div>
            <div className="mt-1 break-words text-2xl font-bold text-emerald-500">
              {translation}
            </div>
          </div>
        )}
      </div>

      {!show ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            onClick={onShow}
            className="theme-primary-button min-h-11 rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:scale-[0.98]"
            type="button"
          >
            {t.showAnswer}
          </button>

          <button
            onClick={onSkip}
            className="theme-secondary-button min-h-11 rounded-2xl px-4 py-2 text-sm font-semibold active:scale-[0.98]"
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
            className="theme-grade-forgot min-h-12 rounded-2xl px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            type="button"
          >
            {t.forgot}
          </button>

          <button
            disabled={isGrading}
            onClick={() => onGrade(1)}
            className="theme-grade-hard min-h-12 rounded-2xl px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            type="button"
          >
            {t.hard}
          </button>

          <button
            disabled={isGrading}
            onClick={() => onGrade(2)}
            className="theme-grade-good min-h-12 rounded-2xl px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            type="button"
          >
            {t.good}
          </button>

          <button
            disabled={isGrading}
            onClick={() => onGrade(3)}
            className="theme-grade-easy min-h-12 rounded-2xl px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            type="button"
          >
            {t.easy}
          </button>
        </div>
      )}
    </section>
  );
}