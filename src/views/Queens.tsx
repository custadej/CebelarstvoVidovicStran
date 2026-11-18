import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Contact } from "@/components/sections/Contact";
import { FaqList } from "@/components/sections/Faq";
import { KisResults, QueenFacts, QueenStory } from "@/components/sections/Queens";
import { CallButton, JsonLd } from "@/components/ui";
import type { Lang } from "@/i18n";
import { ui } from "@/i18n/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema, faqSchema, queenSchema } from "@/lib/schema";

const T = {
  sl: {
    metaTitle: "Matice čebel: prodaja oplojenih in označenih matic",
    metaDescription:
      "Prodaja matic kranjske čebele: oplojene in označene, vzrejene pod nadzorom KIS. Osebni prevzem v Apačah pri Kidričevem ali po pošti, dostava naslednji dan po vsej Sloveniji. Naročila: 041 579 827.",
    eyebrow: "Matice čebel",
    crumb: "Matice",
    title: (
      <>
        Oplojene matice, <em>naslednji dan pri vas.</em>
      </>
    ),
    lead: "Oplojene in označene matice kranjske čebele iz registriranega vzrejališča. Prevzamete jih doma ali jih pošljem po pošti.",
    imageAlt: "Označena matica kranjske čebele na robu satja med delavkami",
    what: (
      <>
        Kaj dobite <em>in kako.</em>
      </>
    ),
    order: "Naročilo",
    how: (
      <>
        Kako <em>naročite.</em>
      </>
    ),
    steps: (phone: string) => [
      { t: "Pokličite", d: `Na ${phone}. Povejte, koliko matic potrebujete in kdaj.` },
      { t: "Dogovorimo se", d: "Za osebni prevzem pri nas doma v Apačah ali za pošiljanje po pošti." },
      { t: "Naslednji dan pri vas", d: "Matice po pošti dostavijo naslednji dan, po vsej Sloveniji." },
    ],
    road: "Od matičnika do pošte",
    good: (
      <>
        Kako nastane <em>dobra matica.</em>
      </>
    ),
    yard: (
      <>
        Iz našega <em>vzrejališča.</em>
      </>
    ),
    alts: [
      "Zeleno označena matica med delavkami na satju",
      "Vstavljanje matice v matičnico ob plemenilčku",
      "Označena matica v matičnici v roki",
      "Letvica z matičniki v panju",
      "Plemenilčki med drevesi",
      "Matica z zeleno oznako in spremljevalke",
    ],
    faq: (
      <>
        Vprašanja <em>o maticah.</em>
      </>
    ),
  },
  en: {
    metaTitle: "Queen bees: mated and marked Carniolan queens",
    metaDescription:
      "Carniolan queen bees for sale: mated and marked, reared under the supervision of the Agricultural Institute of Slovenia. Collection in Apače near Kidričevo or next-day delivery by post anywhere in Slovenia. Orders: +386 41 579 827.",
    eyebrow: "Queen bees",
    crumb: "Queen bees",
    title: (
      <>
        Mated queens, <em>with you the next day.</em>
      </>
    ),
    lead: "Mated and marked Carniolan queens from a registered breeding apiary. Collect them at our home or I send them by post.",
    imageAlt: "A marked Carniolan queen on the edge of the comb among worker bees",
    what: (
      <>
        What you get <em>and how.</em>
      </>
    ),
    order: "Ordering",
    how: (
      <>
        How to <em>order.</em>
      </>
    ),
    steps: (phone: string) => [
      { t: "Call", d: `On ${phone}. Tell me how many queens you need and when.` },
      { t: "We arrange it", d: "Collection in person at our home in Apače, or posting." },
      { t: "With you the next day", d: "Queens sent by post arrive the next day, anywhere in Slovenia." },
    ],
    road: "From queen cell to post office",
    good: (
      <>
        How a good queen <em>comes about.</em>
      </>
    ),
    yard: (
      <>
        From our <em>breeding apiary.</em>
      </>
    ),
    alts: [
      "A green-marked queen among worker bees on the comb",
      "Putting a queen into a cage next to a mating nuc",
      "A marked queen in a cage, held in the hand",
      "A bar of queen cells in the hive",
      "Mating nucs among the trees",
      "A green-marked queen with attendants",
    ],
    faq: (
      <>
        Questions <em>about queens.</em>
      </>
    ),
  },
  de: {
    metaTitle: "Bienenköniginnen: begattete und gezeichnete Carnica-Königinnen",
    metaDescription:
      "Verkauf von Königinnen der Krainer Biene: begattet und gezeichnet, gezüchtet unter Aufsicht des Landwirtschaftsinstituts Sloweniens. Abholung in Apače bei Kidričevo oder Postversand mit Zustellung am nächsten Tag in ganz Slowenien. Bestellungen: +386 41 579 827.",
    eyebrow: "Bienenköniginnen",
    crumb: "Königinnen",
    title: (
      <>
        Begattete Königinnen, <em>am nächsten Tag bei Ihnen.</em>
      </>
    ),
    lead: "Begattete und gezeichnete Königinnen der Krainer Biene aus einer registrierten Zuchtstätte. Sie holen sie bei uns ab, oder ich schicke sie mit der Post.",
    imageAlt: "Eine gezeichnete Königin der Krainer Biene am Wabenrand zwischen Arbeiterinnen",
    what: (
      <>
        Was Sie bekommen <em>und wie.</em>
      </>
    ),
    order: "Bestellung",
    how: (
      <>
        So <em>bestellen Sie.</em>
      </>
    ),
    steps: (phone: string) => [
      { t: "Anrufen", d: `Unter ${phone}. Sagen Sie mir, wie viele Königinnen Sie wann brauchen.` },
      { t: "Wir vereinbaren", d: "Persönliche Abholung bei uns zu Hause in Apače oder Versand mit der Post." },
      { t: "Am nächsten Tag bei Ihnen", d: "Mit der Post verschickte Königinnen kommen am nächsten Tag an, in ganz Slowenien." },
    ],
    road: "Von der Weiselzelle zur Post",
    good: (
      <>
        Wie eine gute Königin <em>entsteht.</em>
      </>
    ),
    yard: (
      <>
        Aus unserer <em>Zuchtstätte.</em>
      </>
    ),
    alts: [
      "Grün gezeichnete Königin zwischen Arbeiterinnen auf der Wabe",
      "Eine Königin wird neben einem Begattungskästchen in einen Käfig gesetzt",
      "Gezeichnete Königin im Käfig in der Hand",
      "Zuchtlatte mit Weiselzellen im Volk",
      "Begattungskästchen zwischen Bäumen",
      "Grün gezeichnete Königin mit Begleitbienen",
    ],
    faq: (
      <>
        Fragen <em>zu Königinnen.</em>
      </>
    ),
  },
};

