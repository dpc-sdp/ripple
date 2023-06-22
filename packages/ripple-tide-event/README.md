# Ripple Tide Event

> Ripple mappings and templates for the Tide Event content type.

## Installation

To use this package in your Nuxt project first install it with `npm`.

```bash
npm install @dpc-sdp/ripple-tide-event
```

## Usage

Add the installed package in your sites `nuxt.config.js` file under the extends property, this includes the package as a [Nuxt Layer](https://nuxt.com/docs/getting-started/layers).
This will add front end support for the `event` content type.

```js
export default defineNuxtConfig({
  extends: [
    '@dpc-sdp/ripple-tide-event'
  ]
})
```
