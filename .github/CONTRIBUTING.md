# Contributing

> When contributing or participating in discussions, ensure that you are following our [contributor code of conduct](https://github.com/dpc-sdp/ripple/blob/main/CODE_OF_CONDUCT.md)
> 

This repository is a mono repo that utilises `pnpm` workspaces, meaning multiple `npm` packages are contained within the `packages` directory.

## Pre-requisites

- [Node.js](https://nodejs.org/en/) (lts/iron i.e v20)
- [PNPM](https://pnpm.io/) (v10)

It is recommended to also use [NVM](https://github.com/nvm-sh/nvm) to manage node versions. NVM will use the correct version set in `.nvmrc` by running `nvm use`

## Getting started

Clone the repository `git clone git@github.com:dpc-sdp/ripple.git` then run `pnpm install` to install all dependencies.

### Development

There are three main ways to develop within Ripple Framework; working on isolated Ripple components within storybook, working Tide integration packages or layers utilizing the example nuxt app, and working on standalone `npm` packages.

#### Working on the Ripple component library 

Development for the core ui components (`@dpc-sdp/ripple-ui-core`), form ui components (`@dpc-sdp/ripple-ui-forms`) and maps ui components (`@dpc-sdp/ripple-ui-maps`) is done within storybook. To get started just run: 

```bash
pnpm run storybook
```

This will open a browser window with the storybook instance running. All UI components within these packages have an accompanying storybook story.  For a good example component that contains stories and cypress component tests please see [RplAccordion](https://github.com/dpc-sdp/ripple/tree/main/packages/ripple-ui-core/src/components/accordion).

New components can be scaffolded using the CLI tool, for example:

```
npx @dpc-sdp/nuxt-ripple-cli add component [DIRECTORY] --name {NAME} --prefix {PREFIX}
```

For more information on using the CLI please see [@dpc-sdp/nuxt-ripple-cli](https://github.com/dpc-sdp/ripple-framework/blob/develop/packages/nuxt-ripple-cli/README.md)

#### Working on Tide integration packages

For more on contributing to Tide packages, please see [Ripple Framework](https://github.com/dpc-sdp/ripple-framework/blob/develop/CONTRIBUTING.md).

## Coding standards

### Code style

Ripple uses [Prettier](https://prettier.io/) to allow developers to spend less time worrying about conforming to a specific code style. It's recommended that you set up Prettier in your IDE to format your work on save.

[ESLint](https://eslint.org/) is also used to improve code quality, linting can be run with `pnpm run lint`.

### Conventional Commits

Ripple uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to encourage meaningful commit messages. This is also for building the Ripple changelogs automatically. 

[Commitlint](https://commitlint.js.org/#/) is used to enforce the Conventional Commit format.

An example of a well-formed commit message is:

```
fix(@dpc-sdp/ripple-ui-core): fixed table font size for paragraphs and lists
```

### CSS structure

Ripple uses the [BEM (block, element, modifier)](https://getbem.com/) methodology to help structure CSS and avoid naming conflicts.

All ripple classes provided by ripple are prefixed by `rpl-` to prevent conflicts with CSS in other projects or libraries. For example:

- Component class name: `.rpl-[component-name]`
- Element class name: `.rpl-[component-name]__[element-name]`
- Modifier class name: `.rpl-[component-name]--[modifier-name]`

## Testing

### Linting

Linting is handled by `eslint` and `stylelint`; note stylelint is currently scoped to `@dpc-sdp/ripple-ui-core`

```bash
pnpm run lint
```

### Unit tests

Unit tests are important as they help us secure our processes, ensuring that the most critical parts of our projects are protected from accidental mistakes or oversights in development.

All unit tests are handled by [Vitest](https://vitest.dev/), and can be run with:

```bash
pnpm run test:unit
```

### Component tests

Component tests are run using [Cypress's component testing feature](https://docs.cypress.io/guides/component-testing/overview) and are used for Vue component testing.

The core component tests `@dpc-sdp/ripple-ui-core` can be run using:

```bash
pnpm run test:components-core
```

We also have component testing for the `@dpc-sdp/ripple-ui-forms` package:

```bash
pnpm run test:components-forms
```

## Releases

Ripple uses [release-please](https://github.com/googleapis/release-please) to automate releases based on [Conventional Commits](#conventional-commits). The release process is handled entirely through GitHub Actions.

## Ripple directory structure

The core Ripple directory structure is as follows:

- docs (the documentation site)
- examples (example applications)
- packages (this is where all npm packages are stored)
  - ripple-ui-core
  - ripple-ui-forms
  - ripple-ui-maps
  - etc
