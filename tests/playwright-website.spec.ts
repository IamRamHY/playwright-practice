import { test, expect } from "@playwright/test";

test.describe("home page", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/");
  });

  test("Verify for page title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Fast and reliable end-to-end testing for modern web apps | Playwright"
    );
  });

  test("verify logo", async ({ page }) => {
    await expect(page.getByAltText("logo")).toBeVisible();
  });

  test("verify left nav items", async ({ page }) => {
    await expect(page.getByAltText("logo")).toBeVisible();
    const links = await page.locator("div.navbar__items").getByRole("link");
    await expect(await links.allInnerTexts()).toContain("Docs");
    await expect(await links.allInnerTexts()).toContain("API");
    await expect(await links.allInnerTexts()).toContain("Community");
  });

  test("verify right nav items", async ({ page }) => {
    const links = await page
      .locator("div.navbar__items--right")
      .getByRole("link");
    await expect(links).toHaveCount(2);
    await expect(await links.first()).toHaveAttribute(
      "href",
      "https://github.com/microsoft/playwright"
    );
    await expect(await links.last()).toHaveAttribute(
      "href",
      "https://aka.ms/playwright/discord"
    );
  });
});
