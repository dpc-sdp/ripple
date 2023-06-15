# Ripple Tide Grant

> Ripple mappings and templates for the Tide Grant content type.

## Installation

To use this package in your Nuxt project first install it with `npm`.

```bash
npm install @dpc-sdp/ripple-tide-grant
```

## Usage

Add the installed package in your sites `nuxt.config.js` file under the extends property, this includes the package as a [Nuxt Layer](https://nuxt.com/docs/getting-started/layers).
This will add front end support for the `grant` content type.

```js
export default defineNuxtConfig({
  extends: [
    '@dpc-sdp/ripple-tide-grant'
  ]
})
```
