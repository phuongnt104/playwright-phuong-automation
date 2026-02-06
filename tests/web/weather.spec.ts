import { test, expect } from '@fixtures/fixtures';
import citiesData from '@test-data/cities.json';

const city = citiesData.cities[0];
const searchTerm = `${city.name}, ${city.country}`;

test.describe('Weather Search - OpenWeatherMap', () => {
  test.beforeEach(async ({ weatherPage }) => {
    await weatherPage.navigate();
  });

  test('should display correct weather info for Los Angeles, US', async ({ weatherPage }) => {
    await weatherPage.searchAndSelectFirstResult(searchTerm);
    const cityNameLocator = weatherPage.getCityNameLocator(city.name);
    await expect(cityNameLocator).toBeVisible();
    const cityText = await weatherPage.getCityNameText(city.name);
    expect(cityText).toContain(city.name);
    await expect(weatherPage.todayButton).toBeVisible();
    await expect(weatherPage.temperature).toBeVisible();
    const temp = await weatherPage.getTemperatureAsNumber();
    expect(temp).not.toBeNaN();
  });
});
