import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 3.5h2.7l1.4 4.2-2 1.5a12.5 12.5 0 0 0 6.1 6.1l1.5-2 4.2 1.4v2.7a2.1 2.1 0 0 1-2.3 2.1C10.6 18.9 5.1 13.4 4.5 5.8a2.1 2.1 0 0 1 2.1-2.3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Arrow() {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
      <path d="M1 7h19m0 0-5.5-5.5M20 7l-5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CallButton({
  label = "Pokličite Jožeta",
  variant = "med",
  magnetic = false,
  className = "",
}: {
  label?: string;
  variant?: "med" | "smola" | "ghost";
  magnetic?: boolean;
  className?: string;
}) {
  return (
    <a href={site.phone.href} className={`btn btn-${variant} ${className}`} data-magnetic={magnetic ? "" : undefined}>
      <PhoneIcon />
      <span>
        {label} <span className="tel">· {site.phone.display}</span>
      </span>
    </a>
  );
}

export function Strip({ className = "" }: { className?: string }) {
  const blocks = ["rumena", "modra", "zelena", "rdeca", "oranzna", "modra", "rumena", "zelena", "oranzna", "rdeca"] as const;
  const widths = [14, 8, 11, 6, 13, 9, 12, 7, 10, 10];
  return (
    <div className={`strip ${className}`} aria-hidden="true">
      {blocks.map((c, i) => (
        <i key={i} style={{ width: `${widths[i]}%`, background: `var(--color-panj-${c})` }} />
      ))}
    </div>
  );
}

export function SectionHead({
  n,
  eyebrow,
  title,
  lead,
  as = "h2",
  className = "",
}: {
  n?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  const H = as;
  return (
    <div className={className}>
      {n ? (
        <span className="node" aria-hidden="true">
          {n}
        </span>
      ) : null}
      <p className="eyebrow">{eyebrow}</p>
      <H className={`display ${as === "h1" ? "h-page" : "h-section"} mt-4`} data-split="">
        {title}
      </H>
      {lead ? (
        <p className="lead mt-6 max-w-[38ch]" data-reveal="">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function MedalDot({ medal }: { medal: "zlato" | "srebro" | "bron" | "naziv" }) {
  const bg = { zlato: "#e0a72f", srebro: "#b9bcc0", bron: "#b0703a", naziv: "#f1cb6b" }[medal];
  return <span aria-hidden="true" className="inline-block h-3 w-3 flex-none rounded-full" style={{ background: bg, boxShadow: "inset 0 1px 0 rgb(255 255 255 / .6)" }} />;
}
