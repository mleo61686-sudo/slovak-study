"use client";

import { signOut, useSession } from "next-auth/react";
import { useMemo, useState } from "react";
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

  editName: string;
  saveName: string;
  savingName: string;
  nameHint: string;
  nameSuccess: string;

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
  profileBadge: string;

  errMissing: string;
  errMismatch: string;
  errWeak: string;
  errWrongCurrent: string;
  errSameAsCurrent: string;
  errGeneric: string;

  errNameRequired: string;
  errNameTooShort: string;
  errNameTooLong: string;
  errNameGeneric: string;
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

    editName: "Змінити ім’я",
    saveName: "Зберегти ім’я →",
    savingName: "Зберігаю ім’я…",
    nameHint: "Ім’я має містити від 2 до 40 символів.",
    nameSuccess: "Ім’я успішно оновлено.",

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
    profileBadge: "Профіль Flunio",

    errMissing: "Заповни всі поля.",
    errMismatch: "Нові паролі не співпадають.",
    errWeak: "Пароль занадто слабкий.",
    errWrongCurrent: "Поточний пароль невірний.",
    errSameAsCurrent: "Новий пароль має відрізнятися від поточного.",
    errGeneric: "Не вдалося змінити пароль.",

    errNameRequired: "Введи ім’я.",
    errNameTooShort: "Ім’я занадто коротке.",
    errNameTooLong: "Ім’я занадто довге.",
    errNameGeneric: "Не вдалося оновити ім’я.",
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

    editName: "Изменить имя",
    saveName: "Сохранить имя →",
    savingName: "Сохраняю имя…",
    nameHint: "Имя должно содержать от 2 до 40 символов.",
    nameSuccess: "Имя успешно обновлено.",

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
    profileBadge: "Профиль Flunio",

    errMissing: "Заполни все поля.",
    errMismatch: "Новые пароли не совпадают.",
    errWeak: "Пароль слишком слабый.",
    errWrongCurrent: "Текущий пароль неверный.",
    errSameAsCurrent: "Новый пароль должен отличаться от текущего.",
    errGeneric: "Не удалось сменить пароль.",

    errNameRequired: "Введите имя.",
    errNameTooShort: "Имя слишком короткое.",
    errNameTooLong: "Имя слишком длинное.",
    errNameGeneric: "Не удалось обновить имя.",
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

    editName: "Edit name",
    saveName: "Save name →",
    savingName: "Saving name…",
    nameHint: "Your name should contain 2 to 40 characters.",
    nameSuccess: "Name updated successfully.",

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
    profileBadge: "Flunio Profile",

    errMissing: "Please fill in all fields.",
    errMismatch: "New passwords do not match.",
    errWeak: "Password is too weak.",
    errWrongCurrent: "Current password is incorrect.",
    errSameAsCurrent: "New password must be different from the current password.",
    errGeneric: "Could not change password.",

    errNameRequired: "Please enter your name.",
    errNameTooShort: "Name is too short.",
    errNameTooLong: "Name is too long.",
    errNameGeneric: "Could not update name.",
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
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        minLength={8}
        className="min-h-11 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-slate-900"
      />
    </label>
  );
}

