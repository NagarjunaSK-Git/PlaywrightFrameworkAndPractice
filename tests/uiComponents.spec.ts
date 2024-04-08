import { test, expect, Page, Browser, BrowserContext } from '@playwright/test';
import { chromium } from 'playwright';
let browser: Browser
let context: BrowserContext
let page: Page;

test.beforeEach("Launch Application", async () => {
    // Setup
    browser = await chromium.launch({
        args: ["--start-maximized", "--remote-debugging-port=9222"],
    });
    context = await browser.newContext({
       viewport: null
    });
    page = await context.newPage();
});

test.afterAll("Tear Down Setup", async () => {
    // Teardown
    await page.waitForTimeout(5000);
    await context.close();
    await browser.close();
});

test.describe('Input Fields Type and Clear', async () => {

    test.beforeEach('Navigate to the Forms Initial App State', async () => {
        await page.goto('https://www.akveo.com/ngx-admin/themes');
        await expect(page).toHaveTitle("Ngx-admin themes for e-commerce dashboard on Angular 15+ and Nebular");
        await page.locator('nb-card-header', { hasText: 'Material Light' }).click();
        await page.getByTitle('Forms').click();
        await page.getByTitle('Form Layouts').click();
        await expect(page.getByText('Inline form')).toBeVisible();
    });

    test('Input Fields Type and Clear', async () => {
        const gridHeader = page.locator('nb-card', { hasText: 'Using the Grid' });
        const gridHeaderEmail = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' });
        await gridHeaderEmail.fill('test@test.com');
        // Not recommended but just to show it has filled and will clear later.
        await page.waitForTimeout(2000);
        await gridHeaderEmail.clear();
        await gridHeader.locator('#inputEmail1').pressSequentially('testsequential@test.com', { delay: 50 });

    })



});