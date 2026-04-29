"use client";

import dynamic from "next/dynamic";

function WordsStatsSkeleton() {
  return (
    <section className="flunio-card min-w-0 rounded-3xl p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-40 rounded bg-white/15" />

        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 rounded-2xl bg-white/10" />
          <div className="h-20 rounded-2xl bg-white/10" />
          <div className="h-20 rounded-2xl bg-white/10" />
          <div className="h-20 rounded-2xl bg-white/10" />
        </div>

        <div className="h-2 w-full rounded bg-white/15" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="h-20 rounded-2xl bg-white/10" />
          <div className="h-20 rounded-2xl bg-white/10" />
          <div className="h-20 rounded-2xl bg-white/10" />
          <div className="h-20 rounded-2xl bg-white/10" />
        </div>
      </div>
    </section>
  );
}

const WordsStats = dynamic(() => import("@/app/components/WordsStats"), {
  ssr: false,
  loading: () => <WordsStatsSkeleton />,
});

export default function WordsStatsClient() {
  return <WordsStats />;
}