// All site copy and structured facts.
// No health claims (EU 1924/2006): taste, colour, origin, season, storage and kitchen use only.

export type ImageSlug = keyof typeof import("./images.json");

export type Medal = "zlato" | "srebro" | "bron" | "naziv";

export type Honey = {
  slug: string;
  name: string;
  short: string;
  color: string;
  tone: "light" | "dark";
  jar: ImageSlug;
  photo: ImageSlug;
  photoAlt: string;
  tag: string;
  card: string;
  intro: string;
  facts: { label: string; value: string }[];
  body: string[];
  kitchen: string;
  seoTitle: string;
  seoDescription: string;
};

export const honeys: Honey[] = [
  {
    slug: "cvetlicni",
    name: "Cvetlični med",
    short: "Cvetlični",
    color: "#d9a02e",
    tone: "light",
    jar: "kozarec-cvetlicni",
    photo: "cebela-travnik",
    photoAlt: "Čebeli na travniški cvetlici v Halozah",
    tag: "Državni prvak 2019",
    card: "Blag in prijetno sladek. S cvetočih haloških travnikov in sadovnjakov.",
    intro:
      "Naš najbolj nagrajeni med. Čebele ga naberejo na cvetočih travnikih in v sadovnjakih v Halozah, ki cvetijo skozi vse poletje.",
    facts: [
      { label: "Barva", value: "rumeno rjava, odvisna od cvetja" },
      { label: "Okus", value: "blag, prijetno sladek" },
      { label: "Kristalizacija", value: "običajno hitra" },
      { label: "Paša", value: "travniki in sadovnjaki v Halozah" },
    ],
    body: [
      "Barva cvetličnega medu je vsako leto malo drugačna, ker je odvisna od cvetlic, na katerih so čebele nabirale medičino.",
      "Običajno kristalizira hitro. Kristalizacija je lahko popolna ali delna, z velikimi kristali. To je naraven pojav in na kakovost ne vpliva.",
    ],
    kitchen: "Na kruhu, v pecivu, v solatnih prelivih in napitkih.",
    seoTitle: "Cvetlični med iz Haloz, državni prvak 2019",
    seoDescription:
      "Cvetlični med Čebelarstva Vidovič s haloških travnikov: državni prvak 2019 in večkratna zlata medalja na sejmu AGRA. Kozarci 250 g, 450 g in 900 g. Pokličite 041 579 827.",
  },
  {
    slug: "akacijev",
    name: "Akacijev med",
    short: "Akacijev",
    color: "#ecd27a",
    tone: "light",
    jar: "kozarec-akacijev",
    photo: "medovi-pet-svetloba",
    photoAlt: "Kozarci medu Čebelarstva Vidovič v protisvetlobi, akacijev je najsvetlejši",
    tag: "Zlata medalja AGRA 2022",
    card: "Svetel, mil in dolgo tekoč. Paša doma in v Prekmurju.",
    intro:
      "Tekoč, skoraj brezbarven ali nežno rumen med milega okusa in brez izrazitega vonja. Dolgo ostane tekoč.",
    facts: [
      { label: "Barva", value: "skoraj brezbarvna do nežno rumena" },
      { label: "Okus", value: "mil, brez izrazitega vonja" },
      { label: "Kristalizacija", value: "počasna, dolgo ostane tekoč" },
      { label: "Paša", value: "doma in v Prekmurju" },
    ],
    body: [
      "Akacija ali robinija je medovito drevo toplejšega podnebja. Prvi cvetovi se lahko odprejo že prve dni maja, cvetenje pa se lahko zavleče v junij.",
      "Paša na akaciji je zelo odvisna od vremena. V dobrih razmerah je lahko zelo bogata. S čebelami jo izkoriščam doma in v Prekmurju.",
    ],
    kitchen: "Kot namaz na kruh in za sladkanje čaja, kave ter sadnih tort.",
    seoTitle: "Akacijev med, svetel in dolgo tekoč",
    seoDescription:
      "Akacijev med Čebelarstva Vidovič: svetel, mil in dolgo tekoč, s paše doma in v Prekmurju. Zlata medalja AGRA 2022. Pokličite 041 579 827.",
  },
  {
    slug: "lipov",
    name: "Lipov med",
    short: "Lipov",
    color: "#cf8a26",
    tone: "light",
    jar: "kozarec-lipov",
    photo: "cebela-lipa",
    photoAlt: "Čebela na lipovem cvetu",
    tag: "Dobrote slovenskih kmetij 2025",
    card: "Osvežilnega okusa in izrazitega vonja po lipovem cvetju.",
    intro: "Med osvežilnega okusa in močnega vonja, ki ga čebele naberejo, ko cveti lipa.",
    facts: [
      { label: "Okus", value: "osvežilen" },
      { label: "Vonj", value: "izrazit, po lipovem cvetju" },
      { label: "Priznanje", value: "bronasto priznanje, Dobrote slovenskih kmetij 2025" },
    ],
    body: [
      "Lipov med je pri nas v ponudbi skozi vse leto, skupaj s cvetličnim, akacijevim, gozdnim in kostanjevim.",
    ],
    kitchen: "V čaju in na kruhu.",
    seoTitle: "Lipov med osvežilnega okusa",
    seoDescription:
      "Lipov med Čebelarstva Vidovič: osvežilnega okusa in izrazitega vonja. Kozarci 250 g, 450 g in 900 g. Pokličite 041 579 827.",
  },
  {
    slug: "kostanjev",
    name: "Kostanjev med",
    short: "Kostanjev",
    color: "#7c3413",
    tone: "dark",
    jar: "kozarec-kostanjev",
    photo: "haloze-jesen",
    photoAlt: "Haloški gozdovi v jesenskih barvah s čebelnjakom v dolini",
    tag: "Zlata medalja AGRA 2022",
    card: "Temen, z značilno grenčico. Iz haloških kostanjevih gozdov.",
    intro:
      "Med temnejše rjavordeče barve z vonjem, ki spominja na pelin, in bolj ali manj izrazito grenčico. Pridobivamo ga v Halozah.",
    facts: [
      { label: "Barva", value: "temno rjavordeča" },
      { label: "Okus", value: "bolj ali manj grenak" },
      { label: "Posebnost", value: "veliko cvetnega prahu" },
      { label: "Paša", value: "pravi kostanj v Halozah, junija" },
    ],
    body: [
      "Grenčina izvira iz zrnc cvetnega prahu, ki ga je v kostanjevem medu zelo veliko.",
      "Pravi kostanj je za čebele zelo pomembna medovita rastlina. Dolgi resasti cvetovi se odprejo junija, cvetenje traja do prvih dni julija. Kostanj je občutljiv: če ga nekajkrat opere dež, je donos precej slabši.",
    ],
    kitchen: "Pri peki peciva in potic.",
    seoTitle: "Kostanjev med iz Haloz",
    seoDescription:
      "Kostanjev med Čebelarstva Vidovič iz Haloz: temen, z značilno grenčico. Zlata medalja AGRA 2022. Kozarci 250 g, 450 g in 900 g. Pokličite 041 579 827.",
  },
  {
    slug: "gozdni",
    name: "Gozdni med",
    short: "Gozdni",
    color: "#4c2611",
    tone: "dark",
    jar: "kozarec-gozdni",
    photo: "haloze-megla",
    photoAlt: "Čebelnjak v jutranji megli med haloškimi griči",
    tag: "Zlata medalja AGRA 2025",
    card: "Temen in polnega okusa. Naravna mešanica z gozdnih paš.",
    intro:
      "Gozdni med ima različne odtenke rjave barve, ker je naravna mešanica medu, ki ga dajo naši gozdovi.",
    facts: [
      { label: "Barva", value: "različni odtenki rjave" },
      { label: "Okus", value: "poln" },
      { label: "Izvor", value: "medičina in mana z gozdnih dreves in podrasti" },
      { label: "Priznanje", value: "zlato na AGRI in Dobrotah slovenskih kmetij 2025" },
    ],
    body: [
      "Čebele na gozdni paši nabirajo medičino in mano na različnih drevesnih vrstah in rastlinah gozdne podrasti. Zato je med s te paše precej raznolik, odvisno od vrste, ki v njem prevladuje.",
    ],
    kitchen: "Za medenjake. Pri nas jih pečemo prav z gozdnim medom.",
    seoTitle: "Gozdni med, temen in polnega okusa",
    seoDescription:
      "Gozdni med Čebelarstva Vidovič: temen, polnega okusa, zlata medalja AGRA 2025 in zlato priznanje Dobrote slovenskih kmetij 2025. Pokličite 041 579 827.",
  },
  {
    slug: "hojev",
    name: "Hojev med",
    short: "Hojev",
    color: "#2f1c12",
    tone: "dark",
    jar: "kozarec-hojev",
    photo: "haloze-jutro",
    photoAlt: "Jutranja megla nad gozdnatimi griči",
    tag: "Kadar hoja zamedi",
    card: "Gost, temen in skoraj brez vonja. Ne kristalizira rad.",
    intro:
      "Hojev ali jelkin med je temnejše rjavozelene barve in precej gost. Skoraj brez vonja, a zelo prijetnega, izrazitega okusa.",
    facts: [
      { label: "Barva", value: "temno rjavozelena" },
      { label: "Okus", value: "izrazit, prijeten" },
      { label: "Kristalizacija", value: "ne kristalizira rad" },
      { label: "Na voljo", value: "ne vsako leto, pokličite" },
    ],
    body: [
      "Hoja ali jelka je za slovensko čebelarstvo zelo pomembna, a velja za eno bolj muhastih paš. Kadar zares zamedi, je bera lahko izdatnejša kot na katerikoli drugi rastlini.",
      "Zato hojevega medu ni vsako leto. Pokličite in povem, ali ga trenutno imam.",
    ],
    kitchen: "K črnemu kruhu, mlečnim napitkom in suhemu sadju.",
    seoTitle: "Hojev med, kadar hoja zamedi",
    seoDescription:
      "Hojev (jelkin) med Čebelarstva Vidovič: gost, temen, ne kristalizira rad. Na voljo, kadar hoja zamedi. Pokličite 041 579 827.",
  },
];

