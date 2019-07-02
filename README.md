# Ripple

WARNING: This readme is out of date. This is work-in-progress beta version.
TODO: Rewrite this for ripple monorepo

Ripple is a Vue.js component pattern library for SDP.

## Requirements

- Install [nodejs](https://nodejs.org/en/)
- Install [yarn](https://yarnpkg.com/en/docs/install)

## Install

This git repo is a monorepo which contains all Ripple component packages.
[View all Ripple componet packages](packages/).

## Running Example

Ensure a populated `.env` exists within the `/examples/vic-gov-au/` directory.
You can use `/examples/vic-gov-au/example.env` as a template.

Run `yarn run start:example`

## Running Storybook

- [Landing page demo](https://ripple.sdp.vic.gov.au/?selectedKind=Templates&selectedStory=Landing%20page%20demo)

  Code example: [/src/storybook-components/Page.vue](/src/storybook-components/Page.vue)

- [Campain page demo](https://ripple.sdp.vic.gov.au/?selectedKind=Templates&selectedStory=Campaign%20page%20demo)

  Code example: [/src/storybook-components/Page.vue](/src/storybook-components/Page.vue)

- [Search page demo](https://ripple.sdp.vic.gov.au/?selectedKind=Templates&selectedStory=Search%20page%20demo)

  Code example: [/src/storybook-components/Page.vue](/src/storybook-components/Page.vue)

- [Event search page demo](https://ripple.sdp.vic.gov.au/?selectedKind=Templates&selectedStory=selectedStory=Event%20search%20page%20demo)

  Code example: [/src/storybook-components/Page.vue](/src/storybook-components/Page.vue)

## Install Ripple in your Nuxt project

_We will provide a start template soon. Below is just a simple example._

Example for installing `@dpc-sdp/ripple-global` and `@dpc-sdp/ripple-site-header`.

``` bash
npm install @dpc-sdp/ripple-global @dpc-sdp/ripple-site-header --save
```

## Usage in Nuxt project

``` javascript
import RplSiteHeader from '@dpc-sdp/ripple-site-header'
import RplBreadcrumb from '@dpc-sdp/ripple-breadcrumb'
import RplFooterNavigation from '@dpc-sdp/ripple-footer-navigation'
```

## Contributing

We welcome contributions to Ripple. Check out [contributing guide](CONTRIBUTING.md).

## Lerna

We manage package deployments to npm using [lerna](https://github.com/lerna/lerna).

Package deployments are an automatic process as part of CI.
