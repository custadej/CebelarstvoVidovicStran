import type { Lang } from "@/i18n";
import * as sl from "./content";
import type { Award, Translation } from "./content";
import { de } from "./content.de";
import { en } from "./content.en";

const translations: Record<Exclude<Lang, "sl">, Translation> = { en, de };

function build(lang: Lang) {
  if (lang === "sl") {
    return {
      honeys: sl.honeys,
      products: sl.products,
      queenFacts: sl.queenFacts,
      kisResults: sl.kisResults,
      queenSteps: sl.queenSteps,
      story: sl.story,
      awardYears: sl.awardYears,
      awardLeads: sl.awardLeads,
      reviews: sl.reviews,
      faq: sl.faq,
      medalLabel: sl.medalLabel,
      eventLabel: sl.eventLabel,
    };
  }
  const t = translations[lang];
  return {
    honeys: sl.honeys.map((h) => ({ ...h, ...t.honeys[h.slug] })),
    products: sl.products.map((p) => ({ ...p, ...t.products[p.id] })),
    queenFacts: t.queenFacts,
    kisResults: t.kisResults,
    queenSteps: sl.queenSteps.map((s, i) => ({ ...s, ...t.queenSteps[i] })),
    story: t.story,
    awardYears: sl.awardYears.map((y) => ({ ...y, imageAlt: y.image ? (t.awardImageAlts[y.image] ?? y.imageAlt) : y.imageAlt })),
    awardLeads: sl.awardLeads.map((a, i) => ({ ...a, ...t.awardLeads[i] })),
    reviews: t.reviews,
    faq: t.faq,
    medalLabel: t.medalLabel,
    eventLabel: t.eventLabel,
  };
}

export type Content = ReturnType<typeof build>;

const cache = new Map<Lang, Content>();

export function getContent(lang: Lang): Content {
  let c = cache.get(lang);
  if (!c) {
    c = build(lang);
    cache.set(lang, c);
  }
  return c;
}

// "Gold, AGRA" / "AGRA" for a title; the honey's name in the page language.
export function awardLabel(c: Content, a: Award) {
  return a.medal === "naziv" ? c.eventLabel[a.event] : `${c.medalLabel[a.medal]}, ${c.eventLabel[a.event]}`;
}

export function honeyName(c: Content, slug: string) {
  return c.honeys.find((h) => h.slug === slug)?.name ?? slug;
}