export default function AccountClient() {
  const { lang } = useLanguage();
  const { data: session, status, update } = useSession();

  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = T[L];

  const user = session?.user as SessionUserLike | undefined;
  const isPremium = !!user?.isPremium;

  const initialName = user?.name?.trim() || "";
  const displayEmail = user?.email?.trim() || "—";

  const [nameValue, setNameValue] = useState(initialName);
  const [savingName, setSavingName] = useState(false);
  const [nameError, setNameError] = useState("");
  const [nameSuccess, setNameSuccess] = useState("");
  const normalizedInitialName = initialName.trim();
  const normalizedNameValue = nameValue.trim();

  const isNameUnchanged = normalizedNameValue === normalizedInitialName;
  const isNameInvalid = normalizedNameValue.length < 2 || normalizedNameValue.length > 40;
  const canSaveName = !savingName && !isNameUnchanged && !isNameInvalid;

  const displayName = useMemo(() => {
    const trimmed = nameValue.trim();
    return trimmed || t.userFallback;
  }, [nameValue, t.userFallback]);

  const avatarLetter = useMemo(() => {
    const first = displayName.charAt(0);
    return first ? first.toUpperCase() : "U";
  }, [displayName]);

  const [loadingPortal, setLoadingPortal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const canSubmitPassword =
    !savingPassword &&
    !!currentPassword &&
    !!newPassword &&
    !!confirmPassword;

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

  async function handleSaveName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setNameError("");
    setNameSuccess("");

    const trimmed = nameValue.trim();

    if (!trimmed) {
      setNameError(t.errNameRequired);
      return;
    }

    if (trimmed.length < 2) {
      setNameError(t.errNameTooShort);
      return;
    }

    if (trimmed.length > 40) {
      setNameError(t.errNameTooLong);
      return;
    }

    if (trimmed === normalizedInitialName) {
      return;
    }

    try {
      setSavingName(true);

      const res = await fetch("/api/account/update-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmed,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        name?: string;
      };

      if (!res.ok || !data?.ok) {
        switch (data?.code) {
          case "NAME_REQUIRED":
            setNameError(t.errNameRequired);
            break;
          case "NAME_TOO_SHORT":
            setNameError(t.errNameTooShort);
            break;
          case "NAME_TOO_LONG":
            setNameError(t.errNameTooLong);
            break;
          default:
            setNameError(t.errNameGeneric);
            break;
        }
        return;
      }

      const nextName = data.name?.trim() || trimmed;
      setNameValue(nextName);
      setNameSuccess(t.nameSuccess);

      await update({
        ...session,
        user: {
          ...session?.user,
          name: nextName,
        },
      });
    } catch {
      setNameError(t.errNameGeneric);
    } finally {
      setSavingName(false);
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
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-100 px-8 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 text-3xl font-bold text-white shadow-sm">
                {avatarLetter}
              </div>

              <div className="space-y-1">
                <div className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {t.profileBadge}
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  {displayName}
                </h1>
                <p className="break-all text-sm text-slate-600 sm:text-base">
                  {displayEmail}
                </p>
              </div>
            </div>

            <div className="flex">
              <div
                className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${isPremium
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  : "bg-slate-100 text-slate-700 ring-1 ring-slate-200"
                  }`}
              >
                {isPremium ? t.premium : t.free}
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          <p className="text-slate-600">{t.subtitle}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            {t.accountCard}
          </h2>

          <div className="mt-4 grid gap-4">
            <InfoRow label={t.email} value={displayEmail} />
            <InfoRow
              label={t.status}
              value={isPremium ? t.premium : t.free}
            />

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <form onSubmit={handleSaveName} className="grid gap-3">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-slate-900">
                    {t.editName}
                  </div>
                  <div className="text-sm text-slate-600">{t.nameHint}</div>
                </div>

                <label className="grid gap-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    {t.name}
                  </span>
                  <input
                    type="text"
                    value={nameValue}
                    onChange={(e) => {
                      const next = e.target.value;
                      setNameValue(next);

                      if (nameError) setNameError("");

                      if (nameSuccess && next.trim() !== normalizedInitialName) {
                        setNameSuccess("");
                      }
                    }}
                    minLength={2}
                    maxLength={40}
                    className="min-h-11 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-slate-900"
                  />
                </label>

                {nameError ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {nameError}
                  </div>
                ) : null}

                {nameSuccess ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {nameSuccess}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={!canSaveName}
                  className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {savingName ? t.savingName : t.saveName}
                </button>
              </form>
            </div>
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
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-50"
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
                onChange={(v) => {
                  setCurrentPassword(v);
                  if (passwordError) setPasswordError("");
                  if (passwordSuccess) setPasswordSuccess("");
                }}
                autoComplete="current-password"
              />

              <PasswordField
                label={t.newPassword}
                value={newPassword}
                onChange={(v) => {
                  setNewPassword(v);
                  if (passwordError) setPasswordError("");
                  if (passwordSuccess) setPasswordSuccess("");
                }}
                autoComplete="new-password"
              />

              <PasswordField
                label={t.confirmPassword}
                value={confirmPassword}
                onChange={(v) => {
                  setConfirmPassword(v);
                  if (passwordError) setPasswordError("");
                  if (passwordSuccess) setPasswordSuccess("");
                }}
                autoComplete="new-password"
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
                disabled={!canSubmitPassword}
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
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
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
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