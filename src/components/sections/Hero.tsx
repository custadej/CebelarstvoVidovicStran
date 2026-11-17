import { Photo } from "@/components/Photo";
import { Arrow, CallButton } from "@/components/ui";
import type { Lang } from "@/i18n";
import { site } from "@/lib/site";

// Honey first. The photo has no frame: it fades into the dark on every side. It keeps its 3:2 shape (never cropped
// into the jars) and is never wider than ~780 CSS px on large screens, so the 1456 px source stays sharp.
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
      <div className="relative lg:flex lg:min-h-[min(88svh,820px)] lg:items-center lg:pt-[calc(var(--header-h)+3rem)]">
        <div className="hero-photo">
          <Photo
            slug="medovi-pet"
            alt={t.alt}
            sizes="(min-width: 1024px) min(54vw, 780px), 100vw"
            priority
            className="unveil h-full w-full"
          />
        </div>

        <div className="wrap relative z-[1] -mt-8 pb-10 sm:-mt-14 lg:mt-0 lg:pb-12">
        <div className="lg:max-w-[33rem]">
          <p className="eyebrow rise" style={s(0)}>
            {t.place}
          </p>
          <h1 className="display mt-4 text-[clamp(2.9rem,11vw,5.6rem)]">
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
          <div className="rise mt-8 flex flex-col gap-3 whitespace-nowrap sm:flex-row sm:flex-wrap sm:items-center" style={s(4)}>
            <CallButton lang={lang} magnetic />
            <a href="#med" className="btn btn-ghost">
              {t.see} <Arrow />
            </a>
          </div>
        </div>
        </div>
      </div>

      <div className="wrap relative z-[1] pb-12 lg:pb-14">
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
    <HoneyDrip />
    </>
  );
}

// Honey running over the bottom edge of the hero. Static shape; the drips grow and one drop falls (CSS, motion-safe).
function HoneyDrip() {
  return (
    <div className="honey-drip" aria-hidden="true">
      <svg viewBox="0 0 1440 28" preserveAspectRatio="none" className="honey-drip-band">
        <defs>
          <linearGradient id="drip-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e9a53a" />
            <stop offset="1" stopColor="#c47812" />
          </linearGradient>
        </defs>
        <path
          d="M0 0H1440V14C1380 18 1330 12 1270 16S1150 26 1090 18 980 10 900 17 760 24 690 15 560 8 470 18 330 26 250 16 110 9 0 16Z"
          fill="url(#drip-fill)"
        />
      </svg>
      {[
        { left: "17%", h: 34, d: 0 },
        { left: "46%", h: 22, d: 1.6 },
        { left: "71%", h: 46, d: 0.8 },
        { left: "89%", h: 18, d: 2.4 },
      ].map((drip) => (
        <span key={drip.left} className="drip" style={{ left: drip.left, "--h": `${drip.h}px`, "--d": `${drip.d}s` } as React.CSSProperties}>
          <span className="drip-stem" />
          <span className="drip-bulb" />
          <span className="drip-fall" />
        </span>
      ))}
    </div>
  );
}
