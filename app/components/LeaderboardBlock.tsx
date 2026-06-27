"use client";

import { useEffect, useMemo, useState } from "react";

type Lang = "ua" | "ru" | "en";
type CourseId = "sk" | "cs" | "pl";
type LeaderboardPeriod = "week" | "all";

type LeaderboardEntry = {
  rank: number;
  displayName: string;
  avatarUrl: string | null;
  score: number;
};

type LeaderboardResponse = {
  ok: boolean;
  period?: LeaderboardPeriod;
  weekStart?: string | null;
  courseId?: CourseId | null;
  entries?: LeaderboardEntry[];
};

type LeaderboardBlockProps = {
  lang?: Lang;
  courseId?: CourseId | null;
  limit?: number;
  period?: LeaderboardPeriod;
  compact?: boolean;
};

const UI = {
  ua: {
    title: "Найкращі учні цього тижня",
    titleAll: "Найкращі учні Flunio",
    subtitle:
      "Рейтинг формується за уроки, повторення, диктанти та аудіопрактику.",
    compactSubtitle:
      "Учні, які активно навчаються та набирають найбільше балів.",
    loading: "Завантажуємо рейтинг...",
    emptyTitle: "Рейтинг ще формується",
    emptyText: "Пройди урок і стань першим у рейтингу.",
    points: "балів",
    close: "Закрити",
    leader: "Лідер рейтингу",
    leaderboard: "Рейтинг",
    top: "TOP",
  },

  ru: {
    title: "Лучшие ученики этой недели",
    titleAll: "Лучшие ученики Flunio",
    subtitle:
      "Рейтинг формируется за уроки, повторение, диктанты и аудиопрактику.",
    compactSubtitle:
      "Ученики, которые активно обучаются и набирают больше всего баллов.",
    loading: "Загружаем рейтинг...",
    emptyTitle: "Рейтинг ещё формируется",
    emptyText: "Пройди урок и стань первым в рейтинге.",
    points: "баллов",
    close: "Закрыть",
    leader: "Лидер рейтинга",
    leaderboard: "Рейтинг",
    top: "TOP",
  },

  en: {
    title: "Top learners this week",
    titleAll: "Top Flunio learners",
    subtitle:
      "Ranking is based on lessons, reviews, dictations and audio practice.",
    compactSubtitle:
      "Learners who actively study and earn the most points.",
    loading: "Loading leaderboard...",
    emptyTitle: "Leaderboard is starting",
    emptyText: "Complete a lesson and become the first learner.",
    points: "pts",
    close: "Close",
    leader: "Leaderboard leader",
    leaderboard: "Leaderboard",
    top: "TOP",
  },
} satisfies Record<Lang, Record<string, string>>;

function getRankIcon(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";

  return `#${rank}`;
}

function getInitials(name: string) {
  const cleaned = name.trim();

  if (!cleaned) {
    return "G";
  }

  const parts = cleaned.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }

  return cleaned.slice(0, 2).toUpperCase();
}

function getRankTone(rank: number) {
  if (rank === 1) {
    return {
      card:
        "border-yellow-300/35 bg-gradient-to-r from-yellow-300/10 via-amber-300/5 to-transparent",
      glow: "bg-yellow-300/20",
      badge: "border-yellow-300/35 bg-yellow-300/15 text-yellow-100",
      score: "border-yellow-300/30 bg-yellow-300/10 text-yellow-100",
    };
  }

  if (rank === 2) {
    return {
      card:
        "border-cyan-300/25 bg-gradient-to-r from-cyan-300/10 to-transparent",
      glow: "bg-cyan-300/15",
      badge: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
      score: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
    };
  }

  if (rank === 3) {
    return {
      card:
        "border-orange-300/25 bg-gradient-to-r from-orange-300/10 to-transparent",
      glow: "bg-orange-300/15",
      badge: "border-orange-300/25 bg-orange-300/10 text-orange-100",
      score: "border-orange-300/25 bg-orange-300/10 text-orange-100",
    };
  }

  return {
    card: "border-white/10 bg-white/[0.035]",
    glow: "bg-cyan-300/10",
    badge: "border-white/10 bg-white/5 theme-text",
    score: "border-cyan-300/20 bg-cyan-300/10 theme-text",
  };
}

