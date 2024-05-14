import { Console } from "console";
import { test  } from "../fixtures/customFixtures"
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
