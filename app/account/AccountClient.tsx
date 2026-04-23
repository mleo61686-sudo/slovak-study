"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

type SessionUserLike = {
  name?: string | null;
  email?: string | null;
  isPremium?: boolean;
};

type TDict = {
  title: string;
  subtitle: string;

  accountCard: string;
  subscriptionCard: string;
  securityCard: string;
  sessionCard: string;

  name: string;
  email: string;
  status: string;
  currentPlan: string;
  premium: string;
  free: string;

  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  changePassword: string;
  securityHint: string;

  manageSubscription: string;
  getPremium: string;
  logout: string;

  userFallback: string;
  loading: string;
  opening: string;
  saving: string;
  success: string;

  errMissing: string;
  errMismatch: string;
  errWeak: string;
  errWrongCurrent: string;
  errSameAsCurrent: string;
  errGeneric: string;
};

const T: Record<Lang, TDict> = {
  ua: {
    title: "Профіль",
    subtitle: "Керуй акаунтом, підпискою та безпекою.",

    accountCard: "Акаунт",
    subscriptionCard: "Підписка",
    securityCard: "Безпека",
    sessionCard: "Сесія",

    name: "Ім’я",
    email: "Email",
    status: "Статус",
    currentPlan: "Поточний план",
    premium: "Premium",
    free: "Free",

    currentPassword: "Поточний пароль",
    newPassword: "Новий пароль",
    confirmPassword: "Повтори новий пароль",
    changePassword: "Змінити пароль →",
    securityHint:
      "Новий пароль має містити щонайменше 8 символів, 1 цифру та 1 велику літеру.",

    manageSubscription: "Керувати підпискою →",
    getPremium: "Оформити Premium →",
    logout: "Вийти →",

    userFallback: "Користувач",
    loading: "Завантаження…",
    opening: "Відкриваю…",
    saving: "Зберігаю…",
    success: "Пароль успішно змінено.",

    errMissing: "Заповни всі поля.",
    errMismatch: "Нові паролі не співпадають.",
    errWeak: "Пароль занадто слабкий.",
    errWrongCurrent: "Поточний пароль невірний.",
    errSameAsCurrent: "Новий пароль має відрізнятися від поточного.",
    errGeneric: "Не вдалося змінити пароль.",
  },
  ru: {
    title: "Профиль",
    subtitle: "Управляй аккаунтом, подпиской и безопасностью.",

    accountCard: "Аккаунт",
    subscriptionCard: "Подписка",
    securityCard: "Безопасность",
    sessionCard: "Сессия",

    name: "Имя",
    email: "Email",
    status: "Статус",
    currentPlan: "Текущий план",
    premium: "Premium",
    free: "Free",

    currentPassword: "Текущий пароль",
    newPassword: "Новый пароль",
    confirmPassword: "Повтори новый пароль",
    changePassword: "Сменить пароль →",
    securityHint:
      "Новый пароль должен содержать минимум 8 символов, 1 цифру и 1 заглавную букву.",

    manageSubscription: "Управлять подпиской →",
    getPremium: "Оформить Premium →",
    logout: "Выйти →",

    userFallback: "Пользователь",
    loading: "Загрузка…",
    opening: "Открываю…",
    saving: "Сохраняю…",
    success: "Пароль успешно изменён.",

    errMissing: "Заполни все поля.",
    errMismatch: "Новые пароли не совпадают.",
    errWeak: "Пароль слишком слабый.",
    errWrongCurrent: "Текущий пароль неверный.",
    errSameAsCurrent: "Новый пароль должен отличаться от текущего.",
    errGeneric: "Не удалось сменить пароль.",
  },
  en: {
    title: "Account",
    subtitle: "Manage your account, subscription, and security.",

    accountCard: "Account",
    subscriptionCard: "Subscription",
    securityCard: "Security",
    sessionCard: "Session",

    name: "Name",
    email: "Email",
    status: "Status",
    currentPlan: "Current plan",
    premium: "Premium",
    free: "Free",

    currentPassword: "Current password",
    newPassword: "New password",
    confirmPassword: "Repeat new password",
    changePassword: "Change password →",
    securityHint:
      "Your new password must contain at least 8 characters, 1 digit, and 1 uppercase letter.",

    manageSubscription: "Manage subscription →",
    getPremium: "Get Premium →",
    logout: "Log out →",

    userFallback: "User",
    loading: "Loading…",
    opening: "Opening…",
    saving: "Saving…",
    success: "Password changed successfully.",

    errMissing: "Please fill in all fields.",
    errMismatch: "New passwords do not match.",
    errWeak: "Password is too weak.",
    errWrongCurrent: "Current password is incorrect.",
    errSameAsCurrent: "New password must be different from the current password.",
    errGeneric: "Could not change password.",
  },
};

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="break-all text-sm font-medium text-slate-900">{value}</div>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-slate-900"
      />
    </label>
  );
}

