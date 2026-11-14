# Čebelarstvo Vidovič — spletna stran

Statična stran (Next.js 16, izvoz v `out/`). Projektni spomin in vsa dejstva so v `vault/`, pravila za delo v `README.md`.

## Ukazi

```
npm install
npm run dev         # razvoj na http://localhost:3000
npm run images      # iz assets/original/ naredi public/img/ (AVIF + WebP) in src/data/images.json
npm run build       # statični izvoz v out/
npm run links       # preveri notranje povezave v out/
npm run screens     # Playwright posnetki (ROUTES="/,/matice/" WIDTHS="390,1280" REDUCED=1)
npm run typecheck && npm run lint
```

## Objava na Cloudflare Pages (račun stranke)

1. Na Cloudflare ustvarite Pages projekt in ga povežite z git repozitorijem (ali naložite mapo `out/`).
2. Build command: `npm run build` · Output directory: `out` · Node 22.
3. Okoljske spremenljivke (Production):
   - `NEXT_PUBLIC_SITE_LIVE=1` vklopi indeksiranje (brez nje ima stran `noindex` in `robots.txt` prepove vse). Nastavite šele, ko stran teče na pravi domeni.
   - `NEXT_PUBLIC_FORM_ENABLED=1` prikaže obrazec. Nastavite šele, ko deluje pošiljanje (spodaj).
4. Domena: v Pages dodajte `www.cebelarstvo-vidovic.si` in `cebelarstvo-vidovic.si` (preusmeritev na www). DNS mora biti na Cloudflare ali pa CNAME na `<projekt>.pages.dev`.
5. Stare povezave Joomla strani preusmeri `public/_redirects` (301).

### Obrazec (Resend)

Funkcija je v `functions/api/povprasevanje.ts` (Cloudflare Pages Function).

1. V Resend dodajte in potrdite domeno `cebelarstvo-vidovic.si` (DNS zapisi SPF/DKIM).
2. V Pages nastavite skrivnosti: `RESEND_API_KEY`, `FORM_FROM` (npr. `Spletna stran <obrazec@cebelarstvo-vidovic.si>`), `FORM_TO` (Jožetov e-naslov).
3. Nastavite `NEXT_PUBLIC_FORM_ENABLED=1` in ponovno zgradite. Brez tega stran namesto obrazca pokaže gumba za e-pošto in Facebook.

Proti neželeni pošti je vgrajeno skrito polje. Če bo spama veliko, dodajte Cloudflare Turnstile.

### Drug strežnik (nginx)

Mapo `out/` lahko streže katerikoli spletni strežnik. Preusmeritve iz `public/_redirects` je treba prepisati v nginx `rewrite` pravila, obrazec pa potrebuje svojo končno točko (npr. n8n webhook) na `/api/povprasevanje`.

## Urejanje vsebine

- Besedila, medovi, priznanja, vprašanja, mnenja: `src/data/content.ts`.
- Naslov, telefon, e-pošta: `src/lib/site.ts` (edino mesto).
- Nove fotografije: dodajte v `assets/original/`, vpišite v seznam v `scripts/images.mjs`, zaženite `npm run images`.
- Novo priznanje: dodajte v `awardYears` v `src/data/content.ts` (in fotografijo listine).
