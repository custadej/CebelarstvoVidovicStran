import { expect, test } from "@playwright/test";

// The honeycomb, the chips and the card are three views of one choice.
const viewports = [
  { name: "mobile-360", width: 360, height: 780, mobile: true },
  { name: "mobile-390", width: 390, height: 844, mobile: true },
  { name: "desktop-1440", width: 1440, height: 900, mobile: false },
] as const;

for (const vp of viewports) {
  test.describe(vp.name, () => {
    test.use({ viewport: { width: vp.width, height: vp.height }, hasTouch: vp.mobile, isMobile: vp.mobile });

    test("selecting on the honeycomb updates chips, counter and card", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await page.locator("#med").scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);

      const selected = page.getByRole("tab", { selected: true });
      await expect(selected).toHaveText("Cvetlični");

      // keyboard / screen reader path: the labelled buttons
      const key = page.getByRole("group", { name: "Izberite med po barvi" }).getByRole("button", { name: "Kostanjev med" });
      await key.focus();
      await page.keyboard.press("Enter");
      await expect(selected).toHaveText("Kostanjev");
      await expect(key).toHaveAttribute("aria-pressed", "true");
      await expect(page.getByRole("tabpanel")).toContainText("Kostanjev med");
      await expect(page.locator("#med")).toContainText("4 / 6");

      // pointer path: click the honeycomb itself, far left = the lightest honey
      const comb = page.locator(".comb");
      const box = (await comb.boundingBox())!;
      const ready = await page.locator(".honeycomb-canvas[data-ready]").count();
      if (ready) {
        await page.mouse.click(box.x + box.width * 0.5 - box.height * 1.15, box.y + box.height * 0.55);
      } else {
        await page.locator(".comb-hex").first().click();
      }
      await expect(selected).toHaveText("Akacijev");
      await expect(page.getByRole("tabpanel")).toContainText("Akacijev med");
      await expect(page.locator("#med")).toContainText("1 / 6");

      // the card is on screen after choosing on the honeycomb
      await page.waitForTimeout(900);
      const panel = (await page.getByRole("tabpanel").boundingBox())!;
      expect(panel.y).toBeLessThan(vp.height * 0.7);
      await page.screenshot({ path: `screenshots/honey-selected-${vp.width}.png` });

      // chips: arrow keys move the selection
      await selected.focus();
      await page.keyboard.press("ArrowRight");
      await expect(selected).toHaveText("Cvetlični");

      if (vp.mobile) {
        // swipe the card to the left = next honey
        const p = (await page.getByRole("tabpanel").boundingBox())!;
        await page.getByRole("tabpanel").dispatchEvent("touchstart", { touches: [{ identifier: 1, clientX: p.x + p.width * 0.8, clientY: p.y + 80 }], changedTouches: [{ identifier: 1, clientX: p.x + p.width * 0.8, clientY: p.y + 80 }] });
        await page.getByRole("tabpanel").dispatchEvent("touchend", { touches: [], changedTouches: [{ identifier: 1, clientX: p.x + p.width * 0.2, clientY: p.y + 84 }] });
        await expect(selected).toHaveText("Lipov");
        // the chip rail overflows on phones and shows that with a fade
        await expect(page.getByRole("tablist")).toHaveAttribute("data-fade", /end|both|start/);
      } else {
        await page.getByRole("button", { name: "Naslednja vrsta medu" }).click();
        await expect(selected).toHaveText("Lipov");
      }
    });

    test("home page has no sticky call bar, no queen banner, no dated title in the hero", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await expect(page.getByText("Ste čebelar?")).toHaveCount(0);
      const hero = page.locator("main section").first();
      // the first screen should not open with an old year (Tadej, 2026-11-17); awards have their own section
      expect(await hero.innerText()).not.toMatch(/ržavni prvak|2019/);
      const fixedBottom = await page.evaluate(() =>
        [...document.querySelectorAll("body *")].filter((el) => {
          const s = getComputedStyle(el);
          // [data-temp]: the hero photo switch, only on the preview while a look is chosen
          return s.position === "fixed" && !el.closest("[data-temp]") && el.getBoundingClientRect().top > innerHeight / 2 && el.getBoundingClientRect().height > 20;
        }).length,
      );
      expect(fixedBottom).toBe(0);
      expect(await page.evaluate(() => getComputedStyle(document.body).paddingBottom)).toBe("0px");
      await expect(page.locator("footer").getByRole("link", { name: "Matice čebel" })).toHaveCount(1);
    });
  });
}
