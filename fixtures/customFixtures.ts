import { test as base } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import AddEmployeePage from "../pages/addEmployeePage";
import { PageManager } from "../pages/pageManager"; 

export type PageFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  addEmployeePage: AddEmployeePage;
  pageManager: PageManager
}

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  addEmployeePage: async ({ page }, use) => {
    await use(new AddEmployeePage(page));
  },
  pageManager: async({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
}
});

export { expect } from "@playwright/test";
