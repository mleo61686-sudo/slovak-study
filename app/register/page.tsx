"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/src/useLanguage";
import {
  getStoredCourseId,
  setStoredCourseId,
  type CourseId,
} from "@/app/learning/courses/useActiveCourse";
import { COURSE_REGISTRY } from "@/app/learning/courses/registry";

type Lang = "ua" | "ru" | "en";

const T: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    chooseCourse: string;
    courseHint: string;
    name: string;
    email: string;
    password: string;
    password2: string;
    create: string;
    creating: string;
    have: string;
    login: string;
    show: string;
    hide: string;
    pwRuleHint: string;
    soon: string;
    selected: string;
    emailUpdates: string;
    emailUpdatesHint: string;
  }
> = {
  ua: {
    title: "Реєстрація",
    subtitle: "Спочатку обери курс, який хочеш вивчати.",
    chooseCourse: "Обери курс",
    courseHint: "Курс можна буде змінити пізніше в профілі.",
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
    soon: "Скоро",
    selected: "Обрано",
    emailUpdates:
      "Отримувати новини та корисні пропозиції від Flunio",
    emailUpdatesHint:
      "Інформація про оновлення, нові можливості та іноді нагадування про навчання. Відписатися можна будь-коли.",
  },

  ru: {
    title: "Регистрация",
    subtitle: "Сначала выбери курс, который хочешь изучать.",
    chooseCourse: "Выберите курс",
    courseHint: "Курс можно будет изменить позже в профиле.",
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
    soon: "Скоро",
    selected: "Выбрано",
    emailUpdates:
      "Получать новости и полезные предложения от Flunio",
    emailUpdatesHint:
      "Информация об обновлениях, новых возможностях и иногда напоминания об обучении. Отписаться можно в любой момент.",
  },

  en: {
    title: "Register",
    subtitle: "First choose the course you want to learn.",
    chooseCourse: "Choose a course",
    courseHint: "You can change the course later in your profile.",
    name: "Name (optional)",
    email: "Email",
    password: "Password",
    password2: "Repeat password",
    create: "Create account",
    creating: "Creating...",
    have: "Already have an account?",
    login: "Log in",
    show: "Show",
    hide: "Hide",
    pwRuleHint: "Minimum 8 characters • 1 digit • 1 uppercase letter",
    soon: "Coming soon",
    selected: "Selected",
    emailUpdates:
      "Receive Flunio updates and useful offers",
    emailUpdatesHint:
      "Information about updates, new features, and occasional learning reminders. You can unsubscribe at any time.",
  },
};

const ERROR_TEXT: Record<
  string,
  {
    ua: string;
    ru: string;
    en: string;
  }
> = {
  USER_EXISTS: {
    ua: "Користувач вже існує",
    ru: "Пользователь уже существует",
    en: "User already exists",
  },

  INVALID_EMAIL: {
    ua: "Некоректний email",
    ru: "Некорректный email",
    en: "Invalid email",
  },

  WEAK_PASSWORD: {
    ua: "Слабкий пароль: мінімум 8 символів, 1 цифра, 1 велика літера",
    ru: "Слабый пароль: минимум 8 символов, 1 цифра, 1 заглавная буква",
    en: "Weak password: minimum 8 characters, 1 digit, 1 uppercase letter",
  },

  PASSWORD_MISMATCH: {
    ua: "Паролі не співпадають",
    ru: "Пароли не совпадают",
    en: "Passwords do not match",
  },

  UNKNOWN_ERROR: {
    ua: "Не вдалося створити акаунт",
    ru: "Не удалось создать аккаунт",
    en: "Could not create account",
  },
};

function scorePassword(pw: string) {
  let score = 0;

  if (pw.length >= 8) score++;
  if (/[A-ZА-ЯІЇЄ]/.test(pw)) score++;
  if (/[a-zа-яіїє]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-zА-Яа-яІіЇїЄє0-9]/.test(pw)) score++;

  return Math.min(score, 5);
}

function FlagIcon({
  courseId,
  title,
}: {
  courseId: CourseId;
  title: string;
}) {
  const src =
    courseId === "sk"
      ? "https://flagcdn.com/w80/sk.png"
      : courseId === "cs"
        ? "https://flagcdn.com/w80/cz.png"
        : "https://flagcdn.com/w80/pl.png";

  return (
    <img
      src={src}
      alt={title}
      className="h-8 w-12 rounded-md border border-white/10 object-cover shadow-sm theme-simple:border-slate-200"
      loading="lazy"
    />
  );
}

const COURSE_ORDER: CourseId[] = ["sk", "cs", "pl"];

