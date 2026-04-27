"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

type Step = {
  ids: string[];
  text: string;
  button: string;
};

const STEPS: Record<Lang, Step[]> = {
  ua: [
    {
      ids: ["avatar", "mobile-menu"],
      text: "Відкрий меню, щоб перейти до вибору курсу.",
      button: "Відкрити меню",
    },
    {
      ids: ["choose-course"],
      text: "Тут можна обрати мову, яку хочеш вивчати.",
      button: "Обрати курс",
    },
    {
      ids: ["course-card"],
      text: "Обери курс, з якого хочеш почати.",
      button: "Завершити",
    },
  ],
  ru: [
    {
      ids: ["avatar", "mobile-menu"],
      text: "Открой меню, чтобы перейти к выбору курса.",
      button: "Открыть меню",
    },
    {
      ids: ["choose-course"],
      text: "Здесь можно выбрать язык, который хочешь изучать.",
      button: "Выбрать курс",
    },
    {
      ids: ["course-card"],
      text: "Выбери курс, с которого хочешь начать.",
      button: "Завершить",
    },
  ],
  en: [
    {
      ids: ["avatar", "mobile-menu"],
      text: "Open the menu to choose your course.",
      button: "Open menu",
    },
    {
      ids: ["choose-course"],
      text: "Here you can choose the language you want to learn.",
      button: "Choose course",
    },
    {
      ids: ["course-card"],
      text: "Choose the course you want to start with.",
      button: "Finish",
    },
  ],
};

const SKIP_TEXT: Record<Lang, string> = {
  ua: "Пропустити",
  ru: "Пропустить",
  en: "Skip",
};

function waitForStableLayout(callback: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      callback();
    });
  });
}

function isVisibleElement(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);

  return (
    rect.width > 0 &&
    rect.height > 0 &&
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    style.opacity !== "0"
  );
}

function findStepElement(step: Step): HTMLElement | null {
  for (const id of step.ids) {
    const elements = Array.from(
      document.querySelectorAll(`[data-onboarding="${id}"]`)
    ) as HTMLElement[];

    const visible = elements.find(isVisibleElement);

    if (visible) return visible;
  }

  return null;
}

export default function OnboardingOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const { lang } = useLanguage();

  const safeLang: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const steps = STEPS[safeLang];

  const [stepIndex, setStepIndex] = useState<number | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const step = useMemo(() => {
    if (stepIndex === null) return null;
    return steps[stepIndex] ?? null;
  }, [stepIndex, steps]);

  useEffect(() => {
    function startIfPending() {
      if (pathname !== "/") return;

      const done = localStorage.getItem("flunio:onboarding");
      const pending = localStorage.getItem("flunio:onboarding:pending");

      if (!done && pending === "1") {
        setStepIndex(0);
      }
    }

    startIfPending();

    window.addEventListener("flunio:onboarding:start", startIfPending);

    return () => {
      window.removeEventListener("flunio:onboarding:start", startIfPending);
    };
  }, [pathname]);

  useEffect(() => {
    function updateViewport() {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    updateViewport();

    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (!step) {
      setRect(null);
      return;
    }

    let cancelled = false;

    function updateRect() {
      if (cancelled || !step) return;

      const el = findStepElement(step);

      if (!el) {
        setRect(null);
        return;
      }

      setRect(el.getBoundingClientRect());
    }

    waitForStableLayout(updateRect);

    const timers = [
      window.setTimeout(updateRect, 150),
      window.setTimeout(updateRect, 350),
      window.setTimeout(updateRect, 700),
    ];

    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);

    const observer = new ResizeObserver(updateRect);
    const observedEl = findStepElement(step);

    if (observedEl) {
      observer.observe(observedEl);
    }

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
      observer.disconnect();
    };
  }, [step, pathname]);

  useEffect(() => {
    if (stepIndex !== 2) return;
    if (pathname !== "/learn") return;

    waitForStableLayout(() => {
      const el = findStepElement(steps[2]);
      if (el) setRect(el.getBoundingClientRect());
    });
  }, [stepIndex, pathname, steps]);

  function finish() {
    localStorage.setItem("flunio:onboarding", "done");
    localStorage.removeItem("flunio:onboarding:pending");
    setStepIndex(null);
    setRect(null);
  }

  function openMobileMenu() {
    window.dispatchEvent(new Event("flunio:onboarding:open-mobile-menu"));
  }

  function closeMobileMenu() {
    window.dispatchEvent(new Event("flunio:onboarding:close-mobile-menu"));
  }

  function openUserMenu() {
    window.dispatchEvent(new Event("flunio:onboarding:open-user-menu"));
  }

  function closeUserMenu() {
    window.dispatchEvent(new Event("flunio:onboarding:close-user-menu"));
  }

  function next() {
    if (stepIndex === null) return;

    if (stepIndex === 0) {
      const isMobile = window.innerWidth < 640;

      if (isMobile) {
        openMobileMenu();
      } else {
        openUserMenu();
      }

      window.setTimeout(() => {
        waitForStableLayout(() => {
          setStepIndex(1);
        });
      }, 300);

      return;
    }

    if (stepIndex === 1) {
      closeMobileMenu();
      closeUserMenu();

      setRect(null);
      router.push("/learn");

      window.setTimeout(() => {
        waitForStableLayout(() => {
          setStepIndex(2);
        });
      }, 900);

      return;
    }

    finish();
  }

  if (stepIndex === null || !step || rect === null) return null;

  const tooltipWidth = 280;
  const tooltipHeight = 150;

  const tooltipTop =
    rect.bottom + 12 + tooltipHeight < viewport.height
      ? rect.bottom + 12
      : Math.max(12, rect.top - tooltipHeight - 12);

  const tooltipLeft = Math.min(
    Math.max(12, rect.left),
    Math.max(12, viewport.width - tooltipWidth - 12)
  );

  return (
    <div data-onboarding-overlay="true">
      <div className="fixed inset-0 z-[9998] bg-black/50" />

      <div
        className="pointer-events-none fixed z-[9999] rounded-xl border-2 border-sky-400 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] transition-all duration-200"
        style={{
          top: rect.top - 6,
          left: rect.left - 6,
          width: rect.width + 12,
          height: rect.height + 12,
        }}
      />

      <div
        className="fixed z-[10000] max-w-xs rounded-xl bg-white p-4 shadow-xl"
        style={{
          top: tooltipTop,
          left: tooltipLeft,
          width: tooltipWidth,
        }}
      >
        <div className="text-sm font-medium text-slate-900">{step.text}</div>

        <div className="mt-3 flex justify-between gap-2">
          <button
            onClick={finish}
            className="text-xs text-slate-500 hover:text-slate-700"
            type="button"
          >
            {SKIP_TEXT[safeLang]}
          </button>

          <button
            onClick={next}
            className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-700"
            type="button"
          >
            {step.button}
          </button>
        </div>
      </div>
    </div>
  );
}