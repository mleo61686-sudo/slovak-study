import type { MetadataRoute } from "next";
import { SEO_MAP } from "./seo-pages/seoMap";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: string[] = [
    "/",

    // основні публічні сторінки
    "/learning",
    "/dictionary",
    "/grammar",
    "/updates",

    // сторінки рівнів
    "/learning/levels/a0",
    "/learning/levels/a1",
    "/learning/levels/a2",
    "/learning/levels/b1",
    "/learning/levels/b2",

    // граматика
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

  return urls.map((url) => ({
    url: `${SITE_URL}${url === "/" ? "" : url}`,
    changeFrequency: "weekly",
    priority: url === "/" ? 1 : 0.7,
  }));
}