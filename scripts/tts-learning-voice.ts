/**
 * Flunio 2.0: offline, opt-in ElevenLabs narration for missions and stories.
 *
 * Preview (NO API calls / credits): npm run tts:learning -- --course=sk
 * Paid pilot: npm run tts:learning -- --course=sk --generate --limit=5
 * All remaining audio: npm run tts:learning -- --generate --all
 *
 * All credentials stay in the local .env.local. Generated MP3 files are
 * committed/deployed as ordinary static files; learners never need an API key.
 */
import "dotenv/config";
import { config as loadEnv } from "dotenv";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { ALL_MISSIONS } from "../app/learning/missions/data";
import { EXTRA_MISSIONS } from "../app/learning/missions/content-extra";
import { ALL_STORIES } from "../app/learning/stories/data";
import { EXTRA_STORIES } from "../app/learning/stories/content-extra";

loadEnv({ path: ".env.local", override: true, quiet: true });

type Course = "sk" | "cs" | "pl";
type Clip = { course: Course; speaker: string; text: string; origin: string };
type Saved = Record<string, string>;
const VOICE_MODEL = "eleven_multilingual_v2";
const OUTPUT_FORMAT = "mp3_44100_128";
const audioDir = join(process.cwd(), "public", "audio", "flunio-voice");
const manifestFile = join(process.cwd(), "app", "learning", "audio", "voiceManifest.json");

function parsedOption(name: string): string | undefined {
  return process.argv.find(arg => arg.startsWith(`--${name}=`))?.slice(name.length + 3);
}
const courseArg = parsedOption("course");
const sectionArg = parsedOption("section");
const limitArg = parsedOption("limit");
const generate = process.argv.includes("--generate");
const all = process.argv.includes("--all");
const force = process.argv.includes("--force");
// Limits billing to the recently added authored content, even if old MP3 files are absent.
const newScenarios = process.argv.includes("--new-scenarios");
// Explicit permission to use the course default voice when a role-specific one is absent.
const allowVoiceFallback = process.argv.includes("--allow-voice-fallback");
const help = process.argv.includes("--help");
if (courseArg && !["sk", "cs", "pl"].includes(courseArg)) throw Error("--course must be sk, cs, or pl");
if (sectionArg && !["missions", "stories"].includes(sectionArg)) throw Error("--section must be missions or stories");
if (limitArg && (!/^\d+$/.test(limitArg) || Number(limitArg) < 1)) throw Error("--limit must be a positive number");
if (generate && !all && !limitArg) throw Error("Safety: use --limit=N for a paid pilot or --all to explicitly approve the full batch.");

const normalizeText = (text: string) => text.normalize("NFC").replace(/\s+/g, " ").trim();
const keyFor = (clip: Pick<Clip, "course" | "speaker" | "text">) =>
  JSON.stringify([clip.course, clip.speaker, normalizeText(clip.text)]);

