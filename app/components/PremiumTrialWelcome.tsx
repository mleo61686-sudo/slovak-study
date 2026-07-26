"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";
type Mode = "verify" | "started" | "used" | "verified" | "expired" | "invalid";

const EMAIL_VERIFICATION_SNOOZE_KEY =
  "flunio:email-verification:snoozed-until";
const EMAIL_VERIFICATION_SNOOZE_MS = 24 * 60 * 60 * 1000;

function clearEmailVerificationSnooze() {
  localStorage.removeItem(EMAIL_VERIFICATION_SNOOZE_KEY);
}

function isEmailVerificationSnoozed() {
  const raw = localStorage.getItem(EMAIL_VERIFICATION_SNOOZE_KEY);
  if (!raw) return false;

  const snoozedUntil = Number(raw);
  if (!Number.isFinite(snoozedUntil) || snoozedUntil <= Date.now()) {
    clearEmailVerificationSnooze();
    return false;
  }

  return true;
}

type Copy = {
  verifyTitle: string;
  verifyText: (email: string) => string;
  startedTitle: string;
  startedText: string;
  usedTitle: string;
  usedText: string;
  verifiedTitle: string;
  verifiedText: string;
  expiredTitle: string;
  expiredText: string;
  invalidTitle: string;
  invalidText: string;
  resend: string;
  resending: string;
  resent: string;
  wait: string;
  close: string;
  later: string;
  until: string;
  resendError: string;
};

const COPY: Record<Lang, Copy> = {
  ua: {
    verifyTitle: "Залишився один крок",
    verifyText: (email: string) =>
      `Ми надіслали лист на ${email}. Підтвердь адресу — і Premium на 24 години увімкнеться автоматично.`,
    startedTitle: "Premium активовано на 24 години 🎉",
    startedText:
      "Усі уроки, тренажер і розширене повторення вже доступні. Спробуй усе без обмежень.",
    usedTitle: "Email підтверджено",
    usedText:
      "Пробний Premium не активовано, оскільки безкоштовні 24 години вже використовувалися на цьому пристрої або в цій мережі.",
    verifiedTitle: "Email підтверджено",
    verifiedText: "Адресу успішно підтверджено. Можна продовжувати навчання.",
    expiredTitle: "Посилання застаріло",
    expiredText: "Надішли новий лист підтвердження й відкрий свіже посилання.",
    invalidTitle: "Посилання недійсне",
    invalidText: "Спробуй надіслати лист підтвердження ще раз.",
    resend: "Надіслати лист ще раз",
    resending: "Надсилаємо...",
    resent: "Новий лист надіслано",
    wait: "Зачекай хвилину перед повторним надсиланням",
    close: "Зрозуміло",
    later: "Пізніше",
    until: "Доступ до",
    resendError: "Не вдалося надіслати лист. Спробуй трохи пізніше.",
  },
  ru: {
    verifyTitle: "Остался один шаг",
    verifyText: (email: string) =>
      `Мы отправили письмо на ${email}. Подтвердите адрес — и Premium на 24 часа включится автоматически.`,
    startedTitle: "Premium активирован на 24 часа 🎉",
    startedText:
      "Все уроки, тренажёр и расширенное повторение уже доступны. Попробуйте всё без ограничений.",
    usedTitle: "Email подтверждён",
    usedText:
      "Пробный Premium не активирован, потому что бесплатные 24 часа уже использовались на этом устройстве или в этой сети.",
    verifiedTitle: "Email подтверждён",
    verifiedText: "Адрес успешно подтверждён. Можно продолжать обучение.",
    expiredTitle: "Ссылка устарела",
    expiredText: "Отправьте новое письмо и откройте свежую ссылку подтверждения.",
    invalidTitle: "Ссылка недействительна",
    invalidText: "Попробуйте отправить письмо с подтверждением ещё раз.",
    resend: "Отправить письмо ещё раз",
    resending: "Отправляем...",
    resent: "Новое письмо отправлено",
    wait: "Подождите минуту перед повторной отправкой",
    close: "Понятно",
    later: "Позже",
    until: "Доступ до",
    resendError: "Не удалось отправить письмо. Попробуйте немного позже.",
  },
  en: {
    verifyTitle: "One last step",
    verifyText: (email: string) =>
      `We sent an email to ${email}. Confirm the address and 24 hours of Premium will activate automatically.`,
    startedTitle: "Premium is active for 24 hours 🎉",
    startedText:
      "All lessons, practice and advanced review are now available. Try everything without limits.",
    usedTitle: "Email confirmed",
    usedText:
      "The Premium trial was not activated because the free 24 hours were already used on this device or network.",
    verifiedTitle: "Email confirmed",
    verifiedText: "Your address has been confirmed. You can continue learning.",
    expiredTitle: "The link has expired",
    expiredText: "Send a new confirmation email and open the latest link.",
    invalidTitle: "Invalid link",
    invalidText: "Try sending the confirmation email again.",
    resend: "Send email again",
    resending: "Sending...",
    resent: "A new email was sent",
    wait: "Wait one minute before sending again",
    close: "Got it",
    later: "Later",
    until: "Access until",
    resendError: "Could not send the email. Please try again shortly.",
  },
};

