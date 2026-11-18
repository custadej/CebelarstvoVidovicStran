import type { Metadata } from "next";
import { CallBand, PageHero } from "@/components/PageHero";
import { ProductList } from "@/components/sections/Products";
import { CallButton, JsonLd } from "@/components/ui";
import type { Lang } from "@/i18n";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";

const T = {
  sl: {
    metaTitle: "Čebelji pridelki: matični mleček, cvetni prah, propolis, vosek",
    metaDescription:
      "Svež matični mleček naravnost iz panja, cvetni prah, propolis v granulatu, čebelji vosek in darilni paketi z medom. Čebelarstvo Vidovič, Apače pri Kidričevem. Pokličite 041 579 827.",
    crumb: "Čebelji pridelki",
    title: (
      <>
        Vse, kar da <em>panj.</em>
      </>
    ),
    lead: "Poleg medu pri nas dobite svež matični mleček, cvetni prah, propolis, voščene izdelke in darilne pakete.",
    imageAlt: "Svež matični mleček v kozarčku z žličko",
    band: (
      <>
        Vprašajte, kaj je <em>trenutno na voljo.</em>
      </>
    ),
  },
  en: {
    metaTitle: "Bee products: royal jelly, bee pollen, propolis, beeswax",
    metaDescription:
      "Fresh royal jelly straight from the hive, bee pollen, propolis granules, beeswax and honey gift boxes. Čebelarstvo Vidovič, Apače near Kidričevo, Slovenia. Call +386 41 579 827.",
    crumb: "Bee products",
    title: (
      <>
        Everything <em>the hive gives.</em>
      </>
    ),
    lead: "Besides honey, you can get fresh royal jelly, bee pollen, propolis, beeswax items and gift boxes from us.",
    imageAlt: "Fresh royal jelly in a small jar with a spoon",
    band: (
      <>
        Ask what is <em>available now.</em>
      </>
    ),
  },
  de: {
    metaTitle: "Bienenprodukte: Gelée royale, Blütenpollen, Propolis, Bienenwachs",
    metaDescription:
      "Frisches Gelée royale direkt aus dem Bienenstock, Blütenpollen, Propolis-Granulat, Bienenwachs und Geschenkboxen mit Honig. Čebelarstvo Vidovič, Apače bei Kidričevo, Slowenien. Rufen Sie an: +386 41 579 827.",
    crumb: "Bienenprodukte",
    title: (
      <>
        Alles, was <em>der Bienenstock gibt.</em>
      </>
    ),
    lead: "Neben Honig bekommen Sie bei uns frisches Gelée royale, Blütenpollen, Propolis, Wachsartikel und Geschenkboxen.",
    imageAlt: "Frisches Gelée royale im Gläschen mit Löffel",
    band: (
      <>
        Fragen Sie, was <em>gerade erhältlich ist.</em>
      </>
    ),
  },
};

export function meta(lang: Lang): Metadata {
  return pageMeta({ title: T[lang].metaTitle, description: T[lang].metaDescription, path: "/cebelji-pridelki/", lang });
}

export function ProductsPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <>
      <PageHero lang={lang} eyebrow={t.crumb} title={t.title} lead={t.lead} image="maticni-mlecek" imageAlt={t.imageAlt} position="50% 35%" crumbs={[{ label: t.crumb }]}>
        <CallButton lang={lang} magnetic />
      </PageHero>
      <section className="section">
        <div className="wrap">
          <ProductList lang={lang} detailed />
        </div>
      </section>
      <CallBand title={t.band}>
        <CallButton lang={lang} magnetic />
      </CallBand>
      <JsonLd data={breadcrumbSchema(lang, [{ name: t.crumb, path: "/cebelji-pridelki/" }])} />
    </>
  );
}
