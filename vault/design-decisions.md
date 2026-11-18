# Design brief and decisions

Status: **approved by Tadej 2026-11-14 and built.** Changes made during the build are logged at the bottom ("Build log"). Related: [[brand]], [[asset-log]], [[facts]], [[seo]], [[todo]].

## One-line concept

**"Iz Haloz."** A quiet, editorial site that looks like it was printed on wax paper and lit by honey: big warm serif type, real photos of his painted apiaries in the Haloze hills, and a single thread of honey that runs down the page as you scroll. The colour blocks of his own hive fronts are the folk motif.

## Reference analysis — dentistapalamos.com

What makes it feel expensive (and what we take):
- One strong claim in the hero with the place and a year in it ("Dentista a Palamós des de 1987"); the phone number sits inside the primary button. → Our hero does the same with Haloze and 1998.
- Cream paper background, deep ink colour, one warm accent. Very few colours. → Same discipline.
- Characterful serif display (Cormorant) over a plain sans (DM Sans); small tracked eyebrow labels above headings. → Same structure, different faces.
- A thin gold "kintsugi" line down the left edge that draws itself as you scroll, with nodes at each section. This is the signature. → Ours is a honey thread.
- Headings reveal line by line from a mask; numbers count up once; nothing else moves much. → Same restraint.
- Proof is physical: the brass plaque with the registration number, photographed. → Ours: certificates with gold foil, the trophy, the KIS tables.
- Static, small, fast (47 KB HTML). → Static export, JS only where it earns its place.

No other reference sites: Tadej found no good beekeeping site. This one should be the reference for others.

## Decisions

### D1 Typography (2026-11-14)
- **Display: Fraunces** (variable; opsz, wght, SOFT). Reason: an old-style soft serif with slightly swollen, "poured" terminals at display sizes, which suits honey and wax better than a sharp didone; the optical-size axis keeps it sturdy at 28 px on a phone and elegant at 160 px on desktop; full Slovenian č/š/ž support (latin-ext). Rejected: Cormorant Garamond (hairlines too thin for 50+ readers on phones), Playfair Display (overused, cold), Instrument Serif (one weight, the current default of AI landing pages).
- **Body/UI: Atkinson Hyperlegible Next** (variable). Reason: designed for low-vision legibility (distinct letterforms, open counters), which is a real benefit for the 50+ audience, and it is not the usual Inter/DM Sans look. Fallback if `next/font` lacks it in the installed Next version: Figtree.
- Open issue seen in the first screenshot: Atkinson Hyperlegible Next draws a **slashed zero**, so "041 579 827" reads as "Ø41". For the phone number this could confuse older users. During the build: try the font's alternate zero via `font-feature-settings`; if there is none, set phone numbers in Fraunces (tabular figures) or switch body to Figtree.
- Scale: body 18 px mobile / 19–20 px desktop, line-height 1.6; display clamp up to ~11vw on mobile heroes. Eyebrows: 13 px, uppercase, tracking 0.14em.

### D2 Colour (2026-11-14)
Named after the material they come from. Final values get a contrast check (WCAG AA) during the build.

| Token | Hex | Use |
|---|---|---|
| `vosek` (wax cream) | #F6EFDF | page background |
| `papir` (wax white) | #FFFBF2 | cards, form fields |
| `smola` (propolis brown-black) | #1F1711 | text, dark sections |
| `hoja` (fir green) | #20362B | secondary dark, queen section |
| `med` (amber) | #D4861B | primary accent, CTA |
| `kostanj` (deep amber) | #8C4A14 | accent text on cream (AA), hover |
| `akacija` (pale gold) | #F1CB6B | highlights on dark |
| Hive-front set | yellow #F2B90F, blue #2F6FB5, green #3E8E4B, red #C8402F, orange #E57A1C | only as the thin "panjske končnice" strip and tiny markers |

Honey-type colours (for the Med section) are sampled from his actual jars in fb-005: akacijev pale straw → cvetlični gold → lipov amber → kostanjev red-brown → gozdni/hojev near-black brown.

