/**
 * ⚠️ CRITICAL FILE — CLIENT PROGRESS SYNC (НЕ ЛАМАТИ БЕЗ РОЗУМІННЯ)
 *
 * Це клієнтський “двигун синхронізації” між:
 * - localStorage (джерело змін на фронті)
 * - сервером (/api/progress)
 *
 * 👉 Відповідає за:
 * - синхронізацію lesson progress
 * - синхронізацію XP
 * - pending retry (якщо не відправилось)
 * - debounce запитів (щоб не спамити API)
 *
 * --------------------------------
 * ЯК ПРАЦЮЄ:
 *
 * 1. Після логіну → GET /api/progress
 *    → записує lessonsProgress в localStorage
 *    → записує XP
 *
 * 2. При будь-якій зміні:
 *    - slovakStudy:progressChanged
 *    - XP_SYNC_EVENT
 *    - storage event
 *
 *    → викликається pushToServer()
 *
 * 3. pushToServer():
 *    → бере дані з localStorage
 *    → відправляє PUT /api/progress
 *    → якщо fail → кладеться в pending
 *
 * 4. retryPending:
 *    → при наступному load повторює sync
 *
 * --------------------------------
 * ⚠️ ДУЖЕ ВАЖЛИВО:
 *
 * ❌ НЕ міняти ключі localStorage:
 *    slovakStudy.{userId}.progress
 *
 * ❌ НЕ прибирати:
 *    PROGRESS_EVENT
 *    XP_SYNC_EVENT
 *    storage listener
 *
 * ❌ НЕ змінювати debounce (600ms) без причини
 *
 * ❌ НЕ прибирати pending логіку
 *
 * ❌ НЕ міняти payload:
 *    { userId, lessonsProgress, xpTotal }
 *
 * --------------------------------
 * ⚠️ МОЖЛИВІ ПРОБЛЕМИ ПРИ ПОМИЛКАХ:
 *
 * - прогрес не синхрониться між ПК і мобілкою ❌
 * - XP не зберігається ❌
 * - подвійні або втрачені уроки ❌
 * - infinite запити ❌
 *
 * --------------------------------
 * ✅ ПІСЛЯ БУДЬ-ЯКИХ ЗМІН:
 *
 * 1. npm run build
 *
 * 2. тест:
 *    - ПК → пройти урок
 *    - мобілка → оновити → перевірити
 *
 * 3. перевір:
 *    - XP синхрониться
 *    - урок відкрився
 *    - немає подвійних PUT запитів
 *
 * --------------------------------
 * Пов’язані критичні файли:
 * - app/api/progress/route.ts
 * - words-srs-storage.ts
 * - LevelClient / saveProgress
 */

"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { setActiveUserId } from "@/lib/src/progress";
import {
  getXpState,
  setXpState,
  XP_SYNC_EVENT,
} from "@/app/components/words-srs/words-srs-storage";

const GUEST_KEY = "slovakStudy.guest.progress";
const keyFor = (userId?: string | null) =>
  userId ? `slovakStudy.${userId}.progress` : GUEST_KEY;

const PROGRESS_EVENT = "slovakStudy:progressChanged";

const SYNC_EVENT = "slovakStudy:syncState";
type SyncState = "idle" | "syncing" | "error";

function emitSyncState(state: SyncState) {
  window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: { state } }));
}

const PENDING_KEY = "slovakStudy.pendingSync";

function savePending(data: any) {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(data));
  } catch {}
}

function getPending() {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearPending() {
  try {
    localStorage.removeItem(PENDING_KEY);
  } catch {}
}

function extractLessonsProgress(raw: string | null) {
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);

    if (parsed && typeof parsed === "object" && "lessons" in parsed) {
      return (parsed as any).lessons ?? {};
    }

    return parsed ?? {};
  } catch {
    return {};
  }
}

