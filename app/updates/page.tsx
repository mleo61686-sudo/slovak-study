"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { UPDATES, type UpdateItem } from "./updates";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru";

const I18N = {
    ua: {
        title: "Оновлення",
        subtitle:
            "Що нового на Slovak Study: покращення, виправлення та нові функції.",
        back: "На головну",
        empty: "Поки що немає оновлень.",
        months: "Архів",
        hintTitle: "Підказка",
    },
    ru: {
        title: "Обновления",
        subtitle: "Что нового на Slovak Study: улучшения, исправления и новые функции.",
        back: "На главную",
        empty: "Пока нет обновлений.",
        months: "Архив",
        hintTitle: "Подсказка",
    },
} satisfies Record<Lang, any>;

function fmtDate(dateISO: string) {
    // "2026-02-15" -> { day:"15", month:"02", year:"2026" }
    const [y, m, d] = dateISO.split("-");
    return { y, m, d, short: `${d}.${m}`, full: `${d}.${m}.${y}` };
}

function monthLabel(m: string, L: Lang) {
    const idx = Number(m) - 1;
    const ua = [
        "січень",
        "лютий",
        "березень",
        "квітень",
        "травень",
        "червень",
        "липень",
        "серпень",
        "вересень",
        "жовтень",
        "листопад",
        "грудень",
    ];
    const ru = [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь",
    ];
    return (L === "ru" ? ru : ua)[idx] ?? m;
}

type MonthGroup = {
    key: string; // "2026-02"
    y: string;
    m: string;
    items: UpdateItem[];
};

export default function UpdatesPage() {
    const { lang } = useLanguage();
    const L: Lang = lang === "ru" ? "ru" : "ua";
    const tr = I18N[L];

    // newest first
    const sorted = useMemo(() => {
        return [...UPDATES].sort((a, b) => (a.date < b.date ? 1 : -1));
    }, []);

    const groups: MonthGroup[] = useMemo(() => {
        const map = new Map<string, MonthGroup>();
        for (const u of sorted) {
            const { y, m } = fmtDate(u.date);
            const key = `${y}-${m}`;
            if (!map.has(key)) map.set(key, { key, y, m, items: [] });
            map.get(key)!.items.push(u);
        }
        return Array.from(map.values()).sort((a, b) => (a.key < b.key ? 1 : -1));
    }, [sorted]);

    const [activeDate, setActiveDate] = useState<string | null>(
        sorted[0]?.date ?? null
    );

    const active = useMemo(() => {
        return sorted.find((u) => u.date === activeDate) ?? sorted[0] ?? null;
    }, [sorted, activeDate]);

    if (!sorted.length) {
        return (
            <div className="w-full px-6 py-8">
                <div className="max-w-5xl">
                    <div className="flex items-center justify-between gap-3">
                        <h1 className="text-2xl font-bold">{tr.title}</h1>
                        <Link href="/" className="text-sm font-semibold text-slate-700 hover:underline">
                            ← {tr.back}
                        </Link>
                    </div>
                    <p className="mt-4 text-slate-600">{tr.empty}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            {/* НЕ центруємо mx-auto — тримаємо реально зліва */}
            <div className="max-w-6xl">
                <div className="grid gap-8 lg:grid-cols-[340px_1fr] items-start">
                    {/* LEFT SIDEBAR */}
                    <aside className="space-y-5 lg:sticky lg:top-24">
                        {/* title + subtitle + back */}
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">{tr.title}</h1>
                                <p className="mt-2 text-slate-600">{tr.subtitle}</p>
                            </div>

                            <Link
                                href="/"
                                className="shrink-0 inline-flex h-10 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                            >
                                ← {tr.back}
                            </Link>
                        </div>

                        {/* archive */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold text-slate-900">
                                    {tr.months}
                                </div>
                                <span className="text-xs text-slate-500">{sorted.length}</span>
                            </div>

                            <div className="mt-3 space-y-4">
                                {groups.map((g) => (
                                    <div key={g.key}>
                                        <div className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            {monthLabel(g.m, L)} {g.y}
                                        </div>

                                        <div className="mt-2 space-y-1">
                                            {g.items.map((u) => {
                                                const d = fmtDate(u.date);
                                                const isActive = u.date === activeDate;

                                                return (
                                                    <button
                                                        key={u.date}
                                                        type="button"
                                                        onClick={() => setActiveDate(u.date)}
                                                        className={[
                                                            "w-full rounded-2xl border px-3 py-2 text-left transition",
                                                            isActive
                                                                ? "border-slate-900 bg-slate-900 text-white"
                                                                : "border-slate-200 bg-white hover:bg-slate-50",
                                                        ].join(" ")}
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="min-w-0">
                                                                <div
                                                                    className={[
                                                                        "text-xs",
                                                                        isActive ? "text-white/80" : "text-slate-500",
                                                                    ].join(" ")}
                                                                >
                                                                    {d.full}
                                                                </div>
                                                                <div
                                                                    className={[
                                                                        "mt-0.5 truncate text-sm font-semibold",
                                                                        isActive ? "text-white" : "text-slate-900",
                                                                    ].join(" ")}
                                                                >
                                                                    {u.title[L]}
                                                                </div>
                                                            </div>

                                                            <div
                                                                className={[
                                                                    "mt-1 rounded-full px-2 py-0.5 text-[11px] font-bold",
                                                                    isActive
                                                                        ? "bg-white/15 text-white"
                                                                        : "bg-amber-100 text-amber-900",
                                                                ].join(" ")}
                                                            >
                                                                {d.short}
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT CONTENT */}
                    <main className="space-y-4">
                        {active && (
                            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <div className="text-sm text-slate-500">
                                            {fmtDate(active.date).full}
                                        </div>
                                        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                                            {active.title[L]}
                                        </h2>
                                    </div>

                                    <div className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-900">
                                        {fmtDate(active.date).short}
                                    </div>
                                </div>

                                <ul className="mt-5 space-y-2">
                                    {active.items[L].map((it) => (
                                        <li key={it} className="flex gap-3">
                                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                                            <span className="text-slate-700">{it}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        )}

                    </main>
                </div>
            </div>
        </div>
    );
}