export type Product = { id: string; name: string; text: string; detail: string; image: ImageSlug; alt: string };

export const products: Product[] = [
  {
    id: "maticni-mlecek",
    name: "Matični mleček",
    text: "Svež, naravnost iz panja. Pridelujemo ga od prve sezone leta 2014.",
    detail: "Kozarček 30 g. Hranite ga v hladilniku pri 0 do 4 °C.",
    image: "maticni-mlecek-kozarcki",
    alt: "Kozarčki svežega matičnega mlečka Čebelarstva Vidovič",
  },
  {
    id: "cvetni-prah",
    name: "Cvetni prah",
    text: "Kepice cvetnega prahu, ki ga čebele prinašajo s paše. Barva je odvisna od rastlin, s katerih izvira.",
    detail: "Pakiranja 120 g, 200 g in 450 g ali po dogovoru.",
    image: "cvetni-prah",
    alt: "Cvetni prah, stresen iz steklenega kozarca",
  },
  {
    id: "propolis",
    name: "Propolis",
    text: "Nudimo ga v obliki granulata.",
    detail: "Za količine in razpoložljivost pokličite.",
    image: "propolis",
    alt: "Propolis v obliki granulata",
  },
  {
    id: "vosek",
    name: "Čebelji vosek",
    text: "Vosek čebele izdelajo same, iz njega gradijo satje. Mi iz njega vlivamo voščene izdelke.",
    detail: "Voščene figure in okraski.",
    image: "vosek",
    alt: "Šesterokoten voščen izdelek s čebelo",
  },
  {
    id: "darila",
    name: "Darilni paketi",
    text: "Med je lahko lepo darilo. Kozarce zložimo v darilne škatle s satastim vzorcem.",
    detail: "Škatle za en, dva ali tri kozarce.",
    image: "darilo-dva",
    alt: "Darilna škatla z dvema kozarcema medu Čebelarstva Vidovič",
  },
];

