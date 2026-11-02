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
assert.equal(a0.length, 23, "10 recognition + 10 recall + 3 verified contexts");
assert.equal(b1.length, 23);
assert.equal(a0.filter((step) => step.phase === "recognition").length, 10);
assert.equal(a0.filter((step) => step.phase === "recall").length, 10);
assert.equal(a0.filter((step) => step.phase === "context").length, 3);
assert.ok(a0.filter((step) => step.phase === "recall").every((step) => step.kind === "chooseSlovak"));
assert.ok(b1.filter((step) => step.phase === "recall").every((step) => step.kind === "writeWord"));
assert.deepEqual(
  a0.filter((step) => step.phase === "context").map((step) => step.wordIndex),
  [1, 4, 8]
);
assert.equal(planner.buildLessonPlan([], "a0-1", []).length, 0);
assert.deepEqual(
  planner.buildMistakeReview(new Set([9, 1, 1, -1, 20]), words, "a0-1").map((step) => step.wordIndex),
  [1, 9]
);
assert.equal(planner.LESSON_MASTERY_PERCENT, 80);

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
console.log("Lesson v2 smoke tests: PASS (plan, verified contexts, mistakes, SRS limit, history)");
