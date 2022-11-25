# Package Challenge Application

---

This project was is bootstrapped to include a basic Node.js (16.x) environment.

It showcase an app having list of items needed to be fit in a package where each of these items has following parameters: index number, weight and cost. The targetpackage has a weight limit.
The goal is to determine which things can be put into the package so that the total weight is less than or equal to the package limit and the total cost is as large as possible.
Furthermore, we prefer sending a package which weighs less in case there is more than one package with the same price.

---

## NPM modules used

In this project, the main `npm` modules used are

- Typescript
- Jest (using ts-jest)
- Yarn
- ESLint + Prettier
- lint-staged
- Nodemon
- Husky with git hooks support

---

## Pre-Requirements

A Node.js 16.x release is available on your machine. You can use [nvm](https://github.com/nvm-sh/nvm) to access different node releases. From the project root folder run `nvm use` to execute the recommended Node.js release
This app was tested with Node.js 16.14.0 release

---

## Install

Clone the project and install [Yarn package manager](https://classic.yarnpkg.com/en/docs/install):

```bash
git clone https://github.com/alonfai/packaging-challenge

// Inside the project root run the following command to install necessary dependencies
yarn install
```

---

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development/watch mode.

## `yarn test`

Launches the test environment with Jest

### `yarn test:watch`

Launches the test environment in watch mode

### `yarn test:coverage`

Launches the Jest test runner in coverage mode. It has an integrated coverage reporter that works well with ES6 and requires no configuration.

### `yarn build`

Builds the app for production to the `dist` folder.

### `yarn lint`

Executes `eslint` linter

### `yarn format`

Executes `eslint` linter and with auto fix mode on

### `yarn prettier`

Executes the `prettier` formatting module
