"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Lang = "ua" | "ru" | "en";

type AvatarCropModalProps = {
  file: File;
  lang: Lang;
  busy?: boolean;
  onCancel: () => void;
  onConfirm: (dataUrl: string) => void | Promise<void>;
};

type ImageMeta = {
  width: number;
  height: number;
};

type Offset = {
  x: number;
  y: number;
};

const OUTPUT_SIZE = 384;
const MAX_DATA_URL_LENGTH = 620_000;

const UI = {
  ua: {
    title: "Обріж фото профілю",
    hint: "Перетягни фото та вибери потрібну частину в квадраті.",
    zoom: "Масштаб",
    cancel: "Скасувати",
    save: "Зберегти фото",
    saving: "Зберігаю…",
    loadError: "Не вдалося відкрити це зображення.",
  },
  ru: {
    title: "Обрежь фото профиля",
    hint: "Перетащи фото и выбери нужную часть внутри квадрата.",
    zoom: "Масштаб",
    cancel: "Отмена",
    save: "Сохранить фото",
    saving: "Сохраняю…",
    loadError: "Не удалось открыть это изображение.",
  },
  en: {
    title: "Crop profile photo",
    hint: "Drag the image and choose the part that should appear in the square.",
    zoom: "Zoom",
    cancel: "Cancel",
    save: "Save photo",
    saving: "Saving…",
    loadError: "Could not open this image.",
  },
} satisfies Record<Lang, Record<string, string>>;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function AvatarCropModal({
  file,
  lang,
  busy = false,
  onCancel,
  onConfirm,
}: AvatarCropModalProps) {
  const t = UI[lang] ?? UI.ua;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const [objectUrl, setObjectUrl] = useState("");
  const [imageMeta, setImageMeta] = useState<ImageMeta | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    const nextUrl = URL.createObjectURL(file);
    setObjectUrl(nextUrl);
    setImageMeta(null);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setError("");

    return () => URL.revokeObjectURL(nextUrl);
  }, [file]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !busy) {
        onCancel();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [busy, onCancel]);

  const displayMetrics = useMemo(() => {
    const viewportSize = viewportRef.current?.getBoundingClientRect().width ?? 300;

    if (!imageMeta) {
      return {
        viewportSize,
        scale: 1,
        width: viewportSize,
        height: viewportSize,
        maxX: 0,
        maxY: 0,
      };
    }

    const baseScale = Math.max(
      viewportSize / imageMeta.width,
      viewportSize / imageMeta.height,
    );
    const scale = baseScale * zoom;
    const width = imageMeta.width * scale;
    const height = imageMeta.height * scale;

    return {
      viewportSize,
      scale,
      width,
      height,
      maxX: Math.max(0, (width - viewportSize) / 2),
      maxY: Math.max(0, (height - viewportSize) / 2),
    };
  }, [imageMeta, zoom]);

  function clampOffset(next: Offset): Offset {
    return {
      x: clamp(next.x, -displayMetrics.maxX, displayMetrics.maxX),
      y: clamp(next.y, -displayMetrics.maxY, displayMetrics.maxY),
    };
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (!imageMeta || busy) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    setOffset(
      clampOffset({
        x: drag.originX + event.clientX - drag.startX,
        y: drag.originY + event.clientY - drag.startY,
      }),
    );
  }

  function finishDragging(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
    }
  }

  useEffect(() => {
    setOffset((current) => {
      const next = {
        x: clamp(current.x, -displayMetrics.maxX, displayMetrics.maxX),
        y: clamp(current.y, -displayMetrics.maxY, displayMetrics.maxY),
      };

      return next.x === current.x && next.y === current.y ? current : next;
    });
  }, [displayMetrics.maxX, displayMetrics.maxY]);

  function handleZoomChange(nextZoom: number) {
    setZoom(nextZoom);
  }

  async function handleConfirm() {
    const image = imageRef.current;
    const viewport = viewportRef.current;

    if (!image || !imageMeta || !viewport || busy) return;

    const viewportSize = viewport.getBoundingClientRect().width;
    const baseScale = Math.max(
      viewportSize / imageMeta.width,
      viewportSize / imageMeta.height,
    );
    const scale = baseScale * zoom;
    const sourceSize = viewportSize / scale;
    const sourceX = clamp(
      (imageMeta.width - sourceSize) / 2 - offset.x / scale,
      0,
      imageMeta.width - sourceSize,
    );
    const sourceY = clamp(
      (imageMeta.height - sourceSize) / 2 - offset.y / scale,
      0,
      imageMeta.height - sourceSize,
    );

    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;

    const context = canvas.getContext("2d");

    if (!context) {
      setError(t.loadError);
      return;
    }

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(
      image,
      sourceX,
      sourceY,
      sourceSize,
      sourceSize,
      0,
      0,
      OUTPUT_SIZE,
      OUTPUT_SIZE,
    );

    const webpQualities = [0.82, 0.72, 0.62];
    const jpegQualities = [0.84, 0.74, 0.64];
    let dataUrl = "";

    for (const quality of webpQualities) {
      const candidate = canvas.toDataURL("image/webp", quality);

      if (candidate.startsWith("data:image/webp;")) {
        dataUrl = candidate;
        if (candidate.length <= MAX_DATA_URL_LENGTH) break;
      }
    }

    if (!dataUrl || dataUrl.length > MAX_DATA_URL_LENGTH) {
      for (const quality of jpegQualities) {
        dataUrl = canvas.toDataURL("image/jpeg", quality);
        if (dataUrl.length <= MAX_DATA_URL_LENGTH) break;
      }
    }

    await onConfirm(dataUrl);
  }

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="avatar-crop-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) onCancel();
      }}
    >
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-950 p-5 text-white shadow-2xl sm:p-6">
        <div className="pr-8">
          <h2 id="avatar-crop-title" className="text-xl font-bold">
            {t.title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-300">{t.hint}</p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="absolute right-6 top-6 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/10 text-lg transition hover:bg-white/15 disabled:opacity-50"
          aria-label={t.cancel}
        >
          ×
        </button>

        <div className="mt-5 flex justify-center">
          <div
            ref={viewportRef}
            className="relative aspect-square w-[min(76vw,320px)] touch-none cursor-grab overflow-hidden rounded-3xl border-2 border-cyan-300/60 bg-slate-900 shadow-[0_0_40px_rgba(34,211,238,0.14)] active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDragging}
            onPointerCancel={finishDragging}
          >
            {objectUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={imageRef}
                src={objectUrl}
                alt=""
                draggable={false}
                onLoad={(event) => {
                  const image = event.currentTarget;
                  setImageMeta({
                    width: image.naturalWidth,
                    height: image.naturalHeight,
                  });
                  setError("");
                }}
                onError={() => setError(t.loadError)}
                className="pointer-events-none absolute left-1/2 top-1/2 max-w-none select-none"
                style={{
                  width: `${displayMetrics.width}px`,
                  height: `${displayMetrics.height}px`,
                  transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
                }}
              />
            ) : null}

            <div className="pointer-events-none absolute inset-3 rounded-2xl border border-dashed border-white/35" />
          </div>
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <label className="mt-5 grid gap-2">
          <span className="text-sm font-semibold text-slate-200">{t.zoom}</span>
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={zoom}
            disabled={!imageMeta || busy}
            onChange={(event) => handleZoomChange(Number(event.target.value))}
            className="w-full accent-cyan-400"
          />
        </label>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="min-h-11 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-50"
          >
            {t.cancel}
          </button>

          <button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={!imageMeta || !!error || busy}
            className="min-h-11 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? t.saving : t.save}
          </button>
        </div>
      </div>
    </div>
  );
}
