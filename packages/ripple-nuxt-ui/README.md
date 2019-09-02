# @dpc-sdp/nuxt-ripple-ui

> The Nuxt module for adding the Ripple pattern library.

## Setup

If you are using `@dpc-sdp/ripple-nuxt-tide`, you don't need any setup as `@dpc-sdp/ripple-nuxt-tide`
has built in setup already. For setup `@dpc-sdp/ripple-nuxt-tide`, go to [packages/ripple-nuxt-tide](/packages/ripple-nuxt-tide/README.md)

### Using `create-nuxt-app` (Working in progress)

To get started quickly, we has created scaffolding tool [create-ripple-app](/packages/create-ripple-app).
But this setup option is working in progress at this stage and will be available
soon.

### Add to existing Nuxt project

Without using `create-nuxt-app`, you can setup it in your existing Nuxt site with
following steps.

#### Add `@dpc-sdp/ripple-nuxt-ripple` dependency using yarn or npm to your project

Install with yarn

```shell
yarn add @dpc-sdp/ripple-nuxt-ripple
```

Install with npm

```shell
npm install add @dpc-sdp/ripple-nuxt-ripple
```

#### Add `@dpc-sdp/ripple-nuxt-ripple` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    'dpc-sdp/ripple-nuxt-ripple'
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

Docs for Ripple options can be found in Ripple global component [/packages/components/Atoms/Global/README.md#rploptions](/packages/components/Atoms/Global/README.md#rploptions)
