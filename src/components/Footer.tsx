import Link from "next/link";
import { HoneyDrip } from "@/components/HoneyDrip";
import { LangSwitch } from "@/components/LangSwitch";
import { Logo } from "@/components/Logo";
import { PhoneIcon, Strip } from "@/components/ui";
import { localePath, type Lang } from "@/i18n";
import { ui } from "@/i18n/ui";
import { credit, site } from "@/lib/site";

const label = "eyebrow flex h-6 items-center";
const row = "flex min-h-10 items-center";

// One container for everything: the column grid, the rule and the bottom bar share the same left and right edges.
export function Footer({ lang, langPath }: { lang: Lang; langPath?: string }) {
  const t = ui[lang];
  const links = [
    { href: site.facebook, label: "Facebook" },
    { href: site.googleProfile, label: t.footer.google },
    { href: "https://www.czs.si/", label: t.footer.czs },
    { href: "https://kranjska-cebela.si/", label: t.footer.kranjska },
  ];
  return (
    <footer className="on-dark bg-smola">
      <Strip />
      <HoneyDrip id="foot" />
      <div className="wrap">
        <div data-foot-grid="" className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 lg:grid-cols-4 lg:gap-x-10 lg:py-16">
          <div data-foot-col="" className="col-span-2 sm:col-span-1">
            <div data-foot-first="" className="inline-flex rounded-2xl bg-papir px-4 py-3">
              <Logo height={56} />
            </div>
            <p className="display mt-5 text-[1.5rem] leading-tight">
              <em>{t.quote(t.tagline)}</em>
            </p>
            <a href={site.phone.href} className="btn btn-med mt-6 !min-h-12 !px-5">
              <PhoneIcon size={18} />
              <span className="tel !text-[1.05rem]">{t.phone}</span>
            </a>
          </div>

          <div data-foot-col="" className="col-span-2 sm:col-span-1">
            <p data-foot-first="" className={label}>
              {t.footer.contact}
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
              {t.footer.pages}
            </p>
            <ul className="mt-3">
              {t.nav.map((item) => (
                <li key={item.href}>
                  <Link href={localePath(lang, item.href)} className={`${row} hover:text-akacija`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-foot-col="">
            <p data-foot-first="" className={label}>
              {t.footer.links}
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

        <div data-foot-bottom="" className="grid gap-3 py-6 text-[0.95rem] lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="muted">
              © {new Date().getFullYear()} {site.name}
            </p>
            <LangSwitch lang={lang} label={t.footer.language} path={langPath} />
          </div>
          <p className="flex gap-6 lg:justify-self-center">
            <Link href={localePath(lang, "/zasebnost/")} className="muted transition-colors duration-200 ease-[var(--ease-ui)] hover:text-akacija">
              {t.footer.privacy}
            </Link>
            <Link href={localePath(lang, "/pravno-obvestilo/")} className="muted transition-colors duration-200 ease-[var(--ease-ui)] hover:text-akacija">
              {t.footer.legal}
            </Link>
          </p>
          <p className="muted whitespace-nowrap lg:justify-self-end">
            {t.footer.madeBy}{" "}
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
