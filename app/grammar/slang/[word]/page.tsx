import { notFound } from "next/navigation";
import { getSlangByCourse } from "@/data/slang";

export function generateStaticParams() {
  const slang = getSlangByCourse("sk");

  return slang.map((item) => ({
    word: item.sk.toLowerCase(),
  }));
}

type Props = {
  params: {
    word: string;
  };
};

export default function SlangWordPage({ params }: Props) {
  const slang = getSlangByCourse("sk");

  const item = slang.find(
    (s) => s.sk.toLowerCase() === params.word.toLowerCase()
  );

  if (!item) return notFound();

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold">{item.sk}</h1>

      <div className="text-lg text-slate-700">{item.ua}</div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-sm text-slate-500">Приклад</div>
        <div className="text-lg">{item.exampleSk}</div>
        <div className="text-slate-600">{item.exampleUa}</div>
      </div>

      <div className="flex gap-2 text-sm">
        <span className="rounded-full border px-3 py-1">{item.level}</span>
        <span className="rounded-full border px-3 py-1">{item.category}</span>
      </div>
    </main>
  );
}