Avoided on purpose: pure yellow + black, gradients from purple/blue, glassmorphism.

### D3 Signature motifs (2026-11-14)
1. **Medena nit** — one SVG honey thread starting under the hero headline and running down the page, drawn by scroll (ScrollTrigger scrub), thickening into a drop at each section and "filling" a hexagon cell that holds the section number. With reduced motion it is simply drawn in full.
2. **Panjske končnice strip** — a 6 px band of five colour blocks taken from his real hive fronts (fb-222), used as section dividers and on the sticky call bar. This is the Slovenian folk reference, and it is his, not generic.
3. **Hexagon as structure, not decoration** — honey cards and the awards wall sit on a hex grid; photos use a soft hex-cornered mask; the home sales-corner photo already shows real hexagon shelves, so the motif is grounded.

### D4 Motion (2026-11-14)
- GSAP + ScrollTrigger + SplitText, Lenis for smooth scroll (desktop only; native scroll on touch). Custom eases only: UI `cubic-bezier(0.23, 1, 0.32, 1)` 160–220 ms; storytelling `expo.out`/custom 0.8–1.2 s.
- Per section: line-mask heading reveal, photo parallax ≤ 8%, counters once. One pinned sequence only: **Matice — "Od matičnika do pošte"** (4 steps with real photos: vzreja → oploditev → označevanje → pošiljanje).
- Buttons: press scale 0.97, magnetic pull on the two main CTAs behind `(hover: hover) and (pointer: fine)`. Custom cursor only as a small honey dot on desktop, off on touch.
- Nothing animates from scale(0); everything interruptible; `prefers-reduced-motion` gets the finished state with opacity fades only.

### D5 3D (2026-11-14)
One moment: **a small honeycomb slab whose cells fill with the six honey colours** as the Med section scrolls in (react-three-fiber, instanced hex cylinders, < 60 KB of our code, loaded with `next/dynamic` only when near the viewport and only if `(min-width: 768px)` and no reduced motion / save-data). Fallback and mobile default: the same composition as a static SVG. If it costs LCP/INP on test devices, it is cut and the SVG stays.

### D6 Photography treatment (2026-11-14)
- Hero: fb-181 (Haloze, storm light, tiny colourful apiary) under a bottom-up `smola` gradient so the 1440 px source holds on desktop; on ≥ 1536 px screens the photo is inset with a margin rather than stretched.
- Matice hero: fb-018 (1858 px macro of a marked queen), the sharpest file he has.
- Small old-site photos (500 px) are used only as small framed "prints" or not at all; the only photo of Jože (predstavitev.jpg, 500 px) appears at ≤ 320 px display width with a caption. A new portrait is the single most valuable photo he could add.
- Certificates: cropped, perspective-corrected, shown as tilted paper sheets on a dark wall; foil seals from fb-205/206 as a detail.
- No photos with children, no third-party graphics, nothing upscaled.

### D7 Logo (2026-11-14, Tadej: "naj bo identičen")
Use the existing logo unchanged. The only source is a 497×223 PNG with a baked shadow. I will produce a faithful vector trace (same bee, same hive, same wordmark shapes, no redesign), verify it against the PNG by overlay, and use the PNG as fallback if the trace is not indistinguishable. Shown at modest size in header and footer; the editorial type carries the premium feel around it.

### D8 Conversion (2026-11-14)
- Sticky bottom bar on mobile: "Pokličite Jožeta · 041 579 827" (tel link) + small "Matice" jump.
- Phone in the header on every page, in every section footer, and big in Kontakt.
- No prices on the site (not a shop; FB shows 12 €/900 g today but prices age). Copy says "Pokličite za ceno in razpoložljivost."
- Form: name, phone, message (+ honeypot). Posts to a Cloudflare Pages Function that sends through Resend from the client's domain. Until the domain is verified in Resend, the form is replaced by call + mailto buttons via one env flag.

