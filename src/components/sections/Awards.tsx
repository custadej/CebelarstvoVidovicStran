import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Arrow, MedalDot, SectionHead } from "@/components/ui";
import { awardLeads, awardYears, medalLabel } from "@/data/content";

export function AwardLeads() {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {awardLeads.map((a, i) => (
        <li key={a.title} className="rounded-3xl bg-smola-2 p-6 md:p-8" data-reveal="">
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

export function AwardYears({ withImages = false }: { withImages?: boolean }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-3xl bg-white/15">
      {awardYears.map((y) => (
        <li key={y.year} className="grid gap-4 bg-smola-2 p-6 md:grid-cols-[7rem_1fr_auto] md:items-start md:gap-8 md:p-8" data-reveal="">
          <p className="num text-[2.75rem] leading-none text-akacija">{y.year}</p>
          <ul className="grid gap-2">
            {y.awards.map((a) => (
              <li key={`${a.event}-${a.honey}-${a.medal}`} className="flex items-baseline gap-3 leading-snug">
                <span className="translate-y-[1px]">
                  <MedalDot medal={a.medal} />
                </span>
                <span>
                  <strong>{a.medal === "naziv" ? a.event : `${medalLabel[a.medal]}, ${a.event}`}</strong>
                  <span className="muted"> · {a.honey}</span>
                </span>
              </li>
            ))}
          </ul>
          {withImages && y.image ? (
            <div className="sheet w-[150px]" style={{ "--tilt": "2deg" } as React.CSSProperties}>
              <Photo slug={y.image} alt={y.imageAlt ?? ""} sizes="150px" />
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function Awards() {
  return (
    <section id="priznanja" className="section on-dark bg-smola">
      <div className="wrap">
        <SectionHead
          n="05"
          eyebrow="Priznanja in nagrade"
          title={
            <>
              O medu naj povedo <em>ocenjevalci.</em>
            </>
          }
          lead="Od leta 2017 naš med ocenjujejo na sejmu AGRA v Gornji Radgoni in na Dobrotah slovenskih kmetij na Ptuju."
        />
        <div className="mt-12">
          <AwardLeads />
        </div>
        <div className="scroller -mr-5 mt-10 pt-4 pr-5 md:mr-0 md:pr-0">
          {(["priznanje-agra-2026-zlata", "priznanja-2025", "priznanja-agra-2024", "priznanja-agra-2022", "medalja-agra-2020", "priznanje-agra-2018"] as const).map((slug, i) => (
            <div key={slug} className="sheet w-[58vw] max-w-[240px]" style={{ "--tilt": `${[-2, 1.5, -1, 2, -1.5, 1][i]}deg` } as React.CSSProperties}>
              <Photo slug={slug} alt={`Priznanje za med, ${slug.replace(/\D+/g, " ").trim()}`} sizes="240px" className="aspect-[3/4]" />
            </div>
          ))}
        </div>
        <Link href="/priznanja/" className="arrow-link mt-6 text-akacija">
          Vsa priznanja po letih <Arrow />
        </Link>
      </div>
    </section>
  );
}
