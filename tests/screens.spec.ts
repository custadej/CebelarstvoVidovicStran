import { test } from "@playwright/test";

// Usage: npm run build && npm run screens
// Narrow a run with env vars: ROUTES="/,/matice/" WIDTHS="390,1280" npm run screens
const allRoutes = ["/", "/matice/", "/med/", "/med/cvetlicni/", "/cebelji-pridelki/", "/o-nas/", "/priznanja/", "/kontakt/", "/zasebnost/"];
const routes: readonly string[] = process.env.ROUTES ? process.env.ROUTES.split(",") : allRoutes;
const widths: readonly number[] = process.env.WIDTHS ? process.env.WIDTHS.split(",").map(Number) : [390, 768, 1280, 1440, 1920];
const reduced = process.env.REDUCED === "1";

for (const route of routes) {
  for (const width of widths) {
    test(`screens ${route} @${width}${reduced ? " reduced" : ""}`, async ({ browser }) => {
      test.setTimeout(120_000);
      const mobile = width < 768;
      const height = mobile ? 780 : 900;
      const context = await browser.newContext({
        viewport: { width, height },
        hasTouch: mobile,
        isMobile: mobile,
        reducedMotion: reduced ? "reduce" : "no-preference",
      });
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1600);
      const name = (route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-|-$/g, "")) + (reduced ? "-reduced" : "");
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      let i = 0;
      for (let y = 0; y < total; y += height) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.waitForTimeout(650);
        await page.screenshot({ path: `screenshots/${name}-${width}-${String(i).padStart(2, "0")}.png` });
        i++;
      }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 1) errors.push(`horizontal overflow: ${overflow}px`);
      if (errors.length) console.log(`[${route} @${width}]`, errors.join(" | "));
      await context.close();
    });
  }
}