### D9 Legal (2026-11-14)
- No analytics, no third-party embeds, fonts self-hosted through `next/font` → no cookies → no cookie banner.
- Map: static image link that opens Google Maps on tap (no iframe until tapped).
- Pages: `/zasebnost` (privacy: what the form collects, Resend and Cloudflare as processors, retention, contact) and `/pravno-obvestilo` (provider identification per ZEPT: name, address, e-mail, phone; tax number added if Jože is VAT-registered; photo copyright).
- Food-law: no health claims (see [[content-slovenian]]).

## Home page narrative (final order)

1. **Hero** — "Med in matice iz Haloz." Sub: beekeeping since 1998, own apiary since 2014. CTA: Pokličite Jožeta (tel) · Matice čebel.
2. **Trust strip** — čebelari od 1998 · državni prvak 2019 · več kot 15 zlatih medalj · 4,9 na Googlu (20 mnenj) · Apače pri Kidričevem.
3. **Matice** — mated, marked queens under KIS supervision; KIS test results 2023 and 2025; pinned 4-step story; next-day post across Slovenia or pickup; CTA call.
4. **Med** — six honeys on the hex grid with real jar colours; jar sizes; delivery around Ptuj and Maribor.
5. **Ostali pridelki** — matični mleček, cvetni prah, propolis, vosek, darilni paketi.
6. **O nas** — Jože's story in his voice, Haloze photos, the apiaries built at home.
7. **Priznanja** — timeline 2017–2026 with certificate photos; državni prvak and znak kakovosti as leads.
8. **Kje nas najdete** — sales corner at home (hex shelves), delivery, AGRA and Dobrote slovenskih kmetij.
9. **Pogosta vprašanja** — FAQ.
10. **Kontakt** — big phone, address, map link, form, "po dogovoru, pokličite prej". Facebook link. Useful links (ČZS, kranjska-cebela.si) small in the footer.

## Build log (2026-11-14)

- **D1 changed — fonts.** Body is Source Sans 3, not Atkinson Hyperlegible Next: Atkinson draws a slashed zero, which made "041 579 827" read as "Ø41". Both families are now **self-hosted subsets** (`src/fonts/`, scripts in `scripts/fonts/`): Basic Latin + Slovenian letters only, Fraunces with SOFT pinned to 70 (the soft look from the brief), italic pinned to optical size 110. Three files, 104 KB, all preloaded. Reason: via Google the fonts were 580 KB of preloads and pushed simulated LCP to 6.4 s. The Source Sans subset is renamed "Vidovic Sans" because "Source" is a reserved font name under the OFL.
- **D3 built.** Honey thread = `HoneyThread.tsx` (SVG stretched down the page, revealed by clip-path on scroll, drop positioned on the path). Section nodes = `.node`. Hive strip = `Strip` in `ui.tsx`. Hex masks = `.hex`, `.hex-tall`.
- **D4 built** in one client component, `Motion.tsx`: dynamic imports of gsap, ScrollTrigger, SplitText and (pointer: fine only) Lenis; line-mask headings (`data-split`), batched reveals (`data-reveal`), parallax (`data-parallax`), counters (`data-count`), magnetic CTAs (`data-magnetic`), cursor dot. The hero entrance is CSS only, so LCP does not wait for JS. The queen story uses CSS `position: sticky` with a ScrollTrigger-driven photo swap instead of a GSAP pin (no pin spacing, works without JS).
- **D5 built** with plain three.js (no react-three-fiber, saves a dependency): `HoneycombCanvas.tsx`, loaded only ≥ 768 px, motion allowed, no save-data, and only when near the viewport. Fallback is the SVG in `Honeycomb.tsx`, which is also what phones get.
- **D6.** Images are `<picture>` with AVIF + WebP from `scripts/images.mjs` (the `Photo` component), not `next/image`: static export has no runtime optimiser, and `<picture>` gives both formats with real `srcset`.
- **D7 changed — logo.** The original PNG is used as is (plus a WebP copy). No vector trace was made: at the sizes used (≤ 120 px wide in the header, 125 px in the footer) the 497 px source is sharp on 3× screens, and an auto-trace of a gradient cartoon would not have been identical. A clean vector from the original designer would still be worth getting for print.
- **CSS layering.** Custom classes live in `@layer components` so Tailwind utilities can override them (the first build had `.scroller` beating `md:grid`).
- **Reviews** section added at Tadej's request: three Google reviews (first name + initial) and the customer SMS Jože posted on Facebook, with the 4.9 / 20 rating linked to the Google profile.

