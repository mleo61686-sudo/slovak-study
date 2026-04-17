import { notFound } from "next/navigation";
import { getSlangByCourse } from "@/data/slang";

function normalizeWord(value: string) {
  return decodeURIComponent(value).trim().toLowerCase();
}

const COURSES = ["sk", "cs", "pl"] as const;

function getAllSlang() {
  return COURSES.flatMap((courseId) => getSlangByCourse(courseId));
}

export function generateStaticParams() {
  const slang = getAllSlang();

  return slang.map((item) => ({
    word: item.sk.toLowerCase(),
  }));
}

type PageProps = {
  params: Promise<{
    word: string;
  }>;
};

export default async function SlangWordPage({ params }: PageProps) {
  const { word } = await params;
  const normalizedWord = normalizeWord(word);

  const slang = getAllSlang();

  const item = slang.find(
    (s) => normalizeWord(s.sk) === normalizedWord
  );

  if (!item) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold">{item.sk}</h1>

      <div className="text-lg text-slate-700">
        {item.ua} / {item.ru} / {item.en}
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-sm text-slate-500">Приклад</div>

        <div className="text-lg">{item.exampleSk}</div>

        <div className="text-slate-600">
          {item.exampleUa} / {item.exampleRu} / {item.exampleEn}
        </div>
      </div>

      <div className="flex gap-2 text-sm">
        <span className="rounded-full border px-3 py-1">
          {item.level}
        </span>

        <span className="rounded-full border px-3 py-1">
          {item.category}
        </span>
      </div>
    </main>
  );
}