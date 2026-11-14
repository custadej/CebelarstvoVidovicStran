import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Arrow, SectionHead } from "@/components/ui";
import { story } from "@/data/content";

export function Timeline() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-3xl bg-crta sm:grid-cols-2 lg:grid-cols-5">
      {story.timeline.map((t) => (
        <li key={t.year} className="bg-papir p-6" data-reveal="">
          <p className="num text-[2.5rem] leading-none text-kostanj">{t.year}</p>
          <p className="mt-3 text-[1.0625rem] leading-snug">{t.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Story() {
  return (
    <section id="o-nas" className="section">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHead
              n="04"
              eyebrow="O nas"
              title={
                <>
                  S čebelami <em>od konca osnovne šole.</em>
                </>
              }
            />
            <div className="prose mt-8" data-reveal="">
              <p>{story.paragraphs[0]}</p>
              <p>{story.paragraphs[3]}</p>
            </div>
            <figure className="mt-10 flex items-center gap-5" data-reveal="">
              <Photo
                slug="joze-cebelnjak"
                alt="Jože Vidovič ob prevoznem čebelnjaku"
                sizes="150px"
                className="h-[112px] w-[150px] flex-none rotate-[-3deg] rounded-md border-[6px] border-white shadow-[0_18px_30px_-18px_rgb(31_23_17/0.7)]"
              />
              <figcaption className="text-[1.0625rem] leading-snug">
                <strong>Jože Vidovič</strong>
                <br />
                čebelar, Apače pri Kidričevem
              </figcaption>
            </figure>
            <Link href="/o-nas/" className="arrow-link mt-8">
              Preberite celo zgodbo <Arrow />
            </Link>
          </div>
          <div className="relative">
            <Photo
              slug="cebelnjak-dolina"
              alt="Prevozni čebelnjak in kombi Čebelarstva Vidovič v dolini v Halozah"
              sizes="(min-width: 1024px) 600px, 92vw"
              className="frame aspect-[3/2]"
              parallax
            />
            <blockquote className="display relative z-10 -mt-8 ml-4 max-w-[17ch] rounded-3xl bg-med p-7 text-[clamp(1.6rem,5vw,2.4rem)] leading-[1.08] text-smola shadow-[0_30px_50px_-30px_rgb(31_23_17/0.8)] md:-mt-14 md:ml-10 md:p-9" data-reveal="">
              „{story.quote}“
            </blockquote>
            <Photo
              slug="cebelnjak-barvanje"
              alt="Barvanje panjskih končnic na domačem čebelnjaku"
              sizes="(min-width: 1024px) 320px, 60vw"
              className="frame mt-6 ml-auto aspect-[4/3] w-[62%]"
            />
          </div>
        </div>
        <div className="mt-14 lg:mt-20">
          <Timeline />
        </div>
      </div>
    </section>
  );
}