### Measured (Lighthouse 12, mobile, simulated slow 4G, local static server over HTTP/1.1)

| Page | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| / | 91 | 100 | 100 | 100 | 3.4 s | 0 | 30 ms |
| /matice/ | 91 | 100 | 100 | 100 | 3.4 s | 0 | 0 ms |
| /med/ | 91 | 100 | 100 | 100 | 3.4 s | 0 | 0 ms |
| /kontakt/ | 99 | 100 | 100 | 100 | 2.2 s | 0.001 | 0 ms |

LCP on photo-hero pages is 3.4 s in this simulation, above the 2.5 s target; text-LCP pages meet it. Unthrottled LCP is ~0.13 s. Re-measure with PageSpeed Insights after deploy (HTTP/2 or 3 on Cloudflare removes the per-connection cost that dominates here). If still above 2.5 s: add a 640 px hero step, or drop the italic font preload.

## Session 2 (2026-11-14): customer-first restructure and polish

Requested by Tadej after reviewing the first build. Design language, palette, fonts and motion system unchanged.

### New home page order (replaces "Home page narrative" above)

1. **Hero, honey first** — "Domač med iz Haloz.", framed photo of the five jars (fb-005), call + "Poglejte med", one line "Ste čebelar? Matice čebel". The trust strip (15+ golds, državni prvak 2019, since 1998 with family helping, 4.9 on Google) is the bottom of the hero, not a section of its own.
2. **Med** (node 01) — the 3D honeycomb sits at the top of this section, directly under the hero, and doubles as the legend of an accessible tab picker for the six honeys (`HoneyPicker.tsx`: roving tabindex, arrow keys, Home/End; all panels are in the HTML). Then packaging + where to get it.
3. **Matice banner** — the single queen entry point in the flow.
4. **Ostali pridelki** (02) — one rail of five cards.
5. **Priznanja** (03) — four one-line leads, a fan of three certificates, and the Google rating with three reviews as the closing strip of the same "why trust us" section.
6. **O nas** (04) — one photo of Jože, two short paragraphs, one quote.
7. **Kontakt** (05).

Removed from home: the long queen section (lives on `/matice`), the separate trust strip, reviews and "Kje nas najdete" sections (merged into awards and contact), FAQ (moved to `/kontakt`; queen FAQ stays on `/matice`; FAQPage schema moved with them).

Home page height: 390 px wide 20556 → 9043 px (−56 %); 1280 px wide 15775 → 6343 px (−60 %). Target was −40 %.

### Where the queen entry sits, and why

Three doors, so a beekeeper finds queens within a second, without a queen section interrupting honey buyers:
- **Nav**: "Matice čebel" is the last item, the only one styled as a filled fir-green pill (green is the queen colour across the site).
- **Hero**: the line "Ste čebelar? Matice čebel" under the CTAs, above the fold on every screen.
- **Banner after Med** (between 3 and 4 of the brief): chosen over "right after the trust strip" because the hero promises honey and the next thing a honey buyer should see is the honey itself. After Med the page changes topic anyway, so a green card there reads as a clear fork, not an interruption.

### Hero photo

Tadej found the Haloze landscape soft. Cause: Facebook serves at most 1440–2048 px and the photo was stretched over 60 % of the screen. Now the hero photo is framed at ≤ 600 css px, where a 1456 px source is 2× sharp. Default is fb-005 (five jars). Other candidates: `vault/attachments/hero-kandidati.jpg`; swap by changing `heroPhoto.slug` in `sections/Hero.tsx`. Tadej to choose.

### Logo (supersedes D7 and the earlier build-log note)

