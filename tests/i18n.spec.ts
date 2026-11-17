import { expect, test } from "@playwright/test";

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
