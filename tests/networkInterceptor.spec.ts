import { test, expect, Page, Browser, BrowserContext } from '@playwright/test';
import { Console } from 'console';
import { chromium, devices } from 'playwright';
let browser: Browser
let context: BrowserContext
let page: Page;

test.beforeAll("Launch Application", async () => {
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


test("AJAX Website Network Modify @NetworkIntercept", async () => {
    let apiURLIntercept = 'http://uitestingplayground.com/ajaxdata';
    const newData = "Custom Data Intercepted Loaded into the response than actual";

    // await page.route(apiURLIntercept, async (route) => {
    //     console.log('Intercepted request:', route.request().url());
    //     await route.fulfill({
    //         // modified status code
    //         status: 201,
    //         // Override response body.
    //         body: newData,
    //         // Force content type to be html.
    //         headers: {
    //             'content-type': 'text/html',
    //             'Intercept Custom': 'Test Dummy Response modified'
    //         }
    //     });
    // });

    await page.route(apiURLIntercept, async (route) => {
        // Fetch original response.
        const response = await page.request.fetch(route.request());
        console.log(`Logged response status: ${response.status()}`);
        console.log(`Logged response status text: ${response.statusText()}`);
        console.log(`Logged response url:  ${response.url()}`);
        console.log(`Logged response body:  ${response.text()}`);
        //body = body.replace('<title>', '<title>My prefix:');
        await route.fulfill({
          // Pass all fields from the response.
          response,
          // Override status code.
          status: 201,
          // Override response body.
          body:newData,
          // Force content type to be html.
          headers: {
            ...response.headers(),
            'content-type': 'text/html',
            'TestResponseHeader': 'Dummy'
          }
        });
      });

    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText('Button Triggering AJAX Request').click();
    await page.waitForResponse(apiURLIntercept);
    await page.screenshot({ path: './test-screenshots/screenshotAjax.png' });

});