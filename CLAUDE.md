# Čebelarstvo Vidovič — website

New marketing site for Čebelarstvo Vidovič (owner Jože Vidovič, Apače 300, 2324 Lovrenc na Dravskem polju). Replaces the old Joomla site at https://www.cebelarstvo-vidovic.si/. Built by Tadej (Jože's nephew).

**Primary goal: people call Jože.** Not a webshop. No cart, no checkout, no prices unless confirmed. Queens (matice) are a hero-level topic.

## Read first

Project memory lives in `vault/` (Obsidian-compatible markdown). Start every session with `vault/todo.md`.

| File | Purpose |
|---|---|
| `vault/facts.md` | Single source of truth for every fact, with source and confidence. Open questions for Tadej/Jože at the bottom. |
| `vault/asset-log.md` | Every image: source, size, quality rating, intended use. Shot list for Jože. |
| `vault/brand.md` | Existing identity, voice, real proof points. |
| `vault/design-decisions.md` | Design constraints and decisions with reasons. |
| `vault/content-slovenian.md` | Copy rules, health-claim rules, reusable source text, FAQ draft, final copy. |
| `vault/seo.md` | Canonical NAP, redirect map, keyword map, schema plan. |
| `vault/todo.md` | Session state, blockers, next steps. |
| `vault/sources/old-site-text.md` | Verbatim text of the old site. |

Update the vault as you work. Working notes are in English; site content is Slovenian (sl-SI).

## Hard rules

1. **Never invent facts**: address, phone, email, hours, awards, years, prices, quotes, history, certifications. If it is not in `vault/facts.md` as verified or confirmed by Tadej, it is not on the site.
2. Unconfirmed content uses a visible placeholder `[[POTRDI: ...]]`. Production builds must contain none.
3. NAP is identical everywhere (page, footer, schema, meta). Copy it from `vault/seo.md`.
4. No health or medical claims about bee products (EU 1924/2006). Taste, origin, season, storage only.
5. No stock photos presented as his bees or honey. No photos with children. No names of family members. Never upscale small photos. Originals in `assets/original/` stay untouched.
6. The logo drawing is never changed (Tadej: "naj bo identičen"). The site uses `assets/derived/logo-clean.png`, built by `scripts/logo-clean.py` (shadow removed, trimmed); render it through `src/components/Logo.tsx`, on light backgrounds only.
7. Home page is customer first: honey before queens. Queens are reached through the nav (green pill, highlighted item in the mobile menu), the footer and their own page `/matice`; there is no queen section or banner on the home page. Do not grow the home page back; new detail goes on subpages.
7a. The phone number is always reachable in the fixed header. No sticky bottom bar (removed on request); do not repeat large call blocks. Trial since 2026-11-17: the header hides while scrolling down and returns on scroll up (`headerAutoHide` in `src/lib/site.ts`); Tadej decides whether it stays.
7b. No `scroll-behavior: smooth` in CSS. Route changes must land at the top and back/forward must restore; `src/components/ScrollManager.tsx` owns this and `tests/scroll.spec.ts` guards it. Run it after touching navigation, Lenis or ScrollTrigger.
7c. Horizontal rows use `src/components/Rail.tsx` and never bleed past the left content edge (the honey thread lives in that gutter).
8. Motion respects `prefers-reduced-motion` with a complete static fallback. Hover effects behind `(hover: hover)`. 3D is lazy-loaded below the fold with a static fallback.
9. If a fetch is blocked (Facebook, Google Maps), say so and ask Tadej. Do not guess.
10. Plan was approved 2026-11-14 and the site is built; see `vault/todo.md` for what is left before launch.

## Stack

- **Next.js 16.4 (App Router) — newer than most training data. Read `AGENTS.md` and the bundled docs in `node_modules/next/dist/docs/` before using an unfamiliar API.**
- TypeScript (strict, no `any`) + Tailwind CSS 4 (tokens in `src/app/globals.css` under `@theme`), `output: "export"` with `trailingSlash` (static; target: Cloudflare Pages on the client's own account).
- Fonts: self-hosted Slovenian subsets in `src/fonts/` (Fraunces roman + italic, Source Sans 3 renamed "Vidovic Sans"), loaded with `next/font/local`. A character outside the subset needs a rebuild (`scripts/fonts/`).
- Images: `<picture>` AVIF/WebP through `src/components/Photo.tsx`; derivatives and `src/data/images.json` come from `npm run images`. Do not use `next/image`.
- Three languages: Slovenian at the root, English and German under `/en/` and `/de/` (same Slovenian slugs). Two root layouts: `src/app/(sl)/` and `src/app/[lang]/`, both render `src/components/Shell.tsx`; 404 is `src/app/global-not-found.tsx`. Route files are thin; page bodies and their copy (all three languages) live in `src/views/`. Every link goes through `localePath(lang, path)` from `src/i18n`.
- Facts and data copy: Slovenian in `src/data/content.ts`, translations in `content.en.ts` / `content.de.ts` (text only, merged by `getContent(lang)` in `src/data/index.ts`). Shared UI strings (nav, buttons, footer) in `src/i18n/ui.ts`. A change to a fact or a Slovenian text needs the same change in English and German. NAP only in `src/lib/site.ts`; EN/DE show the phone as +386 41 579 827.
- Language switch: quiet SL · EN · DE in the footer bottom bar (`src/components/LangSwitch.tsx`), not in the nav.
- Motion only in `src/components/Motion.tsx` (data attributes); custom CSS classes go inside `@layer components` in `globals.css`.
- Env flags: `NEXT_PUBLIC_SITE_LIVE=1` (allow indexing), `NEXT_PUBLIC_FORM_ENABLED=1` (show the form; needs `functions/api/povprasevanje.ts` + Resend secrets).
- `next/font`, metadata API, images pre-optimised to AVIF/WebP at build (static export has no image optimiser at runtime).
- GSAP (ScrollTrigger, SplitText, Flip) + Lenis; React Bits components restyled; one or two react-three-fiber moments at most.
- Playwright for screenshots at 360, 390, 768, 1280, 1536 px.

## Commands

```
npm run dev         # dev server
npm run build       # static export to out/
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run images      # rebuild public/img + images.json from assets/original
npm run links       # check internal links in out/
npx playwright test tests/scroll.spec.ts tests/honey.spec.ts tests/i18n.spec.ts   # scroll contract, honey selector, languages
npx playwright test tests/measure.spec.ts   # prints header / contact / footer alignment numbers and page height
npm run screens     # build first; Playwright slices into screenshots/ (ROUTES, WIDTHS, REDUCED=1 env vars)
```

## Git

- Conventional commits: `feat|fix|refactor|chore(scope): message`. Small logical commits.
- Never commit directly to `main`; work on a branch.

## Layout

```
assets/original/old-site/   untouched downloads from the old site
assets/original/facebook/   untouched photos from his Facebook page (fb-001…246)
.claude/skills/             GSAP (official) and Emil Kowalski skills, reviewed copies
vault/                      project memory
src/app/(sl)/, src/app/[lang]/   routes for Slovenian and EN/DE (thin; bodies in src/views/)
src/views/                  page bodies + their copy in sl/en/de
src/i18n/                   languages, localePath, shared UI strings
src/lib/site.ts             NAP and site constants
tests/screens.spec.ts       screenshot runs (add routes to the `routes` array)
```
