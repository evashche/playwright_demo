import test, { expect } from "@playwright/test";

export function formatPrice(text) {
  return text?.match(/\d+(?:\.\d{1,2})?/g)[0];
}

export function whiteSpace(text) {
  return text.replace(/\s+/g, "");
}

export class Text {
  CONTAINS_TEXT = (text) => `//*[contains(text(), '${text}')]`;
  EQUAL_TEXT = (text) => `//*[normalize-space(text()) = '${text}']`;
}

export default class BaseWeb {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }
  loc = this.loc;
  text = new Text();

  async click() {
    await test.step(`click ${this.constructor.name}`, async () => {
      await this.page.locator(this.loc).click();
    });
  }

  async clickFirst() {
    await test.step(`click first element in ${this.constructor.name}`, async () => {
      await this.page.locator(this.loc).first().click();
    });
  }

  async getText() {
    let text;
    await test.step(`get text of ${this.constructor.name}`, async () => {
      text = await this.page.locator(this.loc).textContent();
    });
    return text;
  }

  async getTextFirst() {
    let text;
    await test.step(`search first text in ${this.constructor.name}`, async () => {
      text = await this.page.locator(this.loc).first().textContent();
    });
    return text;
  }

  async fill(text) {
    await test.step(`fill ${this.constructor.name} with text ${text}`, async () => {
      await this.page.locator(this.loc).fill(text);
    });
  }

  async goto(text) {
    await this.page.goto(text);
  }

  async getByText(text) {
    await this.page.getByText(text);
  }

  async expectText(text) {
    await test.step(`expect ${this.constructor.name} contain text ${text}`, async () => {
      await expect(this.page.locator(this.loc)).toContainText(text);
    });
  }

  async expectNotText(text) {
    await test.step(`expect ${this.constructor.name} not contain text ${text}`, async () => {
      await expect(this.page.locator(this.loc)).not.toContainText(text);
    });
  }

  findText(text) {
    this.loc = `${this.loc}${this.text.EQUAL_TEXT(text)}`;
    return this;
  }
}
