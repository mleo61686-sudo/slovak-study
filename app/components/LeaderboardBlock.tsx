"use client";

import { type MouseEvent, useEffect, useMemo, useState } from "react";
import { getUserLevel } from "@/app/components/words-srs/words-srs-storage";

import styles from "./LeaderboardBlock.module.css";

type Lang = "ua" | "ru" | "en";
type CourseId = "sk" | "cs" | "pl";
type LeaderboardPeriod = "week" | "all";

type LeaderboardEntry = {
  rank: number;
  displayName: string;
  avatarUrl: string | null;
  score: number;
  publicId: string;
  xp: number;
  age: number | null;
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
    profileTitle: "Картка учня",
    xp: "Досвід",
    age: "Вік",
    rankTitle: "Звання",
    level: "Рівень",
    flunioId: "ID Flunio",
    notSpecified: "Не вказано",
    rankingPoints: "Бали рейтингу",
    experienceHint: "XP нараховується за повторення слів.",
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
    profileTitle: "Карточка ученика",
    xp: "Опыт",
    age: "Возраст",
    rankTitle: "Звание",
    level: "Уровень",
    flunioId: "ID Flunio",
    notSpecified: "Не указано",
    rankingPoints: "Баллы рейтинга",
    experienceHint: "XP начисляется за повторение слов.",
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
    profileTitle: "Learner card",
    xp: "Experience",
    age: "Age",
    rankTitle: "Title",
    level: "Level",
    flunioId: "Flunio ID",
    notSpecified: "Not specified",
    rankingPoints: "Ranking points",
    experienceHint: "XP is earned through word review.",
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
  limit = 10,
  period = "all",
  compact = true,
}: LeaderboardBlockProps) {
  const t = UI[lang] ?? UI.ua;

  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedProfile, setSelectedProfile] =
    useState<LeaderboardEntry | null>(null);

  const duplicateNameKeys = useMemo(() => {
    const counts = new Map<string, number>();

    for (const entry of entries) {
      const key = entry.displayName.trim().toLocaleLowerCase();
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    return new Set(
      [...counts.entries()]
        .filter(([, count]) => count > 1)
        .map(([key]) => key),
    );
  }, [entries]);

  const selectedLevel = useMemo(
    () => (selectedProfile ? getUserLevel(selectedProfile.xp) : null),
    [selectedProfile],
  );

  const selectedLevelTitle = selectedLevel
    ? selectedLevel.title[lang] ?? selectedLevel.title.ua
    : "";

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
    if (!selectedProfile) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedProfile(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProfile]);

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

  function openProfile(entry: LeaderboardEntry) {
    setSelectedProfile(entry);
  }

  function renderBoardAvatar(entry: LeaderboardEntry) {
    return (
      <button
        type="button"
        onClick={() => openProfile(entry)}
        className={`${styles.studentAvatar} ${styles.studentAvatarButton}`}
        aria-label={`${t.profileTitle}: ${entry.displayName}`}
      >
        {entry.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.avatarUrl}
            alt=""
            className={styles.studentAvatarImage}
          />
        ) : (
          <span>{getInitials(entry.displayName)}</span>
        )}
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
                          key={`${entry.publicId}-${entry.rank}`}
                          className={styles.leaderRow}
                        >
                          <div className={`${styles.rankBadge} ${getRankClass(entry.rank)}`}>
                            {entry.rank}
                          </div>

                          <div className={styles.studentIdentity}>
                            {renderBoardAvatar(entry)}
                            <div className={styles.studentText}>
                              <div className={styles.studentName}>
                                {entry.displayName}
                              </div>
                              {duplicateNameKeys.has(
                                entry.displayName.trim().toLocaleLowerCase(),
                              ) ? (
                                <div className={styles.studentPublicId}>
                                  #{entry.publicId}
                                </div>
                              ) : null}
                            </div>
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

      {selectedProfile && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProfile(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${t.profileTitle}: ${selectedProfile.displayName}`}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-5 text-white shadow-2xl sm:p-6"
            onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-fuchsia-500/15 blur-3xl" />

            <button
              type="button"
              onClick={() => setSelectedProfile(null)}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/10 text-xl font-semibold text-white transition hover:bg-white/15"
              aria-label={t.close}
            >
              ×
            </button>

            <div className="relative pt-3 text-center">
              <div className="mx-auto grid h-28 w-28 place-items-center overflow-hidden rounded-full border-2 border-cyan-300/45 bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 text-3xl font-extrabold shadow-[0_0_40px_rgba(34,211,238,0.16)]">
                {selectedProfile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedProfile.avatarUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(selectedProfile.displayName)
                )}
              </div>

              <div className="mt-4 text-xl font-bold">
                {selectedProfile.displayName}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t.flunioId}: {selectedProfile.publicId}
              </div>
            </div>

            <div className="relative mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-amber-300/15 bg-amber-300/10 p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                  {t.xp}
                </div>
                <div className="mt-1 text-lg font-extrabold">
                  {selectedProfile.xp} XP
                </div>
              </div>

              <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
                  {t.rankingPoints}
                </div>
                <div className="mt-1 text-lg font-extrabold">
                  {selectedProfile.score}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {t.age}
                </div>
                <div className="mt-1 font-bold">
                  {selectedProfile.age ?? t.notSpecified}
                </div>
              </div>

              <div className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {t.rankTitle}
                </div>
                <div className="mt-1 truncate font-bold" title={selectedLevelTitle}>
                  ⭐ {selectedLevelTitle || t.notSpecified}
                </div>
                {selectedLevel ? (
                  <div className="mt-1 text-xs text-slate-400">
                    {t.level} {selectedLevel.level}
                  </div>
                ) : null}
              </div>
            </div>

            <p className="relative mt-4 text-center text-xs leading-5 text-slate-400">
              {t.experienceHint}
            </p>
          </div>
        </div>
      )}

    </>
  );
}
