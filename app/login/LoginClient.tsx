"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

const T: Record<
  Lang,
  {
    title: string;
    email: string;
    password: string;
    signIn: string;
    signingIn: string;
    noAccount: string;
    register: string;
    invalid: string;
    show: string;
    hide: string;
    hint: string;
    forgot: string;
    invalidEmail: string;
    invalidEmailShort: string;
    passwordMin: string;
  }
> = {
  ua: {
    title: "Вхід",
    email: "Email",
    password: "Пароль",
    signIn: "Увійти",
    signingIn: "Вхід...",
    noAccount: "Немає акаунта?",
    register: "Реєстрація",
    invalid: "Невірний email або пароль",
    show: "Показати",
    hide: "Сховати",
    hint: "Використай email і пароль.",
    forgot: "Забув пароль?",
    invalidEmail: "Email некоректний",
    invalidEmailShort: "Некоректний email",
    passwordMin: "Пароль має бути мінімум 8 символів",
  },
  ru: {
    title: "Вход",
    email: "Email",
    password: "Пароль",
    signIn: "Войти",
    signingIn: "Вход...",
    noAccount: "Нет аккаунта?",
    register: "Регистрация",
    invalid: "Неверный email или пароль",
    show: "Показать",
    hide: "Скрыть",
    hint: "Используй email и пароль.",
    forgot: "Забыли пароль?",
    invalidEmail: "Некорректный email",
    invalidEmailShort: "Некорректный email",
    passwordMin: "Пароль должен быть минимум 8 символов",
  },
  en: {
    title: "Log in",
    email: "Email",
    password: "Password",
    signIn: "Log in",
    signingIn: "Signing in...",
    noAccount: "Don’t have an account?",
    register: "Register",
    invalid: "Invalid email or password",
    show: "Show",
    hide: "Hide",
    hint: "Use your email and password.",
    forgot: "Forgot password?",
    invalidEmail: "Invalid email",
    invalidEmailShort: "Invalid email",
    passwordMin: "Password must be at least 8 characters",
  },
};

export default function LoginClient() {
  const { lang } = useLanguage();
  const safeLang: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = T[safeLang];

  const sp = useSearchParams();
  const router = useRouter();
  const callbackUrl = sp.get("callbackUrl") ?? "/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const emailOk = useMemo(() => {
    const v = email.trim().toLowerCase();
    return v.length === 0 ? true : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }, [email]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const e2 = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e2)) {
      setMsg(t.invalidEmail);
      return;
    }

    if (password.length < 8) {
      setMsg(t.passwordMin);
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      email: e2,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res || res.error) {
      setMsg(t.invalid);
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md py-10">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold">{t.title}</h1>
        <p className="mt-1 text-sm text-slate-600">{t.hint}</p>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-1">
            <label className="text-sm font-medium text-slate-700">
              {t.email}
            </label>
            <input
              className={`h-11 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-slate-200 ${
                emailOk ? "" : "border-red-400"
              }`}
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
            />
            {!emailOk && (
              <div className="text-xs text-red-600">{t.invalidEmailShort}</div>
            )}
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium text-slate-700">
              {t.password}
            </label>

            <div className="relative">
              <input
                className="h-11 w-full rounded-xl border px-3 pr-24 outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                {showPw ? t.hide : t.show}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="h-11 rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            type="submit"
          >
            {loading ? t.signingIn : t.signIn}
          </button>

          {msg && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {msg}
            </div>
          )}

          <div className="text-sm text-slate-700">
            {t.noAccount}{" "}
            <Link className="font-semibold underline" href="/register">
              {t.register}
            </Link>
          </div>

          <div className="text-sm">
            <Link href="/forgot-password" className="text-slate-600 underline">
              {t.forgot}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}