import { test, expect, Page, Browser, BrowserContext } from '@playwright/test';
import { chromium } from 'playwright';
let browser: Browser
let context: BrowserContext
let page: Page;

const authFile = 'auth/userauthsave.json';

test.use({ storageState: authFile });

test('Organecrm Login Save State @Loginauthsave', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await page.waitForTimeout(3000);
    await expect(page.locator('.oxd-pie-chart').first()).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(3000);

});

