import { Page, Locator } from '@playwright/test';
import { TestUser } from '../test-data/test-data';

/**
 * Page Object Model — ParaBank Registration page.
 * Covers all form inputs, error locators, and registration actions.
 */
export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly registrationSuccessHeading: Locator;
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly addressError: Locator;
  readonly cityError: Locator;
  readonly stateError: Locator;
  readonly zipCodeError: Locator;
  readonly ssnError: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;
  readonly confirmPasswordError: Locator;
  readonly passwordDoNotMatchError: Locator;
  readonly usernameAlreadyExistsError: Locator;
  readonly registerLink: Locator;


  constructor(page: Page) {
    this.page = page;

    this.registerLink = page.locator('a[href*="register"]');
    this.firstNameInput = page.locator('#customer\\.firstName');
    this.lastNameInput = page.locator('#customer\\.lastName');
    this.addressInput = page.locator('#customer\\.address\\.street');
    this.cityInput = page.locator('#customer\\.address\\.city');
    this.stateInput = page.locator('#customer\\.address\\.state');
    this.zipCodeInput = page.locator('#customer\\.address\\.zipCode');
    this.phoneInput = page.locator('#customer\\.phoneNumber');
    this.ssnInput = page.locator('#customer\\.ssn');
    this.usernameInput = page.locator('#customer\\.username');
    this.passwordInput = page.locator('#customer\\.password');
    this.confirmPasswordInput = page.locator('#repeatedPassword');
    this.registerButton = page.locator('input[value="Register"]');
    this.registrationSuccessHeading = page.locator('#rightPanel h1').filter({ hasText: /^Welcome/ });
    this.firstNameError = page.locator('#customer\\.firstName\\.errors');
    this.lastNameError = page.locator('#customer\\.lastName\\.errors');
    this.addressError = page.locator('#customer\\.address\\.street\\.errors');
    this.cityError = page.locator('#customer\\.address\\.city\\.errors');
    this.stateError = page.locator('#customer\\.address\\.state\\.errors');
    this.zipCodeError = page.locator('#customer\\.address\\.zipCode\\.errors');
    this.ssnError = page.locator('#customer\\.ssn\\.errors');
    this.usernameError = page.locator('#customer\\.username\\.errors');
    this.passwordError = page.locator('#customer\\.password\\.errors');
    this.confirmPasswordError = page.locator('#repeatedPassword\\.errors');
    this.passwordDoNotMatchError = page.locator('text=Passwords did not match').first();
    this.usernameAlreadyExistsError = page.locator('#customer\\.username\\.errors');
  }

  /** Navigate to the ParaBank home page */
  async goto(): Promise<void> {
    await this.page.goto('index.htm?ConnType=JDBC');
  }

  /** Click the Register link in the navigation panel */
  async openRegistrationPage(): Promise<void> {
    await this.registerLink.click();
  }

  /**
   * Fill the complete registration form.
   * @param user         Test user data
   * @param confirmPassword  Defaults to user.password — pass a different value to test mismatch scenarios
   */
  async fillRegistrationForm(user: TestUser, confirmPassword: string = user.password): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.addressInput.fill(user.address);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.zipCodeInput.fill(user.zipCode);
    await this.phoneInput.fill(user.phone);
    await this.ssnInput.fill(user.ssn);
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  /** Click the Register button */
  async submitRegistration(): Promise<void> {
    await this.registerButton.click();
  }

  /**
   * Full register flow: navigate → open form → fill → submit.
   * ✅ Fixed: parameter typed as TestUser, not any.
   * Callers should NOT call goto() + openRegistrationPage() before this method;
   * it handles navigation internally.
   */
  async registerUser(user: TestUser): Promise<void> {
    await this.goto();
    await this.openRegistrationPage();
    await this.fillRegistrationForm(user);
    await this.submitRegistration();
  }

  /** Returns the text of the success heading after registration */
  async getRegistrationSuccessMessage(): Promise<string> {
    return (await this.registrationSuccessHeading.textContent()) ?? '';
  }
}
