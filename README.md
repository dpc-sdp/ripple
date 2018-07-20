# Ripple

Ripple is a Vue.js component pattern library for SDP.

[![Vue.js 2.x](https://img.shields.io/badge/vue.js-2.x-green.svg?style=flat-square)](https://vuejs.org)
[![CircleCI](https://circleci.com/gh/dpc-sdp/ripple.svg?style=svg&circle-token=242dc8445ab25fb88fe506609fd7065cd1f78f7c)](https://circleci.com/gh/dpc-sdp/ripple)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## Intro

This git repo is a monorepo which contains all Ripple component packages.  [View all Ripple componet packages](packages/).

This git repo also contains a style guide site which uses [Storybook](https://storybook.js.org/) and can be used for local development environment.

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
import RplFooteryNavigation from '@dpc-sdp/ripple-footer-navigation'
```

## Contributing

We welcome contributions to Ripple. Check out [contributing guide](CONTRIBUTING.md).

## Export as a Static App

We can export this Ripple storybook site as a stacic app.

``` bash
# Build static storybook site into `storybook-static` directory.
npm run build-storybook
```

Then you can deploy it to GitHub pages or any static hosting service.

Find more info in [Exporting Storybook as a Static App](https://storybook.js.org/basics/exporting-storybook/).

## Lerna

We manage package deployments to npm using [lerna](https://github.com/lerna/lerna).

Package deployments are an automatic process as part of CI.



