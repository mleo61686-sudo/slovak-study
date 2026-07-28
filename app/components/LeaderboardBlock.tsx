"use client";

import { type MouseEvent, useEffect, useMemo, useState } from "react";

import styles from "./LeaderboardBlock.module.css";

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
    leaderboard: "Рейтинг",
    top: "TOP",
    honorBoard: "Дошка пошани",
    activeLearners: "Рейтинг активних учнів",
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
    leaderboard: "Рейтинг",
    top: "TOP",
    honorBoard: "Доска почёта",
    activeLearners: "Рейтинг активных учеников",
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
    leaderboard: "Leaderboard",
    top: "TOP",
    honorBoard: "Honor board",
    activeLearners: "Active learner ranking",
  },
} satisfies Record<Lang, Record<string, string>>;

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

function getRankClass(rank: number) {
  if (rank === 1) return styles.rankFirst;
  if (rank === 2) return styles.rankSecond;
  if (rank === 3) return styles.rankThird;

  return styles.rankOther;
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
  const [refreshKey, setRefreshKey] = useState(0);

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
  }, [apiUrl, refreshKey]);

  useEffect(() => {
    const refreshLeaderboard = () => {
      setRefreshKey((value) => value + 1);
    };

    window.addEventListener(
      "slovakStudy:leaderboardChanged",
      refreshLeaderboard,
    );

    return () => {
      window.removeEventListener(
        "slovakStudy:leaderboardChanged",
        refreshLeaderboard,
      );
    };
  }, []);

  function openAvatar(entry: LeaderboardEntry) {
    if (!entry.avatarUrl) {
      return;
    }

    setSelectedAvatar({
      src: entry.avatarUrl,
      name: entry.displayName,
    });
  }

  function renderBoardAvatar(entry: LeaderboardEntry) {
    const content = entry.avatarUrl ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={entry.avatarUrl}
        alt=""
        className={styles.studentAvatarImage}
      />
    ) : (
      <span>{getInitials(entry.displayName)}</span>
    );

    if (!entry.avatarUrl) {
      return <div className={styles.studentAvatar}>{content}</div>;
    }

    return (
      <button
        type="button"
        onClick={() => openAvatar(entry)}
        className={`${styles.studentAvatar} ${styles.studentAvatarButton}`}
        aria-label={entry.displayName}
      >
        {content}
      </button>
    );
  }

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
            <div className={styles.easelStage}>
              <div className={styles.easelBackLeg} aria-hidden="true" />
              <div className={`${styles.easelLeg} ${styles.easelLegLeft}`} aria-hidden="true" />
              <div className={`${styles.easelLeg} ${styles.easelLegRight}`} aria-hidden="true" />
              <div className={styles.easelCrossbar} aria-hidden="true" />

              <div className={styles.boardFrame}>
                <span className={`${styles.frameScrew} ${styles.screwTopLeft}`} aria-hidden="true" />
                <span className={`${styles.frameScrew} ${styles.screwTopRight}`} aria-hidden="true" />
                <span className={`${styles.frameScrew} ${styles.screwBottomLeft}`} aria-hidden="true" />
                <span className={`${styles.frameScrew} ${styles.screwBottomRight}`} aria-hidden="true" />

                <div className={styles.boardSurface}>
                  <div className={styles.chalkStarLeft} aria-hidden="true">☆</div>
                  <div className={styles.chalkStarRight} aria-hidden="true">☆</div>

                  <div className={styles.boardHeading}>
                    <div className={styles.boardTitle}>{t.honorBoard}</div>
                    <div className={styles.boardTitleUnderline} aria-hidden="true" />
                    <div className={styles.boardSubtitle}>{t.activeLearners}</div>
                  </div>

                  <div className={styles.boardBody}>
                    <div className={styles.trophyDrawing} aria-hidden="true">
                      <div className={styles.trophyCup}>☆</div>
                      <div className={styles.trophyStem} />
                      <div className={styles.trophyBase} />
                    </div>

                    <div className={styles.leaderList}>
                      {entries.map((entry) => (
                        <div
                          key={`${entry.rank}-${entry.displayName}`}
                          className={styles.leaderRow}
                        >
                          <div className={`${styles.rankBadge} ${getRankClass(entry.rank)}`}>
                            {entry.rank}
                          </div>

                          <div className={styles.studentIdentity}>
                            {renderBoardAvatar(entry)}
                            <div className={styles.studentName}>{entry.displayName}</div>
                          </div>

                          <div className={`${styles.studentScore} ${getRankClass(entry.rank)}`}>
                            {entry.score} <span>{t.points}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.pointerStick} aria-hidden="true">
                    <span className={styles.pointerHandle} />
                  </div>

                  <div className={styles.chalkDoodle} aria-hidden="true">✦</div>
                </div>

                <div className={styles.boardTray} aria-hidden="true">
                  <span className={`${styles.chalkPiece} ${styles.chalkWhite}`} />
                  <span className={`${styles.chalkPiece} ${styles.chalkPink}`} />
                  <span className={`${styles.chalkPiece} ${styles.chalkBlue}`} />
                  <span className={`${styles.chalkPiece} ${styles.chalkYellow}`} />
                  <span className={styles.eraser} />
                </div>
              </div>
            </div>
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
            onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
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
