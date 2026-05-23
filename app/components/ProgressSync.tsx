/**
 * ⚠️ CRITICAL FILE — CLIENT PROGRESS SYNC (НЕ ЛАМАТИ БЕЗ РОЗУМІННЯ)
 *
 * Це клієнтський “двигун синхронізації” між:
 * - localStorage (джерело змін на фронті)
 * - сервером (/api/progress)
 *
 * ВАЖЛИВО:
 * - Progress тепер course-aware:
 *   slovakStudy.{userId}.progress.sk
 *   slovakStudy.{userId}.progress.cs
 *   slovakStudy.{userId}.progress.pl
 *
 * - XP залишається user-level, без courseId.
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
import {
  COURSE_STORAGE_KEY,
  getDefaultCourse,
  type CourseId,
} from "@/lib/course";

const PROGRESS_EVENT = "slovakStudy:progressChanged";

const SYNC_EVENT = "slovakStudy:syncState";
type SyncState = "idle" | "syncing" | "error";

function emitSyncState(state: SyncState) {
  window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: { state } }));
}

function getActiveCourseId(): CourseId {
  if (typeof window === "undefined") return getDefaultCourse();

  try {
    const raw = localStorage.getItem(COURSE_STORAGE_KEY);

    if (raw === "sk" || raw === "cs" || raw === "pl") {
      return raw;
    }

    return getDefaultCourse();
  } catch {
    return getDefaultCourse();
  }
}

const GUEST_ID = "guest";

function keyFor(userId?: string | null, courseId?: CourseId) {
  const uid = userId && userId.trim() ? userId.trim() : GUEST_ID;
  const course = courseId ?? getActiveCourseId();

  return `slovakStudy.${uid}.progress.${course}`;
}

function pendingKeyFor(userId?: string | null, courseId?: CourseId) {
  const uid = userId && userId.trim() ? userId.trim() : GUEST_ID;
  const course = courseId ?? getActiveCourseId();

  return `slovakStudy.pendingSync.${uid}.${course}`;
}

function savePending(userId: string, courseId: CourseId, data: any) {
  try {
    localStorage.setItem(pendingKeyFor(userId, courseId), JSON.stringify(data));
  } catch {}
}

function getPending(userId: string, courseId: CourseId) {
  try {
    const raw = localStorage.getItem(pendingKeyFor(userId, courseId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearPending(userId: string, courseId: CourseId) {
  try {
    localStorage.removeItem(pendingKeyFor(userId, courseId));
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

function lessonTime(value: any): number {
  if (!value || typeof value !== "object") return 0;

  const raw = value.updatedAt ?? value.doneAt;

  if (typeof raw !== "string") return 0;

  const t = Date.parse(raw);
  return Number.isFinite(t) ? t : 0;
}

function isDone(value: any): boolean {
  if (value === true) return true;
  return !!(value && typeof value === "object" && value.done === true);
}

/**
 * Merge без втрати прогресу:
 * - якщо один із записів done:true — не губимо done
 * - якщо обидва мають updatedAt — бере новіший
 * - якщо є тільки один — бере його
 */
function mergeLessons(localLessons: Record<string, any>, serverLessons: Record<string, any>) {
  const result: Record<string, any> = {
    ...localLessons,
    ...serverLessons,
  };

  const keys = new Set([
    ...Object.keys(localLessons ?? {}),
    ...Object.keys(serverLessons ?? {}),
  ]);

  for (const key of keys) {
    const local = localLessons?.[key];
    const server = serverLessons?.[key];

    if (local == null) {
      result[key] = server;
      continue;
    }

    if (server == null) {
      result[key] = local;
      continue;
    }

    const localDone = isDone(local);
    const serverDone = isDone(server);

    if (localDone && !serverDone) {
      result[key] = local;
      continue;
    }

    if (serverDone && !localDone) {
      result[key] = server;
      continue;
    }

    const lt = lessonTime(local);
    const st = lessonTime(server);

    result[key] = lt > st ? local : server;
  }

  return result;
}

export default function ProgressSync() {
  const { status, data: session } = useSession();

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeKey = useRef<string>(keyFor(null, getDefaultCourse()));
  const activeUid = useRef<string | null>(null);
  const activeCourse = useRef<CourseId>(getDefaultCourse());
  const lastSyncIdentity = useRef<string | null>(null);
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

      const courseId = getActiveCourseId();

      lastSyncIdentity.current = null;
      activeUid.current = null;
      activeCourse.current = courseId;
      activeKey.current = keyFor(null, courseId);

      setActiveUserId(null);
      emitSyncState("idle");
    }

    async function retryPendingIfAny(userId: string, courseId: CourseId) {
      const pending = getPending(userId, courseId);

      if (!pending?.userId || pending.userId !== userId) return;
      if (pending?.courseId && pending.courseId !== courseId) return;

      try {
        const res = await fetch("/api/progress", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pending),
        });

        if (res.ok) clearPending(userId, courseId);
      } catch {}
    }

    async function load() {
      if (loadInFlight.current) return;
      if (status !== "authenticated") return;

      const courseId = getActiveCourseId();

      loadInFlight.current = true;
      emitSyncState("syncing");

      try {
        const res = await fetch(`/api/progress?courseId=${courseId}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

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

        if (activeUid.current !== userId || activeCourse.current !== courseId) {
          cancelTimer();
        }

        activeUid.current = userId;
        activeCourse.current = courseId;
        setActiveUserId(userId);
        activeKey.current = keyFor(userId, courseId);

        const serverLessons =
          data?.lessonsProgress && typeof data.lessonsProgress === "object"
            ? data.lessonsProgress
            : {};

        const localRaw = localStorage.getItem(activeKey.current);
        const localLessons = extractLessonsProgress(localRaw);

        const mergedLessons = mergeLessons(localLessons, serverLessons);

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

        await retryPendingIfAny(userId, courseId);

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
      if (!uidSnapshot) return;

      const courseSnapshot = getActiveCourseId();

      activeCourse.current = courseSnapshot;
      activeKey.current = keyFor(uidSnapshot, courseSnapshot);

      const keySnapshot = activeKey.current;

      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(async () => {
        if (activeUid.current !== uidSnapshot) return;
        if (activeKey.current !== keySnapshot) return;
        if (activeCourse.current !== courseSnapshot) return;

        emitSyncState("syncing");

        const raw = localStorage.getItem(keySnapshot);
        const lessonsProgress = extractLessonsProgress(raw);

        const payload = {
          userId: uidSnapshot,
          courseId: courseSnapshot,
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

          if (res.status === 401) {
            resetToGuest();
            return;
          }

          if (!res.ok) {
            savePending(uidSnapshot, courseSnapshot, payload);
            emitSyncState("error");
            return;
          }

          clearPending(uidSnapshot, courseSnapshot);
          emitSyncState("idle");
        } catch {
          savePending(uidSnapshot, courseSnapshot, payload);
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
    const courseId = getActiveCourseId();
    const identity = email ? `${email}:${courseId}` : null;

    if (identity && lastSyncIdentity.current !== identity) {
      lastSyncIdentity.current = identity;
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

    return () => {
      cancelled = true;
      window.removeEventListener(PROGRESS_EVENT, onProgressChanged);
      window.removeEventListener(XP_SYNC_EVENT, onProgressChanged);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
      cancelTimer();
    };
  }, [status, session?.user?.email]);

  return null;
}