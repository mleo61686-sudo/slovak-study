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
      {/* HEADER */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h1 className="text-3xl font-bold text-white">{item.sk}</h1>

        <div className="mt-2 text-lg text-white/70">
          {item.ua} / {item.ru} / {item.en}
        </div>
      </div>

      {/* EXAMPLE */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
        <div className="text-sm text-white/50 mb-2">Приклад</div>

        <div className="text-lg font-medium text-white">
          {item.exampleSk}
        </div>

        <div className="text-white/70">
          {item.exampleUa} / {item.exampleRu} / {item.exampleEn}
        </div>
      </div>

      {/* TAGS */}
      <div className="flex gap-2 text-sm">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
          {item.level}
        </span>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
          {item.category}
        </span>
      </div>
    </main>
  );
}