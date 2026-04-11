"use client";

import dynamic from "next/dynamic";

function WordsStatsSkeleton() {
  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-40 rounded bg-slate-200" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 rounded-2xl bg-slate-100" />
          <div className="h-20 rounded-2xl bg-slate-100" />
          <div className="h-20 rounded-2xl bg-slate-100" />
          <div className="h-20 rounded-2xl bg-slate-100" />
        </div>
        <div className="h-2 w-full rounded bg-slate-200" />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="h-20 rounded-2xl bg-slate-100" />
          <div className="h-20 rounded-2xl bg-slate-100" />
          <div className="h-20 rounded-2xl bg-slate-100" />
          <div className="h-20 rounded-2xl bg-slate-100" />
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