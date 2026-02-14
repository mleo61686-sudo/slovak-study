"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/src/useLanguage";

export default function ResetPasswordClient() {
  const { lang } = useLanguage();
  const router = useRouter();
  const sp = useSearchParams();

  const token = useMemo(() => sp.get("token") || "", [sp]);

  const dict = {
    ua: {
      title: "Новий пароль",
      subtitle: "Введи новий пароль та підтверди його.",
      pass: "Новий пароль (мін. 8 символів)",
      pass2: "Підтверди новий пароль",
      btn: "Зберегти пароль",
      ok: "Пароль змінено. Можна увійти.",
      bad: "Токен недійсний або протермінований.",
      mismatch: "Паролі не співпадають.",
      back: "← До входу",
      show: "Показати",
      hide: "Сховати",
      min8: "Мінімум 8 символів",
      weak: "Пароль занадто слабкий",
    },
    ru: {
      title: "Новый пароль",
      subtitle: "Введи новый пароль и подтверди его.",
      pass: "Новый пароль (мин. 8 символов)",
      pass2: "Подтверди новый пароль",
      btn: "Сохранить пароль",
      ok: "Пароль изменён. Можно войти.",
      bad: "Токен недействителен или истёк.",
      mismatch: "Пароли не совпадают.",
      back: "← Ко входу",
      show: "Показать",
      hide: "Скрыть",
      min8: "Минимум 8 символов",
      weak: "Пароль слишком слабый",
    },
  } as const;

  const t = dict[lang];

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "bad">("idle");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const pwOk = password.trim().length >= 8;
  const same = password === password2;
  const canSubmit = pwOk && same && !loading;

  async function submit() {
    if (!canSubmit) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, password2 }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.ok) {
        setStatus("ok");
        setErrorCode(null);
      } else {
        setStatus("bad");
        setErrorCode(data?.code ?? null);
      }
    } finally {
      setLoading(false);
    }
  }

  // ❗ якщо токена нема — показуємо акуратно в card
  if (!token) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <div className="text-xl font-semibold">{t.bad}</div>

            <div className="mt-4">
              <Link href="/login" className="text-sm underline">
                {t.back}
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            © 2026 Slovak Study — Вчи словацьку щодня.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
          <h1 className="text-2xl font-semibold">{t.title}</h1>
          <p className="mt-2 text-sm text-slate-600">{t.subtitle}</p>

          {status === "ok" ? (
            <div className="mt-6 space-y-4">
              <div className="text-slate-700">{t.ok}</div>

              <button
                onClick={() => router.push("/login")}
                className="px-4 py-2 rounded-xl bg-black text-white"
              >
                {t.back}
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="grid gap-1">
                <label className="block text-sm font-medium text-slate-700">
                  {t.pass}
                </label>

                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    className="w-full border rounded-xl px-3 py-2 pr-24"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                  >
                    {showPw ? t.hide : t.show}
                  </button>
                </div>

                {!pwOk && password.length > 0 && (
                  <div className="text-xs text-red-600">{t.min8}</div>
                )}
              </div>

              <div className="grid gap-1">
                <label className="block text-sm font-medium text-slate-700">
                  {t.pass2}
                </label>

                <input
                  type={showPw ? "text" : "password"}
                  className="w-full border rounded-xl px-3 py-2"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  autoComplete="new-password"
                />

                {password2.length > 0 && !same && (
                  <div className="text-xs text-red-600">{t.mismatch}</div>
                )}
              </div>

              {status === "bad" && (
                <div className="text-sm text-red-600">
                  {errorCode === "PASSWORD_MISMATCH"
                    ? t.mismatch
                    : errorCode === "WEAK_PASSWORD"
                    ? t.weak
                    : t.bad}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                <button
                  onClick={submit}
                  disabled={!canSubmit}
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
    </main>
  );
}
