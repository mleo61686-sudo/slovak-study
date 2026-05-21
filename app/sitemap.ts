import type { MetadataRoute } from "next";
import { SEO_MAP } from "./seo-pages/seoMap";

const SITE_URL = "https://flunio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticUrls: string[] = [
    // рівні
    "/learning/a0",
    "/learning/a1",
    "/learning/a2",
    "/learning/b1",
    "/learning/b2",

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

  const urls = Array.from(new Set([...seoUrls, ...staticUrls]));

  return urls.map((url) => ({
    url: `${SITE_URL}${url === "/" ? "" : url}`,
    lastModified: now,
  }));
}