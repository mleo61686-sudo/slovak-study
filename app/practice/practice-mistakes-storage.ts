"use client";

import type { CourseId } from "@/app/learning/courses/registry";
import {
  createEmptyMistakeStore,
  mergeMistakeStores,
  normalizeMistakeStore,
  type PracticeMistakeStore,
} from "./practice-mistakes";

const LS_KEY = "slovakStudy.practiceMistakes.v1";
export const PRACTICE_MISTAKES_UPDATED_EVENT = "flunio:practice-mistakes-updated";

const pendingSync = new Map<
  CourseId,
  { timer: number; store: PracticeMistakeStore }
>();

export function loadLocalMistakeStore(courseId: CourseId): PracticeMistakeStore {
  if (typeof window === "undefined") return createEmptyMistakeStore();

  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return createEmptyMistakeStore();
    return normalizeMistakeStore(JSON.parse(raw), courseId);
  } catch {
    return createEmptyMistakeStore();
  }
}

export function saveLocalMistakeStore(store: PracticeMistakeStore, courseId: CourseId) {
  if (typeof window === "undefined") return;

  try {
    const normalized = normalizeMistakeStore(store, courseId);
    window.localStorage.setItem(LS_KEY, JSON.stringify(normalized));
    window.dispatchEvent(
      new CustomEvent(PRACTICE_MISTAKES_UPDATED_EVENT, {
        detail: { courseId, store: normalized },
      })
    );
  } catch {}
}

export async function hydrateMistakeStore(
  courseId: CourseId
): Promise<PracticeMistakeStore> {
  const local = loadLocalMistakeStore(courseId);

  try {
    const response = await fetch(`/api/practice-mistakes?courseId=${courseId}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) return local;

    const json = await response.json();
    if (!json?.ok) return local;

    const server = normalizeMistakeStore(json.data, courseId);
    const latestLocal = loadLocalMistakeStore(courseId);
    const merged = mergeMistakeStores(latestLocal, server, courseId);
    saveLocalMistakeStore(merged, courseId);

    if (JSON.stringify(merged.items) !== JSON.stringify(server.items)) {
      void syncMistakeStore(courseId, merged);
    }

    return merged;
  } catch {
    return local;
  }
}

export async function syncMistakeStore(
  courseId: CourseId,
  store: PracticeMistakeStore
): Promise<boolean> {
  try {
    const normalized = normalizeMistakeStore(store, courseId);
    const courseData = normalizeMistakeStore(
      {
        ...normalized,
        items: normalized.items.filter((item) => item.courseId === courseId),
      },
      courseId
    );

    const response = await fetch("/api/practice-mistakes", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        courseId,
        data: courseData,
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}

export function scheduleMistakeStoreSync(
  courseId: CourseId,
  store: PracticeMistakeStore,
  delayMs = 450
) {
  if (typeof window === "undefined") return;

  const current = pendingSync.get(courseId);
  if (current) window.clearTimeout(current.timer);

  const timer = window.setTimeout(() => {
    const pending = pendingSync.get(courseId);
    pendingSync.delete(courseId);
    if (pending) void syncMistakeStore(courseId, pending.store);
  }, delayMs);

  pendingSync.set(courseId, { timer, store });
}
