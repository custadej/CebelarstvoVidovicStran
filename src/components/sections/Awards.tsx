import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Rail } from "@/components/Rail";
import { Arrow, MedalDot, SectionHead } from "@/components/ui";
import { awardLabel, getContent, honeyName } from "@/data";
import { localePath, type Lang } from "@/i18n";
import { ui } from "@/i18n/ui";
import { site } from "@/lib/site";

const T = {
  sl: {
    eyebrow: "Priznanja in nagrade",
    title: (
      <>
        Državni prvak. <em>In več kot 15 zlatih.</em>
      </>
    ),
    latest: "Zlata medalja AGRA za cvetlični med",
    all: "Vsa priznanja po letih",
    rating: "4,9",
    outOf: "od 5 na Googlu",
    count: "20 mnenj",
    reviews: "Mnenja kupcev",
    translated: "",
    fan: [
      "Plaketa znak kakovosti 2019, Dobrote slovenskih kmetij",
      "Zlata medalja AGRA 2026 za cvetlični med",
      "Listina državni prvak za cvetlični med 2019, Čebelarska zveza Slovenije",
    ],
  },
  en: {
    eyebrow: "Awards",
    title: (
      <>
        National champion. <em>And more than 15 golds.</em>
      </>
    ),
    latest: "AGRA gold medal for wildflower honey",
    all: "All awards by year",
    rating: "4.9",
    outOf: "out of 5 on Google",
    count: "20 reviews",
    reviews: "Customer reviews",
    translated: "translated from Slovenian",
    fan: [
      "Quality mark plaque 2019, Dobrote slovenskih kmetij",
      "Gold medal AGRA 2026 for wildflower honey",
      "Certificate: national champion for wildflower honey 2019, Slovenian Beekeepers' Association",
    ],
  },
  de: {
    eyebrow: "Auszeichnungen",
    title: (
      <>
        Slowenischer Meister. <em>Und mehr als 15 Mal Gold.</em>
      </>
    ),
    latest: "AGRA-Goldmedaille für Blütenhonig",
    all: "Alle Auszeichnungen nach Jahren",
    rating: "4,9",
    outOf: "von 5 auf Google",
    count: "20 Bewertungen",
    reviews: "Kundenmeinungen",
    translated: "aus dem Slowenischen übersetzt",
    fan: [
      "Plakette Qualitätszeichen 2019, Dobrote slovenskih kmetij",
      "Goldmedaille AGRA 2026 für Blütenhonig",
      "Urkunde Slowenischer Meister für Blütenhonig 2019, Slowenischer Imkerverband",
    ],
  },
};

// Full cards, used on /priznanja.
export function AwardLeads({ lang }: { lang: Lang }) {
  const { awardLeads } = getContent(lang);
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {awardLeads.map((a, i) => (
        <li key={a.image} className="rounded-3xl bg-smola-2 p-6 md:p-8" data-reveal="">
          <div className="sheet mx-auto w-[62%] max-w-[230px]" style={{ "--tilt": `${[-3, 2, -2][i]}deg` } as React.CSSProperties}>
            <Photo slug={a.image} alt={a.alt} sizes="230px" className="aspect-[3/4]" />
          </div>
          <p className="num mt-7 text-[1.5rem] leading-none text-akacija">{a.year}</p>
          <h3 className="h-card mt-2">{a.title}</h3>
          <p className="mt-3 text-[1.0625rem] leading-snug">{a.text}</p>
        </li>
      ))}
    </ul>
  );
}

