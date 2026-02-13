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
    },
    ru: {
      title: "Восстановление пароля",
      email: "Email",
      btn: "Отправить ссылку",
      ok: "Если аккаунт существует — мы отправили письмо.",
      back: "← Назад ко входу",
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
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{t.title}</h1>

      {done ? (
        <div className="text-slate-700">{t.ok}</div>
      ) : (
        <>
          <label className="block text-sm font-medium text-slate-700">
            {t.email}
          </label>

          <input
            className="w-full border rounded-xl px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />

          <button
            onClick={submit}
            disabled={!email.trim() || loading}
            className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
          >
            {t.btn}
          </button>
        </>
      )}

      <Link href="/login" className="underline">
        {t.back}
      </Link>
    </div>
  );
}
