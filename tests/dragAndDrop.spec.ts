import { test, expect, Page, Browser, BrowserContext } from '@playwright/test';
import { chromium } from 'playwright';
let browser: Browser
let context: BrowserContext
let page: Page;

test.beforeEach("Launch Application", async () => {
    // Setup
    browser = await chromium.launch({
        args: ["--start-maximized", "--remote-debugging-port=9222"]
    });
    context = await browser.newContext({
        viewport: null
    });
    page = await context.newPage();
});

test.afterEach("Tear Down Setup", async () => {
    // Teardown
    await page.waitForTimeout(5000);
    await context.close();
    await browser.close();
});


test('drag and drop with iframe', async() => {

    // Drag and Drop but before that get into iFrame
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');
    const fromLocator = page.locator('li', {hasText:"High Tatras 2"});
    const toLocator = page.frameLocator('.demo-frame').first().locator('#trash');
    await frame.locator(fromLocator).dragTo(toLocator);

    /**more presice control via mouse actions to simulate user behaviour
     * And cautious usage as you cannot move mouse during test execution
    */
    await frame.locator('li', {hasText:"High Tatras 4"}).hover();
    await page.mouse.down();
    await frame.locator('#trash').hover();
    await page.mouse.up();

    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"]);
});