import type { ReactNode } from "react";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Strip } from "@/components/ui";
import type { ImageSlug } from "@/data/content";

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  position,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  image: ImageSlug;
  imageAlt: string;
  position?: string;
  crumbs: { href?: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-smola">
      <div className="relative h-[44svh] min-h-[300px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[52%]">
        <Photo slug={image} alt={imageAlt} sizes="(min-width: 1024px) 52vw, 100vw" priority className="unveil h-full w-full" position={position} />
        <div className="absolute inset-0 bg-gradient-to-t from-smola via-smola/20 to-smola/30 lg:bg-gradient-to-r lg:from-smola lg:via-smola/30 lg:to-transparent" />
      </div>
      <div className="wrap relative -mt-24 pb-14 lg:mt-0 lg:flex lg:min-h-[78svh] lg:flex-col lg:justify-end lg:pt-44 lg:pb-20">
        <nav aria-label="Drobtinice" className="rise text-[0.95rem]" style={{ "--i": 0 } as React.CSSProperties}>
          <ol className="flex flex-wrap gap-2">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {c.href ? (
                  <Link href={c.href} className="link">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="muted">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow rise mt-6" style={{ "--i": 1 } as React.CSSProperties}>
          {eyebrow}
        </p>
        <h1 className="display h-page rise mt-4 max-w-[12ch]" style={{ "--i": 2 } as React.CSSProperties}>
          {title}
        </h1>
        <p className="lead rise mt-6 max-w-[36ch]" style={{ "--i": 3 } as React.CSSProperties}>
          {lead}
        </p>
        {children ? (
          <div className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ "--i": 4 } as React.CSSProperties}>
            {children}
          </div>
        ) : null}
      </div>
      <Strip />
    </section>
  );
}

export function CallBand({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <section className="on-dark bg-hoja">
      <div className="wrap flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <h2 className="display h-section max-w-[14ch]" data-split="">
          {title}
        </h2>
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </section>
  );
}
