"use client";

type LessonFinishedText = {
  levelDone: string;
  result: string;
  nextLockedTitle: string;
  nextLockedDefault: string;
  reviewAgain: string;
  goNextLevel: string;
  toLessonsList: string;
  toPathway: string;
  notAvailableFree: string;
  saving: string;
  mastered: string;
  needsPractice: string;
  masteryHint: string;
  mistakesLabel: string;
  addToSrs: string;
};

type LessonFinishedProps = {
  t: LessonFinishedText;
  score: number;
  totalQuestions: number;
  mastered: boolean;
  mistakeCount: number;
  srsStatus: string;
  onEnrollSrs?: () => void;
  savingNext: boolean;
  canGoNextNow: boolean;
  lockedReasonNow?: string;
  isNavigating: boolean;
  nextLevelId: string;
  onReviewAgain: () => void;
  onGoNext: (path: string) => void;
  onGoToLessonsList: () => void;
};

function getNextLessonPath(nextLevelId: string) {
  if (!nextLevelId) return "/learning";

  if (nextLevelId.startsWith("/")) {
    return nextLevelId;
  }

  return `/learning/${nextLevelId}`;
}

export default function LessonFinished({
  t,
  score,
  totalQuestions,
  mastered,
  mistakeCount,
  srsStatus,
  onEnrollSrs,
  savingNext,
  canGoNextNow,
  lockedReasonNow,
  isNavigating,
  nextLevelId,
  onReviewAgain,
  onGoNext,
  onGoToLessonsList,
}: LessonFinishedProps) {
  const nextPath = getNextLessonPath(nextLevelId);

  return (
    <div className="flunio-card space-y-4 rounded-3xl p-6 theme-text">
      <div className="text-xl font-semibold theme-text">{t.levelDone}</div>

      <div className="theme-text-muted">
        {t.result}: <b className="theme-text">{score}</b> /{" "}
        <b className="theme-text">{totalQuestions}</b>
      </div>

      <div className="theme-inner-card rounded-2xl p-4 text-sm theme-text-muted" aria-live="polite">
        <div className="font-semibold theme-text">{mastered ? t.mastered : t.needsPractice}</div>
        {!mastered ? <p className="mt-1">{t.masteryHint}</p> : null}
        {mistakeCount > 0 ? (
          <p className="mt-1">{t.mistakesLabel}: {mistakeCount}</p>
        ) : null}
      </div>

      {onEnrollSrs ? (
        <div className="space-y-2">
          <button
            type="button"
            onClick={onEnrollSrs}
            className="theme-secondary-button rounded-xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
          >
            {t.addToSrs}
          </button>
          {srsStatus ? <p role="status" className="text-sm theme-text-muted">{srsStatus}</p> : null}
        </div>
      ) : null}

      {savingNext ? (
        <div className="theme-inner-card rounded-2xl p-4 text-sm theme-text-muted">
          {t.saving}
        </div>
      ) : null}

      {!savingNext && !canGoNextNow ? (
        <div className="theme-inner-card rounded-2xl p-4 text-sm theme-text-muted">
          <div className="font-semibold theme-text">{t.nextLockedTitle}</div>
          <div className="mt-1">{lockedReasonNow ?? t.nextLockedDefault}</div>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onReviewAgain}
          disabled={savingNext || isNavigating}
          className="theme-secondary-button rounded-xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t.reviewAgain}
        </button>

        <button
          type="button"
          onClick={() => onGoNext(nextPath)}
          className={[
            "rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed",
            canGoNextNow && !savingNext && !isNavigating
              ? "theme-primary-button hover:-translate-y-0.5"
              : "theme-secondary-button opacity-60",
          ].join(" ")}
          disabled={!canGoNextNow || savingNext || isNavigating}
          title={!canGoNextNow && !savingNext ? t.notAvailableFree : undefined}
        >
          {t.goNextLevel}
        </button>

        <button
          type="button"
          onClick={() => onGoNext("/learning#learning-journey")}
          disabled={savingNext || isNavigating}
          className="theme-secondary-button rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t.toPathway}
        </button>

        {!savingNext && !canGoNextNow ? (
          <button
            type="button"
            onClick={onGoToLessonsList}
            disabled={isNavigating}
            className="theme-secondary-button rounded-xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t.toLessonsList}
          </button>
        ) : null}
      </div>
    </div>
  );
}