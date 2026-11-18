import { expect, test } from "@playwright/test";

// headless Chromium says "HeadlessChrome", which the redirect treats as a bot on purpose
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

// Slovenian at the root, English and German under /en and /de; the footer switch keeps the current page.
test("each language has its own html lang and the footer switch keeps the page", async ({ page }) => {
  await page.goto("/med/kostanjev/");
  await expect(page.locator("html")).toHaveAttribute("lang", "sl");
  const sw = page.getByRole("navigation", { name: "Jezik" });
  await expect(sw.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en/med/kostanjev/");
  await expect(sw.getByRole("link", { name: "Deutsch" })).toHaveAttribute("href", "/de/med/kostanjev/");

  await sw.getByRole("link", { name: "English" }).click();
  await page.waitForURL("**/en/med/kostanjev/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toContainText("Chestnut");
  await expect(page.getByRole("navigation", { name: "Language" }).getByRole("link", { name: "Slovenščina" })).toHaveAttribute("href", "/med/kostanjev/");

  await page.goto("/de/");
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.getByRole("navigation", { name: "Hauptmenü" }).getByRole("link", { name: "Honig", exact: true })).toHaveAttribute("href", "/de/med/");
});

test("no Slovenian page links into another language except the switch", async ({ page }) => {
  await page.goto("/");
  const foreign = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLAnchorElement>("a[href^='/en/'], a[href^='/de/']")].filter((a) => !a.closest("footer nav")).length,
  );
  expect(foreign).toBe(0);
});

test.describe("first visit from a foreign browser (preview fallback, no middleware)", () => {
  test.use({ locale: "de-AT", timezoneId: "Europe/Vienna", userAgent: UA });

  test("German browser opens German, a saved Slovenian choice stays", async ({ page, context }) => {
    await page.goto("/matice/");
    await page.waitForURL("**/de/matice/");
    await expect(page.locator("html")).toHaveAttribute("lang", "de");

    await context.addCookies([{ name: "lang", value: "sl", url: "http://localhost:3210" }]);
    const fresh = await context.newPage();
    await fresh.goto("/matice/");
    await fresh.waitForTimeout(500);
    expect(new URL(fresh.url()).pathname).toBe("/matice/");
  });
});

test.describe("first visit from an English browser", () => {
  test.use({ locale: "en-GB", timezoneId: "Europe/London", userAgent: UA });
  test("opens English", async ({ page }) => {
    await page.goto("/");
    await page.waitForURL("**/en/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});

test.describe("English browser in Slovenia", () => {
  test.use({ locale: "en-US", timezoneId: "Europe/Ljubljana", userAgent: UA });
  test("stays Slovenian", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(600);
    expect(new URL(page.url()).pathname).toBe("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "sl");
  });
});
