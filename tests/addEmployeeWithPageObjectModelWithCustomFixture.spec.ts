import { test } from "../fixtures/customFixtures"
import { env } from "../frameworkConfig/env";


test("Add Employee on OrangeHRM @addemployeeHrm", async ({ loginPage, homePage, addEmployeePage }) => {

  await loginPage.visit();
  console.log("Print Passed params :", env.USERNAME, env.PASSWORD);
  await loginPage.login(env.USERNAME, env.PASSWORD);
  await homePage.getLeftMenuComponent().selectLeftMenuItem("PIM");
  await homePage.getTopMenuComponent().selectTopMenuItem("Add Employee");
  await addEmployeePage.addEmployee();
  await test.expect(addEmployeePage.successMessage).toBeVisible();
});

test("Add Employee on OrangeHRM PageManager @PMaddemployeeHrm", async ({ pageManager }, testInfo) => {
  // Added screenshots just to show the intent of using this but not really required to keep so many screenshots
  await test.step("Given: Launch application", async () => {
    await pageManager.getLoginPage().visit();
    await pageManager.getHelperBase().waitForNumberOfSeconds(2);
    await testInfo.attach('screenshot', { body: await pageManager.getHelperBase().takeScreenshot(), contentType: 'image/png' });
  });

  console.log("Print Passed params :", env.USERNAME, env.PASSWORD);

  await test.step("And: Login hrm application with credentails", async () => {
    await pageManager.getLoginPage().login(env.USERNAME, env.PASSWORD);
    await pageManager.getHelperBase().waitForSpinnerDisapperance();
    await testInfo.attach('screenshot', { body: await pageManager.getHelperBase().takeScreenshot(), contentType: 'image/png' });

  });

  await test.step("When: Select PIM and navigate to Add Employee", async () => {
    await pageManager.getHomePage().getLeftMenuComponent().selectLeftMenuItem("PIM");
    await pageManager.getHelperBase().waitForSpinnerDisapperance();
    await testInfo.attach('screenshot', { body: await pageManager.getHelperBase().takeScreenshot(), contentType: 'image/png' });
    await pageManager.getHomePage().getTopMenuComponent().selectTopMenuItem("Add Employee");
  });

  await test.step("Then: Fill employee details and submit and verify success message", async () => {
    await pageManager.getAddEmployeePage().addEmployee();
    await testInfo.attach('screenshot', { body: await pageManager.getHelperBase().takeScreenshot(), contentType: 'image/png' });
    await test.expect(pageManager.getAddEmployeePage().successMessage).toBeVisible();
    await pageManager.getHelperBase().waitForSpinnerDisapperance();
    await pageManager.getHelperBase().waitForNumberOfSeconds(2);
  });


});