export default function RegisterPage() {
  const { lang } = useLanguage();

  const L: Lang =
    lang === "ru"
      ? "ru"
      : lang === "en"
        ? "en"
        : "ua";

  const t = T[L];
  const router = useRouter();

  const [rawCallbackUrl, setRawCallbackUrl] =
    useState<string | null>(null);

  const [selectedCourse, setSelectedCourse] =
    useState<CourseId>("sk");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const [
    emailRemindersEnabled,
    setEmailRemindersEnabled,
  ] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] =
    useState<string | null>(null);

  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search,
    );

    const nextCallbackUrl =
      params.get("callbackUrl");

    if (
      nextCallbackUrl &&
      nextCallbackUrl.startsWith("/")
    ) {
      setRawCallbackUrl(nextCallbackUrl);
    } else {
      setRawCallbackUrl(null);
    }
  }, []);

  useEffect(() => {
    const stored = getStoredCourseId();
    const storedCourse = COURSE_REGISTRY[stored];

    if (storedCourse?.status === "live") {
      setSelectedCourse(stored);
      return;
    }

    setSelectedCourse("sk");
    setStoredCourseId("sk");
  }, []);

  const callbackUrl = rawCallbackUrl ?? "/";

  const loginHref = rawCallbackUrl
    ? `/login?callbackUrl=${encodeURIComponent(
        rawCallbackUrl,
      )}`
    : "/login";

  const emailOk = useMemo(() => {
    const value = email.trim().toLowerCase();

    return value.length === 0
      ? true
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }, [email]);

  const pwScore = useMemo(
    () => scorePassword(pw),
    [pw],
  );

  const pwStrongEnough = useMemo(() => {
    return (
      pw.length >= 8 &&
      /\d/.test(pw) &&
      /[A-ZА-ЯІЇЄ]/.test(pw)
    );
  }, [pw]);

  const errorText = useMemo(() => {
    if (!errorCode) return null;

    return (
      ERROR_TEXT[errorCode] ??
      ERROR_TEXT.UNKNOWN_ERROR
    )[L];
  }, [errorCode, L]);

  function onSelectCourse(courseId: CourseId) {
    const course = COURSE_REGISTRY[courseId];

    if (!course || course.status !== "live") {
      return;
    }

    setSelectedCourse(courseId);
    setStoredCourseId(courseId);
  }

  async function onSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();
    setErrorCode(null);

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        normalizedEmail,
      )
    ) {
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

    const selectedCourseConfig =
      COURSE_REGISTRY[selectedCourse];

    const safeCourse: CourseId =
      selectedCourseConfig?.status === "live"
        ? selectedCourse
        : "sk";

    setStoredCourseId(safeCourse);
    setLoading(true);

    try {
      const response = await fetch(
        "/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim()
              ? name.trim()
              : null,

            email: normalizedEmail,
            password: pw,

            emailRemindersEnabled,
            emailLanguage: L,
            preferredCourse: safeCourse,
          }),
        },
      );

      const data = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        setErrorCode(
          data?.code || "UNKNOWN_ERROR",
        );

        return;
      }

      // Запускаємо onboarding тільки для
      // нових зареєстрованих користувачів.
      localStorage.setItem(
        "flunio:onboarding:pending",
        "1",
      );

      localStorage.removeItem(
        "flunio:onboarding",
      );

      const login = await signIn(
        "credentials",
        {
          email: normalizedEmail,
          password: pw,
          redirect: false,
          callbackUrl,
        },
      );

      if (!login || login.error) {
        router.push(loginHref);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setErrorCode("UNKNOWN_ERROR");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl py-10">
      <div className="flunio-card rounded-3xl p-6 theme-text sm:p-7">
        <h1 className="text-3xl font-extrabold tracking-tight theme-text">
          {t.title}
        </h1>

        <p className="mt-2 text-sm theme-text-muted">
          {t.subtitle}
        </p>

        <div className="mt-7">
          <div className="text-sm font-semibold theme-text">
            {t.chooseCourse}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {COURSE_ORDER.map((courseId) => {
              const course =
                COURSE_REGISTRY[courseId];

              if (!course) return null;

              const isActive =
                selectedCourse === courseId;

              const isLive =
                course.status === "live";

              return (
                <button
                  key={courseId}
                  type="button"
                  onClick={() =>
                    onSelectCourse(courseId)
                  }
                  disabled={!isLive}
                  aria-disabled={!isLive}
                  className={[
                    "group relative rounded-2xl border p-4 text-left transition-all duration-200",

                    !isLive
                      ? "cursor-not-allowed border-white/10 bg-white/5 opacity-50 theme-simple:border-slate-200 theme-simple:bg-slate-50"
                      : isActive
                        ? "border-cyan-400/45 bg-cyan-400/10 shadow-[0_0_22px_rgba(34,211,238,0.18)] ring-2 ring-cyan-400/20"
                        : "theme-home-soft-card hover:-translate-y-0.5 hover:border-cyan-400/35",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-2">
                    <FlagIcon
                      courseId={courseId}
                      title={course.title}
                    />

                    <div className="flex items-center gap-2">
                      {!isLive && (
                        <span className="theme-pill rounded-full px-2 py-1 text-[11px] font-medium opacity-70">
                          {t.soon}
                        </span>
                      )}

                      {isActive && isLive && (
                        <span className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-2 py-1 text-[11px] font-semibold text-white shadow-[0_0_12px_rgba(34,211,238,0.2)]">
                          {t.selected}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 text-lg font-bold theme-text">
                    {course.title}
                  </div>

                  {"nativeTitle" in course &&
                  course.nativeTitle ? (
                    <div className="mt-1 text-sm theme-text-muted">
                      {String(course.nativeTitle)}
                    </div>
                  ) : null}

                  <div className="mt-4 text-xs font-medium uppercase tracking-wide theme-text-subtle">
                    {courseId.toUpperCase()}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-2 text-xs theme-text-subtle">
            {t.courseHint}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-7 grid gap-4"
        >
          <div className="grid gap-1">
            <label className="text-sm font-medium theme-text-muted">
              {t.name}
            </label>

            <input
              className="theme-input h-11 rounded-2xl px-3 outline-none transition focus:border-cyan-400/55 focus:ring-2 focus:ring-cyan-400/20"
              placeholder={t.name}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setErrorCode(null);
              }}
              autoComplete="name"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium theme-text-muted">
              {t.email}
            </label>

            <input
              className={[
                "theme-input h-11 rounded-2xl px-3 outline-none transition focus:border-cyan-400/55 focus:ring-2 focus:ring-cyan-400/20",
                emailOk
                  ? ""
                  : "border-red-400/70",
              ].join(" ")}
              placeholder="name@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorCode(null);
              }}
              type="email"
              autoComplete="email"
              required
            />

            {!emailOk && (
              <div className="text-xs text-red-300">
                {ERROR_TEXT.INVALID_EMAIL[L]}
              </div>
            )}
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium theme-text-muted">
              {t.password}
            </label>

            <div className="relative">
              <input
                className="theme-input h-11 w-full rounded-2xl px-3 pr-24 outline-none transition focus:border-cyan-400/55 focus:ring-2 focus:ring-cyan-400/20"
                placeholder="••••••••"
                value={pw}
                onChange={(event) => {
                  setPw(event.target.value);
                  setErrorCode(null);
                }}
                type={
                  showPw
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPw((value) => !value)
                }
                className="theme-secondary-button absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition"
              >
                {showPw
                  ? t.hide
                  : t.show}
              </button>
            </div>

            <div className="mt-2 grid gap-1">
              <div className="theme-progress-track h-2 w-full overflow-hidden rounded-full">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 transition-all"
                  style={{
                    width: `${(pwScore / 5) * 100}%`,
                  }}
                />
              </div>

              <div className="text-xs theme-text-subtle">
                {t.pwRuleHint}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium theme-text-muted">
              {t.password2}
            </label>

            <div className="relative">
              <input
                className="theme-input h-11 w-full rounded-2xl px-3 pr-24 outline-none transition focus:border-cyan-400/55 focus:ring-2 focus:ring-cyan-400/20"
                placeholder="••••••••"
                value={pw2}
                onChange={(event) => {
                  setPw2(event.target.value);
                  setErrorCode(null);
                }}
                type={
                  showPw2
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPw2((value) => !value)
                }
                className="theme-secondary-button absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition"
              >
                {showPw2
                  ? t.hide
                  : t.show}
              </button>
            </div>

            {pw2.length > 0 && pw !== pw2 && (
              <div className="text-xs text-red-300">
                {ERROR_TEXT.PASSWORD_MISMATCH[L]}
              </div>
            )}
          </div>

          <label className="theme-inner-card flex cursor-pointer items-start gap-3 rounded-2xl p-4">
            <input
              type="checkbox"
              checked={emailRemindersEnabled}
              onChange={(event) => {
                setEmailRemindersEnabled(
                  event.target.checked,
                );
              }}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-cyan-500"
            />

            <span className="min-w-0">
              <span className="block text-sm font-semibold theme-text">
                {t.emailUpdates}
              </span>

              <span className="mt-1 block text-xs leading-5 theme-text-muted">
                {t.emailUpdatesHint}
              </span>
            </span>
          </label>

          <button
            disabled={loading}
            className="theme-primary-button h-11 rounded-2xl text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-0"
            type="submit"
          >
            {loading
              ? t.creating
              : t.create}
          </button>

          {errorText && (
            <div className="rounded-2xl border border-red-400/25 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {errorText}
            </div>
          )}

          <div className="text-sm theme-text-muted">
            {t.have}{" "}

            <Link
              className="font-semibold theme-accent-text underline decoration-cyan-300/40 underline-offset-4 transition hover:opacity-80"
              href={loginHref}
            >
              {t.login}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}