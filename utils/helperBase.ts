import { Page } from "@playwright/test";


export class HelperBase{

    readonly page: Page

    /**
     * Constructs a new instance of the HelperBase class.
     *
     * @param {Page} page - The Playwright Page fixture is getting passed.
     */
    constructor(page: Page){
        this.page = page
    }

    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }
}