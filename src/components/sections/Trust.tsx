import { Strip } from "@/components/ui";
import { site } from "@/lib/site";

const items = [
  { count: 1998, from: 1970, label: "Čebelarim od leta 1998, samostojno od 2014." },
  { count: 2019, from: 1998, label: "Državni prvak za cvetlični med." },
  { count: 15, from: 0, suffix: "+", label: "Več kot 15 zlatih medalj in priznanj za med." },
  { count: 4.9, from: 0, decimals: 1, label: "Ocena na Googlu, 20 mnenj.", href: site.googleProfile },
];

export function Trust() {
  return (
    <section className="on-dark bg-smola" aria-label="Na kratko">
      <div className="wrap pb-16 lg:pb-24">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/15 pt-10 lg:grid-cols-4 lg:gap-x-10">
          {items.map((it) => (
            <li key={it.label} data-reveal="">
              <p className="num text-[clamp(2.6rem,9vw,4.25rem)] leading-none text-akacija">
                <span data-count={it.count} data-from={it.from} data-decimals={it.decimals ?? 0}>
                  {String(it.count).replace(".", ",")}
                </span>
                {it.suffix ?? ""}
              </p>
              <p className="mt-3 max-w-[22ch] text-[1.0625rem] leading-snug">
                {it.href ? (
                  <a href={it.href} target="_blank" rel="noopener noreferrer" className="link">
                    {it.label}
                  </a>
                ) : (
                  it.label
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <Strip />
    </section>
  );
}
