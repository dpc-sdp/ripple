# Nuxt Ripple Preview

> Ths packages adds support for drupal preview links within Ripple sites.

## Installation

To use this package in your Nuxt project first install it with `npm`

```bash
npm install @dpc-sdp/nuxt-ripple-preview
```

## Usage

Add the installed package in your sites `nuxt.config.js` file under the extends property, this includes the package as a [Nuxt Layer](https://nuxt.com/docs/getting-started/layers).

```js
export default defineNuxtConfig({
  extends: [
    '@dpc-sdp/nuxt-ripple-preview'
  ]
})
```

## Configuration

A client ID and cookie sign secret are required to use the preview functionality. These values are provided during site provisioning (contact SDP ops team).

[Runtime variables](https://nuxt.com/docs/guide/going-further/runtime-config) can be set in your sites `nuxt.config.js` file under the `tide` property.

```js
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      tide: {
        preview: {
          clientId: '',
          cookieSignSecret: ''
        }
      }
    }
  }
})
```

They can also be set as uppercase environment variables.

```
# OAuth client ID
NUXT_TIDE_PREVIEW_CLIENT_ID=
# OAuth client secret
NUXT_TIDE_PREVIEW_COOKIE_SIGN_SECRET=
```
