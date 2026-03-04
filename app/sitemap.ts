import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://slovak-study.com";
  const now = new Date();

  const urls: string[] = [
    // ✅ Home (IMPORTANT: with trailing slash)
    `${baseUrl}/`,

    // ✅ SEO landing pages (UA)
    `${baseUrl}/slovak-for-ukrainians`,
    `${baseUrl}/vyvchennia-slovatskoi-movy-online`,
    `${baseUrl}/learn-slovak`, // ⭐ NEW
    `${baseUrl}/slovak-grammar`,


    // ✅ Main app pages (UA)
    `${baseUrl}/learning`,
    `${baseUrl}/learning/a0`,
    `${baseUrl}/learning/a1`,
    `${baseUrl}/learning/a2`,
    `${baseUrl}/learning/b1`,
    `${baseUrl}/grammar`,
    `${baseUrl}/dictionary`,
    

    // ✅ Grammar topics (UA)
    `${baseUrl}/grammar/alphabet`,
    `${baseUrl}/grammar/verbs-present`,
    `${baseUrl}/grammar/cases`,
    `${baseUrl}/grammar/slovak-slang`, // ✅ NEW

    // ✅ RU versions (if these routes exist)
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