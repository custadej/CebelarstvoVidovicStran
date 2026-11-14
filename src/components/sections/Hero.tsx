import Link from "next/link";
import { HeroPhotoSwitch } from "@/components/HeroPhotoSwitch";
import { Photo } from "@/components/Photo";
import { Arrow, CallButton } from "@/components/ui";
import { site } from "@/lib/site";

// Honey first. The photo is framed (never wider than ~600 px) so the source stays sharp on retina screens.
// TEMPORARY: three candidates with a switch (HeroPhotoSwitch). After Tadej picks one, keep only that entry.
const heroPhotos = [
  { slug: "medovi-pet", label: "pet kozarcev medu", alt: "Pet kozarcev medu Čebelarstva Vidovič v vrsti: kostanjev, gozdni, lipov, cvetlični in akacijev", position: "50% 50%" },
  { slug: "hero-matica-satje", label: "matica na satju", alt: "Matica med delavkami na satju", position: "55% 50%" },
  { slug: "cebele-satje", label: "čebele na satju (fb-081)", alt: "Čebele na svetlem satju", position: "30% 60%" },
] as const;

const trust = [
  { big: "15+", label: "zlatih medalj in priznanj za med" },
  { big: "6", label: "vrst medu, kozarci 250, 450 in 900 g" },
  { big: "1998", label: "čebelarim od takrat, pomagajo domači" },
  { big: "4,9", label: "ocena na Googlu, 20 mnenj", href: site.googleProfile },
];

export function Hero() {
  const s = (i: number) => ({ "--i": i }) as React.CSSProperties;
  return (
    <section className="on-dark relative overflow-hidden bg-smola">
      <div className="wrap grid gap-8 pt-[calc(var(--header-h)+2.25rem)] pb-10 lg:grid-cols-[1.02fr_1fr] lg:items-center lg:gap-14 lg:pt-[calc(var(--header-h)+4.5rem)] lg:pb-14">
        <div>
          <p className="eyebrow rise" style={s(0)}>
            {site.name} · Apače pri Kidričevem
          </p>
          <h1 className="display mt-4 text-[clamp(3rem,12.5vw,6.25rem)] whitespace-nowrap">
            <span className="rise block" style={s(1)}>
              Domač med
            </span>
            <span className="rise block" style={s(2)}>
              <em>iz Haloz.</em>
            </span>
          </h1>
          <p className="lead rise mt-6 max-w-[32ch]" style={s(3)}>
            Šest vrst medu iz naših čebelnjakov. Točim in polnim ga sam.
          </p>
          <div className="rise mt-8 flex flex-col gap-3 whitespace-nowrap sm:flex-row sm:flex-wrap sm:items-center" style={s(4)}>
            <CallButton magnetic />
            <a href="#med" className="btn btn-ghost">
              Poglejte med <Arrow />
            </a>
          </div>
          <p className="rise mt-5 text-[1.0625rem]" style={s(5)}>
            Ste čebelar?{" "}
            <Link href="/matice/" className="link font-bold text-akacija">
              Matice čebel
            </Link>
          </p>
        </div>

        <div className="relative order-first lg:order-none" data-hero-choice="1">
          {heroPhotos.map((p, i) => (
            <div key={p.slug} data-hero={i + 1}>
              <Photo
                slug={p.slug}
                alt={p.alt}
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 92vw"
                priority={i === 0}
                position={p.position}
                className={`${i === 0 ? "unveil" : ""} aspect-[3/2] w-full rounded-[1.75rem]`}
              />
            </div>
          ))}
          <HeroPhotoSwitch count={heroPhotos.length} labels={heroPhotos.map((p) => p.label)} />
          {/* The one mention of the title in the hero: a quiet seal inside the photo, not a banner. */}
          <p className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-smola/80 py-1.5 pr-3.5 pl-1.5 text-[0.8125rem] leading-none font-semibold text-vosek backdrop-blur-sm md:bottom-4 md:left-4">
            <span aria-hidden="true" className="hex grid h-6 w-[1.35rem] place-items-center bg-akacija text-[0.6rem] text-smola">
              ★
            </span>
            Državni prvak 2019 <span className="opacity-70">· cvetlični med</span>
          </p>
        </div>
      </div>

      <div className="wrap pb-10 lg:pb-12">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6 lg:grid-cols-4" aria-label="Na kratko">
          {trust.map((t) => (
            <li key={t.big} className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:gap-3">
              <span className="num text-[clamp(1.9rem,6vw,2.4rem)] leading-none text-akacija">{t.big}</span>
              <span className="max-w-[20ch] text-[0.95rem] leading-snug">
                {t.href ? (
                  <a href={t.href} target="_blank" rel="noopener noreferrer" className="link">
                    {t.label}
                  </a>
                ) : (
                  t.label
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