const roleGender: Record<Course, { female: Set<string>; male: Set<string> }> = {
  sk: { female: new Set(["Predavačka", "Recepcia", "Vedúca", "Suseda", "Susedka", "Čašníčka", "Majiteľka bytu", "Cestujúca", "Personalistka"]), male: new Set(["Kolega", "Kolega (telefonát)", "Martin", "Správca domu", "Rozprávač", "Sprievodca", "Uchádzač"]) },
  cs: { female: new Set(["Prodavačka", "Recepční", "Sousedka", "Eva", "Číšnice", "Majitelka bytu", "Cestující", "Personalistka"]), male: new Set(["Kolega", "Petr", "Soused", "Správce", "Vypravěč", "Průvodčí", "Uchazeč"]) },
  pl: { female: new Set(["Sprzedawczyni", "Rejestratorka", "Sąsiadka", "Kasia", "Kelnerka", "Właścicielka mieszkania", "Pasażerka", "Rekruterka"]), male: new Set(["Kierownik", "Kolega", "Piotr", "Sąsiad", "Zarządca", "Narrator", "Konduktor", "Kandydat"]) },
};
const voices: Record<Course, { default?: string; male?: string; female?: string }> = {
  sk: { default: process.env.ELEVENLABS_VOICE_ID_Slovak_Female, female: process.env.ELEVENLABS_VOICE_ID_Slovak_Female, male: process.env.ELEVENLABS_VOICE_ID_Slovak_Male },
  cs: { default: process.env.ELEVENLABS_VOICE_ID_Czech_Male, male: process.env.ELEVENLABS_VOICE_ID_Czech_Male, female: process.env.ELEVENLABS_VOICE_ID_Czech_Female },
  pl: { default: process.env.ELEVENLABS_VOICE_ID_Polish, male: process.env.ELEVENLABS_VOICE_ID_Polish_Male, female: process.env.ELEVENLABS_VOICE_ID_Polish_Female },
};
type VoiceSelection = { voice?: string; fallback?: "male" | "female" };
function pickVoice(clip: Clip): VoiceSelection {
  const configured = voices[clip.course];
  const role = roleGender[clip.course];
  if (role.female.has(clip.speaker)) {
    if (configured.female) return { voice: configured.female };
    return { voice: configured.default, fallback: configured.default ? "female" : undefined };
  }
  if (role.male.has(clip.speaker)) {
    if (configured.male) return { voice: configured.male };
    return { voice: configured.default, fallback: configured.default ? "male" : undefined };
  }
  return { voice: configured.default };
}
function fallbackEnvName(course: Course, gender: "male" | "female"): string {
  const language = { sk: "Slovak", cs: "Czech", pl: "Polish" }[course];
  return `ELEVENLABS_VOICE_ID_${language}_${gender === "male" ? "Male" : "Female"}`;
}
function uniqueClips(): Clip[] {
  const lines: Clip[] = [];
  if (!sectionArg || sectionArg === "missions") {
    for (const mission of newScenarios ? EXTRA_MISSIONS : ALL_MISSIONS) {
      if (courseArg && mission.course !== courseArg) continue;
      for (const step of mission.steps) {
        if (step.kind === "dialogue") lines.push({ course: mission.course, speaker: step.speaker, text: step.sk, origin: `mission:${mission.slug}:${step.id}` });
        if (step.kind === "choice") lines.push({ course: mission.course, speaker: step.speaker, text: step.nextLine, origin: `mission:${mission.slug}:${step.id}` });
      }
    }
  }
  if (!sectionArg || sectionArg === "stories") {
    for (const story of newScenarios ? EXTRA_STORIES : ALL_STORIES) {
      if (courseArg && story.course !== courseArg) continue;
      for (const node of story.nodes) {
        if (node.kind === "scene") lines.push({ course: story.course, speaker: node.speaker, text: node.sk, origin: `story:${story.slug}:${node.id}` });
      }
    }
  }
  const unique = new Map<string, Clip>();
  for (const line of lines) if (normalizeText(line.text) && !unique.has(keyFor(line))) unique.set(keyFor(line), line);
  return [...unique.values()];
}
function audioLocation(clip: Clip, voice: string) {
  const hash = createHash("sha256").update(JSON.stringify([clip.course, clip.speaker, normalizeText(clip.text), VOICE_MODEL, voice])).digest("hex").slice(0, 24);
  return {
    absolute: join(audioDir, clip.course, `${hash}.mp3`),
    publicPath: `/audio/flunio-voice/${clip.course}/${hash}.mp3`,
  };
}
async function requestAudio(text: string, voice: string): Promise<Uint8Array> {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) throw Error("Missing ELEVENLABS_API_KEY in .env.local");
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voice)}?output_format=${OUTPUT_FORMAT}`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text, model_id: VOICE_MODEL,
        voice_settings: { stability: 0.52, similarity_boost: 0.8, style: 0.12, use_speaker_boost: true },
      }),
    });
    if (res.ok) {
      const data = new Uint8Array(await res.arrayBuffer());
      if (data.byteLength < 1000) throw Error("ElevenLabs returned an unexpectedly small audio file");
      return data;
    }
    const detail = (await res.text()).slice(0, 350);
    if (attempt === 4 || ![409, 429, 500, 502, 503, 504].includes(res.status)) throw Error(`ElevenLabs HTTP ${res.status}: ${detail}`);
    const retryAfter = Number(res.headers.get("retry-after"));
    const delay = Number.isFinite(retryAfter) && retryAfter > 0 ? Math.min(retryAfter * 1000, 20_000) : attempt * 1200;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  throw Error("Audio generation failed");
}
function saveManifest(manifest: Saved) {
  mkdirSync(dirname(manifestFile), { recursive: true });
  const temporary = `${manifestFile}.tmp`;
  writeFileSync(temporary, JSON.stringify(Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b))), null, 2) + "\n", "utf8");
  renameSync(temporary, manifestFile);
}
async function main() {
  if (help) {
    console.log("Preview new content only: npm run tts:learning -- --new-scenarios");
    console.log("Preview all content: npm run tts:learning -- --course=sk");
    console.log("Paid pilot: npm run tts:learning -- --new-scenarios --course=sk --generate --limit=3");
    console.log("Paid full generation for NEW scenarios only: npm run tts:learning -- --new-scenarios --generate --all");
    console.log("Paid full generation (all material): npm run tts:learning -- --generate --all");
    console.log("Options: --new-scenarios --course=sk|cs|pl --section=missions|stories --force --allow-voice-fallback");
    return;
  }
  const manifest: Saved = existsSync(manifestFile) ? JSON.parse(readFileSync(manifestFile, "utf8")) : {};
  const clips = uniqueClips();
  const pending: Array<{ clip: Clip; voice: string; path: ReturnType<typeof audioLocation> }> = [];
  let existing = 0;
  let voiceMissing = 0;
  let roleFallbacks = 0;
  const fallbackExamples = new Set<string>();
  for (const clip of clips) {
    const selection = pickVoice(clip);
    if (!selection.voice) voiceMissing++;
    if (selection.fallback) {
      roleFallbacks++;
      fallbackExamples.add(`${clip.course} / ${clip.speaker}: ${fallbackEnvName(clip.course, selection.fallback)}`);
    }
    // A dry-run can still count characters when no paid account is configured.
    const voice = selection.voice || "VOICE_NOT_CONFIGURED";
    const path = audioLocation(clip, voice);
    if (!force && existsSync(path.absolute) && statSync(path.absolute).size > 1000) {
      manifest[keyFor(clip)] = path.publicPath;
      existing++;
      continue;
    }
    pending.push({ clip, voice, path });
  }
  const chars = pending.reduce((total, x) => total + normalizeText(x.clip.text).length, 0);
  console.log(`FLUNIO VOICE | ${generate ? "PAID GENERATION" : "DRY RUN (no charge)"}${newScenarios ? " | NEW SCENARIOS ONLY" : ""}`);
  console.log(`Unique lines: ${clips.length}; existing MP3: ${existing}; pending: ${pending.length}; missing voice configuration: ${voiceMissing}`);
  console.log(`Role-specific voice fallbacks: ${roleFallbacks} (using a configured course default voice)`);
  if (fallbackExamples.size) {
    console.log("Role voice IDs not configured (no secret values displayed):");
    for (const entry of [...fallbackExamples].sort()) console.log(`  ${entry}`);
  }
  console.log(`Pending characters: ${chars} (~${chars} credits with Eleven Multilingual v2; confirm current ElevenLabs billing)`);
  console.log("By course:", Object.fromEntries((["sk", "cs", "pl"] as Course[]).map(c => [c, pending.filter(x => x.clip.course === c).length])));
  for (const x of pending.slice(0, 6)) console.log(`  ${x.clip.course} / ${x.clip.speaker}: ${normalizeText(x.clip.text).slice(0, 100)}`);
  if (!generate) { console.log("No generation performed. Use --generate --limit=5 to create a small paid sample."); return; }
  if (voiceMissing) throw Error("Missing a voice even for some course defaults in .env.local; no API calls were sent.");
  if (roleFallbacks && !allowVoiceFallback) throw Error("Some speakers would use a course default voice instead of a matching male/female voice. Configure the IDs shown above or explicitly add --allow-voice-fallback; no API calls were sent.");
  if (!process.env.ELEVENLABS_API_KEY) throw Error("Missing ELEVENLABS_API_KEY in .env.local; no API calls were sent.");
  const batch = all ? pending : pending.slice(0, Number(limitArg));
  console.log(`Approved batch: ${batch.length} clips / ${batch.reduce((n, v) => n + normalizeText(v.clip.text).length, 0)} characters`);
  // Include any existing recordings in the manifest even if the batch is incomplete.
  saveManifest(manifest);
  for (const [index, item] of batch.entries()) {
    mkdirSync(dirname(item.path.absolute), { recursive: true });
    const audio = await requestAudio(normalizeText(item.clip.text), item.voice);
    const temp = `${item.path.absolute}.tmp`;
    writeFileSync(temp, audio);
    renameSync(temp, item.path.absolute);
    manifest[keyFor(item.clip)] = item.path.publicPath;
    saveManifest(manifest);
    console.log(`[${index + 1}/${batch.length}] Saved ${item.path.publicPath} (${audio.byteLength} bytes)`);
  }
  console.log("Done. Listen to the samples before generating the full batch.");
}
main().catch(err => { console.error("Voice generation stopped:", err instanceof Error ? err.message : err); process.exitCode = 1; });
