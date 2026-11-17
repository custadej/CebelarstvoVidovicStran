# Content (Slovenian) — rules and source material

Final page copy will be written here section by section before it goes into components. Raw old-site text: [[sources/old-site-text]]. Facts: [[facts]].

## Copy rules

- Slovenian (sl-SI), vikanje for the visitor. Jože speaks in first person in the story.
- Short sentences. No filler ("v današnjem hitrem svetu"), no empty superlatives.
- Every number, year, award and place must exist in [[facts]] as verified or confirmed.
- Unconfirmed items appear as a visible placeholder in dev builds: `[[POTRDI: ...]]`. A build check must fail production export if any `[[POTRDI` string remains.
- CTA wording: vikanje everywhere. Primary button "Pokličite Jožeta", sticky bar "Pokličite · 041 579 827".
- No names of family members. Janko Pislak is named as in Jože's own text (review with Jože at handover).

## Health and nutrition claims — do not reuse the old text

The old site lists medical effects (honey for heart patients and low blood pressure, hojev med against cough and bronchitis, royal jelly for infertility and ageing, propolis as "naravni antibiotik", pollen "preprečuje obolenje prostate"). Health claims on food are regulated in the EU (Uredba (ES) št. 1924/2006) and these are not on the authorised list. On the new site:

- Describe taste, colour, aroma, crystallisation, origin, pasture, season, use in the kitchen.
- Composition facts are fine when neutral (e.g. honey is mostly fructose and glucose).
- No "zdravi", "preprečuje", "blaži", "krepi odpornost", no dosage advice for propolis/royal jelly.
- Storage advice is fine ("Medu ne segrevajte nad 40 °C").

## Reusable verbatim material (his own words, safe)

- Tagline: "Kar delaš, delaj z ljubeznijo ..."
- Story: the full /o-nas text in [[sources/old-site-text]] is good and personal. Edit lightly for length, keep his voice. Standout line: "... se moram čebelam res zahvaliti za vse kar imam."
- Honey sensory descriptions (colour, taste, crystallisation) and pasture notes:
  - Akacijev: tekoč, skoraj brezbarven ali nežno rumen, milega okusa. Paša doma in v Prekmurju.
  - Cvetlični: rumeno rjave barve, običajno hitro kristalizira. Travniki in sadovnjaki; "iz Haloz".
  - Gozdni: različni odtenki rjave, naravna mešanica medičine in mane z gozdnih dreves.
  - Kostanjev: temnejše rjavordeče barve, bolj ali manj grenak, veliko cvetnega prahu. Haloze. Cveti junija do prvih dni julija.
  - Hojev: temnejše rjavozelene barve, gost, ne kristalizira rad, skoraj brez vonja. "Ena bolj muhastih paš."
- Crystallisation note: naraven pojav; kozarec postavite v toplo vodo; ne segrevajte nad 40 °C.
- Packaging: kozarci 250 g, 450 g, 900 g; večje količine po dogovoru. Cvetni prah 120 g, 200 g, 450 g.
- Queens: "Matice letnik 2026 bodo na voljo takoj po 1. maju." (pattern for a yearly-updated season line)

## FAQ draft (answers pending — see Ask list in [[facts]])

| Question | Answer status |
|---|---|
| Kdaj so matice na voljo? | Prve oplojene matice običajno takoj po 1. maju, na voljo do konca avgusta (verified, FB) |
| Kako naročim matice? | Po telefonu 041 579 827 (verified) |
| Ali matice pošiljate po pošti? | Da, po vsej Sloveniji, dostava naslednji dan; ali osebni prevzem (verified, confirmed) |
| Kakšne matice vzrejate? | Oplojene in označene, kranjska čebela, vzreja pod nadzorom KIS; rezultati testiranja 2023 in 2025 (verified) |
| Kje lahko kupim med? | Doma, Apače 300, po dogovoru (pokličite prej); dostava na območju Ptuja in Maribora po dogovoru (verified, confirmed) |
| V kakšnih pakiranjih je med? | 250 g, 450 g, 900 g, večje količine po dogovoru (verified) |
| Zakaj med kristalizira? | from his own text, neutral, usable |
| Ali so na voljo darilni paketi? | Da, darilne škatle za 1, 2 ali 3 kozarce (verified by photos) |
| Koliko stane? | Not on site. "Pokličite za ceno in razpoložljivost." |

## Page copy

Final copy lives in code, in `src/data/content.ts` (honeys, products, queen facts and steps, story, awards, reviews, FAQ) and in the section components under `src/components/sections/` (headings and leads). Edit there; every fact must still be in [[facts]].
