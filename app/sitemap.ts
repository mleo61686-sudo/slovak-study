import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://flunio.com";
  const now = new Date();

  const urls: string[] = [
    `${baseUrl}/`,

    `${baseUrl}/slovak-for-ukrainians`,
    `${baseUrl}/vyvchennia-slovatskoi-movy-online`,
    `${baseUrl}/learn-slovak`,
    `${baseUrl}/slovak-grammar`,

    `${baseUrl}/learning`,
    `${baseUrl}/learning/a0`,
    `${baseUrl}/learning/a1`,
    `${baseUrl}/learning/a2`,
    `${baseUrl}/learning/b1`,
    `${baseUrl}/learning/b2`,
    `${baseUrl}/grammar`,
    `${baseUrl}/dictionary`,

    `${baseUrl}/grammar/alphabet`,
    `${baseUrl}/grammar/verbs-present`,
    `${baseUrl}/grammar/cases`,
    `${baseUrl}/grammar/slovak-slang`,

    `${baseUrl}/ru/slovak-for-ukrainians`,
    `${baseUrl}/ru/vyvchennia-slovatskoi-movy-online`,
    `${baseUrl}/ru/learning`,
    `${baseUrl}/ru/grammar`,
    `${baseUrl}/ru/dictionary`,
  ];

  return urls.map((url) => ({
    url,
    lastModified: now,
  }));
}