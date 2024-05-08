# Ripple Tide Webform

> Ripple mappings and templates for the Tide webforms.

## Installation

To use this package in your Nuxt project first install it with `npm`.

```bash
npm install @dpc-sdp/ripple-tide-webform
```

## Usage

Add the installed package in your sites `nuxt.config.js` file under the extends property, this includes the package as a [Nuxt Layer](https://nuxt.com/docs/getting-started/layers).
This will add an API request endpoint for back end webform schemas, and front end support for form submissions.

```js
export default defineNuxtConfig({
  extends: [
    '@dpc-sdp/ripple-tide-webform'
  ]
})
```
