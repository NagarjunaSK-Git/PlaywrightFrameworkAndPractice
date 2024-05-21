# BaseUICucumber
An End-to-End UI Test Automation Framework and practice UI actions based upon Playwright (v1.44), Node v20.

[![Playwright UI Automation Tests](https://github.com/NagarjunaSK-Git/PlaywrightFrameworkAndPractice/actions/workflows/uitests.yml/badge.svg)](https://github.com/NagarjunaSK-Git/PlaywrightFrameworkAndPractice/actions/workflows/uitests.yml)

## Quick Start
1) Install [Node Latest](https://nodejs.org/en/download/prebuilt-binaries)
2) Download and Install [Visual Studio Code](https://code.visualstudio.com/download)
3) VS Code Extension [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## Tech stack
<a href="https://playwright.dev/" target="_blank" rel="noreferrer"> 
<img src="https://playwright.dev/img/playwright-logo.svg" alt="Playwright" width="40" height="40"/> </a>
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> 
<img src="https://raw.githubusercontent.com/maciejkorsan/typescript-blue/master/logo.svg?sanitize=true" alt="TypeScript" width="40" height="40"/> </a>

## Running tests through from extension
Click on Testing in Left Widget for running test from Playwright Test for VSCode

## Running tests through NPM
Run test using command `npm run hrmtestPM --env=QA -- --grep @addemployeeHrm`

# Other NPM Command Samples
* Install browser `npm run browserinstall"`
* Run in Serial mode `npm run hrmtestPM --env=QA -- --workers=1 --grep '@addemployeeHrm'`
* Run in Parallel mode `npm run hrmtestPM --env=QA -- --workers=5 --grep '@addemployeeHrm'`
* Run in different environment `npm run hrmtestPM --env=UAT -- --workers=1 --grep "@PMaddemployeeHrm"`

##  Key Features
* Supports cross browser testing in local.

* Page object model design and samples are provided with Fixtures.

* Integrated with Github Actions for Continous Testing.

* Supports automatic generation of screeshots, traces

* Supports filtering of tests with playwright tags during runtime execution via grep command

* Supports parallel execution of scenarios which is configurable during runtime execution

* Supports environment during runtime execution and features can be extended

* Supports capturing screenshots with Playwright runner as structured with test steps

