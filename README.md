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
  <a href="https://circleci.com/gh/dpc-sdp/ripple/tree/master">
    <img src="https://circleci.com/gh/dpc-sdp/ripple/tree/master.svg?style=svg&circle-token=242dc8445ab25fb88fe506609fd7065cd1f78f7c">
  </a>
  <a href="https://vuejs.org">
    <img src="https://img.shields.io/badge/vue.js-2.x-green.svg?style=flat-square">
  </a>
  <a href="https://lernajs.io/">
    <img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg">
  </a>
  <a href="https://www.npmjs.com/package/@dpc-sdp/ripple-global">
    <img src="https://img.shields.io/npm/v/@dpc-sdp/ripple-global.svg" alt="Version">
  </a>
</p>
<p align="center">
    <!-- <br />
    <a href="https://dpc-sdp.github.io/sdp-docs/ripple/"><strong>Documentation Site »</strong></a>
    <br />
    <br /> -->
    <a href="https://ripple.sdp.vic.gov.au/">Storybook</a>
    <!-- <a href="http://app-ripple-develop.lagoon.vicsdp.amazee.io">Reference Ripple site</a> -->
</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
  * [Browser Support](#browser-support)
* [Usage](#usage)
  * [Use without Tide Backend](#use-without-tide-backend)
  * [Use with Tide integration](#use-with-tide-integration)
* [Contributing](#contributing)
* [Support](#support)
* [License](#license)
* [Attribution](#attribution)

<!-- ABOUT THE PROJECT -->
## About The Project

[Ripple](https://github.com/dpc-sdp/ripple) is a library of [Vue.js](https://vuejs.org/) components packaged into a standalone front-end application that serves as a presentation layer for websites built on the SDP platform maintained by [Victorian Government](vic.gov.au) as part of [Single Digital Presence](https://www.singledigitalpresence.vic.gov.au/) initiative.

Ripple offers Victorian Government agencies an open, flexible and [consistent design system](https://www.singledigitalpresence.vic.gov.au/ripple-design-system) that reduces the cost and effort of digital development while focusing on delivering consistent user experience for the benefit of the public.

Ripple components library is hosted at [https://ripple.sdp.vic.gov.au](https://ripple.sdp.vic.gov.au/)

## What is included

Ripple includes a library of fully open reusable components based on atomic pattern design,  [Vue.js](https://vuejs.org/)  and [Nuxt](https://nuxtjs.org/) modules to deliver a consistent look and feel for the users and a starter kit for agencies to streamline the development.

It consists of the following packages:

| Project name | Version | Repository | Description |
| :---         |     :---:      |    :---:      |          :--- |
| Ripple component library packages| <a href="https://www.npmjs.com/package/@dpc-sdp/ripple-global"><img src="https://img.shields.io/npm/v/@dpc-sdp/ripple-global.svg" alt="Version"></a> | [@dpc-sdp/ripple](https://github.com/dpc-sdp/ripple/blob/master/RIPPLE_COMPONENTS.md) | A reusable Vue.js component library based upon an atomic design systems. See them on Ripple [storybook](https://ripple.sdp.vic.gov.au). | 
| Create Ripple App   | <a href="https://www.npmjs.com/package/@dpc-sdp/create-ripple-app"><img src="https://img.shields.io/npm/v/@dpc-sdp/create-ripple-app" alt="Version"></a>   | [@dpc-sdp/create-ripple-app](https://github.com/dpc-sdp/ripple/blob/master/packages/create-ripple-app)  | A tool that provides one easy command create a Nuxt.js project with Ripple and Tide integration. |
| Ripple Nuxt UI   | <a href="https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-ui"><img src="https://img.shields.io/npm/v/@dpc-sdp/ripple-nuxt-ui.svg" alt="Version"></a>   | [@dpc-sdp/ripple-nuxt-ui](https://github.com/dpc-sdp/ripple/blob/master/packages/ripple-nuxt-ui)  | A Nuxt.js module to add Ripple component library for Nuxt.js projects. |
| Ripple Nuxt Tide   | <a href="https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-tide"><img src="https://img.shields.io/npm/v/@dpc-sdp/ripple-nuxt-tide.svg" alt="Version"></a>   | [@dpc-sdp/ripple-nuxt-tide](https://github.com/dpc-sdp/ripple/blob/master/packages/ripple-nuxt-tide)  | A Nuxt.js module to add Ripple and Tide integration for Nuxt.js projects. |
| Ripple Test Tools   | <a href="https://www.npmjs.com/package/@dpc-sdp/ripple-test-tools"><img src="https://img.shields.io/npm/v/@dpc-sdp/ripple-nuxt-tide.svg" alt="Version"></a>   | [@dpc-sdp/ripple-test-tools](https://github.com/dpc-sdp/ripple/tree/master/packages/ripple-test-tools)  | Cypress.io helper library for testing a ripple nuxt site and tide backend. |
| Ripple Tide Search API  | <a href="https://www.npmjs.com/package/@dpc-sdp/ripple-tide-search-api"><img src="https://img.shields.io/npm/v/@dpc-sdp/ripple-tide-search-api.svg" alt="Version"></a>   | [@dpc-sdp/ripple-tide-search-api](https://github.com/dpc-sdp/ripple/tree/master/packages/ripple-test-tools)  | Exposes an API for connecting to Tide's internal search API. |


### Built With

* [Vue](https://vuejs.org/)
* [Nuxt](https://nuxtjs.org)

### Browser support

Ripple components support all **modern browsers**, including IE11.

## Usage

**You’ll need to have Node 10.16.0 or later version on your local development machine**. We recommend using the latest LTS version. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

Ripple components are published individually as npm packages and can be imported in any Vue project. See the [List of packages](https://github.com/dpc-sdp/ripple/blob/master/RIPPLE_COMPONENTS.md).

### Use without Tide Backend

**Jump to [Use with Tide integration](#use-with-tide-integration) if you are going to use Ripple with SDP [Tide](https://github.com/dpc-sdp/tide) Backend**

#### Use Ripple in Vue.js app

Check out our example Vue.js app: [Vue app example](https://github.com/dpc-sdp/ripple/tree/master/examples/vue-example-app).

#### Use Ripple in Nuxt.js(SSR) app

For users using Nuxt.js - you can use our Nuxt module [@dpc-sdp/ripple-nuxt-ui](https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-ui) to add Ripple components library to your project. This configures `@dpc-sdp/ripple-global` and adds required webpack config.

Please see [@dpc-sdp/ripple-nuxt-ui](https://github.com/dpc-sdp/ripple/blob/master/packages/ripple-nuxt-ui/README.md) for details.

Learn more about Ripple configuration at [packages/components/Atoms/Global/README.md](https://github.com/dpc-sdp/ripple/blob/master/packages/components/Atoms/Global/README.md)

### Use with Tide integration

If you are building a website with a [Tide](https://github.com/dpc-sdp/tide) Drupal content backend, follow below installation guide.

#### Preparing the backend

Before starting front-end development, you need your site to be setup in Tide backend (Content Repository) first. 
Tide is designed to support content across multiple sites at once. The segregation of such content between sites is achieved via taxonomy terms - each site is represented as a term in "Sites" vocabulary of your backend.

If not already present, add a new term that will represent your site and fill-in required fields (navigate to Structure -> Taxonomy -> Sites):

```bash
<your-backend-url>/admin/structure/taxonomy/manage/sites/overview
```

Make sure to note down the term ID as it is the `site_id` that you will need to provide when setting up Ripple instance.

_(If you do not have access to the backend please seek assistance from your SDP team.)_

NOTE: Although not marked as required, when creating your Site term you would want to specify the site's homepage. The homepage field is a reference to existing site content so make sure you have created a page that will serve as a homepage and reference it.

#### Installation with using create-ripple-app

This is easiest way to start a new project from scratch.

```bash
npx @dpc-sdp/create-ripple-app <my-project>
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a package runner tool that comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

The tool will prompt you for project details such as project name, domain, backend URL, Site ID, basic auth, tide modules to install, preferred package manager (npm or yarn), elastic search details (URL, index, username, password), Options to End-to-End and unit tests, code samples etc.

Most of the above are self-explanatory and can be tweaked later if needed. The setup tool will add `.env` and `nuxt.config.js` files to the root of the project folder where you will be able to change the config.

Upon the successful completion of the project setup you can start the local server:

```bash
npm run dev
``` 

Assumed all the environmental variables are correct and your backend site is accessible you should be able to access the front-end instance at http://localhost:3000/

Learn more at [packages/create-ripple-app/README.md](https://github.com/dpc-sdp/ripple/blob/master/packages/create-ripple-app/README.md)

#### Manual Installation

You also can add [@dpc-sdp/ripple-nuxt-tide](https://www.npmjs.com/package/@dpc-sdp/ripple-nuxt-tide) to an existing Nuxt.js project. This adds `@dpc-sdp/ripple-nuxt-ui` as a dependency, no need to add it yourself.

Please see [@dpc-sdp/ripple-nuxt-tide](https://github.com/dpc-sdp/ripple/blob/master/packages/ripple-nuxt-tide/README.md) for details of installation and configuration.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) first.

Ripple includes both a component explorer using Storybook and an example reference application.

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
