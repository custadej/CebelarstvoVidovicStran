import type { Metadata } from "next";
import { CallBand, PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Timeline } from "@/components/sections/Story";
import { CallButton, JsonLd } from "@/components/ui";
import { getContent } from "@/data";
import type { Lang } from "@/i18n";
import { ui } from "@/i18n/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";

const T = {
  sl: {
    metaTitle: "O nas: Jože Vidovič, čebelar iz Apač pri Kidričevem",
    metaDescription:
      "Zgodba Jožeta Vidoviča: s čebelami od konca osnovne šole, poklicno od leta 1998, samostojno od 2014. Čebelnjaki na Dravskem polju, v Halozah in v Prekmurju, vzreja matic, državni prvak za cvetlični med 2019.",
    crumb: "O nas",
    title: (
      <>
        Kar delaš, delaj <em>z ljubeznijo.</em>
      </>
    ),
    lead: "Sem Jože Vidovič. S čebelami delam od konca osnovne šole, od leta 2014 na svojem.",
    imageAlt: "Prevozni čebelnjak s pisanimi panjskimi končnicami in kombi Čebelarstva Vidovič",
    extra: "Pri delu pomagajo domači in prijatelji. Čebelnjaki stojijo doma na Dravskem polju, v Halozah in v Prekmurju.",
    jozeAlt: "Jože Vidovič ob prevoznem čebelnjaku",
    caption: "Jože ob prevoznem čebelnjaku.",
    apiaries: (
      <>
        Čebelnjaki <em>doma in na paši.</em>
      </>
    ),
    alts: [
      "Pisane panjske končnice prevoznega čebelnjaka",
      "Barvanje panjskih končnic",
      "Cvetoč sadovnjak med haloškimi griči",
      "Čebelnjak in kombi v dolini v Halozah",
      "Čebelnjak v jutranji megli",
    ],
    band: (
      <>
        Oglasite se, <em>po dogovoru.</em>
      </>
    ),
  },
  en: {
    metaTitle: "About us: Jože Vidovič, beekeeper from Apače near Kidričevo",
    metaDescription:
      "The story of Jože Vidovič: with bees since primary school, professionally since 1998, on his own since 2014. Apiaries on Dravsko polje, in Haloze and in Prekmurje, queen rearing, national champion for wildflower honey 2019.",
    crumb: "About us",
    title: (
      <>
        Whatever you do, <em>do it with love.</em>
      </>
    ),
    lead: "I am Jože Vidovič. I have worked with bees since I finished primary school, on my own since 2014.",
    imageAlt: "A mobile apiary with colourful painted hive fronts and the Čebelarstvo Vidovič van",
    extra: "Family and friends help with the work. Our apiaries stand at home on Dravsko polje, in Haloze and in Prekmurje.",
    jozeAlt: "Jože Vidovič by his mobile apiary",
    caption: "Jože by the mobile apiary.",
    apiaries: (
      <>
        Apiaries <em>at home and on forage.</em>
      </>
    ),
    alts: [
      "Colourful painted hive fronts of the mobile apiary",
      "Painting the hive fronts",
      "An orchard in bloom among the hills of Haloze",
      "An apiary and the van in a valley in Haloze",
      "An apiary in the morning mist",
    ],
    band: (
      <>
        Come by, <em>by arrangement.</em>
      </>
    ),
  },
  de: {
    metaTitle: "Über uns: Jože Vidovič, Imker aus Apače bei Kidričevo",
    metaDescription:
      "Die Geschichte von Jože Vidovič: mit Bienen seit der Grundschule, hauptberuflich seit 1998, selbstständig seit 2014. Bienenstände im Dravsko polje, in den Haloze und im Prekmurje, Königinnenzucht, Slowenischer Meister für Blütenhonig 2019.",
    crumb: "Über uns",
    title: (
      <>
        Was du tust, <em>tu es mit Liebe.</em>
      </>
    ),
    lead: "Ich bin Jože Vidovič. Mit Bienen arbeite ich seit dem Ende der Grundschule, seit 2014 selbstständig.",
    imageAlt: "Wanderbienenstand mit bunt bemalten Beutenfronten und dem Transporter von Čebelarstvo Vidovič",
    extra: "Familie und Freunde helfen bei der Arbeit. Unsere Bienenstände stehen zu Hause im Dravsko polje, in den Haloze und im Prekmurje.",
    jozeAlt: "Jože Vidovič an seinem Wanderbienenstand",
    caption: "Jože am Wanderbienenstand.",
    apiaries: (
      <>
        Bienenstände <em>zu Hause und in der Tracht.</em>
      </>
    ),
    alts: [
      "Bunt bemalte Beutenfronten des Wanderbienenstands",
      "Bemalen der Beutenfronten",
      "Blühender Obstgarten zwischen den Hügeln der Haloze",
      "Bienenstand und Transporter in einem Tal der Haloze",
      "Bienenstand im Morgennebel",
    ],
    band: (
      <>
        Besuchen Sie uns, <em>nach Vereinbarung.</em>
      </>
    ),
  },
};

