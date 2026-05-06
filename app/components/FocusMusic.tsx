"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

type Track = {
  id: string;
  src: string;
};

const TRACKS: Track[] = [
  {
    id: "calm-1",
    src: "/music/calm-1.mp3",
  },
  {
    id: "calm-2",
    src: "/music/calm-2.mp3",
  },
  {
    id: "focus-1",
    src: "/music/focus-1.mp3",
  },
  {
    id: "focus-2",
    src: "/music/focus-2.mp3",
  },
  {
    id: "focus-3",
    src: "/music/focus-3.mp3",
  },
  {
    id: "ambient-1",
    src: "/music/ambient-1.mp3",
  },
];

const STORAGE_KEY = "flunio.focusMusic.v1";

// 100% у повзунку = 22% реальної гучності браузера.
// Так музика залишається фоном і не перекриває озвучку слів.
const MAX_REAL_VOLUME = 0.22;

const T: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    turnOn: string;
    turnOff: string;
    volume: string;
    loading: string;
    error: string;
  }
> = {
  ua: {
    title: "Фонова музика",
    subtitle: "Спокійна музика під час навчання",
    turnOn: "Увімкнути",
    turnOff: "Вимкнути",
    volume: "Гучність",
    loading: "...",
    error: "Не вдалося увімкнути музику. Перевір mp3 файли.",
  },
  ru: {
    title: "Фоновая музыка",
    subtitle: "Спокойная музыка во время обучения",
    turnOn: "Включить",
    turnOff: "Выключить",
    volume: "Громкость",
    loading: "...",
    error: "Не удалось включить музыку. Проверь mp3 файлы.",
  },
  en: {
    title: "Background music",
    subtitle: "Calm music while learning",
    turnOn: "Turn on",
    turnOff: "Turn off",
    volume: "Volume",
    loading: "...",
    error: "Could not start music. Check the mp3 files.",
  },
};

type SavedState = {
  volume: number;
};

type WebKitAudioWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

let globalAudio: HTMLAudioElement | null = null;
let globalVolume = 10;

let globalAudioContext: AudioContext | null = null;
let globalGainNode: GainNode | null = null;
let globalSourceNode: MediaElementAudioSourceNode | null = null;

function shuffleTracks() {
  const indexes = TRACKS.map((_, index) => index);

  for (let i = indexes.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[randomIndex]] = [indexes[randomIndex], indexes[i]];
  }

  return indexes;
}

let randomQueue: number[] = shuffleTracks();

function getNextTrackIndex() {
  if (randomQueue.length === 0) {
    randomQueue = shuffleTracks();
  }

  const nextIndex = randomQueue.shift();

  if (typeof nextIndex !== "number") {
    return 0;
  }

  return nextIndex;
}

function getDefaultState(): SavedState {
  return {
    volume: 10,
  };
}

function getRealVolume(uiVolume: number) {
  const safeVolume = Math.min(100, Math.max(0, uiVolume));

  // Нелінійна шкала:
  // 10% UI = дуже тихо
  // 50% UI = помірно
  // 100% UI = максимум 22% реальної гучності
  return Math.pow(safeVolume / 100, 2) * MAX_REAL_VOLUME;
}

function getAudio() {
  if (typeof window === "undefined") return null;

  if (!globalAudio) {
    globalAudio = new Audio();
    globalAudio.preload = "none";
    globalAudio.loop = false;
    globalAudio.crossOrigin = "anonymous";

    // Важливо: цей ended listener живе глобально,
    // а не всередині компонента FocusMusic.
    // Тому музика продовжує грати навіть якщо меню закрите.
    globalAudio.addEventListener("ended", () => {
      playNextRandomTrackGlobal();
    });
  }

  return globalAudio;
}

function setupAudioGraph() {
  if (typeof window === "undefined") return null;

  const audio = getAudio();
  if (!audio) return null;

  if (!globalAudioContext) {
    const AudioContextCtor =
      window.AudioContext ?? (window as WebKitAudioWindow).webkitAudioContext;

    if (!AudioContextCtor) {
      return null;
    }

    globalAudioContext = new AudioContextCtor();
  }

  if (!globalGainNode) {
    globalGainNode = globalAudioContext.createGain();
    globalGainNode.connect(globalAudioContext.destination);
  }

  if (!globalSourceNode) {
    globalSourceNode = globalAudioContext.createMediaElementSource(audio);
    globalSourceNode.connect(globalGainNode);
  }

  return {
    audioContext: globalAudioContext,
    gainNode: globalGainNode,
  };
}

