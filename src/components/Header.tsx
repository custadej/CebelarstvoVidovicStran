import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { PhoneIcon } from "@/components/ui";
import { localePath, type Lang } from "@/i18n";
import { ui } from "@/i18n/ui";
import { headerAutoHide, site } from "@/lib/site";

// One bar, one centre line: the logo box, the links and the call button are all 48 px tall and centred in the bar.
// Left and right inner padding are equal; the links are centred in the bar itself (grid 1fr / auto / 1fr).
export function Header({ lang }: { lang: Lang }) {
  const t = ui[lang];
  return (
    <header className="fixed inset-x-3 top-3 z-50 md:inset-x-5 md:top-4" data-autohide={headerAutoHide ? "" : undefined}>
      <div
        data-bar=""
        className="mx-auto flex h-[var(--header-h)] max-w-[1280px] items-center justify-between gap-2 rounded-full bg-papir px-2 shadow-[0_10px_40px_-18px_rgb(31_23_17/0.6)] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-2.5"
      >
        <Link
          href={localePath(lang, "/")}
          data-logo=""
          aria-label={t.homeAria}
          className="flex h-12 items-center justify-self-start rounded-full px-3 transition-colors duration-200 ease-[var(--ease-ui)] hover:bg-vosek md:px-4"
        >
          <span className="md:hidden">
            <Logo height={38} optical />
          </span>
          <span className="hidden md:block">
            <Logo height={44} optical />
          </span>
        </Link>
        <nav aria-label={t.mainMenu} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {t.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={localePath(lang, item.href)}
                  className={`flex h-12 items-center gap-2 rounded-full px-4 text-[1.0625rem] leading-none font-semibold whitespace-nowrap transition-colors duration-200 ease-[var(--ease-ui)] hover:bg-vosek ${
                    item.href === "/matice/" ? "bg-hoja text-vosek hover:!bg-hoja-2" : ""
                  }`}
                >
                  {item.href === "/matice/" ? <span aria-hidden="true" className="hex h-2.5 w-2.5 bg-akacija" /> : null}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2 justify-self-end">
          <a href={site.phone.href} data-call="" className="btn btn-med !h-12 !min-h-0 !px-4 md:!px-5" aria-label={t.callAria(t.phone)}>
            <PhoneIcon size={18} />
            <span className="tel !text-[1.05rem] leading-none">{t.phone}</span>
          </a>
          <MobileMenu lang={lang} />
        </div>
      </div>
    </header>
  );
}