export const queenFacts = [
  {
    title: "Oplojene in označene",
    text: "Vsaka matica je oplojena in označena. Vzrejam kranjsko čebelo, v registriranem vzrejališču in pod strokovnim nadzorom Kmetijskega inštituta Slovenije.",
  },
  {
    title: "Naslednji dan pri vas",
    text: "Matice pošiljam po pošti po vsej Sloveniji, dostava je naslednji dan. Lahko jih prevzamete tudi osebno pri nas doma v Apačah.",
  },
  {
    title: "Od maja do konca avgusta",
    text: "Prve oplojene matice so običajno na voljo takoj po 1. maju, zadnje konec avgusta. Za razpoložljivost in ceno pokličite.",
  },
];

export const kisResults = [
  {
    year: "2025",
    items: ["2. mesto po povprečnem donosu medu", "2. mesto med najmanj rojivimi"],
  },
  {
    year: "2023",
    items: ["2. mesto po povprečnem donosu medu", "3. mesto med najmanj rojivimi"],
  },
];

export const queenSteps: { n: string; title: string; text: string; image: ImageSlug; alt: string }[] = [
  {
    n: "1",
    title: "Vzreja",
    text: "Matičnike vzredim iz izbranih matičarjev. Priprave na vzrejo se začnejo zgodaj spomladi.",
    image: "maticniki",
    alt: "Letvica z matičniki v roki, v ozadju plemenilčki pod drevesi",
  },
  {
    n: "2",
    title: "Oploditev",
    text: "Plemenilčke z mladimi maticami odpeljem na plemenilno postajo. Potem počakamo, da troti opravijo svoje poslanstvo.",
    image: "plemenilcki",
    alt: "Pisani plemenilčki med drevesi na plemenilni postaji",
  },
  {
    n: "3",
    title: "Označevanje",
    text: "Ko matica zalega, jo poberem in označim. Tako jo boste v panju vedno hitro našli.",
    image: "matica-oznacevanje",
    alt: "Matica med prsti pri označevanju",
  },
  {
    n: "4",
    title: "Na pot",
    text: "V matičnici s spremljevalkami jo prevzamete doma ali jo pošljem po pošti. Naslednji dan je pri vas.",
    image: "matice-kletke",
    alt: "Matice s spremljevalkami v matičnicah, pripravljene za pošiljanje",
  },
];

