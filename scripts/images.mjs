// Builds responsive AVIF/WebP derivatives + blur placeholders from assets/original into public/img.
// Run: node scripts/images.mjs   (originals are never modified)
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const FB = "assets/original/facebook";
const OLD = "assets/original/old-site";
const OUT = "public/img";
const STEPS = [480, 800, 1200, 1600, 2000];

// crop: fractions of the (auto-oriented) source: [left, top, width, height]
const sources = [
  ["haloze-cebelnjak", `${FB}/fb-181.jpg`],
  ["haloze-megla", `${FB}/fb-209.jpg`],
  ["haloze-jutro", `${FB}/fb-208.jpg`],
  ["haloze-jesen", `${FB}/fb-129.jpg`],
  ["haloze-sadovnjak", `${FB}/fb-225.jpg`],
  ["cebelnjak-fronta", `${FB}/fb-222.jpg`],
  ["cebelnjak-dolina", `${FB}/fb-229.jpg`],
  ["cebelnjak-kombi", `${FB}/fb-163.jpg`],
  ["cebelnjak-barvanje", `${FB}/fb-165.jpg`],
  ["matica-makro", `${FB}/fb-018.jpg`],
  ["matica-zelena", `${FB}/fb-120.jpg`],
  ["matica-zelena-pokoncno", `${FB}/fb-149.jpg`],
  ["maticniki", `${FB}/fb-017.jpg`],
  ["maticniki-v-panju", `${FB}/fb-085.jpg`],
  ["matica-v-kletko", `${FB}/fb-213.jpg`],
  ["matica-oznacevanje", `${FB}/fb-211.jpg`],
  ["matice-kletke", `${FB}/fb-039.jpg`],
  ["matica-kletka-roka", `${FB}/fb-040.jpg`],
  ["plemenilcki", `${FB}/fb-154.jpg`],
  ["plemenilcki-gozd", `${FB}/fb-042.jpg`],
  ["medovi-pet", `${FB}/fb-005.jpg`],
  ["medovi-pet-svetloba", `${FB}/fb-234.jpg`],
  ["kozarci-velikosti", `${FB}/fb-004.jpg`],
  ["tocenje-medu", `${FB}/fb-058.jpg`],
  ["med-na-kruhu", `${FB}/fb-105.jpg`],
  ["sat-med", `${FB}/fb-083.jpg`],
  ["cebela-regrat", `${FB}/fb-143.jpg`],
  ["cebela-travnik", `${FB}/fb-112.jpg`],
  ["cebela-lipa", `${FB}/fb-067.jpg`],
  ["kozarec-gozdni", `${FB}/fb-007.jpg`],
  ["kozarec-akacijev", `${FB}/fb-138.jpg`, [0.03, 0.02, 0.31, 0.96]],
  ["kozarec-kostanjev", `${FB}/fb-138.jpg`, [0.345, 0.02, 0.31, 0.96]],
  ["kozarec-cvetlicni", `${FB}/fb-138.jpg`, [0.67, 0.02, 0.31, 0.96]],
  ["kozarec-lipov", `${FB}/fb-005.jpg`, [0.475, 0.03, 0.2, 0.94]],
  ["kozarec-hojev", `${OLD}/hojev_rezan_skupaj.jpg`],
  ["maticni-mlecek", `${FB}/fb-001.jpg`],
  ["maticni-mlecek-kozarcki", `${FB}/fb-014.jpg`],
  ["cvetni-prah", `${OLD}/cvetni-prah-1.JPG`],
  ["propolis", `${OLD}/propolis.JPG`],
  ["vosek", `${FB}/fb-073.jpg`],
  ["pridelki-plastenke", `${FB}/fb-003.jpg`],
  ["darilo-dva", `${FB}/fb-097.jpg`],
  ["darila-jesen", `${FB}/fb-125.jpg`],
  ["koticek", `${FB}/fb-167.jpg`],
  ["koticek-pokoncno", `${FB}/fb-048.jpg`],
  ["joze-cebelnjak", `${OLD}/predstavitev.jpg`],
  ["priznanje-agra-2026-zlata", `${FB}/fb-019.jpg`],
  ["priznanje-agra-2026-srebrna", `${FB}/fb-020.jpg`],
  ["priznanja-2025", `${FB}/fb-033.jpg`],
  ["priznanja-agra-2024", `${FB}/fb-062.jpg`],
  ["priznanja-agra-2022", `${FB}/fb-137.jpg`],
  ["priznanje-drzavni-prvak", `${OLD}/IMG_20191206_223237_1.jpg`],
  ["trofeja-drzavni-prvak", `${FB}/fb-199.jpg`],
  ["znak-kakovosti-2019", `${OLD}/IMG_3890_b.jpg`],
  ["odlikovanje-jansa", `${OLD}/IMG_20190315_162758_a.jpg`],
  ["priznanje-agra-2020", `${OLD}/IMG_0901_a.JPG`],
  ["medalja-agra-2020", `${FB}/fb-205.jpg`],
  ["priznanje-dsk-2020", `${OLD}/IMG_0900_a.JPG`],
  ["priznanja-dsk-2019", `${OLD}/IMG_3882_b.jpg`],
  ["priznanje-agra-2018", `${OLD}/IMG_20190315_155602.jpg`],
  ["priznanja-dsk-2018", `${OLD}/IMG_20190315_162735_a.jpg`],
  ["priznanje-dsk-2017", `${OLD}/zlata-ptuj_1.jpg`],
  ["priznanje-agra-2017", `${OLD}/IMG_7087.jpg`],
];

