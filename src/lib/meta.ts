import type { Metadata } from "next";
import { hreflang, langs, localePath, ogLocale, type Lang } from "@/i18n";
import { site } from "@/lib/site";

// `path` is the Slovenian path (/med/); the language prefix is added here, with alternates for all three languages.
export function pageMeta({ title, description, path, lang }: { title: string; description: string; path: string; lang: Lang }): Metadata {
  const url = `${site.url}${localePath(lang, path)}`;
  const languages = Object.fromEntries([...langs.map((l) => [hreflang[l], `${site.url}${localePath(l, path)}`]), ["x-default", `${site.url}${path}`]]);
  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: { title, description, url, siteName: site.name, locale: ogLocale[lang], type: "website", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  };
}
