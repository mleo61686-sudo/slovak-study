/** Test offline content rotation, duplicate avoidance, review, and untouched course selection. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
let ts;try{ts=require('typescript');}catch{ts=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript');}
const modules=new Map();
function load(rel){let file=path.resolve(root,rel);if(!file.endsWith('.ts'))file+='.ts';
 if(modules.has(file))return modules.get(file).exports;
 const src=fs.readFileSync(file,'utf8');const parsed=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true);
 assert.equal(parsed.parseDiagnostics.length,0,`Syntax: ${rel}`);
 const code=ts.transpileModule(src,{fileName:file,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 const mod={exports:{}};modules.set(file,mod);
 new Function('require','module','exports',code)(dep=>load(path.join(path.dirname(rel),dep)),mod,mod.exports);
 return mod.exports;}
const {SENTENCE_BANK}=load('app/daily/sentence-bank');
const {dailyLessonSentences,createDailyRounds,LESSON_SENTENCES_PER_DAY,ROUND_COUNT}=load('app/daily/game-engine');
const {createPracticeRounds,createReviewRounds,subjectsForRound}=load('app/daily/game-rotation');
let rotations=0;
for(const course of ['sk','cs','pl'])for(const level of ['starter','everyday','advanced']){
 const deck=SENTENCE_BANK[course][level];assert(deck.length>=200,`${course}/${level} too small`);
 assert.equal(new Set(deck).size,deck.length,'Duplicates in lesson deck');
 const numDays=Math.floor(deck.length/LESSON_SENTENCES_PER_DAY);
 let prev=[];let seen=new Set();
 for(let d=0;d<numDays;d++){
  const day=new Date(Date.UTC(2026,0,1+d)).toISOString().slice(0,10);
  const today=dailyLessonSentences(course,level,day);
  assert.equal(today.length,4);
  assert.equal(today.filter(sentence=>prev.includes(sentence)).length,0,'Adjacent day repeated');
  for(const item of today){assert(!seen.has(item),'Repeated before entire deck exhausted');seen.add(item);}
  const rounds=createDailyRounds(course,level,day);
  assert.equal(rounds.length,ROUND_COUNT);
  const order=rounds.filter(item=>item.orderSource==='lesson');
  assert.equal(order.length,4);
  assert.deepEqual(order.map(item=>item.expression.example),today);
  assert.equal(new Set(order.flatMap(subjectsForRound)).size,4);
  for(const round of rounds){if(round.mode==='order')assert(round.tokens.length>=3);}
  const practice=createPracticeRounds(course,level,day,1,rounds.flatMap(subjectsForRound));
  assert(practice.filter(r=>r.orderSource==='lesson').length===1);
  assert(!today.includes(practice.find(r=>r.orderSource==='lesson').expression.example),'Practice repeats daily sentence');
  rotations++;prev=today;
 }
 const review=createReviewRounds(course,level,[`s:${deck[5]}`],'2026-11-11');
 assert.equal(review.length,1);assert.equal(review[0].mode,'order');
 assert.deepEqual(subjectsForRound(review[0]),[`s:${deck[5]}`]);
}
console.log(`Flunio content v5 PASS: ${rotations} days of 4 nonrepeating sentences + practice/review across 9 decks`);
