import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CallBand, PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { HoneyGrid, Packaging } from "@/components/sections/Honeys";
import { CallButton, JsonLd, MedalDot } from "@/components/ui";
import { awardLabel, getContent } from "@/data";
import type { Lang } from "@/i18n";
import { ui } from "@/i18n/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema, honeySchema } from "@/lib/schema";

const T = {
  sl: {
    metaTitle: "Domač med: cvetlični, akacijev, lipov, kostanjev, gozdni, hojev",
    metaDescription:
      "Domač slovenski med neposredno od čebelarja: cvetlični (državni prvak 2019), akacijev, lipov, kostanjev, gozdni in hojev. Kozarci 250 g, 450 g in 900 g. Apače pri Kidričevem, dostava Ptuj in Maribor po dogovoru.",
    crumb: "Med",
    title: (
      <>
        Med iz naših <em>čebelnjakov.</em>
      </>
    ),
    lead: "Šest vrst medu iz čebelnjakov doma na Dravskem polju, v Halozah in v Prekmurju. Točim in polnim ga sam.",
    imageAlt: "Pet kozarcev medu Čebelarstva Vidovič v vrsti",
    choose: (
      <>
        Izberite <em>svojega.</em>
      </>
    ),
    pourAlt: "Točenje gozdnega medu v kozarec na tehtnici",
    good: "Dobro je vedeti",
    why: (
      <>
        Zakaj med <em>kristalizira.</em>
      </>
    ),
    whyText: [
      "Kristalizacija je naraven pojav, ki se v medu zgodi prej ali slej, in ne povzroča nobenih kemičnih sprememb. Zaradi strjevanja je med nekoč dobil ime strd.",
      "Kako hitro med kristalizira, je odvisno od razmerja sladkorjev v njem, količine vode in temperature hranjenja. Cvetlični kristalizira hitro, akacijev ostane dolgo tekoč.",
      "Kozarec s kristaliziranim medom postavite v toplo vodo in kristali se bodo utekočinili. Medu ne segrevajte nad 40 °C.",
    ],
    band: (
      <>
        Kateri med <em>imate radi?</em>
      </>
    ),
    detailTitle: ({ short }: { short: string; name: string }) => (
      <>
        {short} <em>med.</em>
      </>
    ),
    kitchen: "V kuhinji",
    awardsFor: (name: string) => `Priznanja za ${name.toLowerCase()}`,
    jars: (
      <>
        Kozarci <strong>250 g, 450 g in 900 g</strong>. Večje količine po dogovoru.
      </>
    ),
    others: (
      <>
        Ostali <em>medovi.</em>
      </>
    ),
    stock: (
      <>
        Je trenutno <em>na zalogi?</em>
      </>
    ),
  },
  en: {
    metaTitle: "Honey: wildflower, acacia, linden, chestnut, forest, silver fir",
    metaDescription:
      "Slovenian honey straight from the beekeeper: wildflower (national champion 2019), acacia, linden, chestnut, forest and silver fir. Jars of 250 g, 450 g and 900 g. Apače near Kidričevo; delivery around Ptuj and Maribor by arrangement.",
    crumb: "Honey",
    title: (
      <>
        Honey from <em>our own apiaries.</em>
      </>
    ),
    lead: "Six kinds of honey from our apiaries at home on Dravsko polje, in Haloze and in Prekmurje. I extract and jar it myself.",
    imageAlt: "Five jars of Čebelarstvo Vidovič honey in a row",
    choose: (
      <>
        Choose <em>yours.</em>
      </>
    ),
    pourAlt: "Pouring forest honey into a jar on the scales",
    good: "Good to know",
    why: (
      <>
        Why honey <em>crystallises.</em>
      </>
    ),
    whyText: [
      "Crystallisation is a natural process that happens in honey sooner or later and causes no chemical change. Because it sets, honey was once called strd in Slovenian.",
      "How quickly honey crystallises depends on the ratio of sugars in it, the amount of water and the storage temperature. Wildflower honey crystallises quickly, acacia stays liquid for a long time.",
      "Put a jar of crystallised honey in warm water and the crystals will melt. Do not heat honey above 40 °C.",
    ],
    band: (
      <>
        Which honey <em>do you like?</em>
      </>
    ),
    detailTitle: ({ short }: { short: string; name: string }) => (
      <>
        {short} <em>honey.</em>
      </>
    ),
    kitchen: "In the kitchen",
    awardsFor: (name: string) => `Awards for ${name.toLowerCase()}`,
    jars: (
      <>
        Jars of <strong>250 g, 450 g and 900 g</strong>. Larger quantities by arrangement.
      </>
    ),
    others: (
      <>
        Other <em>honeys.</em>
      </>
    ),
    stock: (
      <>
        Is it <em>in stock now?</em>
      </>
    ),
  },
  de: {
    metaTitle: "Honig: Blüten, Akazie, Linde, Kastanie, Wald, Tanne",
    metaDescription:
      "Slowenischer Honig direkt vom Imker: Blütenhonig (Slowenischer Meister 2019), Akazien-, Linden-, Kastanien-, Wald- und Tannenhonig. Gläser zu 250 g, 450 g und 900 g. Apače bei Kidričevo; Lieferung nach Absprache in der Gegend von Ptuj und Maribor.",
    crumb: "Honig",
    title: (
      <>
        Honig aus <em>unseren Bienenständen.</em>
      </>
    ),
    lead: "Sechs Honigsorten von unseren Bienenständen zu Hause im Dravsko polje, in den Haloze und im Prekmurje. Ich schleudere und fülle ihn selbst ab.",
    imageAlt: "Fünf Gläser Honig von Čebelarstvo Vidovič in einer Reihe",
    choose: (
      <>
        Wählen Sie <em>Ihren.</em>
      </>
    ),
    pourAlt: "Waldhonig wird in ein Glas auf der Waage abgefüllt",
    good: "Gut zu wissen",
    why: (
      <>
        Warum Honig <em>kristallisiert.</em>
      </>
    ),
    whyText: [
      "Kristallisation ist ein natürlicher Vorgang, der bei Honig früher oder später eintritt, und bewirkt keine chemischen Veränderungen. Weil er fest wird, nannte man Honig im Slowenischen früher strd.",
      "Wie schnell Honig kristallisiert, hängt vom Verhältnis der Zucker, vom Wassergehalt und von der Lagertemperatur ab. Blütenhonig kristallisiert schnell, Akazienhonig bleibt lange flüssig.",
      "Stellen Sie ein Glas mit kristallisiertem Honig in warmes Wasser, dann lösen sich die Kristalle. Erwärmen Sie Honig nicht über 40 °C.",
    ],
    band: (
      <>
        Welchen Honig <em>mögen Sie?</em>
      </>
    ),
    // German names are compounds (Blütenhonig), so the italic part is the "honig" ending.
    detailTitle: ({ name }: { short: string; name: string }) => (
      <>
        {name.replace(/honig$/, "")}
        <em>honig.</em>
      </>
    ),
    kitchen: "In der Küche",
    awardsFor: (name: string) => `Auszeichnungen für ${name}`,
    jars: (
      <>
        Gläser zu <strong>250 g, 450 g und 900 g</strong>. Größere Mengen nach Absprache.
      </>
    ),
    others: (
      <>
        Weitere <em>Honige.</em>
      </>
    ),
    stock: (
      <>
        Ist er <em>gerade vorrätig?</em>
      </>
    ),
  },
};

