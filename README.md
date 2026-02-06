# Playwright QA Automation

Playwright automation project for web and API testing.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: >= 18.x (LTS recommended)
- **npm**: >= 9.x (comes with Node.js)
- **Operating System**: Windows, macOS, or Linux

To verify your installation:
```bash
node --version
npm --version
```

## Project Structure

```
playwright-qa-automation/
├── tests/
│   ├── web/           # Web UI tests
│   └── api/           # API tests
├── pages/             # Page Object Models
├── services/          # API service classes
├── config/            # Configuration files
├── fixtures/          # Playwright custom fixtures
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
└── test-data/         # Test data files
```

## Assumptions
- When searching for "Los Angeles, US", multiple locations are returned by the UI (e.g. California, Texas).
- For test stability, the automation selects "Los Angeles, California" which is the most common and expected result.
- City name validation is done using partial matching to avoid flakiness caused by multiple cities sharing the same name.
- The new OpenWeather UI does not expose a specific date value.
- The label "Today" is used to represent the current date.
- The test verifies the presence of the "Today" forecast instead of validating date format.
- For the scope of this assignment, only one happy-path test case is implemented, as required. In a real-world project, additional scenarios such as invalid city search or multiple result handling would be considered.

## Environment Variables

This project supports GitHub API authentication via a personal access token to avoid rate limiting.

- Create a `.env` file based on `.env.example` and provide your `GITHUB_TOKEN` if needed
- The `.env` file is excluded from version control for security reasons

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env and add your GITHUB_TOKEN
```

## Running Tests

```bash
# Run all tests
npm test

# Run web tests only
npm run test:web

# Run API tests only
npm run test:api

# Run tests with browser visible
npm run test:headed

# Run tests in debug mode
npm run test:debug

# View test report
npm run report
```

## Configuration

- `playwright.config.ts` - Playwright configuration
- `config/env.config.ts` - Environment variables
- `fixtures/fixtures.ts` - Custom test fixtures

## Path Aliases

This project uses TypeScript path aliases for cleaner imports:

- `@pages/*` - Page Object Models
- `@services/*` - API service classes
- `@config/*` - Configuration files
- `@fixtures/*` - Custom fixtures
- `@utils/*` - Utility functions
- `@app-types/*` - TypeScript type definitions
- `@test-data/*` - Test data files

Example:
```typescript
import { WeatherPage } from '@pages/weather.page';
import { ENV } from '@config/env.config';
```
