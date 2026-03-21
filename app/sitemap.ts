import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://flunio.com";
  const now = new Date();

  const urls: string[] = [
    // основа
    `${baseUrl}/`,
    `${baseUrl}/learning`,
    `${baseUrl}/dictionary`,
    `${baseUrl}/grammar`,

    // рівні
    `${baseUrl}/learning/a0`,
    `${baseUrl}/learning/a1`,
    `${baseUrl}/learning/a2`,
    `${baseUrl}/learning/b1`,
    `${baseUrl}/learning/b2`,

    // граматика
    `${baseUrl}/grammar/alphabet`,
    `${baseUrl}/grammar/verbs-present`,
    `${baseUrl}/grammar/cases`,
    `${baseUrl}/grammar/slovak-slang`,

    // словацька SEO
    `${baseUrl}/learn-slovak`,
    `${baseUrl}/vyvchennia-slovatskoi-movy-online`,
    `${baseUrl}/ru/vyvchennia-slovatskoi-movy-online`,

    // чеська SEO (НОВЕ)
    `${baseUrl}/learn-czech`,
    `${baseUrl}/vyvchennia-cheskoi-movy-online`,
    `${baseUrl}/ru/vyvchennia-cheskoi-movy-online`,

    // RU основні
    `${baseUrl}/ru/learning`,
    `${baseUrl}/ru/grammar`,
    `${baseUrl}/ru/dictionary`,
  ];

  return urls.map((url) => ({
    url,
    lastModified: now,
  }));
}