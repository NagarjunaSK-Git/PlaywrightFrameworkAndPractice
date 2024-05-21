import { Page, expect } from "@playwright/test";
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage'
import AddEmployeePage from '../pages/addEmployeePage'
import { HelperBase } from "../utils/helperBase";


export class PageManager {

    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly homePage: HomePage;
    private readonly addEmployeePage: AddEmployeePage;
    private readonly helperBase: HelperBase;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.homePage = new HomePage(this.page);
        this.addEmployeePage = new AddEmployeePage(this.page);
        this.helperBase = new HelperBase(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }
    getHomePage() {
        return this.homePage;
    }
    getAddEmployeePage() {
        return this.addEmployeePage;
    }

    getHelperBase() {
        return this.helperBase;
    }


}
