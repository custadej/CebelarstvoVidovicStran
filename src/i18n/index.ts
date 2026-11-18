// Slovenian lives at the root (/med/), English and German under a prefix (/en/med/, /de/med/). Slugs stay Slovenian.
export const langs = ["sl", "en", "de"] as const;
export type Lang = (typeof langs)[number];
export const foreignLangs = ["en", "de"] as const;

export const isLang = (value: string): value is Lang => (langs as readonly string[]).includes(value);

export const localePath = (lang: Lang, path: string) => (lang === "sl" ? path : `/${lang}${path}`);

// Strip the language prefix from a pathname (as returned by usePathname, without basePath).
export const basePathOf = (pathname: string) => pathname.replace(/^\/(en|de)(?=\/|$)/, "") || "/";

export const hreflang: Record<Lang, string> = { sl: "sl-SI", en: "en", de: "de" };
export const ogLocale: Record<Lang, string> = { sl: "sl_SI", en: "en_GB", de: "de_DE" };
export const langShort: Record<Lang, string> = { sl: "SL", en: "EN", de: "DE" };
export const langName: Record<Lang, string> = { sl: "Slovenščina", en: "English", de: "Deutsch" };
