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

  const item = slang.find((s) => normalizeWord(s.sk) === normalizedWord);

  if (!item) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-10 theme-text">
      {/* HEADER */}
      <div className="theme-home-soft-card rounded-2xl p-6">
        <h1 className="text-3xl font-bold theme-text">{item.sk}</h1>

        <div className="mt-2 text-lg theme-text-muted">
          {item.ua} / {item.ru} / {item.en}
        </div>
      </div>

      {/* EXAMPLE */}
      <div className="theme-home-soft-card rounded-2xl p-5">
        <div className="mb-2 text-sm theme-text-muted">Приклад</div>

        <div className="text-lg font-medium theme-text">{item.exampleSk}</div>

        <div className="theme-text-muted">
          {item.exampleUa} / {item.exampleRu} / {item.exampleEn}
        </div>
      </div>

      {/* TAGS */}
      <div className="flex gap-2 text-sm">
        <span className="theme-pill rounded-full px-3 py-1">
          {item.level}
        </span>

        <span className="theme-pill rounded-full px-3 py-1">
          {item.category}
        </span>
      </div>
    </main>
  );
}