"use client";

import Link from "next/link";
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
    <div className="mt-6 space-y-5">
      <section id="learning-journey" aria-labelledby="learning-journey-heading" className="flunio-card scroll-mt-24 rounded-3xl p-6">
        <h2 id="learning-journey-heading" className="text-xl font-bold theme-text">{t.pathway}</h2>
        <p className="mt-2 text-sm leading-6 theme-text-muted">{t.pathwayIntro}</p>
        {ready ? <>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2" aria-label={t.pathway}>
            {journey.steps.map((step, index) => {
              const content = <>
                <div className="flex items-center justify-between gap-2">
                  <span className="theme-pill inline-flex h-7 min-w-7 items-center justify-center rounded-full text-xs font-bold">{index + 1}</span>
                  <span className="text-xs theme-text-subtle">{t.pathwayStatus[step.status]}</span>
                </div>
                <h3 className="mt-3 font-semibold theme-text">{t.pathwayArea[step.area]}</h3>
                {step.total !== null && step.area !== "reviews" && <p className="mt-1 text-xs theme-text-muted">{step.completed ?? 0} / {step.total}</p>}
                {step.area === "reviews" && step.total !== null && <p className="mt-1 text-xs theme-text-muted">{t.reviewsNote(step.total)}</p>}
                {step.detail && <p className="mt-1 text-xs theme-text-subtle">{step.detail}</p>}
              </>;
              return <li key={step.area} className="list-none">
                {step.href ? (
                  <Link href={step.href} className="theme-inner-card block min-h-full rounded-2xl p-4 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">{content}</Link>
                ) : <div className="theme-inner-card min-h-full rounded-2xl p-4">{content}</div>}
              </li>;
            })}
          </ol>
          {journey.focus ? <div className="theme-inner-card mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
            <div><p className="text-xs font-semibold theme-accent-text">{t.pathwayNext}</p>
              <p className="mt-1 font-semibold theme-text">{taskName(journey.focus, t)}{journey.focus.detail ? ` · ${journey.focus.detail}` : ""}</p></div>
            <Link href={journey.focus.href} className="theme-primary-button inline-flex min-h-11 items-center rounded-xl px-4 py-2 text-sm font-semibold">{t.action}</Link>
          </div> : <p className="mt-4 text-sm theme-text-muted">{t.pathwayIdle}</p>}
        </> : <p className="mt-4 text-sm theme-text-muted" role="status">{t.loading}</p>}
      </section>

      <section aria-labelledby="daily-learning-heading" className="flunio-card rounded-3xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold theme-accent-text">✦ {t.today}</p>
            <h2 id="daily-learning-heading" className="mt-1 text-xl font-bold theme-text">{t.heading}</h2>
            <p className="mt-2 text-sm leading-6 theme-text-muted">{t.intro}</p>
          </div>
          <span className="theme-pill rounded-full px-3 py-1 text-xs font-semibold">{summary.tasks.reduce((sum, task) => sum + task.minutes, 0)} {t.minutes}</span>
        </div>
        {ready ? (
          summary.tasks.length > 0 ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {summary.tasks.map((task, index) => (
                <Link key={task.key} href={task.href} className="theme-inner-card group flex flex-col rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-cyan-400/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="theme-pill inline-flex h-7 min-w-7 items-center justify-center rounded-full text-xs font-bold">{index + 1}</span>
                    <span className="text-xs theme-text-subtle">≈ {task.minutes} {t.minutes}</span>
                  </div>
                  <h3 className="mt-3 font-semibold theme-text">{taskName(task, t)}</h3>
                  <p className="mt-1 flex-1 text-xs leading-5 theme-text-muted">{taskDescription(task, t)}{task.detail && task.key !== "mission" && task.key !== "story" ? ` · ${task.detail}` : ""}</p>
                  <span className="mt-3 text-sm font-semibold theme-accent-text">{t.action}</span>
                </Link>
              ))}
            </div>
          ) : <p className="theme-inner-card mt-4 rounded-2xl p-4 text-sm theme-text-muted">{t.noTasks}</p>
        ) : <p className="mt-4 text-sm theme-text-muted" role="status">{t.loading}</p>}
        {status === "unauthenticated" && (
          <p className="mt-4 text-xs theme-text-subtle">{t.signIn} <Link className="font-semibold theme-accent-text underline" href="/login">{t.signInLink}</Link></p>
        )}
        {srs && srs.due > 0 && <p className="mt-3 text-xs theme-text-subtle">{t.weakDue(srs.weakDue)} · {t.doneToday(srs.reviewedToday)}</p>}
      </section>

      <section aria-labelledby="study-profile-heading" className="flunio-card rounded-3xl p-6">
        <h2 id="study-profile-heading" className="text-xl font-bold theme-text">{t.profile}</h2>
        <p className="mt-2 text-sm leading-6 theme-text-muted">{t.profileDesc}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Metric title={t.doneLessons} value={`${summary.completed}/${lessonIds.length}`} />
          <Metric title={t.mastery} value={`${summary.mastered}`} note={`${summary.measurable} ${t.covered}`} />
          <Metric title={t.vocabulary} value={srs ? `${srs.tracked}` : "—"} note={srs ? `${srs.learned} / ${srs.mastered} ✓` : t.unmeasured} />
          <Metric title={t.practiced} value={summary.lastLessonAccuracy === null ? "—" : `${summary.lastLessonAccuracy}%`} note={t.accuracy} />
          <Metric title={t.missions} value={`${summary.missionsCompleted}/3`} note={`${summary.missionsMastered} ✓`} />
          <Metric title={t.stories} value={`${summary.storiesCompleted}/3`} note={`${summary.storiesMastered} ✓`} />
          <Metric title={t.listening} value="—" note={t.unmeasured} />
          <Metric title={t.speaking} value="—" note={t.unmeasured} />
        </div>
      </section>
    </div>
  );
}

function Metric({ title, value, note }: { title: string; value: string; note?: string }) {
  return (
    <div className="theme-inner-card rounded-2xl p-4">
      <p className="text-xs leading-5 theme-text-muted">{title}</p>
      <p className="mt-2 text-xl font-bold tabular-nums theme-text">{value}</p>
      {note ? <p className="mt-1 text-xs theme-text-subtle">{note}</p> : null}
    </div>
  );
}
