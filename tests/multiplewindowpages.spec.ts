import { test, Page, expect } from '@playwright/test'


let appURL = 'https://www.lambdatest.com/selenium-playground/window-popup-modal-demo';

test('Handling Window Tabs Popup @window @tab', async ({ page }) => {
    await page.goto(appURL);
    const [multiPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.locator('#followboth').click()
    ]);


    await multiPage.waitForLoadState();
    const pages = multiPage.context().pages();
    console.log('No.of tabs: ' + pages.length);

    let fbPage: Page = page;
    for (let index = 0; index < pages.length; index++) {
        const url = pages[index].url();
        console.log(`Index is ${index} and URL is : ${url}`);
        if (url == "https://www.facebook.com/lambdatest/") {
            fbPage = pages[index];
        }
    }
    const text = await fbPage.textContent("//h1");
    console.log(text);
    await fbPage.bringToFront();
    fbPage.getByRole('textbox', { name: 'Email address or phone number' }).fill('test@test.com');
    await page.waitForTimeout(1000);
    fbPage.getByRole('textbox', { name: 'Password' }).fill('Test123@');
    await page.waitForTimeout(1000);
    fbPage.getByRole('button', { name: 'Accessible login button' }).click();

});


test('Handling New Page Tabs @newtab', async ({ page,context }) => {

    await page.goto("https://www.lambdatest.com/");
    await page.getByRole('button',{name: 'Book a Demo'}).click();
    const scheduleDemoBt = page.getByRole('button',{name: 'SCHEDULE DEMO'});
    await expect(scheduleDemoBt).toHaveText('SCHEDULE DEMO');
    const newPage = await context.newPage();
    /** or you shall get the context from current Page and create new 
     Page out of it. Both options will work
    //const newPage = await page.context().newPage();
    */
    await newPage.goto('https://playwright.dev/');
    await newPage.waitForLoadState('domcontentloaded');
    await newPage.bringToFront();
    await newPage.waitForTimeout(1000);
    await newPage.close();
    await page.bringToFront();
    await page.waitForTimeout(1000);

});




