import Link from "next/link";
import { HoneyExplorer } from "@/components/HoneyExplorer";
import { Photo } from "@/components/Photo";
import { Arrow, CallButton, SectionHead } from "@/components/ui";
import { getContent } from "@/data";
import type { Honey } from "@/data/content";
import { localePath, type Lang } from "@/i18n";
import { ui } from "@/i18n/ui";

const T = {
  sl: {
    moreHoney: "Več o tem medu",
    sizes: "Pakiranja",
    sizesText: "Stekleni kozarci, večje količine po dogovoru. Na voljo so tudi darilne škatle.",
    where: "Kje ga dobite",
    whereTitle: "Doma v Apačah ali z dostavo.",
    whereText: "Po dogovoru med dostavimo na območju Ptuja in Maribora. Pokličite in povejte, katerega želite.",
    eyebrow: "Med",
    title: (
      <>
        Šest medov, <em>vsak s svoje paše.</em>
      </>
    ),
    all: "Vse o našem medu",
  },
  en: {
    moreHoney: "More about this honey",
    sizes: "Sizes",
    sizesText: "Glass jars, larger quantities by arrangement. Gift boxes are also available.",
    where: "Where to get it",
    whereTitle: "At our home in Apače, or delivered.",
    whereText: "By arrangement we deliver honey around Ptuj and Maribor. Call and tell us which one you would like.",
    eyebrow: "Honey",
    title: (
      <>
        Six honeys, <em>each from its own forage.</em>
      </>
    ),
    all: "All about our honey",
  },
  de: {
    moreHoney: "Mehr über diesen Honig",
    sizes: "Gebinde",
    sizesText: "Gläser, größere Mengen nach Absprache. Auch Geschenkboxen sind erhältlich.",
    where: "Wo Sie ihn bekommen",
    whereTitle: "Bei uns in Apače oder geliefert.",
    whereText: "Nach Absprache liefern wir Honig in der Gegend von Ptuj und Maribor. Rufen Sie an und sagen Sie, welchen Sie möchten.",
    eyebrow: "Honig",
    title: (
      <>
        Sechs Honige, <em>jeder aus seiner Tracht.</em>
      </>
    ),
    all: "Alles über unseren Honig",
  },
};

// Light to dark, the way the jars look on the shelf.
const order = ["akacijev", "cvetlicni", "lipov", "kostanjev", "gozdni", "hojev"];

function JarVisual({ lang, h, className = "" }: { lang: Lang; h: Honey; className?: string }) {
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <div
        aria-hidden="true"
        className="hex absolute inset-x-[8%] inset-y-[4%]"
        style={{ background: `radial-gradient(circle at 35% 25%, color-mix(in srgb, ${h.color} 70%, #fff), ${h.color} 55%, color-mix(in srgb, ${h.color} 72%, #000))` }}
      />
      <Photo slug={h.jar} alt={ui[lang].jarOf(h.name)} sizes="220px" className="hex-tall relative h-[86%] w-[58%]" position="50% 40%" />
    </div>
  );
}

