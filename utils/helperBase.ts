import { Page } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { test } from "../fixtures/customFixtures"


export class HelperBase{

     readonly page: Page;

    /**
     * Constructs a new instance of the HelperBase class.
     *
     * @param {Page} page - The Playwright Page fixture is getting passed.
     */
    constructor(page: Page){
        this.page = page;
    }

   async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000);
    }

    async provideEmployeeID(): Promise<number>{
        let id = faker.number.int({ min: 1000, max: 999999 });
        return id;
    }

    async takeScreenshot(): Promise<Buffer>{
        return await this.page.screenshot();
    }

    async waitForSpinnerDisapperance(){
        await test.expect(this.page.locator('.oxd-loading-spinner').first()).not.toBeVisible({ timeout: 4000 });
        await this.waitForNumberOfSeconds(1);
    }

   
}