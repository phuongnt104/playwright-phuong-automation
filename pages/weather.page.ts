import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Weather Page Object for OpenWeatherMap
 */
export class WeatherPage extends BasePage {
  readonly searchInput: Locator;
  readonly todayButton: Locator;
  readonly temperature: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByPlaceholder('Search City');
    this.todayButton = page.getByRole('button', { name: /Today.*°/i });
    this.temperature = page.locator('span:has-text("°")').first();
  }

  async navigate(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await this.dismissCookieBanner();
  }

private async dismissCookieBanner(): Promise<void> {
  try {
    const acceptButton = this.page.getByRole('button', { name: 'Accept', exact: true });
    await acceptButton.click({ timeout: 5000 });
  } catch {
    // Cookie banner not present or already dismissed
  }
}

  /**
   * Get search result dropdown container
   */
  private getSearchDropdown(): Locator {
    return this.searchInput.locator('..').locator('xpath=following-sibling::div');
  }

  /**
   * Get search result buttons
   */
  private getSearchResultButtons(): Locator {
    return this.getSearchDropdown().locator('button');
    }

  /**
   * Get first search result button in dropdown
   */
  getFirstSearchResult(): Locator {
    return this.getSearchResultButtons().first();
  }

  /**
   * Search for a city and select first result
   * @param searchTerm 
   */
  async searchAndSelectFirstResult(searchTerm: string): Promise<void> {
    await this.searchInput.fill(searchTerm);
    const firstResult = this.getFirstSearchResult();
    await firstResult.waitFor({ state: 'visible', timeout: 5000 });
    await firstResult.click();
  }

  /**
   * Get city name locator by city name 
   */
  getCityNameLocator(cityName: string): Locator {
    return this.page.getByText(cityName, { exact: false }).first();
  }

  /**
   * Get displayed city name text
   */
  async getCityNameText(cityName: string): Promise<string> {
    return this.getText(this.getCityNameLocator(cityName));
  }

  /**
   * Get displayed temperature text 
   */
  async getTemperature(): Promise<string> {
    return this.getText(this.temperature);
  }

  /**
   * Parse temperature text to number
   */
  async getTemperatureAsNumber(): Promise<number> {
    const tempText = await this.getTemperature();
    const match = tempText.match(/-?\d+/);
    return match ? parseInt(match[0], 10) : NaN;
  }

}
