import { expect, Page } from '@playwright/test';

export default class BaseAssertion {
  constructor(protected page: Page) {}

  async assertTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async assertContains(expectedContent: string, actualContent: string) {
    expect(actualContent.trim()).toContain(expectedContent.trim());
  }

  async ensure(actualValue: boolean, expectedValue: boolean) {
    expect(expectedValue).toBe(actualValue);
  }
}
