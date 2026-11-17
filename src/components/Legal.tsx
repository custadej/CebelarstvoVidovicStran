import type { ReactNode } from "react";
import type { Lang } from "@/i18n";
import { ui } from "@/i18n/ui";

export function Legal({ lang, title, children }: { lang: Lang; title: string; children: ReactNode }) {
  return (
    <section className="section !pt-40">
      <div className="wrap max-w-[820px]">
        <h1 className="display h-section">{title}</h1>
        <p className="muted mt-4 text-[0.95rem]">
          {ui[lang].updated}: {ui[lang].updatedDate}
        </p>
        <div className="legal mt-10">{children}</div>
      </div>
    </section>
  );
}
