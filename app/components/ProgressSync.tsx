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

// ✅ UI state
const SYNC_EVENT = "slovakStudy:syncState";
type SyncState = "idle" | "syncing" | "error";
function emitSyncState(state: SyncState) {
  window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: { state } }));
}

// ✅ pending
const PENDING_KEY = "slovakStudy.pendingSync";

function savePending(data: any) {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(data));
  } catch { }
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
  } catch { }
}

// ✅ завжди повертає object
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

  const timer = useRef<any>(null);
  const activeKey = useRef<string>(GUEST_KEY);
  const activeUid = useRef<string | null>(null);

  // щоб не робити зайві GET-и на кожен ререндер
  const lastSyncEmail = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    function cancelTimer() {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    }

    async function retryPendingIfAny(userId: string | null) {
      const pending = getPending();
      if (!pending?.userId) return;
      if (pending.userId !== userId) return;

      try {
        const res = await fetch("/api/progress", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pending),
        });

        if (res.ok) clearPending();
      } catch {
        // лишаємо pending
      }
    }

    async function load(attempt = 0) {
      emitSyncState("syncing");

      try {
        const res = await fetch("/api/progress", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          // після логіну cookies інколи “докочуються”
          if (
            !cancelled &&
            (res.status === 401 || res.status === 403) &&
            attempt < 10
          ) {
            setTimeout(() => load(attempt + 1), 300);
            return;
          }

          emitSyncState("error");
          return;
        }

        const data = await res.json();
        const userId: string | null = data?.userId ?? null;

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

        const localHasSomethingServerDoesNot = Object.keys(localLessons).some(
          (lessonId) => !(lessonId in serverLessons)
        );

        if (localHasSomethingServerDoesNot) {
          window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
        }

        if (typeof data?.xpTotal === "number" && userId) {
          setXpState(userId, { totalXp: data.xpTotal }, { emit: false });
        }

        // 🔁 після успішного GET пробуємо дослати pending
        await retryPendingIfAny(userId);

        emitSyncState("idle");
      } catch {
        emitSyncState("error");
      }
    }

    // ⬇️ чекаємо статус NextAuth
    if (status === "loading") return;

    if (status === "unauthenticated") {
      lastSyncEmail.current = null;
      activeUid.current = null;
      setActiveUserId(null);
      activeKey.current = GUEST_KEY;
      emitSyncState("idle");
      return;
    }

    const email = session?.user?.email ?? null;
    if (email && lastSyncEmail.current !== email) {
      lastSyncEmail.current = email;
      load();
    }

    function pushToServer() {
      const uidSnapshot = activeUid.current;
      const keySnapshot = activeKey.current;

      if (!uidSnapshot) return;

      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(async () => {
        // захист від переключення акаунта
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

    // ✅ головний тригер
    function onProgressChanged() {
      pushToServer();
    }

    // ✅ “страховка”: у тебе saveProgress диспатчить storage в цій вкладці
    function onStorage() {
      pushToServer();
    }

    window.addEventListener(PROGRESS_EVENT, onProgressChanged);
    window.addEventListener(XP_SYNC_EVENT, onProgressChanged);
    window.addEventListener("storage", onStorage);

    // ✅ при поверненні на вкладку — load + retry pending
    function onFocus() {
      load();
    }
    window.addEventListener("focus", onFocus);

    // ✅ 🔥 авто-синхронізація кожні 15 секунд (ВАЖЛИВО ДЛЯ multi-device)
    const interval = setInterval(() => {
      load();
    }, 15000);

    return () => {
      cancelled = true;
      window.removeEventListener(PROGRESS_EVENT, onProgressChanged);
      window.removeEventListener(XP_SYNC_EVENT, onProgressChanged);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
      clearInterval(interval); // 🔥 важливо
      cancelTimer();
    };
  }, [status, session?.user?.email]);

  return null;
}