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
            "Учні, які вже активно проходять уроки та тренуються у Flunio.",
        loading: "Завантажуємо рейтинг...",
        emptyTitle: "Рейтинг ще формується",
        emptyText: "Пройди урок і стань першим у рейтингу.",
        points: "балів",
        close: "Закрити",
        leader: "Лідер рейтингу",
        top: "TOP",
    },
    ru: {
        title: "Лучшие ученики этой недели",
        titleAll: "Лучшие ученики Flunio",
        subtitle:
            "Рейтинг формируется за уроки, повторение, диктанты и аудиопрактику.",
        compactSubtitle:
            "Ученики, которые уже активно проходят уроки и тренируются во Flunio.",
        loading: "Загружаем рейтинг...",
        emptyTitle: "Рейтинг ещё формируется",
        emptyText: "Пройди урок и стань первым в рейтинге.",
        points: "баллов",
        close: "Закрыть",
        leader: "Лидер рейтинга",
        top: "TOP",
    },
    en: {
        title: "Top learners this week",
        titleAll: "Top Flunio learners",
        subtitle:
            "Ranking is based on lessons, reviews, dictations and audio practice.",
        compactSubtitle:
            "Learners who are already actively completing lessons and training on Flunio.",
        loading: "Loading leaderboard...",
        emptyTitle: "Leaderboard is starting",
        emptyText: "Complete a lesson and become the first learner.",
        points: "pts",
        close: "Close",
        leader: "Leaderboard leader",
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

    if (!cleaned) return "G";

    const parts = cleaned.split(/\s+/).filter(Boolean);

    if (parts.length >= 2) {
        return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
    }

    return cleaned.slice(0, 2).toUpperCase();
}

