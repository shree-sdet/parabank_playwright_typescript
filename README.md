# Playwright BDD ParaBank Automation

Automated end-to-end tests for the ParaBank demo application using Playwright, TypeScript, and a BDD-style test suite.

## Project Overview

- `@playwright/test` based automation.
- BDD-style scenario structure in `features/parabank-registration-login.feature`.
- Page Object Model (POM) implementation in `pages/`.
- Fixture-driven setup in `fixtures/fixtures.ts`.
- Test data and constants are stored in `test-data/`.

## Key Features

- Registration and login coverage for ParaBank.
- Smoke, UI, negative, security, and visual test tags.
- Browser support for Chromium, Firefox, and WebKit.
- Failure diagnostics with screenshots, video, and trace capture.

## Repository Structure

- `package.json` - npm scripts and dependencies.
- `playwright.config.ts` - Playwright configuration and browser projects.
- `config/env.ts` - Environment configuration and base URL handling.
- `docs/` - Supporting documentation, screenshots, and assessment artifacts.
- `features/` - Gherkin-style feature files.
- `fixtures/` - Custom Playwright fixtures.
- `pages/` - Page objects for login, registration, and account overview.
- `test-data/` - Test data and reusable constants.
- `tests/` - Playwright test files.
- `test-results/` - Generated test artifacts.
- `playwright-report/` - HTML report output.

## Prerequisites

- Node.js 18+ recommended.
- npm installed.
- Internet access to the public ParaBank demo site.

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

Run the full suite:

```bash
npm test
```

Run specific groups by tag:

```bash
npm run test:smoke
npm run test:negative
npm run test:security
npm run test:ui
npm run test:visual
```

Run a single browser project:

```bash
npm run test:firefox
npm run test:webkit
```

Run tests headed:

```bash
npm run test:headed
```

Update snapshots when needed:

```bash
npm run test:update-snapshots
```

Show the HTML report:

```bash
npm run report
```

## Environment Variables

The suite supports these environment variables via `dotenv`:

- `BASE_URL` - override the ParaBank application URL.
- `EXISTING_USERNAME` - existing username used for duplicate registration tests.
- `EXISTING_PASSWORD` - existing password used in duplicate registration tests.
- `CI` - enable CI-specific behavior like `forbidOnly` and retries.

Example:

```bash
BASE_URL=https://parabank.parasoft.com/parabank/ npm test
```

## Notes

- The suite is configured to run tests sequentially (`workers: 1`) to reduce flakiness against the live demo site.
- Trace, screenshot, and video capture are enabled only on failures.
- The BDD feature file documents the current scenarios and tags for this suite.

## Known Environment Limitation

During long test executions, the public site may intermittently present a Cloudflare/security verification page depending on IP reputation or request volume. When this occurs, subsequent UI tests may fail because the application is temporarily inaccessible.

The framework has been designed assuming normal application availability.

## Contact

Author: Madhushree B. Surpur
