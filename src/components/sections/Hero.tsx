import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Arrow, CallButton } from "@/components/ui";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-smola">
      <div className="relative h-[58svh] min-h-[400px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[60%]">
        <Photo
          slug="haloze-cebelnjak"
          alt="Pisan prevozni čebelnjak Čebelarstva Vidovič na travniku med haloškimi griči"
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority
          className="unveil h-full w-full"
          position="46% 82%"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-smola via-transparent to-smola/40 lg:bg-gradient-to-r lg:from-smola lg:via-smola/35 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-smola to-transparent lg:block" />
      </div>

      <div className="wrap relative -mt-16 pb-14 lg:mt-0 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-end lg:pt-44 lg:pb-24">
        <p className="eyebrow rise" style={{ "--i": 0 } as React.CSSProperties}>
          {site.name} · Apače pri Kidričevem
        </p>
        <h1 className="display h-hero mt-5 max-w-[9ch]">
          <span className="rise block" style={{ "--i": 1 } as React.CSSProperties}>
            Med in
          </span>
          <span className="rise block" style={{ "--i": 2 } as React.CSSProperties}>
            matice
          </span>
          <span className="rise block" style={{ "--i": 3 } as React.CSSProperties}>
            <em>iz Haloz.</em>
          </span>
        </h1>
        <p className="lead rise mt-7 max-w-[34ch]" style={{ "--i": 4 } as React.CSSProperties}>
          Čebelarim od leta 1998. Med točim iz čebelnjakov v Halozah, matice vzrejam pod nadzorom Kmetijskega inštituta Slovenije.
        </p>
        <div className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ "--i": 5 } as React.CSSProperties}>
          <CallButton magnetic />
          <Link href="/matice/" className="btn btn-ghost">
            Matice čebel <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
