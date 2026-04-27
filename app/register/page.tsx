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
  },
};

const ERROR_TEXT: Record<
  string,
  { ua: string; ru: string; en: string }
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
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-ZА-ЯІЇЄ]/.test(pw)) s++;
  if (/[a-zа-яіїє]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-zА-Яа-яІіЇїЄє0-9]/.test(pw)) s++;
  return Math.min(s, 5);
}

function FlagIcon({ courseId, title }: { courseId: CourseId; title: string }) {
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
      className="h-8 w-12 rounded-md border border-slate-200 object-cover shadow-sm"
      loading="lazy"
    />
  );
}

const COURSE_ORDER: CourseId[] = ["sk", "cs", "pl"];

export default function RegisterPage() {
  const { lang } = useLanguage();
  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = T[L];
  const router = useRouter();

  const [selectedCourse, setSelectedCourse] = useState<CourseId>("sk");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

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

  function onSelectCourse(courseId: CourseId) {
    const course = COURSE_REGISTRY[courseId];
    if (!course || course.status !== "live") return;

    setSelectedCourse(courseId);
    setStoredCourseId(courseId);
  }

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

    const selectedCourseConfig = COURSE_REGISTRY[selectedCourse];
    const safeCourse: CourseId =
      selectedCourseConfig?.status === "live" ? selectedCourse : "sk";

    setStoredCourseId(safeCourse);
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

    // ✅ запускаємо onboarding тільки для нових зареєстрованих користувачів
    localStorage.setItem("flunio:onboarding:pending", "1");
    localStorage.removeItem("flunio:onboarding");


    const login = await signIn("credentials", {
      email: e2,
      password: pw,
      redirect: false,
      callbackUrl: "/",
    });

    setLoading(false);

    if (!login || login.error) {
      router.push("/login");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl py-10">
      <div className="rounded-3xl border bg-white p-6 shadow-sm sm:p-7">
        <h1 className="text-3xl font-extrabold tracking-tight">{t.title}</h1>
        <p className="mt-2 text-sm text-slate-600">{t.subtitle}</p>

        <div className="mt-7">
          <div className="text-sm font-semibold text-slate-800">
            {t.chooseCourse}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {COURSE_ORDER.map((courseId) => {
              const course = COURSE_REGISTRY[courseId];
              if (!course) return null;

              const isActive = selectedCourse === courseId;
              const isLive = course.status === "live";

              return (
                <button
                  key={courseId}
                  type="button"
                  onClick={() => onSelectCourse(courseId)}
                  disabled={!isLive}
                  aria-disabled={!isLive}
                  className={`group relative rounded-2xl border p-4 text-left transition-all duration-200 ${!isLive
                    ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-70"
                    : isActive
                      ? "border-slate-900 bg-slate-50 shadow-sm ring-2 ring-slate-200"
                      : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
                    }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <FlagIcon courseId={courseId} title={course.title} />

                    <div className="flex items-center gap-2">
                      {!isLive && (
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
                          {t.soon}
                        </span>
                      )}

                      {isActive && isLive && (
                        <span className="rounded-full bg-slate-900 px-2 py-1 text-[11px] font-medium text-white">
                          {t.selected}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 text-lg font-bold text-slate-900">
                    {course.title}
                  </div>

                  {"nativeTitle" in course && course.nativeTitle ? (
                    <div className="mt-1 text-sm text-slate-500">
                      {String(course.nativeTitle)}
                    </div>
                  ) : null}

                  <div className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
                    {courseId.toUpperCase()}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-2 text-xs text-slate-500">{t.courseHint}</div>
        </div>

        <form onSubmit={onSubmit} className="mt-7 grid gap-4">
          <div className="grid gap-1">
            <label className="text-sm font-medium text-slate-700">
              {t.name}
            </label>
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
            <label className="text-sm font-medium text-slate-700">
              {t.email}
            </label>
            <input
              className={`h-11 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-slate-200 ${emailOk ? "" : "border-red-400"
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
              <div className="text-xs text-red-600">
                {ERROR_TEXT.INVALID_EMAIL[L]}
              </div>
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
            <label className="text-sm font-medium text-slate-700">
              {t.password2}
            </label>

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
              <div className="text-xs text-red-600">
                {ERROR_TEXT.PASSWORD_MISMATCH[L]}
              </div>
            )}
          </div>

          <button
            disabled={loading}
            className="h-11 rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
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