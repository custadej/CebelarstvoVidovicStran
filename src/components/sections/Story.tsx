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
        <div className="grid gap-10 md:grid-cols-[minmax(0,300px)_1fr] md:items-center md:gap-14 lg:gap-20">
          <figure className="mx-auto w-full max-w-[300px]" data-reveal="">
            <Photo
              slug="joze-cebelnjak"
              alt="Jože Vidovič ob prevoznem čebelnjaku"
              sizes="300px"
              className="aspect-[3/2] rotate-[-2deg] rounded-md border-[8px] border-white shadow-[0_24px_40px_-24px_rgb(31_23_17/0.7)]"
            />
            <figcaption className="mt-4 text-center text-[1.0625rem] leading-snug">
              <strong>Jože Vidovič</strong>, čebelar
            </figcaption>
          </figure>
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
            <div className="prose mt-6" data-reveal="">
              <p>
                Čebelarstva sem se učil pri čebelarju Janku Pislaku, kjer sem bil od leta 1998 redno zaposlen. Leta 2014 sem začel na svojem: s prvimi 60 panji in
                prevoznim čebelnjakom, ki smo ga izdelali doma.
              </p>
              <p>Danes čebelnjaki stojijo doma na Dravskem polju, v Halozah in v Prekmurju. Pri delu pomagajo domači in prijatelji.</p>
            </div>
            <blockquote className="display mt-6 max-w-[22ch] border-l-4 border-med pl-5 text-[clamp(1.4rem,4.4vw,1.9rem)] leading-[1.15]" data-reveal="">
              „{story.quote}“
            </blockquote>
            <Link href="/o-nas/" className="arrow-link mt-6">
              Preberite celo zgodbo <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
