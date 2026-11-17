import type { Translation } from "./content";

// Deutsch (Sie). Dieselben Regeln wie im Slowenischen: Geschmack, Farbe, Herkunft, Saison, Lagerung und Küche, keine Gesundheitsaussagen.
export const de: Translation = {
  honeys: {
    cvetlicni: {
      name: "Blütenhonig",
      short: "Blüten",
      photoAlt: "Zwei Bienen auf einer Wiesenblume in den Haloze",
      tag: "Slowenischer Meister 2019",
      card: "Mild und angenehm süß. Von den blühenden Wiesen und Obstgärten der Haloze.",
      intro: "Unser meistprämierter Honig. Die Bienen sammeln ihn auf den blühenden Wiesen und in den Obstgärten der Haloze, wo den ganzen Sommer über etwas blüht.",
      facts: [
        { label: "Farbe", value: "gelblich braun, je nach Blüten" },
        { label: "Geschmack", value: "mild, angenehm süß" },
        { label: "Kristallisation", value: "meist schnell" },
        { label: "Tracht", value: "Wiesen und Obstgärten in den Haloze" },
      ],
      body: [
        "Die Farbe des Blütenhonigs ist jedes Jahr etwas anders, weil sie von den Blüten abhängt, an denen die Bienen Nektar gesammelt haben.",
        "Er kristallisiert meist schnell, ganz oder teilweise, mit großen Kristallen. Das ist ein natürlicher Vorgang und mindert die Qualität nicht.",
      ],
      kitchen: "Aufs Brot, zum Backen, in Salatdressings und Getränken.",
      seoTitle: "Blütenhonig aus den Haloze, Slowenischer Meister 2019",
      seoDescription:
        "Blütenhonig von Čebelarstvo Vidovič von den Wiesen der Haloze: Slowenischer Meister 2019 und mehrfach Gold auf der Messe AGRA. Gläser zu 250 g, 450 g und 900 g. Rufen Sie an: +386 41 579 827.",
    },
    akacijev: {
      name: "Akazienhonig",
      short: "Akazie",
      photoAlt: "Honiggläser von Čebelarstvo Vidovič im Gegenlicht, der Akazienhonig ist der hellste",
      tag: "Goldmedaille AGRA 2022",
      card: "Hell, mild und lange flüssig. Tracht zu Hause und im Prekmurje.",
      intro: "Ein flüssiger, fast farbloser bis zartgelber Honig mit mildem Geschmack und kaum Duft. Er bleibt lange flüssig.",
      facts: [
        { label: "Farbe", value: "fast farblos bis zartgelb" },
        { label: "Geschmack", value: "mild, ohne ausgeprägten Duft" },
        { label: "Kristallisation", value: "langsam, bleibt lange flüssig" },
        { label: "Tracht", value: "zu Hause und im Prekmurje" },
      ],
      body: [
        "Die Akazie, also die Robinie, ist ein Trachtbaum wärmerer Gegenden. Die ersten Blüten können sich schon Anfang Mai öffnen, die Blüte kann bis in den Juni dauern.",
        "Die Akazientracht hängt stark vom Wetter ab. Unter guten Bedingungen kann sie sehr ergiebig sein. Ich wandere mit den Bienen zu Hause und im Prekmurje auf die Akazie.",
      ],
      kitchen: "Als Brotaufstrich und zum Süßen von Tee, Kaffee und Obstkuchen.",
      seoTitle: "Akazienhonig, hell und lange flüssig",
      seoDescription:
        "Akazienhonig von Čebelarstvo Vidovič: hell, mild und lange flüssig, aus der Tracht zu Hause und im Prekmurje. Goldmedaille AGRA 2022. Rufen Sie an: +386 41 579 827.",
    },
    lipov: {
      name: "Lindenhonig",
      short: "Linde",
      photoAlt: "Eine Biene auf einer Lindenblüte",
      tag: "Dobrote slovenskih kmetij 2025",
      card: "Erfrischender Geschmack und deutlicher Duft nach Lindenblüten.",
      intro: "Ein Honig mit erfrischendem Geschmack und kräftigem Duft, den die Bienen sammeln, wenn die Linden blühen.",
      facts: [
        { label: "Geschmack", value: "erfrischend" },
        { label: "Duft", value: "deutlich, nach Lindenblüten" },
        { label: "Auszeichnung", value: "Bronze, Dobrote slovenskih kmetij 2025" },
      ],
      body: ["Lindenhonig haben wir das ganze Jahr über, zusammen mit Blüten-, Akazien-, Wald- und Kastanienhonig."],
      kitchen: "Im Tee und aufs Brot.",
      seoTitle: "Lindenhonig mit erfrischendem Geschmack",
      seoDescription: "Lindenhonig von Čebelarstvo Vidovič: erfrischender Geschmack und deutlicher Duft. Gläser zu 250 g, 450 g und 900 g. Rufen Sie an: +386 41 579 827.",
    },
    kostanjev: {
      name: "Kastanienhonig",
      short: "Kastanie",
      photoAlt: "Die Wälder der Haloze in Herbstfarben mit einem Bienenhaus im Tal",
      tag: "Goldmedaille AGRA 2022",
      card: "Dunkel, mit typischer Herbe. Aus den Kastanienwäldern der Haloze.",
      intro: "Ein dunklerer, rotbrauner Honig mit einem Duft, der an Wermut erinnert, und mehr oder weniger ausgeprägter Herbe. Wir ernten ihn in den Haloze.",
      facts: [
        { label: "Farbe", value: "dunkel rotbraun" },
        { label: "Geschmack", value: "mehr oder weniger herb" },
        { label: "Besonderheit", value: "viel Pollen" },
        { label: "Tracht", value: "Edelkastanie in den Haloze, im Juni" },
      ],
      body: [
        "Die Herbe kommt von den Pollenkörnern, von denen Kastanienhonig sehr viele enthält.",
        "Die Edelkastanie ist für die Bienen eine sehr wichtige Trachtpflanze. Ihre langen, kätzchenartigen Blüten öffnen sich im Juni und blühen bis Anfang Juli. Die Kastanie ist empfindlich: Wäscht der Regen sie ein paar Mal aus, fällt die Ernte deutlich geringer aus.",
      ],
      kitchen: "Zum Backen von Gebäck und Potica.",
      seoTitle: "Kastanienhonig aus den Haloze",
      seoDescription:
        "Kastanienhonig von Čebelarstvo Vidovič aus den Haloze: dunkel, mit typischer Herbe. Goldmedaille AGRA 2022. Gläser zu 250 g, 450 g und 900 g. Rufen Sie an: +386 41 579 827.",
    },
    gozdni: {
      name: "Waldhonig",
      short: "Wald",
      photoAlt: "Ein Bienenhaus im Morgennebel zwischen den Hügeln der Haloze",
      tag: "Goldmedaille AGRA 2025",
      card: "Dunkel und vollmundig. Eine natürliche Mischung aus der Waldtracht.",
      intro: "Waldhonig hat verschiedene Brauntöne, weil er eine natürliche Mischung des Honigs ist, den unsere Wälder geben.",
      facts: [
        { label: "Farbe", value: "verschiedene Brauntöne" },
        { label: "Geschmack", value: "vollmundig" },
        { label: "Herkunft", value: "Nektar und Honigtau von Waldbäumen und Unterholz" },
        { label: "Auszeichnung", value: "Gold auf der AGRA und bei Dobrote slovenskih kmetij 2025" },
      ],
      body: [
        "In der Waldtracht sammeln die Bienen Nektar und Honigtau von verschiedenen Baumarten und Pflanzen des Unterholzes. Deshalb ist Honig aus dieser Tracht sehr unterschiedlich, je nachdem, welche Art überwiegt.",
      ],
      kitchen: "Für Honiglebkuchen (medenjaki). Wir backen unsere mit Waldhonig.",
      seoTitle: "Waldhonig, dunkel und vollmundig",
      seoDescription:
        "Waldhonig von Čebelarstvo Vidovič: dunkel und vollmundig, Goldmedaille AGRA 2025 und Gold bei Dobrote slovenskih kmetij 2025. Rufen Sie an: +386 41 579 827.",
    },
    hojev: {
      name: "Tannenhonig",
      short: "Tanne",
      photoAlt: "Morgennebel über bewaldeten Hügeln",
      tag: "Wenn die Tanne honigt",
      card: "Dickflüssig, dunkel und fast ohne Duft. Kristallisiert ungern.",
      intro: "Tannenhonig ist dunkel grünlich braun und recht dickflüssig. Er duftet kaum, hat aber einen sehr angenehmen, ausgeprägten Geschmack.",
      facts: [
        { label: "Farbe", value: "dunkel grünlich braun" },
        { label: "Geschmack", value: "ausgeprägt, angenehm" },
        { label: "Kristallisation", value: "kristallisiert ungern" },
        { label: "Erhältlich", value: "nicht jedes Jahr, bitte anrufen" },
      ],
      body: [
        "Die Weißtanne ist für die slowenische Imkerei sehr wichtig, gilt aber als eine der launischsten Trachten. Wenn sie wirklich honigt, kann die Ernte größer sein als bei jeder anderen Pflanze.",
        "Deshalb gibt es Tannenhonig nicht jedes Jahr. Rufen Sie an, dann sage ich Ihnen, ob ich gerade welchen habe.",
      ],
      kitchen: "Zu dunklem Brot, Milchgetränken und Trockenobst.",
      seoTitle: "Tannenhonig, wenn die Tanne honigt",
      seoDescription: "Tannenhonig von Čebelarstvo Vidovič: dickflüssig, dunkel, kristallisiert ungern. Erhältlich, wenn die Tanne honigt. Rufen Sie an: +386 41 579 827.",
    },
  },
  products: {
    "maticni-mlecek": {
      name: "Gelée royale",
      text: "Frisch, direkt aus dem Bienenstock. Wir gewinnen es seit unserer ersten Saison 2014.",
      detail: "Gläschen zu 30 g. Im Kühlschrank bei 0 bis 4 °C aufbewahren.",
      alt: "Gläschen mit frischem Gelée royale von Čebelarstvo Vidovič",
    },
    "cvetni-prah": {
      name: "Blütenpollen",
      text: "Pollenhöschen, die die Bienen von der Tracht heimbringen. Die Farbe hängt von den Pflanzen ab, von denen er stammt.",
      detail: "Packungen zu 120 g, 200 g und 450 g oder nach Absprache.",
      alt: "Blütenpollen, aus einem Glas geschüttet",
    },
    propolis: {
      name: "Propolis",
      text: "Erhältlich als Granulat.",
      detail: "Für Mengen und Verfügbarkeit bitte anrufen.",
      alt: "Propolis-Granulat",
    },
    vosek: {
      name: "Bienenwachs",
      text: "Das Wachs erzeugen die Bienen selbst und bauen daraus ihre Waben. Wir gießen daraus Wachsartikel.",
      detail: "Wachsfiguren und Dekorationen.",
      alt: "Sechseckiges Wachsstück mit einer Biene",
    },
    darila: {
      name: "Geschenkboxen",
      text: "Honig ist ein schönes Geschenk. Wir packen die Gläser in Geschenkboxen mit Wabenmuster.",
      detail: "Boxen für ein, zwei oder drei Gläser.",
      alt: "Geschenkbox mit zwei Gläsern Honig von Čebelarstvo Vidovič",
    },
  },
  queenFacts: [
    {
      title: "Begattet und gezeichnet",
      text: "Jede Königin ist begattet und gezeichnet. Ich züchte die Krainer Biene (Carnica) in einer registrierten Zuchtstätte unter fachlicher Aufsicht des Landwirtschaftsinstituts Sloweniens.",
    },
    {
      title: "Am nächsten Tag bei Ihnen",
      text: "Ich versende Königinnen mit der Post in ganz Slowenien, die Zustellung erfolgt am nächsten Tag. Sie können sie auch persönlich bei uns zu Hause in Apače abholen.",
    },
    {
      title: "Von Mai bis Ende August",
      text: "Die ersten begatteten Königinnen gibt es meist gleich nach dem 1. Mai, die letzten Ende August. Für Verfügbarkeit und Preis bitte anrufen.",
    },
  ],
  kisResults: [
    { year: "2025", items: ["2. Platz beim durchschnittlichen Honigertrag", "2. Platz bei der geringsten Schwarmneigung"] },
    { year: "2023", items: ["2. Platz beim durchschnittlichen Honigertrag", "3. Platz bei der geringsten Schwarmneigung"] },
  ],
  queenSteps: [
    {
      title: "Aufzucht",
      text: "Die Weiselzellen ziehe ich aus ausgewählten Zuchtmüttern. Die Vorbereitungen beginnen früh im Frühjahr.",
      alt: "Zuchtlatte mit Weiselzellen in der Hand, dahinter Begattungskästchen unter Bäumen",
    },
    {
      title: "Begattung",
      text: "Die Begattungskästchen mit den jungen Königinnen bringe ich auf eine Belegstelle. Dann warten wir, bis die Drohnen ihre Aufgabe erfüllt haben.",
      alt: "Bunte Begattungskästchen zwischen Bäumen auf der Belegstelle",
    },
    {
      title: "Zeichnen",
      text: "Sobald die Königin legt, nehme ich sie heraus und zeichne sie. So finden Sie sie im Volk immer schnell.",
      alt: "Eine Königin zwischen den Fingern beim Zeichnen",
    },
    {
      title: "Auf den Weg",
      text: "Im Versandkäfig mit Begleitbienen holen Sie sie bei uns ab, oder ich schicke sie mit der Post. Am nächsten Tag ist sie bei Ihnen.",
      alt: "Königinnen mit Begleitbienen in Versandkäfigen, bereit zum Versand",
    },
  ],
  story: {
    quote: "Den Bienen habe ich wirklich alles zu verdanken, was ich habe.",
    paragraphs: [
      "Aus der Nähe habe ich Bienen gleich nach der Grundschule kennengelernt. In den Ferien half ich bei unserem größten Imker, Janko Pislak. Im ersten Jahr arbeitete ich bei der Gewinnung von Gelée royale mit, in den folgenden Saisonen holte ich die Zuchtlatten mit dem Gelée aus den Beuten.",
      "Weil ich von Natur aus neugierig bin, wollte ich mehr über Bienen wissen. Herr Pislak und alle seine Mitarbeiter teilten ihr Wissen großzügig mit mir, und dafür bin ich ihnen bis heute dankbar.",
      "Nach der Mittelschule war ich drei Jahre Fahrlehrer. 1998 rief mich Herr Pislak an, und ich fing fest bei ihm an. Ich half praktisch bei allem: bei der Pflege der Völker, beim Schleudern, bei der Gewinnung von Gelée royale und der Königinnenzucht, beim Wandern mit den Bienen.",
      "2014 beschloss ich, selbstständig zu imkern. Ich kaufte die ersten 60 Beuten mit Völkern, und zu Hause bauten wir den ersten Wanderbienenstand. Ein Jahr später bauten wir den zweiten und meldeten die Königinnenzucht an, 2016 kam ein fester Bienenstand dazu.",
    ],
    timeline: [
      { year: "1998", text: "Feste Anstellung in der Imkerei Pislak." },
      { year: "2014", text: "Der eigene Weg: die ersten 60 Beuten und der erste Wanderbienenstand." },
      { year: "2015", text: "Zweiter Wanderbienenstand und angemeldete Königinnenzucht." },
      { year: "2016", text: "Fester Bienenstand." },
      { year: "2019", text: "Unser Blütenhonig wird Slowenischer Meister." },
    ],
  },
  awardImageAlts: {
    "priznanje-agra-2026-zlata": "Goldmedaille AGRA 2026 für den Blütenhonig von Čebelarstvo Vidovič",
    "priznanja-2025": "Urkunden AGRA 2025 und Dobrote slovenskih kmetij 2025",
    "priznanja-agra-2024": "Drei Urkunden AGRA 2024",
    "priznanja-agra-2022": "Drei Goldmedaillen AGRA 2022",
    "priznanje-agra-2020": "Goldmedaille AGRA 2020 für Blütenhonig",
    "priznanje-drzavni-prvak": "Urkunde des Slowenischen Imkerverbands: Slowenischer Meister für Blütenhonig 2019",
    "priznanje-agra-2018": "Goldmedaille AGRA 2018 für Blütenhonig",
    "priznanje-dsk-2017": "Goldene Auszeichnung Dobrote slovenskih kmetij 2017 für Waldhonig",
  },
  awardLeads: [
    {
      title: "Slowenischer Meister für Blütenhonig",
      text: "Verliehen vom Slowenischen Imkerverband bei der nationalen sensorischen Honigbewertung. Teilnehmen können nur Honige, die bei den Bewertungen Sieger ihrer Sorte geworden sind.",
      alt: "Urkunde Slowenischer Meister für Blütenhonig 2019, Slowenischer Imkerverband",
    },
    {
      title: "Qualitätszeichen",
      text: "Dobrote slovenskih kmetij verleiht es einem Erzeugnis, das drei Jahre in Folge mit Gold bewertet wurde. Unser Blütenhonig aus den Haloze hat es erhalten.",
      alt: "Plakette Qualitätszeichen 2019, Dobrote slovenskih kmetij, für Blütenhonig",
    },
    {
      title: "Anton-Janša-Auszeichnung II. Stufe",
      text: "Für besondere Verdienste um die slowenische Imkerei.",
      alt: "Urkunde der Anton-Janša-Auszeichnung II. Stufe für Jože Vidovič",
    },
  ],
  reviews: [
    { text: "Hervorragende Bienenprodukte! Fachkundige Beratung! Ich empfehle sie allen, von nah und fern!", author: "Miran P.", source: "Google" },
    { text: "Hausgemachte, hochwertige Produkte.", author: "Leon K.", source: "Google" },
    { text: "Fachkundig und preiswert.", author: "Tomi R.", source: "Google" },
    { text: "Großes Lob, Sie züchten hervorragende Bienenköniginnen!", author: "Käufer von Königinnen", source: "SMS" },
  ],
  faq: [
    {
      q: "Wann gibt es Königinnen?",
      a: "Die ersten begatteten Königinnen gibt es meist gleich nach dem 1. Mai, die Zucht dauert bis Ende August. Der genaue Termin hängt vom Wetter ab, rufen Sie also bitte an: +386 41 579 827.",
      queens: true,
    },
    {
      q: "Wie bestelle ich Königinnen?",
      a: "Telefonisch unter +386 41 579 827. Sagen Sie mir, wie viele Königinnen Sie wann brauchen, und wir vereinbaren Abholung oder Versand.",
      queens: true,
    },
    {
      q: "Verschicken Sie Königinnen mit der Post?",
      a: "Ja. Ich verschicke Königinnen in ganz Slowenien, die Zustellung erfolgt am nächsten Tag. Sie können sie auch persönlich bei uns zu Hause in Apače abholen.",
      queens: true,
    },
    {
      q: "Welche Königinnen züchten Sie?",
      a: "Begattete und gezeichnete Königinnen der Krainer Biene (Carnica). Die Zuchtstätte ist registriert, die Zucht steht unter fachlicher Aufsicht des Landwirtschaftsinstituts Sloweniens.",
      queens: true,
    },
    {
      q: "Wo kann ich Honig kaufen?",
      a: "Bei uns zu Hause, Apače 300, Lovrenc na Dravskem polju. Besuche nach Vereinbarung, bitte rufen Sie vorher an. Nach Absprache liefern wir Honig auch in der Gegend von Ptuj und Maribor.",
    },
    {
      q: "In welchen Größen gibt es den Honig?",
      a: "In Gläsern zu 250 g, 450 g und 900 g. Größere Mengen nach Absprache. Es gibt auch Geschenkboxen für ein, zwei oder drei Gläser.",
    },
    {
      q: "Mein Honig ist kristallisiert. Ist etwas nicht in Ordnung?",
      a: "Nein. Kristallisation ist ein natürlicher Vorgang und verändert den Honig nicht. Stellen Sie das Glas in warmes Wasser, dann lösen sich die Kristalle. Erwärmen Sie Honig nicht über 40 °C.",
    },
    {
      q: "Was kosten Honig und Königinnen?",
      a: "Preise veröffentlichen wir nicht online, weil sie sich mit den Jahren ändern. Rufen Sie an unter +386 41 579 827, dann nenne ich Ihnen den aktuellen Preis und was vorrätig ist.",
    },
  ],
  medalLabel: { zlato: "Gold", srebro: "Silber", bron: "Bronze", naziv: "Titel" },
  eventLabel: {
    agra: "AGRA",
    dsk: "Dobrote slovenskih kmetij",
    czs: "Nationale Honigbewertung, Slowenischer Imkerverband",
    "dsk-znak": "Dobrote slovenskih kmetij, Qualitätszeichen",
  },
};
