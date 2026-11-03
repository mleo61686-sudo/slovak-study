"use client";

import Link from "next/link";
import LearningHubIcon from "../components/LearningHubIcon";
import Image from "next/image";
import styles from "../LearningHubV2.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/lib/src/useLanguage";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import { computeStats, isWeakState, type SrsState } from "@/app/components/words-srs/words-srs-logic";
import { getDailyGoalState, loadDb } from "@/app/components/words-srs/words-srs-storage";
import { readGuestProgress } from "@/app/learning/missions/progress";
import type { MissionProgress } from "@/app/learning/missions/progress";
import { readGuestStoryProgress, type StoryProgress } from "@/app/learning/stories/progress";
import type { LessonsProgress } from "@/lib/src/progress";
import { buildPersonalPlan, type LessonRecord, type SrsSnapshot, type StudyTask } from "./planner";
import { buildLearningJourney, type JourneyArea, type JourneyStatus } from "./journey";

type Lang = "ua" | "ru" | "en";
type Labels = {
  heading: string; intro: string; loading: string; minutes: string; today: string;
  reviews: string; reviewsNote: (n: number) => string;
  weak: string; weakNote: string;
  lesson: string; lessonNote: string;
  mission: string; missionNote: string;
  story: string; storyNote: string;
  action: string; noTasks: string;
  profile: string; profileDesc: string;
  doneLessons: string; mastery: string; vocabulary: string; practiced: string;
  missions: string; stories: string; listening: string; speaking: string; unmeasured: string;
  signIn: string; signInLink: string; covered: string; accuracy: string;
  weakDue: (n: number) => string; doneToday: (n: number) => string;
  pathway: string; pathwayIntro: string; pathwayNext: string; pathwayIdle: string;
  pathwayArea: Record<JourneyArea, string>; pathwayStatus: Record<JourneyStatus, string>;
};
const I18N: Record<Lang, Labels> = {
  ua: {
    heading: "Мій план на сьогодні", intro: "Наступні кроки на основі твоїх уроків і повторень. План оновлюється разом із прогресом.",
    loading: "Формуємо план…", minutes: "хв", today: "Сьогодні", reviews: "Повтори слова", reviewsNote: n => `${n} слів готові до повторення`,
    weak: "Закріпи складний урок", weakNote: "Повернися до уроку, в якому були помилки", lesson: "Продовжуй курс", lessonNote: "Наступний доступний урок",
    mission: "Життєва місія", missionNote: "Використай слова в реальному діалозі", story: "Інтерактивна історія", storyNote: "Читай обраною мовою та впливай на сюжет", action: "Перейти →", noTasks: "Поки немає нових завдань. Можеш переглянути уроки або потренуватися у словнику.",
    profile: "Мій навчальний профіль", profileDesc: "Це статистика вправ, а не сертифікований рівень CEFR. Вимірюємо тільки те, для чого маємо дані.",
    doneLessons: "Пройдені уроки", mastery: "Закріплені уроки", vocabulary: "Слова у повторенні", practiced: "Середня точність уроків",
    missions: "Пройдені місії", stories: "Прочитані історії", listening: "Аудіювання", speaking: "Говоріння", unmeasured: "Окремо не оцінюється",
    signIn: "Повторення слів відображатиметься після входу в акаунт.", signInLink: "Увійти", covered: "з перевіреними результатами", accuracy: "За останніми спробами", weakDue: n => `Із них ${n} складних, які час повторити`, doneToday: n => `Сьогодні повторено: ${n}`,
    pathway: "Мій навчальний маршрут", pathwayIntro: "Урок → повторення → діалог → історія. Маршрут показує наступні доступні дії, а не присвоює рівень CEFR.", pathwayNext: "Рекомендований наступний крок", pathwayIdle: "Поки немає обов’язкових завдань. Можеш переглянути розділи нижче.",
    pathwayArea: { lesson: "Уроки", reviews: "Повторення слів", mission: "Життєві місії", story: "Історії" },
    pathwayStatus: { ready: "Можна продовжити", "caught-up": "Поки виконано", "not-started": "Ще немає даних", locked: "Поки недоступно" },
  },
  ru: {
    heading: "Мой план на сегодня", intro: "Следующие шаги на основе твоих уроков и повторений. План обновляется вместе с прогрессом.",
    loading: "Составляем план…", minutes: "мин", today: "Сегодня", reviews: "Повтори слова", reviewsNote: n => `${n} слов пора повторить`,
    weak: "Закрепи трудный урок", weakNote: "Вернись к уроку, в котором были ошибки", lesson: "Продолжай курс", lessonNote: "Следующий доступный урок",
    mission: "Жизненная миссия", missionNote: "Используй слова в реальном диалоге", story: "Интерактивная история", storyNote: "Читай на выбранном языке и влияй на сюжет", action: "Перейти →", noTasks: "Пока нет новых заданий. Можно вернуться к урокам или словарю.",
    profile: "Мой учебный профиль", profileDesc: "Это статистика упражнений, не сертифицированный уровень CEFR. Показываем только подтверждённые данные.",
    doneLessons: "Пройденные уроки", mastery: "Закреплённые уроки", vocabulary: "Слова на повторении", practiced: "Средняя точность уроков",
    missions: "Пройденные миссии", stories: "Прочитанные истории", listening: "Аудирование", speaking: "Говорение", unmeasured: "Отдельно не оценивается",
    signIn: "Повторение слов появится после входа в аккаунт.", signInLink: "Войти", covered: "с проверенными результатами", accuracy: "По последним попыткам", weakDue: n => `Из них ${n} трудных, которые пора повторить`, doneToday: n => `Сегодня повторено: ${n}`,
    pathway: "Мой учебный маршрут", pathwayIntro: "Урок → повторение → диалог → история. Маршрут показывает доступные действия, а не присваивает уровень CEFR.", pathwayNext: "Следующий рекомендуемый шаг", pathwayIdle: "Пока нет обязательных задач. Можно открыть разделы ниже.",
    pathwayArea: { lesson: "Уроки", reviews: "Повторение слов", mission: "Жизненные миссии", story: "Истории" },
    pathwayStatus: { ready: "Можно продолжать", "caught-up": "Пока выполнено", "not-started": "Нет данных", locked: "Пока недоступно" },
  },
  en: {
    heading: "My plan for today", intro: "Next steps based on your lessons and reviews. Your plan updates as you make progress.",
    loading: "Building your plan…", minutes: "min", today: "Today", reviews: "Review your words", reviewsNote: n => `${n} words are due`,
    weak: "Revisit a difficult lesson", weakNote: "Practise the lesson you found challenging", lesson: "Keep learning", lessonNote: "Your next available lesson",
    mission: "Real-life mission", missionNote: "Use your words in a realistic conversation", story: "Interactive story", storyNote: "Read in your chosen language and choose what happens next", action: "Open →", noTasks: "You're caught up for now. You can revisit lessons or practise vocabulary.",
    profile: "My learning profile", profileDesc: "These are exercise statistics, not a certified CEFR level. Only measured activities are shown.",
    doneLessons: "Lessons completed", mastery: "Lessons reinforced", vocabulary: "Words in review", practiced: "Average lesson accuracy",
    missions: "Missions completed", stories: "Stories completed", listening: "Listening", speaking: "Speaking", unmeasured: "Not assessed separately",
    signIn: "Sign in to see your SRS review activity.", signInLink: "Sign in", covered: "with scored results", accuracy: "From your latest attempts", weakDue: n => `${n} difficult words are due`, doneToday: n => `Reviewed today: ${n}`,
    pathway: "My learning pathway", pathwayIntro: "Lesson → review → dialogue → story. The pathway suggests accessible activities, not a CEFR level.", pathwayNext: "Your recommended next step", pathwayIdle: "No tasks are due right now. Explore the sections below.",
    pathwayArea: { lesson: "Lessons", reviews: "Word review", mission: "Real-life missions", story: "Stories" },
    pathwayStatus: { ready: "Ready", "caught-up": "Caught up for now", "not-started": "No data yet", locked: "Not available yet" },
  },
};

