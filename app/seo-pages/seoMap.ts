export type SeoPageLang = "uk" | "ru" | "en";

export type SeoCourse = "sk" | "cs" | "pl" | "general";

export type SeoPageStatus =
  | "keep"
  | "review"
  | "remove_from_sitemap"
  | "do_not_index"
  | "future";

export type SeoPageIntentType =
  | "course"
  | "grammar"
  | "vocabulary"
  | "how_to_learn"
  | "mistakes"
  | "internal";

export type SeoMapItem = {
  url: string;
  lang: SeoPageLang;
  course: SeoCourse;
  intentType: SeoPageIntentType;
  mainKeyword: string;
  intent: string;
  status: SeoPageStatus;
  inSitemap: boolean;
  note?: string;
};

export const SEO_MAP: SeoMapItem[] = [
  // Core public pages
  {
    url: "/",
    lang: "en",
    course: "general",
    intentType: "internal",
    mainKeyword: "Flunio",
    intent: "Main homepage for Flunio language learning platform",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/learning",
    lang: "en",
    course: "general",
    intentType: "internal",
    mainKeyword: "language lessons",
    intent: "Main learning area with course lessons",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/dictionary",
    lang: "en",
    course: "general",
    intentType: "internal",
    mainKeyword: "language dictionary",
    intent: "Dictionary page for course vocabulary",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/grammar",
    lang: "en",
    course: "sk",
    intentType: "internal",
    mainKeyword: "Slovak grammar topics",
    intent: "Internal grammar hub with topic links",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/practice",
    lang: "en",
    course: "general",
    intentType: "internal",
    mainKeyword: "language practice",
    intent: "Practice and trainer area for logged-in Premium users",
    status: "do_not_index",
    inSitemap: false,
  },

  // English course landing pages
  {
    url: "/learn-slovak",
    lang: "en",
    course: "sk",
    intentType: "course",
    mainKeyword: "learn Slovak online",
    intent: "English landing page for learning Slovak online",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/learn-czech",
    lang: "en",
    course: "cs",
    intentType: "course",
    mainKeyword: "learn Czech online",
    intent: "English landing page for learning Czech online",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/learn-polish",
    lang: "en",
    course: "pl",
    intentType: "course",
    mainKeyword: "learn Polish online",
    intent: "English landing page for learning Polish online",
    status: "keep",
    inSitemap: true,
  },

  // Ukrainian course landing pages
  {
    url: "/vyvchennia-slovatskoi-movy-online",
    lang: "uk",
    course: "sk",
    intentType: "course",
    mainKeyword: "вивчення словацької мови онлайн",
    intent: "Ukrainian landing page for learning Slovak online",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/vyvchennia-cheskoi-movy-online",
    lang: "uk",
    course: "cs",
    intentType: "course",
    mainKeyword: "вивчення чеської мови онлайн",
    intent: "Ukrainian landing page for learning Czech online",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/vyvchennia-polskoi-movy-online",
    lang: "uk",
    course: "pl",
    intentType: "course",
    mainKeyword: "вивчення польської мови онлайн",
    intent: "Ukrainian landing page for learning Polish online",
    status: "keep",
    inSitemap: true,
  },

  // Old Russian course landing pages with Ukrainian-style slugs.
  // Keep them alive if they already exist / are indexed, but do not use them as the main RU SEO direction.
  // They must stay out of sitemap.
  {
    url: "/ru/vyvchennia-slovatskoi-movy-online",
    lang: "ru",
    course: "sk",
    intentType: "course",
    mainKeyword: "словацкий язык онлайн",
    intent:
      "Old Russian landing page for learning Slovak online with Ukrainian-style slug",
    status: "remove_from_sitemap",
    inSitemap: false,
    note:
      "Permanent redirect to the clean Russian landing page. Keep out of sitemap and hreflang.",
  },
  {
    url: "/ru/vyvchennia-cheskoi-movy-online",
    lang: "ru",
    course: "cs",
    intentType: "course",
    mainKeyword: "чешский язык онлайн",
    intent:
      "Old Russian landing page for learning Czech online with Ukrainian-style slug",
    status: "remove_from_sitemap",
    inSitemap: false,
    note:
      "Permanent redirect to the clean Russian landing page. Keep out of sitemap and hreflang.",
  },
  {
    url: "/ru/vyvchennia-polskoi-movy-online",
    lang: "ru",
    course: "pl",
    intentType: "course",
    mainKeyword: "польский язык онлайн",
    intent:
      "Old Russian landing page for learning Polish online with Ukrainian-style slug",
    status: "remove_from_sitemap",
    inSitemap: false,
    note:
      "Permanent redirect to the clean Russian landing page. Keep out of sitemap and hreflang.",
  },

  // Russian clean course landing pages.
  // These are the main Russian SEO course pages.
  {
    url: "/ru/learn-slovak",
    lang: "ru",
    course: "sk",
    intentType: "course",
    mainKeyword: "учить словацкий язык онлайн",
    intent: "Clean Russian landing page for learning Slovak online",
    status: "keep",
    inSitemap: true,
    note:
      "Main Russian Slovak course landing page. Use this URL for RU hreflang and internal linking.",
  },
  {
    url: "/ru/czech-for-beginners",
    lang: "ru",
    course: "cs",
    intentType: "how_to_learn",
    mainKeyword: "чешский язык для начинающих",
    intent:
      "Russian beginner roadmap page for learning Czech from zero: first words, pronunciation, ř, false friends, first 7 days, 30-day plan and path into Flunio lessons",
    status: "keep",
    inSitemap: true,
    note:
      "Unique RU Czech beginner roadmap page. Different from /ru/learn-czech: focuses on first steps, beginner traps and practical continuation inside Flunio.",
  },
  {
    url: "/ru/czech-vocabulary",
    lang: "ru",
    course: "cs",
    intentType: "vocabulary",
    mainKeyword: "чешские слова с переводом",
    intent:
      "Russian SEO vocabulary page for Czech words by real-life topics: first words, shop, work, transport, doctor, documents, verbs, false friends and practice path into Flunio",
    status: "keep",
    inSitemap: true,
    note:
      "Unique RU Czech vocabulary page. Different from /ru/learn-czech and /ru/czech-for-beginners: focuses on practical word groups, Czech traps and continuing inside Flunio.",
  },
  {
    url: "/ru/learn-czech",
    lang: "ru",
    course: "cs",
    intentType: "course",
    mainKeyword: "учить чешский язык онлайн",
    intent: "Clean Russian landing page for learning Czech online",
    status: "keep",
    inSitemap: true,
    note:
      "Main Russian Czech course landing page. Use this URL for RU hreflang and internal linking.",
  },
  {
    url: "/ru/learn-polish",
    lang: "ru",
    course: "pl",
    intentType: "course",
    mainKeyword: "учить польский язык онлайн",
    intent: "Clean Russian landing page for learning Polish online",
    status: "keep",
    inSitemap: true,
    note:
      "Main Russian Polish course landing page. Use this URL for RU hreflang and internal linking.",
  },

  // Slovak SEO support pages
  {
    url: "/slovak-grammar",
    lang: "en",
    course: "sk",
    intentType: "grammar",
    mainKeyword: "Slovak grammar online",
    intent: "English SEO landing page for Slovak grammar, cases, verbs and alphabet",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/ru/slovak-for-beginners",
    lang: "ru",
    course: "sk",
    intentType: "how_to_learn",
    mainKeyword: "словацкий язык для начинающих",
    intent:
      "Russian beginner roadmap page for learning Slovak from zero: first words, first 7 days, 30-day plan, mistakes and practical path into Flunio lessons",
    status: "keep",
    inSitemap: true,
    note:
      "Unique RU beginner roadmap page. Different from /ru/learn-slovak: focuses on what to learn first, why beginners get stuck, and how to continue inside Flunio.",
  },
  {
    url: "/ru/slovak-vocabulary",
    lang: "ru",
    course: "sk",
    intentType: "vocabulary",
    mainKeyword: "словацкие слова с переводом",
    intent:
      "Russian SEO vocabulary page for Slovak words by real-life topics: first words, shop, work, transport, doctor, documents, verbs and practice path into Flunio",
    status: "keep",
    inSitemap: true,
    note:
      "Unique RU Slovak vocabulary page. Different from /ru/learn-slovak and /ru/slovak-for-beginners: focuses on word groups, practical vocabulary and continuing inside Flunio.",
  },
  {
    url: "/ru/slovak-grammar",
    lang: "ru",
    course: "sk",
    intentType: "grammar",
    mainKeyword: "словацкая грамматика для начинающих",
    intent:
      "Russian SEO grammar page for Slovak grammar without panic: alphabet, pronunciation, gender, verbs, cases, word order and how to practice grammar inside Flunio",
    status: "keep",
    inSitemap: true,
    note:
      "Unique RU Slovak grammar page. Different from /ru/learn-slovak and /ru/slovak-vocabulary: focuses on grammar order, beginner mistakes and practical grammar practice.",
  },
  {
    url: "/slovak-for-beginners",
    lang: "en",
    course: "sk",
    intentType: "how_to_learn",
    mainKeyword: "Slovak for beginners",
    intent:
      "English beginner roadmap page for learning Slovak from zero, including first words, pronunciation, grammar order and 30-day plan",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/slovatski-slova-z-perekladom",
    lang: "uk",
    course: "sk",
    intentType: "vocabulary",
    mainKeyword: "словацькі слова з перекладом",
    intent: "Ukrainian SEO landing page for Slovak vocabulary with translation",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/yak-vyvchyty-slovatsku-movu",
    lang: "uk",
    course: "sk",
    intentType: "how_to_learn",
    mainKeyword: "як вивчити словацьку мову",
    intent: "Ukrainian SEO page explaining how to learn Slovak",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/pomylky-v-slovatskii-movi",
    lang: "uk",
    course: "sk",
    intentType: "mistakes",
    mainKeyword: "помилки в словацькій мові",
    intent: "Ukrainian SEO page about common mistakes in Slovak",
    status: "keep",
    inSitemap: true,
  },

  // Existing narrow pages that should not drive the main SEO strategy
  {
    url: "/slovak-for-ukrainians",
    lang: "uk",
    course: "sk",
    intentType: "course",
    mainKeyword: "словацька для українців",
    intent: "Old narrow page focused on Slovak for Ukrainians",
    status: "remove_from_sitemap",
    inSitemap: false,
    note:
      "Do not use as main SEO direction because Flunio should not be positioned only for one nationality.",
  },
  {
    url: "/ru/slovak-for-ukrainians",
    lang: "ru",
    course: "sk",
    intentType: "course",
    mainKeyword: "словацкий для украинцев",
    intent: "Old narrow Russian page focused on Slovak for Ukrainians",
    status: "do_not_index",
    inSitemap: false,
    note:
      "Do not add to sitemap unless this page is rewritten for a clearly different intent.",
  },

  // English Czech SEO support pages
  {
    url: "/czech-for-beginners",
    lang: "en",
    course: "cs",
    intentType: "how_to_learn",
    mainKeyword: "Czech for beginners",
    intent:
      "English beginner roadmap page for learning Czech from zero, including first words, pronunciation, grammar order and 30-day plan",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/czech-vocabulary",
    lang: "en",
    course: "cs",
    intentType: "vocabulary",
    mainKeyword: "Czech vocabulary",
    intent: "English SEO page for Czech vocabulary by topic",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/czech-grammar",
    lang: "en",
    course: "cs",
    intentType: "grammar",
    mainKeyword: "Czech grammar",
    intent: "English SEO page for Czech grammar, cases, verbs and word order",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/czech-words-with-audio",
    lang: "en",
    course: "cs",
    intentType: "vocabulary",
    mainKeyword: "Czech words with audio",
    intent: "English SEO page for Czech words with audio and pronunciation practice",
    status: "keep",
    inSitemap: true,
  },

  // English Polish SEO support pages
  {
    url: "/polish-for-beginners",
    lang: "en",
    course: "pl",
    intentType: "how_to_learn",
    mainKeyword: "Polish for beginners",
    intent:
      "English beginner roadmap page for learning Polish from zero, including first words, pronunciation, grammar order and 30-day plan",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/polish-vocabulary",
    lang: "en",
    course: "pl",
    intentType: "vocabulary",
    mainKeyword: "Polish vocabulary",
    intent: "English SEO page for Polish vocabulary by topic",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/polish-grammar",
    lang: "en",
    course: "pl",
    intentType: "grammar",
    mainKeyword: "Polish grammar",
    intent: "English SEO page for Polish grammar, cases, verbs and word order",
    status: "keep",
    inSitemap: true,
  },
  {
    url: "/polish-words-with-audio",
    lang: "en",
    course: "pl",
    intentType: "vocabulary",
    mainKeyword: "Polish words with audio",
    intent: "English SEO page for Polish words with audio and pronunciation practice",
    status: "keep",
    inSitemap: true,
  },
];