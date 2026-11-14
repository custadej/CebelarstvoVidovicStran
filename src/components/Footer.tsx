import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PhoneIcon, Strip } from "@/components/ui";
import { credit, nav, site } from "@/lib/site";

const links = [
  { href: site.facebook, label: "Facebook" },
  { href: site.googleProfile, label: "Mnenja na Googlu" },
  { href: "https://www.czs.si/", label: "Čebelarska zveza Slovenije" },
  { href: "https://kranjska-cebela.si/", label: "Kranjska čebela" },
];

const label = "eyebrow flex h-6 items-center";
const row = "flex min-h-10 items-center";

// One container for everything: the column grid, the rule and the bottom bar share the same left and right edges.
export function Footer() {
  return (
    <footer className="on-dark bg-smola">
      <Strip />
      <div className="wrap">
        <div data-foot-grid="" className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 lg:grid-cols-4 lg:gap-x-10 lg:py-16">
          <div data-foot-col="" className="col-span-2 sm:col-span-1">
            <div data-foot-first="" className="inline-flex rounded-2xl bg-papir px-4 py-3">
              <Logo height={56} />
            </div>
            <p className="display mt-5 text-[1.5rem] leading-tight">
              <em>„{site.tagline}“</em>
            </p>
            <a href={site.phone.href} className="btn btn-med mt-6 !min-h-12 !px-5">
              <PhoneIcon size={18} />
              <span className="tel !text-[1.05rem]">{site.phone.display}</span>
            </a>
          </div>

          <div data-foot-col="" className="col-span-2 sm:col-span-1">
            <p data-foot-first="" className={label}>
              Kontakt
            </p>
            <address className="mt-3 not-italic">
              <span className={row}>{site.name}</span>
              <span className={row}>{site.owner}</span>
              <span className={row}>{site.address.street}</span>
              <span className={row}>
                {site.address.postalCode} {site.address.city}
              </span>
              <a href={`mailto:${site.email}`} className={`${row} break-all hover:text-akacija`}>
                {site.email}
              </a>
            </address>
          </div>

          <div data-foot-col="">
            <p data-foot-first="" className={label}>
              Strani
            </p>
            <ul className="mt-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={`${row} hover:text-akacija`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-foot-col="">
            <p data-foot-first="" className={label}>
              Povezave
            </p>
            <ul className="mt-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={`${row} hover:text-akacija`}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-foot-rule="" className="h-px bg-white/12" />

        <div data-foot-bottom="" className="grid gap-3 py-6 text-[0.95rem] md:grid-cols-[1fr_auto_1fr] md:items-center">
          <p className="muted">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="flex gap-6 md:justify-self-center">
            <Link href="/zasebnost/" className="muted transition-colors duration-200 ease-[var(--ease-ui)] hover:text-akacija">
              Zasebnost
            </Link>
            <Link href="/pravno-obvestilo/" className="muted transition-colors duration-200 ease-[var(--ease-ui)] hover:text-akacija">
              Pravno obvestilo
            </Link>
          </p>
          <p className="muted md:justify-self-end">
            Spletno stran izdelal{" "}
            <a href={credit.href} target="_blank" rel="noopener" className="credit">
              <span aria-hidden="true" className="hex credit-mark" />
              {credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