export default function AccountClient() {
  const { lang } = useLanguage();
  const { data: session, status } = useSession();

  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = T[L];

  const user = session?.user as SessionUserLike | undefined;
  const isPremium = !!user?.isPremium;

  const [loadingPortal, setLoadingPortal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  async function handleManageSubscription() {
    if (!isPremium) {
      window.location.href = "/premium";
      return;
    }

    try {
      setLoadingPortal(true);

      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const text = await res.text();

      let data: { url?: string; error?: string } = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (!res.ok || !data?.url) {
        window.location.href = "/premium";
        return;
      }

      window.location.href = data.url;
    } catch {
      window.location.href = "/premium";
    } finally {
      setLoadingPortal(false);
    }
  }

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await signOut({ callbackUrl: "/login" });
    } finally {
      setLoggingOut(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError(t.errMissing);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(t.errMismatch);
      return;
    }

    try {
      setSavingPassword(true);

      const res = await fetch("/api/account/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
      };

      if (!res.ok || !data?.ok) {
        switch (data?.code) {
          case "MISSING_FIELDS":
            setPasswordError(t.errMissing);
            break;
          case "PASSWORDS_DO_NOT_MATCH":
            setPasswordError(t.errMismatch);
            break;
          case "WEAK_PASSWORD":
            setPasswordError(t.errWeak);
            break;
          case "WRONG_CURRENT_PASSWORD":
            setPasswordError(t.errWrongCurrent);
            break;
          case "SAME_AS_CURRENT":
            setPasswordError(t.errSameAsCurrent);
            break;
          default:
            setPasswordError(t.errGeneric);
            break;
        }
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordSuccess(t.success);
    } catch {
      setPasswordError(t.errGeneric);
    } finally {
      setSavingPassword(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center text-slate-600">{t.loading}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.title}
          </h1>
          <p className="text-slate-600">{t.subtitle}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            {t.accountCard}
          </h2>

          <div className="mt-4 grid gap-3">
            <InfoRow
              label={t.name}
              value={user?.name?.trim() || t.userFallback}
            />
            <InfoRow label={t.email} value={user?.email?.trim() || "—"} />
            <InfoRow
              label={t.status}
              value={isPremium ? t.premium : t.free}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            {t.subscriptionCard}
          </h2>

          <div className="mt-4 grid gap-3">
            <InfoRow
              label={t.currentPlan}
              value={isPremium ? t.premium : t.free}
            />

            <button
              onClick={handleManageSubscription}
              disabled={loadingPortal}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black disabled:opacity-50"
              type="button"
            >
              {loadingPortal
                ? t.opening
                : isPremium
                  ? t.manageSubscription
                  : t.getPremium}
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            {t.securityCard}
          </h2>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {t.securityHint}
            </div>

            <form onSubmit={handleChangePassword} className="grid gap-3">
              <PasswordField
                label={t.currentPassword}
                value={currentPassword}
                onChange={setCurrentPassword}
              />

              <PasswordField
                label={t.newPassword}
                value={newPassword}
                onChange={setNewPassword}
              />

              <PasswordField
                label={t.confirmPassword}
                value={confirmPassword}
                onChange={setConfirmPassword}
              />

              {passwordError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {passwordError}
                </div>
              ) : null}

              {passwordSuccess ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {passwordSuccess}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={savingPassword}
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 disabled:opacity-50"
              >
                {savingPassword ? t.saving : t.changePassword}
              </button>
            </form>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            {t.sessionCard}
          </h2>

          <div className="mt-4 grid gap-3">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
              type="button"
            >
              {loggingOut ? t.opening : t.logout}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}