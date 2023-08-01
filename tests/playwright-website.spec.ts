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
});
