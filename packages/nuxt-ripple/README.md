# Nuxt Ripple

> A Nuxt module for integrating Ripple and Tide, this package loads `@dpc-sdp/ripple-ui-core` and `@dpc-sdp/ripple-ui-forms`.

## Installation

To use this package in your Nuxt project first install it with `npm`

```bash
npm install @dpc-sdp/nuxt-ripple
```

## Usage

Add the installed package in your sites `nuxt.config.js` file under the extends property, this includes the package as a [Nuxt Layer](https://nuxt.com/docs/getting-started/layers).

```js
export default defineNuxtConfig({
  extends: [
    '@dpc-sdp/nuxt-ripple'
  ]
})
```

## Configuration

[Runtime variables](https://nuxt.com/docs/guide/going-further/runtime-config) can be set in your sites `nuxt.config.js` file under the `tide` property. 

```js
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: '',
      tide: {
        site: '8888',
        baseUrl: 'https://develop.content.reference.sdp.vic.gov.au',
        config: {
          apiPrefix: '/api/v1',
          auth: {
            username: 'dpc',
            password: 'sdp'
          }
        }
      }
    }
  }
})
```

They can also be set as uppercase environment variables starting with `NUXT_` and using `_` to separate keys and case changes.

```
NUXT_PUBLIC_TIDE_SITE=8888
NUXT_PUBLIC_TIDE_BASE_URL=https://develop.content.reference.sdp.vic.gov.au
```
