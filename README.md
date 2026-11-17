# Čebelarstvo Vidovič – website

New website for **Čebelarstvo Vidovič**, a family beekeeping business from Apače near Lovrenc na Dravskem polju (Slovenia): honey, bee products and queen bees (matice). Replaces the old Joomla site at www.cebelarstvo-vidovic.si.
Design and development: [cus.si](https://cus.si).

Live preview: https://custadej.github.io/CebelarstvoVidovicStran/

The goal of the site is simple: visitors call the beekeeper. It is not a webshop – no cart, no checkout, the phone number is always in the header.

## Stack

| Part | Solution |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19, TypeScript strict), fully static export (`output: "export"`) |
| Styling | Tailwind CSS 4 with design tokens in `src/app/globals.css` |
| Fonts | Self-hosted Slovenian subsets of Fraunces and Source Sans 3 via `next/font/local` (104 KB total) |
| Animations | GSAP (ScrollTrigger, SplitText, Flip) + Lenis smooth scroll, all driven by data attributes in `src/components/Motion.tsx`; full static fallback for `prefers-reduced-motion` |
| 3D | three.js honeycomb, lazy-loaded below the fold with a static fallback |
| Images | Pre-built AVIF/WebP derivatives in several widths with blur placeholders (`npm run images`) |
| Contact form | Cloudflare Pages Function `functions/api/povprasevanje.ts` + Resend, honeypot field; hidden behind a flag until configured |
| SEO | Canonical URLs, `sitemap.xml`, `robots.txt`, Open Graph image, JSON-LD (LocalBusiness), 301 redirects from the old Joomla URLs (`public/_redirects`) |
| Tests | Playwright: scroll/navigation contract, honey selector, layout measurements, screenshots at 360–1536 px |

## Pages

Home · Med (honey, with a page per honey type) · Matice (queen bees) · Čebelji pridelki (bee products) · O nas · Priznanja (awards) · Kontakt · Privacy notice · Legal notice

## Getting started

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # static export to out/
```

Other commands:

```bash
npm run typecheck && npm run lint
npm run images      # rebuild public/img + src/data/images.json from assets/original/
npm run links       # check internal links in out/
npm run screens     # Playwright screenshots (ROUTES="/,/matice/" WIDTHS="390,1280" REDUCED=1)
npx playwright test tests/scroll.spec.ts tests/honey.spec.ts
```

## Environment variables

- `NEXT_PUBLIC_SITE_LIVE=1` – allow indexing. Without it every page is `noindex` and `robots.txt` disallows all. Set it only on the real domain.
- `NEXT_PUBLIC_FORM_ENABLED=1` – show the contact form. Without it the site shows e-mail and Facebook buttons instead.
- `BASE_PATH` – serve the export from a sub-path (used for the GitHub Pages preview).
- Form secrets (Cloudflare Pages): `RESEND_API_KEY`, `FORM_FROM`, `FORM_TO`.

## Structure

```
src/app/              routes (App Router)
src/components/       header, footer, mobile menu, motion, honey selector, sections
src/data/content.ts   all copy: honeys, products, awards, FAQ, reviews
src/lib/site.ts       name, address, phone, e-mail (single source)
functions/api/        Cloudflare Pages Function for the contact form
assets/original/      untouched source photos (old site, Facebook)
scripts/              image pipeline, font subsetting, logo cleanup, link check, Pages deploy
tests/                Playwright specs
vault/                project notes: facts with sources, assets, brand, design decisions, SEO
```

## Deployment

Production target is Cloudflare Pages on the client's account:

1. Create a Pages project connected to this repository. Build command `npm run build`, output directory `out`, Node 22.
2. Set `NEXT_PUBLIC_SITE_LIVE=1` (and `NEXT_PUBLIC_FORM_ENABLED=1` once the form works).
3. Add the domains `www.cebelarstvo-vidovic.si` and `cebelarstvo-vidovic.si` (redirect to www).
4. Form: verify the domain in Resend (SPF/DKIM), then set `RESEND_API_KEY`, `FORM_FROM`, `FORM_TO` as secrets.

Any other web server can serve `out/`; the redirects in `public/_redirects` then need to be rewritten (for nginx as `rewrite` rules) and the form needs its own endpoint at `/api/povprasevanje`.

## GitHub Pages preview

A static preview is published to the `gh-pages` branch with:

```bash
npm run deploy:pages
```

The preview is for demonstration only: it is `noindex`, has no contact form (e-mail and Facebook buttons instead) and no redirects from old URLs.

## Editing content

- Texts, honeys, awards, FAQ, reviews: `src/data/content.ts`.
- Address, phone, e-mail: `src/lib/site.ts` (the only place).
- New photos: add to `assets/original/`, list them in `scripts/images.mjs`, run `npm run images`.
