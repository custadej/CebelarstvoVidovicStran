import type { Translation } from "./content";

// English. Same rules as the Slovenian: taste, colour, origin, season, storage and kitchen use only, no health claims.
export const en: Translation = {
  honeys: {
    cvetlicni: {
      name: "Wildflower honey",
      short: "Wildflower",
      photoAlt: "Two bees on a meadow flower in Haloze",
      tag: "National champion 2019",
      card: "Mild and pleasantly sweet. From the flowering meadows and orchards of Haloze.",
      intro: "Our most awarded honey. The bees gather it on the flowering meadows and in the orchards of Haloze, where something is in bloom all summer.",
      facts: [
        { label: "Colour", value: "yellowish brown, depending on the flowers" },
        { label: "Taste", value: "mild, pleasantly sweet" },
        { label: "Crystallisation", value: "usually quick" },
        { label: "Forage", value: "meadows and orchards in Haloze" },
      ],
      body: [
        "The colour of wildflower honey is a little different every year, because it depends on the flowers the bees gathered their nectar from.",
        "It usually crystallises quickly, fully or partly, with large crystals. This is a natural process and does not affect the quality.",
      ],
      kitchen: "On bread, in baking, in salad dressings and drinks.",
      seoTitle: "Wildflower honey from Haloze, national champion 2019",
      seoDescription:
        "Wildflower honey from Čebelarstvo Vidovič, from the meadows of Haloze: Slovenian national champion 2019 and several gold medals at the AGRA fair. Jars of 250 g, 450 g and 900 g. Call +386 41 579 827.",
    },
    akacijev: {
      name: "Acacia honey",
      short: "Acacia",
      photoAlt: "Jars of Čebelarstvo Vidovič honey against the light; the acacia is the lightest",
      tag: "Gold medal AGRA 2022",
      card: "Light, mild and liquid for a long time. Forage at home and in Prekmurje.",
      intro: "A liquid honey, almost colourless to pale yellow, with a mild taste and hardly any scent. It stays liquid for a long time.",
      facts: [
        { label: "Colour", value: "almost colourless to pale yellow" },
        { label: "Taste", value: "mild, without a strong scent" },
        { label: "Crystallisation", value: "slow, stays liquid for a long time" },
        { label: "Forage", value: "at home and in Prekmurje" },
      ],
      body: [
        "Acacia, or black locust, is a nectar tree of warmer climates. The first flowers can open in the first days of May, and flowering can last into June.",
        "The acacia flow depends a lot on the weather. In good conditions it can be very rich. I take my bees to it at home and in Prekmurje.",
      ],
      kitchen: "As a spread on bread and to sweeten tea, coffee and fruit cakes.",
      seoTitle: "Acacia honey, light and slow to crystallise",
      seoDescription:
        "Acacia honey from Čebelarstvo Vidovič: light, mild and liquid for a long time, from forage at home and in Prekmurje. Gold medal AGRA 2022. Call +386 41 579 827.",
    },
    lipov: {
      name: "Linden honey",
      short: "Linden",
      photoAlt: "A bee on a linden flower",
      tag: "Dobrote slovenskih kmetij 2025",
      card: "A refreshing taste and a distinct scent of linden blossom.",
      intro: "A honey with a refreshing taste and a strong scent, gathered by the bees when the linden trees are in bloom.",
      facts: [
        { label: "Taste", value: "refreshing" },
        { label: "Scent", value: "distinct, of linden blossom" },
        { label: "Award", value: "bronze, Dobrote slovenskih kmetij 2025" },
      ],
      body: ["We have linden honey all year round, together with wildflower, acacia, forest and chestnut honey."],
      kitchen: "In tea and on bread.",
      seoTitle: "Linden honey with a refreshing taste",
      seoDescription: "Linden honey from Čebelarstvo Vidovič: a refreshing taste and a distinct scent. Jars of 250 g, 450 g and 900 g. Call +386 41 579 827.",
    },
    kostanjev: {
      name: "Chestnut honey",
      short: "Chestnut",
      photoAlt: "The forests of Haloze in autumn colours, with an apiary in the valley",
      tag: "Gold medal AGRA 2022",
      card: "Dark, with a characteristic bitterness. From the chestnut forests of Haloze.",
      intro: "A darker, reddish-brown honey with a scent reminiscent of wormwood and a more or less pronounced bitterness. We harvest it in Haloze.",
      facts: [
        { label: "Colour", value: "dark reddish brown" },
        { label: "Taste", value: "more or less bitter" },
        { label: "Special", value: "a lot of pollen" },
        { label: "Forage", value: "sweet chestnut in Haloze, in June" },
      ],
      body: [
        "The bitterness comes from the pollen grains, of which chestnut honey contains a great deal.",
        "Sweet chestnut is a very important nectar plant for bees. Its long, catkin-like flowers open in June and bloom until the first days of July. Chestnut is sensitive: if the rain washes it a few times, the yield is much lower.",
      ],
      kitchen: "For baking cakes and potica.",
      seoTitle: "Chestnut honey from Haloze",
      seoDescription:
        "Chestnut honey from Čebelarstvo Vidovič, from Haloze: dark, with a characteristic bitterness. Gold medal AGRA 2022. Jars of 250 g, 450 g and 900 g. Call +386 41 579 827.",
    },
    gozdni: {
      name: "Forest honey",
      short: "Forest",
      photoAlt: "An apiary in the morning mist among the hills of Haloze",
      tag: "Gold medal AGRA 2025",
      card: "Dark and full-flavoured. A natural blend from forest forage.",
      intro: "Forest honey comes in different shades of brown, because it is a natural blend of the honey our forests give.",
      facts: [
        { label: "Colour", value: "different shades of brown" },
        { label: "Taste", value: "full" },
        { label: "Origin", value: "nectar and honeydew from forest trees and undergrowth" },
        { label: "Award", value: "gold at AGRA and Dobrote slovenskih kmetij 2025" },
      ],
      body: [
        "On forest forage the bees collect nectar and honeydew from many kinds of trees and plants of the undergrowth. That is why honey from this forage varies a lot, depending on which species dominates.",
      ],
      kitchen: "For honey biscuits (medenjaki). We bake ours with forest honey.",
      seoTitle: "Forest honey, dark and full-flavoured",
      seoDescription:
        "Forest honey from Čebelarstvo Vidovič: dark and full-flavoured, gold medal AGRA 2025 and gold at Dobrote slovenskih kmetij 2025. Call +386 41 579 827.",
    },
    hojev: {
      name: "Silver fir honey",
      short: "Fir",
      photoAlt: "Morning mist over wooded hills",
      tag: "When the fir yields",
      card: "Thick, dark and almost without scent. Slow to crystallise.",
      intro: "Silver fir honey is a darker greenish brown and quite thick. It has almost no scent, but a very pleasant, distinctive taste.",
      facts: [
        { label: "Colour", value: "dark greenish brown" },
        { label: "Taste", value: "distinctive, pleasant" },
        { label: "Crystallisation", value: "slow to crystallise" },
        { label: "Availability", value: "not every year, please call" },
      ],
      body: [
        "Silver fir is very important for Slovenian beekeeping, but it is one of the most unpredictable sources. When it really yields, the harvest can be bigger than from any other plant.",
        "That is why there is not fir honey every year. Call and I will tell you whether I have it at the moment.",
      ],
      kitchen: "With dark bread, milky drinks and dried fruit.",
      seoTitle: "Silver fir honey, when the fir yields",
      seoDescription: "Silver fir honey from Čebelarstvo Vidovič: thick, dark and slow to crystallise. Available when the fir yields. Call +386 41 579 827.",
    },
  },
  products: {
    "maticni-mlecek": {
      name: "Royal jelly",
      text: "Fresh, straight from the hive. We have produced it since our first season in 2014.",
      detail: "30 g jar. Keep it in the fridge at 0 to 4 °C.",
      alt: "Small jars of fresh royal jelly from Čebelarstvo Vidovič",
    },
    "cvetni-prah": {
      name: "Bee pollen",
      text: "Pollen pellets the bees bring back from their forage. The colour depends on the plants it comes from.",
      detail: "Packs of 120 g, 200 g and 450 g, or by arrangement.",
      alt: "Bee pollen spilling from a glass jar",
    },
    propolis: {
      name: "Propolis",
      text: "Available as granules.",
      detail: "Call for quantities and availability.",
      alt: "Propolis granules",
    },
    vosek: {
      name: "Beeswax",
      text: "The bees make the wax themselves and build their comb from it. We cast wax items from it.",
      detail: "Wax figures and decorations.",
      alt: "A hexagonal beeswax piece with a bee",
    },
    darila: {
      name: "Gift boxes",
      text: "Honey makes a lovely gift. We pack the jars in gift boxes with a honeycomb pattern.",
      detail: "Boxes for one, two or three jars.",
      alt: "Gift box with two jars of Čebelarstvo Vidovič honey",
    },
  },
  queenFacts: [
    {
      title: "Mated and marked",
      text: "Every queen is mated and marked. I breed the Carniolan honey bee in a registered breeding apiary, under the expert supervision of the Agricultural Institute of Slovenia.",
    },
    {
      title: "With you the next day",
      text: "I send queens by post anywhere in Slovenia, with next-day delivery. You can also collect them in person at our home in Apače.",
    },
    {
      title: "From May to the end of August",
      text: "The first mated queens are usually available right after 1 May, the last ones at the end of August. Call for availability and price.",
    },
  ],
  kisResults: [
    { year: "2025", items: ["2nd place for average honey yield", "2nd place for lowest swarming tendency"] },
    { year: "2023", items: ["2nd place for average honey yield", "3rd place for lowest swarming tendency"] },
  ],
  queenSteps: [
    {
      title: "Rearing",
      text: "I raise queen cells from selected breeder queens. Preparations start early in spring.",
      alt: "A bar of queen cells in a hand, mating nucs under the trees behind",
    },
    {
      title: "Mating",
      text: "I take the mating nucs with the young queens to a mating station. Then we wait for the drones to do their job.",
      alt: "Colourful mating nucs among the trees at the mating station",
    },
    {
      title: "Marking",
      text: "Once the queen is laying, I take her out and mark her, so you can always find her quickly in the hive.",
      alt: "A queen held between the fingers for marking",
    },
    {
      title: "On her way",
      text: "In a queen cage with attendants, you collect her at our home or I send her by post. The next day she is with you.",
      alt: "Queens with attendants in cages, ready to be posted",
    },
  ],
  story: {
    quote: "I really have the bees to thank for everything I have.",
    paragraphs: [
      "I first met bees up close right after primary school. During the holidays I helped with the bees at Janko Pislak's, our biggest beekeeper. The first year I worked on royal jelly production; for the next few seasons I took the bars of royal jelly out of the hives.",
      "Being curious by nature, I wanted to know more about bees. Mr Pislak and all his workers shared their knowledge with me generously, and I am grateful to them to this day.",
      "After secondary school I spent three years as a driving instructor. In 1998 Mr Pislak called me and I started working for him full time. I helped with practically everything: looking after the colonies, extracting honey, producing royal jelly and queens, moving the bees to their forage.",
      "In 2014 I decided to keep bees on my own. I bought my first 60 hives with colonies, and we built the first mobile apiary at home. A year later we built a second one and registered queen rearing, and in 2016 a stationary apiary.",
    ],
    timeline: [
      { year: "1998", text: "Full-time job at the Pislak apiary." },
      { year: "2014", text: "On my own: the first 60 hives and the first mobile apiary." },
      { year: "2015", text: "A second mobile apiary and registered queen rearing." },
      { year: "2016", text: "A stationary apiary." },
      { year: "2019", text: "Our wildflower honey becomes national champion." },
    ],
  },
  awardImageAlts: {
    "priznanje-agra-2026-zlata": "Gold medal AGRA 2026 for Čebelarstvo Vidovič wildflower honey",
    "priznanja-2025": "Certificates from AGRA 2025 and Dobrote slovenskih kmetij 2025",
    "priznanja-agra-2024": "Three AGRA 2024 certificates",
    "priznanja-agra-2022": "Three AGRA 2022 gold medals",
    "priznanje-agra-2020": "Gold medal AGRA 2020 for wildflower honey",
    "priznanje-drzavni-prvak": "Slovenian Beekeepers' Association certificate: national champion for wildflower honey 2019",
    "priznanje-agra-2018": "Gold medal AGRA 2018 for wildflower honey",
    "priznanje-dsk-2017": "Gold award Dobrote slovenskih kmetij 2017 for forest honey",
  },
  awardLeads: [
    {
      title: "National champion for wildflower honey",
      text: "Awarded by the Slovenian Beekeepers' Association at the national sensory evaluation of honey. Only honeys that became champions of their type in the evaluations can compete for it.",
      alt: "Certificate: national champion for wildflower honey 2019, Slovenian Beekeepers' Association",
    },
    {
      title: "Quality mark",
      text: "Dobrote slovenskih kmetij awards it to a product rated gold three years in a row. Our wildflower honey from Haloze received it.",
      alt: "Quality mark plaque 2019, Dobrote slovenskih kmetij, for wildflower honey",
    },
    {
      title: "Anton Janša Award, 2nd class",
      text: "For special merit in advancing Slovenian beekeeping.",
      alt: "Certificate of the Anton Janša Award, 2nd class, for Jože Vidovič",
    },
  ],
  reviews: [
    { text: "Excellent bee products! Expert advice! I recommend them to everyone, near and far!", author: "Miran P.", source: "Google" },
    { text: "Homemade, high-quality products.", author: "Leon K.", source: "Google" },
    { text: "Expert and good value.", author: "Tomi R.", source: "Google" },
    { text: "Well done, you breed excellent queen bees!", author: "Queen buyer", source: "Text message" },
  ],
  faq: [
    {
      q: "When are queens available?",
      a: "The first mated queens are usually available right after 1 May, and rearing goes on until the end of August. The exact date depends on the weather, so please call +386 41 579 827.",
      queens: true,
    },
    {
      q: "How do I order queens?",
      a: "By phone on +386 41 579 827. Tell me how many queens you need and when, and we will arrange collection or posting.",
      queens: true,
    },
    {
      q: "Do you send queens by post?",
      a: "Yes. I send queens anywhere in Slovenia, with next-day delivery. You can also collect them in person at our home in Apače.",
      queens: true,
    },
    {
      q: "What queens do you breed?",
      a: "Mated and marked queens of the Carniolan honey bee. The breeding apiary is registered and rearing is under the expert supervision of the Agricultural Institute of Slovenia.",
      queens: true,
    },
    {
      q: "Where can I buy honey?",
      a: "At our home, Apače 300, Lovrenc na Dravskem polju. Visits are by arrangement, so please call first. By arrangement we also deliver honey around Ptuj and Maribor.",
    },
    {
      q: "What sizes does the honey come in?",
      a: "Glass jars of 250 g, 450 g and 900 g. Larger quantities by arrangement. Gift boxes for one, two or three jars are also available.",
    },
    {
      q: "My honey has crystallised. Is something wrong with it?",
      a: "No. Crystallisation is a natural process and does not change the honey. Put the jar in warm water and the crystals will melt. Do not heat honey above 40 °C.",
    },
    {
      q: "How much do honey and queens cost?",
      a: "We do not publish prices online because they change over the years. Call +386 41 579 827 and I will tell you the current price and what is in stock.",
    },
  ],
  medalLabel: { zlato: "Gold", srebro: "Silver", bron: "Bronze", naziv: "Title" },
  eventLabel: {
    agra: "AGRA",
    dsk: "Dobrote slovenskih kmetij",
    czs: "National honey evaluation, Slovenian Beekeepers' Association",
    "dsk-znak": "Dobrote slovenskih kmetij, quality mark",
  },
};
