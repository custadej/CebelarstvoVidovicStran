import Link from "next/link";
import { Honeycomb } from "@/components/Honeycomb";
import { HoneyPicker } from "@/components/HoneyPicker";
import { Photo } from "@/components/Photo";
import { Arrow, CallButton, SectionHead } from "@/components/ui";
import { honeys, type Honey } from "@/data/content";

// Light to dark, the way the jars look on the shelf.
const order = ["akacijev", "cvetlicni", "lipov", "kostanjev", "gozdni", "hojev"];
const scale = order.map((slug) => honeys.find((h) => h.slug === slug)).filter((h): h is Honey => h !== undefined);

function JarVisual({ h, className = "" }: { h: Honey; className?: string }) {
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <div
        aria-hidden="true"
        className="hex absolute inset-x-[8%] inset-y-[4%]"
        style={{ background: `radial-gradient(circle at 35% 25%, color-mix(in srgb, ${h.color} 70%, #fff), ${h.color} 55%, color-mix(in srgb, ${h.color} 72%, #000))` }}
      />
      <Photo slug={h.jar} alt={`Kozarec: ${h.name.toLowerCase()} Čebelarstva Vidovič`} sizes="220px" className="hex-tall relative h-[86%] w-[58%]" position="50% 40%" />
    </div>
  );
}

function HoneyPanel({ h }: { h: Honey }) {
  return (
    <div className="grid gap-6 p-5 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-center sm:gap-8 md:p-8">
      <JarVisual h={h} className="mx-auto aspect-[4/5] w-[52%] max-w-[220px] sm:w-full" />
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-papir px-3 py-1 text-[0.8125rem] font-semibold tracking-wide">
          <span aria-hidden="true" className="hex h-3 w-3" style={{ background: h.color }} />
          {h.tag}
        </p>
        <h3 className="display mt-3 text-[clamp(1.9rem,6vw,2.75rem)]">{h.name}</h3>
        <p className="mt-3 max-w-[48ch]">{h.intro}</p>
        <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-3">
          {h.facts.slice(0, 3).map((f) => (
            <div key={f.label} className="border-t border-crta pt-2">
              <dt className="eyebrow !text-[0.75rem]">{f.label}</dt>
              <dd className="mt-1 text-[1.0625rem] leading-snug font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
        <Link href={`/med/${h.slug}/`} className="arrow-link mt-4 text-kostanj">
          Več o tem medu <Arrow />
        </Link>
      </div>
    </div>
  );
}

// Used on /med and the honey subpages.
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
            <Photo slug={h.jar} alt={`Kozarec: ${h.name.toLowerCase()} Čebelarstva Vidovič`} sizes="140px" className="hex-tall absolute right-4 bottom-4 h-[78%] w-[33%]" position="50% 40%" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Packaging() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-3xl bg-med p-6 text-smola md:p-8" data-reveal="">
        <p className="eyebrow !text-smola">Pakiranja</p>
        <p className="num mt-3 text-[clamp(1.5rem,6.4vw,2.6rem)] leading-none whitespace-nowrap">
          250 g <span className="opacity-50">·</span> 450 g <span className="opacity-50">·</span> 900 g
        </p>
        <p className="mt-3 max-w-[38ch]">Stekleni kozarci, večje količine po dogovoru. Na voljo so tudi darilne škatle.</p>
      </div>
      <div className="rounded-3xl bg-papir p-6 md:p-8" data-reveal="">
        <p className="eyebrow">Kje ga dobite</p>
        <p className="h-card mt-3">Doma v Apačah ali z dostavo.</p>
        <p className="mt-3 max-w-[40ch]">Po dogovoru med dostavimo na območju Ptuja in Maribora. Pokličite in povejte, katerega želite.</p>
      </div>
    </div>
  );
}

export function Honeys() {
  return (
    <section id="med" className="section">
      <div className="wrap">
        <SectionHead
          n="01"
          eyebrow="Med"
          title={
            <>
              Šest medov, <em>vsak s svoje paše.</em>
            </>
          }
        />
        <div className="mt-8 rounded-[2rem] bg-smola p-5 text-vosek md:p-8" data-reveal="">
          <Honeycomb colors={scale.map((h) => h.color)} className="aspect-[5/2] md:aspect-[4/1]" />
          <p className="mt-4 mb-4 text-[1.0625rem]">Barva pove, s katere paše je med. Izberite vrsto:</p>
          <HoneyPicker
            tabs={scale.map((h) => ({ slug: h.slug, label: h.short, color: h.color }))}
            panels={scale.map((h) => (
              <HoneyPanel key={h.slug} h={h} />
            ))}
            initial={1}
          />
        </div>
        <div className="mt-4">
          <Packaging />
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <CallButton label="Pokličite za med" variant="smola" />
          <Link href="/med/" className="arrow-link">
            Vse o našem medu <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
