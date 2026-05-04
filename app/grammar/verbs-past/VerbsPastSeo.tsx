"use client";

import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import {
  PAST_SEO_CONTENT,
  type PastSeoSection,
} from "./verbs-past-seo-data";

function SectionBlock({ section }: { section: PastSeoSection }) {
  return (
    <div className="theme-home-soft-card rounded-3xl p-5 shadow-[0_0_24px_rgba(34,211,238,0.06)]">
      <h3 className="theme-text text-xl font-semibold">{section.heading}</h3>

      <div className="theme-text-muted mt-4 space-y-3 text-sm leading-relaxed sm:text-base">
        {section.body?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        {section.bullets ? (
          <ul className="space-y-2">
            {section.bullets.map((item) => {
              const [first, ...rest] = item.split(" — ");

              return (
                <li
                  key={item}
                  className="theme-home-soft-card rounded-2xl px-4 py-3"
                >
                  <span className="theme-action-link font-semibold">
                    {first}
                  </span>

                  {rest.length ? (
                    <span className="theme-text-muted">
                      {" "}
                      — {rest.join(" — ")}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function getBadgeLabel(lang: Lang) {
  if (lang === "ru") return "Грамматика · Прошедшее время";
  if (lang === "en") return "Grammar · Past tense";
  return "Граматика · Минулий час";
}

export default function VerbsPastSeo() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const safeLang: Lang = lang === "ru" || lang === "en" ? lang : "ua";

  const course: "sk" | "cs" | "pl" =
    courseId === "cs" ? "cs" : courseId === "pl" ? "pl" : "sk";

  const content = PAST_SEO_CONTENT[safeLang][course];

  return (
    <section className="space-y-6">
      <div className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-4">
          <div className="theme-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            {getBadgeLabel(safeLang)}
          </div>

          <h2 className="theme-text text-3xl font-semibold leading-tight tracking-tight">
            {content.title}
          </h2>

          <div className="theme-text-muted space-y-3 text-sm leading-relaxed sm:text-base">
            {content.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {content.sections.map((section) => (
        <SectionBlock key={section.heading} section={section} />
      ))}
    </section>
  );
}