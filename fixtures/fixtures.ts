import { test as base, expect } from '@playwright/test';
import { RegisterPage }       from '../pages/RegisterPage';
import { LoginPage }          from '../pages/LoginPage';
import { AccountOverviewPage } from '../pages/AccountOverviewPage';
import { generateTestUser, TestUser } from '../test-data/test-data';

/**
 * Shape of the compound loggedInPage fixture.
 * Provides all page objects + the registered user in one setup step.
 */
export type LoggedInContext = {
  user:                TestUser;
  registerPage:        RegisterPage;
  loginPage:           LoginPage;
  accountOverviewPage: AccountOverviewPage;
};

/**
 * Custom fixture types — extend base Playwright test with app-specific fixtures.
 */
type AppFixtures = {
  /** RegisterPage instance for the current page */
  registerPage: RegisterPage;

  /** LoginPage instance for the current page */
  loginPage: LoginPage;

  /** AccountOverviewPage instance for the current page */
  accountOverviewPage: AccountOverviewPage;

  /** Compound fixture that registers a new user, logs out, and logs in with the new credentials */
  loggedInPage: LoggedInContext;
};

export const test = base.extend<AppFixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  accountOverviewPage: async ({ page }, use) => {
    await use(new AccountOverviewPage(page));
  },

  loggedInPage: async ({ page }, use) => {
    await page.context().clearCookies();
    const user                = generateTestUser();
    const registerPage        = new RegisterPage(page);
    const loginPage           = new LoginPage(page);
    const accountOverviewPage = new AccountOverviewPage(page);

    await registerPage.registerUser(user);
    await expect(registerPage.registrationSuccessHeading).toBeVisible();
    await loginPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
    await loginPage.login(user.username, user.password);
    await expect(accountOverviewPage.accountOverviewHeading).toBeVisible();
    await use({ user, registerPage, loginPage, accountOverviewPage });
  },
});

export { expect } from '@playwright/test';
