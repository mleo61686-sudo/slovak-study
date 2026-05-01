import type { Stats } from "./words-srs-logic";
import type { WordsSrsTexts } from "./words-srs-texts";
import { DAILY_REVIEW_LIMIT } from "./words-srs-logic";

type Props = {
  stats: Stats;
  t: WordsSrsTexts;
  streak: number;
  streakLabel: string;
  dailyGoalLabel: string;
  dailyGoalReviewed: number;
  dailyGoalTarget: number;
  xpLabel: string;
  xp: number;
};

export default function WordsSrsStats({
  stats,
  t,
  streak,
  streakLabel,
  dailyGoalLabel,
  dailyGoalReviewed,
  dailyGoalTarget,
  xpLabel,
  xp,
}: Props) {
  const dailyGoalPercent = Math.min(
    100,
    Math.round((dailyGoalReviewed / dailyGoalTarget) * 100)
  );

  return (
    <section className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <div className="flunio-card-soft rounded-2xl p-3">
        <div className="text-xs theme-text-subtle">{t.total}</div>
        <div className="mt-1 text-xl font-semibold theme-text">
          {stats.total}
        </div>
      </div>

      <div className="flunio-card-soft rounded-2xl p-3">
        <div className="text-xs theme-text-subtle">{t.learned}</div>
        <div className="mt-1 text-xl font-semibold theme-text">
          {stats.learned}
        </div>
      </div>

      <div className="rounded-2xl border border-amber-300/30 bg-amber-300/15 p-3 shadow-[0_0_16px_rgba(251,191,36,0.12)] backdrop-blur">
        <div className="text-xs font-medium text-amber-500">{streakLabel}</div>
        <div className="mt-1 text-xl font-semibold text-amber-500">
          🔥 {streak}
        </div>
      </div>

      <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/15 p-3 shadow-[0_0_16px_rgba(34,211,238,0.12)] backdrop-blur">
        <div className="text-xs font-medium theme-accent-text">{xpLabel}</div>
        <div className="mt-1 text-xl font-semibold theme-accent-text">
          ⭐ {xp}
        </div>
      </div>

      <div className="flunio-card-soft rounded-2xl p-3">
        <div className="text-xs theme-text-subtle">{t.mastered}</div>
        <div className="mt-1 text-xl font-semibold theme-text">
          {stats.mastered}
        </div>
      </div>

      <div className="flunio-card-soft rounded-2xl p-3">
        <div className="text-xs theme-text-subtle">{t.due}</div>
        <div className="mt-1 text-xl font-semibold theme-text">
          {Math.min(stats.due, DAILY_REVIEW_LIMIT)}
        </div>
      </div>

      <div className="col-span-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/15 p-3 shadow-[0_0_16px_rgba(16,185,129,0.12)] backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-medium text-emerald-500">
            {dailyGoalLabel}
          </div>
          <div className="text-sm font-semibold text-emerald-500">
            {dailyGoalReviewed}/{dailyGoalTarget}
          </div>
        </div>

        <div className="theme-progress-track mt-2 h-2 overflow-hidden rounded-full">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300"
            style={{
              width: `${dailyGoalPercent}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}