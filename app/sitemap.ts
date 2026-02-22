import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://slovak-study.com";
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
    },

    // ✅ SEO landing pages
    {
      url: `${baseUrl}/slovak-for-ukrainians`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/ru/slovak-for-ukrainians`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/vyvchennia-slovatskoi-movy-online`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/ru/vyvchennia-slovatskoi-movy-online`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/grammar`,
      lastModified: now,
    },

    // 🔹 Grammar topics
    {
      url: `${baseUrl}/grammar/alphabet`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/grammar/verbs-present`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/grammar/cases`,
      lastModified: now,
    },

    {
      url: `${baseUrl}/dictionary`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/practice`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/learning/a0`,
      lastModified: now,
    },
  ];
}