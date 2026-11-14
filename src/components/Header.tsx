import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { PhoneIcon } from "@/components/ui";
import { nav, site } from "@/lib/site";

export function Header() {
  return (
    <header className="fixed inset-x-3 top-3 z-50 md:inset-x-5 md:top-4">
      <div className="mx-auto flex h-[var(--header-h)] max-w-[1280px] items-center justify-between gap-3 rounded-full bg-papir/95 pr-2 pl-4 shadow-[0_10px_40px_-18px_rgb(31_23_17/0.6)] backdrop-blur md:pl-6">
        <Link href="/" aria-label={`${site.name}, na začetno stran`} className="flex h-full items-center">
          <picture>
            <source srcSet="/img/logo-250.webp 250w, /img/logo.webp 497w" sizes="110px" type="image/webp" />
            <img src="/img/logo.png" alt={site.name} width={497} height={223} className="h-10 w-auto md:h-12" />
          </picture>
        </Link>
        <nav aria-label="Glavni meni" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center rounded-full px-4 text-[1.0625rem] font-semibold transition-colors duration-200 ease-[var(--ease-ui)] hover:bg-vosek"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={site.phone.href} className="btn btn-med !min-h-12 !px-4 md:!px-5" aria-label={`Pokličite ${site.phone.display}`}>
            <PhoneIcon size={18} />
            <span className="tel !text-[1.05rem]">{site.phone.display}</span>
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
