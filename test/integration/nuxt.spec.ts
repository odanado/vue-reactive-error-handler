import playwright from "playwright";
import express from "express";
import { Server } from "http";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { loadNuxt } = require("nuxt");

import { getTextContent } from "../utils/get-text-content";

const browsers = ["chromium", "firefox", "webkit"] as const;

describe.each(browsers)("nuxt %s", browserName => {
  let server: Server;
  let browser: playwright.Browser;
  let page: playwright.Page;

  beforeAll(async () => {
    jest.setTimeout(10000);
    const app = express();

    const nuxt = await loadNuxt({
      for: "start",
      rootDir: "./test/fixture/nuxt"
    });
    app.use(nuxt.render);

    server = app.listen(3000);

    browser = await playwright[browserName].launch();

    const context = await browser.newContext();
    page = await context.newPage();

    await page.goto("localhost:3000");
  });
  afterAll(async () => {
    server.close();
    await browser.close();
  });

  beforeEach(async () => {
    await page.reload();
    await page.waitForSelector("[data-testid='error']", { state: "hidden" });
  });

  describe.each([
    ["for-vue", "occurred vue error"],
    ["for-unhandledrejection", "occurred unhandledrejection"],
    ["for-error", "occurred error"]
  ])("testid %s", (testid, expected) => {
    it("should be update state", async () => {
      await expect(getTextContent(page, "[data-testid='error']")).resolves.toBe(
        ""
      );

      await page.click(`[data-testid='${testid}']`);

      await expect(getTextContent(page, "[data-testid='error']")).resolves.toBe(
        expected
      );
    });
  });
});
