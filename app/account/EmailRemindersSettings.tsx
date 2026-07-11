"use client";

import { useEffect, useState } from "react";

type Lang = "ua" | "ru" | "en";

type EmailRemindersSettingsProps = {
    lang: Lang;
};

type ReminderSettingsResponse = {
    emailRemindersEnabled?: boolean;
};

const TEXT: Record<
    Lang,
    {
        cardTitle: string;
        title: string;
        description: string;
        enabled: string;
        disabled: string;
        loading: string;
        saving: string;
        enabledSuccess: string;
        disabledSuccess: string;
        loadError: string;
        saveError: string;
    }
> = {
    ua: {
        cardTitle: "Листи від Flunio",
        title: "Новини та корисні пропозиції",
        description:
            "Отримуй інформацію про оновлення Flunio, нові можливості та корисні пропозиції. Також іноді нагадаємо повернутися до навчання.",
        enabled: "Увімкнено",
        disabled: "Вимкнено",
        loading: "Завантаження…",
        saving: "Зберігаю…",
        enabledSuccess: "Листи увімкнено.",
        disabledSuccess: "Листи вимкнено.",
        loadError: "Не вдалося завантажити налаштування листів.",
        saveError: "Не вдалося змінити налаштування листів.",
    },

    ru: {
        cardTitle: "Письма от Flunio",
        title: "Новости и полезные предложения",
        description:
            "Получай информацию об обновлениях Flunio, новых возможностях и полезных предложениях. Также иногда мы напомним вернуться к обучению.",
        enabled: "Включено",
        disabled: "Выключено",
        loading: "Загрузка…",
        saving: "Сохраняю…",
        enabledSuccess: "Письма включены.",
        disabledSuccess: "Письма выключены.",
        loadError: "Не удалось загрузить настройки писем.",
        saveError: "Не удалось изменить настройки писем.",
    },

    en: {
        cardTitle: "Emails from Flunio",
        title: "Updates and useful offers",
        description:
            "Get information about Flunio updates, new features, and useful offers. We may also occasionally remind you to continue learning.",
        enabled: "Enabled",
        disabled: "Disabled",
        loading: "Loading…",
        saving: "Saving…",
        enabledSuccess: "Emails enabled.",
        disabledSuccess: "Emails disabled.",
        loadError: "Could not load email settings.",
        saveError: "Could not update email settings.",
    },
};

export default function EmailRemindersSettings({
    lang,
}: EmailRemindersSettingsProps) {
    const tr = TEXT[lang];

    const [enabled, setEnabled] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadSettings() {
            setLoaded(false);
            setError("");

            try {
                const response = await fetch("/api/email-reminders", {
                    method: "GET",
                    cache: "no-store",
                    credentials: "include",
                });

                const data =
                    (await response.json().catch(() => ({}))) as ReminderSettingsResponse;

                if (cancelled) {
                    return;
                }

                if (!response.ok) {
                    throw new Error("Could not load email settings");
                }

                setEnabled(data.emailRemindersEnabled === true);
            } catch {
                if (!cancelled) {
                    setError(TEXT[lang].loadError);
                }
            } finally {
                if (!cancelled) {
                    setLoaded(true);
                }
            }
        }

        void loadSettings();

        return () => {
            cancelled = true;
        };
    }, [lang]);

    useEffect(() => {
        if (!success) {
            return;
        }

        const timer = window.setTimeout(() => {
            setSuccess("");
        }, 3500);

        return () => window.clearTimeout(timer);
    }, [success]);

    async function handleToggle() {
        if (!loaded || saving) {
            return;
        }

        const nextEnabled = !enabled;

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("/api/email-reminders", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    emailRemindersEnabled: nextEnabled,
                    emailLanguage: lang,
                }),
            });

            const data = (await response.json().catch(() => ({}))) as {
                success?: boolean;
                emailRemindersEnabled?: boolean;
            };

            if (!response.ok || !data.success) {
                throw new Error("Could not update email settings");
            }

            const savedValue = data.emailRemindersEnabled === true;

            setEnabled(savedValue);
            setSuccess(
                savedValue ? tr.enabledSuccess : tr.disabledSuccess,
            );
        } catch {
            setError(tr.saveError);
        } finally {
            setSaving(false);
        }
    }

    const statusText = !loaded
        ? tr.loading
        : saving
            ? tr.saving
            : enabled
                ? tr.enabled
                : tr.disabled;

    return (
        <div className="theme-home-soft-card rounded-3xl p-6 theme-text transition hover:-translate-y-0.5">
            <h2 className="text-xl font-semibold theme-text">
                {tr.cardTitle}
            </h2>

            <div className="mt-4 grid gap-3">
                <div className="theme-inner-card rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                            <div className="text-sm font-semibold theme-text">
                                {tr.title}
                            </div>

                            <div className="mt-1 text-sm leading-6 theme-text-muted">
                                {tr.description}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleToggle}
                            disabled={!loaded || saving}
                            aria-pressed={enabled}
                            aria-label={tr.title}
                            className={[
                                "relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border shadow-sm transition",
                                enabled
                                    ? "border-cyan-400/60 bg-cyan-500/40 shadow-cyan-500/20"
                                    : "border-slate-400/70 bg-slate-200 shadow-slate-300/40",
                                !loaded || saving
                                    ? "cursor-not-allowed opacity-60"
                                    : "",
                            ].join(" ")}
                        >
                            <span
                                className={[
                                    "inline-block h-6 w-6 rounded-full shadow-md ring-1 transition",
                                    enabled
                                        ? "translate-x-7 bg-cyan-50 ring-cyan-200"
                                        : "translate-x-1 bg-slate-700 ring-slate-500",
                                ].join(" ")}
                            />
                        </button>
                    </div>

                    <div className="mt-3 text-xs font-semibold theme-text-subtle">
                        {statusText}
                    </div>
                </div>

                {error ? (
                    <div
                        role="alert"
                        className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                    >
                        {error}
                    </div>
                ) : null}

                {success ? (
                    <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                        {success}
                    </div>
                ) : null}
            </div>
        </div>
    );
}