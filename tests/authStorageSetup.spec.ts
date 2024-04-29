import { test as setup, expect, Page, Browser, BrowserContext } from '@playwright/test';
import { chromium } from 'playwright';
let browser: Browser
let context: BrowserContext
let page: Page;

setup.use({ headless: false });
const authFile = 'auth/userauthsave.json';

setup('Organecrm Login Save State Before Setup', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.waitForTimeout(5000);
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(5000);
    await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await expect(page.locator('.oxd-pie-chart').first()).toBeVisible({ timeout: 5000 });
    // End of authentication steps.
    await page.context().storageState({ path: authFile });
});

