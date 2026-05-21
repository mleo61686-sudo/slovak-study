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

    // Russian course landing pages
    {
        url: "/ru/vyvchennia-slovatskoi-movy-online",
        lang: "ru",
        course: "sk",
        intentType: "course",
        mainKeyword: "словацкий язык онлайн",
        intent: "Russian landing page for learning Slovak online",
        status: "keep",
        inSitemap: true,
    },
    {
        url: "/ru/vyvchennia-cheskoi-movy-online",
        lang: "ru",
        course: "cs",
        intentType: "course",
        mainKeyword: "чешский язык онлайн",
        intent: "Russian landing page for learning Czech online",
        status: "keep",
        inSitemap: true,
    },
    {
        url: "/ru/vyvchennia-polskoi-movy-online",
        lang: "ru",
        course: "pl",
        intentType: "course",
        mainKeyword: "польский язык онлайн",
        intent: "Russian landing page for learning Polish online",
        status: "keep",
        inSitemap: true,
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

    // Existing page that should not drive the main SEO strategy
    {
        url: "/slovak-for-ukrainians",
        lang: "uk",
        course: "sk",
        intentType: "course",
        mainKeyword: "словацька для українців",
        intent: "Old narrow page focused on Slovak for Ukrainians",
        status: "remove_from_sitemap",
        inSitemap: false,
        note: "Do not use as main SEO direction because Flunio should not be positioned only for one nationality.",
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
        note: "Do not add to sitemap unless this page is rewritten for a clearly different intent.",
    },

    // Future pages — not created yet
    {
        url: "/czech-vocabulary",
        lang: "en",
        course: "cs",
        intentType: "vocabulary",
        mainKeyword: "Czech vocabulary",
        intent: "Future English SEO page for Czech vocabulary",
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
        url: "/czech-words-with-audio",
        lang: "en",
        course: "cs",
        intentType: "vocabulary",
        mainKeyword: "Czech words with audio",
        intent: "English SEO page for Czech words with audio and pronunciation practice",
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