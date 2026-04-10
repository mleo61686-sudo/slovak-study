"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  DEFAULT_LANG,
  LANG_STORAGE_KEY,
  normalizeLang,
  type Lang,
} from "./language";

const EVENT_NAME = "slovakStudy.langChanged";

function readCookieLang(): Lang | null {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${LANG_STORAGE_KEY}=`));

  if (!cookie) return null;

  const raw = decodeURIComponent(cookie.split("=")[1] ?? "");
  return normalizeLang(raw);
}

function readLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;

  const raw = window.localStorage.getItem(LANG_STORAGE_KEY);
  if (raw) return normalizeLang(raw);

  return readCookieLang() ?? DEFAULT_LANG;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const onStorage = (e: StorageEvent) => {
    if (e.key === LANG_STORAGE_KEY) callback();
  };

  const onCustom = () => callback();

  window.addEventListener("storage", onStorage);
  window.addEventListener(EVENT_NAME, onCustom);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVENT_NAME, onCustom);
  };
}

function writeLang(next: Lang) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(LANG_STORAGE_KEY, next);
  document.cookie = `${LANG_STORAGE_KEY}=${encodeURIComponent(
    next
  )}; path=/; max-age=31536000; samesite=lax`;

  window.dispatchEvent(new Event(EVENT_NAME));
}

export function useLanguage() {
  const lang = useSyncExternalStore(subscribe, readLang, () => DEFAULT_LANG);

  const setLang = useCallback((next: Lang) => {
    writeLang(next);
  }, []);

  return { lang, setLang };
}