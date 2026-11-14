import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Contact } from "@/components/sections/Contact";
import { FaqList } from "@/components/sections/Faq";
import { KisResults, QueenFacts, QueenStory } from "@/components/sections/Queens";
import { CallButton, JsonLd } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Matice čebel: prodaja oplojenih in označenih matic",
  description:
    "Prodaja matic kranjske čebele: oplojene in označene, vzrejene pod nadzorom KIS. Osebni prevzem v Apačah pri Kidričevem ali po pošti, dostava naslednji dan po vsej Sloveniji. Naročila: 041 579 827.",
  path: "/matice/",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Matice čebel"
        title={
          <>
            Oplojene matice, <em>naslednji dan pri vas.</em>
          </>
        }
        lead="Oplojene in označene matice kranjske čebele iz registriranega vzrejališča. Prevzamete jih doma ali jih pošljem po pošti."
        image="matica-makro"
        imageAlt="Označena matica kranjske čebele na robu satja med delavkami"
        position="58% 55%"
        crumbs={[{ href: "/", label: "Domov" }, { label: "Matice" }]}
      >
        <CallButton label="Pokličite za matice" magnetic />
      </PageHero>

      <section className="section on-dark bg-hoja">
        <div className="wrap">
          <h2 className="display h-section max-w-[16ch]" data-split="">
            Kaj dobite <em>in kako.</em>
          </h2>
          <div className="mt-10">
            <QueenFacts />
          </div>
          <div className="mt-6">
            <KisResults />
          </div>
        </div>
      </section>

      <section className="section on-dark bg-hoja !pt-0">
        <div className="wrap">
          <p className="eyebrow">Od matičnika do pošte</p>
          <h2 className="display h-section mt-4 max-w-[14ch]" data-split="">
            Kako nastane <em>dobra matica.</em>
          </h2>
          <div className="mt-10">
            <QueenStory />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="display h-section max-w-[14ch]" data-split="">
            Iz našega <em>vzrejališča.</em>
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <Photo slug="matica-zelena" alt="Zeleno označena matica med delavkami na satju" sizes="(min-width: 768px) 50vw, 92vw" className="frame col-span-2 aspect-[4/3]" />
            <Photo slug="matica-v-kletko" alt="Vstavljanje matice v matičnico ob plemenilčku" sizes="(min-width: 768px) 25vw, 46vw" className="frame aspect-square" />
            <Photo slug="matica-kletka-roka" alt="Označena matica v matičnici v roki" sizes="(min-width: 768px) 25vw, 46vw" className="frame aspect-square" />
            <Photo slug="maticniki-v-panju" alt="Letvica z matičniki v panju" sizes="(min-width: 768px) 25vw, 46vw" className="frame aspect-square" />
            <Photo slug="plemenilcki-gozd" alt="Plemenilčki med drevesi" sizes="(min-width: 768px) 25vw, 46vw" className="frame aspect-square" />
            <Photo slug="matica-zelena-pokoncno" alt="Matica z zeleno oznako in spremljevalke" sizes="(min-width: 768px) 50vw, 92vw" className="frame col-span-2 aspect-[4/3]" position="50% 45%" />
          </div>
        </div>
      </section>

      <section className="section bg-papir">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="display h-section" data-split="">
            Vprašanja <em>o maticah.</em>
          </h2>
          <FaqList queensOnly />
        </div>
      </section>

      <Contact n="" />
      <JsonLd data={[faqSchema(true), breadcrumbSchema([{ name: "Matice", path: "/matice/" }])]} />
    </>
  );
}