export default function ProgressSync() {
  const { status, data: session } = useSession();

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeKey = useRef<string>(GUEST_KEY);
  const activeUid = useRef<string | null>(null);
  const lastSyncEmail = useRef<string | null>(null);
  const loadInFlight = useRef(false);

  useEffect(() => {
    let cancelled = false;

    function cancelTimer() {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    }

    function resetToGuest() {
      cancelTimer();
      lastSyncEmail.current = null;
      activeUid.current = null;
      activeKey.current = GUEST_KEY;
      setActiveUserId(null);
      emitSyncState("idle");
    }

    async function retryPendingIfAny(userId: string) {
      const pending = getPending();
      if (!pending?.userId || pending.userId !== userId) return;

      try {
        const res = await fetch("/api/progress", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pending),
        });

        if (res.ok) clearPending();
      } catch {}
    }

    async function load() {
      if (loadInFlight.current) return;
      if (status !== "authenticated") return;

      loadInFlight.current = true;
      emitSyncState("syncing");

      try {
        const res = await fetch("/api/progress", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        // ❗ КЛЮЧОВИЙ ФІКС
        if (res.status === 401) {
          resetToGuest();
          loadInFlight.current = false;
          return;
        }

        if (!res.ok) {
          emitSyncState("error");
          loadInFlight.current = false;
          return;
        }

        const data = await res.json();
        const userId: string = data?.userId;

        if (!userId) {
          resetToGuest();
          loadInFlight.current = false;
          return;
        }

        if (activeUid.current !== userId) cancelTimer();

        activeUid.current = userId;
        setActiveUserId(userId);
        activeKey.current = keyFor(userId);

        const serverLessons =
          data?.lessonsProgress && typeof data.lessonsProgress === "object"
            ? data.lessonsProgress
            : {};

        const localRaw = localStorage.getItem(activeKey.current);
        const localLessons = extractLessonsProgress(localRaw);

        const mergedLessons = {
          ...serverLessons,
          ...localLessons,
        };

        localStorage.setItem(
          activeKey.current,
          JSON.stringify({
            version: 1,
            updatedAt: Date.now(),
            lessons: mergedLessons,
            srs: {},
          })
        );

        if (typeof data?.xpTotal === "number") {
          setXpState(userId, { totalXp: data.xpTotal }, { emit: false });
        }

        await retryPendingIfAny(userId);

        emitSyncState("idle");
      } catch {
        emitSyncState("error");
      } finally {
        loadInFlight.current = false;
      }
    }

    function pushToServer() {
      if (status !== "authenticated") return;
      const uidSnapshot = activeUid.current;
      const keySnapshot = activeKey.current;

      if (!uidSnapshot) return;

      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(async () => {
        if (activeUid.current !== uidSnapshot) return;
        if (activeKey.current !== keySnapshot) return;

        emitSyncState("syncing");

        const raw = localStorage.getItem(keySnapshot);
        const lessonsProgress = extractLessonsProgress(raw);

        const payload = {
          userId: uidSnapshot,
          lessonsProgress,
          xpTotal: getXpState(uidSnapshot).totalXp,
        };

        try {
          const res = await fetch("/api/progress", {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          // ❗ не ретраїмо 401
          if (res.status === 401) {
            resetToGuest();
            return;
          }

          if (!res.ok) {
            savePending(payload);
            emitSyncState("error");
            return;
          }

          clearPending();
          emitSyncState("idle");
        } catch {
          savePending(payload);
          emitSyncState("error");
        }
      }, 600);
    }

    if (status === "loading") return;

    if (status === "unauthenticated") {
      resetToGuest();
      return;
    }

    const email = session?.user?.email ?? null;

    if (email && lastSyncEmail.current !== email) {
      lastSyncEmail.current = email;
      load();
    }

    function onProgressChanged() {
      pushToServer();
    }

    function onStorage() {
      pushToServer();
    }

    function onFocus() {
      load();
    }

    window.addEventListener(PROGRESS_EVENT, onProgressChanged);
    window.addEventListener(XP_SYNC_EVENT, onProgressChanged);
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);

    const interval = setInterval(() => {
      load();
    }, 15000);

    return () => {
      cancelled = true;
      window.removeEventListener(PROGRESS_EVENT, onProgressChanged);
      window.removeEventListener(XP_SYNC_EVENT, onProgressChanged);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
      clearInterval(interval);
      cancelTimer();
    };
  }, [status, session?.user?.email]);

  return null;
}