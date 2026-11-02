/** Flunio voice playback: reviewed static recordings first, browser fallback second. */
import type { Course } from "../personal-plan/planner";
import manifest from "./voiceManifest.json";

export const SPEECH_LOCALE: Record<Course, string> = { sk: "sk-SK", cs: "cs-CZ", pl: "pl-PL" };
let currentRecording: HTMLAudioElement | null = null;

function audioKey(course: Course, text: string, speaker: string): string {
  return JSON.stringify([course, speaker, text.normalize("NFC").replace(/\s+/g, " ").trim()]);
}

/** Only locally stored static audio is trusted; no client-side ElevenLabs requests. */
export function recordedPracticeAudio(course: Course, text: string, speaker = ""): string | undefined {
  const files: Record<string, string> = manifest;
  return files[audioKey(course, text, speaker)] ?? files[audioKey(course, text, "")];
}

export function stopPracticeAudio() {
  if (typeof window === "undefined") return;
  currentRecording?.pause();
  currentRecording = null;
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

export async function playPracticeAudio(course: Course, text: string, audioSrc?: string, speaker = ""): Promise<boolean> {
  if (typeof window === "undefined") return false;
  stopPracticeAudio();
  const src = audioSrc || recordedPracticeAudio(course, text, speaker);
  if (src && src.startsWith("/") && !src.startsWith("//")) {
    const recording = new Audio(src);
    currentRecording = recording;
    try { await recording.play(); return true; } catch { currentRecording = null; }
  }
  if (!("speechSynthesis" in window)) return false;
  const voices = window.speechSynthesis.getVoices();
  const locale = SPEECH_LOCALE[course];
  const voice = voices.find(v => v.lang.toLowerCase() === locale.toLowerCase()) ||
    voices.find(v => v.lang.toLowerCase().startsWith(course));
  if (!voice) return false;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = locale;
  utterance.voice = voice;
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
  return true;
}
