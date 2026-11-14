import Link from "next/link";
import { Strip } from "@/components/ui";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="on-dark bg-smola">
      <Strip />
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:py-20">
        <div>
          <div className="inline-block rounded-2xl bg-papir px-4 py-3">
            <img src="/img/logo.png" alt={site.name} width={497} height={223} loading="lazy" className="h-14 w-auto" />
          </div>
          <p className="display mt-6 text-[1.75rem] leading-tight">
            <em>„{site.tagline}“</em>
          </p>
        </div>
        <div>
          <p className="eyebrow">Kontakt</p>
          <address className="mt-4 not-italic leading-relaxed">
            {site.name}
            <br />
            {site.owner}
            <br />
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <p className="mt-4">
            <a href={site.phone.href} className="num text-[1.6rem] text-akacija">
              {site.phone.display}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="link break-all">
              {site.email}
            </a>
          </p>
        </div>
        <div>
          <p className="eyebrow">Strani</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex min-h-11 items-center hover:text-akacija">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-8">Povezave</p>
          <ul className="mt-4">
            {[
              { href: site.facebook, label: "Facebook" },
              { href: "https://www.czs.si/", label: "Čebelarska zveza Slovenije" },
              { href: "https://kranjska-cebela.si/", label: "Kranjska čebela" },
            ].map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center hover:text-akacija">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-white/10 py-6 text-[0.95rem] md:flex-row md:items-center md:justify-between">
        <p className="muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="flex gap-6">
          <Link href="/zasebnost/" className="link">
            Zasebnost
          </Link>
          <Link href="/pravno-obvestilo/" className="link">
            Pravno obvestilo
          </Link>
        </p>
      </div>
    </footer>
  );
}
