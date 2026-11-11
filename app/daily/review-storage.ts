/** Local-only learning state; lives separately from legacy Daily v2 scores and drafts. */
import type {DailyCourse} from './question-bank';
import type {Level} from './game-data';
const PREFIX='flunio.arcade.v3';
const maxItems=60;
const name=(kind:string,course:DailyCourse,level:Level)=>`${PREFIX}.${kind}.${course}.${level}`;
const get=(key:string)=>{try{return window.localStorage.getItem(key);}catch{return null;}};
const put=(key:string,value:string)=>{try{window.localStorage.setItem(key,value);}catch{/* private mode */}};
export function readWeak(course:DailyCourse,level:Level):string[]{
  if(typeof window==='undefined')return [];
  try{const data=JSON.parse(get(name('weak',course,level))||'[]');return Array.isArray(data)?data.filter((x):x is string=>typeof x==='string').slice(0,maxItems):[];}catch{return [];}
}
export function markWeak(course:DailyCourse,level:Level,keys:readonly string[],correct:boolean):string[]{
  const previous=readWeak(course,level);
  const next=correct?previous.filter(key=>!keys.includes(key)):[...new Set([...keys,...previous])].slice(0,maxItems);
  put(name('weak',course,level),JSON.stringify(next));return next;
}
export function nextPracticeRun(course:DailyCourse,level:Level):number{
  const key=name('run',course,level);const prev=Number(get(key));const next=Number.isSafeInteger(prev)&&prev>=0?prev+1:1;
  put(key,String(next));return next;
}
export function readRecent(course:DailyCourse,level:Level):string[]{
  try{const data=JSON.parse(get(name('recent',course,level))||'[]');return Array.isArray(data)?data.filter((x):x is string=>typeof x==='string').slice(0,30):[];}catch{return [];}
}
export function writeRecent(course:DailyCourse,level:Level,keys:readonly string[]){
  put(name('recent',course,level),JSON.stringify([...new Set(keys)].slice(0,30)));
}
export function addPracticeCompletion(course:DailyCourse,level:Level,rounds:number){
  const key=name('practice-completions',course,level);
  const old=Number(get(key));const value=Number.isSafeInteger(old)&&old>=0?old:0;
  put(key,String(value+rounds));
}
export function readPracticeCompletions(course:DailyCourse,level:Level){
  const value=Number(get(name('practice-completions',course,level)));
  return Number.isSafeInteger(value)&&value>=0?value:0;
}
/** Week starts Monday in the viewer's local calendar. */
export function weekDates(day:string):string[]{
  const date=new Date(`${day}T12:00:00`);
  if(Number.isNaN(date.getTime()))return [];
  const monday=date.getDay()===0?6:date.getDay()-1;
  date.setDate(date.getDate()-monday);
  return Array.from({length:7},(_,i)=>{const d=new Date(date);d.setDate(date.getDate()+i);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');});
}
