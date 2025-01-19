import { test, expect } from "@playwright/test";

test.describe("Tasks", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3001");
  });

  test("Should have correct metadata", async ({ page }) => {
    await expect(page).toHaveTitle("Tyria Tracker");
  });

  test("NavBarAndNavigationLinksShouldExist", async ({ page }) => {
    const navbar = page.getByRole("complementary");
    await expect(navbar).toBeVisible();
    const navLink1 = page.getByTestId("navLink1");
    const navLink2 = page.getByTestId("navLink2");

    await expect(navLink1).toBeVisible();
    await expect(navLink2).toBeVisible();
  });

  test("ShouldNavigateToTradingPostPage", async ({ page }) => {
    const tpNavLink = page.getByTestId("navLink3");
    await tpNavLink.click();

    expect(page.url()).toContain("tradingPost");
  });
});

test.describe("Task Tables", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("localhost:3001");
  });

  test("HasAllTableLinks", async ({ page }) => {
    const raidLink = page.getByTestId("raidLink");
    const dungeonLink = page.getByTestId("dungeonLink");
    const bossLink = page.getByTestId("bossLink");
    const craftLink = page.getByTestId("craftLink");
    const vaultLink = page.getByTestId("vaultLink");

    await expect(raidLink).toBeVisible();
    await expect(dungeonLink).toBeVisible();
    await expect(bossLink).toBeVisible();
    await expect(craftLink).toBeVisible();
    await expect(vaultLink).toBeVisible();
  });

  test("ShouldDisplayCorrectTables", async ({ page }) => {
    const raidLink = page.getByTestId("raidLink");
    const dungeonLink = page.getByTestId("dungeonLink");
    const bossLink = page.getByTestId("bossLink");
    const craftLink = page.getByTestId("craftLink");
    const vaultLink = page.getByTestId("vaultLink");

    await raidLink.click();
    expect(page.url()).toContain("raid");
    await dungeonLink.click();
    expect(page.url()).toContain("dungeons");
    await bossLink.click();
    expect(page.url()).toContain("worldBosses");
    await craftLink.click();
    expect(page.url()).toContain("dailyCrafts");
    await vaultLink.click();
    expect(page.url()).toContain("wizardVault");
  });

  test("Raid Table should have correct number of items displayed", async ({
    page,
  }) => {
    await page.goto("localhost:3001/tasks/raid");
    const table = page.getByTestId("taskTable");

    await page.waitForResponse(
      (response) =>
        response.url().includes("/api/raids") && response.status() === 200,
    );

    const children = await table.locator("> *").count();

    expect(children).toBeGreaterThan(6);
  });

  test("Dungeon Table should have correct number of items displayed", async ({
    page,
  }) => {
    await page.goto("localhost:3001/tasks/dungeons");
    const table = page.getByTestId("taskTable");

    await page.waitForResponse(
      (response) =>
        response.url().includes("/api/dungeons") && response.status() === 200,
    );

    const children = await table.locator("> *").count();

    expect(children).toBeGreaterThan(7);
  });

  test("World boss table should have correct number of items displayed", async ({
    page,
  }) => {
    await page.goto("localhost:3001/tasks/worldBosses");
    const table = page.getByTestId("taskTable");

    await page.waitForResponse(
      (response) =>
        response.url().includes("/api/worldBosses") &&
        response.status() === 200,
    );

    const children = await table.locator("> *").first().locator("> *").count();

    expect(children).toBeGreaterThan(14);
  });

  test("Daily crafting table should have correct number of items displayed", async ({
    page,
  }) => {
    await page.goto("localhost:3001/tasks/dailyCrafts");
    const table = page.getByTestId("taskTable");

    await page.waitForResponse(
      (response) =>
        response.url().includes("/api/dailyCrafting") &&
        response.status() === 200,
    );

    const children = await table.locator("> *").first().locator("> *").count();

    expect(children).toBeGreaterThan(4);
  });

  test("Wizard vault table should have correct number of items displayed", async ({
    page,
  }) => {
    await page.goto("localhost:3001/tasks/wizardVault");
    const table = page.getByTestId("taskTable");

    await page.waitForResponse(
      (response) =>
        response.url().includes("/api/wizardVault") &&
        response.status() === 200,
    );

    const children = await table.locator("> *").first().locator("> *").count();

    expect(children).toBeGreaterThan(2);
  });
});
