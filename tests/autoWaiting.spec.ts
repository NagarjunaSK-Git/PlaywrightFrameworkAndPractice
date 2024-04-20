import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }, testInfo) => {
    // await page.goto(process.env.URL);
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText('Button Triggering AJAX Request').click();
    testInfo.setTimeout(testInfo.timeout + 2000);
    console.log(`Test will repeat for ${testInfo.repeatEachIndex} times`);
    /**
     * Please check the below output for repeatEachIndex logs and starts from zero
     *  [chromiumheaded] › autoWaiting.spec.ts:13:5 › Auto waiting for Web Element @autowait
        Test will repeat for 1 times
        [chromiumheaded] › autoWaiting.spec.ts:13:5 › Auto waiting for Web Element @autowait
        Test will repeat for 0 times
        [chromiumheaded] › autoWaiting.spec.ts:13:5 › Auto waiting for Web Element @autowait
        Test will repeat for 2 times
     * 
     */
});

//npx playwright test -g "@autowait" --project=chromiumheaded
//npx playwright test -g "@autowait" --project=chromiumheaded --repeat-each=3
test('Auto waiting for Web Element @autowait', async ({ page }) => {
    const successButton = page.locator('.bg-success');

    // await successButton.click()

    // const text = await successButton.textContent()
    // await successButton.waitFor({state: "attached"})
    // const text = await successButton.allTextContents()

    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 });
});

test('Alternative Waits Network Based Specific use case @networkwait', async ({ page }) => {
    const successButton = page.locator('.bg-success');

    //___ wait for element
    // await page.waitForSelector('.bg-success')

    //__ wait for particlular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata');

    //__ wait for network calls to be completed ('NOT RECOMMENDED')
    // await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents();
    expect(text).toContain('Data loaded with AJAX get request.');
});


//npx playwright test -g "@timeouts" --project=chromiumheaded
test('Timeouts Try @timeouts', async ({ page }) => {
    //test.setTimeout(10000);
    test.slow()
    const successButton = page.locator('.bg-success');
    await successButton.click();
});