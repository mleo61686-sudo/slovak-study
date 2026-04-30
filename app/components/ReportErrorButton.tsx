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
          "rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/65 backdrop-blur transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white " +
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

          <div className="flunio-card relative w-full max-w-lg overflow-hidden rounded-3xl p-4 text-white shadow-[0_0_32px_rgba(34,211,238,0.18)] md:p-5">
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-white">
                    {ui.title}
                  </div>
                  <div className="text-sm text-white/60">{ui.subtitle}</div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-white/60 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {preview && (
                <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white/65 backdrop-blur">
                  {preview}
                </div>
              )}

              <div className="mt-4">
                <div className="mb-2 text-sm font-medium text-white/80">
                  {ui.category}
                </div>

                <div className="flex flex-wrap gap-2">
                  {CATEGORY_IDS.map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setCategory(id)}
                      className={[
                        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                        category === id
                          ? "border-cyan-400/50 bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 text-white shadow-[0_0_18px_rgba(59,130,246,0.25)]"
                          : "border-white/10 bg-white/5 text-white/65 hover:border-cyan-400/40 hover:bg-white/10 hover:text-white",
                      ].join(" ")}
                    >
                      {ui.categories[id]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 text-sm font-medium text-white/80">
                  {ui.description}
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder={ui.placeholder}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder:text-white/35 outline-none backdrop-blur transition focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-[0_0_18px_rgba(34,211,238,0.18)]"
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-xs text-white/55">
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
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    {ui.cancel}
                  </button>

                  <button
                    type="button"
                    disabled={status === "sending" || message.trim().length < 3}
                    onClick={submit}
                    className="rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-3 py-2 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
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