import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Arrow } from "@/components/ui";
import { site } from "@/lib/site";

// The one entry point to queens in the home page flow. Fir green is the queen colour across the site (nav pill, /matice).
export function QueenBanner() {
  return (
    <section aria-labelledby="matice-vstop" className="pb-[clamp(3.5rem,7vw,5.75rem)]">
      <div className="wrap">
        <div className="on-dark relative grid overflow-hidden rounded-[2rem] bg-hoja md:grid-cols-[1fr_minmax(0,300px)] md:items-stretch" data-reveal="">
          <div className="p-6 md:p-10">
            <p className="eyebrow">Za čebelarje</p>
            <h2 id="matice-vstop" className="display mt-3 text-[clamp(2rem,6vw,3.25rem)]">
              Ste čebelar? <em>Matice čebel.</em>
            </h2>
            <p className="mt-4 max-w-[46ch]">
              Oplojene in označene matice kranjske čebele, vzrejene pod nadzorom Kmetijskega inštituta Slovenije. Osebni prevzem ali po pošti, naslednji dan pri vas.
            </p>
            <div className="mt-6 flex flex-col gap-3 whitespace-nowrap sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="/matice/" className="btn btn-med">
                Vse o maticah <Arrow />
              </Link>
              <a href={site.phone.href} className="btn btn-ghost">
                Naročila: <span className="tel">{site.phone.display}</span>
              </a>
            </div>
          </div>
          <Photo
            slug="matica-makro"
            alt="Označena matica kranjske čebele na robu satja med delavkami"
            sizes="(min-width: 768px) 300px, 92vw"
            className="h-48 w-full md:h-full"
            position="58% 55%"
          />
        </div>
      </div>
    </section>
  );
}