`scripts/logo-clean.py` builds `assets/derived/logo-clean.png` (883×370) from the original PNG: the baked drop shadow and white glow are removed (wordmark: keep only ink pixels; bee: flood-fill from outside the closed outline), edges re-antialiased by working at 4× and saving at 2×, canvas trimmed. The drawing itself is untouched. Because the cleaned wordmark is plain dark ink on transparency, the logo only works on light plates (header pill, footer plate), which is how it is used.

Optical alignment: the bee's antennae make the image taller than the lettering, so the lettering sits at 63.8 % of the image height. `Logo.tsx` lifts the image by 13.8 % so the centre of the lettering is on the bar's centre line.

### Measured alignment (`tests/measure.spec.ts`, 1280 / 1440 / 1920)

- Header: bar centre y 50, wordmark centre 50, nav link centre 50, call button centre 50. Inner gap left 10 px, right 10 px. Nav centre x equals bar centre x (grid `1fr auto 1fr`). At 390 / 768: gaps 8 / 8, centres equal.
- Contact: left column and card share the same top and bottom (e.g. 5107 / 5493 at 1280); the info row has the same left and right edges as the row above.
- Footer: four columns of equal height (276 px), first lines on the same y, grid, rule and bottom bar all on the same left and right edges (92 / 92 at 1280, 172 / 172 at 1440, 412 / 412 at 1920).
- `.wrap` is now symmetric (28 px mobile, 72 px from 768). It was asymmetric before to leave room for the honey thread, which is why the footer rule and the content did not line up.

### Lighthouse after the restructure (mobile, simulated slow 4G, local HTTP/1.1)

| Page | Perf | A11y | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| / | 93 | 100 | 100 | 100 | 3.3 s | 0 |
| /matice/ | 93 | 100 | 100 | 100 | 3.2 s | 0 |
| /kontakt/ | 99 | 100 | 100 | 100 | 2.1 s | 0 |

No regression (was 91 / 91 / 99). LCP on photo pages is still above the 2.5 s target in this simulation; re-measure after deploy.

## Session 3 (2026-11-14): mobile UX fixes, navigation scroll bug, honey selector

Design language unchanged. Desktop is the same except: the hero seal, the honeycomb acting as a selector, a counter and two arrows in the honey block, and the scroll fix.

### Navigation scroll bug — real cause

`globals.css` had `html:not(.lenis) { scroll-behavior: smooth }`. Next.js 16 no longer switches smooth scrolling off during route changes (upgrade guide, "Scroll Behavior Override"), so its jump to the top became an animation from the old depth. `Motion.tsx` then re-initialised on the new route and `ScrollTrigger.refresh()` put the page back where the animation had got to. On phones (no Lenis) that happened every time; on desktop it could happen in the gap where Lenis had been destroyed and not yet recreated.

Fix:
- No global CSS smooth scrolling at all. Same-page hash links are scrolled in JS (`ScrollManager.tsx`; Lenis handles them when it runs).
- `ScrollManager.tsx`: on a route change that is not a popstate, `window.scrollTo(0, 0)` in a layout effect and reset Lenis (`immediate`). Popstate is left alone, so the browser and Next restore the position.
- Lenis is created once for the lifetime of the app (`window.__lenis`), not once per route.
- The mobile menu closes on any pathname change.
- Contract is tested in `tests/scroll.spec.ts` at 390×844 and 1440×900: menu navigation from the bottom of `/o-nas/` lands at 0, back restores within 12 px, forward works, the home link to `/priznanja/` lands at 0, the hash link stops under the header, `/matice/` (sticky story) restores on back.

A second bug surfaced while fixing this: wrapping rails in a new element made the page 946 px wide on a 390 px phone (a grid item could not shrink below its cards). Fixed with `min-width: 0` on `.rail-wrap`. The old overflow check compared `scrollWidth` with `innerWidth`, which is blind on mobile emulation because the layout viewport grows too; both `screens.spec.ts` and `scroll.spec.ts` now compare with the configured viewport width.

### Decisions

