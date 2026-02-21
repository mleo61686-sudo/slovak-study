import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://slovak-study.com";

  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
    },
    {
      url: `${baseUrl}/grammar`,
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