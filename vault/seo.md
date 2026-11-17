# SEO — working notes

Draft from the research pass (2026-11-14). Keyword volumes are not measured yet; the map below is intent-based. Related: [[facts]], [[content-slovenian]].

## Canonical NAP (copy exactly; in code: `src/lib/site.ts`)

```
Čebelarstvo Vidovič
Jože Vidovič
Apače 300
2324 Lovrenc na Dravskem polju
041 579 827   (tel:+38641579827)
joza.vidovic@gmail.com
```

Phone and e-mail confirmed by Tadej 2026-11-14. Hours: "po dogovoru" (no openingHours in schema).

## Sitemap (agreed structure, pending OK)

| Route | Purpose |
|---|---|
| `/` | Home, all sections |
| `/matice` | Queens: offer, KIS results, process, ordering, shipping, FAQ |
| `/med` | All honeys, jar sizes, delivery |
| `/med/cvetlicni`, `/med/akacijev`, `/med/gozdni`, `/med/kostanjev`, `/med/lipov`, `/med/hojev` | One page per honey |
| `/cebelji-pridelki` | Matični mleček, cvetni prah, propolis, vosek, darila |
| `/o-nas` | Story |
| `/priznanja` | Full awards list with certificates |
| `/kontakt` | Contact, map link, form |
| `/zasebnost`, `/pravno-obvestilo` | Legal |

## Google Business Profile + Facebook checklist (for Tadej/Jože)

1. **Claim the Google profile** — it shows "Own this business?", so nobody manages it. Claim it with Jože's Google account.
2. Hours: profile says Mon–Sat 7–20, Sun 8–20; reality is "by arrangement". Either set realistic hours or keep them and add "Pokličite pred obiskom" in the description. Site and profile must not contradict each other.
3. Category "Honey farm" is fine; add secondary "Beekeeper" / "Farm shop" if offered.
4. Website link: switch from http to https and to the new site after launch.
5. Description: mention matice (queens), Haloze, Kidričevo/Ptuj, delivery.
6. Add 10–15 good photos (the same ones used on the site), logo and cover.
7. Add products (six honeys, matice) and the attribute for delivery.
8. Ask happy queen customers for reviews (20 reviews, 4.9 today).
9. Facebook About: add address Apače 300, phone 041 579 827, hours text, https website link; pin a post about queens each spring.
10. Fix the same NAP on kranjska-cebela.si, nasasuperhrana.si, skmetije.si (all list him already; make sure phone and website match).

## Old site findings

- Joomla, `index.php/...` URLs, no sitemap.xml (404), robots.txt disallows `/images/`.
- Homepage meta description is a generic definition of honey; no local or queen keywords anywhere.
- /matice has one sentence of text. Biggest content gap and biggest opportunity.
- PHP warnings are printed on /kontakt and /povezave.
- Domain to keep: `cebelarstvo-vidovic.si` (confirm with Tadej who controls DNS/hosting).

## 301 redirect map (old → new), to implement at deploy

| Old | New |
|---|---|
| /index.php/o-nas | /o-nas |
| /index.php/matice | /matice |
| /index.php/kontakt | /kontakt |
| /index.php/proizvodi, /index.php/proizvodi/med | /med |
| /index.php/11-med-proizvodi-posamezno/9-cvetlicni-med | /med/cvetlicni |
| /index.php/11-med-proizvodi-posamezno/10-akacijev-med | /med/akacijev |
| /index.php/11-med-proizvodi-posamezno/11-gozdni-med | /med/gozdni |
| /index.php/11-med-proizvodi-posamezno/12-kostanjev-med | /med/kostanjev |
| /index.php/11-med-proizvodi-posamezno/13-hojev-med | /med/hojev |
| (new) | /med/lipov |
| /index.php/proizvodi/maticni-mlecek, /cvetni-prah, /propolis, /vosek | /cebelji-pridelki |
| /index.php/aktivnosti | /priznanja |
| /index.php/povezave | / |

Static export cannot issue 301s by itself: needs `_redirects` (Cloudflare Pages) or nginx rules (cus.si).

## Keyword → page map (draft)

| Page | Primary | Secondary |
|---|---|---|
| / | čebelarstvo Vidovič, čebelarstvo Ptuj / Dravsko polje | domač med, med od čebelarja, čebelji pridelki |
| /matice | matice čebel, prodaja matic | čebelje matice cena, kranjska čebela matice, vzreja matic, matice 2027, vzrejališče matic Štajerska |
| /med | domač med, slovenski med | med Ptuj, med Kidričevo, nagrajen med |
| /med/cvetlicni | cvetlični med | cvetlični med Haloze, državni prvak |
| /med/kostanjev | kostanjev med | kostanjev med Haloze |
| /med/hojev | hojev med | jelkin med |
| /med/akacijev | akacijev med | akacijev med Prekmurje |
| /med/gozdni | gozdni med | — |
| /o-nas | Jože Vidovič čebelar | čebelar Lovrenc na Dravskem polju |
| /kontakt | čebelarstvo Vidovič kontakt | Apače 300, telefon |

Local modifiers to work into copy naturally: Apače, Lovrenc na Dravskem polju, Kidričevo, Ptuj, Dravsko polje, Haloze, Podravje, Štajerska.

## Structured data plan (verified fields only)

- `LocalBusiness` (+ `Store`): name, address, telephone, url, sameAs (Facebook, GBP), geo and openingHours only once confirmed, `award` array from the verified awards table, `founder`.
- `Product` per honey: name, description, brand, `award` where a certificate exists. No `offers` price, no ratings.
- `FAQPage`, `BreadcrumbList`, `WebSite`.

## To do

- Measure keyword demand (Google Keyword Planner / Search Console of the old domain if Tadej has access).
- GBP found and audited (2026-11-14); checklist above.
