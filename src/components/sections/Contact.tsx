import { ContactForm } from "@/components/ContactForm";
import { PhoneIcon, SectionHead } from "@/components/ui";
import { formEnabled, site } from "@/lib/site";

const info = [
  {
    label: "Naslov",
    lines: [site.name, site.address.street, `${site.address.postalCode} ${site.address.city}`],
    link: { href: site.maps, text: "Odprite v Google Zemljevidih", external: true },
  },
  { label: "Obisk", lines: ["Po dogovoru.", "Pred prihodom pokličite."] },
  { label: "Dostava", lines: ["Med: po dogovoru na območju Ptuja in Maribora.", "Matice: po pošti po vsej Sloveniji."] },
  { label: "E-pošta", lines: [], link: { href: `mailto:${site.email}`, text: site.email, external: false } },
];

// Two rows, one grid. Row 1: message + phone on the left, card on the right, stretched to the same height.
// Row 2: four info columns on a shared rule, spanning the same left and right edges as row 1.
export function Contact({ as = "h2", n = "05" }: { as?: "h1" | "h2"; n?: string }) {
  return (
    <section id="kontakt" className={`section on-dark bg-hoja ${as === "h1" ? "!pt-40" : ""}`}>
      <div className="wrap">
        <div data-contact-top="" className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <div className="flex flex-col justify-between gap-10">
            <SectionHead
              n={as === "h1" || !n ? undefined : n}
              as={as}
              size="section"
              eyebrow="Kontakt"
              title={
                <>
                  Najhitreje gre <em>po telefonu.</em>
                </>
              }
              lead="Za med, matice ali obisk pokličite Jožeta. Če se ne oglasi takoj, je verjetno pri čebelah."
            />
            <a href={site.phone.href} className="group inline-flex items-center gap-4" data-reveal="">
              <span className="grid h-16 w-16 flex-none place-items-center rounded-full bg-med text-smola transition-transform duration-200 ease-[var(--ease-ui)] group-active:scale-95 md:h-[4.5rem] md:w-[4.5rem]">
                <PhoneIcon size={28} />
              </span>
              <span className="num text-[clamp(2.5rem,10.5vw,4.75rem)] leading-none text-akacija">{site.phone.display}</span>
            </a>
          </div>

          <div data-reveal="" className="flex">
            {formEnabled ? (
              <div className="w-full">
                <ContactForm phoneHref={site.phone.href} phoneDisplay={site.phone.display} />
              </div>
            ) : (
              <div className="flex w-full flex-col justify-center rounded-3xl bg-vosek p-7 text-smola md:p-10">
                <p className="h-card">Raje pišete?</p>
                <p className="mt-3 max-w-[40ch]">Pošljite e-pošto z imenom, telefonsko številko in kratkim opisom, kaj potrebujete. Jože vas pokliče nazaj.</p>
                <a href={`mailto:${site.email}?subject=${encodeURIComponent("Povpraševanje s spletne strani")}`} className="btn btn-smola mt-6 w-full">
                  Pišite na e-pošto
                </a>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-3 w-full">
                  Sporočilo na Facebooku
                </a>
              </div>
            )}
          </div>
        </div>

        <dl data-contact-info="" className="mt-12 grid gap-x-10 gap-y-8 border-t border-white/20 pt-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4" data-reveal="">
          {info.map((col) => (
            <div key={col.label}>
              <dt className="eyebrow flex h-6 items-center">{col.label}</dt>
              <dd className="mt-3 leading-[1.6]">
                {col.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                {col.link ? (
                  <a
                    href={col.link.href}
                    className="link inline-block font-semibold break-all"
                    {...(col.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {col.link.text}
                  </a>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