export const story = {
  quote: "Čebelam se moram res zahvaliti za vse, kar imam.",
  paragraphs: [
    "S čebelami sem se prvič srečal od blizu takoj po končani osnovni šoli. Med počitnicami sem pomagal pri delu s čebelami pri našem največjem čebelarju Janku Pislaku. Prvo leto sem sodeloval pri proizvodnji matičnega mlečka, naslednjih nekaj sezon sem iz panjev pobiral letvice z mlečkom.",
    "Ker sem radovedne narave, sem hotel o čebelah vedeti več. Znanje so z mano nesebično delili g. Pislak in vsi njegovi delavci, za kar sem jim še danes hvaležen.",
    "Po srednji šoli sem bil tri leta učitelj vožnje v avtošoli. Leta 1998 sem prejel klic g. Pislaka in se pri njem redno zaposlil. Pomagal sem praktično pri vsem: pri oskrbi družin, točenju medu, proizvodnji matičnega mlečka in matic, pri prevozih čebel na pašo.",
    "Leta 2014 sem se odločil, da začnem čebelariti samostojno. Nabavil sem prvih 60 panjev in čebeljih družin, doma smo izdelali prvi prevozni čebelnjak. Leto pozneje smo izdelali drugega in registrirali vzrejo matic, leta 2016 pa še stacionarni čebelnjak.",
  ],
  timeline: [
    { year: "1998", text: "Redna zaposlitev v čebelarstvu Pislak." },
    { year: "2014", text: "Samostojna pot: prvih 60 panjev in prvi prevozni čebelnjak." },
    { year: "2015", text: "Drugi prevozni čebelnjak in registrirana vzreja matic." },
    { year: "2016", text: "Stacionarni čebelnjak." },
    { year: "2019", text: "Cvetlični med postane državni prvak." },
  ],
};

