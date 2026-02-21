"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  DEFAULT_LANG,
  LANG_STORAGE_KEY,
  normalizeLang,
  type Lang,
} from "./language";

const EVENT_NAME = "slovakStudy.langChanged";

function readLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const raw = window.localStorage.getItem(LANG_STORAGE_KEY);
  return normalizeLang(raw);
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
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function useLanguage() {
  const lang = useSyncExternalStore(subscribe, readLang, () => DEFAULT_LANG);

  const setLang = useCallback((next: Lang) => {
    writeLang(next);
  }, []);

  return { lang, setLang };
}