import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Arrow, SectionHead } from "@/components/ui";
import { getContent } from "@/data";
import { localePath, type Lang } from "@/i18n";
import { ui } from "@/i18n/ui";

const T = {
  sl: {
    alt: "Jože Vidovič ob prevoznem čebelnjaku",
    role: "čebelar",
    eyebrow: "O nas",
    title: (
      <>
        S čebelami <em>od konca osnovne šole.</em>
      </>
    ),
    p1: "Čebelarstva sem se učil pri čebelarju Janku Pislaku, kjer sem bil od leta 1998 redno zaposlen. Leta 2014 sem začel na svojem: s prvimi 60 panji in prevoznim čebelnjakom, ki smo ga izdelali doma.",
    p2: "Danes čebelnjaki stojijo doma na Dravskem polju, v Halozah in v Prekmurju. Pri delu pomagajo domači in prijatelji.",
    more: "Preberite celo zgodbo",
  },
  en: {
    alt: "Jože Vidovič by his mobile apiary",
    role: "beekeeper",
    eyebrow: "About us",
    title: (
      <>
        With bees <em>since primary school.</em>
      </>
    ),
    p1: "I learned beekeeping from the beekeeper Janko Pislak, where I worked full time from 1998. In 2014 I started on my own, with my first 60 hives and a mobile apiary we built at home.",
    p2: "Today our apiaries stand at home on Dravsko polje, in Haloze and in Prekmurje. Family and friends help with the work.",
    more: "Read the whole story",
  },
  de: {
    alt: "Jože Vidovič an seinem Wanderbienenstand",
    role: "Imker",
    eyebrow: "Über uns",
    title: (
      <>
        Mit Bienen <em>seit der Grundschule.</em>
      </>
    ),
    p1: "Das Imkern habe ich beim Imker Janko Pislak gelernt, bei dem ich ab 1998 fest angestellt war. 2014 machte ich mich selbstständig, mit den ersten 60 Beuten und einem Wanderbienenstand, den wir zu Hause gebaut haben.",
    p2: "Heute stehen unsere Bienenstände zu Hause im Dravsko polje, in den Haloze und im Prekmurje. Familie und Freunde helfen bei der Arbeit.",
    more: "Die ganze Geschichte lesen",
  },
};

export function Timeline({ lang }: { lang: Lang }) {
  const { story } = getContent(lang);
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

export function Story({ lang }: { lang: Lang }) {
  const t = T[lang];
  const { story } = getContent(lang);
  return (
    <section id="o-nas" className="section">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-[minmax(0,300px)_1fr] md:items-center md:gap-14 lg:gap-20">
          <figure className="mx-auto w-full max-w-[300px]" data-reveal="">
            <Photo
              slug="joze-cebelnjak"
              alt={t.alt}
              sizes="300px"
              className="aspect-[3/2] rotate-[-2deg] rounded-md border-[8px] border-white shadow-[0_24px_40px_-24px_rgb(31_23_17/0.7)]"
            />
            <figcaption className="mt-4 text-center text-[1.0625rem] leading-snug">
              <strong>Jože Vidovič</strong>, {t.role}
            </figcaption>
          </figure>
          <div>
            <SectionHead
              n="04"
              eyebrow={t.eyebrow}
              title={t.title}
            />
            <div className="prose mt-6" data-reveal="">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
            </div>
            <blockquote className="display mt-6 max-w-[22ch] border-l-4 border-med pl-5 text-[clamp(1.4rem,4.4vw,1.9rem)] leading-[1.15]" data-reveal="">
              {ui[lang].quote(story.quote)}
            </blockquote>
            <Link href={localePath(lang, "/o-nas/")} className="arrow-link mt-6">
              {t.more} <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
