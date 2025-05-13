import { expect } from "@playwright/test";

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
    await this.page.locator(this.loc).click();
  }

  async clickFirst() {
    await this.page.locator(this.loc).first().click();
  }

  async getText() {
    const text = await this.page.locator(this.loc).textContent();
    return text;
  }

  async getTextFirst() {
    const text = await this.page.locator(this.loc).first().textContent();
    return text;
  }

  async fill(text) {
    await this.page.locator(this.loc).fill(text);
  }

  async goto(text) {
    await this.page.goto(text);
  }

  async getByText(text) {
    await this.page.getByText(text);
  }

  async expectText(text) {
    await expect(this.page.locator(this.loc)).toContainText(text);
  }

  async expectNotText(text) {
    await expect(this.page.locator(this.loc)).not.toContainText(text);
  }

  findText(text) {
    this.loc = `${this.loc}${this.text.EQUAL_TEXT(text)}`;
    return this;
  }
}