- **Hero title mention**: kept the seal, dropped the sentence. A small dark pill inside the photo ("Državni prvak 2019 · cvetlični med", 13 px, gold hex) reads as a mark of quality; a sentence in the lead read as bragging and pushed the CTA down. The trust strip had a third mention ("2019 državni prvak"), replaced by "6 vrst medu, kozarci 250, 450 in 900 g". Awards are still stated once in the strip ("15+ zlatih").
- **Sticky call bar removed** (component, markup and the body padding). The header with the number stays fixed. The footer keeps a small call button; the contact section keeps the big number because calling is that section's purpose.
- **Matice banner removed** from the home page. Queens: nav pill (desktop), highlighted item in the mobile menu, footer link, `/matice/`. The one-line "Ste čebelar? Matice čebel" under the hero buttons was kept so a beekeeper on a phone still sees a door without opening the menu. Remove it if Tadej wants only menu + footer.
- **Honeycomb is a selector** (`HoneyExplorer.tsx`): one state drives the honeycomb, the chips and the card. SVG hexes on phones, raycast picking on the 3D canvas on desktop, hover lifts a honey's cells, the selected honey stays raised and brighter; other hexes dim. Keyboard and screen readers get six labelled buttons with `aria-pressed`; their focus shows as a ring around the honeycomb. After choosing on the honeycomb the card is scrolled into view only if it is below ~62 % of the viewport, by a short distance, through Lenis when it runs.
- **Swipe affordances** (`Rail.tsx`, used for chips, products and reviews): next item peeks in, edge fade, scroll-snap, one nudge (56 px and back) the first time the row is seen, dots, arrows from 768 px, mouse drag. All of it only while the row actually overflows, so the desktop product grid is untouched. The honey card can be swiped left/right; the block shows "2 / 6" and has arrows on desktop.
- **Honey thread collisions**: rails used to bleed to both screen edges, so cards slid under the thread. Rails now start at the content edge (28 px) and bleed only to the right. Measured at 360 and 390: thread ends at x = 21, nothing in any section starts left of 28.
- **Awards page order**: one list, **newest first** (2026 → 2017), the same direction the old site used. Below 1024 px the three big awards sit inside their year (gold edge, 64 px numeral, card with the certificate); from 1024 px the card row above the list is shown instead and the list looks as before.
- **Hero photo**: final choice is the five jars (fb-005, `medovi-pet`). Tadej compared it with two other candidates through a temporary switch, which has been removed together with the two unused photos.

### Lighthouse (mobile, simulated slow 4G, local)

`/` 91 / 100 / 100 / 100, LCP 3.4 s, CLS 0. `/priznanja/` 89 / 100 / 100 / 100, LCP 3.7 s.

## Session 4 (2026-11-17): hero, motion, header trial

- **Hero rebuilt.** Photo without a frame: on phones full width on top, fading into the dark; on desktop it bleeds off the right edge (max 780 CSS px, 3:2 kept so no jar is cropped) and fades on the left, top and bottom. Removed: the "Državni prvak 2019" seal (Tadej: first thing seen was "2019", felt old; awards have their own section) and the line "Ste čebelar? Matice čebel" (nav pill is enough).
- **Headline** "Domač med, *pridelan z ljubeznijo.*" (echoes his motto "Kar delaš, delaj z ljubeznijo."). Lead names all three apiary places. Eyebrow adds "Dravsko polje" so nobody drives to Zgornje Apače; on phones only the place is shown.
- **Trust row:** number above label with a hairline on the left, instead of a big number beside a two-line label (looked misaligned).
- **Honey drip** over the bottom edge of the hero (CSS keyframes, transform/opacity only, static with reduced motion).
- **Honey thread lag fixed:** before, the line used `scrub: 0.5` (lagging behind Lenis) while the drop used raw progress, and the reveal animated `clip-path` on a page-tall SVG (repaint every frame). Now one ScrollTrigger drives both from the same progress, the reveal is two opposite translations (composite only), and the path's x is sampled once into a table.
- **Bees** (Motion.tsx, original SVG): one flies over the hero photo at most 5 times per visit, 14–22 s apart, only while the hero is in view; tapping the honeycomb lets one out of the tapped cell. MotionPath `autoRotate`, body flipped when heading left so it never flies upside down. None with reduced motion.
- **Header auto-hide is a trial** (`headerAutoHide` in `src/lib/site.ts`): hides after 140 px when scrolling down, returns on any scroll up, never while the menu is open or something in it has keyboard focus. This bends rule 7a (phone always in the header); one scroll up brings it back. Tadej decides after trying it.
- **English and German (2026-11-17).** Tadej: a quiet language option in the footer, not in the nav; foreign visitors are rare but it helps them read. Slovenian stays at the root with its URLs unchanged; `/en/` and `/de/` mirror every page with the Slovenian slugs (simpler, and the domain stays the identity). Each language has its own root layout so `<html lang>` and hreflang alternates are correct; switching language is a full page load. The phone shows as +386 41 579 827 on EN/DE (same number, international format). Customer reviews are translated and marked "translated from Slovenian". German nav says "Medaillen" for Priznanja ("Preise" also means prices, and the site has none). Place names stay Slovenian (Haloze, Prekmurje, Dravsko polje).