export type AwardEvent = "agra" | "dsk" | "czs" | "dsk-znak";
export type Award = { event: AwardEvent; honey: string; medal: Medal };
export const awardYears: { year: string; awards: Award[]; image?: ImageSlug; imageAlt?: string }[] = [
  {
    year: "2026",
    image: "priznanje-agra-2026-zlata",
    imageAlt: "Zlata medalja AGRA 2026 za cvetlični med Čebelarstva Vidovič",
    awards: [
      { event: "agra", honey: "cvetlicni", medal: "zlato" },
      { event: "agra", honey: "akacijev", medal: "srebro" },
    ],
  },
  {
    year: "2025",
    image: "priznanja-2025",
    imageAlt: "Priznanja AGRA 2025 in Dobrote slovenskih kmetij 2025",
    awards: [
      { event: "agra", honey: "gozdni", medal: "zlato" },
      { event: "agra", honey: "cvetlicni", medal: "srebro" },
      { event: "agra", honey: "akacijev", medal: "srebro" },
      { event: "dsk", honey: "gozdni", medal: "zlato" },
      { event: "dsk", honey: "cvetlicni", medal: "srebro" },
      { event: "dsk", honey: "lipov", medal: "bron" },
    ],
  },
  {
    year: "2024",
    image: "priznanja-agra-2024",
    imageAlt: "Tri priznanja AGRA 2024",
    awards: [
      { event: "agra", honey: "cvetlicni", medal: "zlato" },
      { event: "agra", honey: "kostanjev", medal: "bron" },
      { event: "agra", honey: "akacijev", medal: "bron" },
    ],
  },
  {
    year: "2022",
    image: "priznanja-agra-2022",
    imageAlt: "Tri zlate medalje AGRA 2022",
    awards: [
      { event: "agra", honey: "cvetlicni", medal: "zlato" },
      { event: "agra", honey: "kostanjev", medal: "zlato" },
      { event: "agra", honey: "akacijev", medal: "zlato" },
    ],
  },
  {
    year: "2020",
    image: "priznanje-agra-2020",
    imageAlt: "Zlata medalja AGRA 2020 za cvetlični med",
    awards: [
      { event: "agra", honey: "cvetlicni", medal: "zlato" },
      { event: "agra", honey: "kostanjev", medal: "bron" },
      { event: "dsk", honey: "cvetlicni", medal: "zlato" },
    ],
  },
  {
    year: "2019",
    image: "priznanje-drzavni-prvak",
    imageAlt: "Listina Čebelarske zveze Slovenije: državni prvak za cvetlični med 2019",
    awards: [
      { event: "czs", honey: "cvetlicni", medal: "naziv" },
      { event: "dsk-znak", honey: "cvetlicni", medal: "naziv" },
      { event: "dsk", honey: "cvetlicni", medal: "zlato" },
      { event: "dsk", honey: "gozdni", medal: "zlato" },
    ],
  },
  {
    year: "2018",
    image: "priznanje-agra-2018",
    imageAlt: "Zlata medalja AGRA 2018 za cvetlični med",
    awards: [
      { event: "agra", honey: "cvetlicni", medal: "zlato" },
      { event: "dsk", honey: "cvetlicni", medal: "zlato" },
      { event: "dsk", honey: "gozdni", medal: "srebro" },
    ],
  },
  {
    year: "2017",
    image: "priznanje-dsk-2017",
    imageAlt: "Zlato priznanje Dobrote slovenskih kmetij 2017 za gozdni med",
    awards: [
      { event: "agra", honey: "cvetlicni", medal: "zlato" },
      { event: "dsk", honey: "cvetlicni", medal: "zlato" },
      { event: "dsk", honey: "gozdni", medal: "zlato" },
    ],
  },
];

export const awardLeads: { title: string; year: string; text: string; image: ImageSlug; alt: string }[] = [
  {
    title: "Državni prvak za cvetlični med",
    year: "2019",
    text: "Naziv je podelila Čebelarska zveza Slovenije na državnem senzoričnem ocenjevanju medu. Nanj se uvrstijo le medovi, ki so na ocenjevanjih postali prvaki svoje vrste.",
    image: "priznanje-drzavni-prvak",
    alt: "Listina državni prvak za cvetlični med 2019, Čebelarska zveza Slovenije",
  },
  {
    title: "Znak kakovosti",
    year: "2019",
    text: "Dobrote slovenskih kmetij ga podelijo izdelku, ki je tri leta zapored ocenjen z zlatim priznanjem. Prejel ga je naš cvetlični med iz Haloz.",
    image: "znak-kakovosti-2019",
    alt: "Plaketa znak kakovosti 2019, Dobrote slovenskih kmetij, za cvetlični med",
  },
  {
    title: "Odlikovanje Antona Janše II. stopnje",
    year: "2018",
    text: "Za posebne zasluge za dvig slovenskega čebelarstva.",
    image: "odlikovanje-jansa",
    alt: "Listina odlikovanje Antona Janše II. stopnje za Jožeta Vidoviča",
  },
];