export default function LeaderboardBlock({
  lang = "ua",
  courseId = null,
  limit = 5,
  period = "all",
  compact = true,
}: LeaderboardBlockProps) {
  const t = UI[lang] ?? UI.ua;

  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  const [selectedAvatar, setSelectedAvatar] = useState<{
    src: string;
    name: string;
  } | null>(null);

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams();

    params.set("limit", String(limit));
    params.set("period", period);

    if (courseId) {
      params.set("courseId", courseId);
    }

    return `/api/leaderboard?${params.toString()}`;
  }, [courseId, limit, period]);

  useEffect(() => {
    let cancelled = false;

    async function loadLeaderboard() {
      setLoading(true);

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          if (!cancelled) {
            setEntries([]);
          }

          return;
        }

        const data = (await response.json()) as LeaderboardResponse;

        if (!cancelled) {
          setEntries(
            data.ok && Array.isArray(data.entries) ? data.entries : [],
          );
        }
      } catch {
        if (!cancelled) {
          setEntries([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  function openAvatar(entry: LeaderboardEntry) {
    if (!entry.avatarUrl) {
      return;
    }

    setSelectedAvatar({
      src: entry.avatarUrl,
      name: entry.displayName,
    });
  }

  function renderAvatar(
    entry: LeaderboardEntry,
    size: "sm" | "md" | "lg",
  ) {
    const sizeClass =
      size === "lg"
        ? "h-20 w-20 text-xl"
        : size === "md"
          ? "h-12 w-12 text-sm sm:h-14 sm:w-14 sm:text-base"
          : "h-9 w-9 text-[11px] sm:h-11 sm:w-11 sm:text-sm";

    const baseClass = [
      "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full",
      "border border-white/15 bg-white/10 font-bold theme-text",
      "shadow-[0_0_20px_rgba(34,211,238,0.10)]",
      sizeClass,
    ].join(" ");

    if (!entry.avatarUrl) {
      return <div className={baseClass}>{getInitials(entry.displayName)}</div>;
    }

    return (
      <button
        type="button"
        onClick={() => openAvatar(entry)}
        className={[
          baseClass,
          "transition hover:scale-105",
          "focus:outline-none focus:ring-2 focus:ring-cyan-400/60",
        ].join(" ")}
        aria-label={entry.displayName}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entry.avatarUrl}
          alt=""
          className="h-full w-full object-cover"
        />

        <span className="pointer-events-none absolute inset-0 rounded-full bg-black/0 transition hover:bg-black/10" />
      </button>
    );
  }

  function renderCompactRow(entry: LeaderboardEntry) {
    const tone = getRankTone(entry.rank);

    return (
      <div
        className={[
          "relative w-full min-w-0 overflow-hidden rounded-2xl border",
          "px-2.5 py-3 sm:px-4",
          tone.card,
          entry.rank === 1
            ? "shadow-[0_12px_35px_rgba(250,204,21,0.08)]"
            : "",
        ].join(" ")}
      >
        <div
          className={[
            "pointer-events-none absolute -right-8 -top-8",
            "h-20 w-20 rounded-full blur-3xl",
            tone.glow,
          ].join(" ")}
        />

        <div
          className={[
            "relative grid min-w-0 items-center",
            "grid-cols-[32px_36px_minmax(0,1fr)] gap-2",
            "sm:grid-cols-[36px_44px_minmax(0,1fr)] sm:gap-3",
          ].join(" ")}
        >
          <div
            className={[
              "flex h-8 w-8 shrink-0 items-center justify-center",
              "rounded-xl border text-xs font-extrabold",
              "sm:h-9 sm:w-9 sm:text-sm",
              tone.badge,
            ].join(" ")}
          >
            {entry.rank <= 3 ? getRankIcon(entry.rank) : `#${entry.rank}`}
          </div>

          {renderAvatar(entry, "sm")}

          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
              <div className="theme-text min-w-0 flex-1 truncate text-[12px] font-bold sm:text-sm">
                {entry.displayName}
              </div>

              <div
                className={[
                  "shrink-0 rounded-lg border px-1.5 py-1",
                  "text-[11px] font-extrabold sm:rounded-xl",
                  "sm:px-2.5 sm:text-sm",
                  tone.score,
                ].join(" ")}
              >
                {entry.score}
              </div>
            </div>

            <div className="theme-text-muted mt-0.5 truncate text-[10px] sm:text-xs">
              {entry.rank === 1
                ? t.leader
                : `${entry.score} ${t.points}`}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderPodiumCard(
    entry: LeaderboardEntry,
    variant: "leader" | "side",
  ) {
    const tone = getRankTone(entry.rank);
    const isLeader = variant === "leader";

    return (
      <div
        className={[
          "relative min-w-0 overflow-hidden rounded-3xl border",
          tone.card,
          isLeader
            ? "p-5 shadow-[0_0_38px_rgba(250,204,21,0.10)]"
            : "p-4",
        ].join(" ")}
      >
        <div
          className={[
            "pointer-events-none absolute -right-10 -top-10 rounded-full blur-3xl",
            tone.glow,
            isLeader ? "h-28 w-28" : "h-20 w-20",
          ].join(" ")}
        />

        <div className="relative flex min-w-0 flex-col items-center text-center">
          <div
            className={[
              "mb-3 inline-flex items-center gap-1 rounded-full border px-3 py-1",
              "text-xs font-bold",
              tone.badge,
            ].join(" ")}
          >
            <span>{getRankIcon(entry.rank)}</span>

            <span>{isLeader ? t.leader : `#${entry.rank}`}</span>
          </div>

          {renderAvatar(entry, isLeader ? "lg" : "md")}

          <div className="mt-3 min-w-0 max-w-full">
            <div
              className={[
                "theme-text truncate font-bold",
                isLeader ? "text-xl" : "text-base",
              ].join(" ")}
            >
              {entry.displayName}
            </div>

            <div className="theme-text-muted mt-1 text-sm">
              {entry.score} {t.points}
            </div>
          </div>

          <div
            className={[
              "mt-4 rounded-full border px-4 py-1.5 font-extrabold",
              tone.score,
              isLeader ? "text-lg" : "text-base",
            ].join(" ")}
          >
            {entry.score}
          </div>
        </div>
      </div>
    );
  }

  const leader = entries[0] ?? null;
  const second = entries[1] ?? null;
  const third = entries[2] ?? null;
  const rest = entries.slice(3);

  return (
    <>
      <section className="flunio-card relative w-full min-w-0 overflow-hidden rounded-[28px] px-3 py-4 shadow-[0_18px_55px_rgba(0,0,0,0.18)] sm:p-5 lg:p-7">
        <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-yellow-300/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="pointer-events-none absolute right-1/3 top-1/3 h-32 w-32 rounded-full bg-fuchsia-400/10 blur-3xl" />

        <div className="relative min-w-0">
          <div className="mb-5 flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="theme-pill mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                <span aria-hidden="true">🏆</span>
                <span>{t.leaderboard}</span>
              </div>

              <h2 className="theme-text text-[22px] font-bold leading-tight tracking-tight sm:text-2xl lg:text-3xl">
                {period === "all" ? t.titleAll : t.title}
              </h2>

              <p className="theme-text-muted mt-2 max-w-2xl text-sm leading-6">
                {compact ? t.compactSubtitle : t.subtitle}
              </p>
            </div>

            {entries.length > 0 && (
              <div className="theme-home-soft-card hidden shrink-0 rounded-full px-4 py-2 text-xs font-extrabold theme-text sm:inline-flex">
                {t.top} {Math.min(limit, entries.length)}
              </div>
            )}
          </div>

          {loading ? (
            <div className="theme-home-soft-card rounded-2xl p-4 text-sm theme-text-muted">
              {t.loading}
            </div>
          ) : entries.length === 0 ? (
            <div className="theme-home-soft-card rounded-2xl p-4">
              <p className="theme-text font-semibold">{t.emptyTitle}</p>

              <p className="theme-text-muted mt-1 text-sm">{t.emptyText}</p>
            </div>
          ) : (
            <>
              <div className="grid min-w-0 gap-2.5 lg:hidden">
                {entries.map((entry) => (
                  <div
                    key={`${entry.rank}-${entry.displayName}`}
                    className="min-w-0"
                  >
                    {renderCompactRow(entry)}
                  </div>
                ))}
              </div>

              <div className="hidden min-w-0 space-y-4 lg:block">
                <div className="grid min-w-0 items-end gap-3 lg:grid-cols-[0.82fr_1.25fr_0.82fr]">
                  <div className="min-w-0">
                    {second ? renderPodiumCard(second, "side") : null}
                  </div>

                  <div className="min-w-0">
                    {leader ? renderPodiumCard(leader, "leader") : null}
                  </div>

                  <div className="min-w-0">
                    {third ? renderPodiumCard(third, "side") : null}
                  </div>
                </div>

                {rest.length > 0 && (
                  <div className="grid min-w-0 gap-2">
                    {rest.map((entry) => (
                      <div
                        key={`${entry.rank}-${entry.displayName}`}
                        className="min-w-0"
                      >
                        {renderCompactRow(entry)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {selectedAvatar && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm"
          onClick={() => setSelectedAvatar(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-slate-950 p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedAvatar(null)}
              className={[
                "absolute right-3 top-3 rounded-full",
                "border border-white/10 bg-white/10 px-3 py-1",
                "text-sm font-semibold text-white",
                "transition hover:bg-white/15",
              ].join(" ")}
            >
              {t.close}
            </button>

            <div className="pt-8 text-center">
              <div className="mx-auto h-48 w-48 overflow-hidden rounded-full border border-white/15 bg-white/10 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedAvatar.src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 text-lg font-bold text-white">
                {selectedAvatar.name}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}