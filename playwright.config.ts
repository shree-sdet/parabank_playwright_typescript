import { defineConfig, devices } from '@playwright/test';
import { ENV } from './config/env';

export default defineConfig({
  testDir: './tests',

  /* Run tests sequentially — avoids rate-limiting on the live ParaBank server */
  fullyParallel: false,
  workers: 1,

  /* Fail the build if test.only is accidentally committed */
  forbidOnly: !!process.env.CI,

  /* 1 retry on CI only — ParaBank can be flaky under network lag */
  retries: process.env.CI ? 1 : 0,

  /* Per-test timeout — ParaBank can be slow */
  timeout: 60000,

  /* Assertion timeout */
  expect: { timeout: 15_000 },

  /* Reporters: HTML for local review, list for CI logs */
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    /* ParaBank app root; page.goto() calls should use relative paths */
    baseURL: ENV.BASE_URL,

    /* Collect trace and screenshots only on failure — saves disk space */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    /* CI gate: Chromium only — fast and reliable */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Optional cross-browser — run with: npm run test:firefox / test:webkit */
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
