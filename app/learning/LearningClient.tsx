"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import type { CefrBand, Lang, LocalizedText } from "./data";
import type { LessonsProgress } from "@/lib/src/progress";
import { getLessonsProgress } from "@/lib/src/progress";
import { useLanguage } from "@/lib/src/useLanguage";
import DailyLearningPlan from "./personal-plan/DailyLearningPlan";
import LearningHubIcon from "./components/LearningHubIcon";
import Image from "next/image";
import styles from "./LearningHubV2.module.css";

type SessionUserLike = { email?: string | null; isPremium?: boolean };

type Labels = {
  title: string;
  subtitle: string;
  progress: string;
  chooser: string;
  chooserHelp: string;
  levels: string;
  levelsDesc: string;
  levelAction: string;
  levelLocked: string;
  levelDone: string;
  lessons: string;
  reviews: string;
  reviewsDesc: string;
  missions: string;
  missionsDesc: string;
  stories: string;
  storiesDesc: string;
  free: string;
  premium: string;
  freeNote: string;
  empty: string;
  entryLessons: string; entryReviews: string; entryMissions: string; entryStories: string;
  progressShort: string;
};

const I18N: Record<Lang, Labels> = {
  ua: {
    title: "Навчання", subtitle: "Обери формат — і переходь до практики.", progress: "Пройдено уроків",
    chooser: "Що хочеш вивчати?", chooserHelp: "Усі розділи в одному місці",
    levels: "Уроки за рівнями", levelsDesc: "Слова, фрази та граматика від A0 до B2",
    levelAction: "Відкрити уроки", levelLocked: "Доступ із Premium", levelDone: "пройдено", lessons: "уроків",
    reviews: "Повторення слів", reviewsDesc: "Закріплюй вивчене та повертай слова в пам’ять",
    missions: "Життєві місії", missionsDesc: "Практикуй розмови в реальних ситуаціях",
    stories: "Інтерактивні історії", storiesDesc: "Читай, слухай і вибирай розвиток сюжету",
    free: "Безкоштовно", premium: "Premium", freeNote: "Рівень A0 доступний безкоштовно", empty: "Уроки скоро з’являться", entryLessons: "ОСНОВА", entryReviews: "ПАМ’ЯТЬ", entryMissions: "ПРАКТИКА", entryStories: "ІСТОРІЇ", progressShort: "Уроки",
  },
  ru: {
    title: "Обучение", subtitle: "Выбери формат и переходи к практике.", progress: "Пройдено уроков",
    chooser: "Что хочешь изучать?", chooserHelp: "Все разделы в одном месте",
    levels: "Уроки по уровням", levelsDesc: "Слова, фразы и грамматика от A0 до B2",
    levelAction: "Открыть уроки", levelLocked: "Доступ с Premium", levelDone: "пройдено", lessons: "уроков",
    reviews: "Повторение слов", reviewsDesc: "Закрепляй изученное и освежай слова в памяти",
    missions: "Жизненные миссии", missionsDesc: "Тренируй общение в реальных ситуациях",
    stories: "Интерактивные истории", storiesDesc: "Читай, слушай и выбирай ход сюжета",
    free: "Бесплатно", premium: "Premium", freeNote: "Уровень A0 доступен бесплатно", empty: "Уроки скоро появятся", entryLessons: "ОСНОВА", entryReviews: "ПАМЯТЬ", entryMissions: "ПРАКТИКА", entryStories: "ИСТОРИИ", progressShort: "Уроки",
  },
  en: {
    title: "Learning", subtitle: "Choose how you want to practise.", progress: "Lessons completed",
    chooser: "What would you like to learn?", chooserHelp: "Every learning activity in one place",
    levels: "Lessons by level", levelsDesc: "Words, phrases and grammar from A0 to B2",
    levelAction: "Open lessons", levelLocked: "Premium access", levelDone: "completed", lessons: "lessons",
    reviews: "Word review", reviewsDesc: "Remember what you have learned with regular reviews",
    missions: "Real-life missions", missionsDesc: "Practise conversations in everyday situations",
    stories: "Interactive stories", storiesDesc: "Read, listen and choose what happens next",
    free: "Free", premium: "Premium", freeNote: "Level A0 is free", empty: "Lessons coming soon", entryLessons: "FOUNDATION", entryReviews: "MEMORY", entryMissions: "PRACTICE", entryStories: "STORIES", progressShort: "Lessons",
  },
};

const PROGRESS_EVENT = "slovakStudy:progressChanged";
const SYNC_EVENT = "slovakStudy:syncState";
const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
  .split(",")
  .map(value => value.trim().toLowerCase())
  .filter(Boolean);

function isDone(progress: LessonsProgress, id: string) {
  const value = progress[id.toLowerCase()] ?? progress[id];
  return value === true || (typeof value === "object" && value !== null && value.done === true);
}

function localize(value: LocalizedText, lang: Lang) {
  return value[lang] ?? value.ua ?? value.ru ?? "";
}

type HubArtwork = "review" | "missions" | "stories";

