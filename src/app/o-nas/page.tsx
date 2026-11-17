import { CallBand, PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Timeline } from "@/components/sections/Story";
import { CallButton, JsonLd } from "@/components/ui";
import { story } from "@/data/content";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "O nas: Jože Vidovič, čebelar iz Apač pri Kidričevem",
  description:
    "Zgodba Jožeta Vidoviča: s čebelami od konca osnovne šole, poklicno od leta 1998, samostojno od 2014. Čebelnjaki na Dravskem polju, v Halozah in v Prekmurju, vzreja matic, državni prvak za cvetlični med 2019.",
  path: "/o-nas/",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="O nas"
        title={
          <>
            Kar delaš, delaj <em>z ljubeznijo.</em>
          </>
        }
        lead="Sem Jože Vidovič. S čebelami delam od konca osnovne šole, od leta 2014 na svojem."
        image="cebelnjak-kombi"
        imageAlt="Prevozni čebelnjak s pisanimi panjskimi končnicami in kombi Čebelarstva Vidovič"
        crumbs={[{ href: "/", label: "Domov" }, { label: "O nas" }]}
      />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="prose" data-reveal="">
            {story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>Pri delu pomagajo domači in prijatelji. Čebelnjaki stojijo doma na Dravskem polju, v Halozah in v Prekmurju.</p>
          </div>
          <div>
            <figure data-reveal="">
              <Photo
                slug="joze-cebelnjak"
                alt="Jože Vidovič ob prevoznem čebelnjaku"
                sizes="300px"
                className="w-full max-w-[300px] rotate-[-2deg] rounded-md border-[8px] border-white shadow-[0_24px_40px_-24px_rgb(31_23_17/0.7)]"
              />
              <figcaption className="mt-4 text-[1.0625rem]">Jože ob prevoznem čebelnjaku.</figcaption>
            </figure>
            <blockquote className="display mt-10 max-w-[16ch] rounded-3xl bg-med p-8 text-[clamp(1.7rem,5vw,2.5rem)] leading-[1.08]" data-reveal="">
              „{story.quote}“
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section bg-papir">
        <div className="wrap">
          <h2 className="display h-section" data-split="">
            Čebelnjaki <em>doma in na paši.</em>
          </h2>
          <div className="mt-10 grid gap-3 md:grid-cols-3 md:gap-4">
            <Photo slug="cebelnjak-fronta" alt="Pisane panjske končnice prevoznega čebelnjaka" sizes="(min-width: 768px) 66vw, 92vw" className="frame aspect-[3/2] md:col-span-2" parallax />
            <Photo slug="cebelnjak-barvanje" alt="Barvanje panjskih končnic" sizes="(min-width: 768px) 33vw, 92vw" className="frame aspect-[3/2] md:aspect-auto" />
            <Photo slug="haloze-sadovnjak" alt="Cvetoč sadovnjak med haloškimi griči" sizes="(min-width: 768px) 33vw, 92vw" className="frame aspect-[3/2]" />
            <Photo slug="cebelnjak-dolina" alt="Čebelnjak in kombi v dolini v Halozah" sizes="(min-width: 768px) 33vw, 92vw" className="frame aspect-[3/2]" />
            <Photo slug="haloze-megla" alt="Čebelnjak v jutranji megli" sizes="(min-width: 768px) 33vw, 92vw" className="frame aspect-[3/2]" />
          </div>
          <div className="mt-14">
            <Timeline />
          </div>
        </div>
      </section>

      <CallBand
        title={
          <>
            Oglasite se, <em>po dogovoru.</em>
          </>
        }
      >
        <CallButton magnetic />
      </CallBand>
      <JsonLd data={breadcrumbSchema([{ name: "O nas", path: "/o-nas/" }])} />
    </>
  );
}