await mkdir(OUT, { recursive: true });
const manifest = {};

for (const [slug, src, crop] of sources) {
  let img = sharp(src).rotate();
  const meta = await sharp(src).rotate().toBuffer({ resolveWithObject: true });
  let { width, height } = meta.info;
  if (crop) {
    const region = {
      left: Math.round(crop[0] * width),
      top: Math.round(crop[1] * height),
      width: Math.round(crop[2] * width),
      height: Math.round(crop[3] * height),
    };
    img = sharp(meta.data).extract(region);
    width = region.width;
    height = region.height;
  }
  const base = await img.toBuffer();
  const cap = slug.startsWith("priznanj") || slug.startsWith("odlikovanje") || slug.startsWith("znak") || slug.startsWith("medalja") ? 1200 : 2000;
  const widths = [...new Set([...STEPS.filter((w) => w < width && w <= cap), Math.min(width, cap)])].sort((a, b) => a - b);
  for (const w of widths) {
    const resized = sharp(base).resize({ width: w, withoutEnlargement: true });
    await resized.clone().avif({ quality: 52, effort: 5 }).toFile(path.join(OUT, `${slug}-${w}.avif`));
    await resized.clone().webp({ quality: 74 }).toFile(path.join(OUT, `${slug}-${w}.webp`));
  }
  const blur = await sharp(base).resize({ width: 20 }).webp({ quality: 40 }).toBuffer();
  manifest[slug] = {
    width: Math.min(width, cap),
    height: Math.round((Math.min(width, cap) / width) * height),
    widths,
    blur: `data:image/webp;base64,${blur.toString("base64")}`,
  };
  console.log(slug, `${width}x${height}`, widths.join(","));
}

await writeFile("src/data/images.json", `${JSON.stringify(manifest, null, 1)}\n`);

// Logo: cleaned master (shadow removed, trimmed) from scripts/logo-clean.py. Artwork itself is unchanged.
const LOGO = "assets/derived/logo-clean.png";
await sharp(LOGO).png({ compressionLevel: 9 }).toFile(`${OUT}/logo.png`);
await sharp(LOGO).webp({ quality: 92, alphaQuality: 100, effort: 6 }).toFile(`${OUT}/logo.webp`);
await sharp(LOGO).resize({ width: 360 }).webp({ quality: 92, alphaQuality: 100, effort: 6 }).toFile(`${OUT}/logo-360.webp`);
const logoMeta = await sharp(LOGO).metadata();
// wordmarkCenter: vertical centre of the "Čebelarstvo Vidovič" lettering as a fraction of the image height
// (measured from the cleaned master). The header uses it to line the lettering up with the nav links.
await writeFile("src/data/logo.json", `${JSON.stringify({ width: logoMeta.width, height: logoMeta.height, wordmarkCenter: 0.638 }, null, 1)}\n`);
const beeBuf = await sharp(LOGO).extract({ left: 0, top: 0, width: 262, height: 370 }).resize({ height: 200 }).png().toBuffer();
const square = (size, bg) =>
  sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: beeBuf, gravity: "center" }])
    .png();
await sharp(await square(240, { r: 0, g: 0, b: 0, alpha: 0 }).toBuffer()).resize(96).png().toFile("src/app/icon.png");
await sharp(await square(240, { r: 246, g: 239, b: 223, alpha: 1 }).toBuffer()).resize(180).png().toFile("src/app/apple-icon.png");

// Open Graph image (1200x630): hero photo, dark gradient, name and line
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1f1711" stop-opacity="0.94"/><stop offset="0.55" stop-color="#1f1711" stop-opacity="0.55"/><stop offset="1" stop-color="#1f1711" stop-opacity="0.05"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="72" y="150" font-family="Georgia, serif" font-size="30" letter-spacing="5" fill="#f1cb6b">ČEBELARSTVO VIDOVIČ</text>
  <text x="72" y="290" font-family="Georgia, serif" font-size="104" fill="#f6efdf">Med in matice</text>
  <text x="72" y="400" font-family="Georgia, serif" font-style="italic" font-size="104" fill="#f1cb6b">iz Haloz.</text>
  <text x="72" y="520" font-family="Georgia, serif" font-size="40" fill="#f6efdf">Apače pri Kidričevem · 041 579 827</text>
  <rect x="0" y="618" width="240" height="12" fill="#f2b90f"/><rect x="240" y="618" width="240" height="12" fill="#2f6fb5"/><rect x="480" y="618" width="240" height="12" fill="#3e8e4b"/><rect x="720" y="618" width="240" height="12" fill="#c8402f"/><rect x="960" y="618" width="240" height="12" fill="#e57a1c"/>
</svg>`;
await sharp(`${FB}/fb-181.jpg`)
  .resize(1200, 630, { fit: "cover", position: "south" })
  .composite([{ input: Buffer.from(ogSvg) }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile("public/og.jpg");
console.log("done", Object.keys(manifest).length, "images");
