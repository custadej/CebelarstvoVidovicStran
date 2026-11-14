import { notFound } from "next/navigation";
import { CallBand, PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { HoneyGrid } from "@/components/sections/Honeys";
import { CallButton, JsonLd, MedalDot } from "@/components/ui";
import { awardYears, honeys, medalLabel } from "@/data/content";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema, honeySchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return honeys.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: PageProps<"/med/[slug]">) {
  const { slug } = await params;
  const h = honeys.find((x) => x.slug === slug);
  if (!h) return {};
  return pageMeta({ title: h.seoTitle, description: h.seoDescription, path: `/med/${h.slug}/` });
}

export default async function Page({ params }: PageProps<"/med/[slug]">) {
  const { slug } = await params;
  const h = honeys.find((x) => x.slug === slug);
  if (!h) notFound();

  const awards = awardYears.flatMap((y) => y.awards.filter((a) => a.honey === h.name).map((a) => ({ ...a, year: y.year })));
  const schema = honeySchema(h.slug);

  return (
    <>
      <PageHero
        eyebrow={h.tag}
        title={
          <>
            {h.short} <em>med.</em>
          </>
        }
        lead={h.intro}
        image={h.photo}
        imageAlt={h.photoAlt}
        crumbs={[{ href: "/", label: "Domov" }, { href: "/med/", label: "Med" }, { label: h.short }]}
      >
        <CallButton label="Pokličite za med" magnetic />
      </PageHero>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <dl className="grid gap-px overflow-hidden rounded-3xl bg-crta sm:grid-cols-2">
              {h.facts.map((f) => (
                <div key={f.label} className="bg-papir p-6" data-reveal="">
                  <dt className="eyebrow">{f.label}</dt>
                  <dd className="h-card mt-2 !text-[1.4rem]">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="prose mt-10" data-reveal="">
              {h.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-10 rounded-3xl p-7 md:p-9" style={{ background: h.color, color: h.tone === "dark" ? "#f6efdf" : "#1f1711" }} data-reveal="">
              <p className="text-[0.8125rem] font-semibold tracking-[0.14em] uppercase opacity-80">V kuhinji</p>
              <p className="h-card mt-3">{h.kitchen}</p>
            </div>
            {awards.length ? (
              <div className="mt-10" data-reveal="">
                <h2 className="h-card">Priznanja za {h.name.toLowerCase()}</h2>
                <ul className="mt-4 grid gap-2">
                  {awards.map((a) => (
                    <li key={`${a.year}-${a.event}-${a.medal}`} className="flex items-baseline gap-3 border-t border-crta pt-2">
                      <MedalDot medal={a.medal} />
                      <span>
                        <span className="num mr-2 text-[1.2rem]">{a.year}</span>
                        {a.medal === "naziv" ? a.event : `${medalLabel[a.medal]}, ${a.event}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div>
            <div className="sticky top-28">
              <Photo
                slug={h.jar}
                alt={`Kozarec: ${h.name.toLowerCase()} Čebelarstva Vidovič`}
                sizes="(min-width: 1024px) 380px, 70vw"
                className="frame mx-auto w-[70%] max-w-[380px] lg:w-full"
              />
              <p className="mt-6 text-center">
                Kozarci <strong>250 g, 450 g in 900 g</strong>. Večje količine po dogovoru.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-papir">
        <div className="wrap">
          <h2 className="display h-section" data-split="">
            Ostali <em>medovi.</em>
          </h2>
          <div className="mt-10">
            <HoneyGrid exclude={h.slug} />
          </div>
        </div>
      </section>

      <CallBand
        title={
          <>
            Je trenutno <em>na zalogi?</em>
          </>
        }
      >
        <CallButton magnetic />
      </CallBand>
      <JsonLd
        data={[
          ...(schema ? [schema] : []),
          breadcrumbSchema([
            { name: "Med", path: "/med/" },
            { name: h.name, path: `/med/${h.slug}/` },
          ]),
        ]}
      />
    </>
  );
}