function setPlaybackVolume(uiVolume: number) {
  const audio = getAudio();
  if (!audio) return;

  globalVolume = uiVolume;

  const realVolume = getRealVolume(uiVolume);
  const graph = setupAudioGraph();

  if (graph?.gainNode) {
    // На мобільних браузерах audio.volume часто ігнорується,
    // тому реальну гучність контролюємо через GainNode.
    graph.gainNode.gain.value = realVolume;

    // Коли звук іде через Web Audio, сам елемент лишаємо на 100%.
    audio.volume = 1;
    return;
  }

  // Fallback для браузерів без Web Audio.
  audio.volume = realVolume;
}

function playNextRandomTrackGlobal() {
  const audio = getAudio();
  if (!audio) return;

  const nextIndex = getNextTrackIndex();
  const nextTrack = TRACKS[nextIndex];

  if (!nextTrack) return;

  setPlaybackVolume(globalVolume);

  audio.src = nextTrack.src;
  audio.loop = false;

  if (globalAudioContext?.state === "suspended") {
    void globalAudioContext.resume().catch(() => {});
  }

  void audio.play().catch(() => {
    // Не крашимо UI, якщо браузер або файл зупинив відтворення.
  });
}

function loadSavedState(): SavedState {
  if (typeof window === "undefined") return getDefaultState();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();

    const parsed = JSON.parse(raw) as Partial<SavedState>;

    const volume =
      typeof parsed.volume === "number" &&
      Number.isFinite(parsed.volume) &&
      parsed.volume >= 0 &&
      parsed.volume <= 100
        ? parsed.volume
        : 10;

    return {
      volume,
    };
  } catch {
    return getDefaultState();
  }
}

export default function FocusMusic() {
  const { lang } = useLanguage();
  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = T[L];

  const [volume, setVolume] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = loadSavedState();
    const audio = getAudio();

    setVolume(saved.volume);
    globalVolume = saved.volume;

    if (audio) {
      setPlaybackVolume(saved.volume);
      setIsPlaying(!audio.paused);
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;

    function handlePlay() {
      setIsPlaying(true);
      setError("");
    }

    function handlePause() {
      setIsPlaying(false);
    }

    function handleError() {
      setIsPlaying(false);
      setIsLoading(false);
      setError(t.error);
    }

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, [t.error]);

  useEffect(() => {
    if (!isReady) return;

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        volume,
      })
    );
  }, [volume, isReady]);

  useEffect(() => {
    setPlaybackVolume(volume);
  }, [volume]);

  async function startRandomMusic() {
    const audio = getAudio();
    if (!audio || isLoading) return;

    setError("");

    try {
      setIsLoading(true);

      const graph = setupAudioGraph();

      if (graph?.audioContext.state === "suspended") {
        await graph.audioContext.resume();
      }

      const nextIndex = getNextTrackIndex();
      const nextTrack = TRACKS[nextIndex];

      if (!nextTrack) {
        setError(t.error);
        return;
      }

      setPlaybackVolume(volume);

      audio.src = nextTrack.src;
      audio.loop = false;

      await audio.play();

      setIsPlaying(true);
      setError("");
    } catch {
      setIsPlaying(false);
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  }

  function stopMusic() {
    const audio = getAudio();
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  }

  function toggleMusic() {
    if (isPlaying) {
      stopMusic();
      return;
    }

    void startRandomMusic();
  }

  function handleVolumeChange(nextValue: string) {
    const nextVolume = Number(nextValue);
    if (!Number.isFinite(nextVolume)) return;

    const safeVolume = Math.min(100, Math.max(0, nextVolume));
    setVolume(safeVolume);
  }

  return (
    <div className="mx-2 my-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-white transition hover:border-cyan-400/25">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm">🎵</span>
            <p className="truncate text-sm font-semibold text-white">
              {t.title}
            </p>
          </div>

          <p className="mt-0.5 text-xs leading-snug text-white/55">
            {t.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleMusic}
          disabled={isLoading}
          className={[
            "shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold transition",
            "active:scale-95 disabled:cursor-not-allowed disabled:opacity-60",
            isPlaying
              ? "border-fuchsia-400/40 bg-fuchsia-400/15 text-fuchsia-100 hover:bg-fuchsia-400/25"
              : "border-cyan-400/40 bg-cyan-400/15 text-cyan-100 hover:bg-cyan-400/25",
          ].join(" ")}
        >
          {isLoading ? t.loading : isPlaying ? t.turnOff : t.turnOn}
        </button>
      </div>

      {isPlaying ? (
        <div className="mt-2">
          <div className="mb-1 flex items-center justify-between text-xs text-white/55">
            <span>{t.volume}</span>
            <span>{volume}%</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={(event) => handleVolumeChange(event.target.value)}
            className="h-2 w-full accent-cyan-400"
          />
        </div>
      ) : null}

      {error ? (
        <p className="mt-2 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          {error}
        </p>
      ) : null}
    </div>
  );
}