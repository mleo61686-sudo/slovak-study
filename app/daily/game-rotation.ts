/** Additional modes: a daily mission remains stable, while free practice rotates its material.
 * This is a finite, curated offline question bank, NOT an infinite stream of new content. */
import {EXPRESSIONS, GAPS, type Expression, type Gap, type Level} from './game-data';
import type {DailyCourse} from './question-bank';
import { makeLessonOrderRound, dailyLessonSentences, LESSON_SENTENCES_PER_DAY, type GameRound, type Mode } from './game-engine';
import { SENTENCE_BANK } from './sentence-bank';
import { utcDayIndex } from './question-bank';

export const PRACTICE_ROUND_COUNT = 8;
export function subjectsForRound(round: GameRound): string[] {
  if (round.pairs) return round.pairs.map(pair => `e:${pair.phrase}`);
  if (round.orderSource === 'lesson' && round.expression) return [`s:${round.expression.example}`];
  if (round.expression) return [`e:${round.expression.phrase}`];
  if (round.gap) return [`g:${round.gap.before}|${round.gap.answer}`];
  return [];
}

function randomFrom(text: string) {
  let hash=2166136261;
  for(let i=0;i<text.length;i++) {hash=Math.imul(hash ^ text.charCodeAt(i),16777619);}
  let seed=hash>>>0 || 1;
  return () => {seed ^= seed<<13;seed ^= seed>>>17;seed ^= seed<<5;return (seed>>>0)/4294967296;};
}
function shuffled<T>(src: readonly T[],rng:()=>number) {
  const a=[...src];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;
}
function makeRound(mode:Mode, id:string, rng:()=>number, expression?:Expression, gap?:Gap, expressions?:Expression[]):GameRound {
  if(mode==='meaning' && expression){const choices=shuffled([expression.answer,...expression.wrong],rng);return {mode,id,expression,choices,correctChoice:choices.indexOf(expression.answer)};}
  if(mode==='truth' && expression)return {mode,id,expression,isTrue:rng()<.5};
  if(mode==='order' && expression){
    const tokens=shuffled(expression.example.trim().split(/\s+/).map((text,id)=>({id,text})),rng);
    if(tokens.length>1 && tokens.every((tile,i)=>tile.id===i))tokens.push(tokens.shift()!);
    return {mode,id,expression,tokens};
  }
  if(mode==='pairs' && expressions){
    const pairs=expressions.map((entry,i)=>({id:i,phrase:entry.phrase,answer:entry.answer}));
    return {mode,id,pairs,shuffledPairIds:shuffled(pairs.map(pair=>pair.id),rng)};
  }
  if(mode==='gap' && gap){const choices=shuffled([gap.answer,...gap.wrong],rng);return {mode,id,gap,choices,correctChoice:choices.indexOf(gap.answer)};}
  if(mode==='type' && gap)return {mode,id,gap};
  throw new Error(`Missing material for ${mode}`);
}
const PRACTICE_MODES:Mode[]=['meaning','order','gap','truth','pairs','type','meaning','gap'];

/** Excludes today's and last practice's expressions where inventory permits; no duplicates in one run. */
export function createPracticeRounds(course:DailyCourse,level:Level,day:string,run:number,avoidKeys:readonly string[]=[]):GameRound[]{
  const rng=randomFrom(`${course}|${level}|${day}|practice|${run}`);
  const avoid=new Set(avoidKeys);
  const expr=shuffled(EXPRESSIONS[course][level],rng).sort((a,b)=>Number(avoid.has(`e:${a.phrase}`))-Number(avoid.has(`e:${b.phrase}`)));
  const gaps=shuffled(GAPS[course][level],rng).sort((a,b)=>Number(avoid.has(`g:${a.before}|${a.answer}`))-Number(avoid.has(`g:${b.before}|${b.answer}`)));
  let ep=0,gp=0;
  return PRACTICE_MODES.map((mode,i)=>{
    const id=`practice-${course}-${level}-${day}-${run}-${i}`;
    if(mode==='pairs'){
      const selected:Expression[]=[];
      while(ep<expr.length && selected.length<3){const candidate=expr[ep++];if(!selected.some(prev=>prev.answer===candidate.answer))selected.push(candidate);}
      if(selected.length<3)throw new Error(`Insufficient distinct pair content for ${course}/${level}`);
      return makeRound(mode,id,rng,undefined,undefined,selected);
    }
    if(mode==='gap'||mode==='type')return makeRound(mode,id,rng,undefined,gaps[gp++%gaps.length]);
    if(mode==='order'){
      const corpus=SENTENCE_BANK[course][level];
      // Skip all four lesson sentences from the current daily mission.
      // Repeated practice runs advance through the remaining sentences.
      const today=dailyLessonSentences(course,level,day);
      let offset=(utcDayIndex(day)*LESSON_SENTENCES_PER_DAY + LESSON_SENTENCES_PER_DAY + Math.max(0,run-1))%corpus.length;
      for(let attempt=0;attempt<corpus.length && today.includes(corpus[offset]);attempt++)offset=(offset+1)%corpus.length;
      return makeLessonOrderRound(corpus[offset],id,rng);
    }
    return makeRound(mode,id,rng,expr[ep++%expr.length]);
  });
}

/** Only previously missed subjects; no filler and no invented questions. */
export function createReviewRounds(course:DailyCourse,level:Level,keys:readonly string[],day:string):GameRound[]{
  const rng=randomFrom(`${course}|${level}|${day}|review|${keys.join('/')}`);
  const expressions=new Map(EXPRESSIONS[course][level].map(e=>[`e:${e.phrase}`,e]));
  const gaps=new Map(GAPS[course][level].map(g=>[`g:${g.before}|${g.answer}`,g]));
  const sentences=new Set(SENTENCE_BANK[course][level]);
  const rounds:GameRound[]=[];
  for(const key of keys.slice(0,8)){
    if(key.startsWith('s:') && sentences.has(key.slice(2))){
      rounds.push(makeLessonOrderRound(key.slice(2),`review-${rounds.length}`,rng));
    }else if(expressions.has(key)){
      const e=expressions.get(key)!;
      const mode:Mode=rounds.length%3===0?'order':rounds.length%2===0?'truth':'meaning';
      rounds.push(makeRound(mode,`review-${key}-${rounds.length}`,rng,e));
    }else if(gaps.has(key)){
      const mode:Mode=rounds.length%2===0?'gap':'type';
      rounds.push(makeRound(mode,`review-${key}-${rounds.length}`,rng,undefined,gaps.get(key)!));
    }
  }
  return rounds;
}
