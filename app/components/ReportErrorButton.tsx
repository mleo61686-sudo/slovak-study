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
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "bad">("idle");

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
          "text-xs px-2 py-1 rounded-md border border-slate-300 hover:bg-slate-50 " +
          className
        }
      >
        {label ?? ui.button}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl p-4 md:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{ui.title}</div>
                <div className="text-sm text-slate-600">{ui.subtitle}</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-2 py-1 rounded-md hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {preview && (
              <div className="mt-3 text-xs rounded-xl bg-slate-50 border border-slate-200 p-2 text-slate-700">
                {preview}
              </div>
            )}

            <div className="mt-3">
              <div className="text-sm font-medium mb-1">{ui.category}</div>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_IDS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCategory(id)}
                    className={
                      "text-xs px-2 py-1 rounded-full border " +
                      (category === id
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 hover:bg-slate-50")
                    }
                  >
                    {ui.categories[id]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <div className="text-sm font-medium mb-1">{ui.description}</div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder={ui.placeholder}
                className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="text-xs text-slate-600">
                {status === "ok" && <span className="text-green-600">{ui.sent}</span>}
                {status === "bad" && <span className="text-red-600">{ui.failed}</span>}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-sm px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50"
                >
                  {ui.cancel}
                </button>
                <button
                  type="button"
                  disabled={status === "sending" || message.trim().length < 3}
                  onClick={submit}
                  className="text-sm px-3 py-2 rounded-xl bg-slate-900 text-white disabled:opacity-50"
                >
                  {status === "sending" ? ui.sending : ui.send}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}