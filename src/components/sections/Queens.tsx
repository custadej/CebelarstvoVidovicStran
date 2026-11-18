import { Photo } from "@/components/Photo";
import { getContent } from "@/data";
import type { Lang } from "@/i18n";

const T = {
  sl: {
    kisEyebrow: "Test matic pri potomstvu · Kmetijski inštitut Slovenije",
    kisTitle: "Naš matičar je bil dvakrat med najboljšimi v državi.",
    kisNote: "Uvrstitev matičarja po povprečnem donosu medu in med najmanj rojivimi, objavljene preglednice testa za leti 2023 in 2025.",
  },
  en: {
    kisEyebrow: "Progeny test of queens · Agricultural Institute of Slovenia",
    kisTitle: "Our breeder queen was twice among the best in the country.",
    kisNote: "Ranking of the breeder queen for average honey yield and lowest swarming tendency, from the published test tables for 2023 and 2025.",
  },
  de: {
    kisEyebrow: "Nachkommenprüfung · Landwirtschaftsinstitut Sloweniens",
    kisTitle: "Unsere Zuchtmutter war zweimal unter den besten des Landes.",
    kisNote: "Platzierung der Zuchtmutter beim durchschnittlichen Honigertrag und bei der geringsten Schwarmneigung, laut den veröffentlichten Prüfungstabellen 2023 und 2025.",
  },
} satisfies Record<Lang, Record<string, string>>;

export function QueenFacts({ lang }: { lang: Lang }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-3xl bg-white/15 md:grid-cols-3">
      {getContent(lang).queenFacts.map((f) => (
        <li key={f.title} className="bg-hoja-2 p-7 md:p-8" data-reveal="">
          <h3 className="h-card text-akacija">{f.title}</h3>
          <p className="mt-3">{f.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function KisResults({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <div className="rounded-3xl bg-vosek p-7 text-smola md:p-10" data-reveal="">
      <p className="eyebrow">{t.kisEyebrow}</p>
      <h3 className="h-card mt-3 max-w-[22ch]">{t.kisTitle}</h3>
      <dl className="mt-7 grid gap-6 sm:grid-cols-2">
        {getContent(lang).kisResults.map((r) => (
          <div key={r.year} className="border-t-2 border-smola pt-4">
            <dt className="num text-[2.75rem] leading-none">{r.year}</dt>
            {r.items.map((i) => (
              <dd key={i} className="mt-2 flex gap-2 leading-snug">
                <span aria-hidden="true" className="hex mt-[0.35em] h-3 w-3 flex-none bg-med" />
                {i}
              </dd>
            ))}
          </div>
        ))}
      </dl>
      <p className="muted mt-6 text-[0.95rem]">{t.kisNote}</p>
    </div>
  );
}

export function QueenStory({ lang }: { lang: Lang }) {
  const { queenSteps } = getContent(lang);
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16" data-story="">
      <ol className="grid gap-12 lg:gap-0">
        {queenSteps.map((s) => (
          <li key={s.n} data-step="" className="lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center">
            <p className="num text-[4.5rem] leading-none text-akacija">{s.n}</p>
            <h3 className="display mt-2 text-[clamp(2rem,6vw,3rem)]">{s.title}</h3>
            <p className="mt-3 max-w-[36ch]">{s.text}</p>
            <div className="story-inline mt-6">
              <Photo slug={s.image} alt={s.alt} sizes="(min-width: 1024px) 45vw, 92vw" className="frame aspect-[4/3]" />
            </div>
          </li>
        ))}
      </ol>
      <div className="story-sticky">
        <div className="sticky top-[14vh] h-[72vh] overflow-hidden rounded-[2rem] bg-hoja-2">
          {queenSteps.map((s) => (
            <div key={s.n} data-step-img="" className="absolute inset-0">
              <Photo slug={s.image} alt="" sizes="45vw" className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
