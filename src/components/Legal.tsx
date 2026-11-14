import type { ReactNode } from "react";

export function Legal({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="section !pt-40">
      <div className="wrap max-w-[820px]">
        <h1 className="display h-section">{title}</h1>
        <p className="muted mt-4 text-[0.95rem]">Zadnja sprememba: {updated}</p>
        <div className="legal mt-10">{children}</div>
      </div>
    </section>
  );
}
