import type { MetadataRoute } from "next";
import { getContent } from "@/data";
import { hreflang, langs, localePath } from "@/i18n";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const honeys = getContent("sl").honeys;
  const paths = ["/", "/matice/", "/med/", ...honeys.map((h) => `/med/${h.slug}/`), "/cebelji-pridelki/", "/o-nas/", "/priznanja/", "/kontakt/", "/zasebnost/", "/pravno-obvestilo/"];
  return langs.flatMap((lang) =>
    paths.map((p) => ({
      url: `${site.url}${localePath(lang, p)}`,
      changeFrequency: p === "/" || p === "/matice/" ? ("monthly" as const) : ("yearly" as const),
      priority: (p === "/" ? 1 : p === "/matice/" || p === "/med/" ? 0.9 : 0.6) * (lang === "sl" ? 1 : 0.5),
      alternates: { languages: Object.fromEntries(langs.map((l) => [hreflang[l], `${site.url}${localePath(l, p)}`])) },
    })),
  );
}
