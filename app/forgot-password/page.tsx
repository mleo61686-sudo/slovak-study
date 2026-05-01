"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

type ForgotPasswordI18n = {
  title: string;
  email: string;
  btn: string;
  ok: string;
  back: string;
  hint: string;
  footer: string;
};

const dict: Record<Lang, ForgotPasswordI18n> = {
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
  en: {
    title: "Password reset",
    email: "Email",
    btn: "Send reset link",
    ok: "If the account exists, we have sent an email.",
    back: "← Back to login",
    hint: "Enter your email and we will send you a link to reset your password.",
    footer: "© 2026 Flunio — learn languages every day.",
  },
};

export default function ForgotPasswordPage() {
  const { lang } = useLanguage();
  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = dict[L];

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
    <div className="flex min-h-[calc(100dvh-64px-64px)] items-center justify-center overflow-hidden px-4 py-8 theme-text">
      <div className="w-full max-w-md">
        <div className="flunio-card relative overflow-hidden rounded-3xl p-6">
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative">
            <h1 className="text-2xl font-semibold tracking-tight theme-text">
              {t.title}
            </h1>

            <p className="mt-2 text-sm theme-text-muted">{t.hint}</p>

            {done ? (
              <div className="mt-6 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300">
                {t.ok}
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                <label className="block text-sm font-medium theme-text-muted">
                  {t.email}
                </label>

                <input
                  className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition focus:border-cyan-400/50 focus:shadow-[0_0_18px_rgba(34,211,238,0.18)]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  autoComplete="email"
                />

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                  <button
                    onClick={submit}
                    disabled={!email.trim() || loading}
                    className="theme-primary-button inline-flex min-h-11 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {loading ? "..." : t.btn}
                  </button>

                  <Link
                    href="/login"
                    className="theme-action-link text-sm font-semibold underline-offset-4 transition hover:underline"
                  >
                    {t.back}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs theme-text-subtle">{t.footer}</p>
      </div>
    </div>
  );
}