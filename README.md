# Ripple

Ripple is a Vue.js component pattern library for SDP.

[![Vue.js 2.x](https://img.shields.io/badge/vue.js-2.x-green.svg?style=flat-square)](https://vuejs.org)
[![Build Status on CircleCI](https://circleci.com/gh/dpc-sdp/vic-gov-au.svg?style=shield&circle-token=7f9cd41903f5619915311a8ceee4e8784a485fbd)](https://circleci.com/gh/dpc-sdp/vic-gov-au)

## Intro

This git repo is a monorepo which contains all Ripple component packages.  [View all Ripple componet packages](packages/).

This git repo also contains a style guide site which uses [Storybook](https://storybook.js.org/) and can be used for local development environment.

## Install Ripple in your Nuxt project

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

We welcome contributions to Ripple. Check out [development start guide](docs/development-start-guide.md)
.

### Start dev server

We are using [Storybook](https://storybook.js.org/) as development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components.

``` bash
# install dependencies
npm install

# Start the storybook server
npm start
```

### Lint code

``` bash
# Boolean check if code conforms to linting rules - uses sass-lint & eslint
npm run lint
```

### Test

``` bash
# We uses Jest for unit test and snapshots test
npm test
```

Before commit changes, run test first. If new Ripple components changed, we should update snapshots by `npm test -- -u`. Then add it in commit.

### Build Setup

### Bay

- `npm run bay:start` - build and start local development environment.
- `npm run bay:stop` - stop all Bay containers.
- `npm run bay:destroy` - stop and remove all Bay containers.
- `npm run bay:logs` - get logs from all running Bay containers.
- `npm run bay:cli` - run a command in `node` container. Example: `npm run bay:cli -- ls -al`.
- `npm run bay:pull` - pull latest Bay containers.

## Export as a Static App

We can export this Ripple storybook site as a stacic app.

``` bash
# Build static storybook site into `storybook-static` directory.
npm run build-storybook
```

Then you can deploy it to GitHub pages or any static hosting service.

Find more info in [Exporting Storybook as a Static App](https://storybook.js.org/basics/exporting-storybook/).
