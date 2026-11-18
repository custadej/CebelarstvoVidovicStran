import { awardLabel, getContent, honeyName } from "@/data";
import { localePath, type Lang } from "@/i18n";
import { ui } from "@/i18n/ui";
import { site } from "@/lib/site";

const id = `${site.url}/#cebelarstvo`;

const text = {
  sl: {
    business:
      "Čebelarstvo v Apačah pri Kidričevem na Dravskem polju: domač med iz čebelnjakov na Dravskem polju, v Halozah in v Prekmurju, vzreja in prodaja oplojenih, označenih matic kranjske čebele, matični mleček in drugi čebelji pridelki.",
    country: "Slovenija",
    honey: "Med",
    queen: "Oplojena in označena matica kranjske čebele",
    queenText:
      "Oplojene in označene matice kranjske čebele iz registriranega vzrejališča, vzrejene pod strokovnim nadzorom Kmetijskega inštituta Slovenije. Osebni prevzem ali pošiljanje po pošti po vsej Sloveniji.",
    queenCategory: "Čebelje matice",
  },
  en: {
    business:
      "Beekeeping in Apače near Kidričevo on the Drava plain (Dravsko polje), Slovenia: honey from our apiaries at home, in Haloze and in Prekmurje, rearing and sale of mated, marked Carniolan queen bees, royal jelly and other bee products.",
    country: "Slovenia",
    honey: "Honey",
    queen: "Mated and marked Carniolan queen bee",
    queenText:
      "Mated and marked Carniolan queen bees from a registered breeding apiary, reared under the expert supervision of the Agricultural Institute of Slovenia. Collection in person or posting anywhere in Slovenia.",
    queenCategory: "Queen bees",
  },
  de: {
    business:
      "Imkerei in Apače bei Kidričevo im Draufeld (Dravsko polje), Slowenien: Honig von unseren Bienenständen zu Hause, in den Haloze und im Prekmurje, Zucht und Verkauf begatteter, gezeichneter Königinnen der Krainer Biene, Gelée royale und weitere Bienenprodukte.",
    country: "Slowenien",
    honey: "Honig",
    queen: "Begattete und gezeichnete Königin der Krainer Biene",
    queenText:
      "Begattete und gezeichnete Königinnen der Krainer Biene aus einer registrierten Zuchtstätte, gezüchtet unter fachlicher Aufsicht des Landwirtschaftsinstituts Sloweniens. Persönliche Abholung oder Versand in ganz Slowenien.",
    queenCategory: "Bienenköniginnen",
  },
} satisfies Record<Lang, Record<string, string>>;

export const businessSchema = (lang: Lang) => {
  const c = getContent(lang);
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Store"],
    "@id": id,
    name: site.name,
    description: text[lang].business,
    url: `${site.url}${localePath(lang, "/")}`,
    telephone: site.phone.e164,
    email: site.email,
    image: `${site.url}/img/haloze-cebelnjak-1440.webp`,
    logo: `${site.url}/img/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    founder: { "@type": "Person", name: site.owner },
    areaServed: { "@type": "Country", name: text[lang].country },
    sameAs: [site.facebook],
    award: c.awardYears.flatMap((y) => y.awards.map((a) => `${awardLabel(c, a)} ${y.year}: ${honeyName(c, a.honey)}`)),
  };
};

export const faqSchema = (lang: Lang, queensOnly = false) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: getContent(lang)
    .faq.filter((f) => !queensOnly || f.queens)
    .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const breadcrumbSchema = (lang: Lang, items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: ui[lang].home, path: "/" }, ...items].map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${site.url}${localePath(lang, it.path)}`,
  })),
});

export const honeySchema = (lang: Lang, slug: string) => {
  const c = getContent(lang);
  const h = c.honeys.find((x) => x.slug === slug);
  if (!h) return null;
  const awards = c.awardYears.flatMap((y) => y.awards.filter((a) => a.honey === h.slug).map((a) => `${awardLabel(c, a)} ${y.year}`));
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: h.name,
    description: h.intro,
    category: text[lang].honey,
    image: `${site.url}/img/${h.photo}-800.webp`,
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": id },
    countryOfOrigin: "SI",
    ...(awards.length ? { award: awards } : {}),
  };
};

export const queenSchema = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: text[lang].queen,
  description: text[lang].queenText,
  category: text[lang].queenCategory,
  image: `${site.url}/img/matica-makro-1200.webp`,
  brand: { "@type": "Brand", name: site.name },
  manufacturer: { "@id": id },
  countryOfOrigin: "SI",
});
