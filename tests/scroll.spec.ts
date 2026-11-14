import { expect, test, type Page } from "@playwright/test";

// Navigation scroll contract:
//  - link / menu navigation to a new route lands at the very top,
//  - back / forward restores the previous scroll position,
//  - hash links scroll to the section below the fixed header.
const viewports = [
  { name: "mobile", width: 390, height: 844, mobile: true },
  { name: "desktop", width: 1440, height: 900, mobile: false },
] as const;

const scrollY = (page: Page) => page.evaluate(() => Math.round(window.scrollY));

async function settle(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(900);
  // guard: a horizontal overflow silently widens the mobile layout viewport and breaks everything else
  const vw = page.viewportSize()!.width;
  expect(await page.evaluate(() => document.documentElement.scrollWidth), "no horizontal overflow").toBeLessThanOrEqual(vw + 1);
}

async function scrollToBottom(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(700);
  // one more time in case lazy content grew the page
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(700);
}

for (const vp of viewports) {
  test.describe(`${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height }, hasTouch: vp.mobile, isMobile: vp.mobile });

    test("menu navigation lands at the top, back restores the position", async ({ page }) => {
      await page.goto("/o-nas/");
      await settle(page);
      await scrollToBottom(page);
      const before = await scrollY(page);
      expect(before).toBeGreaterThan(800);

      if (vp.mobile) {
        await page.getByRole("button", { name: "Odpri meni" }).click();
        await page.locator("#mobilni-meni").getByRole("link", { name: "Med", exact: true }).click();
        await expect(page.locator("#mobilni-meni")).toBeHidden();
      } else {
        await page.getByRole("navigation", { name: "Glavni meni" }).getByRole("link", { name: "Med", exact: true }).click();
      }
      await page.waitForURL("**/med/");
      await page.waitForTimeout(150);
      expect(await scrollY(page), "right after navigation").toBe(0);
      await settle(page);
      expect(await scrollY(page), "after the page settled").toBe(0);

      await page.goBack();
      await page.waitForURL("**/o-nas/");
      await settle(page);
      expect(Math.abs((await scrollY(page)) - before), "restored position after back").toBeLessThanOrEqual(12);

      await page.goForward();
      await page.waitForURL("**/med/");
      await settle(page);
      expect(await scrollY(page), "forward restores the top of /med/").toBeLessThanOrEqual(12);
    });

    test("link from the middle of the home page to /priznanja/ lands at the top", async ({ page }) => {
      await page.goto("/");
      await settle(page);
      const link = page.getByRole("link", { name: "Vsa priznanja po letih" });
      await link.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      expect(await scrollY(page)).toBeGreaterThan(500);
      await link.click();
      await page.waitForURL("**/priznanja/");
      await page.waitForTimeout(150);
      expect(await scrollY(page), "right after navigation").toBe(0);
      await settle(page);
      expect(await scrollY(page), "after the page settled").toBe(0);
      const h1 = await page.locator("h1").boundingBox();
      expect(h1 && h1.y).toBeGreaterThan(0);
    });

    test("hash link scrolls to the section below the header", async ({ page }) => {
      await page.goto("/");
      await settle(page);
      await page.getByRole("link", { name: "Poglejte med" }).click();
      await page.waitForTimeout(1600);
      const top = await page.evaluate(() => document.querySelector("#med")!.getBoundingClientRect().top);
      expect(top).toBeGreaterThanOrEqual(0);
      expect(top).toBeLessThan(140);
    });

    test("long page with sticky story (/matice/) restores on back", async ({ page }) => {
      await page.goto("/matice/");
      await settle(page);
      await page.evaluate(() => window.scrollTo(0, Math.round(document.documentElement.scrollHeight * 0.55)));
      await page.waitForTimeout(900);
      const before = await scrollY(page);
      await page.locator("footer").getByRole("link", { name: "Priznanja" }).evaluate((a: HTMLAnchorElement) => a.click());
      await page.waitForURL("**/priznanja/");
      await settle(page);
      expect(await scrollY(page)).toBe(0);
      await page.goBack();
      await page.waitForURL("**/matice/");
      await settle(page);
      expect(Math.abs((await scrollY(page)) - before)).toBeLessThanOrEqual(12);
    });
  });
}