export function meta(lang: Lang): Metadata {
  return pageMeta({ title: T[lang].metaTitle, description: T[lang].metaDescription, path: "/o-nas/", lang });
}

export function AboutPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  const { story } = getContent(lang);
  return (
    <>
      <PageHero lang={lang} eyebrow={t.crumb} title={t.title} lead={t.lead} image="cebelnjak-kombi" imageAlt={t.imageAlt} crumbs={[{ label: t.crumb }]} />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="prose" data-reveal="">
            {story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>{t.extra}</p>
          </div>
          <div>
            <figure data-reveal="">
              <Photo
                slug="joze-cebelnjak"
                alt={t.jozeAlt}
                sizes="300px"
                className="w-full max-w-[300px] rotate-[-2deg] rounded-md border-[8px] border-white shadow-[0_24px_40px_-24px_rgb(31_23_17/0.7)]"
              />
              <figcaption className="mt-4 text-[1.0625rem]">{t.caption}</figcaption>
            </figure>
            <blockquote className="display mt-10 max-w-[16ch] rounded-3xl bg-med p-8 text-[clamp(1.7rem,5vw,2.5rem)] leading-[1.08]" data-reveal="">
              {ui[lang].quote(story.quote)}
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section bg-papir">
        <div className="wrap">
          <h2 className="display h-section" data-split="">
            {t.apiaries}
          </h2>
          <div className="mt-10 grid gap-3 md:grid-cols-3 md:gap-4">
            <Photo slug="cebelnjak-fronta" alt={t.alts[0]} sizes="(min-width: 768px) 66vw, 92vw" className="frame aspect-[3/2] md:col-span-2" parallax />
            <Photo slug="cebelnjak-barvanje" alt={t.alts[1]} sizes="(min-width: 768px) 33vw, 92vw" className="frame aspect-[3/2] md:aspect-auto" />
            <Photo slug="haloze-sadovnjak" alt={t.alts[2]} sizes="(min-width: 768px) 33vw, 92vw" className="frame aspect-[3/2]" />
            <Photo slug="cebelnjak-dolina" alt={t.alts[3]} sizes="(min-width: 768px) 33vw, 92vw" className="frame aspect-[3/2]" />
            <Photo slug="haloze-megla" alt={t.alts[4]} sizes="(min-width: 768px) 33vw, 92vw" className="frame aspect-[3/2]" />
          </div>
          <div className="mt-14">
            <Timeline lang={lang} />
          </div>
        </div>
      </section>

      <CallBand title={t.band}>
        <CallButton lang={lang} magnetic />
      </CallBand>
      <JsonLd data={breadcrumbSchema(lang, [{ name: t.crumb, path: "/o-nas/" }])} />
    </>
  );
}
