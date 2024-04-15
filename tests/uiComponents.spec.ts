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
        const firstOptionLocator = page.getByRole('radio', { name: 'Option 1' });
        const secondOptionLocator = page.getByRole('radio', { name: 'Option 2' });
        /**check method on radio button will verify if it is already check or radio button and then perform the action if required.
         * force: true option is provided to check if they are hidden by CSS for any reason and it will bypass 
         * Playwright default isHidden check for the webelements
        */
        await firstOptionLocator.waitFor({ state: 'visible' });
        await firstOptionLocator.check({ force: true });
        await expect(firstOptionLocator).toBeChecked();
        await secondOptionLocator.check({ force: true });
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
        await optionList.filter({ hasText: "Cosmic" }).click()
        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
    })

});

test.describe('Tooltip on Hover Handling', async () => {
    test.beforeEach('Navigate to the Modal', async () => {
        await page.goto('https://www.akveo.com/ngx-admin/themes');
        await expect(page).toHaveTitle("Ngx-admin themes for e-commerce dashboard on Angular 15+ and Nebular");
        await page.locator('nb-card-header', { hasText: 'Material Light' }).click();
        await page.getByRole('link', { name: 'Modal & Overlays' }).click();
        await page.getByText('Tooltip').click();
    });

    test('Tooltip Handling', async () => {
        const toolTipCard = page.locator('nb-card', { hasText: "Tooltip Placements" })
        await toolTipCard.getByRole('button', { name: "Bottom" }).hover()
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
        await page.getByRole('table').locator('tr', { hasText: "mdo@gmail.com" }).locator('.nb-trash').click({ delay: 1000 });
        await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
    })

});

test.describe('Web Table Handling', async () => {
    test.beforeEach('Navigate to the Web Table', async () => {
        await page.goto('https://www.akveo.com/ngx-admin/themes');
        await expect(page).toHaveTitle("Ngx-admin themes for e-commerce dashboard on Angular 15+ and Nebular");
        await page.locator('nb-card-header', { hasText: 'Material Light' }).click();
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()
    });

    test('WebTables Handling Example1', async () => {

        // Modify the 3rd row of the web table by choosing via email id and update the age for that record.
        const targetRow = page.getByRole('row', { name: "twitter@outlook.com" });
        //click on pencil symbol
        await targetRow.locator('.nb-edit').click();
        //same locator targetRow will not work as the DOM changed as it was dynamic and age field became input type.
        await page.locator('input-editor').getByPlaceholder('Age').clear();
        await page.locator('input-editor').getByPlaceholder('Age').fill('35');
        // click on tick mark symbol to update the row record.
        await page.locator('.nb-checkmark').click();

    })

    test('WebTables Handling Example2', async () => {

        // Modify the unique row of the web table by choosing id (unique property) and update the email id for that record.

        // navigate to page 2
        await page.locator('.ng2-smart-pagination-nav').getByText('2').click();

        /**
         * Try the below code and observe the exception,
         *    const targetRowById = page.getByRole('row', {name: "11"});
         * It searches the row tag (tr) in entire table and resolves to multiple elements (two here) as 11 is present in 
         * both id column and age column
         */
        const targetRowById = page.getByRole('row', { name: "11" });
        //const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')});
        await targetRowById.locator('.nb-edit').click();
        await page.locator('input-editor').getByPlaceholder('E-mail').clear();
        await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com');
        await page.locator('.nb-checkmark').click();
        await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com');

    })

    test('WebTables Handling Example3', async () => {

        /**
         * Use Below command for running this test alone as double quotes is important for test filter grep -g 
         * npx playwright test uiComponents.spec.ts -g "WebTables Handling Example3"
         * */

        // Navigate through all the results from page 1 and print both first and last name
        const pageOneRows = page.locator('tbody tr');
        await page.waitForTimeout(2000);
        for (let eachRow of await pageOneRows.all()) {
            const firstNameLoc = eachRow.locator('td').nth(2);
            const secondNameLoc = eachRow.locator('td').nth(3);
            const firstName = await firstNameLoc.textContent();
            const secondName = await secondNameLoc.textContent();
            console.log(`${firstName} ${secondName}`);

        }


    })

});