function getOrCreateTrialDeviceId() {
  const key = "flunio:trial-device-id";
  const existing = localStorage.getItem(key)?.trim();
  if (existing && existing.length >= 16) return existing;

  const created =
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random()
          .toString(36)
          .slice(2)}`;

  localStorage.setItem(key, created);
  return created;
}

function cleanTrialQuery() {
  const url = new URL(window.location.href);
  url.searchParams.delete("trial");
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

export default function PremiumTrialWelcome() {
  const { lang } = useLanguage();
  const safeLang: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = COPY[safeLang];
  const { data: session, update } = useSession();
  const router = useRouter();
  const refreshInFlight = useRef(false);

  const [mode, setMode] = useState<Mode | null>(null);
  const [resending, setResending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const refreshSessionFromDatabase = useCallback(async () => {
    if (refreshInFlight.current) return null;

    refreshInFlight.current = true;

    try {
      // auth.ts treats trigger="update" as a forced DB refresh,
      // bypassing the normal 15-minute JWT cache.
      const freshSession = await update({});

      // Refresh Server Components and premium guards that read auth() on the server.
      router.refresh();

      return freshSession;
    } catch {
      return null;
    } finally {
      refreshInFlight.current = false;
    }
  }, [router, update]);

  useEffect(() => {
    const result = new URLSearchParams(window.location.search).get("trial") as Mode | null;

    function showResult(resultMode: Mode) {
      localStorage.removeItem("flunio:email-verification:pending");
      localStorage.removeItem("flunio:trial-result:pending");
      clearEmailVerificationSnooze();
      setMode(resultMode);
      void refreshSessionFromDatabase();
    }

    if (result && ["started", "used", "verified", "expired", "invalid"].includes(result)) {
      const onboardingDone = localStorage.getItem("flunio:onboarding") === "done";
      const onboardingPending =
        localStorage.getItem("flunio:onboarding:pending") === "1" && !onboardingDone;

      cleanTrialQuery();

      if (onboardingPending) {
        localStorage.setItem("flunio:trial-result:pending", result);
      } else {
        showResult(result);
      }
    }

    function showPendingAfterOnboarding() {
      const pendingResult = localStorage.getItem("flunio:trial-result:pending") as Mode | null;

      if (pendingResult) {
        showResult(pendingResult);
        return;
      }

      const pending = localStorage.getItem("flunio:email-verification:pending") === "1";
      const onboardingDone = localStorage.getItem("flunio:onboarding") === "done";

      if (
        pending &&
        onboardingDone &&
        !session?.user?.isEmailVerified &&
        !isEmailVerificationSnoozed()
      ) {
        setMode("verify");
      }
    }

    showPendingAfterOnboarding();
    window.addEventListener("flunio:onboarding:finished", showPendingAfterOnboarding);

    return () => {
      window.removeEventListener("flunio:onboarding:finished", showPendingAfterOnboarding);
    };
  }, [refreshSessionFromDatabase, session?.user?.isEmailVerified]);

  useEffect(() => {
    if (session?.user?.isEmailVerified) {
      localStorage.removeItem("flunio:email-verification:pending");
      clearEmailVerificationSnooze();
      if (mode === "verify") setMode(null);
    }
  }, [mode, session?.user?.isEmailVerified]);

  useEffect(() => {
    const pending =
      localStorage.getItem("flunio:email-verification:pending") === "1";

    if (!pending || session?.user?.isEmailVerified) return;

    const refreshWhenUserReturns = () => {
      void refreshSessionFromDatabase();
    };

    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") {
        refreshWhenUserReturns();
      }
    };

    // Covers the common flow where the confirmation link is opened in Gmail
    // or another tab and the user then comes back to Flunio.
    refreshWhenUserReturns();
    window.addEventListener("focus", refreshWhenUserReturns);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      window.removeEventListener("focus", refreshWhenUserReturns);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [refreshSessionFromDatabase, session?.user?.isEmailVerified]);

  const premiumUntil = useMemo(() => {
    const raw = session?.user?.premiumUntil;
    if (!raw) return null;

    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return null;

    return new Intl.DateTimeFormat(safeLang === "en" ? "en" : safeLang === "ru" ? "ru" : "uk", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }, [safeLang, session?.user?.premiumUntil]);

  async function resend() {
    setResending(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trialDeviceId: getOrCreateTrialDeviceId() }),
      });
      const data = await response.json().catch(() => null);

      if (response.ok) {
        setFeedback(t.resent);
      } else if (data?.code === "TOO_SOON") {
        setFeedback(t.wait);
      } else {
        setFeedback(t.resendError);
      }
    } catch {
      setFeedback(t.resendError);
    } finally {
      setResending(false);
    }
  }

  if (!mode) return null;

  const title =
    mode === "verify"
      ? t.verifyTitle
      : mode === "started"
        ? t.startedTitle
        : mode === "used"
          ? t.usedTitle
          : mode === "verified"
            ? t.verifiedTitle
            : mode === "expired"
              ? t.expiredTitle
              : t.invalidTitle;

  const text =
    mode === "verify"
      ? t.verifyText(session?.user?.email || "email")
      : mode === "started"
        ? t.startedText
        : mode === "used"
          ? t.usedText
          : mode === "verified"
            ? t.verifiedText
            : mode === "expired"
              ? t.expiredText
              : t.invalidText;

  const canResend = mode === "verify" || mode === "expired" || mode === "invalid";

  return (
    <div className="fixed inset-0 z-[10020] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
      <div className="theme-menu-panel relative w-full max-w-md overflow-hidden rounded-3xl border border-cyan-400/25 p-6 shadow-[0_0_45px_rgba(34,211,238,0.22)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/15 text-2xl">
            {mode === "started" ? "👑" : mode === "used" ? "✓" : "✉️"}
          </div>

          <h2 className="text-xl font-extrabold tracking-tight theme-text">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed theme-text-muted">{text}</p>

          {mode === "started" && premiumUntil && (
            <div className="theme-home-soft-card mt-4 rounded-2xl px-4 py-3 text-sm theme-text-muted">
              <span className="font-semibold theme-text">{t.until}:</span>{" "}
              {premiumUntil}
            </div>
          )}

          {feedback && (
            <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm theme-text-muted">
              {feedback}
            </div>
          )}

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            {canResend && (
              <button
                type="button"
                disabled={resending}
                onClick={resend}
                className="theme-secondary-button rounded-2xl px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
              >
                {resending ? t.resending : t.resend}
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (mode === "verify") {
                  localStorage.setItem(
                    EMAIL_VERIFICATION_SNOOZE_KEY,
                    String(Date.now() + EMAIL_VERIFICATION_SNOOZE_MS),
                  );
                }

                setFeedback(null);
                setMode(null);
              }}
              className="theme-primary-button rounded-2xl px-5 py-2.5 text-sm font-semibold"
            >
              {mode === "verify" ? t.later : t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
