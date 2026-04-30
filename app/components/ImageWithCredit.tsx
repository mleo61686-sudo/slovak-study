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
        className="w-full rounded-2xl border border-white/10 bg-white/5 object-cover shadow-[0_0_18px_rgba(34,211,238,0.08)] backdrop-blur"
        loading="lazy"
      />

      {credit ? (
        <figcaption className="mt-2 text-xs text-white/45">
          {credit}
        </figcaption>
      ) : null}
    </figure>
  );
}