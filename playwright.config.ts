import { defineConfig, devices } from '@playwright/test';
import { ENV } from '@config/env.config';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,

  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
    }]
  ],

  projects: [
    {
      name: 'web',
      testDir: './tests/web',
      use: {
        baseURL: ENV.WEATHER_BASE_URL,
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: ENV.GITHUB_API_URL,
      },
    },
  ],
});