export function listMeta(lang: Lang): Metadata {
  return pageMeta({ title: T[lang].metaTitle, description: T[lang].metaDescription, path: "/med/", lang });
}

export function HoneyList({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <>
      <PageHero lang={lang} eyebrow={t.crumb} title={t.title} lead={t.lead} image="medovi-pet" imageAlt={t.imageAlt} crumbs={[{ label: t.crumb }]}>
        <CallButton lang={lang} label={ui[lang].callHoney} magnetic />
      </PageHero>

      <section className="section">
        <div className="wrap">
          <h2 className="display h-section max-w-[14ch]" data-split="">
            {t.choose}
          </h2>
          <div className="mt-10">
            <HoneyGrid lang={lang} />
          </div>
          <div className="mt-6">
            <Packaging lang={lang} />
          </div>
        </div>
      </section>

      <section className="section bg-papir">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Photo slug="tocenje-medu" alt={t.pourAlt} sizes="(min-width: 1024px) 480px, 92vw" className="frame mx-auto aspect-[3/4] w-full max-w-[480px]" parallax />
          <div>
            <p className="eyebrow">{t.good}</p>
            <h2 className="display h-section mt-4" data-split="">
              {t.why}
            </h2>
            <div className="prose mt-6" data-reveal="">
              {t.whyText.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CallBand title={t.band}>
        <CallButton lang={lang} magnetic />
      </CallBand>
      <JsonLd data={breadcrumbSchema(lang, [{ name: t.crumb, path: "/med/" }])} />
    </>
  );
}

export const honeySlugs = () => getContent("sl").honeys.map((h) => ({ slug: h.slug }));

export function detailMeta(lang: Lang, slug: string): Metadata {
  const h = getContent(lang).honeys.find((x) => x.slug === slug);
  if (!h) return {};
  return pageMeta({ title: h.seoTitle, description: h.seoDescription, path: `/med/${h.slug}/`, lang });
}

export function HoneyDetail({ lang, slug }: { lang: Lang; slug: string }) {
  const t = T[lang];
  const c = getContent(lang);
  const h = c.honeys.find((x) => x.slug === slug);
  if (!h) notFound();

  const awards = c.awardYears.flatMap((y) => y.awards.filter((a) => a.honey === h.slug).map((a) => ({ ...a, year: y.year })));
  const schema = honeySchema(lang, h.slug);

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={h.tag}
        title={t.detailTitle(h)}
        lead={h.intro}
        image={h.photo}
        imageAlt={h.photoAlt}
        crumbs={[{ href: "/med/", label: t.crumb }, { label: h.short }]}
      >
        <CallButton lang={lang} label={ui[lang].callHoney} magnetic />
      </PageHero>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <dl className="grid gap-px overflow-hidden rounded-3xl bg-crta sm:grid-cols-2">
              {h.facts.map((f) => (
                <div key={f.label} className="bg-papir p-6" data-reveal="">
                  <dt className="eyebrow">{f.label}</dt>
                  <dd className="h-card mt-2 !text-[1.4rem]">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="prose mt-10" data-reveal="">
              {h.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-10 rounded-3xl p-7 md:p-9" style={{ background: h.color, color: h.tone === "dark" ? "#f6efdf" : "#1f1711" }} data-reveal="">
              <p className="text-[0.8125rem] font-semibold tracking-[0.14em] uppercase opacity-80">{t.kitchen}</p>
              <p className="h-card mt-3">{h.kitchen}</p>
            </div>
            {awards.length ? (
              <div className="mt-10" data-reveal="">
                <h2 className="h-card">{t.awardsFor(h.name)}</h2>
                <ul className="mt-4 grid gap-2">
                  {awards.map((a) => (
                    <li key={`${a.year}-${a.event}-${a.medal}`} className="flex items-baseline gap-3 border-t border-crta pt-2">
                      <MedalDot medal={a.medal} />
                      <span>
                        <span className="num mr-2 text-[1.2rem]">{a.year}</span>
                        {awardLabel(c, a)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div>
            <div className="sticky top-28">
              <Photo slug={h.jar} alt={ui[lang].jarOf(h.name)} sizes="(min-width: 1024px) 380px, 70vw" className="frame mx-auto w-[70%] max-w-[380px] lg:w-full" />
              <p className="mt-6 text-center">{t.jars}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-papir">
        <div className="wrap">
          <h2 className="display h-section" data-split="">
            {t.others}
          </h2>
          <div className="mt-10">
            <HoneyGrid lang={lang} exclude={h.slug} />
          </div>
        </div>
      </section>

      <CallBand title={t.stock}>
        <CallButton lang={lang} magnetic />
      </CallBand>
      <JsonLd
        data={[
          ...(schema ? [schema] : []),
          breadcrumbSchema(lang, [
            { name: t.crumb, path: "/med/" },
            { name: h.name, path: `/med/${h.slug}/` },
          ]),
        ]}
      />
    </>
  );
}
