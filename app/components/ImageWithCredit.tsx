"use client";

type Props = {
  src: string;
  alt: string;
  credit?: string;
  className?: string;
};

export default function ImageWithCredit({ src, alt, credit, className }: Props) {
  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full rounded-2xl border bg-white object-cover"
        loading="lazy"
      />
      {credit ? (
        <figcaption className="mt-2 text-xs text-slate-500">
          {credit}
        </figcaption>
      ) : null}
    </figure>
  );
}