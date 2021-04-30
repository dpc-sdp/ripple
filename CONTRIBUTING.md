# Contributing to Ripple

## Prerequisites

Please have the *latest* stable versions of the following on your machine

- node
- yarn

## Local environment setup

### Ripple component library

We are using [Storybook](https://storybook.js.org/) as development environment
for UI components. It allows you to browse a component library, view the
different states of each component, and interactively develop and test components.

``` bash
# install dependencies
yarn

# Start the storybook server
yarn start:storybook
```

### Tide integration

Apart from Ripple component library, we have several packages used for Nuxt.js app and Tide integration.

You can use our example app for the work. The example application requires a working [Tide](https://github.com/dpc-sdp/tide) Drupal installation to connect to.

Ensure a populated `.env` exists within the `/examples/vic-gov-au/` directory.
You can use `/examples/vic-gov-au/example.env` as a template.

```bash
# install dependencies
yarn

# Start the example site server
yarn start:example

```

## Test

### Lint code

``` bash
yarn lint
```

### Unit Test

#### Storybook testing

Add all components into storybook.

Run `yarn test:unit` to test [Storyshots](https://www.npmjs.com/package/@storybook/addon-storyshots).

New storytest will be added automatically at first time.
Update storyshots tests if you need by `yarn test:unit -u`.

``` bash
# We use Jest for unit test and snapshots test
yarn test:unit
```

**Storyshots is temporarily removed due to a open issue in storybook project.**

Chromatic is the tool for visual testing, it's running in CircleCI for pull request.

If you want to run it in local:

``` bash
cd src && yarn chromatic --project-token $CHROMATIC_APP_CODE
```

Some story need to display dynamic content like date element. It will fail the visual test.
To ignore them, check: https://www.chromatic.com/docs/ignoring-elements#ignore-dom-elements.

### Unit testing

Unit tests are important. They help us secure our processes and work flows, ensuring that the most critical parts of our projects are protected from accidental mistakes or oversights in our development. We use both Jest and Vue testing utility called [vue-test-utils](https://vue-test-utils.vuejs.org/).

### End to end testing

[Cypress](https://www.cypress.io/) end to end testing is used for testing our Tide integration.

Most of the tests are maintained in `ripple-test-tools` package.

``` bash
yarn test:e2e
```

## Release

We use [lerna](https://github.com/lerna/lerna) to manage packages in this monorepo. The details are documented internally.

## Documentation

``` bash
# Update docs automatically
cd src && yarn docs
```

**Note: there is a issue in generate storybook link for mdx stories, will be fixed after MDX docs migration**

### Updating ripple dependencies

``` bash
# Update all ripple dependencies (./package.json & ./packages/**/package.json)
cd src && yarn package-dependencies
```

This script requires:

- Each ripple component package to have a `package.json` file with `name`
- The root directory to have a `lerna.json` file with `version`

### Create new packages

``` bash
# Generate a new package in the `./packages/**/` directory
cd src && yarn new-package "[Name]" "[Description]" "[Atoms / Molecules / Organisms]"
```

Example: Creating a new package 'My Package' in the Organism folder:

``` bash
cd src && yarn new-package "My Package" "A demonstration package." "Organisms"
```

After creating a new package:

- Generate the readme using `yarn docs`.
- Update `package.json` by using `yarn package-dependencies`.

## Directory Structure

### The `packages` Directory

This directory contains our packages. `components` subfolder contains all Ripple components.

### The `src` Directory

This directory contains storybook site app code.

### The `examples` Directory

This directory contains example code for demo how to use Ripple.

### The `scripts` Directory

This directory contains scripts for project maintaining purpose.

## Coding standards

### CSS

When we write css for Ripple component, a `rpl` prefix is needed.
Use [BEM](http://getbem.com/introduction/) methodology to name css class.

- **Component class name:**  .rpl-[component-name]
- **Element class name:**  .rpl-[component-name]__[element-name]
- **Modifier class name:**  .rpl-[component-name]--[modifier-name]

Formatting rules is defined in `.sass-lint.yml`.

### Javascript

ESLint configuration is in `.eslintrc.js`.
