import { Page } from 'playwright-core';
import config from '../../config';

export class SaucedemoUI {
  public static async login(page: Page) {
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill(config.loginsaucedemo);
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill(config.passwordsaucedemo);
    await page.locator('[data-test="login-button"]').click();
  }

  public static async logout(page: Page) {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
  }
  }
