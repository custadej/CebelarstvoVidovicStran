import type { MetadataRoute } from "next";
import { honeys } from "@/data/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/matice/", "/med/", ...honeys.map((h) => `/med/${h.slug}/`), "/cebelji-pridelki/", "/o-nas/", "/priznanja/", "/kontakt/", "/zasebnost/", "/pravno-obvestilo/"];
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: p === "/" || p === "/matice/" ? "monthly" : "yearly",
    priority: p === "/" ? 1 : p === "/matice/" || p === "/med/" ? 0.9 : 0.6,
  }));
}
