import { test } from "@playwright/test";

const widths = [360, 390, 768, 1280, 1536] as const;
const routes: readonly string[] = ["/"];

for (const route of routes) {
  for (const width of widths) {
    test(`screenshot ${route} @${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 768 ? 780 : 900 });
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      const name = route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-|-$/g, "");
      await page.screenshot({ path: `screenshots/${name}-${width}.png`, fullPage: true });
    });
  }
}
