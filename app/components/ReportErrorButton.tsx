"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type ReportPayload = {
  lessonId?: string;
  exercise?: string;
  actionIdx?: number;

  sk?: string;
  ua?: string;
  ru?: string;
  key?: string;
};

const CATEGORIES = [
  { id: "spelling", label: "Орфографія" },
  { id: "translation", label: "Переклад" },
  { id: "grammar", label: "Граматика" },
  { id: "other", label: "Інше" },
] as const;

export default function ReportErrorButton({
  context,
  label = "Повідомити про помилку",
  className = "",
}: {
  context: ReportPayload;
  label?: string;
  className?: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [category, setCategory] =
    useState<(typeof CATEGORIES)[number]["id"]>("grammar");
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
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl p-4 md:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">Повідомити про помилку</div>
                <div className="text-sm text-slate-600">
                  Напиши, що саме не так (слово/фраза/переклад/граматика).
                </div>
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
              <div className="text-sm font-medium mb-1">Категорія</div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={
                      "text-xs px-2 py-1 rounded-full border " +
                      (category === c.id
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 hover:bg-slate-50")
                    }
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <div className="text-sm font-medium mb-1">Опис</div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Наприклад: 'правильно має бути ...' або 'переклад невірний, краще ...'"
                className="w-full rounded-xl border border-slate-300 p-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="text-xs text-slate-600">
                {status === "ok" && (
                  <span className="text-green-600">Відправлено ✅</span>
                )}
                {status === "bad" && (
                  <span className="text-red-600">Не вийшло 😕</span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-sm px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50"
                >
                  Скасувати
                </button>
                <button
                  type="button"
                  disabled={status === "sending" || message.trim().length < 3}
                  onClick={submit}
                  className="text-sm px-3 py-2 rounded-xl bg-slate-900 text-white disabled:opacity-50"
                >
                  {status === "sending" ? "Відправка..." : "Надіслати"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
