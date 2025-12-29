import { Page } from "@playwright/test";
import  { HelperBase } from '../utils/helperBase';

class AddEmployeePage {

  constructor(private readonly page: Page) {}

  private readonly firstNameTextBox = this.page.getByRole("textbox", {
    name: "First Name",
  });
  private readonly lastNameTextBox = this.page.getByRole("textbox", {
    name: "Last Name",
  });
  private readonly middleNameTextBox = this.page.getByRole("textbox", {
    name: "Middle Name",
  });
  private readonly idTextBox = this.page
    .locator('xpath=(//div[contains(@class,\'orangehrm-employee-form\')]//input)[4]');

  private readonly saveButton = this.page.getByRole("button", { name: "Save" });
  public readonly successMessage = this.page.getByText(/Successfully Saved/i);

  async addEmployee() {
    await this.firstNameTextBox.fill("Test");
    await this.lastNameTextBox.fill("Ar");
    await this.middleNameTextBox.fill("Automation");
    let employeeID = (await new HelperBase(this.page).provideEmployeeID()).toString();
    await this.idTextBox.fill(employeeID);
    await new HelperBase(this.page).waitForNumberOfSeconds(3);
    await this.saveButton.click();
  }
}

export default AddEmployeePage;
