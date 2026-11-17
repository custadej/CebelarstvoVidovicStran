import { ContactForm } from "@/components/ContactForm";
import { PhoneIcon, SectionHead } from "@/components/ui";
import type { Lang } from "@/i18n";
import { ui } from "@/i18n/ui";
import { formEnabled, site } from "@/lib/site";

const T = {
  sl: {
    address: "Naslov",
    maps: "Odprite v Google Zemljevidih",
    visit: "Obisk",
    visitLines: ["Po dogovoru.", "Pred prihodom pokličite."],
    delivery: "Dostava",
    deliveryLines: ["Med: po dogovoru na območju Ptuja in Maribora.", "Matice: po pošti po vsej Sloveniji."],
    email: "E-pošta",
    eyebrow: "Kontakt",
    title: (
      <>
        Najhitreje gre <em>po telefonu.</em>
      </>
    ),
    lead: "Za med, matice ali obisk pokličite Jožeta. Če se ne oglasi takoj, je verjetno pri čebelah.",
    write: "Raje pišete?",
    writeText: "Pošljite e-pošto z imenom, telefonsko številko in kratkim opisom, kaj potrebujete. Jože vas pokliče nazaj.",
    subject: "Povpraševanje s spletne strani",
    mail: "Pišite na e-pošto",
    facebook: "Sporočilo na Facebooku",
  },
  en: {
    address: "Address",
    maps: "Open in Google Maps",
    visit: "Visits",
    visitLines: ["By arrangement.", "Please call before you come."],
    delivery: "Delivery",
    deliveryLines: ["Honey: by arrangement around Ptuj and Maribor.", "Queens: by post anywhere in Slovenia."],
    email: "E-mail",
    eyebrow: "Contact",
    title: (
      <>
        The quickest way <em>is by phone.</em>
      </>
    ),
    lead: "For honey, queens or a visit, call Jože. If he does not answer straight away, he is probably with the bees.",
    write: "Prefer to write?",
    writeText: "Send an e-mail with your name, phone number and a short note on what you need. Jože will call you back.",
    subject: "Enquiry from the website",
    mail: "Send an e-mail",
    facebook: "Message on Facebook",
  },
  de: {
    address: "Adresse",
    maps: "In Google Maps öffnen",
    visit: "Besuch",
    visitLines: ["Nach Vereinbarung.", "Bitte rufen Sie vorher an."],
    delivery: "Lieferung",
    deliveryLines: ["Honig: nach Absprache in der Gegend von Ptuj und Maribor.", "Königinnen: per Post in ganz Slowenien."],
    email: "E-Mail",
    eyebrow: "Kontakt",
    title: (
      <>
        Am schnellsten <em>geht es telefonisch.</em>
      </>
    ),
    lead: "Für Honig, Königinnen oder einen Besuch rufen Sie Jože an. Wenn er nicht gleich abhebt, ist er wahrscheinlich bei den Bienen.",
    write: "Lieber schreiben?",
    writeText: "Schicken Sie eine E-Mail mit Ihrem Namen, Ihrer Telefonnummer und einer kurzen Beschreibung, was Sie brauchen. Jože ruft Sie zurück.",
    subject: "Anfrage über die Website",
    mail: "E-Mail schreiben",
    facebook: "Nachricht auf Facebook",
  },
};

// Two rows, one grid. Row 1: message + phone on the left, card on the right, stretched to the same height.
// Row 2: four info columns on a shared rule, spanning the same left and right edges as row 1.
export function Contact({ lang, as = "h2", n = "05" }: { lang: Lang; as?: "h1" | "h2"; n?: string }) {
  const t = T[lang];
  const info = [
    {
      label: t.address,
      lines: [site.name, site.address.street, `${site.address.postalCode} ${site.address.city}`],
      link: { href: site.maps, text: t.maps, external: true },
    },
    { label: t.visit, lines: t.visitLines },
    { label: t.delivery, lines: t.deliveryLines },
    { label: t.email, lines: [], link: { href: `mailto:${site.email}`, text: site.email, external: false } },
  ];
  return (
    <section id="kontakt" className={`section on-dark bg-hoja ${as === "h1" ? "!pt-40" : ""}`}>
      <div className="wrap">
        <div data-contact-top="" className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <div className="flex flex-col justify-between gap-10">
            <SectionHead n={as === "h1" || !n ? undefined : n} as={as} size="section" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
            <a href={site.phone.href} className="group inline-flex items-center gap-4" data-reveal="">
              <span className="grid h-16 w-16 flex-none place-items-center rounded-full bg-med text-smola transition-transform duration-200 ease-[var(--ease-ui)] group-active:scale-95 md:h-[4.5rem] md:w-[4.5rem]">
                <PhoneIcon size={28} />
              </span>
              <span className={`num leading-none text-akacija ${lang === "sl" ? "text-[clamp(2.5rem,10.5vw,4.75rem)]" : "text-[clamp(2rem,8.4vw,3.9rem)]"}`}>{ui[lang].phone}</span>
            </a>
          </div>

          <div data-reveal="" className="flex">
            {formEnabled ? (
              <div className="w-full">
                <ContactForm lang={lang} phoneHref={site.phone.href} phoneDisplay={ui[lang].phone} />
              </div>
            ) : (
              <div className="flex w-full flex-col justify-center rounded-3xl bg-vosek p-7 text-smola md:p-10">
                <p className="h-card">{t.write}</p>
                <p className="mt-3 max-w-[40ch]">{t.writeText}</p>
                <a href={`mailto:${site.email}?subject=${encodeURIComponent(t.subject)}`} className="btn btn-smola mt-6 w-full">
                  {t.mail}
                </a>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-3 w-full">
                  {t.facebook}
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
