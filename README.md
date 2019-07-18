# Ripple

[![Vue.js 2.x](https://img.shields.io/badge/vue.js-2.x-green.svg?style=flat-square)](https://vuejs.org)
[![CircleCI](https://circleci.com/gh/dpc-sdp/ripple/tree/master.svg?style=svg&circle-token=242dc8445ab25fb88fe506609fd7065cd1f78f7c)](https://circleci.com/gh/dpc-sdp/ripple/tree/master)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/dpc-sdp/ripple">
    <img src="/docs/logo.png" alt="Logo" height="100">
  </a>

  <h3 align="center">Ripple</h3>

  <p align="center">
    <br />
    <a href="https://github.com/dpc-sdp/ripple/blob/master/CONTRIBUTING.md"><strong>Contributing »</strong></a>
    <br />
    <br />
    <a href="https://dpc-sdp.github.io/sdp-docs/ripple/">Documentation Site</a>
    <a href="https://ripple.sdp.vic.gov.au/">Storybook</a>
    <a href="http://app-ripple-develop.lagoon.vicsdp.amazee.io">Reference Ripple site</a>
    <a href="https://github.com/dpc-sdp/ripple/issues">Submit an issue</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Requirements](#requirements)
  * [Installation](#install)
  * [Example app](#running-example-application)
  * [Storybook](#running-storybook)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)


<!-- ABOUT THE PROJECT -->
## About The Project

Ripple is the presentational layer for building websites on the DPC Single Digital Presence platform. 
It includes :

- A reusable component library based upon an atomic design system.
- Modules for the universal rendering framework _Nuxt_ to create websites using a _Tide_ Drupal backend.
- Helper utilities to run UI tests on Ripple sites.


### Built With

* [Vue](https://vuejs.org/)
* [Nuxt](https://nuxtjs.org)


<!-- GETTING STARTED -->
## Getting Started

Ripple includes both a component explorer using Storybook and an example reference application. 


### Requirements

- Install [nodejs](https://nodejs.org/en/) (^v10.0.0)
- Install [yarn](https://yarnpkg.com/en/docs/install)

### Install

Run `yarn install`

### Running Example Application

The example application requires a working [Tide](https://github.com/dpc-sdp/tide) Drupal installation to connect to.

Ensure a populated `.env` exists within the `/examples/vic-gov-au/` directory.
You can use `/examples/vic-gov-au/example.env` as a template.

Run `yarn run start:example`

### Running Storybook

Run `yarn run start:storybook`


<!-- USAGE EXAMPLES -->
## Usage

_For examples on how to use ripple, please refer to the [Documentation](https://dpc-sdp.github.io/sdp-docs/ripple/)_


<!-- CONTRIBUTING -->
## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)



<!-- LICENSE -->
## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.



<!-- CONTACT -->
<!-- TODO - Find appropriate contact for issues -->
<!-- ## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name) -->
