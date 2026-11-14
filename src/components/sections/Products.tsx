import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Arrow, SectionHead } from "@/components/ui";
import { products } from "@/data/content";

export function ProductList({ detailed = false }: { detailed?: boolean }) {
  return (
    <ul className={detailed ? "grid gap-6" : "scroller -mr-5 pr-5 md:mr-0 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:pr-0"}>
      {products.map((p) => (
        <li
          key={p.id}
          id={detailed ? p.id : undefined}
          className={
            detailed
              ? "grid scroll-mt-28 gap-6 rounded-3xl bg-papir p-5 md:grid-cols-[minmax(0,320px)_1fr] md:items-center md:gap-10 md:p-8"
              : "w-[72vw] max-w-[300px] md:w-auto md:max-w-none"
          }
          data-reveal=""
        >
          <Photo slug={p.image} alt={p.alt} sizes={detailed ? "(min-width: 768px) 320px, 88vw" : "(min-width: 768px) 220px, 72vw"} className={`frame ${detailed ? "aspect-[4/3]" : "aspect-[4/5]"}`} />
          <div className={detailed ? "" : "mt-4"}>
            <h3 className="h-card">{p.name}</h3>
            <p className="mt-2 text-[1.0625rem] leading-snug">{detailed ? p.text : p.detail}</p>
            {detailed ? <p className="mt-3 font-semibold">{p.detail}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Products() {
  return (
    <section id="pridelki" className="section bg-papir">
      <div className="wrap">
        <SectionHead
          n="03"
          eyebrow="Ostali čebelji pridelki"
          title={
            <>
              Panj da več <em>kot med.</em>
            </>
          }
          lead="Matični mleček pridelujemo od prve samostojne sezone. Poleg njega dobite pri nas cvetni prah, propolis, vosek in darilne pakete."
        />
        <div className="mt-12">
          <ProductList />
        </div>
        <Link href="/cebelji-pridelki/" className="arrow-link mt-8">
          Vsi pridelki in pakiranja <Arrow />
        </Link>
      </div>
    </section>
  );
}
