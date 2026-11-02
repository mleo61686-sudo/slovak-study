"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/lib/src/useLanguage";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import { gradeMission, objectiveSteps, type Mission, type UiLang } from "./data";
import { saveGuestResult } from "./progress";
import { playPracticeAudio, stopPracticeAudio, SPEECH_LOCALE } from "../audio/practiceAudio";

const I18N = {
  ua: { speakButton: "🎙️ Відповісти голосом", micStop: "⏹ Зупинити", micHelp: "Браузер може передавати звук для розпізнавання. Перевір отриманий текст перед продовженням.", micUnavailable: "Розпізнавання словацької недоступне. Можеш написати відповідь.", reviewTitle: "Фрази для повторення", back: "← Усі місії", mission: "Місія", missionGoal: "Твоя мета", begin: "Розпочати розмову", step: "Крок", of: "із", listen: "🔊 Озвучити словацькою", noAudio: "Словацький голос недоступний у цьому браузері. Можеш прочитати фразу.", translate: "Показати переклад", hide: "Сховати переклад", next: "Продовжити →", you: "Твоя відповідь", check: "Перевірити", correct: "Чудово!", mistaken: "Спробуємо запам'ятати правильний варіант.", answer: "Приклад правильної відповіді", follow: "Співрозмовник відповідає", remove: "Прибрати останнє слово", yourTurn: "Спробуй сказати або написати відповідь самостійно", placeholder: "Напиши словацькою (можна без підказки)…", reveal: "Показати приклад", selfYes: "Мені вдалося", selfNo: "Потрібно потренуватися", selfNote: "Тут немає автоматичної оцінки вільної відповіді — порівняй зміст зі зразком самостійно.", done: "Місію завершено!", score: "Результат перевірюваних вправ", mastery: "Матеріал добре закріплено", review: "Радимо повторити складні фрази", note: "Вільні відповіді не входять у відсоток. Цей результат не дорівнює рівню розмовної мови.", retry: "Пройти ще раз", backTo: "Усі місії", pathway: "Продовжити навчальний маршрут →", saving: "Зберігаємо результат…", saved: "Результат збережено", retrySave: "Повторити збереження", offline: "Не вдалося синхронізувати результат із профілем. Спробуй ще раз зберегти результат після відновлення з’єднання.", change: "Цю місію можна проходити лише у словацькому курсі.", noSkip: "Обери відповідь або склади речення.", tip: "Підказка" },
  ru: { speakButton: "🎙️ Ответить голосом", micStop: "⏹ Остановить", micHelp: "Браузер может передавать звук для распознавания. Проверь полученный текст перед продолжением.", micUnavailable: "Распознавание словацкой речи недоступно. Можешь написать ответ.", reviewTitle: "Фразы для повторения", back: "← Все миссии", mission: "Миссия", missionGoal: "Твоя цель", begin: "Начать разговор", step: "Шаг", of: "из", listen: "🔊 Озвучить по-словацки", noAudio: "Словацкий голос недоступен в этом браузере. Можешь прочитать фразу.", translate: "Показать перевод", hide: "Скрыть перевод", next: "Продолжить →", you: "Твой ответ", check: "Проверить", correct: "Отлично!", mistaken: "Запомним правильный вариант.", answer: "Пример правильного ответа", follow: "Собеседник отвечает", remove: "Убрать последнее слово", yourTurn: "Попробуй сказать или написать ответ самостоятельно", placeholder: "Напиши по-словацки (без подсказки)…", reveal: "Показать пример", selfYes: "У меня получилось", selfNo: "Нужно потренироваться", selfNote: "Здесь нет автоматической оценки свободного ответа — самостоятельно сравни смысл с образцом.", done: "Миссия завершена!", score: "Результат проверяемых упражнений", mastery: "Материал хорошо закреплён", review: "Советуем повторить сложные фразы", note: "Свободные ответы не учитываются в процентах. Результат не равен уровню разговорной речи.", retry: "Пройти ещё раз", backTo: "Все миссии", pathway: "Продолжить учебный маршрут →", saving: "Сохраняем результат…", saved: "Результат сохранён", retrySave: "Повторить сохранение", offline: "Не удалось синхронизировать результат с профилем. Попробуй сохранить результат ещё раз после восстановления связи.", change: "Эта миссия доступна только в словацком курсе.", noSkip: "Выбери ответ или собери предложение.", tip: "Подсказка" },
  en: { speakButton: "🎙️ Reply by voice", micStop: "⏹ Stop", micHelp: "Your browser may send audio to its speech recognition provider. Check the transcribed text before continuing.", micUnavailable: "Slovak speech recognition is unavailable. You can type your response.", reviewTitle: "Phrases to review", back: "← All missions", mission: "Mission", missionGoal: "Your goal", begin: "Start the conversation", step: "Step", of: "of", listen: "🔊 Play Slovak", noAudio: "A Slovak voice isn't available in this browser. You can read the phrase instead.", translate: "Show translation", hide: "Hide translation", next: "Continue →", you: "Your response", check: "Check", correct: "Great!", mistaken: "Let's remember the correct option.", answer: "Example answer", follow: "Your conversation partner responds", remove: "Remove last word", yourTurn: "Try saying or writing the reply yourself", placeholder: "Write in Slovak (without looking at the hint)…", reveal: "Show an example", selfYes: "I could say it", selfNo: "I need more practice", selfNote: "Open replies aren't automatically graded — compare their meaning to the example yourself.", done: "Mission completed!", score: "Objective exercise score", mastery: "Well reinforced", review: "Review the difficult phrases", note: "Open answers don't count towards this percentage. The score does not measure spoken proficiency.", retry: "Try again", backTo: "All missions", pathway: "Continue my learning pathway →", saving: "Saving result…", saved: "Result saved", retrySave: "Retry saving", offline: "Could not sync your result to your account. Try saving the result again after reconnecting.", change: "This mission is only available in the Slovak course.", noSkip: "Choose a reply or arrange the sentence.", tip: "Hint" },
} as const;

type RecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
};
type RecognitionCtor = new () => RecognitionLike;

export default function MissionRunner({ mission }: { mission: Mission }) {
  const { lang } = useLanguage();
  const l: UiLang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const textByCourse = { sk: { ua: "словацькою", ru: "по-словацки", en: "Slovak" }, cs: { ua: "чеською", ru: "по-чешски", en: "Czech" }, pl: { ua: "польською", ru: "по-польски", en: "Polish" } } as const;
  const t = { ...I18N[l],
    micUnavailable: l === "ua" ? "Розпізнавання голосу недоступне для цієї мови. Можеш написати відповідь." : l === "ru" ? "Распознавание речи для этого языка недоступно. Можно написать ответ." : "Speech recognition is unavailable for this language. You can type your reply.",
    noAudio: l === "ua" ? "Голос для цієї мови недоступний у браузері. Можеш прочитати текст." : l === "ru" ? "Голос для этого языка недоступен в браузере. Можно прочитать текст." : "No browser voice for this language. You can read the text.",
    change: l === "ua" ? "Перемкнися на відповідний курс, щоб пройти цю місію." : l === "ru" ? "Выбери соответствующий курс для этой миссии." : "Switch to the matching language course for this mission.", listen: `🔊 ${l === "en" ? "Play" : l === "ru" ? "Озвучить" : "Озвучити"} ${textByCourse[mission.course][l]}`, placeholder: `${l === "ua" ? "Напиши" : l === "ru" ? "Напиши" : "Write in"} ${textByCourse[mission.course][l]}…` };
  const { courseId } = useActiveCourse();
  const { status, data: session } = useSession();
  const speak = (text: string, setError: (value: boolean) => void, audioSrc?: string, speaker = "") => {
    void playPracticeAudio(mission.course, text, audioSrc, speaker).then(ok => setError(!ok));
  };
  const draftUser = status === "authenticated" ? (session?.user?.id || "authenticated") : "guest";
  const draftKey = `flunio:mission:draft:v2:${draftUser}:${mission.slug}`;
  const [stage, setStage] = useState<"intro" | "playing" | "finished">("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [arrangement, setArrangement] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [translationOpen, setTranslationOpen] = useState(false);
  const [written, setWritten] = useState("");
  const [reveal, setReveal] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "failed">("idle");
  const [hydratedKey, setHydratedKey] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState(false);
  const recognitionRef = useRef<RecognitionLike | null>(null);
  const result = useMemo(() => gradeMission(mission, answers), [mission, answers]);
  const step = mission.steps[index];
  const percent = Math.round(((index + 1) / mission.steps.length) * 100);

  // An in-progress attempt belongs to a single signed-in user (or guest).
  // Do not read/write the guest draft while authentication is still loading.
  useEffect(() => {
    if (status === "loading") return;
    setHydratedKey(null);
    setStage("intro");
    setIndex(0);
    setAnswers({});
    setSelected(null);
    setArrangement([]);
    setChecked(false);
    setWritten("");
    setReveal(false);
    setSaveStatus("idle");
    try {
      const raw = window.sessionStorage.getItem(draftKey);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && d.version === 2 && d.stage === "playing" && Number.isInteger(d.index) && d.index >= 0 && d.index < mission.steps.length) {
          setStage("playing");
          setIndex(d.index);
          if (d.answers && typeof d.answers === "object" && !Array.isArray(d.answers)) setAnswers(d.answers);
          setSelected(typeof d.selected === "string" ? d.selected : null);
          setChecked(d.checked === true);
          setArrangement(Array.isArray(d.arrangement) ? d.arrangement.filter((x: unknown) => Number.isInteger(x)) : []);
          setWritten(typeof d.written === "string" ? d.written : "");
          setReveal(d.reveal === true);
        }
      }
    } catch { /* Session storage is optional. */ }
    setHydratedKey(draftKey);
  }, [draftKey, mission.steps.length, status]);

  useEffect(() => {
    if (hydratedKey !== draftKey || status === "loading") return;
    try {
      if (stage === "finished" || stage === "intro") window.sessionStorage.removeItem(draftKey);
      else window.sessionStorage.setItem(draftKey, JSON.stringify({ version: 2, stage, index, answers, selected, arrangement, checked, written, reveal }));
    } catch { /* Session storage is optional. */ }
  }, [hydratedKey, draftKey, status, stage, index, answers, selected, arrangement, checked, written, reveal]);

  useEffect(() => () => {
    recognitionRef.current?.stop();
    stopPracticeAudio();
  }, []);

  const toggleMicrophone = () => {
    if (listening) { recognitionRef.current?.stop(); return; }
    const speechWindow = window as Window & { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
    const Ctor = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!Ctor) { setMicError(true); return; }
    try {
      const recognition = new Ctor();
      recognition.lang = SPEECH_LOCALE[mission.course];
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) setWritten((old) => old ? `${old.trim()} ${transcript}` : transcript);
      };
      recognition.onerror = () => { setMicError(true); setListening(false); };
      recognition.onend = () => { setListening(false); recognitionRef.current = null; };
      recognitionRef.current = recognition;
      setMicError(false);
      recognition.start();
      setListening(true);
    } catch { setMicError(true); setListening(false); recognitionRef.current = null; }
  };

  const resetForNext = () => {
    recognitionRef.current?.stop();
    setListening(false);
    setMicError(false);
    stopPracticeAudio();
    setSelected(null);
    setArrangement([]);
    setChecked(false);
    setTranslationOpen(false);
    setWritten("");
    setReveal(false);
    setAudioError(false);
  };

  const saveResult = async (nextAnswers: Record<string, string>) => {
    setSaveStatus("saving");
    const score = gradeMission(mission, nextAnswers);
    if (status === "unauthenticated") {
      try { saveGuestResult(mission, score.percent); setSaveStatus("saved"); }
      catch { setSaveStatus("failed"); }
      return;
    }
    if (status !== "authenticated") { setSaveStatus("failed"); return; }
    try {
      const response = await fetch("/api/learning/missions", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: mission.slug, answers: nextAnswers }),
      });
      if (!response.ok) throw new Error("Could not save mission progress");
      setSaveStatus("saved");
    } catch { setSaveStatus("failed"); }
  };

  const advance = () => {
    resetForNext();
    if (index + 1 < mission.steps.length) { setIndex(index + 1); return; }
    setStage("finished");
    void saveResult(answers);
  };

  const confirmObjective = () => {
    if (checked || !step) return;
    if (step.kind === "choice" && selected) {
      setAnswers((old) => ({ ...old, [step.id]: selected }));
      setChecked(true);
    } else if (step.kind === "arrange" && arrangement.length === step.tokens.length) {
      const value = arrangement.map((i) => step.tokens[i]).join(" ");
      setAnswers((old) => ({ ...old, [step.id]: value }));
      setChecked(true);
    }
  };

  const restart = () => {
    resetForNext(); setStage("intro"); setIndex(0); setAnswers({}); setSaveStatus("idle");
  };

  if (courseId !== mission.course) return <main className="mx-auto max-w-3xl px-4 py-10"><div className="flunio-card rounded-3xl p-6 theme-text">{t.change} <Link href="/learning/missions" className="theme-accent-text underline">{t.back}</Link></div></main>;

  return <main className="relative mx-auto max-w-3xl px-4 py-8 theme-text">
    <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 blur-3xl" />
    <Link href="/learning/missions" className="text-sm theme-accent-text hover:underline">{t.back}</Link>
    {stage === "intro" ? (
      <div className="flunio-card mt-5 rounded-3xl p-6 sm:p-8">
        <span className="theme-pill inline-block rounded-full px-3 py-1 text-xs font-semibold">{mission.level} · {mission.duration} min</span>
        <div className="mt-6 text-5xl" aria-hidden="true">{mission.icon}</div>
        <h1 className="mt-4 text-3xl font-bold theme-text">{mission.title[l]}</h1>
        <p className="mt-3 text-base theme-text-muted">{mission.summary[l]}</p>
        <div className="theme-inner-card mt-6 rounded-2xl p-5"><h2 className="font-semibold theme-text">🎯 {t.missionGoal}</h2><p className="mt-2 text-sm leading-6 theme-text-muted">{mission.goal[l]}</p></div>
        <button type="button" onClick={() => setStage("playing")} className="theme-primary-button mt-6 w-full rounded-2xl px-5 py-4 font-semibold">{t.begin} →</button>
      </div>
    ) : stage === "finished" ? (
      <div className="flunio-card mt-5 rounded-3xl p-6 text-center sm:p-8">
        <div className="text-5xl" aria-hidden="true">🎉</div>
        <h1 className="mt-4 text-2xl font-black theme-text">{t.done}</h1>
        <p className="mt-2 theme-text-muted">{mission.title[l]}</p>
        <p className="mt-6 text-5xl font-black theme-accent-text">{result.percent}%</p>
        <p className="mt-2 text-sm theme-text-muted">{t.score}: {result.correct}/{result.total}</p>
        <div className="theme-inner-card mt-5 rounded-2xl p-4 text-sm theme-text">{result.percent >= 80 ? `✅ ${t.mastery}` : `🔁 ${t.review}`}</div>
        <p className="mt-4 text-xs leading-5 theme-text-subtle">{t.note}</p>
        {objectiveSteps(mission).filter((question) => {
          if (question.kind === "choice") return answers[question.id] !== question.correctId;
          return answers[question.id] !== question.solution.join(" ");
        }).length > 0 ? (
          <div className="theme-inner-card mt-5 rounded-2xl p-4 text-left">
            <h2 className="font-semibold theme-text">🔁 {t.reviewTitle}</h2>
            <ul className="mt-3 space-y-2 text-sm theme-text-muted">
              {objectiveSteps(mission).filter((question) => {
                if (question.kind === "choice") return answers[question.id] !== question.correctId;
                return answers[question.id] !== question.solution.join(" ");
              }).map((question) => <li key={question.id}>• {question.kind === "choice" ? question.choices.find((c) => c.id === question.correctId)?.sk : question.solution.join(" ")}</li>)}
            </ul>
          </div>
        ) : null}
        {saveStatus === "saving" ? <p className="mt-4 text-xs theme-text-muted">{t.saving}</p> : null}
        {saveStatus === "saved" ? <p className="mt-4 text-xs theme-text-muted">✓ {t.saved}</p> : null}
        {saveStatus === "failed" ? <div role="alert" className="mt-4 space-y-2">
          <p className="text-xs theme-text-muted">{t.offline}</p>
          <button type="button" onClick={() => void saveResult(answers)} className="theme-secondary-button rounded-xl px-4 py-2 text-sm font-semibold">{t.retrySave}</button>
        </div> : null}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={restart} className="theme-primary-button rounded-xl px-5 py-3 text-sm font-semibold">{t.retry}</button>
          <Link href="/learning/missions" className="theme-secondary-button rounded-xl px-5 py-3 text-sm font-semibold">{t.backTo}</Link>
          {saveStatus !== "saving" && <Link href="/learning#learning-journey" className="theme-secondary-button rounded-xl px-5 py-3 text-sm font-semibold">{t.pathway}</Link>}
        </div>
      </div>
    ) : step ? (
      <section className="flunio-card mt-5 rounded-3xl p-5 sm:p-8" aria-labelledby="mission-step-title">
        <div className="flex items-center justify-between text-xs theme-text-subtle"><span>{t.mission}: {mission.title[l]}</span><span>{t.step} {index + 1} {t.of} {mission.steps.length}</span></div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-current/10" role="progressbar" aria-label={`${t.step} ${index + 1}`} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-cyan-500 transition-all" style={{ width: `${percent}%` }} /></div>
        {step.kind === "dialogue" ? (
          <div className="mt-7">
            <p className="text-sm font-semibold theme-accent-text">{step.speaker}</p>
            <h2 id="mission-step-title" className="mt-3 text-2xl font-bold leading-normal theme-text">{step.sk}</h2>
            <button type="button" className="theme-secondary-button mt-5 rounded-xl px-4 py-2 text-sm font-semibold" onClick={() => speak(step.sk, setAudioError, step.audioSrc, step.speaker)}>{t.listen}</button>
            {audioError ? <p role="status" className="mt-2 text-xs theme-text-muted">{t.noAudio}</p> : null}
            <button type="button" className="ml-2 mt-3 rounded-xl px-3 py-2 text-sm theme-accent-text underline" onClick={() => setTranslationOpen((x) => !x)}>{translationOpen ? t.hide : t.translate}</button>
            {translationOpen ? <p className="theme-inner-card mt-4 rounded-xl p-4 text-sm theme-text-muted">{step.translation[l]}</p> : null}
            {step.tip ? <p className="mt-5 text-sm theme-text-muted">💡 {step.tip[l]}</p> : null}
            <button type="button" className="theme-primary-button mt-7 w-full rounded-2xl px-5 py-3 font-semibold" onClick={advance}>{t.next}</button>
          </div>
        ) : step.kind === "choice" ? (
          <div className="mt-7">
            <p className="text-sm font-semibold theme-accent-text">{step.speaker}</p>
            <h2 id="mission-step-title" className="mt-2 text-xl font-bold leading-normal theme-text">“{step.sk}”</h2>
            <p className="mt-5 text-sm theme-text-muted">{step.prompt[l]}</p>
            <p className="mt-4 text-xs font-semibold theme-text-subtle">{t.you}</p>
            <div className="mt-3 space-y-2">
              {step.choices.map((c) => <button key={c.id} type="button" disabled={checked} onClick={() => setSelected(c.id)} className={`theme-inner-card block min-h-14 w-full rounded-xl border p-4 text-left text-sm font-medium transition ${selected === c.id ? "border-cyan-500 ring-2 ring-cyan-500/25" : ""} ${checked && c.id === step.correctId ? "border-emerald-500" : ""} disabled:cursor-default`} aria-pressed={selected === c.id}>{c.sk}</button>)}
            </div>
            {checked ? <div className="theme-inner-card mt-5 rounded-xl p-4" role="status"><strong className="theme-text">{selected === step.correctId ? t.correct : t.mistaken}</strong><p className="mt-2 text-sm theme-text-muted">{step.explanation[l]}</p><p className="mt-3 text-sm theme-text">✓ {step.choices.find((c) => c.id === step.correctId)?.sk}</p><p className="mt-3 text-xs theme-text-subtle">{t.follow}:</p><p className="mt-1 font-semibold theme-text">{step.nextLine}</p><button type="button" onClick={() => speak(step.nextLine, setAudioError, step.nextAudioSrc, step.speaker)} className="mt-2 text-sm theme-accent-text underline">{t.listen}</button>{audioError ? <p className="mt-1 text-xs theme-text-muted">{t.noAudio}</p> : null}</div> : null}
            <button type="button" disabled={!checked && !selected} className="theme-primary-button mt-6 w-full rounded-2xl px-5 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-50" onClick={checked ? advance : confirmObjective}>{checked ? t.next : t.check}</button>
          </div>
        ) : step.kind === "arrange" ? (
          <div className="mt-7">
            <h2 id="mission-step-title" className="text-xl font-bold theme-text">{step.prompt[l]}</h2>
            <p className="mt-3 text-sm theme-text-muted">{t.you}</p>
            <div className="theme-inner-card mt-4 flex min-h-20 flex-wrap gap-2 rounded-2xl p-4">
              {arrangement.map((i, at) => <button type="button" key={at} disabled={checked} onClick={() => setArrangement((prev) => prev.filter((_, pos) => pos !== at))} className="theme-pill rounded-xl px-3 py-2 text-sm font-semibold">{step.tokens[i]}</button>)}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {step.tokens.map((word, i) => arrangement.includes(i) ? null : <button type="button" key={i} disabled={checked} className="theme-secondary-button rounded-xl px-3 py-2 text-sm" onClick={() => setArrangement((old) => [...old, i])}>{word}</button>)}
            </div>
            {arrangement.length > 0 && !checked ? <button type="button" className="mt-3 text-xs theme-accent-text underline" onClick={() => setArrangement((old) => old.slice(0, -1))}>{t.remove}</button> : null}
            {checked ? <div className="theme-inner-card mt-5 rounded-xl p-4" role="status"><p className="font-semibold theme-text">{arrangement.map((i) => step.tokens[i]).join(" ") === step.solution.join(" ") ? t.correct : t.mistaken}</p><p className="mt-2 font-medium theme-text">{step.solution.join(" ")}</p><p className="mt-2 text-sm theme-text-muted">{step.meaning[l]}</p></div> : null}
            <button type="button" disabled={!checked && arrangement.length !== step.tokens.length} className="theme-primary-button mt-6 w-full rounded-2xl px-5 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-50" onClick={checked ? advance : confirmObjective}>{checked ? t.next : t.check}</button>
          </div>
        ) : (
          <div className="mt-7">
            <h2 id="mission-step-title" className="text-xl font-bold theme-text">{step.prompt[l]}</h2>
            <p className="mt-3 text-sm theme-text-muted">{t.yourTurn}</p>
            <textarea aria-label={t.you} value={written} onChange={(e) => setWritten(e.target.value)} rows={3} placeholder={t.placeholder} className="theme-inner-card mt-5 w-full rounded-2xl border p-4 text-base theme-text outline-none focus:border-cyan-500" />
            <button type="button" className="theme-secondary-button mt-3 rounded-xl px-4 py-3 text-sm font-semibold" onClick={toggleMicrophone}>{listening ? t.micStop : t.speakButton}</button>
            <p className="mt-2 text-xs theme-text-subtle">{t.micHelp}</p>
            {micError ? <p role="status" className="mt-2 text-xs theme-text-muted">{t.micUnavailable}</p> : null}
            {!reveal ? <><p className="mt-3 text-xs theme-text-subtle">💡 {t.tip}: {step.hint[l]}</p><button type="button" disabled={!written.trim()} onClick={() => setReveal(true)} className="theme-primary-button mt-6 w-full rounded-2xl px-5 py-3 font-semibold disabled:opacity-50">{t.reveal}</button></> : <div className="theme-inner-card mt-5 rounded-xl p-4"><p className="text-xs theme-text-muted">{t.answer}</p><p className="mt-2 font-semibold theme-text">{step.sample}</p><p className="mt-2 text-sm theme-text-muted">{step.translation[l]}</p><p className="mt-3 text-xs theme-text-subtle">{t.selfNote}</p><div className="mt-4 grid gap-2 sm:grid-cols-2"><button type="button" className="theme-primary-button rounded-xl px-4 py-3 text-sm font-semibold" onClick={advance}>✓ {t.selfYes}</button><button type="button" className="theme-secondary-button rounded-xl px-4 py-3 text-sm font-semibold" onClick={() => { setWritten(""); setReveal(false); }}>↺ {t.selfNo}</button></div></div>}
          </div>
        )}
      </section>
    ) : null}
  </main>;
}