export const reviews = [
  { text: "Odlični čebelji pridelki! Strokovno svetovanje! Priporočam vsem od blizu in daleč!", author: "Miran P.", source: "Google" },
  { text: "Domači in kvalitetni proizvodi.", author: "Leon K.", source: "Google" },
  { text: "Strokovni in ugodni.", author: "Tomi R.", source: "Google" },
  { text: "Lepa pohvala vam gre, vzrejate odlične čebelje matice!", author: "Kupec matic", source: "SMS sporočilo" },
];

export const faq: { q: string; a: string; queens?: boolean }[] = [
  {
    q: "Kdaj so matice na voljo?",
    a: "Prve oplojene matice so običajno na voljo takoj po 1. maju, vzreja pa traja do konca avgusta. Točen datum je odvisen od vremena, zato pokličite na 041 579 827.",
    queens: true,
  },
  {
    q: "Kako naročim matice?",
    a: "Po telefonu na 041 579 827. Povejte, koliko matic potrebujete in kdaj, pa se dogovorimo za prevzem ali pošiljanje.",
    queens: true,
  },
  {
    q: "Ali matice pošiljate po pošti?",
    a: "Da. Matice pošiljam po vsej Sloveniji, dostava je naslednji dan. Lahko jih prevzamete tudi osebno pri nas doma v Apačah.",
    queens: true,
  },
  {
    q: "Kakšne matice vzrejate?",
    a: "Oplojene in označene matice kranjske čebele. Vzrejališče je registrirano, vzreja poteka pod strokovnim nadzorom Kmetijskega inštituta Slovenije.",
    queens: true,
  },
  {
    q: "Kje lahko kupim med?",
    a: "Pri nas doma, Apače 300, Lovrenc na Dravskem polju. Obiski so po dogovoru, zato prej pokličite. Po dogovoru med tudi dostavimo na območju Ptuja in Maribora.",
  },
  {
    q: "V kakšnih pakiranjih je med?",
    a: "V steklenih kozarcih po 250 g, 450 g in 900 g. Večje količine po dogovoru. Na voljo so tudi darilne škatle za en, dva ali tri kozarce.",
  },
  {
    q: "Moj med je kristaliziral. Je z njim kaj narobe?",
    a: "Ne. Kristalizacija je naraven pojav in ne povzroča nobenih sprememb medu. Kozarec postavite v toplo vodo in kristali se bodo utekočinili. Medu ne segrevajte nad 40 °C.",
  },
  {
    q: "Koliko stane med ali matica?",
    a: "Cen na spletni strani ne objavljamo, ker se z leti spreminjajo. Pokličite na 041 579 827 in povem trenutno ceno in kaj je na zalogi.",
  },
];

export const eventLabel: Record<AwardEvent, string> = {
  agra: "AGRA",
  dsk: "Dobrote slovenskih kmetij",
  czs: "Državno senzorično ocenjevanje medu, ČZS",
  "dsk-znak": "Dobrote slovenskih kmetij, znak kakovosti",
};

export const medalLabel: Record<Medal, string> = {
  zlato: "Zlato",
  srebro: "Srebro",
  bron: "Bron",
  naziv: "Naziv",
};

// Text-only translation of everything above. Lists keep the Slovenian order and length; images, colours and
// slugs come from the Slovenian base (merged in src/data/index.ts).
export type HoneyText = Pick<Honey, "name" | "short" | "photoAlt" | "tag" | "card" | "intro" | "facts" | "body" | "kitchen" | "seoTitle" | "seoDescription">;
export type Translation = {
  honeys: Record<string, HoneyText>;
  products: Record<string, Pick<Product, "name" | "text" | "detail" | "alt">>;
  queenFacts: typeof queenFacts;
  kisResults: typeof kisResults;
  queenSteps: { title: string; text: string; alt: string }[];
  story: typeof story;
  awardImageAlts: Record<string, string>;
  awardLeads: { title: string; text: string; alt: string }[];
  reviews: typeof reviews;
  faq: typeof faq;
  medalLabel: Record<Medal, string>;
  eventLabel: Record<AwardEvent, string>;
};
