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
});
