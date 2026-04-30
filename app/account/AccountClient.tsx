"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/src/useLanguage";
import { InfoRow, PasswordField } from "./account-ui";
import { T, type Lang } from "./account-texts";
import {
  getUserLevel,
  getXpState,
  type XpState,
} from "@/app/components/words-srs/words-srs-storage";

type SessionUserLike = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  isPremium?: boolean;
};

export default function AccountClient() {
  const { lang } = useLanguage();
  const { data: session, status, update } = useSession();

  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = T[L];

  const user = session?.user as SessionUserLike | undefined;
  const userId = String(user?.id ?? "");
  const isPremium = !!user?.isPremium;

  const initialName = user?.name?.trim() || "";
  const displayEmail = user?.email?.trim() || "—";

  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [nameValue, setNameValue] = useState(initialName);
  const [savingName, setSavingName] = useState(false);
  const [nameError, setNameError] = useState("");
  const [nameSuccess, setNameSuccess] = useState("");
  const [xp, setXp] = useState<XpState>({ totalXp: 0 });

  const normalizedInitialName = initialName.trim();
  const normalizedNameValue = nameValue.trim();

  const isNameUnchanged = normalizedNameValue === normalizedInitialName;
  const isNameInvalid =
    normalizedNameValue.length < 2 || normalizedNameValue.length > 40;
  const canSaveName = !savingName && !isNameUnchanged && !isNameInvalid;

  const displayName = useMemo(() => {
    const trimmed = nameValue.trim();
    return trimmed || t.userFallback;
  }, [nameValue, t.userFallback]);

  const avatarLetter = useMemo(() => {
    const first = displayName.charAt(0);
    return first ? first.toUpperCase() : "U";
  }, [displayName]);

  const levelInfo = useMemo(() => getUserLevel(xp.totalXp), [xp.totalXp]);
  const levelTitle = levelInfo.title[L] ?? levelInfo.title.ua;
  const xpToNext = Math.max(0, levelInfo.nextLevelXp - xp.totalXp);

  const levelLabel =
    L === "ru" ? "Уровень" : L === "en" ? "Level" : "Рівень";
  const xpLabel = L === "ru" ? "Опыт" : L === "en" ? "XP" : "Досвід";
  const nextLevelLabel =
    L === "ru"
      ? "до следующего уровня"
      : L === "en"
        ? "to next level"
        : "до наступного рівня";
  const levelHelpText =
    L === "ru"
      ? "Получай XP во время повторения слов на главной странице — так растёт твой уровень."
      : L === "en"
        ? "Earn XP by reviewing words on the main page — that is how your level grows."
        : "Отримуй XP під час повторення слів на головній сторінці — так зростає твій рівень.";

  const goToReviewLabel =
    L === "ru"
      ? "Перейти к повторению"
      : L === "en"
        ? "Go to word review"
        : "Перейти до повторення";

  const [loadingPortal, setLoadingPortal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState("");
  const [avatarSuccess, setAvatarSuccess] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const canSubmitPassword =
    !savingPassword && !!currentPassword && !!newPassword && !!confirmPassword;

  useEffect(() => {
    if (status !== "authenticated") return;
    if (!userId) return;

    setXp(getXpState(userId));

    function handleSrsChanged() {
      setXp(getXpState(userId));
    }

    window.addEventListener("slovakStudy:srsChanged", handleSrsChanged);
    window.addEventListener("storage", handleSrsChanged);

    return () => {
      window.removeEventListener("slovakStudy:srsChanged", handleSrsChanged);
      window.removeEventListener("storage", handleSrsChanged);
    };
  }, [status, userId]);

  useEffect(() => {
    if (status !== "authenticated") return;

    let cancelled = false;
    setAvatarLoaded(false);

    async function loadAvatar() {
      try {
        const res = await fetch("/api/account/update-avatar", {
          method: "GET",
          cache: "no-store",
        });

        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          avatarUrl?: string | null;
        };

        if (cancelled) return;

        if (res.ok && data?.ok && data.avatarUrl) {
          setAvatarUrl(data.avatarUrl);
        } else {
          setAvatarUrl("");
        }
      } catch {
        if (!cancelled) setAvatarUrl("");
      } finally {
        if (!cancelled) setAvatarLoaded(true);
      }
    }

    loadAvatar();

    return () => {
      cancelled = true;
    };
  }, [status]);

  useEffect(() => {
    if (!nameSuccess) return;

    const timer = window.setTimeout(() => {
      setNameSuccess("");
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [nameSuccess]);

  useEffect(() => {
    if (!passwordSuccess) return;

    const timer = window.setTimeout(() => {
      setPasswordSuccess("");
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [passwordSuccess]);

  useEffect(() => {
    if (!avatarSuccess) return;

    const timer = window.setTimeout(() => {
      setAvatarSuccess("");
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [avatarSuccess]);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";

    setAvatarError("");
    setAvatarSuccess("");

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setAvatarError(t.avatarInvalid);
      return;
    }

    if (file.size > 700 * 1024) {
      setAvatarError(t.avatarTooLarge);
      return;
    }

    try {
      setUploadingAvatar(true);

      const avatarDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
            return;
          }

          reject(new Error("Invalid image result"));
        };

        reader.onerror = () => reject(new Error("Could not read image"));
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/account/update-avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatarUrl: avatarDataUrl,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        avatarUrl?: string;
      };

      if (!res.ok || !data?.ok || !data.avatarUrl) {
        switch (data?.code) {
          case "INVALID_IMAGE":
            setAvatarError(t.avatarInvalid);
            break;
          case "IMAGE_TOO_LARGE":
            setAvatarError(t.avatarTooLarge);
            break;
          default:
            setAvatarError(t.avatarGeneric);
            break;
        }

        return;
      }

      setAvatarUrl(data.avatarUrl);

      window.dispatchEvent(
        new CustomEvent("flunio:avatarUpdated", {
          detail: { avatarUrl: data.avatarUrl },
        })
      );

      setAvatarSuccess(t.avatarSuccess);
    } catch {
      setAvatarError(t.avatarGeneric);
    } finally {
      setUploadingAvatar(false);
    }
  }

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
        <div className="flunio-card rounded-3xl p-8 text-white">
          <div className="text-center text-white/65">{t.loading}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="flunio-card overflow-hidden rounded-3xl text-white transition hover:shadow-[0_0_28px_rgba(34,211,238,0.12)]">
        <div className="border-b border-white/10 bg-white/5 px-5 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-6 md:grid-cols-[120px_1fr] md:items-start">
            <div className="flex flex-col items-center gap-2 md:pt-10">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-500 to-fuchsia-500 text-3xl font-bold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition duration-200 hover:scale-[1.03]">
                {!avatarLoaded ? (
                  <div className="h-full w-full animate-pulse bg-white/20" />
                ) : avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  avatarLetter
                )}
              </div>

              <label className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 shadow-sm backdrop-blur transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white">
                {uploadingAvatar ? t.uploadingAvatar : t.changeAvatar}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  disabled={uploadingAvatar}
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            <div className="min-w-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 text-center sm:text-left">
                  <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/60 shadow-sm backdrop-blur">
                    {t.profileBadge}
                  </div>

                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {displayName}
                  </h1>

                  <p className="break-all text-sm text-white/60 sm:text-base">
                    {displayEmail}
                  </p>
                </div>

                <div
                  className={`mx-auto inline-flex rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition sm:mx-0 ${isPremium
                    ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                    : "border border-white/10 bg-white/5 text-white/65"
                    }`}
                >
                  {isPremium ? t.premium : t.free}
                </div>
              </div>

              <div className="mt-5 max-w-2xl rounded-3xl border border-amber-300/20 bg-amber-300/10 p-4 shadow-[0_0_20px_rgba(251,191,36,0.12)] backdrop-blur">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-amber-200">
                      {levelLabel}
                    </div>

                    <div className="mt-1 text-xl font-bold text-white">
                      ⭐ {levelInfo.level} — {levelTitle}
                    </div>
                  </div>

                  <div className="rounded-xl border border-amber-300/20 bg-white/5 px-3 py-1.5 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                      {xpLabel}
                    </div>
                    <div className="text-lg font-bold text-white">
                      {xp.totalXp} XP
                    </div>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 transition-all duration-300"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>

                <div className="mt-2 text-xs font-medium text-amber-100/80">
                  {levelInfo.level >= 6
                    ? "Max level"
                    : `${xpToNext} XP ${nextLevelLabel}`}
                </div>

                <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs leading-5 text-white/65 sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-start gap-2">
                    <span>💡</span>
                    <span>{levelHelpText}</span>
                  </span>

                  <Link
                    href="/"
                    className="inline-flex shrink-0 justify-center rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(59,130,246,0.3)] transition hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    {goToReviewLabel}
                  </Link>
                </div>
              </div>

              {avatarError ? (
                <div className="mt-3 rounded-2xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                  {avatarError}
                </div>
              ) : null}

              {avatarSuccess ? (
                <div className="mt-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200">
                  {avatarSuccess}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="px-5 py-5 sm:px-8 sm:py-6">
          <p className="text-white/65">{t.subtitle}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_0_20px_rgba(34,211,238,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-white/10">
          <h2 className="text-xl font-semibold text-white">
            {t.accountCard}
          </h2>

          <div className="mt-4 grid gap-4">
            <InfoRow label={t.email} value={displayEmail} />
            <InfoRow label={t.status} value={isPremium ? t.premium : t.free} />

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <form onSubmit={handleSaveName} className="grid gap-3">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-white">
                    {t.editName}
                  </div>
                  <div className="text-sm text-white/60">{t.nameHint}</div>
                </div>

                <label className="grid gap-1.5">
                  <span className="text-sm font-medium text-white/70">
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
                    className="min-h-11 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none backdrop-blur transition focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-[0_0_18px_rgba(34,211,238,0.18)]"
                  />
                </label>

                {nameError ? (
                  <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {nameError}
                  </div>
                ) : null}

                {nameSuccess ? (
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                    {nameSuccess}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={!canSaveName}
                  className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-400/45 bg-white/5 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(34,211,238,0.12)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-white/5 disabled:active:scale-100"
                >
                  {savingName ? t.savingName : t.saveName}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_0_20px_rgba(34,211,238,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-white/10">
          <h2 className="text-xl font-semibold text-white">
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
              className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:active:scale-100"
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

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_0_20px_rgba(34,211,238,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-white/10">
          <h2 className="text-xl font-semibold text-white">
            {t.securityCard}
          </h2>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/65">
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
                <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {passwordError}
                </div>
              ) : null}

              {passwordSuccess ? (
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                  {passwordSuccess}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={!canSubmitPassword}
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-400/45 bg-white/5 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(34,211,238,0.12)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-white/5 disabled:active:scale-100"
              >
                {savingPassword ? t.saving : t.changePassword}
              </button>
            </form>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_0_20px_rgba(34,211,238,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-white/10">
          <h2 className="text-xl font-semibold text-white">
            {t.sessionCard}
          </h2>

          <div className="mt-4 grid gap-3">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-500/15 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
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