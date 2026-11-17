# Asset log

All originals are untouched in `assets/original/old-site/` (downloaded 2026-11-14 from https://www.cebelarstvo-vidovic.si). Optimised derivatives will go to `public/images/` once the build starts. Related: [[facts]], [[brand]].

Quality scale: **A** hero-capable (≥ 2400 px, sharp) · **B** good for half-width / cards · **C** small use only (≤ ~400 px displayed) · **D** do not use.

**Verdict (updated after the Facebook pass):** the old site alone had nothing above 500 px, but the Facebook page gave 246 photos (`assets/original/facebook/fb-001…246.jpg`, most 1280–2048 px). There is now real, usable imagery for every section. Nothing is true 4K, so heroes use a 1440–2048 px photo under a gradient or inside a mask rather than raw full-bleed on large desktops.

## Logo

| File | Source path | Size | Rating | Notes / intended use |
|---|---|---|---|---|
| Logo.png | /images/Logo.png | 497×223, PNG with baked-in drop shadow | C | Cartoon bee sitting on an AŽ hive + bold humanist sans wordmark "Čebelarstvo Vidovič". Too small for retina header or print. Needs a faithful SVG redraw; **ask Tadej before touching** (see [[brand]]). |
| assets/derived/logo-clean.png | built by `scripts/logo-clean.py` from Logo.png | 883×370 | B+ | Shadow and glow removed, trimmed, re-antialiased; drawing unchanged. This is what the site uses (header, footer, icons). Light backgrounds only. |
| favicon.ico, apple_touch_icon.png | /templates/jp-hope/ | 30×26, 114×114 | D | Joomla template defaults, not his brand. |

## Photos — people, apiary, bees

| File | Source path | Size | Rating | Content | Intended use |
|---|---|---|---|---|---|
| predstavitev.jpg | /images/data/ | 500×333 | C | Jože standing by the mobile apiary (wooden wagon, coloured AŽ hive fronts) on a meadow. Only photo of him. | O nas, small framed print-style image until reshoot |
| matice1.jpg | /images/data/ | 500×359 | C | Macro: queen on comb surrounded by workers. Great subject. | Matice section, small / hex-masked |
| matice2.jpg | /images/data/ | 500×313 | C | Queen cells on a cell bar with bees. Great subject. | Matice section, small |
| zalega.jpg | /images/ | 953×528 | B- | Full frame of capped brood with bees, slight blue cast. | Matice / O nas, half-width with colour correction |
| maticni-mlecek1.jpg | /images/data/ | 500×333 | C | Hand harvesting royal jelly from queen cups. | Matični mleček card |
| a-20.jpg | /images/slides/a (20).jpg | 912×418 | C | Bee on acacia blossom. **Provenance unknown.** | Hold until Jože confirms it is his |
| a-3.jpg | /images/slides/a (3).jpg | 912×507 | C | Bee macro on yellow blossom. **Provenance unknown.** | Hold |
| a-35.jpg | /images/slides/a-(35).jpg | 1152×495 | C | Bee flying to fruit blossom, blue sky. Looks like stock. **Provenance unknown.** | Hold |
| a-38.jpg | /images/slides/a-(38).jpg | 912×464 | C | Bee on buttercup. **Provenance unknown.** | Hold |

## Photos — products

| File | Source path | Size | Rating | Content | Intended use |
|---|---|---|---|---|---|
| akacijev_med.jpg | /images/data/ | 400×262 | C | Jar of acacia honey among acacia blossoms; label readable | Honey card thumbnail only |
| cvetlicni_rezan_skupaj.jpg | /images/data/ | 400×261 | C | Two jars (900 g, 250 g) flower honey on dandelions (composited) | Honey card thumbnail only |
| gozdni_med.jpg | /images/data/ | 400×260 | C | Two jars forest honey + wooden bee toy | Honey card thumbnail only |
| hojev_rezan_skupaj.jpg | /images/data/ | 400×260 | C | Jar of fir honey on fir branch (composited) | Honey card thumbnail only |
| kostanj_rezan_skupaj.jpg | /images/data/ | 400×261 | C | Two jars chestnut honey on chestnut blossom (composited) | Honey card thumbnail only |
| med_vsi.jpg | /images/data/ | 500×333 | C | Gift boxes, bear jars, squeeze bottles, wax figures | Gift packs mention, small |
| maticni-mlecek2.jpg | /images/data/ | 500×333 | C | 30 g royal jelly container, label readable | Product card |
| cvetni-prah.jpg | /images/data/ | 500×333 | C | Pollen spilling from jar, yellow backdrop | Product card |
| cvetni-prah-1.JPG | /images/slides/ | 1024×550 | B- | Same scene, larger | Product card (preferred over the 500 px one) |
| propolis.JPG | /images/data/ | 500×334 | C | Propolis granulate pile | Product card |
| vosek.jpg | /images/data/ | 500×305 | C | Wax roses, hexagon wax blocks with logo, bear jar | Product card |

The 96 px news-module thumbnails (`/modules/mod_news_pro_gk5/cache/...`) were skipped; they are downscaled copies of the jar photos above.

## Certificates (phone photos, high resolution, glare and perspective skew)

All rated **B**: fine for an awards wall after crop + perspective correction; text is legible.

| File | Size | Content |
|---|---|---|
| IMG_3373.jpg | 1000×668 | DSK Ptuj 2017: zlato gozdni + zlato cvetlični (pair) |
| zlata-ptuj_1.jpg | 1000×1428 | DSK Ptuj 2017: zlato gozdni (scan-quality, best of the DSK set) |
| IMG_7087.jpg, IMG_7093.jpg | 850×1225 each | AGRA 2017 zlata medalja, cvetlični (same certificate twice) |
| IMG_20190315_162735_a.jpg | 1600×1057 | DSK Ptuj 2018: zlato cvetlični + srebrno gozdni |
| IMG_20190315_155602.jpg | 1222×2182 | AGRA 2018 zlata medalja, cvetlični |
| IMG_20190315_162758_a.jpg | 1500×1995 | Odlikovanje Antona Janše II. stopnje, 12. 10. 2018 |
| IMG_3882_b.jpg | 1924×1336 | DSK 2019: zlato gozdni + zlato cvetlični |
| IMG_3890_b.jpg | 864×1296 | DSK 2019 Znak kakovosti plaque (bronze relief on red) — most photogenic object |
| IMG_20191206_223237_1.jpg | 3840×5120 | ČZS Državni prvak za cvetlični med 2019 — highest resolution file, slight angle |
| IMG_0900_a.JPG | 3261×4753 | DSK Ptuj 2020: zlato cvetlični |
| IMG_0901_a.JPG | 2861×5004 | AGRA 2020 zlata medalja, cvetlični |
| IMG_0899_a.JPG | 2644×4372 | AGRA 2020 bronasta medalja, kostanjev |
| IMG_20220914_194505_1.jpg | 900×675 | AGRA 2022: three gold certificates fanned on a table (cvetlični, kostanjev, akacijev) |

## Facebook photos (downloaded 2026-11-14 through Tadej's browser, with his OK)

Source: public posts of https://www.facebook.com/cebelarstvo.vidovic. Files are numbered in feed order (newest first). Sizes are what Facebook serves in the feed (max 2048 px). Rating scale as above.

### Selected for the site

| File | Size | Rating | Content | Intended use |
|---|---|---|---|---|
| fb-181 | 1440×960 | A- | Haloze hills in storm light, tiny colourful mobile apiary in the meadow | **Home hero** |
| fb-182 | 1440×960 | B+ | Same valley, low cloud | Hero alternate / O nas |
| fb-229 | 1440×960 | B+ | Mobile apiary + branded van in a Haloze valley | O nas, Kje nas najdete |
| fb-222 | 1440×960 | A- | Apiary front, colour-block AŽ hive fronts, bees in the air | Section opener, colour-strip motif source |
| fb-163 | 2048×1536 | B+ | Apiary wagon side + van (van shows phone + URL) | O nas |
| fb-165 | 1280×960 | B | Person on a ladder painting the apiary | O nas ("doma smo izdelali") |
| fb-047 | 2048×1536 | B | Apiary in snow (has "Srečno 2025" text overlay → crop or skip) | — |
| fb-236, fb-237 | 960×720 | B- | Apiary in snow, no text | Small seasonal image |
| fb-207, fb-208, fb-209 | 960–1440 | B | Misty sunrise over Haloze, apiary in fog | Atmospheric band, footer |
| fb-129, fb-130 | ~1100×800 | B | Haloze in autumn colours, apiary in the valley | O nas |
| fb-223, fb-225 | 1440×960 | B+ | Blossoming orchard in Haloze | Cvetlični med |
| fb-018 | 1858×1796 | **A** | Macro: marked queen (numbered disc) on comb edge with workers | **Matice hero** |
| fb-021/022/023 | 1080×1044 | B+ | Variants of the same queen macro | Matice |
| fb-120, fb-149 | 1280×960 / 960×1280 | B+ | Green-marked queen among workers | Matice |
| fb-170, fb-169, fb-221 | ~960 | B | White/blue/numbered marked queens | Matice gallery |
| fb-017 | 1279×720 | B+ | Bar of queen cells held up in the mating yard | Matice: "vzreja" step |
| fb-085, fb-152 | 1280×960 / 960×720 | B | Queen-cell bars inside the hive | Matice |
| fb-213 | 1440×960 | B+ | Hands caging a queen at a mating nuc | Matice: "kako poteka" |
| fb-211 | 1080×1142 | B | Queen held in fingers for marking | Matice |
| fb-039, fb-069, fb-079, fb-214 | 960–1440 | B | Queens in shipping cages, ready to go | Matice: "pošiljanje po pošti" |
| fb-040, fb-080 | 960×1280 | B | Marked queen in a ČZS cage in hand | Matice |
| fb-042, fb-118, fb-119, fb-151, fb-154, fb-217 | 1280×960 | B | Mating-nuc yard among trees, colour boxes | Matice: plemenilna postaja |
| fb-026, fb-027, fb-077, fb-078 | 1259–2048 | B (documents) | Published KIS progeny-test tables 2025 and 2023 with his rows | Source for facts; optionally shown small as proof |
| fb-005 | 1456×960 | A- | Five honeys in a row (kostanjev, gozdni, lipov, cvetlični, akacijev), slate background | **Med section lead** |
| fb-054, fb-006 | 1080×712 / 1254×720 | B | Same line-up, other angles | Med |
| fb-234 | 1120×535 | B | Five honeys backlit on a rail | Med banner |
| fb-004, fb-053, fb-126 | 1440×960 / 1080×720 | B+ | Three jar sizes (900/450/250 g) | "Pakiranja" |
| fb-007 | 843×1238 | B | Single gozdni med jar close-up | Honey card |
| fb-138 | 1283×960 | B | Akacijev, kostanjev, cvetlični jars | Honey cards (crop per jar) |
| fb-058 | 1080×1440 | B+ | Honey pouring into a jar on the scale | Honey-pour moment, real photo |
| fb-105 | 2048×1536 | B+ | Honey on bread with dipper, apples, jar | Med: use in the kitchen |
| fb-001, fb-013, fb-014 | 640–960 wide | B | Royal jelly jar with spoon; rows of 30 g jars | Matični mleček |
| fb-190–193 | ~960 | B | Royal jelly / queen-cup bars being worked | Matični mleček |
| fb-003 | 1440×960 | B | Squeeze bottle, bear jar, wax candle | Ostali pridelki |
| fb-073 | ~960 | B | Hexagon wax block with bee | Vosek |
| fb-055, fb-056, fb-096–099, fb-124, fb-125, fb-246 | 960–1440 | B | Hex gift boxes (1/2/3 jars) on various backgrounds | Darila |
| fb-048, fb-167, fb-168 | 615×923 / 1440×960 | B+ | Hexagon shelf wall in the home sales corner | Kontakt / "Kotiček na domu" |
| fb-081, fb-082 | 2048×1880 | A- | Bees on comb, macro | Texture, section backgrounds |
| fb-083, fb-153 | 1280×960 | B | Frames of capped honey | Med |
| fb-142–145, fb-113 | 800–1440 | B+ | Bees on dandelion, pollen loads | Cvetlični med, cvetni prah |
| fb-064–067 | ~1440 | B | Linden blossom with bee | Lipov med |
| fb-111, fb-112, fb-174, fb-175 | 1440×960 | B+ | Bees on meadow flowers | Cvetlični med |
| fb-157, fb-158, fb-226 | ~1280 | B | Bee on fruit blossom | Decorative |
| fb-161 | 912×684 | B- | Bees at a red hive entrance | Detail |
| fb-019, fb-020 | 720×1279 | B | AGRA 2026 certificates (gold cvetlični, silver akacijev) | Priznanja |
| fb-033 | 1080×1440 | B | AGRA 2025 ×3 + DSK 2025 ×3 certificates | Priznanja |
| fb-062 | 1279×720 | B | AGRA 2024 ×3 certificates | Priznanja |
| fb-137 | 1283×960 | B | AGRA 2022 ×3 certificates, flat | Priznanja (better than the old-site photo) |
| fb-205, fb-206 | 720×960 | B | Close-up of AGRA 2020 gold and bronze foil seals | Priznanja detail, medal texture |
| fb-197, fb-199 | 960×1280 | B | Državni prvak 2019 certificate and glass trophy | Priznanja lead |
| fb-200 | 960×1280 | B | Award handover, two men with trophies | Hold: shows a third person; use only if Jože wants |
| fb-037, fb-038, fb-071 | ~1280 | B- | Kindergarten visits (children visible) | Do not use (children) |

### Not for the site

Shared posts and third-party material: fb-015 (cyclist), fb-092 (meme), fb-189, fb-194, fb-204, fb-212, fb-242 (graphics by others), fb-240/241 (influencer photos), fb-008–012 (private mountain photos), fb-070, fb-121 (screenshots), Christmas/Easter greetings, school event posters.

The four small bee macros from the old slider stay unused; his own Facebook macros are better and certainly his.

## Shot list for Jože (optional now; would lift the site further) (phone is fine: landscape + portrait of each, daylight, clean lens, no zoom, no flash)

1. **Jože at work**: opening a hive, holding a frame up to the light, with and without veil. Chest-up portrait looking at camera, by the apiary.
2. **Queens**: marked queen on comb (close), queen in a transport cage in his hand, queen cells on a bar, grafting larvae, mating nucs (plemenilčki) in a row, a box of cages ready for a customer.
3. **Apiaries**: each mobile apiary and the stationary one, wide shot with landscape, plus a straight-on shot of the painted hive fronts. Morning or evening light.
4. **Honey**: each of the 5 honeys in the current jar and label, alone on a plain light background (white paper by a window) and one group shot of all five. Honey running off a spoon or dipper against the light.
5. **Extraction**: uncapping a frame, honey flowing from the extractor tap, full comb close-up.
6. **Other products**: royal jelly container, pollen, propolis, wax items, gift packs, each on a plain background.
7. **Awards**: the medals/plaques and certificates together on a wall or table, plus the Znak kakovosti plaque and the Državni prvak certificate straight-on without glare.
8. **Location**: the house/yard entrance at Apače 300 as a visitor sees it from the road (so people recognise where to stop), any sign.
9. **Season detail**: bees at the hive entrance, bees on acacia / chestnut blossom in Haloze (only his own photos).
10. Optional: 10–20 s clips of bees at the entrance and honey pouring (for a muted loop).
