import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Arrow, MedalDot, SectionHead } from "@/components/ui";
import { awardLeads, awardYears, medalLabel, reviews } from "@/data/content";
import { site } from "@/lib/site";

// Full cards, used on /priznanja.
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

const fan = [
  { slug: "znak-kakovosti-2019", alt: "Plaketa znak kakovosti 2019, Dobrote slovenskih kmetij", tilt: -7, x: "-58%", z: 1 },
  { slug: "priznanje-agra-2026-zlata", alt: "Zlata medalja AGRA 2026 za cvetlični med", tilt: 6, x: "58%", z: 1 },
  { slug: "priznanje-drzavni-prvak", alt: "Listina državni prvak za cvetlični med 2019, Čebelarska zveza Slovenije", tilt: -1, x: "0%", z: 2 },
] as const;

export function Awards() {
  return (
    <section id="priznanja" className="section on-dark bg-smola">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <SectionHead
              n="03"
              eyebrow="Priznanja in nagrade"
              title={
                <>
                  Državni prvak. <em>In več kot 15 zlatih.</em>
                </>
              }
            />
            <ul className="mt-7 grid gap-px overflow-hidden rounded-2xl bg-white/15" data-reveal="">
              {awardLeads.map((a) => (
                <li key={a.title} className="flex items-baseline gap-4 bg-smola-2 px-5 py-4">
                  <span className="num w-[3.2rem] flex-none text-[1.35rem] leading-none text-akacija">{a.year}</span>
                  <span className="leading-snug font-semibold">{a.title}</span>
                </li>
              ))}
              <li className="flex items-baseline gap-4 bg-smola-2 px-5 py-4">
                <span className="num w-[3.2rem] flex-none text-[1.35rem] leading-none text-akacija">2026</span>
                <span className="leading-snug font-semibold">Zlata medalja AGRA za cvetlični med</span>
              </li>
            </ul>
            <Link href="/priznanja/" className="arrow-link mt-5 text-akacija">
              Vsa priznanja po letih <Arrow />
            </Link>
          </div>

          <div className="relative mx-auto h-[300px] w-full max-w-[460px] md:h-[380px]" data-reveal="">
            {fan.map((f) => (
              <div key={f.slug} className="absolute top-1/2 left-1/2 w-[46%]" style={{ transform: `translate(calc(-50% + ${f.x}), -50%)`, zIndex: f.z }}>
                <div className="sheet" style={{ "--tilt": `${f.tilt}deg` } as React.CSSProperties}>
                  <Photo slug={f.slug} alt={f.alt} sizes="220px" className="aspect-[3/4]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/15 pt-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12" data-reveal="">
          <p className="flex items-end gap-3">
            <span className="num text-[3.5rem] leading-[0.85] text-akacija">4,9</span>
            <span className="pb-0.5 text-[0.95rem] leading-snug">
              od 5 na Googlu
              <br />
              <a href={site.googleProfile} target="_blank" rel="noopener noreferrer" className="link font-semibold">
                20 mnenj
              </a>
            </span>
          </p>
          <ul className="rail -mx-7 gap-3 px-7 md:mx-0 md:grid md:grid-cols-3 md:px-0">
            {reviews.slice(0, 3).map((r) => (
              <li key={r.text} className="w-[78vw] max-w-[320px] rounded-2xl bg-smola-2 p-5 md:w-auto md:max-w-none">
                <blockquote className="leading-snug font-semibold">„{r.text}“</blockquote>
                <p className="muted mt-2 text-[0.875rem]">
                  {r.author} · {r.source}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
