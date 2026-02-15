"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru";

const T: Record<Lang, any> = {
  ua: {
    title: "Реєстрація",
    name: "Ім’я (необовʼязково)",
    email: "Email",
    password: "Пароль",
    password2: "Повтори пароль",
    create: "Створити акаунт",
    creating: "Створення...",
    have: "Вже є акаунт?",
    login: "Увійти",
    show: "Показати",
    hide: "Сховати",
    pwRuleHint: "Мінімум 8 символів • 1 цифра • 1 велика літера",
  },
  ru: {
    title: "Регистрация",
    name: "Имя (необязательно)",
    email: "Email",
    password: "Пароль",
    password2: "Повтори пароль",
    create: "Создать аккаунт",
    creating: "Создание...",
    have: "Уже есть аккаунт?",
    login: "Войти",
    show: "Показать",
    hide: "Скрыть",
    pwRuleHint: "Минимум 8 символов • 1 цифра • 1 заглавная буква",
  },
};

const ERROR_TEXT: Record<string, { ua: string; ru: string }> = {
  USER_EXISTS: { ua: "Користувач вже існує", ru: "Пользователь уже существует" },
  INVALID_EMAIL: { ua: "Некоректний email", ru: "Некорректный email" },
  WEAK_PASSWORD: {
    ua: "Слабкий пароль: мінімум 8 символів, 1 цифра, 1 велика літера",
    ru: "Слабый пароль: минимум 8 символов, 1 цифра, 1 заглавная буква",
  },
  PASSWORD_MISMATCH: { ua: "Паролі не співпадають", ru: "Пароли не совпадают" },
  UNKNOWN_ERROR: { ua: "Не вдалося створити акаунт", ru: "Не удалось создать аккаунт" },
};

function scorePassword(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-ZА-ЯІЇЄ]/.test(pw)) s++;
  if (/[a-zа-яіїє]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-zА-Яа-яІіЇїЄє0-9]/.test(pw)) s++;
  return Math.min(s, 5);
}

export default function RegisterPage() {
  const { lang } = useLanguage();
  const L: Lang = lang === "ru" ? "ru" : "ua";
  const t = T[L];

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const emailOk = useMemo(() => {
    const v = email.trim().toLowerCase();
    return v.length === 0 ? true : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }, [email]);

  const pwScore = useMemo(() => scorePassword(pw), [pw]);

  const pwStrongEnough = useMemo(() => {
    return pw.length >= 8 && /\d/.test(pw) && /[A-ZА-ЯІЇЄ]/.test(pw);
  }, [pw]);

  const errorText = useMemo(() => {
    if (!errorCode) return null;
    return (ERROR_TEXT[errorCode] ?? ERROR_TEXT.UNKNOWN_ERROR)[L];
  }, [errorCode, L]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorCode(null);

    const e2 = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e2)) {
      setErrorCode("INVALID_EMAIL");
      return;
    }

    if (!pwStrongEnough) {
      setErrorCode("WEAK_PASSWORD");
      return;
    }

    if (pw !== pw2) {
      setErrorCode("PASSWORD_MISMATCH");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim() ? name.trim() : null,
        email: e2,
        password: pw,
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      setErrorCode(data?.code || "UNKNOWN_ERROR");
      setLoading(false);
      return;
    }

    // ✅ автологін після реєстрації
    const login = await signIn("credentials", {
      email: e2,
      password: pw,
      redirect: false,
      callbackUrl: "/", // 🔥 головна
    });

    setLoading(false);

    if (!login || login.error) {
      router.push("/login");
      return;
    }

    // ✅ завжди кидаємо на головну
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md py-10">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold">{t.title}</h1>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-1">
            <label className="text-sm font-medium text-slate-700">{t.name}</label>
            <input
              className="h-11 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-slate-200"
              placeholder={t.name}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrorCode(null);
              }}
              autoComplete="name"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium text-slate-700">{t.email}</label>
            <input
              className={`h-11 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-slate-200 ${
                emailOk ? "" : "border-red-400"
              }`}
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorCode(null);
              }}
              type="email"
              autoComplete="email"
              required
            />
            {!emailOk && (
              <div className="text-xs text-red-600">{ERROR_TEXT.INVALID_EMAIL[L]}</div>
            )}
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium text-slate-700">{t.password}</label>

            <div className="relative">
              <input
                className="h-11 w-full rounded-xl border px-3 pr-24 outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="••••••••"
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                  setErrorCode(null);
                }}
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
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

            <div className="mt-2 grid gap-1">
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-slate-900 transition-all"
                  style={{ width: `${(pwScore / 5) * 100}%` }}
                />
              </div>
              <div className="text-xs text-slate-600">{t.pwRuleHint}</div>
            </div>
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium text-slate-700">{t.password2}</label>

            <div className="relative">
              <input
                className="h-11 w-full rounded-xl border px-3 pr-24 outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="••••••••"
                value={pw2}
                onChange={(e) => {
                  setPw2(e.target.value);
                  setErrorCode(null);
                }}
                type={showPw2 ? "text" : "password"}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw2((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                {showPw2 ? t.hide : t.show}
              </button>
            </div>

            {pw2.length > 0 && pw !== pw2 && (
              <div className="text-xs text-red-600">{ERROR_TEXT.PASSWORD_MISMATCH[L]}</div>
            )}
          </div>

          <button
            disabled={loading}
            className="h-11 rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            type="submit"
          >
            {loading ? t.creating : t.create}
          </button>

          {errorText && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorText}
            </div>
          )}

          <div className="text-sm text-slate-700">
            {t.have}{" "}
            <Link className="font-semibold underline" href="/login">
              {t.login}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
