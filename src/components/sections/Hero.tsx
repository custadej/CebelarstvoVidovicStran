import { HeroComb } from "@/components/HeroComb";
import { HoneyDrip } from "@/components/HoneyDrip";
import { Photo } from "@/components/Photo";
import { Arrow, CallButton } from "@/components/ui";
import type { Lang } from "@/i18n";
import { site } from "@/lib/site";

// Honey first. The photo sits in the right column of the content grid (it never runs off to the edge of a wide screen),
// keeps its 3:2 shape so no jar is cropped and stays under ~720 CSS px, so the 1456 px source is sharp on retina.
// Look (Tadej, 2026-11-18): rounded photo with honey poured over its top edge, a honeycomb behind it.
const T = {
  sl: {
    alt: "Pet kozarcev medu Čebelarstva Vidovič v vrsti: kostanjev, gozdni, lipov, cvetlični in akacijev",
    place: "Apače pri Kidričevem, Dravsko polje",
    h1: "Domač med,",
    h1em: "pridelan z\u00a0ljubeznijo.",
    lead: "Iz naših čebelnjakov doma na Dravskem polju, v Halozah in v Prekmurju. Šest vrst medu, točim in polnim ga sam.",
    see: "Poglejte med",
    glance: "Na kratko",
    trust: [
      { big: "15+", label: "zlatih medalj in priznanj" },
      { big: "6", label: "vrst medu v kozarcih 250, 450 in 900 g" },
      { big: "1998", label: "poklicno čebelarim od takrat" },
      { big: "4,9", label: "ocena na Googlu (20 mnenj)", href: site.googleProfile },
    ],
  },
  en: {
    alt: "Five jars of Čebelarstvo Vidovič honey in a row: chestnut, forest, linden, wildflower and acacia",
    place: "Apače near Kidričevo, Dravsko polje, Slovenia",
    h1: "Our own honey,",
    h1em: "made with\u00a0love.",
    lead: "From our apiaries at home on Dravsko polje, in Haloze and in Prekmurje. Six kinds of honey, which I extract and jar myself.",
    see: "See the honey",
    glance: "At a glance",
    trust: [
      { big: "15+", label: "gold medals and awards" },
      { big: "6", label: "kinds of honey in 250, 450 and 900 g jars" },
      { big: "1998", label: "beekeeping professionally since then" },
      { big: "4.9", label: "rating on Google (20 reviews)", href: site.googleProfile },
    ],
  },
  de: {
    alt: "Fünf Gläser Honig von Čebelarstvo Vidovič in einer Reihe: Kastanie, Wald, Linde, Blüten und Akazie",
    place: "Apače bei Kidričevo, Dravsko polje, Slowenien",
    h1: "Unser Honig,",
    h1em: "mit\u00a0Liebe gemacht.",
    lead: "Von unseren Bienenständen zu Hause im Dravsko polje, in den Haloze und im Prekmurje. Sechs Honigsorten, die ich selbst schleudere und abfülle.",
    see: "Honig ansehen",
    glance: "Auf einen Blick",
    trust: [
      { big: "15+", label: "Goldmedaillen und Auszeichnungen" },
      { big: "6", label: "Honigsorten in Gläsern zu 250, 450 und 900 g" },
      { big: "1998", label: "seitdem Imker im Hauptberuf" },
      { big: "4,9", label: "auf Google, aus 20 Bewertungen", href: site.googleProfile },
    ],
  },
};

export function Hero({ lang }: { lang: Lang }) {
  const t = T[lang];
  const s = (i: number) => ({ "--i": i }) as React.CSSProperties;
  return (
    <>
      <section className="hero on-dark relative overflow-hidden bg-smola" data-bee-sky="">
        <div className="wrap hero-wrap relative z-[1] grid gap-10 pt-[calc(var(--header-h)+2rem)] pb-10 md:pt-[calc(var(--header-h)+3rem)] xl:min-h-[min(88svh,820px)] xl:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] xl:items-center xl:gap-12 xl:pt-[calc(var(--header-h)+3.5rem)] xl:pb-12">
          <div className="hero-media xl:col-start-2 xl:row-start-1">
            <HeroComb />
            <div className="hero-photo" data-tilt="">
              <Photo slug="medovi-pet" alt={t.alt} sizes="(min-width: 1280px) 720px, (min-width: 768px) 720px, 92vw" priority className="unveil h-full w-full" />
              <HoneyDrip id="hero-pour" preset="photo" />
            </div>
          </div>

          <div className="xl:col-start-1 xl:row-start-1">
            <p className="eyebrow rise" style={s(0)}>
              {t.place}
            </p>
            <h1 className="display mt-4 text-[clamp(2.9rem,11vw,5.4rem)]">
              <span className="rise block" style={s(1)}>
                {t.h1}
              </span>
              <span className="rise block" style={s(2)}>
                <em>{t.h1em}</em>
              </span>
            </h1>
            <p className="lead rise mt-6 max-w-[34ch]" style={s(3)}>
              {t.lead}
            </p>
            <div className="rise mt-8 flex flex-col gap-3 whitespace-nowrap sm:flex-row sm:items-center" style={s(4)}>
              <CallButton lang={lang} magnetic />
              <a href="#med" className="btn btn-ghost">
                {t.see} <Arrow />
              </a>
            </div>
          </div>
        </div>

        <div className="wrap hero-wrap relative z-[1] pb-12 lg:pb-14">
          <ul className="hero-trust rise grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4" style={s(5)} aria-label={t.glance}>
            {t.trust.map((item) => (
              <li key={item.big} className="border-l border-white/15 pl-4">
                <span className="num block text-[clamp(1.75rem,5vw,2.125rem)] leading-none text-akacija">{item.big}</span>
                <span className="mt-2 block max-w-[24ch] text-[0.9375rem] leading-snug opacity-85">
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="link">
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <HoneyDrip id="hero-edge" />
    </>
  );
}
