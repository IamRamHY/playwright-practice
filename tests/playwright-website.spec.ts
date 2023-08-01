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

  test("verify switch to dark mode", async ({ page }) => {
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    const lightMode = await page.getByLabel(
      "Switch between dark and light mode (currently dark mode)"
    );
    await lightMode.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("open search modal", async ({ page }) => {
    await page.locator("button.DocSearch-Button").click();
    await expect(page.locator("div.DocSearch-Modal")).toBeVisible();
  });

  test("click get started", async ({ page }) => {
    // await page.getByText("Get started").click();
    await page.locator("a.getStarted_Sjon").click();
    await expect(page).toHaveURL("https://playwright.dev/docs/intro");
  });
});

test.describe("Getting Start page", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/docs/intro");
  });

  test("test get start dropdown", async ({ page }) => {
    const dropdownWrapper = await page.locator(
      "li.theme-doc-sidebar-item-category-level-1"
    );

    const dropdownBtn = await dropdownWrapper.getByRole("link", {
      name: "Getting Started",
    });
    const dropdownList = await dropdownWrapper.locator("ul.menu__list").nth(0);

    await expect(dropdownBtn).toBeVisible();
    await expect(dropdownBtn).toHaveAttribute("aria-expanded", "true");
    await dropdownBtn.click();
    await expect(dropdownBtn).toHaveAttribute("aria-expanded", "false");
    await expect(dropdownList).toHaveCSS("display", "none");
  });

  test("click next/back button", async ({ page }) => {
    const footerNavBtnS = await page.locator("nav.pagination-nav");
    await footerNavBtnS.getByText("Writing tests").click();
    await expect(page).toHaveURL("https://playwright.dev/docs/writing-tests");

    await footerNavBtnS.getByText("Installation").click();
    await expect(page).toHaveURL("https://playwright.dev/docs/intro");
  });
});
