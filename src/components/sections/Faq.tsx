import { SectionHead } from "@/components/ui";
import { faq } from "@/data/content";

export function FaqList({ queensOnly = false }: { queensOnly?: boolean }) {
  const items = queensOnly ? faq.filter((f) => f.queens) : faq;
  return (
    <div className="border-t border-crta">
      {items.map((f) => (
        <details key={f.q} className="faq">
          <summary>
            {f.q}
            <span className="plus" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="answer">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Faq() {
  return (
    <section id="vprasanja" className="section bg-papir">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHead
          n="07"
          eyebrow="Pogosta vprašanja"
          title={
            <>
              Kar nas <em>najpogosteje vprašate.</em>
            </>
          }
        />
        <FaqList />
      </div>
    </section>
  );
}
