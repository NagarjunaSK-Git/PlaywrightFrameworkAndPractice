import { Page } from "@playwright/test";

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
    .locator("form")
    .getByRole("textbox")
    .nth(4);
  private readonly saveButton = this.page.getByRole("button", { name: "Save" });
  public readonly successMessage = this.page.getByText(/Successfully Saved/i);

  async addEmployee() {
    await this.firstNameTextBox.fill("Test ");
    await this.lastNameTextBox.fill("Ar");
    await this.middleNameTextBox.fill("Automation");
    await this.idTextBox.fill("1234567890");
    await this.saveButton.click();
  }
}

export default AddEmployeePage;
