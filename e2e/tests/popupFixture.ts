import { test as base, chromium, type BrowserContext } from "@playwright/test";
import path from "path";
const auth = require("../auth/auth.json");

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, "../../dist");
    const context = await chromium.launchPersistentContext("../auth", {
      headless: false,
      args: [
        `--headless=new`,
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    // @https://github.com/microsoft/playwright/issues/14949
    // It seems that the PersistentContext in this context lacks support for storageState
    // Alternatively, it's possible to add the cookies to the context by `addCookies`.
    context.addCookies(auth["cookies"]);

    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    let [background] = context.serviceWorkers();
    if (!background) background = await context.waitForEvent("serviceworker");

    const extensionId = background.url().split("/")[2];
    await use(extensionId);
  },
});

export const expect = test.expect;
