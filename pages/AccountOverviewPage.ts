import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model — ParaBank Account Overview page (/overview.htm).
 * Provides locators and helpers for account table and balance retrieval.
 */
export class AccountOverviewPage {
  readonly page: Page;

  readonly accountOverviewHeading: Locator;
  readonly accountTable: Locator;
  readonly firstAccountBalance: Locator;
  readonly totalBalance: Locator;
  readonly overviewError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountOverviewHeading = page.getByRole('heading', { name: 'Accounts Overview' })
    this.accountTable = page.locator('#accountTable');
    this.firstAccountBalance = page.locator('#accountTable tbody tr').first().locator('td').nth(2);
    this.totalBalance = page.locator('#accountTable tfoot td').last();
    this.overviewError = page.getByRole('heading', { name: 'Error!' })
  }

  /**
   * Navigate directly to the Account Overview page URL, bypassing login.
   * Added for TC_011 — verifies unauthorized/direct URL access is blocked.
   */
  async goto(): Promise<void> {
    await this.page.goto('overview.htm');
  }

  /** Returns the balance text of the first account (e.g. "$515.00") */
  async getAccountBalance(): Promise<string> {
    return (await this.firstAccountBalance.textContent()) ?? '';
  }

  /** Returns the total balance text from the table footer */
  async getTotalBalance(): Promise<string> {
    return (await this.totalBalance.textContent()) ?? '';
  }

  /**
   * Reads and logs the account balance to the console.
   * This fulfils the task requirement: "log/print the amount displayed post-login".
   */
  async printAccountBalance(): Promise<void> {
    const accountBalance = await this.getAccountBalance();
    const totalBalance = await this.getTotalBalance();
    console.log('==============================================');
    console.log(`  Account 1 Balance : ${accountBalance}`);
    console.log(`  TOTAL Balance     : ${totalBalance}`);
    console.log('==============================================');
  }
}