## Session 5 (2026-11-18): hero on wide screens, real honey, transitions, language by location

- **Hero photo inside the content grid.** On a 2560 px screen the old photo stuck to the right edge of the window (absolute, right: 0). It is now the second column of the wrap grid, max 720 px, 3:2.
- **Three hero looks to choose from** (Tadej was not sure about the fade): 1 honey poured over a rounded photo, 2 a slightly turned print on a honeycomb, 3 the fade (now contained). `data-hero` on the section, temporary switch `src/components/HeroSwitch.tsx` (preview only, marked `data-temp`). After the choice: delete the switch and the two unused CSS blocks.
- **Honey drips look real:** one SVG drawn 1:1 (`preserveAspectRatio slice`, never stretched), goo filter (blur + alpha threshold) melts band, drips and drops into one shape, specular lighting gives the shine. Separate SVGs per drip left visible seams. Used at the hero edge, over the hero photo (look 1) and under the hive strip at the top of the footer.
- **Fast-scroll bee:** scroll velocity over 3200 px/s brings a bee in from the right, it loops once and leaves; max 3 per page, 20 s apart. Bees are 46 px on desktop (were hard to see at 34 px).
- **Page transition:** internal links let honey run down over the page (0.42 s), the route changes underneath, the honey runs off (0.62 s). Not on language switches (full load), not with reduced motion. Safety reveal after 3 s.
- **Phones: shorter honey cards** in the selector: small jar beside the short card text; intro and facts only from `sm` up (they are on the honey page anyway).
- **Language by location** (Tadej): Slovenia → Slovenian, DE/AT/CH/LI → German, elsewhere English; a Slovenian or German browser abroad keeps its language; a footer choice always wins. Cloudflare middleware does it on the live site, a browser-language script on the preview. Crawlers are never redirected so the root stays Slovenian for Google. The privacy notice now names the `lang` cookie and the country-based first view.

### Session 5b (2026-11-18, Tadej's review)

- The five-jar photo stays (Tadej: "ta slika more ostat"); texts unchanged.
- Hero look chosen: rounded photo, honey over its top edge, a honeycomb of real cells behind it (`HeroComb.tsx`: honey-filled, wax-capped and empty cells in two clusters, fading out). The hero container is 1400 px wide from xl (to the header's edges), so the photo is ~660–720 px instead of ~540 px; it still never reaches the window edge on 2K. Two columns only from 1280 px; below that the photo is above the text.
- "Poglejte med" is back beside the call button (the narrower text column had pushed it under).
- Honey selector jars restored exactly as before (my phone layout had made them small); phones only show the short card text instead of the intro and facts.
- Bees were too frequent: one budget per visit, at least 45 s between ambient bees, max 6. New: a minute of scrolling without any click brings one.
- Preview opened English in Slovenia (English browser, GitHub Pages has no country): the fallback now uses the device time zone first (Europe/Ljubljana → Slovenian), no outside request.
- Transition was too fast and looked glitchy: slower (0.7 s in, 0.9 s out, power3.inOut), waits for fonts and the first photo, and the new page's own entrance animations wait until the honey runs off.
