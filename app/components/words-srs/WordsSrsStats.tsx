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
  return (
    <section className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="text-xs text-slate-500">{t.total}</div>
        <div className="mt-1 text-xl font-semibold text-slate-900">
          {stats.total}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="text-xs text-slate-500">{t.learned}</div>
        <div className="mt-1 text-xl font-semibold text-slate-900">
          {stats.learned}
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 shadow-sm">
        <div className="text-xs text-amber-700">{streakLabel}</div>
        <div className="mt-1 text-xl font-semibold text-amber-900">
          🔥 {streak}
        </div>
      </div>

      <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-3 shadow-sm">
        <div className="text-xs text-indigo-700">{xpLabel}</div>
        <div className="mt-1 text-xl font-semibold text-indigo-900">
          ⭐ {xp}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="text-xs text-slate-500">{t.mastered}</div>
        <div className="mt-1 text-xl font-semibold text-slate-900">
          {stats.mastered}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="text-xs text-slate-500">{t.due}</div>
        <div className="mt-1 text-xl font-semibold text-slate-900">
          {Math.min(stats.due, DAILY_REVIEW_LIMIT)}
        </div>
      </div>

      <div className="col-span-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-emerald-700">{dailyGoalLabel}</div>
          <div className="text-sm font-semibold text-emerald-900">
            {dailyGoalReviewed}/{dailyGoalTarget}
          </div>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-emerald-100">
          <div
            className="h-full rounded-full bg-emerald-700 transition-all duration-300"
            style={{
              width: `${Math.min(
                100,
                Math.round((dailyGoalReviewed / dailyGoalTarget) * 100)
              )}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}