test.describe('Date Picker Handling', async () => {
    test.beforeEach('Navigate to the Dialog Box', async () => {
        await page.goto('https://www.akveo.com/ngx-admin/themes');
        await expect(page).toHaveTitle("Ngx-admin themes for e-commerce dashboard on Angular 15+ and Nebular");
        await page.locator('nb-card-header', { hasText: 'Material Light' }).click();
        await page.getByText('Forms').click();
        await page.getByText('Datepicker').click();
    });

    test('Datepicker Box', async () => {
        const calendarInputField = page.getByPlaceholder('Form Picker');
        await calendarInputField.click();
        /** Class value is selected as such only the available date can be picked rather than hidden one.
         * exact true in locator match is provided else it will look for contains of text and will create issue
         * such as by providing .getByText('1') will match dates 1, 12, 21, 31 , 16 etc and many
         */
        await page.locator('[class="day-cell ng-star-inserted"]').getByText('13', { exact: true }).click();
        await expect(calendarInputField).toHaveValue('Apr 13, 2024');


        /**
         * Just read the below code and try to understand what it does
         * 
        let date = new Date()
        date.setDate(date.getDate() + 7)
        const expectedDate = date.getDate().toString()
        const expectedMonthShot = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`
    
        let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        }
        await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
        
        await expect(calendarInputField).toHaveValue(dateToAssert)
            */


        // Directly filling the date by typing if allowed in UI
        await calendarInputField.fill('Apr 14, 2024');
        // click on relevant label to hide the opened calendar 
        await page.getByText('Common Datepicker').click();



        /**Get the today date and add 7 calendar days , accepted format change and compare calendar and expected month year until they 
        match, get out of loop and select the date and assert. */

    })

});

test.describe('Slider Mouse Actions Handling', async () => {
    test.beforeEach('Navigate to the Slider', async () => {
        await page.goto('https://www.akveo.com/ngx-admin/themes');
        await expect(page).toHaveTitle("Ngx-admin themes for e-commerce dashboard on Angular 15+ and Nebular");
        await page.locator('nb-card-header', { hasText: 'Material Light' }).click();
        await page.getByRole('link', { name: 'IoT Dashboard' }).click();
    });

    test('Slider Element', async () => {

        // Update attribute when moving the slider. Values are feeded by manually observing the attribute values manually.
        const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');

        /**https://playwright.dev/docs/evaluating
         * 
         * const status = await page.evaluate(async () => {
            const response = await fetch(location.href);
            return response.status;
          });

          Other example:
          const locator = page.locator('button');
a         await locator.evaluate((node) => node.click());

          The node/element parameter in the locator.evaluate() method is a reference to the element that the locator matches. 
          (here it is some button element)
          This parameter can be used to access the element's properties and methods, or to execute JavaScript code on the element.
          The node/element parameter can be used to perform any action that can be performed on a DOM element. 
          This makes the locator.evaluate() method a very powerful tool for interacting with web pages.
    
          */
        await tempGauge.evaluate(ele => {
            ele.setAttribute('cx', '232.630');
            ele.setAttribute('cy', '232.630');
        });
        await tempGauge.click();

        /** Mouse movement
         * Approach is not really recommended personally and moving mouse might hinder this action while running locally.
        const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
        await tempBox.scrollIntoViewIfNeeded();
    
        const box = await tempBox.boundingBox();
        const x = box?.x + box?.width / 2;
        const y = box?.y + box?.height / 2;
        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(x +100, y);
        await page.mouse.move(x+100, y+100);
        await page.mouse.up();
        await expect(tempBox).toContainText('30'); */
    });

});

