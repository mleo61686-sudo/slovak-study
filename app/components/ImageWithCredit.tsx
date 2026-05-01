"use client";

type Props = {
  src: string;
  alt: string;
  credit?: string;
  className?: string;
};

export default function ImageWithCredit({
  src,
  alt,
  credit,
  className,
}: Props) {
  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full rounded-2xl border border-white/10 bg-white/5 object-cover shadow-[0_0_18px_rgba(34,211,238,0.08)] backdrop-blur theme-simple:border-slate-200 theme-simple:bg-white theme-simple:shadow-sm"
        loading="lazy"
      />

      {credit ? (
        <figcaption className="mt-2 text-xs theme-text-subtle">
          {credit}
        </figcaption>
      ) : null}
    </figure>
  );
}