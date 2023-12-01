import { test as setup } from "@playwright/test";

const authFile = "./e2e/auth/auth.json";

setup("get auth token", async ({ page }) => {
  await page.goto("https://www.github.com/login");
  await page.fill("#login_field", "username");
  await page.fill("#password", "password");

  await page.locator('input[type="submit"]').click();

  await page.waitForURL("https://github.com/");

  await page.context().storageState({ path: "./e2e/auth/auth.json" });
});
