
<img src="/docs/public/assets/img/ripple-header-title.png" alt="Ripple framework" style="margin-top: -70px;" />


<a href="https://www.ripple.sdp.vic.gov.au/">
  <img src="https://img.shields.io/badge/ripple_framework-docs-ef4b5e" alt="ripple docs">
</a>

<a href="https://www.ripple.sdp.vic.gov.au/storybook">
  <img src="https://img.shields.io/badge/ripple_framework-storybook-ef4b5e" alt="ripple storybook">
</a>

<a href="https://github.com/dpc-sdp/ripple-framework/actions/workflows/components.yml">
  <img src="https://img.shields.io/github/actions/workflow/status/dpc-sdp/ripple-framework/main.yml" alt="build status">
</a>


# Ripple 2.0


<!-- TABLE OF CONTENTS -->
**Table of Contents**
- [About the project](#about-the-project)
  - [Ripple Framework](#ripple-framework)
  - [Usage](#usage)
  - [Availability](#availability)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## About the project

Ripple is the design system for Victorian government digital products.

Ripple is a system of reusable styles, components, patterns and tools for building brand Victoria digital products. Developed by the Single Digital Presence (SDP) team within the Department of Government Services, Ripple strives to:

- make it easier for citizens to find, understand and use government information
- ensure users can easily navigate sites regardless of technical ability, location or device
- allow designers and developers to create consistent Brand Victoria digital products
- increase the speed of delivery for digital products and services

Over 50 government websites use Ripple to date, including our main vic.gov.au platform. These sites attract the visitation of millions of views per month.

### Ripple Framework

The Ripple design system consists of the design elements and components used to build websites using the Victorian government brand and Ripple _framework_, a collection of [Nuxt](https://www.ripple.sdp.vic.gov.au/framework/key-concepts/nuxt/) modules and [layers](https://www.ripple.sdp.vic.gov.au/framework/key-concepts/nuxt-layers) primarily used to create headless SDP websites using the [Tide Drupal CMS](https://github.com/dpc-sdp/tide).

Ripple components are built using Vue 3 and [TypeScript](https://github.com/dpc-sdp/ripple-framework/blob/develop/tsconfig.json).

The monorepo is managed with pnpm [workspaces](https://github.com/dpc-sdp/ripple-framework/blob/develop/pnpm-workspace.yaml), using [Node.js](.nvmrc).

Tests use [Jest](https://github.com/dpc-sdp/ripple-framework/blob/develop/jest.config.js), [Axe-core](https://github.com/dpc-sdp/ripple-framework/blob/develop/packages/ripple-ui-core/stories/interactions.js) and [Cypress](packages/ripple-test-utils).

We use custom rules for [ESLint](https://github.com/dpc-sdp/ripple-framework/blob/develop/packages/eslint-config-ripple/index.js) and [Stylelint](https://github.com/dpc-sdp/ripple-framework/blob/develop/packages/stylelint-config-ripple/index.js).

### Usage

Ripple was built as a whole to implement front end sites for SDP using a framework of Vue 3 and Nuxt 3, but parts of the modular architecture can be used independently: `ripple-ui-core` and `ripple-ui-forms` can be used as UI component libraries for any Vue 3 project.

There is also an experimental web components implementation, and a standalone export of all Ripple design system CSS. See the [relevant section](https://ripple.sdp.vic.gov.au/design-system/develop/usage/) on the Ripple documentation site for more details.

### Availability

Note: Ripple 2 will only be hosted on Github Packages, any packages still published to npm are either pre-release or deprecated, and should not be used. Please see the section [Access to Github Packages repos](https://www.ripple.vic.gov.au/design-system/develop/usage#access-to-github-packages-repos) for instructions on how to set up a personal access token, and where to use it.

## Documentation

See https://www.ripple.sdp.vic.gov.au/ for more information about the Ripple design system.

For information about using Ripple in SDP websites see the [Ripple Framework](https://www.ripple.sdp.vic.gov.au/framework) section.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) as well as https://www.ripple.sdp.vic.gov.au/design-system/develop/contributing/ for information about how to submit changes to Ripple.

## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.
