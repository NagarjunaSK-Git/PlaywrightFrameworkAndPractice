import { test, expect, Page, Browser, BrowserContext } from '@playwright/test';
import { chromium, devices } from 'playwright';
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

test.beforeEach('Navigate to Form Layouts', async ({ }) => {
  await page.goto('https://www.akveo.com/ngx-admin/themes');
  await expect(page).toHaveTitle("Ngx-admin themes for e-commerce dashboard on Angular 15+ and Nebular");
  await page.locator('nb-card-header',{hasText: 'Material Light'}).click();
  await page.getByTitle('Forms').click();
  await page.getByTitle('Form Layouts').click();
  await expect(page.getByText('Inline form')).toBeVisible();


});

test('Locators', async ({ }) => {
  // await page.goto('https://www.akveo.com/ngx-admin/themes');
  // await expect(page).toHaveTitle("Ngx-admin themes for e-commerce dashboard on Angular 15+ and Nebular");
  // await page.locator('nb-card-header',{hasText: 'Material Light'}).click();
  // await page.getByTitle('Forms').click();
  // await page.getByTitle('Form Layouts').click();
  await expect(page.getByText('Inline form')).toBeVisible();


});
