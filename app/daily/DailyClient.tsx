"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import {createPracticeRounds, createReviewRounds, subjectsForRound} from "./game-rotation";
import {readWeak,markWeak,nextPracticeRun,readRecent,writeRecent,readPracticeCompletions,addPracticeCompletion,weekDates} from "./review-storage";
import { DAILY_COURSES, type DailyCourse } from "./question-bank";
import { createDailyRounds, checkOrder, normalizedWord, ROUND_COUNT, type Mode, type GameRound } from "./game-engine";
import { readGameStats, readDraft, saveDraft, finishGame, effectiveStreak, localIsoDay, type Stats, EMPTY_STATS } from "./game-progress";
import type { Level } from "./game-data";

const LOCALE: Record<DailyCourse, string> = {sk:"sk-SK",cs:"cs-CZ",pl:"pl-PL"};
const COPY = {
  sk: {
    kicker:"Jazyková aréna", daily:"Denná výzva", title:"Každý deň o úroveň vyššie.", tagline:"12 kôl, šesť typov úloh a štyri nové vety z kurzov každý deň.",
    level:"Obtiažnosť", starter:"Základy", everyday:"V praxi", advanced:"Pokročilý", starterSub:"A0–A1", everydaySub:"A2–B1", advancedSub:"B2–C1",
    play:"Spustiť výzvu", resume:"Pokračovať v hre", again:"Hrať znova", other:"Ďalšie jazyky", current:"Aktuálny kurz", change:"Zmeniť kurz", day:"Dnes",
    modes:"Čo ťa čaká", stats:"Tvoja bilancia", streak:"Séria dní", days:"Aktívne dni", best:"Najlepšia séria", rounds:"kôl", pts:"body", round:"Kolo", points:"Body",
    meaning:"Rozlúšti výraz", meaningHint:"Vyber správny význam.", order:"Poskladaj vetu", orderHint:"Ťukaj na slová v správnom poradí.",
    gap:"Doplň slovo", gapHint:"Ktoré slovo patrí do vety?", truth:"Pravda alebo lož?", truthHint:"Platí tento výklad výrazu?",
    pairs:"Nájdi dvojice", pairsHint:"Spoj výraz s jeho významom.", type:"Napíš odpoveď", typeHint:"Doplň do vety chýbajúce slovo.",
    true:"Pravda", false:"Lož", check:"Overiť", next:"Ďalšie kolo", finish:"Zobraziť výsledok", undo:"Späť", reset:"Odznova", input:"Napíš slovo…",
    yes:"Správne!", no:"Skús to nabudúce.", solution:"Správna odpoveď", example:"Príklad", hint:"Nápoveda", pairsRight:"Výborne, všetky dvojice sú spojené.", pairWrong:"Táto dvojica nesedí. Skús inú.",
    final:"Denná misia splnená", finalSub:"Dnes si dokončil všetkých 12 kôl. Zajtra ťa čaká nová zostava.", result:"Výsledok", record:"Tvoj najlepší výsledok", history:"Dnešné úrovne", done:"hotovo", notDone:"neodohraté", streakNote:"Úspešné dokončenie aspoň jednej úrovne za deň predlžuje sériu.",
    finishedToday:"Dnešná misia je splnená", nextDay:"Zajtra príde nová denná zostava.", practice:"Voľný tréning", practiceInfo:"Nová zostava pri každom spustení. Trénuj vlastným tempom.", review:"Oprav svoje chyby", reviewInfo:"Vráť sa k slovám, ktoré ti zatiaľ nešli.", emptyReview:"Zatiaľ nemáš čo opakovať.", weekly:"Tvoj týždeň", weeklyGoal:"Cieľ: 5 dní zo 7", weeklyDone:"Týždenný cieľ splnený!", trainingDone:"Tréning dokončený", reviewDone:"Opakovanie dokončené", dailyRecord:"Dnešný výsledok", keepGoing:"Ďalší tréning", goLobby:"Späť do arény", weakCount:"Na opakovanie", practiceCount:"Tréningové kolá", courseNote:"Jazyk sa riadi aktívnym kurzom v profile.", privacy:"Výsledky sa ukladajú v tomto prehliadači, nie do účtu.", introHint:"Vyber si úroveň, potom vstúp do arény.", back:"Naspäť", game:"Hra", linkLearn:"Kurzy a lekcie",
  },
  cs: {
    kicker:"Jazyková aréna", daily:"Denní výzva", title:"Každý den o úroveň výš.", tagline:"12 kol, šest typů úloh a čtyři nové věty z kurzů každý den.",
    level:"Obtížnost", starter:"Základy", everyday:"V praxi", advanced:"Pokročilý", starterSub:"A0–A1", everydaySub:"A2–B1", advancedSub:"B2–C1",
    play:"Spustit výzvu", resume:"Pokračovat ve hře", again:"Hrát znovu", other:"Další jazyky", current:"Aktuální kurz", change:"Změnit kurz", day:"Dnes",
    modes:"Co tě čeká", stats:"Tvoje bilance", streak:"Série dnů", days:"Aktivní dny", best:"Nejlepší série", rounds:"kol", pts:"body", round:"Kolo", points:"Body",
    meaning:"Rozlušti výraz", meaningHint:"Vyber správný význam.", order:"Poskládej větu", orderHint:"Klikej na slova ve správném pořadí.",
    gap:"Doplň slovo", gapHint:"Které slovo patří do věty?", truth:"Pravda, nebo lež?", truthHint:"Platí tento výklad výrazu?",
    pairs:"Najdi dvojice", pairsHint:"Spoj výraz s jeho významem.", type:"Napiš odpověď", typeHint:"Doplň do věty chybějící slovo.",
    true:"Pravda", false:"Lež", check:"Ověřit", next:"Další kolo", finish:"Zobrazit výsledek", undo:"Zpět", reset:"Znovu", input:"Napiš slovo…",
    yes:"Správně!", no:"Příště to vyjde.", solution:"Správná odpověď", example:"Příklad", hint:"Nápověda", pairsRight:"Skvěle, všechny dvojice jsou spojené.", pairWrong:"Tato dvojice nesedí. Zkus jinou.",
    final:"Denní mise splněna", finalSub:"Dnes jsi dokončil všech 12 kol. Zítra tě čeká nová sestava.", result:"Výsledek", record:"Tvůj nejlepší výsledek", history:"Dnešní úrovně", done:"hotovo", notDone:"neodehráno", streakNote:"Dokončení alespoň jedné úrovně denně prodlužuje sérii.",
    finishedToday:"Dnešní mise je splněná", nextDay:"Zítra přijde nová denní sestava.", practice:"Volný trénink", practiceInfo:"Nová sestava při každém spuštění. Trénuj vlastním tempem.", review:"Oprav své chyby", reviewInfo:"Vrať se ke slovům, která ti ještě nešla.", emptyReview:"Zatím nemáš co opakovat.", weekly:"Tvůj týden", weeklyGoal:"Cíl: 5 dní ze 7", weeklyDone:"Týdenní cíl splněn!", trainingDone:"Trénink dokončen", reviewDone:"Opakování dokončeno", dailyRecord:"Dnešní výsledek", keepGoing:"Další trénink", goLobby:"Zpět do arény", weakCount:"K opakování", practiceCount:"Tréninková kola", courseNote:"Jazyk se řídí aktivním kurzem v profilu.", privacy:"Výsledky se ukládají v tomto prohlížeči, ne do účtu.", introHint:"Vyber si úroveň a vstup do arény.", back:"Zpět", game:"Hra", linkLearn:"Kurzy a lekce",
  },
  pl: {
    kicker:"Arena językowa", daily:"Codzienne wyzwanie", title:"Każdego dnia poziom wyżej.", tagline:"12 rund, sześć typów zadań i cztery nowe zdania z kursów każdego dnia.",
    level:"Poziom trudności", starter:"Podstawy", everyday:"W praktyce", advanced:"Zaawansowany", starterSub:"A0–A1", everydaySub:"A2–B1", advancedSub:"B2–C1",
    play:"Rozpocznij wyzwanie", resume:"Wróć do gry", again:"Zagraj ponownie", other:"Inne języki", current:"Aktualny kurs", change:"Zmień kurs", day:"Dzisiaj",
    modes:"Co cię czeka", stats:"Twoje wyniki", streak:"Dni z rzędu", days:"Aktywne dni", best:"Najlepsza seria", rounds:"rund", pts:"pkt", round:"Runda", points:"Punkty",
    meaning:"Odkryj znaczenie", meaningHint:"Wybierz poprawne znaczenie.", order:"Ułóż zdanie", orderHint:"Klikaj słowa we właściwej kolejności.",
    gap:"Uzupełnij słowo", gapHint:"Które słowo pasuje do zdania?", truth:"Prawda czy fałsz?", truthHint:"Czy to wyjaśnienie jest prawdziwe?",
    pairs:"Połącz pary", pairsHint:"Dopasuj zwrot do jego znaczenia.", type:"Wpisz odpowiedź", typeHint:"Wpisz brakujące słowo w zdaniu.",
    true:"Prawda", false:"Fałsz", check:"Sprawdź", next:"Następna runda", finish:"Zobacz wynik", undo:"Cofnij", reset:"Od nowa", input:"Wpisz słowo…",
    yes:"Dobrze!", no:"Następnym razem się uda.", solution:"Poprawna odpowiedź", example:"Przykład", hint:"Podpowiedź", pairsRight:"Świetnie, wszystkie pary połączone.", pairWrong:"Ta para nie pasuje. Spróbuj innej.",
    final:"Dzisiejsza misja ukończona", finalSub:"Ukończono wszystkie 12 rund. Jutro czeka nowy zestaw.", result:"Wynik", record:"Twój najlepszy wynik", history:"Dzisiejsze poziomy", done:"gotowe", notDone:"nieukończone", streakNote:"Ukończenie co najmniej jednego poziomu dziennie przedłuża serię.",
    finishedToday:"Dzisiejsza misja ukończona", nextDay:"Jutro pojawi się nowy zestaw dnia.", practice:"Trening swobodny", practiceInfo:"Nowy zestaw przy każdym uruchomieniu. Ćwicz we własnym tempie.", review:"Powtórz błędy", reviewInfo:"Wróć do słów, które sprawiły ci trudność.", emptyReview:"Na razie nie masz nic do powtórzenia.", weekly:"Twój tydzień", weeklyGoal:"Cel: 5 dni z 7", weeklyDone:"Cel tygodniowy osiągnięty!", trainingDone:"Trening ukończony", reviewDone:"Powtórka ukończona", dailyRecord:"Dzisiejszy wynik", keepGoing:"Kolejny trening", goLobby:"Wróć do areny", weakCount:"Do powtórki", practiceCount:"Rundy treningowe", courseNote:"Język wynika z aktywnego kursu w profilu.", privacy:"Wyniki zapisują się tylko w tej przeglądarce, nie na koncie.", introHint:"Wybierz poziom i wejdź na arenę.", back:"Wstecz", game:"Gra", linkLearn:"Kursy i lekcje",
  },
} as const;
const LEVELS: Level[] = ["starter", "everyday", "advanced"];
const MODE_META: Record<Mode, {emoji: string; color: string}> = {
  meaning:{emoji:"🧩",color:"cyan"}, order:{emoji:"🧱",color:"violet"}, gap:{emoji:"🎯",color:"amber"},
  truth:{emoji:"⚖️",color:"pink"}, pairs:{emoji:"🔗",color:"emerald"}, type:{emoji:"✍️",color:"blue"},
};

