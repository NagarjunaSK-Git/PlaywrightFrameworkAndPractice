import { defineConfig } from '@playwright/test';
import { config } from 'dotenv';

//https://www.npmjs.com/package/dotenv

/**  
Step1: Initialize command
npm ci

Step2: Command to install playwright
npm run browserinstall

Step3: Commands to run script
npm run hrmtest --env=UAT
*/
if (process.env.npm_config_env) {
  console.log("ENVIRONMENT: ", process.env.npm_config_env);
  config({
    path: `.env.${process.env.npm_config_env}`,
    override: true,
  });
} else{
  config({
    path: `.env.QA`,
    override: true,
  });
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. 
  workers: process.env.CI ? 2 : undefined,*/
   workers: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 3 * 60 * 1000,
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',

    
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromiumheaded',
      use: { 
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
          headless: false
        },
       },
    },
    {
      name: 'chromechannel',
      use: { 
        /** Use this channel when it is needed to use the locally installed chrome browser, 
         * comment it for using chromium engine which is recommended*/ 
        channel: 'chrome'
       },
    },
    {
      name: 'chromiumheadless',
      use: { 
        viewport: {width:1440,height:900 },
        launchOptions: {
          args:['--start-maximized'],
          headless: true
        },
        },
    },
    // Setup project for saving the login state
    { 
      name: 'setupsave', 
      testMatch: /authStorageSetup\.spec\.ts/ 
    },
    {
      name: 'saveloginstate',
      use: { 
        viewport: null,
        channel: 'chrome',
        launchOptions: {
          args: ['--start-maximized'],
          headless: false
        },
       },
       dependencies: ['setupsave'],
    }

   /**  {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
