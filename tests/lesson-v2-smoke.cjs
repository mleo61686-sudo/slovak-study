/**
 * Integration-adjacent unit smoke checks without booting Next or touching a DB.
 * Run: npm run test:lesson-v2
 */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

function loadTsModule(relativePath, stubs) {
  const filename = path.join(__dirname, "..", relativePath);
  const src = fs.readFileSync(filename, "utf8");
  const compiled = ts.transpileModule(src, {
    fileName: filename,
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  }).outputText;
  const module = { exports: {} };
  new Function("require", "module", "exports", compiled)(
    (name) => {
      if (!Object.hasOwn(stubs, name)) throw Error(`Unexpected dependency: ${name}`);
      return stubs[name];
    }, module, module.exports
  );
  return module.exports;
}

const words = Array.from({ length: 10 }, (_, i) => ({
  sk: `slovo${i}`,
  ua: `слово${i}`,
}));
const phraseKey = (...values) => values.join("||").toLowerCase();
const authoredPhrases = {
  "slovo1||a0-1": { sk: "To je slovo1.", ua: "Це слово1.", tokens: ["To", "je", "slovo1", "."] },
  "slovo2||a0-1": { sk: "", ua: "порожнє", tokens: [] },
};
const authoredTranslations = {
  "slovo4||a0-1": { sk: "Poznám slovo4.", ua: "Знаю слово4.", uaTokens: ["Знаю", "слово4", "."] },
};
const resolver = loadTsModule("app/learning/components/LevelClient/verified-content.ts", {
  "@/app/learning/phrases/phraseKey": { phraseKey },
  "@/app/learning/phrases/registry": { getPhrasesForLevel: () => authoredPhrases },
  "@/app/learning/build-ua-sentences/registry": { getBuildUaSentencesForLevel: () => authoredTranslations },
});
const resolved = resolver.getVerifiedContextKinds(words, "a0-1", "sk");
assert.equal(resolved[1], "buildSentence");
assert.equal(resolved[2], null, "unfinished sentence must not enter the lesson");
assert.equal(resolved[4], "buildUaSentence");
assert.equal(resolved[0], null, "missing authored sentence must not be invented");

const planner = loadTsModule("app/learning/components/LevelClient/lesson-plan.ts", {});
const verifiedContexts = resolved.map((kind, index) =>
  index === 8 ? "buildSentence" : kind
);
const a0 = planner.buildLessonPlan(words, "a0-1", verifiedContexts);
const b1 = planner.buildLessonPlan(words, "b1-1", verifiedContexts);
const expectedKinds = [
  "chooseTranslation", "chooseSlovak", "writeWord", "audioQuiz",
  "matchColumns", "buildSentence", "buildUaSentence"
];
for (const plan of [a0, b1]) {
  assert.equal(plan.length, 61, "six rounds of ten plus one matching board");
  assert.deepEqual([...new Set(plan.map((step) => step.kind))], expectedKinds);
  assert.deepEqual(plan.filter((step) => step.kind === "matchColumns").map((step) => step.wordIndex), [0]);
  for (const kind of expectedKinds.filter((kind) => kind !== "matchColumns")) {
    assert.deepEqual(plan.filter((step) => step.kind === kind).map((step) => step.wordIndex),
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }
  assert.equal(plan.reduce((sum, step) => sum + planner.lessonStepPoints(step, words.length), 0), 70);
}
assert.equal(planner.buildLessonPlan([], "a0-1", []).length, 0);
assert.deepEqual(
  planner.buildMistakeReview(new Set([9, 1, 1, -1, 20]), words, "a0-1").map((step) => step.wordIndex),
  [1, 9]
);
assert.equal(planner.LESSON_MASTERY_PERCENT, 80);

// Fallbacks must be grammatical: no synthetic "To je <verb>" sentences.
const helpers = loadTsModule("app/learning/components/LevelClient/helpers.ts", {
  "./verified-content": {
    findPhraseInDict: () => undefined,
    findBuildUaSentenceInDict: () => undefined,
  },
  "@/app/learning/phrases/registry": { getPhrasesForLevel: () => null },
  "@/app/learning/build-ua-sentences/registry": { getBuildUaSentencesForLevel: () => null },
});
const verb = { sk: "ísť", ua: "йти", ru: "идти", en: "to go" };
for (const [course, begins] of [["sk", "Zapamätaj"], ["cs", "Zapamatuj"], ["pl", "Zapamiętaj"]]) {
  const phrase = helpers.getPhraseForWord(verb, "ua", "a0-1", course);
  assert.ok(phrase.sk.startsWith(begins));
  assert.ok(phrase.sk.includes("ísť"));
  assert.ok(!phrase.sk.includes("To je ísť"));
  assert.ok(phrase.tokens.length >= 3);
  const translation = helpers.getBuildUaSentenceForWord(verb, "ua", "a0-1", course);
  assert.ok(translation.target.includes("йти"));
  assert.ok(translation.answerTokens.length >= 3);
}
const db = { slovo2: { id: "slovo2", dueAt: 999, reps: 8 } };
let dailyCount = 29;
let sessionIds = ["old"];
let saves = 0;
const enroll = loadTsModule("app/learning/components/LevelClient/enrollLessonWords.ts", {
  "@/app/components/words-srs/words-srs-logic": {
    DAILY_NEW_LIMIT: 30,
    SESSION_SIZE: 30,
    getTerm: (w) => w.sk,
    initState: (id) => ({ id, dueAt: 0, reps: 0 }),
  },
  "@/app/components/words-srs/words-srs-storage": {
    getDailySession: () => ({ date: "today", ids: sessionIds }),
    getDailyState: () => ({ date: "today", count: dailyCount }),
    loadDb: () => db,
    saveDb: () => { saves += 1; },
    setDailySession: (_u, _c, ids) => { sessionIds = ids; },
    setDailyState: (_u, _c, count) => { dailyCount = count; },
  },
});
const first = enroll.enrollLessonWords("user", "sk", words);
assert.equal(first.added, 1);
assert.equal(first.alreadyTracked, 1);
assert.equal(first.dailyLimitReached, true);
assert.equal(dailyCount, 30);
assert.equal(db.slovo2.reps, 8, "existing SRS history must not be reset");
assert.deepEqual(sessionIds, ["old", "slovo0"]);
assert.equal(saves, 1);
const second = enroll.enrollLessonWords("user", "sk", words);
assert.equal(second.added, 0, "daily limit must be preserved");
assert.equal(saves, 1, "do not write an unchanged SRS store");
console.log("Lesson classic-7 smoke tests: PASS (7 exercises, 70 points, sentence fallback, SRS, review)");
