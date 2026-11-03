"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/lib/src/useLanguage";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import { getMissionsForCourse, type UiLang } from "./data";
import { readGuestProgress, type MissionProgress } from "./progress";

const I18N = {
  ua: { back: "← До уроків", tag: "Життєві місії", title: "Словацька для реального життя", subtitle: "Короткі діалоги, практичні рішення й власні відповіді. Проходь у своєму темпі.", min: "хв", start: "Почати місію", again: "Пройти ще раз", premium: "Premium", best: "Найкращий результат", mastered: "Засвоєно", other: "Ці місії поки створено для словацької. Перемкни курс на словацьку, щоб їх пройти.", switch: "Вибрати словацьку", training: "Результат показує тільки перевірювані завдання, а не оцінку твоєї розмовної мови." },
  ru: { back: "← К урокам", tag: "Жизненные миссии", title: "Словацкий для реальной жизни", subtitle: "Короткие диалоги, практические решения и свои ответы. Учись в удобном темпе.", min: "мин", start: "Начать миссию", again: "Пройти ещё раз", premium: "Premium", best: "Лучший результат", mastered: "Усвоено", other: "Пока эти миссии созданы для словацкого. Переключи курс на словацкий.", switch: "Выбрать словацкий", training: "Результат отражает только проверяемые задания, а не уровень разговорной речи." },
  en: { back: "← Back to lessons", tag: "Real-life missions", title: "Slovak for real life", subtitle: "Short dialogues, practical choices and your own replies. Learn at your pace.", min: "min", start: "Start mission", again: "Play again", premium: "Premium", best: "Best result", mastered: "Mastered", other: "These missions are currently available for Slovak only. Switch to the Slovak course to continue.", switch: "Choose Slovak", training: "Your score reflects objective questions only, not your spoken language proficiency." },
} as const;

export default function MissionsHome() {
  const { lang } = useLanguage();
  const l: UiLang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = I18N[l];
  const { courseId } = useActiveCourse();
  const { status, data: session } = useSession();
  const email = session?.user?.email?.toLowerCase() || "";
  const admin = Boolean(email) && (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",").map((v) => v.trim().toLowerCase()).includes(email);
  const premium = session?.user?.isPremium === true || admin;
  const [progress, setProgress] = useState<MissionProgress>({});

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") { setProgress(readGuestProgress(courseId)); return; }
    let live = true;
    fetch(`/api/learning/missions?course=${courseId}`, { cache: "no-store" })
      .then(async (r) => r.ok ? (await r.json()).progress as MissionProgress : {})
      .then((p) => { if (live) setProgress(p || {}); })
      .catch(() => { if (live) setProgress({}); });
    return () => { live = false; };
  }, [status, courseId]);

  return (
    <main className="relative mx-auto max-w-4xl px-4 py-10 theme-text">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 blur-3xl" />
      <Link className="text-sm theme-accent-text hover:underline" href="/learning">{t.back}</Link>
      <div className="flunio-card mt-5 rounded-3xl p-6 sm:p-8">
        <p className="text-sm font-semibold theme-accent-text">✦ {t.tag}</p>
        <h1 className="mt-2 text-2xl font-black theme-text sm:text-3xl">{({sk:{ua:"Словацька",ru:"Словацкий",en:"Slovak"},cs:{ua:"Чеська",ru:"Чешский",en:"Czech"},pl:{ua:"Польська",ru:"Польский",en:"Polish"}} as const)[courseId][l]} · {t.tag}</h1>
        <p className="mt-3 theme-text-muted">{t.subtitle}</p>
      </div>
      <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {getMissionsForCourse(courseId).map((mission) => {
              const result = progress[mission.slug];
              return (
                <article key={mission.slug} className="flunio-card flex flex-col rounded-3xl p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-3xl" aria-hidden="true">{mission.icon}</span>
                    <span className="theme-pill rounded-full px-3 py-1 text-xs font-semibold">{mission.level} {mission.premium ? "· ✦" : ""}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold theme-text">{mission.title[l]}</h2>
                  <p className="mt-2 flex-1 text-sm leading-6 theme-text-muted">{mission.summary[l]}</p>
                  <p className="mt-3 text-xs theme-text-subtle">⏱ {mission.duration} {t.min} {mission.premium ? `· ${t.premium}` : ""}</p>
                  {result?.done ? <p className="mt-2 text-sm theme-text-muted">{result.mastered ? `✅ ${t.mastered} · ` : ""}{t.best}: <strong className="theme-text">{result.bestPercent}%</strong></p> : null}
                  <Link href={mission.premium && !premium ? "/premium" : `/learning/missions/${mission.slug}`} className="theme-primary-button mt-5 inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold">
                    {mission.premium && !premium ? `🔒 ${t.premium}` : result?.done ? t.again : t.start} →
                  </Link>
                </article>
              );
            })}
          </div>
          <p className="mt-5 text-xs theme-text-subtle">{t.training}</p>
      </>
    </main>
  );
}