// One list, newest year first. The three big ones (awardLeads) are shown in place at their year on phones and
// tablets; from lg up they are the card row above the list (AwardLeads), so they are hidden here.
export function AwardYears({ lang, withImages = false, inlineLeads = false }: { lang: Lang; withImages?: boolean; inlineLeads?: boolean }) {
  const c = getContent(lang);
  return (
    <ol className="grid gap-px overflow-hidden rounded-3xl bg-white/15">
      {c.awardYears.map((y) => {
        const leads = inlineLeads ? c.awardLeads.filter((a) => a.year === y.year) : [];
        const big = leads.length > 0;
        return (
          <li key={y.year} className={`grid gap-4 bg-smola-2 p-6 md:grid-cols-[7rem_1fr_auto] md:items-start md:gap-8 md:p-8 ${big ? "max-lg:border-l-4 max-lg:border-med" : ""}`} data-reveal="">
            <p className={`num leading-none text-akacija ${big ? "text-[4rem] lg:text-[2.75rem]" : "text-[2.75rem]"}`}>{y.year}</p>
            <div>
              {big ? (
                <ul className="mb-5 grid gap-4 lg:hidden">
                  {leads.map((a) => (
                    <li key={a.image} className="rounded-2xl bg-smola p-5 shadow-[inset_0_0_0_1.5px_rgb(212_134_27/0.7)]">
                      <div className="flex items-start gap-4">
                        <div className="sheet w-[84px] flex-none" style={{ "--tilt": "-3deg" } as React.CSSProperties}>
                          <Photo slug={a.image} alt={a.alt} sizes="84px" className="aspect-[3/4]" />
                        </div>
                        <div>
                          <h3 className="h-card !text-[1.4rem] text-akacija">{a.title}</h3>
                          <p className="mt-2 text-[1rem] leading-snug">{a.text}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
              <ul className="grid gap-2">
                {y.awards.map((a) => (
                  <li
                    key={`${a.event}-${a.honey}-${a.medal}`}
                    className={`items-baseline gap-3 leading-snug ${big && a.medal === "naziv" ? "hidden lg:flex" : "flex"}`}
                  >
                    <span className="translate-y-[1px]">
                      <MedalDot medal={a.medal} />
                    </span>
                    <span>
                      <strong>{awardLabel(c, a)}</strong>
                      <span className="muted"> · {honeyName(c, a.honey)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {withImages && y.image ? (
              <div className={`sheet w-[150px] ${big ? "hidden lg:block" : ""}`} style={{ "--tilt": "2deg" } as React.CSSProperties}>
                <Photo slug={y.image} alt={y.imageAlt ?? ""} sizes="150px" />
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

const fan = [
  { slug: "znak-kakovosti-2019", tilt: -7, x: "-58%", z: 1 },
  { slug: "priznanje-agra-2026-zlata", tilt: 6, x: "58%", z: 1 },
  { slug: "priznanje-drzavni-prvak", tilt: -1, x: "0%", z: 2 },
] as const;

export function Awards({ lang }: { lang: Lang }) {
  const t = T[lang];
  const { awardLeads, reviews } = getContent(lang);
  return (
    <section id="priznanja" className="section on-dark bg-smola">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <SectionHead n="03" eyebrow={t.eyebrow} title={t.title} />
            <ul className="mt-7 grid gap-px overflow-hidden rounded-2xl bg-white/15" data-reveal="">
              {awardLeads.map((a) => (
                <li key={a.image} className="flex items-baseline gap-4 bg-smola-2 px-5 py-4">
                  <span className="num w-[3.2rem] flex-none text-[1.35rem] leading-none text-akacija">{a.year}</span>
                  <span className="leading-snug font-semibold">{a.title}</span>
                </li>
              ))}
              <li className="flex items-baseline gap-4 bg-smola-2 px-5 py-4">
                <span className="num w-[3.2rem] flex-none text-[1.35rem] leading-none text-akacija">2026</span>
                <span className="leading-snug font-semibold">{t.latest}</span>
              </li>
            </ul>
            <Link href={localePath(lang, "/priznanja/")} className="arrow-link mt-5 text-akacija">
              {t.all} <Arrow />
            </Link>
          </div>

          <div className="relative mx-auto h-[300px] w-full max-w-[460px] md:h-[380px]" data-reveal="">
            {fan.map((f, i) => (
              <div key={f.slug} className="absolute top-1/2 left-1/2 w-[46%]" style={{ transform: `translate(calc(-50% + ${f.x}), -50%)`, zIndex: f.z }}>
                <div className="sheet" style={{ "--tilt": `${f.tilt}deg` } as React.CSSProperties}>
                  <Photo slug={f.slug} alt={t.fan[i]} sizes="220px" className="aspect-[3/4]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/15 pt-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12" data-reveal="">
          <p className="flex items-end gap-3">
            <span className="num text-[3.5rem] leading-[0.85] text-akacija">{t.rating}</span>
            <span className="pb-0.5 text-[0.95rem] leading-snug">
              {t.outOf}
              <br />
              <a href={site.googleProfile} target="_blank" rel="noopener noreferrer" className="link font-semibold">
                {t.count}
              </a>
            </span>
          </p>
          <Rail lang={lang} label={t.reviews} className="-mr-7 gap-3 pr-7 md:mr-0 md:grid md:grid-cols-3 md:overflow-visible md:pr-0">
            {reviews.slice(0, 3).map((r) => (
              <div key={r.text} role="listitem" className="w-[74vw] max-w-[300px] rounded-2xl bg-smola-2 p-5 md:w-auto md:max-w-none">
                <blockquote className="leading-snug font-semibold">{ui[lang].quote(r.text)}</blockquote>
                <p className="muted mt-2 text-[0.875rem]">
                  {r.author} · {r.source}
                  {t.translated ? ` · ${t.translated}` : null}
                </p>
              </div>
            ))}
          </Rail>
        </div>
      </div>
    </section>
  );
}
