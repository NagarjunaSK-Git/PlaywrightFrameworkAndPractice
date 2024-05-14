import { Page, expect } from "@playwright/test";
import  LoginPage  from '../pages/loginPage';
import  HomePage  from '../pages/homePage'
import  AddEmployeePage from '../pages/addEmployeePage'


export class PageManager{

    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly homePage: HomePage;
    private readonly addEmployeePage: AddEmployeePage;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.homePage = new HomePage(this.page);
        this.addEmployeePage = new AddEmployeePage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }
    getHomePage(){
        return this.homePage;
    }
    getAddEmployeePage(){
        return this.addEmployeePage;
    }

}
