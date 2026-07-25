import type { MetadataRoute } from "next";
import { SEO_MAP } from "./seo-pages/seoMap";
import { SITE_URL } from "@/lib/site";

const SEO_UPDATE_DATE = new Date("2026-07-25T00:00:00.000Z");

const LAST_MODIFIED: Record<string, Date> = {
  "/dictionary": SEO_UPDATE_DATE,
  "/grammar": SEO_UPDATE_DATE,
  "/czech-grammar": SEO_UPDATE_DATE,
  "/polish-vocabulary": SEO_UPDATE_DATE,
  "/slovak-for-beginners": SEO_UPDATE_DATE,
};

const COURSE_LANGUAGE_ALTERNATES: Record<string, Record<string, string>> = {
  "/learn-slovak": {
    en: `${SITE_URL}/learn-slovak`,
    uk: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
    ru: `${SITE_URL}/ru/learn-slovak`,
    "x-default": `${SITE_URL}/learn-slovak`,
  },
  "/vyvchennia-slovatskoi-movy-online": {
    en: `${SITE_URL}/learn-slovak`,
    uk: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
    ru: `${SITE_URL}/ru/learn-slovak`,
    "x-default": `${SITE_URL}/learn-slovak`,
  },
  "/ru/learn-slovak": {
    en: `${SITE_URL}/learn-slovak`,
    uk: `${SITE_URL}/vyvchennia-slovatskoi-movy-online`,
    ru: `${SITE_URL}/ru/learn-slovak`,
    "x-default": `${SITE_URL}/learn-slovak`,
  },
  "/learn-czech": {
    en: `${SITE_URL}/learn-czech`,
    uk: `${SITE_URL}/vyvchennia-cheskoi-movy-online`,
    ru: `${SITE_URL}/ru/learn-czech`,
    "x-default": `${SITE_URL}/learn-czech`,
  },
  "/vyvchennia-cheskoi-movy-online": {
    en: `${SITE_URL}/learn-czech`,
    uk: `${SITE_URL}/vyvchennia-cheskoi-movy-online`,
    ru: `${SITE_URL}/ru/learn-czech`,
    "x-default": `${SITE_URL}/learn-czech`,
  },
  "/ru/learn-czech": {
    en: `${SITE_URL}/learn-czech`,
    uk: `${SITE_URL}/vyvchennia-cheskoi-movy-online`,
    ru: `${SITE_URL}/ru/learn-czech`,
    "x-default": `${SITE_URL}/learn-czech`,
  },
  "/learn-polish": {
    en: `${SITE_URL}/learn-polish`,
    uk: `${SITE_URL}/vyvchennia-polskoi-movy-online`,
    ru: `${SITE_URL}/ru/learn-polish`,
    "x-default": `${SITE_URL}/learn-polish`,
  },
  "/vyvchennia-polskoi-movy-online": {
    en: `${SITE_URL}/learn-polish`,
    uk: `${SITE_URL}/vyvchennia-polskoi-movy-online`,
    ru: `${SITE_URL}/ru/learn-polish`,
    "x-default": `${SITE_URL}/learn-polish`,
  },
  "/ru/learn-polish": {
    en: `${SITE_URL}/learn-polish`,
    uk: `${SITE_URL}/vyvchennia-polskoi-movy-online`,
    ru: `${SITE_URL}/ru/learn-polish`,
    "x-default": `${SITE_URL}/learn-polish`,
  },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: string[] = [
    "/",

    // Main public product pages.
    "/learning",
    "/dictionary",
    "/grammar",
    "/updates",

    // Level pages.
    "/learning/levels/a0",
    "/learning/levels/a1",
    "/learning/levels/a2",
    "/learning/levels/b1",
    "/learning/levels/b2",

    // Grammar topics.
    "/grammar/alphabet",
    "/grammar/verbs-present",
    "/grammar/cases",
    "/grammar/slovak-slang",
    "/grammar/verbs-past",
    "/grammar/verbs-future",
  ];

  const seoUrls = SEO_MAP.filter(
    (page) => page.status === "keep" && page.inSitemap
  ).map((page) => page.url);

  const urls = Array.from(new Set([...staticUrls, ...seoUrls]));

  return urls.map((path) => {
    const item: MetadataRoute.Sitemap[number] = {
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      changeFrequency: "weekly",
      priority: path === "/" ? 1 : 0.7,
    };

    const lastModified = LAST_MODIFIED[path];
    if (lastModified) {
      item.lastModified = lastModified;
    }

    const languages = COURSE_LANGUAGE_ALTERNATES[path];
    if (languages) {
      item.alternates = { languages };
    }

    return item;
  });
}