function HoneyPanel({ lang, h }: { lang: Lang; h: Honey }) {
  return (
    <div className="grid gap-6 p-5 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-center sm:gap-8 md:p-8">
      <JarVisual lang={lang} h={h} className="mx-auto aspect-[4/5] w-[52%] max-w-[220px] sm:w-full" />
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-papir px-3 py-1 text-[0.8125rem] font-semibold tracking-wide">
          <span aria-hidden="true" className="hex h-3 w-3" style={{ background: h.color }} />
          {h.tag}
        </p>
        <h3 className="display mt-3 text-[clamp(1.9rem,6vw,2.75rem)]">{h.name}</h3>
        <p className="mt-3 max-w-[48ch]">{h.intro}</p>
        <dl className="mt-5 grid gap-x-6 gap-y-3 lg:grid-cols-3">
          {h.facts.slice(0, 3).map((f) => (
            <div key={f.label} className="border-t border-crta pt-2">
              <dt className="eyebrow !text-[0.75rem]">{f.label}</dt>
              <dd className="mt-1 text-[1.0625rem] leading-snug font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
        <Link href={localePath(lang, `/med/${h.slug}/`)} className="arrow-link mt-4 text-kostanj">
          {T[lang].moreHoney} <Arrow />
        </Link>
      </div>
    </div>
  );
}

// Used on /med and the honey subpages.
export function HoneyGrid({ lang, exclude }: { lang: Lang; exclude?: string }) {
  const list = getContent(lang).honeys.filter((h) => h.slug !== exclude);
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((h) => (
        <li key={h.slug} data-reveal="">
          <Link
            href={localePath(lang, `/med/${h.slug}/`)}
            className="group relative flex h-full min-h-[15rem] overflow-hidden rounded-3xl bg-papir p-6 shadow-[0_1px_0_#fff_inset,0_20px_40px_-30px_rgb(31_23_17/0.5)] transition-transform duration-200 ease-[var(--ease-ui)] active:scale-[0.985] md:p-7"
          >
            <div className="relative z-10 flex max-w-[58%] flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-vosek px-3 py-1 text-[0.8125rem] font-semibold tracking-wide">
                <span aria-hidden="true" className="hex h-3 w-3" style={{ background: h.color }} />
                {h.tag}
              </span>
              <h3 className="h-card mt-4">{h.name}</h3>
              <p className="mt-2 text-[1.0625rem] leading-snug">{h.card}</p>
              <span className="arrow-link mt-auto pt-4 text-kostanj">
                {ui[lang].more} <Arrow />
              </span>
            </div>
            <div
              aria-hidden="true"
              className="hex absolute -right-9 -bottom-10 h-48 w-44 transition-transform duration-500 ease-[var(--ease-story)] group-hover:scale-110 group-hover:-rotate-6"
              style={{ background: `radial-gradient(circle at 35% 25%, color-mix(in srgb, ${h.color} 70%, #fff), ${h.color} 55%, color-mix(in srgb, ${h.color} 70%, #000))` }}
            />
            <Photo slug={h.jar} alt={ui[lang].jarOf(h.name)} sizes="140px" className="hex-tall absolute right-4 bottom-4 h-[78%] w-[33%]" position="50% 40%" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Packaging({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-3xl bg-med p-6 text-smola md:p-8" data-reveal="">
        <p className="eyebrow !text-smola">{t.sizes}</p>
        <p className="num mt-3 text-[clamp(1.5rem,6.4vw,2.6rem)] leading-none whitespace-nowrap md:text-[clamp(1.35rem,2.9vw,2.6rem)]">
          250 g <span className="opacity-50">·</span> 450 g <span className="opacity-50">·</span> 900 g
        </p>
        <p className="mt-3 max-w-[38ch]">{t.sizesText}</p>
      </div>
      <div className="rounded-3xl bg-papir p-6 md:p-8" data-reveal="">
        <p className="eyebrow">{t.where}</p>
        <p className="h-card mt-3">{t.whereTitle}</p>
        <p className="mt-3 max-w-[40ch]">{t.whereText}</p>
      </div>
    </div>
  );
}

export function Honeys({ lang }: { lang: Lang }) {
  const t = T[lang];
  const { honeys } = getContent(lang);
  const scale = order.map((slug) => honeys.find((h) => h.slug === slug)).filter((h): h is Honey => h !== undefined);
  return (
    <section id="med" className="section">
      <div className="wrap">
        <SectionHead
          n="01"
          eyebrow={t.eyebrow}
          title={t.title}
        />
        <div className="mt-8 rounded-[2rem] bg-smola p-5 text-vosek md:p-8" data-reveal="">
          <HoneyExplorer
            lang={lang}
            items={scale.map((h) => ({ slug: h.slug, label: h.short, name: h.name, color: h.color }))}
            panels={scale.map((h) => (
              <HoneyPanel key={h.slug} lang={lang} h={h} />
            ))}
            initial={1}
          />
        </div>
        <div className="mt-4">
          <Packaging lang={lang} />
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <CallButton lang={lang} label={ui[lang].callHoney} variant="smola" />
          <Link href={localePath(lang, "/med/")} className="arrow-link">
            {t.all} <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
