# Ripple

Ripple is a Vue.js component pattern library for SDP.

[![Vue.js 2.x](https://img.shields.io/badge/vue.js-2.x-green.svg?style=flat-square)](https://vuejs.org)
[![CircleCI](https://circleci.com/gh/dpc-sdp/ripple/tree/master.svg?style=svg&circle-token=242dc8445ab25fb88fe506609fd7065cd1f78f7c)](https://circleci.com/gh/dpc-sdp/ripple/tree/master)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## Intro

Visit our styleguide site for Ripple: [ripple.sdp.vic.gov.au](https://ripple.sdp.vic.gov.au).

This git repo is a monorepo which contains all Ripple component packages.
[View all Ripple componet packages](packages/).

This git repo also contains a styleguide site which uses
[Storybook](https://storybook.js.org/) and can be used for local development environment.

## Page template examples

Below are a list example page demos showing how to use Ripple components in your
Vue template.

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
