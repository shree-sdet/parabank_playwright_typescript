import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model — ParaBank Login panel (visible on the homepage).
 * Also holds navigation and session helpers used across multiple tests.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;
  readonly logoutLink: Locator;
  readonly logo: Locator;
  readonly loginPanel: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[value="Log In"]');
    this.loginErrorMessage = page.locator('#rightPanel .error');
    this.logoutLink = page.locator('a[href*="logout"]');
    this.logo = page.locator('img[title="ParaBank"]');
    this.loginPanel = page.locator('#leftPanel');
    this.registerLink = page.locator('a[href*="register"]');
  }

  /** Navigate to the ParaBank homepage */
  async goto(): Promise<void> {
    await this.page.goto('index.htm?ConnType=JDBC');
  }

  /**
   * Fill credentials and submit the login form.
   * Does NOT assert success — callers should assert the expected outcome.
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Click the Log Out link */
  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  /** Returns true when the logout link is visible — indicates active session */
  async isLoginSuccessful(): Promise<boolean> {
    return this.logoutLink.isVisible();
  }

  /** Returns true when the login button is visible — indicates no active session */
  async isLogoutSuccessful(): Promise<boolean> {
    return this.loginButton.isVisible();
  }

  /** Returns the text of the login error message */
  async getLoginErrorMessage(): Promise<string> {
    return (await this.loginErrorMessage.textContent()) ?? '';
  }
}