function HubRow({ artwork, tag, title, description, href }: {
  artwork: HubArtwork; tag: string; title: string; description: string; href: string;
}) {
  return (
    <Link
      href={href}
      className={`${styles.tile} ${styles[artwork]} group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
    >
      <span className={styles.art} aria-hidden="true">
        <Image src={`/learning/hub/${artwork === "review" ? "review" : artwork}.svg`} alt="" width={108} height={108} unoptimized className={styles.artImage} />
      </span>
      <span className={styles.tileText}>
        <span className={styles.tileLabel}>{tag}</span>
        <span className={`${styles.tileTitle} theme-text`}>{title}</span>
        <span className={`${styles.tileDesc} theme-text-muted`}>{description}</span>
      </span>
      <span className={`${styles.tileArrow} theme-text-subtle`} aria-hidden="true">
        <LearningHubIcon name="chevron" className="h-4 w-4" />
      </span>
    </Link>
  );
}

export default function LearningPage({ bands }: { bands: CefrBand[] }) {
  const { lang } = useLanguage() as { lang: Lang };
  const t = I18N[lang] ?? I18N.ua;
  const { data: session } = useSession();
  const user = session?.user as SessionUserLike | undefined;
  const email = (user?.email ?? "").toLowerCase();
  const canAccessPremium = user?.isPremium === true || (email !== "" && ADMIN_EMAILS.includes(email));
  const [progress, setProgress] = useState<LessonsProgress>({});

  useEffect(() => {
    const refresh = () => setProgress(getLessonsProgress());
    const onSyncState = (event: Event) => {
      if ((event as CustomEvent<{ state?: string }>).detail?.state === "idle") refresh();
    };
    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener(PROGRESS_EVENT, refresh);
    window.addEventListener(SYNC_EVENT, onSyncState);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener(PROGRESS_EVENT, refresh);
      window.removeEventListener(SYNC_EVENT, onSyncState);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  const lessonIds = useMemo(() => bands.flatMap(band => band.lessons.map(lesson => lesson.id)), [bands]);
  const doneCount = lessonIds.filter(id => isDone(progress, id)).length;

  const lessonPercent = lessonIds.length > 0 ? Math.round(doneCount * 100 / lessonIds.length) : 0;

  return (
    <main className={`${styles.hub} mx-auto max-w-5xl px-4 pb-12 pt-6 theme-text sm:px-6 sm:pt-9`}>
      <header className={`${styles.header} mb-6 sm:mb-7`}>
        <div className={styles.headerText}>
          <p className={`${styles.kicker} theme-accent-text`}>FLUNIO / LEARNING</p>
          <h1 className={`${styles.headerTitle} mt-2 text-[29px] font-bold leading-tight theme-text sm:text-4xl`}>{t.title}</h1>
          <p className="mt-1 text-sm leading-6 theme-text-muted">{t.subtitle}</p>
        </div>
        <div className={styles.progressPanel}>
          <p className={`${styles.progressLabel} theme-text-muted`}>
            <span>{t.progressShort}</span>
            <strong className="font-semibold tabular-nums theme-text">{doneCount}/{lessonIds.length}</strong>
          </p>
          <div className={styles.progressRail} role="progressbar" aria-label={t.progress} aria-valuemin={0} aria-valuemax={100} aria-valuenow={lessonPercent}>
            <div className={styles.progressFill} style={{ width: `${lessonPercent}%` }} />
          </div>
        </div>
      </header>

      <DailyLearningPlan lessons={progress} lessonIds={lessonIds} hasPremium={canAccessPremium} />

      <section aria-labelledby="learning-sections-heading" className="mt-7">
        <div className={styles.sectionHead}>
          <h2 id="learning-sections-heading" className={`${styles.sectionHeading} text-lg theme-text sm:text-xl`}>{t.chooser}</h2>
          <span className={`${styles.sectionCount} theme-text-subtle`}>01 — 04</span>
        </div>
        <div className={styles.tileGrid}>
          <details className={styles.levelDetails}>
            <summary className={`${styles.tile} ${styles.levels} ${styles.levelSummary} group`}>
              <span className={styles.art} aria-hidden="true">
                <Image src="/learning/hub/lessons.svg" alt="" width={108} height={108} unoptimized className={styles.artImage} />
              </span>
              <span className={styles.tileText}>
                <span className={styles.tileLabel}>{t.entryLessons}</span>
                <span className={`${styles.tileTitle} theme-text`}>{t.levels}</span>
                <span className={`${styles.tileDesc} theme-text-muted`}>{t.levelsDesc}</span>
              </span>
              <span className={`${styles.tileArrow} theme-text-subtle`} aria-hidden="true">
                <LearningHubIcon name="chevron" className="h-4 w-4" />
              </span>
            </summary>
            <div className={styles.levelPanel}>
              {bands.map(band => {
                const completed = band.lessons.filter(lesson => isDone(progress, lesson.id)).length;
                const locked = band.id !== "a0" && !canAccessPremium;
                const levelName = localize(band.title, lang).replace(/^(A0|A1|A2|B1|B2)\s*[—-]\s*/i, "");
                return (
                  <Link
                    key={band.id}
                    href={locked ? "/premium" : `/learning/levels/${band.id}`}
                    className={`${styles.levelRow} group/level focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                  >
                    <span className={styles.levelChip}>{band.id.toUpperCase()}</span>
                    <span className={styles.levelInfo}>
                      <span className="block text-sm font-medium theme-text">{levelName}</span>
                      <span className="block text-xs theme-text-subtle">
                        {band.lessons.length > 0 ? `${completed}/${band.lessons.length} ${t.levelDone}` : t.empty}
                      </span>
                    </span>
                    <span className={`${styles.levelAction} theme-text-muted`}>{locked ? t.premium : t.levelAction}</span>
                    <LearningHubIcon name={locked ? "lock" : "chevron"} className="h-4 w-4 shrink-0 theme-text-subtle" />
                  </Link>
                );
              })}
              <p className="px-2 pt-2 text-xs theme-text-subtle">{t.freeNote}</p>
            </div>
          </details>
          <HubRow artwork="review" tag={t.entryReviews} title={t.reviews} description={t.reviewsDesc} href="/words" />
          <HubRow artwork="missions" tag={t.entryMissions} title={t.missions} description={t.missionsDesc} href="/learning/missions" />
          <HubRow artwork="stories" tag={t.entryStories} title={t.stories} description={t.storiesDesc} href="/learning/stories" />
        </div>
      </section>
    </main>
  );
}
