import playwright from "playwright";

export async function getTextContent(
  page: playwright.Page,
  selector: string
): Promise<string | undefined> {
  const element = await page.$(selector);
  const text = await element?.getProperty("textContent");
  return text?.jsonValue();
}
