"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="grid h-12 w-12 place-items-center rounded-full bg-smola text-papir transition-transform duration-150 ease-[var(--ease-ui)] active:scale-95"
        aria-expanded={open}
        aria-controls="mobilni-meni"
        aria-label={open ? "Zapri meni" : "Odpri meni"}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <path
            d={open ? "M5 5l12 12M17 5 5 17" : "M3 7h16M3 15h16"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>
      <div
        id="mobilni-meni"
        hidden={!open}
        className="fixed inset-x-3 top-[calc(var(--header-h)+1.25rem)] z-50 origin-top-right rounded-3xl bg-papir p-6 shadow-[0_30px_80px_-20px_rgb(31_23_17/0.55)]"
      >
        <nav aria-label="Glavni meni">
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`display flex min-h-14 items-center justify-between border-b border-crta text-[1.9rem] aria-[current=page]:text-kostanj ${item.href === "/matice/" ? "mt-3 rounded-2xl border-b-0 bg-hoja px-4 !text-vosek" : ""}`}
                >
                  {item.label}
                  {item.href === "/matice/" ? <span className="font-sans text-[0.8125rem] font-semibold tracking-[0.14em] text-akacija uppercase">za čebelarje</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a href={site.phone.href} className="btn btn-med mt-6 w-full">
          Pokličite <span className="tel">· {site.phone.display}</span>
        </a>
      </div>
    </div>
  );
}
