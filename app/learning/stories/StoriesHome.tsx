"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/lib/src/useLanguage";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import { getStoriesForCourse, type UiLang } from "./data";
import { readGuestStoryProgress, type StoryProgress } from "./progress";

const COPY = {
  ua: { back: "← До навчання", label: "Інтерактивні історії", heading: "Читай, слухай, вирішуй", detail: "Сюжет змінюється залежно від твоїх рішень. Перевір розуміння тексту — без зубріння окремих слів.", start: "Почати історію", again: "Прочитати ще раз", best: "Найкращий результат", mastered: "Засвоєно", premium: "Premium", minutes: "хв", other: "Поки що ці історії доступні лише в курсі словацької.", switch: "Перемкнути на словацьку", note: "Відсоток — лише за перевірювані запитання щодо тексту; це не офіційна оцінка аудіювання чи CEFR." },
  ru: { back: "← К обучению", label: "Интерактивные истории", heading: "Читай, слушай, решай", detail: "Сюжет меняется в зависимости от твоих решений. Проверь понимание текста, а не отдельные слова.", start: "Начать историю", again: "Прочитать ещё раз", best: "Лучший результат", mastered: "Усвоено", premium: "Premium", minutes: "мин", other: "Пока эти истории доступны только в курсе словацкого.", switch: "Переключить на словацкий", note: "Процент — только по проверяемым вопросам к тексту, не официальная оценка аудирования или CEFR." },
  en: { back: "← Back to learning", label: "Interactive stories", heading: "Read, listen, decide", detail: "Your decisions change the storyline. Practise comprehension in context, not isolated vocabulary.", start: "Start story", again: "Read again", best: "Best result", mastered: "Mastered", premium: "Premium", minutes: "min", other: "These stories are currently available only for Slovak.", switch: "Switch to Slovak", note: "The percentage scores text comprehension questions only, not listening proficiency or an official CEFR level." },
} as const;

export default function StoriesHome() {
  const { lang } = useLanguage();
  const l: UiLang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = COPY[l];
  const { courseId } = useActiveCourse();
  const { status, data: session } = useSession();
  const email = session?.user?.email?.toLowerCase() || "";
  const admin = Boolean(email) && (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase()).includes(email);
  const premium = session?.user?.isPremium === true || admin;
  const [progress, setProgress] = useState<StoryProgress>({});

  useEffect(() => {
    if (status === "loading") return;
    if (status !== "authenticated") { setProgress(readGuestStoryProgress(courseId)); return; }
    let live = true;
    fetch(`/api/learning/stories?course=${courseId}`, { cache: "no-store" })
      .then(async response => response.ok ? (await response.json()).progress as StoryProgress : {})
      .then(value => { if (live) setProgress(value || {}); })
      .catch(() => { if (live) setProgress({}); });
    return () => { live = false; };
  }, [status, session?.user?.email, courseId]);

  return <main className="relative mx-auto max-w-4xl px-4 py-10 theme-text">
    <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 blur-3xl" />
    <Link href="/learning" className="text-sm theme-accent-text hover:underline">{t.back}</Link>
    <header className="flunio-card mt-5 rounded-3xl p-6 sm:p-8">
      <p className="text-sm font-semibold theme-accent-text">✦ {t.label}</p>
      <h1 className="mt-2 text-2xl font-black sm:text-3xl">{t.heading} · {({sk:{ua:"словацька",ru:"словацкий",en:"Slovak"},cs:{ua:"чеська",ru:"чешский",en:"Czech"},pl:{ua:"польська",ru:"польский",en:"Polish"}} as const)[courseId][l]}</h1>
      <p className="mt-3 theme-text-muted">{t.detail}</p>
    </header>
    <>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {getStoriesForCourse(courseId).map(story => {
          const result = progress[story.slug];
          const locked = story.premium && !premium;
          return <article key={story.slug} className="flunio-card flex flex-col rounded-3xl p-6">
            <div className="flex items-center justify-between gap-2"><span className="text-3xl" aria-hidden="true">{story.icon}</span><span className="theme-pill rounded-full px-3 py-1 text-xs font-semibold">{story.level}{story.premium ? " · ✦" : ""}</span></div>
            <h2 className="mt-4 text-xl font-bold">{story.title[l]}</h2>
            <p className="mt-2 flex-1 text-sm leading-6 theme-text-muted">{story.summary[l]}</p>
            <p className="mt-3 text-xs theme-text-subtle">⏱ {story.duration} {t.minutes} {story.premium ? `· ${t.premium}` : ""}</p>
            {result?.done && <p className="mt-2 text-sm theme-text-muted">{result.mastered ? `✓ ${t.mastered} · ` : ""}{t.best}: <strong className="theme-text">{result.bestPercent}%</strong></p>}
            <Link href={locked ? "/premium" : `/learning/stories/${story.slug}`} className="theme-primary-button mt-5 inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold">{locked ? `🔒 ${t.premium}` : result?.done ? t.again : t.start} →</Link>
          </article>;
        })}
      </div>
      <p className="mt-5 text-xs theme-text-subtle">{t.note}</p>
    </>
  </main>;
}
