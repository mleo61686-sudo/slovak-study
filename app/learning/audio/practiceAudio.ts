/** A single playback adapter for sk / cs / pl.
 * Add an approved ElevenLabs-produced static asset URL to a scene's `audioSrc`
 * later; no API key or paid TTS request is sent from the browser.
 */
import type { Course } from "../personal-plan/planner";
export const SPEECH_LOCALE: Record<Course, string> = { sk: "sk-SK", cs: "cs-CZ", pl: "pl-PL" };
let currentRecording: HTMLAudioElement | null = null;

export function stopPracticeAudio() {
  if (typeof window === "undefined") return;
  currentRecording?.pause();
  currentRecording = null;
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

export async function playPracticeAudio(course: Course, text: string, audioSrc?: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  stopPracticeAudio();
  if (audioSrc && audioSrc.startsWith("/") && !audioSrc.startsWith("//")) {
    const recording = new Audio(audioSrc);
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
