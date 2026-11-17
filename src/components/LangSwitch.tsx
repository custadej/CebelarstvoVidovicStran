"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { basePathOf, langName, langs, langShort, localePath, type Lang } from "@/i18n";

// Quiet language links in the footer: the same page in the other language. Each language has its own root layout,
// so switching is a full page load, which also sets <html lang>.
// `path` fixes the target (the 404 page links to each home page instead of its own URL).
export function LangSwitch({ lang, label, path: fixed }: { lang: Lang; label: string; path?: string }) {
  const current = basePathOf(usePathname());
  const path = fixed ?? current;
  return (
    <nav aria-label={label} className="flex items-center gap-1">
      {langs.map((l) => (
        <Link
          key={l}
          href={localePath(l, path)}
          hrefLang={l}
          lang={l}
          title={langName[l]}
          aria-current={l === lang ? "true" : undefined}
          className="grid h-10 min-w-10 place-items-center rounded-full px-2 text-[0.875rem] font-semibold tracking-[0.08em] text-vosek/60 transition-colors duration-200 ease-[var(--ease-ui)] hover:text-akacija aria-[current=true]:text-akacija aria-[current=true]:shadow-[inset_0_0_0_1.5px_rgb(241_203_107/0.55)]"
        >
          <span aria-hidden="true">{langShort[l]}</span>
          <span className="sr-only">{langName[l]}</span>
        </Link>
      ))}
    </nav>
  );
}
