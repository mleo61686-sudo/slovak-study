"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";

export default function ForgotPasswordPage() {
  const { lang } = useLanguage();

  const dict = {
    ua: {
      title: "Відновлення пароля",
      email: "Email",
      btn: "Надіслати посилання",
      ok: "Якщо акаунт існує — ми надіслали лист.",
      back: "← Назад до входу",
      hint: "Введи email — ми надішлемо посилання для скидання пароля.",
      footer: "© 2026 Flunio — вивчай мови щодня.",
    },
    ru: {
      title: "Восстановление пароля",
      email: "Email",
      btn: "Отправить ссылку",
      ok: "Если аккаунт существует — мы отправили письмо.",
      back: "← Назад ко входу",
      hint: "Введи email — мы отправим ссылку для сброса пароля.",
      footer: "© 2026 Flunio — изучай языки каждый день.",
    },
  } as const;

  const t = dict[lang];

  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[calc(100dvh-64px-64px)] items-center justify-center overflow-hidden px-4 py-6">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">{t.title}</h1>
          <p className="mt-2 text-sm text-slate-600">{t.hint}</p>

          {done ? (
            <div className="mt-6 text-slate-700">{t.ok}</div>
          ) : (
            <div className="mt-6 space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                {t.email}
              </label>

              <input
                className="w-full rounded-xl border bg-white px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                autoComplete="email"
              />

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                <button
                  onClick={submit}
                  disabled={!email.trim() || loading}
                  className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
                >
                  {t.btn}
                </button>

                <Link href="/login" className="text-sm underline">
                  {t.back}
                </Link>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">{t.footer}</p>
      </div>
    </div>
  );
}