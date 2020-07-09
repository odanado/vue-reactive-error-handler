import path from "path";
import playwright from "playwright";
import express from "express";
import { Server } from "http";

async function getTextContent(
  page: playwright.Page,
  selector: string
): Promise<string | undefined> {
  const element = await page.$(selector);
  const text = await element?.getProperty("textContent");
  return text?.jsonValue();
}

describe("plugin", () => {
  let server: Server;
  let browser: playwright.Browser;
  let page: playwright.Page;

  beforeAll(async () => {
    jest.setTimeout(10000);

    const app = express();
    const staticPath = path.join(__dirname, "../fixture/vue-app/dist");

    server = app.use(express.static(staticPath)).listen(3000);

    browser = await playwright["chromium"].launch();

    const context = await browser.newContext();
    page = await context.newPage();

    await page.goto("localhost:3000");
    await page.waitForSelector("[data-testid='error']", { state: "hidden" });
  });
  afterAll(async () => {
    server.close();
    await browser.close();
  });
  it.each([
    {
      testid: "for-vue",
      expected: "occurred vue error"
    },
    {
      testid: "for-unhandledrejection",
      expected: "occurred unhandledrejection"
    },
    {
      testid: "for-error",
      expected: "occurred error"
    }
  ])("correct %o", async ({ testid, expected }) => {
    await page.reload();
    await expect(getTextContent(page, "[data-testid='error']")).resolves.toBe(
      ""
    );

    await page.click(`[data-testid='${testid}']`);

    await expect(getTextContent(page, "[data-testid='error']")).resolves.toBe(
      expected
    );
  });
});