export function meta(lang: Lang): Metadata {
  return pageMeta({ title: T[lang].metaTitle, description: T[lang].metaDescription, path: "/matice/", lang });
}

export function QueensPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  const call = ui[lang].callQueens;
  return (
    <>
      <PageHero lang={lang} eyebrow={t.eyebrow} title={t.title} lead={t.lead} image="matica-makro" imageAlt={t.imageAlt} position="58% 55%" crumbs={[{ label: t.crumb }]}>
        <CallButton lang={lang} label={call} magnetic />
      </PageHero>

      <section className="section on-dark bg-hoja">
        <div className="wrap">
          <h2 className="display h-section max-w-[16ch]" data-split="">
            {t.what}
          </h2>
          <div className="mt-10">
            <QueenFacts lang={lang} />
          </div>
          <div className="mt-6">
            <KisResults lang={lang} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="kako-narocite">
        <div className="wrap">
          <p className="eyebrow">{t.order}</p>
          <h2 id="kako-narocite" className="display h-section mt-4 max-w-[14ch]" data-split="">
            {t.how}
          </h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-crta md:grid-cols-3">
            {t.steps(ui[lang].phone).map((s, i) => (
              <li key={s.t} className="bg-papir p-7 md:p-8" data-reveal="">
                <p className="num text-[3rem] leading-none text-kostanj">{i + 1}</p>
                <h3 className="h-card mt-3">{s.t}</h3>
                <p className="mt-2">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <CallButton lang={lang} label={call} variant="smola" />
          </div>
        </div>
      </section>

      <section className="section on-dark bg-hoja">
        <div className="wrap">
          <p className="eyebrow">{t.road}</p>
          <h2 className="display h-section mt-4 max-w-[14ch]" data-split="">
            {t.good}
          </h2>
          <div className="mt-10">
            <QueenStory lang={lang} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="display h-section max-w-[14ch]" data-split="">
            {t.yard}
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <Photo slug="matica-zelena" alt={t.alts[0]} sizes="(min-width: 768px) 50vw, 92vw" className="frame col-span-2 aspect-[4/3]" />
            <Photo slug="matica-v-kletko" alt={t.alts[1]} sizes="(min-width: 768px) 25vw, 46vw" className="frame aspect-square" />
            <Photo slug="matica-kletka-roka" alt={t.alts[2]} sizes="(min-width: 768px) 25vw, 46vw" className="frame aspect-square" />
            <Photo slug="maticniki-v-panju" alt={t.alts[3]} sizes="(min-width: 768px) 25vw, 46vw" className="frame aspect-square" />
            <Photo slug="plemenilcki-gozd" alt={t.alts[4]} sizes="(min-width: 768px) 25vw, 46vw" className="frame aspect-square" />
            <Photo slug="matica-zelena-pokoncno" alt={t.alts[5]} sizes="(min-width: 768px) 50vw, 92vw" className="frame col-span-2 aspect-[4/3]" position="50% 45%" />
          </div>
        </div>
      </section>

      <section className="section bg-papir">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="display h-section" data-split="">
            {t.faq}
          </h2>
          <FaqList lang={lang} queensOnly />
        </div>
      </section>

      <Contact lang={lang} n="" />
      <JsonLd data={[queenSchema(lang), faqSchema(lang, true), breadcrumbSchema(lang, [{ name: t.crumb, path: "/matice/" }])]} />
    </>
  );
}
