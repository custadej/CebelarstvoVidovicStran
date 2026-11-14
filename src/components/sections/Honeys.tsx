import Link from "next/link";
import { Honeycomb } from "@/components/Honeycomb";
import { Photo } from "@/components/Photo";
import { Arrow, CallButton, SectionHead } from "@/components/ui";
import { honeys } from "@/data/content";

export function HoneyGrid({ exclude }: { exclude?: string }) {
  const list = honeys.filter((h) => h.slug !== exclude);
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((h) => (
        <li key={h.slug} data-reveal="">
          <Link
            href={`/med/${h.slug}/`}
            className="group relative flex h-full min-h-[15rem] overflow-hidden rounded-3xl bg-papir p-6 shadow-[0_1px_0_#fff_inset,0_20px_40px_-30px_rgb(31_23_17/0.5)] transition-transform duration-200 ease-[var(--ease-ui)] active:scale-[0.985] md:p-7"
          >
            <div className="relative z-10 flex max-w-[58%] flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-vosek px-3 py-1 text-[0.8125rem] font-semibold tracking-wide">
                <span aria-hidden="true" className="hex h-3 w-3" style={{ background: h.color }} />
                {h.tag}
              </span>
              <h3 className="h-card mt-4">{h.name}</h3>
              <p className="mt-2 text-[1.0625rem] leading-snug">{h.card}</p>
              <span className="arrow-link mt-auto pt-4 text-kostanj">
                Več <Arrow />
              </span>
            </div>
            <div
              aria-hidden="true"
              className="hex absolute -right-9 -bottom-10 h-48 w-44 transition-transform duration-500 ease-[var(--ease-story)] group-hover:scale-110 group-hover:-rotate-6"
              style={{ background: `radial-gradient(circle at 35% 25%, color-mix(in srgb, ${h.color} 70%, #fff), ${h.color} 55%, color-mix(in srgb, ${h.color} 70%, #000))` }}
            />
            <Photo
              slug={h.jar}
              alt={`Kozarec: ${h.name.toLowerCase()} Čebelarstva Vidovič`}
              sizes="140px"
              className="hex-tall absolute right-4 bottom-4 h-[78%] w-[33%]"
              position="50% 40%"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Packaging() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl bg-med p-7 text-smola md:p-9" data-reveal="">
        <p className="eyebrow !text-smola">Pakiranja</p>
        <p className="num mt-4 text-[clamp(1.5rem,6.4vw,3.2rem)] leading-none whitespace-nowrap">
          250 g <span className="opacity-50">·</span> 450 g <span className="opacity-50">·</span> 900 g
        </p>
        <p className="mt-4 max-w-[36ch]">Stekleni kozarci. Večje količine po dogovoru, na voljo so tudi darilne škatle za en, dva ali tri kozarce.</p>
      </div>
      <div className="rounded-3xl bg-papir p-7 md:p-9" data-reveal="">
        <p className="eyebrow">Kje ga dobite</p>
        <p className="h-card mt-4">Doma v Apačah ali z dostavo.</p>
        <p className="mt-3 max-w-[38ch]">
          Med kupite pri nas doma, po dogovoru ga tudi dostavimo na območju Ptuja in Maribora. Pokličite in povejte, kateri med želite.
        </p>
      </div>
    </div>
  );
}

export function Honeys() {
  return (
    <section id="med" className="section">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-16">
          <SectionHead
            n="02"
            eyebrow="Med"
            title={
              <>
                Šest medov, <em>vsak s svoje paše.</em>
              </>
            }
            lead="Čebelnjaki stojijo v Halozah, na akacijevo pašo jih peljem tudi v Prekmurje. Med točim in polnim sam."
          />
          <Photo
            slug="medovi-pet"
            alt="Pet kozarcev medu Čebelarstva Vidovič v vrsti: kostanjev, gozdni, lipov, cvetlični in akacijev"
            sizes="(min-width: 1024px) 560px, 92vw"
            className="frame aspect-[3/2]"
            parallax
          />
        </div>
        <div className="mt-12 lg:mt-16">
          <HoneyGrid />
        </div>
        <div className="mt-6">
          <Honeycomb />
        </div>
        <div className="mt-6">
          <Packaging />
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <CallButton label="Pokličite za med" variant="smola" />
          <Link href="/med/" className="arrow-link">
            Vse o našem medu <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