function taskName(task: StudyTask, t: Labels): string {
  return task.key === "reviews" ? t.reviews : task.key === "weak" ? t.weak : task.key === "lesson" ? t.lesson : task.key === "mission" ? t.mission : t.story;
}
function taskDescription(task: StudyTask, t: Labels): string {
  return task.key === "reviews" ? t.reviewsNote(task.count ?? 0) : task.key === "weak" ? t.weakNote : task.key === "lesson" ? t.lessonNote : task.key === "mission" ? t.missionNote : t.storyNote;
}

export default function DailyLearningPlan({
  lessons, lessonIds, hasPremium,
}: {
  lessons: LessonsProgress;
  lessonIds: string[];
  hasPremium: boolean;
}) {
  const { lang } = useLanguage();
  const t = I18N[lang === "ru" ? "ru" : lang === "en" ? "en" : "ua"];
  const { courseId } = useActiveCourse();
  const { status, data: session } = useSession();
  const userId = String(session?.user?.id ?? "");
  const [srs, setSrs] = useState<SrsSnapshot | null>(null);
  const [missions, setMissions] = useState<MissionProgress>({});
  const [stories, setStories] = useState<StoryProgress>({});
  const [ready, setReady] = useState(false);

  const refreshSrs = useCallback(() => {
    if (status === "loading") return;
    if (status !== "authenticated" || !userId) {
      setSrs(null);
      setReady(true);
      return;
    }
    try {
      const db = loadDb(userId, courseId);
      const states = Object.values(db).filter((v): v is SrsState => Boolean(v && typeof v.dueAt === "number"));
      const stats = computeStats(db, states.length);
      const now = Date.now();
      const weakDue = states.filter(state => state.dueAt <= now && isWeakState(state)).length;
      const reviewedToday = getDailyGoalState(userId, courseId).reviewed;
      setSrs({ tracked: states.length, learned: stats.learned, mastered: stats.mastered, due: stats.due, weakDue, reviewedToday });
    } catch {
      setSrs(null);
    }
    setReady(true);
  }, [status, userId, courseId]);

  useEffect(() => {
    setReady(false);
    refreshSrs();
    const refresh = () => refreshSrs();
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("slovakStudy:srsChanged", refresh);
    window.addEventListener("slovakStudy:syncState", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("slovakStudy:srsChanged", refresh);
      window.removeEventListener("slovakStudy:syncState", refresh);
    };
  }, [refreshSrs]);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") { setMissions(readGuestProgress(courseId)); return; }
    let live = true;
    setMissions({});
    fetch(`/api/learning/missions?course=${courseId}`, { cache: "no-store" })
      .then(async response => response.ok ? (await response.json()).progress as MissionProgress : {})
      .then(progress => { if (live) setMissions(progress || {}); })
      .catch(() => { if (live) setMissions({}); });
    return () => { live = false; };
  }, [status, userId, courseId]);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") { setStories(readGuestStoryProgress(courseId)); return; }
    let live = true;
    setStories({});
    fetch(`/api/learning/stories?course=${courseId}`, { cache: "no-store" })
      .then(async response => response.ok ? (await response.json()).progress as StoryProgress : {})
      .then(value => { if (live) setStories(value || {}); })
      .catch(() => { if (live) setStories({}); });
    return () => { live = false; };
  }, [courseId, status, userId]);

  const planInput = useMemo(() => ({
    course: courseId,
    lessonIds,
    lessons: lessons as Record<string, LessonRecord>,
    missions,
    stories,
    srs,
    hasPremium,
  }), [courseId, lessonIds, lessons, missions, stories, srs, hasPremium]);
  const summary = useMemo(() => buildPersonalPlan(planInput), [planInput]);
  const journey = useMemo(() => buildLearningJourney(planInput), [planInput]);

  return (
    <div className="space-y-3">
      <section aria-labelledby="daily-learning-heading" className={styles.feature}>
        <div className={styles.featureMain}>
          <Image src="/learning/hub/next.svg" alt="" width={112} height={112} unoptimized className={styles.featureArt} aria-hidden="true" />
          <div className={styles.featureContent}>
            <p className={styles.featureKicker}>{t.today} · FLUNIO</p>
            <h2 id="daily-learning-heading" className={`${styles.featureTitle} theme-text`}>{t.pathwayNext}</h2>
            {ready ? (
              <p className={`${styles.featureDesc} theme-text-muted`}>
                {journey.focus ? (
                  <>{taskName(journey.focus, t)}{journey.focus.detail && journey.focus.key !== "mission" && journey.focus.key !== "story" ? ` · ${journey.focus.detail}` : ""} · ≈ {journey.focus.minutes} {t.minutes}</>
                ) : t.pathwayIdle}
              </p>
            ) : <p className={`${styles.featureDesc} theme-text-muted`} role="status">{t.loading}</p>}
          </div>
          {ready && journey.focus && (
            <Link href={journey.focus.href} className={`${styles.featureButton} theme-primary-button`}>{t.action}</Link>
          )}
        </div>
        {(ready && summary.tasks.length > 1 || status === "unauthenticated") && (
          <div className={styles.featureFooter}>
            {ready && summary.tasks.length > 1 && (
              <details className="border-t border-current/10 pt-3">
                <summary className={`${styles.featureMore} theme-text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}>
                  {t.heading} · {summary.tasks.length}
                </summary>
                <div className="mt-2 space-y-1">
                  {summary.tasks.slice(1).map(task => (
                    <Link key={task.key} href={task.href} className={styles.featureLink}>
                      <span className="min-w-0 text-sm theme-text">{taskName(task, t)}</span>
                      <span className="shrink-0 text-xs theme-text-muted">≈ {task.minutes} {t.minutes} →</span>
                    </Link>
                  ))}
                </div>
              </details>
            )}
            {status === "unauthenticated" && (
              <p className="mt-2 text-xs theme-text-subtle">{t.signIn} <Link className="font-semibold theme-accent-text underline" href="/login">{t.signInLink}</Link></p>
            )}
          </div>
        )}
      </section>

      <details id="learning-journey" className="theme-inner-card group scroll-mt-24 rounded-2xl">
        <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-5 [&::-webkit-details-marker]:hidden">
          <span className="theme-pill flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
            <LearningHubIcon name="progress" className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold theme-text">{t.profile}</span>
            <span className="mt-0.5 block text-xs leading-5 theme-text-muted">{t.doneLessons}: {summary.completed} · {t.missions}: {summary.missionsCompleted} · {t.stories}: {summary.storiesCompleted}</span>
          </span>
          <LearningHubIcon name="chevron" className="h-4 w-4 shrink-0 theme-text-subtle transition-transform group-open:rotate-90" />
        </summary>
        <div className="mx-4 border-t border-current/10 pb-4 pt-3 sm:mx-5">
          <p className="text-xs leading-5 theme-text-muted">{t.profileDesc}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            <Metric title={t.doneLessons} value={`${summary.completed}/${lessonIds.length}`} />
            <Metric title={t.mastery} value={`${summary.mastered}`} note={`${summary.measurable} ${t.covered}`} />
            <Metric title={t.vocabulary} value={srs ? `${srs.tracked}` : "—"} note={srs ? `${srs.learned} / ${srs.mastered} ✓` : t.unmeasured} />
            <Metric title={t.practiced} value={summary.lastLessonAccuracy === null ? "—" : `${summary.lastLessonAccuracy}%`} note={t.accuracy} />
            <Metric title={t.missions} value={`${summary.missionsCompleted}/3`} />
            <Metric title={t.stories} value={`${summary.storiesCompleted}/3`} />
          </div>
          <h3 className="mt-4 text-sm font-semibold theme-text">{t.pathway}</h3>
          <div className="mt-2 divide-y divide-current/10">
            {journey.steps.map(step => (
              <div key={step.area} className="flex min-h-10 items-center justify-between gap-3 py-2 text-xs">
                <span className="font-medium theme-text">{t.pathwayArea[step.area]}</span>
                <span className="theme-text-muted">{t.pathwayStatus[step.status]}{step.total !== null && step.area !== "reviews" ? ` · ${step.completed ?? 0}/${step.total}` : ""}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs theme-text-subtle">{t.listening}, {t.speaking}: {t.unmeasured}</p>
        </div>
      </details>
    </div>
  );
}

function Metric({ title, value, note }: { title: string; value: string; note?: string }) {
  return (
    <div className="rounded-xl border border-current/10 p-3">
      <p className="text-xs leading-5 theme-text-muted">{title}</p>
      <p className="mt-1 text-lg font-bold tabular-nums theme-text">{value}</p>
      {note ? <p className="mt-0.5 text-xs theme-text-subtle">{note}</p> : null}
    </div>
  );
}
