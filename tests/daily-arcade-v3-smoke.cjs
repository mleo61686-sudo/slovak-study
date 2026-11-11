/** Offline no-dependency tests for daily retention, active-course lock and dynamic training. */
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
let ts; try{ts=require('typescript');}catch{ts=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript');}
const modules=new Map(),store=new Map();
global.window={localStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)}};
function load(relative){let filename=path.resolve(root,relative);if(!filename.endsWith('.ts'))filename+='.ts';
 if(modules.has(filename))return modules.get(filename).exports;
 const source=fs.readFileSync(filename,'utf8');const parsed=ts.createSourceFile(filename,source,ts.ScriptTarget.Latest,true);
 assert.equal(parsed.parseDiagnostics.length,0,`Syntax: ${relative}`);
 const code=ts.transpileModule(source,{fileName:filename,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 const mod={exports:{}};modules.set(filename,mod);
 const fn=new Function('require','module','exports','window',code);fn(dep=>load(path.join(path.dirname(relative),dep)),mod,mod.exports,global.window);return mod.exports;}
const {createDailyRounds,ROUND_COUNT}=load('app/daily/game-engine');
const {createPracticeRounds,createReviewRounds,subjectsForRound,PRACTICE_ROUND_COUNT}=load('app/daily/game-rotation');
const {markWeak,readWeak,nextPracticeRun,readRecent,writeRecent,weekDates,addPracticeCompletion,readPracticeCompletions}=load('app/daily/review-storage');
const {finishGame,readGameStats}=load('app/daily/game-progress');
let played=0;let different=0;
for(const course of ['sk','cs','pl'])for(const level of ['starter','everyday','advanced'])for(let d=0;d<120;d++){
 const day=new Date(Date.UTC(2026,10,11+d)).toISOString().slice(0,10);
 const daily=createDailyRounds(course,level,day);
 const avoid=daily.flatMap(subjectsForRound);
 const p1=createPracticeRounds(course,level,day,1,avoid);
 const p2=createPracticeRounds(course,level,day,2,[...avoid,...p1.flatMap(subjectsForRound)]);
 assert.equal(p1.length,PRACTICE_ROUND_COUNT);
 assert.equal(p2.length,PRACTICE_ROUND_COUNT);
 for(const round of [...p1,...p2]){
   assert(subjectsForRound(round).length>0);
   if(round.mode==='pairs')assert.equal(new Set(round.pairs.map(p=>p.answer)).size,3);
   if(round.mode==='gap'||round.mode==='meaning')assert.equal(round.choices[round.correctChoice],round.gap?.answer??round.expression?.answer);
   if(round.mode==='order')assert(round.tokens.length>=3);
 }
 for(const p of [p1,p2]) {
   const all=p.flatMap(subjectsForRound);
   assert.equal(new Set(all).size,all.length,'Repeated content in the same practice round');
 }
 const sig=x=>x.flatMap(subjectsForRound).join('|');
 if(sig(p1)!==sig(p2))different++;
 assert.notEqual(sig(p1),sig(p2),'two consecutive practice runs identical');
 played++;
}
assert.equal(different,played);
assert.deepEqual(readWeak('sk','starter'),[]);
markWeak('sk','starter',['e:some phrase','g:wrong|word'],false);
assert.equal(readWeak('sk','starter').length,2);
markWeak('sk','starter',['e:some phrase'],true);
assert.deepEqual(readWeak('sk','starter'),['g:wrong|word']);
let keys=['e:Dobrý deň!','g:some missing|word'];
const rev=createReviewRounds('sk','starter',keys,'2026-11-11');
assert.equal(rev.length,1);
assert.deepEqual(subjectsForRound(rev[0]),['e:Dobrý deň!']);
assert.equal(nextPracticeRun('sk','starter'),1);
assert.equal(nextPracticeRun('sk','starter'),2);
writeRecent('sk','starter',['e:Dobrý deň!','e:Prepáčte.']);
assert.equal(readRecent('sk','starter').length,2);
addPracticeCompletion('sk','starter',8);addPracticeCompletion('sk','starter',8);
assert.equal(readPracticeCompletions('sk','starter'),16);
assert.deepEqual(weekDates('2026-11-11'),['2026-11-09','2026-11-10','2026-11-11','2026-11-12','2026-11-13','2026-11-14','2026-11-15']);
let stats=finishGame('pl','starter','2026-11-11',9,12);
assert.equal(stats.activeDays,1);
stats=finishGame('pl','starter','2026-11-11',12,12);
assert.equal(stats.activeDays,1);
// UI should no longer provide language switches; /daily/[course] is an SEO landing page, not a forced course.
const client=fs.readFileSync(path.join(root,'app/daily/DailyClient.tsx'),'utf8');
const landing=fs.readFileSync(path.join(root,'app/daily/[course]/page.tsx'),'utf8');
assert(client.includes('const {courseId} = useActiveCourse()'));
assert(!client.includes('setActiveCourse('));
assert(!client.includes('daily-language-links'));
assert(!landing.includes('fixedCourse'));
assert(!client.includes('onClick={start}'));
assert(client.includes('startPractice'));
assert(client.includes('startReview'));
console.log(`Flunio Arcade v3 PASS: ${played} daily/practice pairs across 3 languages, 3 levels, 120 days; no repeated consecutive sessions; errors, stats, weekly plan, and course lock.`);
