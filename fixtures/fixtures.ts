import { test as base, APIRequestContext } from '@playwright/test';
import { WeatherPage } from '@pages/weather.page';
import { GithubService } from '@services/github.service';
import { ENV } from '@config/env.config';

type CustomFixtures = {
  weatherPage: WeatherPage;
  githubService: GithubService;
  apiContext: APIRequestContext;
};

export const test = base.extend<CustomFixtures>({
  weatherPage: async ({ page }, use) => {
    const weatherPage = new WeatherPage(page);
    await use(weatherPage);
  },

  apiContext: async ({ playwright }, use) => {
    const hasValidToken = ENV.GITHUB_TOKEN && !ENV.GITHUB_TOKEN.includes('your_');

    const apiContext = await playwright.request.newContext({
      baseURL: ENV.GITHUB_API_URL,
      extraHTTPHeaders: {
        'Accept': 'application/vnd.github+json',
        ...(hasValidToken && { 'Authorization': `Bearer ${ENV.GITHUB_TOKEN}` }),
      },
    });
    await use(apiContext);
    await apiContext.dispose();
  },

  githubService: async ({ apiContext }, use) => {
    const githubService = new GithubService(apiContext);
    await use(githubService);
  },
});

export { expect } from '@playwright/test';
