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

    lessonHintTitle: string;
    lessonHintText: string;
    practiceHintTitle: string;
    practiceHintText: string;
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

    lessonHintTitle: "Увійди, щоб почати урок",
    lessonHintText:
      "Для проходження уроків потрібен акаунт. Так Flunio зберігає твій прогрес, відкриті уроки та результати вправ.",
    practiceHintTitle: "Увійди, щоб відкрити тренажер",
    practiceHintText:
      "Тренажер працює з твоїм особистим прогресом, тому спочатку потрібно увійти або створити акаунт.",
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

    lessonHintTitle: "Войдите, чтобы начать урок",
    lessonHintText:
      "Для прохождения уроков нужен аккаунт. Так Flunio сохранит ваш прогресс, открытые уроки и результаты упражнений.",
    practiceHintTitle: "Войдите, чтобы открыть тренажёр",
    practiceHintText:
      "Тренажёр работает с вашим личным прогрессом, поэтому сначала нужно войти или создать аккаунт.",
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

    lessonHintTitle: "Log in to start the lesson",
    lessonHintText:
      "You need an account to complete lessons. This lets Flunio save your progress, unlocked lessons and exercise results.",
    practiceHintTitle: "Log in to open practice",
    practiceHintText:
      "Practice uses your personal progress, so please log in or create an account first.",
  },
};

export default function LoginClient() {
  const { lang } = useLanguage();
  const safeLang: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = T[safeLang];

  const sp = useSearchParams();
  const router = useRouter();

  const rawCallbackUrl = sp.get("callbackUrl");
  const callbackUrl = rawCallbackUrl ?? "/profile";
  const reason = sp.get("reason");

  const authHint =
    reason === "lesson"
      ? {
          title: t.lessonHintTitle,
          text: t.lessonHintText,
        }
      : reason === "practice"
        ? {
            title: t.practiceHintTitle,
            text: t.practiceHintText,
          }
        : null;

  const registerHref = rawCallbackUrl
    ? `/register?callbackUrl=${encodeURIComponent(rawCallbackUrl)}`
    : "/register";

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
      <div className="flunio-card relative overflow-hidden rounded-3xl p-6 theme-text shadow-[0_0_30px_rgba(34,211,238,0.10)] sm:p-7">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative">
          {authHint && (
            <div className="mb-5 overflow-hidden rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-4 shadow-[0_0_24px_rgba(34,211,238,0.18)] backdrop-blur">
              <div className="flex gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/15 text-lg shadow-[0_0_18px_rgba(34,211,238,0.18)]">
                  🔐
                </div>

                <div>
                  <div className="text-sm font-extrabold tracking-tight theme-text">
                    {authHint.title}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed theme-text-muted">
                    {authHint.text}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="theme-pill mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold">
              Flunio
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight theme-text">
              {t.title}
            </h1>
            <p className="mt-1 text-sm theme-text-muted">{t.hint}</p>
          </div>

          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-1.5">
              <label className="text-sm font-medium theme-text-muted">
                {t.email}
              </label>

              <input
                className={`theme-input h-11 rounded-2xl px-3 text-sm outline-none transition focus:border-cyan-400/55 focus:ring-2 focus:ring-cyan-400/20 ${
                  emailOk ? "" : "border-red-400/70"
                }`}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
              />

              {!emailOk && (
                <div className="text-xs text-red-300">
                  {t.invalidEmailShort}
                </div>
              )}
            </div>

            <div className="grid gap-1.5">
              <label className="text-sm font-medium theme-text-muted">
                {t.password}
              </label>

              <div className="relative">
                <input
                  className="theme-input h-11 w-full rounded-2xl px-3 pr-24 text-sm outline-none transition focus:border-cyan-400/55 focus:ring-2 focus:ring-cyan-400/20"
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
                  className="theme-secondary-button absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition"
                >
                  {showPw ? t.hide : t.show}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className="theme-primary-button mt-1 h-11 rounded-2xl text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-0"
              type="submit"
            >
              {loading ? t.signingIn : t.signIn}
            </button>

            {msg && (
              <div className="rounded-2xl border border-red-400/25 bg-red-500/10 px-3 py-2 text-sm text-red-300 backdrop-blur">
                {msg}
              </div>
            )}

            <div className="theme-home-soft-card rounded-2xl px-4 py-3 text-sm theme-text-muted">
              {t.noAccount}{" "}
              <Link
                className="font-semibold theme-accent-text underline decoration-cyan-300/40 underline-offset-4 transition hover:opacity-80"
                href={registerHref}
              >
                {t.register}
              </Link>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium theme-text-muted underline underline-offset-4 transition hover:opacity-80"
              >
                {t.forgot}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}