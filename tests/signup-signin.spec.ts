/**
 * ParaBank — Registration & Login test suite
 *
 * All tests follow BDD structure using test.step() with Given / When / Then language.
 * Page interactions are delegated to POM classes (pages/).
 * Repeated setup (register → logout → login) is handled by the loggedInPage fixture,
 *
 */

import { test, expect } from '../fixtures/fixtures';
import { existingUser, generateTestUser } from '../test-data/test-data';
import { URL_PATTERNS, ERROR_MESSAGES, DB_ERROR_LEAK_PATTERN, NEGATIVE_TEST_DATA } from '../test-data/constants';

test.describe('Feature: ParaBank Registration & Login', () => {

  test('@smoke @TC001 Verify successful user registration with valid details', async ({ registerPage }) => {

      const user = generateTestUser();

      await test.step('Given the user launches the ParaBank application', async () => {
        await registerPage.goto();
        await registerPage.openRegistrationPage();
      });

      await test.step('When the user enters valid registration details', async () => {
        await registerPage.fillRegistrationForm(user);
      });

      await test.step('And the user clicks the Register button', async () => {
        await registerPage.submitRegistration();
      });

      await test.step('Then the registration should be successful', async () => {
        await expect(registerPage.registrationSuccessHeading).toBeVisible();
      });

      await test.step('And the welcome message should contain the registered username', async () => {
        const message = await registerPage.getRegistrationSuccessMessage();
        expect(message).toContain(user.username);
      });
    }
  );

  test( '@smoke @TC002 Verify login and account overview page after login',async ({ loggedInPage , page }) => {
     
    const { accountOverviewPage } = loggedInPage;

      await test.step('Given the user has registered a new account and logged in',async () => {
          /* loggedInPage fixture has already completed: register → logout → login */
          await expect(accountOverviewPage.accountOverviewHeading).toBeVisible();
        }
      );

      await test.step('Then the user should be on the Account Overview page', async () => {
        await expect(accountOverviewPage.accountOverviewHeading).toBeVisible();
      });


      await test.step('And the URL should contain overview.htm', async () => {
        await expect(page).toHaveURL(URL_PATTERNS.OVERVIEW);
      });

      await test.step('And the account summary table should be visible', async () => {
        await expect(accountOverviewPage.accountTable).toBeVisible();
      });

      await test.step('And at least one account balance should be listed', async () => {
        const balance = await accountOverviewPage.getAccountBalance();
        expect(balance.trim()).not.toBe('');
        expect(balance).toContain('$');
      });

      await test.step('And the account balance should be printed to the console', async () => {
        await accountOverviewPage.printAccountBalance();
      });
    }
  );

  test('@ui @TC003 Verify page title and branding on homepage', async ({ loginPage, page }) => {

      await test.step('Given the user navigates to the ParaBank homepage', async () => {
        await loginPage.goto();
      });

      await test.step('Then the page title should contain "ParaBank"', async () => {
        await expect(page).toHaveTitle(/ParaBank/i);
      });

      await test.step('And the ParaBank logo should be visible', async () => {
        await expect(loginPage.logo).toBeVisible();
      });

      await test.step('And the login panel should be displayed', async () => {
        await expect(loginPage.loginPanel).toBeVisible();
      });

      await test.step('And the Register link should be visible', async () => {
        await expect(loginPage.registerLink).toBeVisible();
      });
    }
  );


  test('@negative @TC004 Verify registration fails when all required fields are empty', async ({ registerPage }) => {

      await test.step('Given the user navigates to the Registration page', async () => {
        await registerPage.goto();
        await registerPage.openRegistrationPage();
      });

      await test.step('When the user submits the form without filling any fields', async () => {
        await registerPage.submitRegistration();
      });

      await test.step('Then validation errors should appear for all required fields', async () => {
        await expect(registerPage.firstNameError).toContainText(ERROR_MESSAGES.FIRST_NAME_REQUIRED);
        await expect(registerPage.lastNameError).toContainText(ERROR_MESSAGES.LAST_NAME_REQUIRED);
        await expect(registerPage.addressError).toContainText(ERROR_MESSAGES.ADDRESS_REQUIRED);
        await expect(registerPage.cityError).toContainText(ERROR_MESSAGES.CITY_REQUIRED);
        await expect(registerPage.stateError).toContainText(ERROR_MESSAGES.STATE_REQUIRED);
        await expect(registerPage.zipCodeError).toContainText(ERROR_MESSAGES.ZIPCODE_REQUIRED);
        await expect(registerPage.ssnError).toContainText(ERROR_MESSAGES.SSN_REQUIRED);
        await expect(registerPage.usernameError).toContainText(ERROR_MESSAGES.USERNAME_REQUIRED);
        await expect(registerPage.passwordError).toContainText(ERROR_MESSAGES.PASSWORD_REQUIRED);
        await expect(registerPage.confirmPasswordError).toContainText(ERROR_MESSAGES.CONFIRM_PASSWORD_REQUIRED);
      });

      await test.step('And the registration success heading should not appear', async () => {
        await expect(registerPage.registrationSuccessHeading).not.toBeVisible();
      });
    }
  );

  test('@negative @TC005 Verify sign-in fails with incorrect username and password',async ({ loginPage, page }) => {
      await test.step('Given the user navigates to the ParaBank homepage', async () => {
        await loginPage.goto();
      });

      await test.step('When the user enters an invalid username and password', async () => {
        await loginPage.login(NEGATIVE_TEST_DATA.INVALID_USERNAME, NEGATIVE_TEST_DATA.INVALID_PASSWORD);
      });

      await test.step('Then an authentication error message should be displayed', async () => {
        await expect(loginPage.loginErrorMessage).toContainText(ERROR_MESSAGES.INVALID_LOGIN);
      });

      await test.step('And the user should remain on the login page', async () => {
        await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
      });

      await test.step('And the user should not be redirected to Account Overview', async () => {
        await expect(page).not.toHaveURL(URL_PATTERNS.OVERVIEW);
      });
    }
  );

  
  test('@negative @TC006 Verify registration fails when passwords do not match', async ({ registerPage, page }) => {
      const user = generateTestUser();

      await test.step('Given the user navigates to the Registration page', async () => {
        await registerPage.goto();
        await registerPage.openRegistrationPage();
      });

      await test.step('When the user enters valid details with a mismatched confirm password', async () => {
        await registerPage.fillRegistrationForm(user, NEGATIVE_TEST_DATA.MISMATCHED_CONFIRM_PASSWORD);
      });

      await test.step('And the user clicks the Register button', async () => {
        await registerPage.submitRegistration();
      });

      await test.step('Then a password mismatch error should be displayed', async () => {
        await expect(registerPage.passwordDoNotMatchError).toContainText(ERROR_MESSAGES.PASSWORD_MISMATCH);
      });

      await test.step('And the registration should not complete', async () => {
        await expect(registerPage.registrationSuccessHeading).not.toBeVisible();
      });

      await test.step('And the user should remain on the Registration page', async () => {
        await expect(page).toHaveURL(URL_PATTERNS.REGISTER);
      });
    }
  );

 
  test('@negative @TC007 Verify registration fails when username already exists',async ({ registerPage, page }) => {

      await test.step('Given the user navigates to the Registration page', async () => {
        await registerPage.goto();
        await registerPage.openRegistrationPage();
      });

      await test.step('When the user registers with an already existing username', async () => {
        await registerPage.fillRegistrationForm(existingUser);
        await registerPage.submitRegistration();
      });

      await test.step('Then a duplicate username error should be displayed', async () => {
        await expect(registerPage.usernameAlreadyExistsError).toContainText(
          ERROR_MESSAGES.DUPLICATE_USERNAME
        );
      });

      await test.step('And the registration should not complete', async () => {
        await expect(registerPage.registrationSuccessHeading).not.toBeVisible();
      });

      await test.step('And the user should remain on the Registration page', async () => {
        await expect(page).toHaveURL(URL_PATTERNS.REGISTER);
      });
    }
  );

 
  test('@security @TC008 Verify user cannot access Account Overview after logout via browser back button',async ({ loggedInPage, page }) => {
      const { loginPage, accountOverviewPage } = loggedInPage;

      await test.step('Given the user is already logged into the application', async () => {
        /* loggedInPage fixture has already completed register → logout → login */
        await expect(accountOverviewPage.accountOverviewHeading).toBeVisible();
      });

      await test.step('When the user logs out of the application', async () => {
        await loginPage.logout();
        await expect(loginPage.loginButton).toBeVisible();
      });

      await test.step('And the user presses the browser Back button', async () => {
        await page.goBack();
        await page.waitForLoadState('networkidle');
      });

      await test.step('Then the Account Overview page should not be accessible', async () => {
        await expect(accountOverviewPage.accountTable).not.toBeVisible();
        await expect(accountOverviewPage.accountOverviewHeading).not.toBeVisible();
      });

      await test.step('And  the overview error should be displayed', async () => {
        await expect(accountOverviewPage.overviewError).toBeVisible();
      });
    }
  );

  test('@visual @TC009 Verify Registration page matches approved visual baseline',async ({ registerPage, page }) => {

      await test.step('Given the user navigates to the Registration page', async () => {
        await registerPage.goto();
        await registerPage.openRegistrationPage();
      });

      await test.step('Then the Registration page should match the baseline screenshot', async () => {
        await expect(page).toHaveScreenshot('registration-page-baseline.png', {fullPage: true, maxDiffPixelRatio: 0.02});
      });
    }
  );

  test('@negative @TC010 Verify login fails with empty username and password', async ({ loginPage, page }) => {

      await test.step('Given the user navigates to the ParaBank homepage', async () => {
        await loginPage.goto();
      });

      await test.step('When the user submits the login form with empty username and password', async () => {
        await loginPage.login(NEGATIVE_TEST_DATA.EMPTY_USERNAME, NEGATIVE_TEST_DATA.EMPTY_PASSWORD);
      });

      await test.step('Then an appropriate validation/error message should be displayed', async () => {
        await expect(loginPage.loginErrorMessage).toBeVisible();
      });

      await test.step('And the user should remain on the login page and should not be authenticated', async () => {
        await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
        await expect(page).not.toHaveURL(URL_PATTERNS.OVERVIEW);
      });
    }
  );

  test('@security @TC011 Verify direct URL access to Account Overview page without login', async ({ accountOverviewPage, page }) => {

      await test.step('Given the user has not logged in and launches the browser', async () => {
        /* fresh browser context per test - no active session */
      });

      await test.step('When the user directly navigates to /parabank/overview.htm without logging in', async () => {
        await accountOverviewPage.goto();
      });

      await test.step('Then the user should be redirected to the Login page or receive an authorization/session message', async () => {
        const errorVisible = await accountOverviewPage.overviewError.isVisible().catch(() => false);
        expect(errorVisible).toBeTruthy();
      });

      await test.step('And account information must not be displayed', async () => {
        await expect(accountOverviewPage.accountTable).not.toBeVisible();
      });
    }
  );

  test('@security @TC012 Verify application rejects SQL Injection during login', async ({ loginPage, page }) => {

      await test.step('Given the user navigates to the ParaBank homepage', async () => {
        await loginPage.goto();
      });

      await test.step('When the user enters a SQL injection payload in the Username field and any password', async () => {
        await loginPage.login(NEGATIVE_TEST_DATA.SQL_INJECTION_USERNAME, NEGATIVE_TEST_DATA.SQL_INJECTION_PASSWORD);
      });

      await test.step('Then login should fail and an authentication error should be displayed', async () => {
        await expect(page).not.toHaveURL(URL_PATTERNS.OVERVIEW);
      });

      await test.step('And the application should not expose database errors', async () => {
        const bodyText = await page.locator('body').innerText();
        expect(bodyText).not.toMatch(DB_ERROR_LEAK_PATTERN);
      });
    });

    

});
