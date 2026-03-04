"use client";

import Link from "next/link";
import { useActiveCourse } from "@/hooks/useActiveCourse";
import { useLanguage } from "@/lib/src/useLanguage";
import { COURSES } from "@/lib/course";


export default function CourseGate({
    children,
}: {
    children: React.ReactNode;
}) {
    const { course, ready } = useActiveCourse();
    const { lang } = useLanguage();

    if (!ready) return null;

    const def = COURSES.find((c) => c.id === course);

    if (!def || !def.enabled) {
        const name = def?.title ?? "This course";

        return (
            <main className="mx-auto w-full max-w-3xl px-4 py-10">
                <div className="rounded-2xl border bg-white p-6">
                    <div className="text-xl font-semibold">
                        {lang === "ua" ? `${name} — скоро` : `${name} — скоро`}
                    </div>
                    <p className="mt-2 text-slate-600">
                        {lang === "ua"
                            ? "Цей курс ще недоступний. Перемкнись назад на словацьку."
                            : "Этот курс пока недоступен. Переключись обратно на словацкий."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                            href="/learn"
                            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                        >
                            {lang === "ua" ? "Вибрати мову" : "Выбрать язык"}
                        </Link>

                        <Link
                            href="/learning"
                            className="rounded-xl border px-4 py-2 text-sm font-medium"
                        >
                            {lang === "ua" ? "Назад" : "Назад"}
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return <>{children}</>;
}