import { Page, Locator } from '@playwright/test';

/**
 * Abstract base class shared across pages.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Navigate to a URL
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Get text content from a locator, trimmed
   */
  protected async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() || '';
  }
}
