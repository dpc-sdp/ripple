# @dpc-sdp/nuxt-ripple-ui

> The Nuxt module for adding the Ripple pattern library.

## Setup

If you are using `@dpc-sdp/ripple-nuxt-tide`, you don't need any setup as `@dpc-sdp/ripple-nuxt-tide`
has built in setup already. For setup `@dpc-sdp/ripple-nuxt-tide`,
go to [packages/ripple-nuxt-tide doc](/packages/ripple-nuxt-tide/README.md).

### Option 1. Using `create-nuxt-app` (Work in progress)

To get started quickly, we has created scaffolding tool [create-ripple-app](/packages/create-ripple-app).
But this setup option is a work in progress at this stage and will be available
soon.

### Option 2. Adding to existing Nuxt project

Without using `create-nuxt-app`, you can setup it in your existing Nuxt site with
following steps.

#### Add `@dpc-sdp/ripple-nuxt-ui` dependency using yarn or npm to your project

Install with yarn

```shell
yarn add @dpc-sdp/ripple-nuxt-ui
```

Install with npm

```shell
npm install add @dpc-sdp/ripple-nuxt-ui
```

#### Add `@dpc-sdp/ripple-nuxt-ui` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    '@dpc-sdp/ripple-nuxt-ui'
  ],

  ripple: {
    // nuxt-ripple options
  }
}
```

## Custom Options

You can pass options using `ripple` section in `nuxt.config.js`

```js
{
  ripple: {
    viclogo: false // Don't display primary vic.gov.au logo
  }
}
```

Docs for Ripple options can be found in Ripple global component [/packages/components/Atoms/Global/README.md#rploptions](/packages/components/Atoms/Global/README.md#rploptions).
