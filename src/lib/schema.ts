import { awardYears, faq, honeys, medalLabel } from "@/data/content";
import { site } from "@/lib/site";

const id = `${site.url}/#cebelarstvo`;

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store"],
  "@id": id,
  name: site.name,
  description:
    "Čebelarstvo v Apačah pri Kidričevem: med iz Haloz, vzreja in prodaja oplojenih, označenih matic kranjske čebele, matični mleček in drugi čebelji pridelki.",
  url: `${site.url}/`,
  telephone: site.phone.e164,
  email: site.email,
  image: `${site.url}/img/haloze-cebelnjak-1440.webp`,
  logo: `${site.url}/img/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
  founder: { "@type": "Person", name: site.owner },
  areaServed: { "@type": "Country", name: "Slovenija" },
  sameAs: [site.facebook],
  award: awardYears.flatMap((y) =>
    y.awards.map((a) => (a.medal === "naziv" ? `${a.event} ${y.year}: ${a.honey}` : `${medalLabel[a.medal]}, ${a.event} ${y.year}: ${a.honey}`)),
  ),
};

export const faqSchema = (queensOnly = false) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq
    .filter((f) => !queensOnly || f.queens)
    .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Domov", path: "/" }, ...items].map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${site.url}${it.path}`,
  })),
});

export const honeySchema = (slug: string) => {
  const h = honeys.find((x) => x.slug === slug);
  if (!h) return null;
  const awards = awardYears.flatMap((y) =>
    y.awards.filter((a) => a.honey === h.name).map((a) => (a.medal === "naziv" ? `${a.event} ${y.year}` : `${medalLabel[a.medal]}, ${a.event} ${y.year}`)),
  );
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: h.name,
    description: h.intro,
    category: "Med",
    image: `${site.url}/img/${h.photo}-800.webp`,
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": id },
    countryOfOrigin: "SI",
    ...(awards.length ? { award: awards } : {}),
  };
};

export const queenSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Oplojena in označena matica kranjske čebele",
  description:
    "Oplojene in označene matice kranjske čebele iz registriranega vzrejališča, vzrejene pod strokovnim nadzorom Kmetijskega inštituta Slovenije. Osebni prevzem ali pošiljanje po pošti po vsej Sloveniji.",
  category: "Čebelje matice",
  image: `${site.url}/img/matica-makro-1200.webp`,
  brand: { "@type": "Brand", name: site.name },
  manufacturer: { "@id": id },
  countryOfOrigin: "SI",
};