function getRankTone(rank: number) {
    if (rank === 1) {
        return {
            ring: "border-yellow-300/30 bg-yellow-300/10",
            text: "text-yellow-100",
            glow: "bg-yellow-300/20",
        };
    }

    if (rank === 2) {
        return {
            ring: "border-slate-200/25 bg-slate-200/10",
            text: "text-slate-100",
            glow: "bg-slate-200/15",
        };
    }

    if (rank === 3) {
        return {
            ring: "border-orange-300/25 bg-orange-300/10",
            text: "text-orange-100",
            glow: "bg-orange-300/15",
        };
    }

    return {
        ring: "border-cyan-300/15 bg-cyan-300/10",
        text: "text-cyan-100",
        glow: "bg-cyan-300/10",
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
                const res = await fetch(apiUrl, {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                });

                if (!res.ok) {
                    if (!cancelled) {
                        setEntries([]);
                    }

                    return;
                }

                const data = (await res.json()) as LeaderboardResponse;

                if (!cancelled) {
                    setEntries(data.ok && Array.isArray(data.entries) ? data.entries : []);
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
        if (!entry.avatarUrl) return;

        setSelectedAvatar({
            src: entry.avatarUrl,
            name: entry.displayName,
        });
    }

    function renderAvatar(entry: LeaderboardEntry, size: "sm" | "md" | "lg") {
        const sizeClass =
            size === "lg"
                ? "h-20 w-20 text-xl"
                : size === "md"
                    ? "h-14 w-14 text-base"
                    : "h-11 w-11 text-sm";

        const baseClass = [
            "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full",
            "border border-white/15 bg-white/10 font-bold theme-text shadow-[0_0_22px_rgba(34,211,238,0.12)]",
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
                    "transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/60",
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

    function renderPodiumCard(entry: LeaderboardEntry, variant: "leader" | "side") {
        const tone = getRankTone(entry.rank);
        const isLeader = variant === "leader";

        return (
            <div
                className={[
                    "relative overflow-hidden rounded-3xl border",
                    tone.ring,
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

                <div className="relative flex flex-col items-center text-center">
                    <div
                        className={[
                            "mb-3 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold",
                            tone.ring,
                            tone.text,
                        ].join(" ")}
                    >
                        <span>{getRankIcon(entry.rank)}</span>
                        {isLeader ? <span>{t.leader}</span> : <span>#{entry.rank}</span>}
                    </div>

                    {renderAvatar(entry, isLeader ? "lg" : "md")}

                    <div className="mt-3 min-w-0">
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
                            tone.ring,
                            tone.text,
                            isLeader ? "text-lg" : "text-base",
                        ].join(" ")}
                    >
                        {entry.score}
                    </div>
                </div>
            </div>
        );
    }

    function renderMobileLeader(entry: LeaderboardEntry) {
        const tone = getRankTone(entry.rank);

        return (
            <div
                className={[
                    "relative overflow-hidden rounded-3xl border p-4",
                    tone.ring,
                    "shadow-[0_0_32px_rgba(250,204,21,0.10)]",
                ].join(" ")}
            >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-yellow-300/20 blur-3xl" />

                <div className="relative">
                    <div className="flex items-start gap-4">
                        {renderAvatar(entry, "md")}

                        <div className="min-w-0 flex-1">
                            <div className="mb-2 inline-flex items-center gap-1 rounded-full border border-yellow-300/30 bg-yellow-300/10 px-2.5 py-1 text-[11px] font-extrabold text-yellow-100">
                                🥇 {t.leader}
                            </div>

                            <div className="theme-text break-words text-lg font-black leading-snug">
                                {entry.displayName}
                            </div>

                            <div className="theme-text-muted mt-1 text-sm">
                                {entry.score} {t.points}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <div className="rounded-2xl border border-yellow-300/30 bg-yellow-300/10 px-4 py-2 text-lg font-black text-yellow-100">
                            {entry.score}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function renderMobileRow(entry: LeaderboardEntry) {
        const tone = getRankTone(entry.rank);

        return (
            <div className="theme-home-soft-card flex items-center gap-3 rounded-2xl px-3 py-3">
                <div
                    className={[
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm font-black",
                        tone.ring,
                        tone.text,
                    ].join(" ")}
                >
                    {entry.rank <= 3 ? getRankIcon(entry.rank) : `#${entry.rank}`}
                </div>

                {renderAvatar(entry, "sm")}

                <div className="min-w-0 flex-1">
                    <div className="theme-text truncate text-sm font-bold">
                        {entry.displayName}
                    </div>

                    <div className="theme-text-muted text-xs">
                        {entry.score} {t.points}
                    </div>
                </div>

                <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm font-bold text-emerald-100">
                    {entry.score}
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
            <section className="flunio-card relative overflow-hidden rounded-3xl p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)] sm:p-5 md:p-7">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-300/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="pointer-events-none absolute right-1/4 top-1/3 h-36 w-36 rounded-full bg-fuchsia-400/10 blur-3xl" />

                <div className="relative">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="theme-pill mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold">
                                🏆 Leaderboard
                            </div>

                            <h2 className="theme-text text-2xl font-bold tracking-tight md:text-3xl">
                                {period === "all" ? t.titleAll : t.title}
                            </h2>

                            <p className="theme-text-muted mt-2 max-w-2xl text-sm leading-6">
                                {compact ? t.compactSubtitle : t.subtitle}
                            </p>
                        </div>

                        {entries.length > 0 && (
                            <div className="theme-home-soft-card inline-flex w-fit rounded-full px-4 py-2 text-xs font-extrabold">
                                {t.top} {Math.min(limit, entries.length)}
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <div className="theme-home-soft-card rounded-2xl p-4 text-sm">
                            {t.loading}
                        </div>
                    ) : entries.length === 0 ? (
                        <div className="theme-home-soft-card rounded-2xl p-4">
                            <p className="theme-text font-semibold">{t.emptyTitle}</p>
                            <p className="theme-text-muted mt-1 text-sm">{t.emptyText}</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-3 lg:hidden">
                                {leader ? renderMobileLeader(leader) : null}

                                <div className="space-y-2">
                                    {entries.slice(1).map((entry) => (
                                        <div key={`${entry.rank}-${entry.displayName}`}>
                                            {renderMobileRow(entry)}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="hidden space-y-4 lg:block">
                                <div className="grid gap-3 lg:grid-cols-[0.82fr_1.25fr_0.82fr] lg:items-end">
                                    {second && (
                                        <div className="order-2 lg:order-1">
                                            {renderPodiumCard(second, "side")}
                                        </div>
                                    )}

                                    {leader && (
                                        <div className="order-1 lg:order-2">
                                            {renderPodiumCard(leader, "leader")}
                                        </div>
                                    )}

                                    {third && (
                                        <div className="order-3">
                                            {renderPodiumCard(third, "side")}
                                        </div>
                                    )}
                                </div>

                                {rest.length > 0 && (
                                    <div className="grid gap-2">
                                        {rest.map((entry) => (
                                            <div
                                                key={`${entry.rank}-${entry.displayName}`}
                                                className="theme-home-soft-card flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:-translate-y-0.5"
                                            >
                                                <div className="flex w-10 shrink-0 justify-center text-base font-extrabold theme-text">
                                                    #{entry.rank}
                                                </div>

                                                {renderAvatar(entry, "sm")}

                                                <div className="min-w-0 flex-1">
                                                    <p className="theme-text truncate text-sm font-semibold sm:text-base">
                                                        {entry.displayName}
                                                    </p>

                                                    <p className="theme-text-muted text-xs">
                                                        {entry.score} {t.points}
                                                    </p>
                                                </div>

                                                <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm font-bold text-emerald-100">
                                                    {entry.score}
                                                </div>
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
                            className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-semibold text-white transition hover:bg-white/15"
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