export default function DailyClient() {
  const {courseId} = useActiveCourse();
  const course: DailyCourse = courseId;
  const tr = COPY[course];
  const [day, setDay] = useState("");
  const [level, setLevel] = useState<Level>("everyday");
  const [stats, setStats] = useState<Stats>({...EMPTY_STATS});
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<"intro"|"game"|"done">("intro");
  const [playMode,setPlayMode] = useState<"daily"|"practice"|"review">("daily");
  const [sessionRounds,setSessionRounds] = useState<GameRound[]>([]);
  const [weak,setWeak] = useState<string[]>([]);
  const [practiceCompleted,setPracticeCompleted] = useState(0);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [success, setSuccess] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [ordered, setOrdered] = useState<number[]>([]);
  const [typed, setTyped] = useState("");
  const [selectedPair, setSelectedPair] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [pairError, setPairError] = useState(false);

  const dailyRounds = useMemo(() => day ? createDailyRounds(course, level, day) : [], [day, course, level]);
  const rounds = playMode === "daily" ? dailyRounds : sessionRounds;
  const roundCount = rounds.length;
  const thisWeek = weekDates(day);
  const weekLabels = course === "sk" ? ["Po","Ut","St","Št","Pi","So","Ne"] : course === "cs" ? ["Po","Út","St","Čt","Pá","So","Ne"] : ["Pn","Wt","Śr","Cz","Pt","So","Nd"];
  const weekCompleted = thisWeek.filter(date => stats.results[date] && Object.keys(stats.results[date]).length > 0).length;
  const round: GameRound | undefined = rounds[step];
  const todayResult = day ? stats.results[day]?.[level] : undefined;
  const streak = day ? effectiveStreak(stats, day) : 0;
  const todayText = day ? new Intl.DateTimeFormat(LOCALE[course], {day:"numeric",month:"long",year:"numeric"}).format(new Date(`${day}T12:00:00`)) : "";

  useEffect(() => {
    setDay(localIsoDay());
    setReady(true);
    const checkDate = () => {
      const current = localIsoDay();
      setDay(previous => previous === current ? previous : current);
    };
    const timer = window.setInterval(checkDate, 60_000);
    window.addEventListener("focus",checkDate);
    document.addEventListener("visibilitychange",checkDate);
    return () => {window.clearInterval(timer); window.removeEventListener("focus",checkDate); document.removeEventListener("visibilitychange",checkDate);};
  }, []);

  useEffect(() => {
    if (!ready || !day) return;
    let savedLevel: Level = "everyday";
    try {
      const saved = window.localStorage.getItem(`flunio.daily.v2.level.${course}`);
      if (saved === "starter" || saved === "everyday" || saved === "advanced") savedLevel = saved;
    } catch { /* private browsing */ }
    setLevel(savedLevel);
    // A day or course change starts at the lobby; the in-progress round remains saved.
    setPhase("intro");
  }, [course, day, ready]);

  useEffect(() => {
    if (!ready || !day) return;
    setStats(readGameStats(course));
    setWeak(readWeak(course,level));
    setPracticeCompleted(readPracticeCompletions(course,level));
    setPlayMode("daily");setSessionRounds([]);
    const draft = readDraft(course, level, day);
    setStep(draft?.step ?? 0);
    setScore(draft?.score ?? 0);
    setMistakes(draft?.mistakes ?? 0);
    clearRound();
    setPhase("intro");
  }, [course, level, day, ready]);

  function clearRound() {
    setResolved(false); setSuccess(false); setPicked(null); setOrdered([]); setTyped("");
    setSelectedPair(null); setMatched([]); setPairError(false);
  }
  function chooseLevel(next: Level) {
    if (level === next) return;
    setLevel(next);
    try {window.localStorage.setItem(`flunio.daily.v2.level.${course}`, next);} catch { /* private browsing */ }
  }
  function resetPlay() {setStep(0);setScore(0);setMistakes(0);clearRound();}
  function startDaily() {
    if(todayResult){setPlayMode("daily");setPhase("done");return;}
    setPlayMode("daily");
    const draft=readDraft(course,level,day);
    setStep(draft?.step??0);setScore(draft?.score??0);setMistakes(draft?.mistakes??0);
    clearRound();setPhase("game");
    try{track("daily_arcade_started",{course,level,resume:!!draft});}catch{/* optional */}
  }
  function startPractice() {
    if(!day)return;
    const run=nextPracticeRun(course,level);
    const recent=readRecent(course,level);
    const todaySubjects=dailyRounds.flatMap(subjectsForRound);
    const generated=createPracticeRounds(course,level,day,run,[...recent,...todaySubjects]);
    writeRecent(course,level,generated.flatMap(subjectsForRound));
    setSessionRounds(generated);setPlayMode("practice");resetPlay();setPhase("game");
    try{track("daily_arcade_practice_started",{course,level,run});}catch{/* optional */}
  }
  function startReview() {
    if(!day)return;
    const generated=createReviewRounds(course,level,readWeak(course,level),day);
    if(!generated.length){setWeak([]);return;}
    setSessionRounds(generated);setPlayMode("review");resetPlay();setPhase("game");
    try{track("daily_arcade_review_started",{course,level,rounds:generated.length});}catch{/* optional */}
  }
  function resolve(isCorrect: boolean, option: number | null = null) {
    if (resolved) return;
    if(round) setWeak(markWeak(course,level,subjectsForRound(round),isCorrect));
    setSuccess(isCorrect);
    setResolved(true);
    setPicked(option);
  }
  function answerOrder() {
    if (!round || ordered.length !== (round.tokens?.length ?? -1)) return;
    resolve(checkOrder(round, ordered));
  }
  function answerType(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!round?.gap || !typed.trim()) return;
    resolve(normalizedWord(typed) === normalizedWord(round.gap.answer));
  }
  function answerPair(id: number) {
    if (resolved || selectedPair === null || matched.includes(id) || !round?.pairs) return;
    if (id !== selectedPair) {
      setPairError(true);
      setSelectedPair(null);
      return;
    }
    const newMatches = [...matched,id];
    setMatched(newMatches); setSelectedPair(null);
    if (newMatches.length === round.pairs.length) {
      setResolved(true); setSuccess(!pairError);
      setWeak(markWeak(course,level,subjectsForRound(round),!pairError));
    }
  }
  function advance() {
    if(!resolved || !day || !roundCount)return;
    const nextScore=score+(success?1:0);
    const nextMistakes=mistakes+(success?0:1);
    if(step===roundCount-1){
      setScore(nextScore);setMistakes(nextMistakes);
      if(playMode==="daily"){
        const freshStats=finishGame(course,level,day,nextScore,roundCount);
        setStats(freshStats);
        try{track("daily_arcade_completed",{course,level,score:nextScore,rounds:roundCount});}catch{/* optional */}
      }else if(playMode==="practice"){
        addPracticeCompletion(course,level,roundCount);
        setPracticeCompleted(readPracticeCompletions(course,level));
        try{track("daily_arcade_practice_completed",{course,level,score:nextScore,rounds:roundCount});}catch{/* optional */}
      }else if(playMode==="review"){
        try{track("daily_arcade_review_completed",{course,level,score:nextScore,rounds:roundCount});}catch{/* optional */}
      }
      setPhase("done");
    }else{
      const nextStep=step+1;
      if(playMode==="daily")saveDraft(course,level,{date:day,step:nextStep,score:nextScore,mistakes:nextMistakes});
      setScore(nextScore);setMistakes(nextMistakes);setStep(nextStep);clearRound();
    }
  }
  const solution = round?.mode === "gap" || round?.mode === "type" ? round.gap?.answer : round?.mode === "order" ? round.expression?.example : round?.mode === "truth" ? (round.isTrue ? tr.true : tr.false) : round?.mode === "meaning" ? round.expression?.answer : round?.pairs?.map(pair => `${pair.phrase} — ${pair.answer}`).join("; ");

  return <div className="daily-arcade mx-auto max-w-6xl space-y-5 px-1 pb-5" lang={course === "sk" ? "sk" : course === "cs" ? "cs" : "pl"}>
    <header className={`daily-top ${phase === "game" ? "is-playing" : ""}`}>
      <div className="daily-top-grid" aria-hidden="true" />
      <div className="daily-topline">
        <span className="daily-brand"><span className="daily-brand-symbol">✦</span> FLUNIO <strong>ARCADE</strong></span>
        <span className="daily-date"><span aria-hidden="true">◷</span> {todayText || "…"}</span>
      </div>
      <div className="daily-top-content">
        <div className="daily-headline">
          <p className="daily-eyebrow"><span className="daily-live-dot" />{tr.daily} <span className="daily-kicker-sep">/</span> {DAILY_COURSES[course].nativeName}</p>
          <h1 className="daily-title">{tr.title}</h1>
          <p className="daily-subtitle">{tr.tagline}</p>
          <div className="daily-hero-chips" aria-label={tr.modes}>
            <span>✦ {ROUND_COUNT} {tr.rounds}</span><span>◈ 6 {course === "sk" ? "typov úloh" : course === "cs" ? "typů úloh" : "typów zadań"}</span><span>◎ {tr[`${level}Sub`]}</span>
          </div>
        </div>
        <div className="daily-hero-art" aria-hidden="true">
          <div className="daily-hero-ring daily-hero-ring-a"/><div className="daily-hero-ring daily-hero-ring-b"/>
          <div className="daily-hero-emblem"><span>✦</span><small>ARCADE</small></div>
          <div className="daily-hero-mini daily-hero-mini-top">A+<span>↗</span></div>
          <div className="daily-hero-mini daily-hero-mini-bottom">⚡<span>XP</span></div>
        </div>
      </div>
    </header>

    <div className="daily-columns">
      <div className="min-w-0 space-y-4">
        {phase === "intro" && <section className="daily-levels" aria-label={tr.level}>
          <div className="daily-section-heading"><span>01 / {tr.level}</span><span>{tr.introHint}</span></div>
          <div className="daily-level-grid">
            {LEVELS.map(item => <button type="button" key={item} onClick={()=>chooseLevel(item)}
              className={`daily-level ${level === item ? "is-active" : ""}`} aria-pressed={level === item}>
              <span className="daily-level-band">{tr[`${item}Sub`]}</span><span className="daily-level-name">{tr[item]}</span>
              <span className="daily-level-check">{day && stats.results[day]?.[item] ? "✓" : level === item ? "◉" : "○"}</span>
            </button>)}
          </div>
        </section>}

        {phase === "intro" && <div className="daily-lobby-v3">
          <section className="daily-mission-card">
            <div className="daily-mission-light" aria-hidden="true" />
            <div className="daily-mission-topline"><span className="daily-mission-serial">01 <span>/</span> {tr.daily}</span><span className="daily-mission-status">{todayResult ? "✓ " + tr.done : "◆ " + tr[`${level}Sub`]}</span></div>
            <div className="daily-mission-body">
              <div className="daily-mission-copy">
                <h2 className="daily-mission-heading">{todayResult ? tr.finishedToday : tr.daily}</h2>
                <p className="daily-mission-lede">{todayResult ? `${tr.dailyRecord}: ${todayResult.score}/${todayResult.total}. ${tr.nextDay}` : tr.tagline}</p>
                <div className="daily-mini-modes" aria-label={tr.modes}>{(["meaning","order","gap","truth","pairs","type"] as const).map(mode => <span key={mode} title={tr[mode]}>{MODE_META[mode].emoji}<span className="sr-only">{tr[mode]}</span></span>)}</div>
              </div>
              <div className="daily-mission-art" aria-hidden="true"><div className="daily-mission-star">★</div><div className="daily-mission-orbit"/><span className="daily-mission-art-count">12</span></div>
            </div>
            <div className="daily-mission-foot">
              {todayResult ? <div className="daily-mission-complete">✓ {tr.finishedToday} · {todayResult.score}/{todayResult.total}</div>
                : <button type="button" className="daily-launch" onClick={startDaily} disabled={!ready}><span className="daily-btn-icon" aria-hidden="true">▶</span> {readDraft(course,level,day)?.step ? tr.resume : tr.play}<span className="daily-btn-arrow" aria-hidden="true">↗</span></button>}
              <span className="daily-mission-footnote">{tr.courseNote}</span>
            </div>
          </section>
          <div className="daily-other-modes">
            <section className="daily-next-mode daily-next-mode-practice"><div className="daily-mode-art daily-mode-art-practice" aria-hidden="true"><span>◈</span><i>↗</i></div>
              <p className="daily-eyebrow">02 / ARCADE</p><h3>{tr.practice}</h3><p>{tr.practiceInfo}</p>
              <button type="button" className="daily-mode-action" onClick={startPractice}>{tr.practice}<span aria-hidden="true">↗</span></button></section>
            <section className="daily-next-mode daily-next-mode-review"><div className="daily-mode-art daily-mode-art-review" aria-hidden="true">◎</div>
              <p className="daily-eyebrow">03 / {weak.length} {tr.weakCount}</p><h3>{tr.review}</h3><p>{weak.length ? tr.reviewInfo : tr.emptyReview}</p>
              <button type="button" className="daily-mode-action" onClick={startReview} disabled={!weak.length}>{tr.review}<span aria-hidden="true">↗</span></button></section>
          </div>
        </div>}

        {phase === "game" && round && <section className="daily-game" data-mode={round.mode} aria-label={`${tr.round} ${step+1}`}>
          <div className="daily-game-header"><div className="daily-game-heading"><div className="daily-mode-symbol" aria-hidden="true">{MODE_META[round.mode].emoji}</div><div><span className="daily-eyebrow">{playMode === "daily" ? tr.daily : playMode === "practice" ? tr.practice : tr.review} · {tr.round} {String(step+1).padStart(2,"0")} / {roundCount}</span><h2 className="daily-mode-title">{tr[round.mode]}</h2></div></div>
            <div className="daily-points"><span>✦</span> {score} <small>/ {roundCount}</small></div></div>
          <div className="daily-meter" style={{gridTemplateColumns:`repeat(${roundCount}, minmax(0, 1fr))`}} aria-label={`${step+1}/${roundCount}`}>
            {rounds.map((item, idx)=><span key={item.id} className={idx < step ? "passed" : idx === step ? "now" : ""}/>)}</div>
          <p className="daily-instruction">{tr[`${round.mode}Hint`]}</p>
          <div className="daily-playfield" data-mode={round.mode}>
            {round.mode === "meaning" && round.expression && <>
              <div className="daily-quote"><span className="daily-quote-mark">“</span>{round.expression.phrase}<span className="daily-quote-mark">”</span></div>
              <div className="daily-choice-grid">{round.choices?.map((choice,i)=><button type="button" key={choice} disabled={resolved}
                onClick={()=>resolve(i===round.correctChoice,i)} className={`daily-answer ${resolved && i === round.correctChoice ? "correct" : ""} ${resolved && picked === i && !success ? "wrong" : ""}`}>
                <span className="daily-answer-letter">{String.fromCharCode(65+i)}</span><span>{choice}</span></button>)}</div>
            </>}
            {round.mode === "gap" && round.gap && <>
              <div className="daily-gap-box">{round.gap.before.split("___")[0]}<span className="daily-gap-hole">{resolved ? round.gap.answer : "?"}</span>{round.gap.before.split("___")[1]} {round.gap.after}</div>
              <div className="daily-choice-grid">{round.choices?.map((choice,i)=><button type="button" key={`${i}-${choice}`} disabled={resolved} onClick={()=>resolve(i===round.correctChoice,i)}
                className={`daily-answer ${resolved && i === round.correctChoice ? "correct" : ""} ${resolved && picked === i && !success ? "wrong" : ""}`}><span className="daily-answer-letter">{String.fromCharCode(65+i)}</span>{choice}</button>)}</div>
              <p className="daily-hint">💡 {round.gap.hint}</p>
            </>}
            {round.mode === "truth" && round.expression && <>
              <div className="daily-quote">{round.expression.phrase}</div>
              <div className="daily-proposition">{round.isTrue ? round.expression.answer : round.expression.wrong[0]}</div>
              <div className="daily-truth-grid"><button type="button" disabled={resolved} className={`daily-truth ${resolved && round.isTrue ? "correct" : ""}`} onClick={()=>resolve(round.isTrue === true,0)}><span>✓</span>{tr.true}</button>
              <button type="button" disabled={resolved} className={`daily-truth ${resolved && !round.isTrue ? "correct" : ""}`} onClick={()=>resolve(round.isTrue === false,1)}><span>×</span>{tr.false}</button></div>
            </>}
            {round.mode === "order" && round.expression && <>
              <div className="daily-sentence-slots" aria-live="polite">{ordered.length ? ordered.map((id,i)=><button type="button" key={`${id}-${i}`} disabled={resolved} onClick={()=>setOrdered(prev=>prev.filter((_,idx)=>idx!==i))} className="daily-tile placed">{round.tokens?.find(tile=>tile.id===id)?.text}<span aria-hidden="true">×</span></button>) : <span className="daily-empty-slots">{tr.orderHint}</span>}</div>
              <div className="daily-tiles">{round.tokens?.filter(tile=>!ordered.includes(tile.id)).map(tile=><button type="button" key={tile.id} disabled={resolved} className="daily-tile" onClick={()=>setOrdered(prev=>[...prev,tile.id])}>{tile.text}</button>)}</div>
              {!resolved && <div className="daily-actions"><button type="button" onClick={()=>setOrdered(prev=>prev.slice(0,-1))} disabled={!ordered.length} className="daily-soft-btn">↶ {tr.undo}</button><button type="button" onClick={()=>setOrdered([])} disabled={!ordered.length} className="daily-soft-btn">↺ {tr.reset}</button><button type="button" disabled={ordered.length!==round.tokens?.length} className="daily-check" onClick={answerOrder}>{tr.check} →</button></div>}
            </>}
            {round.mode === "pairs" && round.pairs && <>
              <div className="daily-pair-grid"><div className="daily-pair-col">{round.pairs.map(p=><button type="button" key={p.id} disabled={matched.includes(p.id)||resolved}
                onClick={()=>setSelectedPair(p.id)} className={`daily-pair ${matched.includes(p.id) ? "matched" : selectedPair === p.id ? "selected" : ""}`}>{matched.includes(p.id) ? "✓ " : "◇ "}{p.phrase}</button>)}</div>
              <div className="daily-pair-col">{round.shuffledPairIds?.map(id=>{const p = round.pairs!.find(item=>item.id===id)!; return <button type="button" key={id} disabled={matched.includes(id)||resolved || selectedPair === null}
                onClick={()=>answerPair(id)} className={`daily-pair ${matched.includes(id) ? "matched" : ""}`}>{matched.includes(id) ? "✓ " : "↔ "}{p.answer}</button>;})}</div></div>
              {pairError && !resolved && <p className="daily-hint" role="status">{tr.pairWrong}</p>}
              <div className="daily-pair-counter">{matched.length} / 3 ✓</div>
            </>}
            {round.mode === "type" && round.gap && <>
              <div className="daily-gap-box">{round.gap.before.split("___")[0]}<span className="daily-gap-hole">{resolved ? round.gap.answer : "…"}</span>{round.gap.before.split("___")[1]} {round.gap.after}</div>
              <p className="daily-hint">💡 {round.gap.hint}</p>
              <form onSubmit={answerType} className="daily-type-form"><input aria-label={tr.input} value={typed} onChange={(event: {target:{value:string}})=>setTyped(event.target.value)} disabled={resolved} placeholder={tr.input} autoComplete="off" spellCheck={false} className="daily-type-input"/>
                <button type="submit" disabled={!typed.trim()||resolved} className="daily-check">{tr.check} →</button></form>
            </>}
          </div>
          {resolved && <div className={`daily-feedback ${success ? "win" : "lose"}`} role="status"><div className="daily-feedback-symbol" aria-hidden="true">{success ? "✓" : "↗"}</div>
            <div className="min-w-0"><strong>{success ? tr.yes : tr.no}</strong><p>{success ? (round.mode === "pairs" ? tr.pairsRight : tr.example + ": " + (round.expression?.example ?? round.gap?.before.replace("___",round.gap.answer))) : `${tr.solution}: ${solution}`}</p>{!success && round.expression?.example ? <p className="mt-1">{tr.example}: {round.expression.example}</p> : null}</div></div>}
          {resolved && <button type="button" className="daily-launch daily-next" onClick={advance}>{step === roundCount-1 ? tr.finish : tr.next}<span className="ml-auto">→</span></button>}
          <div className="daily-bottom"><button type="button" className="daily-text-btn" onClick={()=>setPhase("intro")}>← {tr.back}</button><span>{tr.level}: {tr[level]}</span></div>
        </section>}

        {phase === "done" && <section className="daily-finish"><div className="daily-trophy" aria-hidden="true">🏆</div><p className="daily-eyebrow">{playMode === "daily" ? tr.daily : playMode === "practice" ? tr.practice : tr.review} · {tr[`${level}Sub`]}</p>
          <h2>{playMode === "daily" ? tr.finishedToday : playMode === "practice" ? tr.trainingDone : tr.reviewDone}</h2>
          <p className="daily-subtitle">{playMode === "daily" ? tr.nextDay : playMode === "practice" ? tr.practiceInfo : tr.reviewInfo}</p>
          <div className="daily-total"><strong>{playMode === "daily" ? todayResult?.score ?? score : score}<span> / {playMode === "daily" ? ROUND_COUNT : roundCount}</span></strong><small>{tr.result}</small></div>
          <div className="daily-finish-actions"><button type="button" className="daily-launch" onClick={startPractice}>{tr.keepGoing} ↗</button>
            {weak.length>0 && <button type="button" className="daily-soft-btn" onClick={startReview}>{tr.review} ({weak.length}) →</button>}
            <button type="button" className="daily-soft-btn" onClick={()=>setPhase("intro")}>{tr.goLobby} →</button></div>
        </section>}
      </div>
      <aside className="daily-aside">
        <section className="daily-stats"><div className="daily-section-heading"><span>{tr.stats}</span><span>✦</span></div><div className="daily-stats-grid">
          <div><span aria-hidden="true">🔥</span><strong>{ready ? streak : "—"}</strong><small>{tr.streak}</small></div>
          <div><span aria-hidden="true">◈</span><strong>{ready ? stats.activeDays : "—"}</strong><small>{tr.days}</small></div>
        </div><p className="daily-stats-foot">{tr.best}: <strong>{stats.bestStreak}</strong></p></section>
        <section className="daily-history"><div className="daily-section-heading"><span>{tr.history}</span><span>{day ? day.slice(5) : ""}</span></div><div className="space-y-2">{LEVELS.map(item=><div key={item} className="daily-history-row"><span>{tr[item]} <small>{tr[`${item}Sub`]}</small></span>
          <strong>{day && stats.results[day]?.[item] ? `${stats.results[day]?.[item]?.score}/${ROUND_COUNT}` : "—"}</strong></div>)}</div></section>
        <section className="daily-weekly"><div className="daily-section-heading"><span>{tr.weekly}</span><span>{weekCompleted} / 7</span></div>
          <div className="daily-week-grid">{thisWeek.map((date,index)=>{const done=!!stats.results[date] && Object.keys(stats.results[date]).length>0;
            return <div key={date} className={`daily-week-day ${done ? "completed" : ""} ${date===day ? "today" : ""}`} title={date}><span>{weekLabels[index]}</span><strong>{done ? "✓" : date.slice(-2)}</strong></div>;})}</div>
          <p className="daily-stats-foot">{weekCompleted>=5 ? tr.weeklyDone : tr.weeklyGoal}</p></section>
        <section className="daily-side-links"><div className="daily-history-row"><span>{tr.weakCount}</span><strong>{weak.length}</strong></div>
          <div className="daily-history-row"><span>{tr.practiceCount}</span><strong>{practiceCompleted}</strong></div>
          <p className="mt-4">{tr.streakNote}</p><p className="mt-2">{tr.courseNote}</p>
          <Link href="/learning" className="daily-learning-link">{tr.linkLearn} ↗</Link><p className="daily-privacy">{tr.privacy}</p></section>
      </aside>
    </div>
  </div>;
}

