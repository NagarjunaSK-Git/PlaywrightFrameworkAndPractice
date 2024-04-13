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

test.afterEach("Tear Down Setup", async () => {
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


test.describe('Radio Buttons Handling', async () => {
    test.beforeEach('Navigate to the Forms Initial App State', async () => {
        await page.goto('https://www.akveo.com/ngx-admin/themes');
        await expect(page).toHaveTitle("Ngx-admin themes for e-commerce dashboard on Angular 15+ and Nebular");
        await page.locator('nb-card-header', { hasText: 'Material Light' }).click();
        await page.getByTitle('Forms').click();
        await page.getByRole('link', { name: 'Form Layouts' }).click();
        await expect(page.getByText('Inline form')).toBeVisible();
    });

    test('Radio Button Check', async () => {
        const gridHeader = page.locator('nb-card', { hasText: 'Using the Grid' });
        const firstOptionLocator = page.getByRole('radio',{name: 'Option 1'});
        const secondOptionLocator = page.getByRole('radio',{name: 'Option 2'});
        /**check method on radio button will verify if it is already check or radio button and then perform the action if required.
         * force: true option is provided to check if they are hidden by CSS for any reason and it will bypass 
         * Playwright default isHidden check for the webelements
        */
        await firstOptionLocator.waitFor({state:'visible'});
        await firstOptionLocator.check({force:true});
        await expect(firstOptionLocator).toBeChecked();
        await secondOptionLocator.check({force:true});      
        expect(await firstOptionLocator.isChecked()).toBeFalsy();
        await expect(secondOptionLocator).toBeChecked();

    })

});


test.describe('Dropdown Lists Handling', async () => {
    test.beforeEach('Navigate to the Forms Initial App State', async () => {
        await page.goto('https://www.akveo.com/ngx-admin/themes');
        await expect(page).toHaveTitle("Ngx-admin themes for e-commerce dashboard on Angular 15+ and Nebular");
        await page.locator('nb-card-header', { hasText: 'Material Light' }).click();
    });

    test('Dropdown Handling', async () => {
        const dropDownMenu = page.locator('ngx-header nb-select')
        await dropDownMenu.click()
    
        page.getByRole('list') //when the list has a UL tag
        page.getByRole('listitem') //when the list has LI tag
    
        /** Locator chaining
         *  const optionList = page.getByRole('list').locator('nb-option') */ 
       
        const optionList = page.locator('nb-option-list nb-option')
        await optionList.filter({hasText: "Cosmic"}).click()
        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
    })

});

test.describe('Tooltip on Hover Handling', async () => {
    test.beforeEach('Navigate to the Forms Initial App State', async () => {
        await page.goto('https://www.akveo.com/ngx-admin/themes');
        await expect(page).toHaveTitle("Ngx-admin themes for e-commerce dashboard on Angular 15+ and Nebular");
        await page.locator('nb-card-header', { hasText: 'Material Light' }).click();
        await page.getByRole('link',{name:'Modal & Overlays'}).click();
        await page.getByText('Tooltip').click();
    });

    test('Tooltip Handling', async () => {
        const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
        await toolTipCard.getByRole('button', {name: "Bottom"}).hover()
        page.getByRole('tooltip') //if you have a role tooltip created
        const tooltip = await page.locator('nb-tooltip').textContent()
        expect(tooltip).toEqual('This is a tooltip')
    })

});

test.describe('Browser Dialog Box Handling', async () => {
    test.beforeEach('Navigate to the Dialog Box', async () => {
        await page.goto('https://www.akveo.com/ngx-admin/themes');
        await expect(page).toHaveTitle("Ngx-admin themes for e-commerce dashboard on Angular 15+ and Nebular");
        await page.locator('nb-card-header', { hasText: 'Material Light' }).click();
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()
    });

    test('Dialog Box', async () => {

        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?');
            dialog.accept();
        })
        // Delay the click action for 1000 milliseconds and listener is created before which will accept the browser dialog box.
        await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click({delay: 1000});
        await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
    })

});