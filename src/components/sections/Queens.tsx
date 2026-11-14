import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Arrow, CallButton, SectionHead } from "@/components/ui";
import { kisResults, queenFacts, queenSteps } from "@/data/content";

export function QueenFacts() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-3xl bg-white/15 md:grid-cols-3">
      {queenFacts.map((f) => (
        <li key={f.title} className="bg-hoja-2 p-7 md:p-8" data-reveal="">
          <h3 className="h-card text-akacija">{f.title}</h3>
          <p className="mt-3">{f.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function KisResults() {
  return (
    <div className="rounded-3xl bg-vosek p-7 text-smola md:p-10" data-reveal="">
      <p className="eyebrow">Test matic pri potomstvu · Kmetijski inštitut Slovenije</p>
      <h3 className="h-card mt-3 max-w-[22ch]">Naš matičar je bil dvakrat med najboljšimi v državi.</h3>
      <dl className="mt-7 grid gap-6 sm:grid-cols-2">
        {kisResults.map((r) => (
          <div key={r.year} className="border-t-2 border-smola pt-4">
            <dt className="num text-[2.75rem] leading-none">{r.year}</dt>
            {r.items.map((i) => (
              <dd key={i} className="mt-2 flex gap-2 leading-snug">
                <span aria-hidden="true" className="hex mt-[0.35em] h-3 w-3 flex-none bg-med" />
                {i}
              </dd>
            ))}
          </div>
        ))}
      </dl>
      <p className="muted mt-6 text-[0.95rem]">
        Uvrstitev matičarja po povprečnem donosu medu in med najmanj rojivimi, objavljene preglednice testa za leti 2023 in 2025.
      </p>
    </div>
  );
}

export function QueenStory() {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16" data-story="">
      <ol className="grid gap-12 lg:gap-0">
        {queenSteps.map((s) => (
          <li key={s.n} data-step="" className="lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center">
            <p className="num text-[4.5rem] leading-none text-akacija">{s.n}</p>
            <h3 className="display mt-2 text-[clamp(2rem,6vw,3rem)]">{s.title}</h3>
            <p className="mt-3 max-w-[36ch]">{s.text}</p>
            <div className="story-inline mt-6">
              <Photo slug={s.image} alt={s.alt} sizes="(min-width: 1024px) 45vw, 92vw" className="frame aspect-[4/3]" />
            </div>
          </li>
        ))}
      </ol>
      <div className="story-sticky">
        <div className="sticky top-[14vh] h-[72vh] overflow-hidden rounded-[2rem] bg-hoja-2">
          {queenSteps.map((s) => (
            <div key={s.n} data-step-img="" className="absolute inset-0">
              <Photo slug={s.image} alt="" sizes="45vw" className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Queens() {
  return (
    <section id="matice" className="section on-dark bg-hoja">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <SectionHead
            n="01"
            eyebrow="Matice čebel"
            title={
              <>
                Oplojene in označene matice. <em>Tudi po pošti.</em>
              </>
            }
            lead="Matice vzrejam od leta 2015. Čebelarji pridejo ponje tudi od daleč, lahko pa jih pošljem po pošti."
          />
          <div className="relative mx-auto w-full max-w-[460px]" data-reveal="">
            <Photo
              slug="matica-makro"
              alt="Označena matica kranjske čebele na robu satja med delavkami"
              sizes="(min-width: 1024px) 460px, 86vw"
              className="hex-tall aspect-[5/6]"
              position="58% 55%"
              parallax
            />
          </div>
        </div>

        <div className="mt-14 lg:mt-20">
          <QueenFacts />
        </div>
        <div className="mt-6">
          <KisResults />
        </div>

        <div className="mt-20 lg:mt-28">
          <p className="eyebrow">Od matičnika do pošte</p>
          <div className="mt-8">
            <QueenStory />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-10">
          <CallButton label="Pokličite za matice" magnetic />
          <Link href="/matice/" className="arrow-link">
            Več o maticah <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
