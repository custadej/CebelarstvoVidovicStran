import type { Metadata } from "next";
import { CallBand, PageHero } from "@/components/PageHero";
import { AwardLeads, AwardYears } from "@/components/sections/Awards";
import { CallButton, JsonLd } from "@/components/ui";
import type { Lang } from "@/i18n";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";

const T = {
  sl: {
    metaTitle: "Priznanja in nagrade za med",
    metaDescription:
      "Državni prvak za cvetlični med 2019, znak kakovosti Dobrote slovenskih kmetij in več kot 15 zlatih medalj na sejmu AGRA in Dobrotah slovenskih kmetij od leta 2017 do 2026.",
    eyebrow: "Priznanja in nagrade",
    crumb: "Priznanja",
    title: (
      <>
        Več kot 15 zlatih <em>za naš med.</em>
      </>
    ),
    lead: "Vsa priznanja na tej strani so dokumentirana z listinami. Tu so zbrana po letih.",
    imageAlt: "Steklena plaketa: državni prvak za cvetlični med 2019",
    byYear: (
      <>
        Po <em>letih.</em>
      </>
    ),
    note: "AGRA: ocenjevanje medu z mednarodno udeležbo na mednarodnem kmetijsko-živilskem sejmu v Gornji Radgoni. Dobrote slovenskih kmetij: državno ocenjevanje na Ptuju.",
    band: (
      <>
        Poskusite <em>nagrajeni med.</em>
      </>
    ),
  },
  en: {
    metaTitle: "Awards for our honey",
    metaDescription:
      "National champion for wildflower honey 2019, the Dobrote slovenskih kmetij quality mark and more than 15 gold medals at the AGRA fair and Dobrote slovenskih kmetij from 2017 to 2026.",
    eyebrow: "Awards",
    crumb: "Awards",
    title: (
      <>
        More than 15 golds <em>for our honey.</em>
      </>
    ),
    lead: "Every award on this page is documented with a certificate. Here they are, year by year.",
    imageAlt: "Glass plaque: national champion for wildflower honey 2019",
    byYear: (
      <>
        By <em>year.</em>
      </>
    ),
    note: "AGRA: honey evaluation with international participation at the international agricultural and food fair in Gornja Radgona. Dobrote slovenskih kmetij: the national evaluation in Ptuj.",
    band: (
      <>
        Taste <em>award-winning honey.</em>
      </>
    ),
  },
  de: {
    metaTitle: "Auszeichnungen für unseren Honig",
    metaDescription:
      "Slowenischer Meister für Blütenhonig 2019, das Qualitätszeichen von Dobrote slovenskih kmetij und mehr als 15 Goldmedaillen auf der Messe AGRA und bei Dobrote slovenskih kmetij von 2017 bis 2026.",
    eyebrow: "Auszeichnungen",
    crumb: "Auszeichnungen",
    title: (
      <>
        Mehr als 15 Mal Gold <em>für unseren Honig.</em>
      </>
    ),
    lead: "Jede Auszeichnung auf dieser Seite ist mit einer Urkunde belegt. Hier sind sie nach Jahren geordnet.",
    imageAlt: "Glasplakette: Slowenischer Meister für Blütenhonig 2019",
    byYear: (
      <>
        Nach <em>Jahren.</em>
      </>
    ),
    note: "AGRA: Honigbewertung mit internationaler Beteiligung auf der internationalen Landwirtschafts- und Lebensmittelmesse in Gornja Radgona. Dobrote slovenskih kmetij: die nationale Bewertung in Ptuj.",
    band: (
      <>
        Probieren Sie <em>prämierten Honig.</em>
      </>
    ),
  },
};

export function meta(lang: Lang): Metadata {
  return pageMeta({ title: T[lang].metaTitle, description: T[lang].metaDescription, path: "/priznanja/", lang });
}

export function AwardsPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <>
      <PageHero lang={lang} eyebrow={t.eyebrow} title={t.title} lead={t.lead} image="trofeja-drzavni-prvak" imageAlt={t.imageAlt} position="50% 40%" crumbs={[{ label: t.crumb }]} />
      <section className="section on-dark bg-smola">
        <div className="wrap">
          {/* lg and up: the three big ones as a card row. Below lg they sit in the list at their year. */}
          <div className="hidden lg:block">
            <AwardLeads lang={lang} />
          </div>
          <h2 className="display h-section lg:mt-20" data-split="">
            {t.byYear}
          </h2>
          <div className="mt-8 lg:mt-10">
            <AwardYears lang={lang} withImages inlineLeads />
          </div>
          <p className="muted mt-6 max-w-[60ch] text-[0.95rem]">{t.note}</p>
        </div>
      </section>
      <CallBand title={t.band}>
        <CallButton lang={lang} magnetic />
      </CallBand>
      <JsonLd data={breadcrumbSchema(lang, [{ name: t.crumb, path: "/priznanja/" }])} />
    </>
  );
}
