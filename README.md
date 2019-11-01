<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://github.com/dpc-sdp/ripple">
    <img src="docs/sdp-ripple.png" alt="Logo" height="150">
  </a>
</p>
<p align="center">
  <i>Ripple is the frontend framework for Single Digital Presence, delivered using Nuxt and Vue.js.</i>
</p>
<p align="center">
  <a href="https://circleci.com/gh/dpc-sdp/ripple/tree/master"><img src="https://circleci.com/gh/dpc-sdp/ripple/tree/master.svg?style=svg&circle-token=242dc8445ab25fb88fe506609fd7065cd1f78f7c"></a>
  <a href="https://vuejs.org"><img src="https://img.shields.io/badge/vue.js-2.x-green.svg?style=flat-square"></a>
  <a href="https://lernajs.io/"><img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg"></a>
</p>
<p align="center">
    <br />
    <a href="https://dpc-sdp.github.io/sdp-docs/ripple/"><strong>Documentation Site »</strong></a>
    <br />
    <br />
    <a href="https://ripple.sdp.vic.gov.au/">Storybook</a>
    ·
    <a href="http://app-ripple-develop.lagoon.vicsdp.amazee.io">Reference Ripple site</a>
</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Usage](#usage) 
  * [In a Nuxt application](#in-a-Nuxt-application)
  * [In a Vue project](#in-a-vuejs-projectnot-nuxtjs)
* [Contributing](#contributing)
  * [Getting Started](#getting-started)
  * [Requirements](#requirements)
  * [Installation](#install)
  * [Example app](#running-example-application)
  * [Storybook](#running-storybook)
* [Usage](#usage)  
* [Support](#support)
* [License](#license)
* [Attribution](#attribution)


<!-- ABOUT THE PROJECT -->
## About The Project

Ripple is the presentation layer for building websites on the DPC Single Digital Presence platform. 
It includes :

- A reusable component library based upon an atomic design system.
- Modules for the universal rendering framework [_Nuxt_](https://nuxtjs.org) to create websites using the [_Tide_](https://github.com/dpc-sdp/tide) Drupal backend.
- Helper utilities to run UI tests on Ripple sites.
- A tool to scaffold new Nuxt projects using ripple and tide


### Built With

* [Vue](https://vuejs.org/)
* [Nuxt](https://nuxtjs.org)
* [Storybook](https://storybook.js.org/)


## Usage

Ripple is a monorepo which contains several packages published to NPM

[@dpc-sdp/ripple-nuxt-tide](https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-tide) - Package for integrating a Tide backend into a Ripple site. Docs: [packages/ripple-nuxt-tide/README.md](https://github.com/dpc-sdp/ripple/blob/develop/packages/ripple-nuxt-tide/README.md)

[@dpc-sdp/ripple-nuxt-ui](https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-ui) - Adds Ripple component library to a Nuxt site, can be used independently of @dpc-sdp/ripple-nuxt-tide. Docs: [packages/ripple-nuxt-ui/README.md](https://github.com/dpc-sdp/ripple/blob/develop/packages/ripple-nuxt-ui/README.md)

Ripple Vue component library 
[@dpc-sdp/ripple-global](https://www.npmjs.com/package/@dpc-sdp/ripple-global) - Each Ripple Vue component is published individually to NPM, See Ripple global for usage.

### In a Nuxt application

Ripple is primarily used to build websites using the [Nuxt](https://nuxtjs.org) framework.

_For examples on how to use Ripple in a Nuxt application, please refer also to the [Documentation](https://dpc-sdp.github.io/sdp-docs/ripple/)_

#### With Tide

If you are working with a Tide Drupal content backend you can add [@dpc-sdp/ripple-nuxt-tide](https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-tide), this adds `@dpc-sdp/ripple-nuxt-ui` as a dependency, no need to add it yourself.

*Installation*

`npm install @dpc-sdp/ripple-nuxt-tide` OR `yarn add @dpc-sdp/ripple-nuxt-tide`

Add `@dpc-sdp/ripple-nuxt-tide` to modules key in `nuxt.config.js` eg:
```
modules: ['@dpc-sdp/ripple-nuxt-tide']
```

You also need to add a `tide` property as a configuration object. Please see [@dpc-sdp/ripple-nuxt-tide](https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-tide) for details on configuration and extending `ripple-nuxt-tide`.

#### Without Tide

If you are not using a Tide backend you can use [@dpc-sdp/ripple-nuxt-ui](https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-ui) to add Ripple components without the Tide dependency.
This configures @dpc-sdp/ripple-global and adds required webpack config.

*Installation*
`npm install @dpc-sdp/ripple-nuxt-ui` OR `yarn add @dpc-sdp/ripple-nuxt-ui`

Add `@dpc-sdp/ripple-nuxt-ui` to modules key in `nuxt.config.js` eg:
```modules: ['@dpc-sdp/ripple-nuxt-ui']```

You can optionally pass options to `@dpc-sdp/ripple-nuxt-ui` by adding the `ripple` key to `nuxt-config.js` - See [@dpc-sdp/ripple-nuxt-ui](https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-ui) for details.

#### In a Vue.js project(Not Nuxt.js)

Ripple components are published individually as npm modules and can be imported in any Vue project.

Check out our [Vue app example](https://github.com/dpc-sdp/ripple/tree/develop/examples/vue-example-app).

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) first.

Ripple includes both a component explorer using Storybook and an example reference application. 

### Requirements

- Install [nodejs](https://nodejs.org/en/) (^v10.0.0)
- Install [yarn](https://yarnpkg.com/en/docs/install) (currently npm is unsupported)

### Install

Run `yarn install`

### Running Example Application

The example application requires a working [Tide](https://github.com/dpc-sdp/tide) Drupal installation to connect to.

Ensure a populated `.env` exists within the `/examples/vic-gov-au/` directory.
You can use `/examples/vic-gov-au/example.env` as a template.

Run `yarn run start:example`

### Running Storybook

Run `yarn run start:storybook`


## Support
[Digital Engagement, Department of Premier and Cabinet, Victoria, Australia](https://github.com/dpc-sdp) is a maintainer of this package.

<!-- LICENSE -->
## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.

## Attribution
Single Digital Presence offers government agencies an open and flexible toolkit to build websites quickly and cost-effectively.

<!-- SDP LOGO -->
<br />
<p align="center">
  <a href="https://github.com/dpc-sdp/ripple">
    <img src="docs/sdp-vicgov.jpg" alt="Logo" height="150">
  </a>
</p>

The Department of Premier and Cabinet partnered with Salsa Digital to deliver Single Digital Presence. As long-term supporters of open government approaches, they were integral to the establishment of SDP as an open source platform.

<p align="center">
  <a href="https://salsadigital.com.au">
    <img src="docs/salsa-logo.png" alt="Logo" height="150">
  </a>
</p>
