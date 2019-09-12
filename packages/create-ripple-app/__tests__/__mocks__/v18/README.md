# vic-gov-au

> Nuxt.js front end client for vic-gov-au

- [Prerequisites](#prerequisites)
- [Local environment setup](#local-environment-setup)
- [Development Guide](#development-guide)

## Prerequisites

Please have the *latest* stable versions of the following on your machine

- node
- npm

## Local environment setup

### Run server

``` bash
# install dependencies
npm install

# Start the local dev server
npm run dev
```

Local URL -- [http://localhost:3000](http://localhost:3000)

### Lint code

``` bash
# Boolean check if code conforms to linting rules - uses sass-lint, eslint & markdownlint
npm run lint
```

### Test

``` bash
# Run integration test which checks if the Tide backend is up and a demo landing page can be rendered
npm test:smoke
```

## Development Guide

Basically, custom dev work only happens in two files:

- [assets/_theme.scss](assets/_theme.scss)
- [assets/_custom.scss](assets/_custom.scss)

For more Ripple document, please check [https://github.com/dpc-sdp/ripple/](https://github.com/dpc-sdp/ripple/blob/production/README.md).

### Custom variables

We are using Ripple pattern library [https://ripple.sdp.vic.gov.au/](https://ripple.sdp.vic.gov.au/) in this project.

You can orveride [Ripple](https://github.com/dpc-sdp/ripple) scss variables in
[assets/_theme.scss](assets/_theme.scss) such as colour.

Currently all scss variables with `!default` in Ripple can be overridden.
We will build a guide of variables in future. But for now, you can check [Ripple packages](https://github.com/dpc-sdp/ripple/blob/master/packages/components) scss files if you want to go deep.

### Custom scss

You can overide styles in [assets/_custom.scss](assets/_custom.scss) by adding any site specific styles.

### Custom static files

For custom images, favicons, analytics JavaScript files, you can replace them in [static](static) directory.
