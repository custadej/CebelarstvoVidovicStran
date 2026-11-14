import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Arrow, SectionHead } from "@/components/ui";
import { products } from "@/data/content";

export function ProductList({ detailed = false }: { detailed?: boolean }) {
  if (detailed) {
    return (
      <ul className="grid gap-6">
        {products.map((p) => (
          <li key={p.id} id={p.id} className="grid scroll-mt-28 gap-6 rounded-3xl bg-papir p-5 md:grid-cols-[minmax(0,320px)_1fr] md:items-center md:gap-10 md:p-8" data-reveal="">
            <Photo slug={p.image} alt={p.alt} sizes="(min-width: 768px) 320px, 88vw" className="frame aspect-[4/3]" />
            <div>
              <h3 className="h-card">{p.name}</h3>
              <p className="mt-2 text-[1.0625rem] leading-snug">{p.text}</p>
              <p className="mt-3 font-semibold">{p.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="rail -mx-7 gap-4 px-7 md:mx-0 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-0">
      {products.map((p) => (
        <li key={p.id} className="w-[44vw] max-w-[220px] md:w-auto md:max-w-none" data-reveal="">
          <Link href={`/cebelji-pridelki/#${p.id}`} className="group block">
            <Photo
              slug={p.image}
              alt={p.alt}
              sizes="(min-width: 768px) 200px, 44vw"
              className="frame aspect-square"
              imgClassName="transition-transform duration-500 ease-[var(--ease-story)] group-hover:scale-105"
            />
            <h3 className="mt-3 text-[1.125rem] leading-tight font-bold">{p.name}</h3>
            <p className="mt-1 text-[0.95rem] leading-snug opacity-80">{p.detail}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Products() {
  return (
    <section id="pridelki" className="section bg-papir">
      <div className="wrap">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHead
            n="02"
            eyebrow="Ostali čebelji pridelki"
            title={
              <>
                Panj da več <em>kot med.</em>
              </>
            }
          />
          <Link href="/cebelji-pridelki/" className="arrow-link">
            Vsi pridelki <Arrow />
          </Link>
        </div>
        <div className="mt-8">
          <ProductList />
        </div>
      </div>
    </section>
  );
}
