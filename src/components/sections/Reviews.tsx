import { reviews } from "@/data/content";
import { site } from "@/lib/site";

export function Reviews() {
  return (
    <section className="section !pb-0" aria-labelledby="pohvale">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">Pohvale</p>
            <h2 id="pohvale" className="display h-section mt-4" data-split="">
              Kaj pravijo <em>kupci.</em>
            </h2>
            <p className="mt-6 flex items-end gap-4" data-reveal="">
              <span className="num text-[4.5rem] leading-[0.85] text-kostanj">4,9</span>
              <span className="pb-1 leading-snug">
                od 5 na Googlu
                <br />
                <a href={site.googleProfile} target="_blank" rel="noopener noreferrer" className="link font-semibold">
                  20 mnenj
                </a>
              </span>
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {reviews.map((r) => (
              <li key={r.text} className="rounded-3xl bg-papir p-6 md:p-7" data-reveal="">
                <blockquote className="h-card !text-[1.35rem]">„{r.text}“</blockquote>
                <p className="muted mt-4 text-[0.95rem]">
                  {r.author} · {r.source}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
