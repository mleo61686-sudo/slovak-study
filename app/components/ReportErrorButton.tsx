"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/src/language";

type ReportPayload = {
  lessonId?: string;
  exercise?: string;
  actionIdx?: number;

  sk?: string;
  ua?: string;
  ru?: string;
  key?: string;
};

const UI: Record<
  Lang,
  {
    button: string;
    title: string;
    subtitle: string;
    category: string;
    description: string;
    placeholder: string;
    sent: string;
    failed: string;
    cancel: string;
    sending: string;
    send: string;
    categories: {
      spelling: string;
      translation: string;
      grammar: string;
      other: string;
    };
  }
> = {
  ua: {
    button: "Повідомити про помилку",
    title: "Повідомити про помилку",
    subtitle: "Напиши, що саме не так (слово/фраза/переклад/граматика).",
    category: "Категорія",
    description: "Опис",
    placeholder:
      "Наприклад: 'правильно має бути ...' або 'переклад невірний, краще ...'",
    sent: "Відправлено ✅",
    failed: "Не вийшло 😕",
    cancel: "Скасувати",
    sending: "Відправка...",
    send: "Надіслати",
    categories: {
      spelling: "Орфографія",
      translation: "Переклад",
      grammar: "Граматика",
      other: "Інше",
    },
  },
  ru: {
    button: "Сообщить об ошибке",
    title: "Сообщить об ошибке",
    subtitle: "Напиши, что именно не так (слово/фраза/перевод/грамматика).",
    category: "Категория",
    description: "Описание",
    placeholder:
      "Например: 'правильно должно быть ...' или 'перевод неверный, лучше ...'",
    sent: "Отправлено ✅",
    failed: "Не получилось 😕",
    cancel: "Отмена",
    sending: "Отправка...",
    send: "Отправить",
    categories: {
      spelling: "Орфография",
      translation: "Перевод",
      grammar: "Грамматика",
      other: "Другое",
    },
  },
  en: {
    button: "Report an error",
    title: "Report an error",
    subtitle: "Describe what is wrong (word/phrase/translation/grammar).",
    category: "Category",
    description: "Description",
    placeholder:
      "For example: 'it should be ...' or 'the translation is incorrect, better: ...'",
    sent: "Sent ✅",
    failed: "Something went wrong 😕",
    cancel: "Cancel",
    sending: "Sending...",
    send: "Send",
    categories: {
      spelling: "Spelling",
      translation: "Translation",
      grammar: "Grammar",
      other: "Other",
    },
  },
};

const CATEGORY_IDS = ["spelling", "translation", "grammar", "other"] as const;
type CategoryId = (typeof CATEGORY_IDS)[number];

export default function ReportErrorButton({
  context,
  lang,
  label,
  className = "",
}: {
  context: ReportPayload;
  lang: Lang;
  label?: string;
  className?: string;
}) {
  const ui = UI[lang] ?? UI.ua;

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<CategoryId>("grammar");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "bad">(
    "idle"
  );

  const preview = useMemo(() => {
    const parts = [
      context.sk ? `SK: ${context.sk}` : null,
      context.ua ? `UA: ${context.ua}` : null,
      context.ru ? `RU: ${context.ru}` : null,
    ].filter(Boolean);
    return parts.join(" • ");
  }, [context.sk, context.ua, context.ru]);

  async function submit() {
    if (message.trim().length < 3) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/report-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: pathname,
          ...context,
          category,
          message: message.trim(),
          userAgent:
            typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setStatus("ok");
        setMessage("");
        setTimeout(() => {
          setOpen(false);
          setStatus("idle");
        }, 600);
      } else {
        setStatus("bad");
      }
    } catch {
      setStatus("bad");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          "theme-secondary-button rounded-xl px-3 py-1.5 text-xs font-semibold transition " +
          className
        }
      >
        {label ?? ui.button}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          <div className="flunio-card relative w-full max-w-lg overflow-hidden rounded-3xl p-4 theme-text shadow-[0_0_32px_rgba(34,211,238,0.18)] md:p-5">
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold theme-text">
                    {ui.title}
                  </div>
                  <div className="text-sm theme-text-muted">{ui.subtitle}</div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="theme-secondary-button rounded-xl px-2 py-1 transition"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {preview && (
                <div className="theme-home-soft-card mt-3 rounded-2xl p-3 text-xs theme-text-muted">
                  {preview}
                </div>
              )}

              <div className="mt-4">
                <div className="mb-2 text-sm font-medium theme-text">
                  {ui.category}
                </div>

                <div className="flex flex-wrap gap-2">
                  {CATEGORY_IDS.map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setCategory(id)}
                      className={[
                        "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                        category === id
                          ? "theme-primary-button"
                          : "theme-secondary-button",
                      ].join(" ")}
                    >
                      {ui.categories[id]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 text-sm font-medium theme-text">
                  {ui.description}
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder={ui.placeholder}
                  className="theme-input w-full rounded-2xl p-3 text-sm outline-none transition focus:border-cyan-400/50 focus:shadow-[0_0_18px_rgba(34,211,238,0.18)]"
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-xs theme-text-muted">
                  {status === "ok" && (
                    <span className="font-semibold text-emerald-300">
                      {ui.sent}
                    </span>
                  )}
                  {status === "bad" && (
                    <span className="font-semibold text-red-300">
                      {ui.failed}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="theme-secondary-button rounded-2xl px-3 py-2 text-sm font-semibold transition"
                  >
                    {ui.cancel}
                  </button>

                  <button
                    type="button"
                    disabled={status === "sending" || message.trim().length < 3}
                    onClick={submit}
                    className="theme-primary-button rounded-2xl px-3 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {status === "sending" ? ui.sending : ui.send}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}