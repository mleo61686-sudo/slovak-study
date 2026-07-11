"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

import {
  COURSE_STORAGE_KEY,
  getDefaultCourse,
  type CourseId,
} from "@/lib/course";
import { useLanguage } from "@/lib/src/useLanguage";

const ACTIVITY_INTERVAL_MS = 6 * 60 * 60 * 1000;
const COURSE_CHANGED_EVENT = "slovakStudy:courseChanged";

function getActiveCourse(): CourseId {
  if (typeof window === "undefined") {
    return getDefaultCourse();
  }

  try {
    const saved = window.localStorage.getItem(COURSE_STORAGE_KEY);

    if (saved === "sk" || saved === "cs" || saved === "pl") {
      return saved;
    }
  } catch {}

  return getDefaultCourse();
}

export default function ActivityTracker() {
  const { status, data: session } = useSession();
  const { lang } = useLanguage();

  const lastSentAtRef = useRef(0);
  const sendingRef = useRef(false);

  useEffect(() => {
    if (status !== "authenticated") {
      lastSentAtRef.current = 0;
      return;
    }

    if (!session?.user?.email) {
      return;
    }

    let cancelled = false;

    async function sendActivity(force = false) {
      if (sendingRef.current) {
        return;
      }

      const now = Date.now();

      if (
        !force &&
        now - lastSentAtRef.current < ACTIVITY_INTERVAL_MS
      ) {
        return;
      }

      sendingRef.current = true;
      lastSentAtRef.current = now;

      try {
        const response = await fetch("/api/activity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            emailLanguage: lang,
            preferredCourse: getActiveCourse(),
          }),
        });

        if (!response.ok && !cancelled) {
          lastSentAtRef.current = 0;
        }
      } catch {
        if (!cancelled) {
          lastSentAtRef.current = 0;
        }
      } finally {
        sendingRef.current = false;
      }
    }

    function handleFocus() {
      void sendActivity(false);
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void sendActivity(false);
      }
    }

    function handleCourseChanged() {
      void sendActivity(true);
    }

    void sendActivity(true);

    const interval = window.setInterval(() => {
      void sendActivity(false);
    }, ACTIVITY_INTERVAL_MS);

    window.addEventListener("focus", handleFocus);
    window.addEventListener(
      COURSE_CHANGED_EVENT,
      handleCourseChanged,
    );
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      cancelled = true;

      window.clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener(
        COURSE_CHANGED_EVENT,
        handleCourseChanged,
      );
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, [status, session?.user?.email, lang]);

  return null;
}