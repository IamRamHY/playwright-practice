import { test } from "@playwright/test";

test.describe("home page", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/");
  });
});
