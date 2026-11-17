// Prefix for files in public/ when the site is served from a sub-path (GitHub Pages preview).
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const site = {
  name: "Čebelarstvo Vidovič",
  owner: "Jože Vidovič",
  url: "https://www.cebelarstvo-vidovic.si",
  locale: "sl-SI",
  address: {
    street: "Apače 300",
    postalCode: "2324",
    city: "Lovrenc na Dravskem polju",
    municipality: "Kidričevo",
    country: "SI",
  },
  phone: { display: "041 579 827", href: "tel:+38641579827", e164: "+38641579827" },
  email: "joza.vidovic@gmail.com",
  facebook: "https://www.facebook.com/cebelarstvo.vidovic",
  googleProfile: "https://share.google/w1YRdMSk2vJwd88fL",
  maps: "https://www.google.com/maps/search/?api=1&query=%C4%8Cebelarstvo+Vidovi%C4%8D%2C+Apa%C4%8De+300%2C+2324+Lovrenc+na+Dravskem+polju",
  tagline: "Kar delaš, delaj z ljubeznijo.",
} as const;

export const nav = [
  { href: "/med/", label: "Med" },
  { href: "/cebelji-pridelki/", label: "Pridelki" },
  { href: "/o-nas/", label: "O nas" },
  { href: "/priznanja/", label: "Priznanja" },
  { href: "/kontakt/", label: "Kontakt" },
  { href: "/matice/", label: "Matice čebel" },
] as const;

export const credit = { name: "Tadej Čuš", href: "https://cus.si" } as const;

// Header hides while scrolling down and returns on scroll up. Being tried out (2026-11-17); false = always visible.
export const headerAutoHide = true;

export const formEnabled = process.env.NEXT_PUBLIC_FORM_ENABLED === "1";
