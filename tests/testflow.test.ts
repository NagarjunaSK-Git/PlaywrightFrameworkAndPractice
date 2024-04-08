import { test, expect } from '@playwright/test';

test.beforeAll("Before ALL order 1", async () => {
    console.log("Before ALL order 1");
});


test.beforeAll("Before ALL order 2", async () => {
    console.log("Before ALL order 2");
});

test.beforeEach("Before Each order 2", async () => {
    console.log("Before Each order 2");
});

test.beforeEach("Before Each order 1", async () => {
    console.log("Before Each order 1");
});

test.afterEach("After Each order 2", async () => {
    console.log("After Each order 2");
});


test.afterEach("After Each order 1", async () => {
    console.log("After Each order 1");
});




test.afterAll("After ALL order 1", async () => {

    console.log("After ALL order 1");
});


test.afterAll("After ALL order 2", async () => {
    console.log("After ALL order 2");

});


test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
