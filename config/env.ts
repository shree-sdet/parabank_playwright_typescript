import 'dotenv/config';

export const ENV = {
  BASE_URL: process.env.BASE_URL ?? 'https://parabank.parasoft.com/parabank/',

  /** Pre-existing ParaBank demo account — used by TC_007 (duplicate username). */
  EXISTING_USERNAME: process.env.EXISTING_USERNAME ?? 'john',
  EXISTING_PASSWORD: process.env.EXISTING_PASSWORD ?? 'demo',

  /** Set to 'true' in CI to force headless mode regardless of local defaults. */
  CI: process.env.CI === 'true' || !!process.env.CI,
};
