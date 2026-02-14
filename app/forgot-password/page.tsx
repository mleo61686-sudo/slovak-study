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
    },
    ru: {
      title: "Восстановление пароля",
      email: "Email",
      btn: "Отправить ссылку",
      ok: "Если аккаунт существует — мы отправили письмо.",
      back: "← Назад ко входу",
      hint: "Введи email — мы отправим ссылку для сброса пароля.",
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
    <div className="h-[calc(100dvh-64px-64px)] overflow-hidden flex items-center justify-center px-4 py-6">

      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
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
                className="w-full border rounded-xl px-3 py-2 bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                autoComplete="email"
              />

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                <button
                  onClick={submit}
                  disabled={!email.trim() || loading}
                  className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
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

        <p className="mt-6 text-center text-xs text-slate-500">
          © 2026 Slovak Study — вчи словацьку щодня.
        </p>
      </div>
    </div>
  );
}
