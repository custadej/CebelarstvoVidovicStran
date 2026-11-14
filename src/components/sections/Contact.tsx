import { ContactForm } from "@/components/ContactForm";
import { PhoneIcon, SectionHead } from "@/components/ui";
import { formEnabled, site } from "@/lib/site";

export function Contact({ as = "h2", n = "08" }: { as?: "h1" | "h2"; n?: string }) {
  return (
    <section id="kontakt" className={`section on-dark bg-hoja ${as === "h1" ? "!pt-40" : ""}`}>
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHead
              n={as === "h1" ? undefined : n}
              as={as}
              eyebrow="Kontakt"
              title={
                <>
                  Najhitreje gre <em>po telefonu.</em>
                </>
              }
              lead="Za matice, med ali obisk pokličite Jožeta. Če se ne oglasi takoj, je verjetno pri čebelah."
            />
            <a href={site.phone.href} className="group mt-10 inline-flex items-center gap-4" data-reveal="">
              <span className="grid h-16 w-16 flex-none place-items-center rounded-full bg-med text-smola transition-transform duration-200 ease-[var(--ease-ui)] group-active:scale-95 md:h-20 md:w-20">
                <PhoneIcon size={30} />
              </span>
              <span className="num text-[clamp(2.6rem,11vw,5.5rem)] leading-none text-akacija">{site.phone.display}</span>
            </a>
            <dl className="mt-10 grid gap-6 sm:grid-cols-2" data-reveal="">
              <div className="border-t border-white/20 pt-4">
                <dt className="eyebrow">Naslov</dt>
                <dd className="mt-2 leading-relaxed">
                  {site.name}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                  <br />
                  <a href={site.maps} target="_blank" rel="noopener noreferrer" className="link font-semibold">
                    Odprite v Google Zemljevidih
                  </a>
                </dd>
              </div>
              <div className="border-t border-white/20 pt-4">
                <dt className="eyebrow">Obisk</dt>
                <dd className="mt-2 leading-relaxed">
                  Po dogovoru.
                  <br />
                  Pred prihodom pokličite.
                </dd>
                <dt className="eyebrow mt-5">E-pošta</dt>
                <dd className="mt-2">
                  <a href={`mailto:${site.email}`} className="link break-all">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div data-reveal="">
            {formEnabled ? (
              <ContactForm phoneHref={site.phone.href} phoneDisplay={site.phone.display} />
            ) : (
              <div className="rounded-3xl bg-vosek p-7 text-smola md:p-9">
                <p className="h-card">Raje pišete?</p>
                <p className="mt-3">Pošljite e-pošto z imenom, telefonsko številko in kratkim opisom, kaj potrebujete. Jože vas pokliče nazaj.</p>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent("Povpraševanje s spletne strani")}`}
                  className="btn btn-smola mt-6 w-full"
                >
                  Pišite na e-pošto
                </a>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-3 w-full">
                  Sporočilo na Facebooku
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
