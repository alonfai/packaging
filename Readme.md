# Package Challenge Application

---

This project was is bootstrapped to include a basic Node.js (16.x) environment.

It showcase an app having list of items needed to be fit in a package where each of these items has following parameters: index number, weight and cost. The target package has a weight limit.
The goal is to determine which things can be put into the package so that the total weight is less than or equal to the package limit and the total cost is as large as possible.
Furthermore, we prefer sending a package which weighs less in case there is more than one package with the same price.

This solution demonstrate part of the the DP family of algorithmic technique for solving optimization problems using recursions and has complexity of O(N\*W) where N is number of items to choose from, and W is the total weight /capacity of the package.

Additional constraints:

1. Max weight that a package can take is ≤ 100
2. There might be up to 15 items you need to choose from
3. Max weight and cost of an item is ≤ 100

---

The solution will be used as a cross platform capable to run using standard node.js app or in browser environment. Following publishing of the package the main entry point will be at `dist/index.js`

---

## NPM modules used

In this project, the main `npm` modules used are

- Typescript
- Jest (using ts-jest)
- Yarn
- Dotenv
- ESLint + Prettier
- lint-staged
- Nodemon
- Husky with git hooks support

---

## Pre-Requirements

A Node.js 16.x release is available on your machine. You can use [nvm](https://github.com/nvm-sh/nvm) to access different node releases. From the project root folder run `nvm use` to execute the recommended Node.js release
This app was tested with Node.js 16.14.0 release.

---

## Install

Clone the project and install [Yarn package manager](https://classic.yarnpkg.com/en/docs/install):

```bash
git clone https://github.com/alonfai/packaging-challenge

// Inside the project root run the following command to install necessary dependencies
yarn install
```

---

## Folder structure

All source code inside `src` folder. It contains the following modules:

- constants.ts - List of pre-defined constants values
- error.ts - List of pre-defined Error classes (e.g. APIException) to throw on several errors and/or constraints not been met.
- index.ts - Entry point for the app
- knapsack.ts - Main algorithm of the knapsack 0-1 DP programming
- packer.ts - Main class method that applies a pack search algorithm on list of items
- types.ts - pre-defined list of types/interfaces used in the app.
- utils.ts - list of utility helper functions

All \*.spec.ts files are part of the unit tests on the different source modules

![Alt Text](Image.png)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development/watch mode.

The app comes with a sample information file inside `data/example_input`. To see the outcome of this in your console, please apply the following steps:

1. Add .env file for reading environment variables inside your app.
2. add `NODE_ENV=development` inside your .env file.
3. Run `yarn start` inside your local bash environment.

This will then attempt to read the `data/example_input` file and displayed inside your console the output for the given input packs, plus storing these inside `data/data-output` file.

## `yarn test`

Launches the test environment with Jest

### `yarn test:watch`

Launches the test environment in watch mode

### `yarn test:coverage`

Launches the Jest test runner in coverage mode. It has an integrated coverage reporter that works well with ES6 and requires no configuration.

### `yarn build`

Builds the app for production to the `dist` folder. The output source can be then executed using `node dist/index.js`

### `yarn lint`

Executes `eslint` linter

### `yarn format`

Executes `eslint` linter and with auto fix mode on

### `yarn prettier`

Executes the `prettier` formatting module
