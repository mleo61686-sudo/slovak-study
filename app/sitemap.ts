import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://slovak-study.vercel.app";

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/grammar`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/dictionary`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/practice`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/learning/a0`,
      lastModified: new Date(),
    },
  ];
}
