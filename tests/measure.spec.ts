import { test } from "@playwright/test";

// Prints page heights and alignment measurements. Run: npx playwright test tests/measure.spec.ts
const widths: readonly number[] = process.env.WIDTHS ? process.env.WIDTHS.split(",").map(Number) : [390, 768, 1280, 1440, 1920];

for (const width of widths) {
  test(`measure @${width}`, async ({ browser }) => {
    const mobile = width < 768;
    const context = await browser.newContext({ viewport: { width, height: mobile ? 780 : 900 }, hasTouch: mobile, isMobile: mobile, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const data = await page.evaluate(() => {
      const r = (el: Element | null) => (el ? el.getBoundingClientRect() : null);
      const cy = (b: DOMRect | null) => (b ? +(b.top + b.height / 2).toFixed(1) : null);
      const bar = r(document.querySelector("[data-bar]"));
      const logo = r(document.querySelector("[data-bar] [data-logo]"));
      const imgs = [...document.querySelectorAll("[data-bar] [data-logo-img]")].map((i) => i.getBoundingClientRect()).filter((b) => b.width > 0);
      const img = imgs[0] ?? null;
      const nav = r(document.querySelector("[data-bar] nav ul"));
      const link = r(document.querySelector("[data-bar] nav a"));
      const call = r(document.querySelector("[data-bar] [data-call]"));
      const lastEl = [...document.querySelectorAll("[data-bar] > div:last-child > *")].map((e) => e.getBoundingClientRect()).filter((b) => b.width > 0).pop() ?? null;
      const cTop = document.querySelector("[data-contact-top]");
      const cLeft = r(cTop?.children[0] ?? null);
      const cCard = r(cTop?.children[1] ?? null);
      const footCols = [...document.querySelectorAll("[data-foot-col]")].map((c) => {
        const b = c.getBoundingClientRect();
        const first = c.querySelector("[data-foot-first]")?.getBoundingClientRect();
        return { left: +b.left.toFixed(1), right: +b.right.toFixed(1), height: +b.height.toFixed(0), firstTop: first ? +(first.top + window.scrollY).toFixed(1) : null };
      });
      const edges = (sel: string) => {
        const b = r(document.querySelector(sel));
        return b ? { left: +b.left.toFixed(1), right: +(window.innerWidth - b.right).toFixed(1) } : null;
      };
      return {
        pageHeight: document.documentElement.scrollHeight,
        header: bar && {
          barCenterY: cy(bar),
          logoBoxCenterY: cy(logo),
          wordmarkCenterY: img ? +(img.top + img.height * 0.638).toFixed(1) : null,
          logoHeight: img ? +img.height.toFixed(1) : null,
          linkCenterY: cy(link),
          callCenterY: cy(call),
          leftGap: logo ? +(logo.left - bar.left).toFixed(1) : null,
          rightGap: lastEl ? +(bar.right - lastEl.right).toFixed(1) : null,
          navCenterX: nav ? +(nav.left + nav.width / 2).toFixed(1) : null,
          barCenterX: +(bar.left + bar.width / 2).toFixed(1),
        },
        footer: { cols: footCols, grid: edges("[data-foot-grid]"), rule: edges("[data-foot-rule]"), bottom: edges("[data-foot-bottom]") },
        contact: {
          top: edges("[data-contact-top]"),
          info: edges("[data-contact-info]"),
          leftCol: cLeft && { top: +(cLeft.top + window.scrollY).toFixed(0), bottom: +(cLeft.bottom + window.scrollY).toFixed(0) },
          card: cCard && { top: +(cCard.top + window.scrollY).toFixed(0), bottom: +(cCard.bottom + window.scrollY).toFixed(0) },
        },
      };
    });
    console.log(`MEASURE ${width} ${JSON.stringify(data)}`);
    await context.close();
  });
}
