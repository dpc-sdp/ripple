# Ripple UI Core

> A Vue 3 UI component library. [View the Ripple storybook](https://www.ripple.sdp.vic.gov.au/storybook) to start exploring available components.

## SDP Platform (Tide)

If you're using this package within a Tide environment you don't need to directly install it, it will be installed as a dependency of `@dpc-sdp/nuxt-ripple` and all components will be available globally, if you wish to be explicit you can import them from `#components`.

```js
<template>
  <RplButton>My Button</RplButton>
</template>
```

The details below relate to using this package outside of Tide.

## Installation

```bash
npm install @dpc-sdp/ripple-ui-core
```

## Usage (Nuxt)

Ripple UI Core exports a Nuxt 3 module that you can add to your nuxt config, note the addition of `/nuxt`.

```js
export default defineNuxtConfig({
  modules: [
    '@dpc-sdp/ripple-ui-core/nuxt'
  ]
})
```

Note: Nuxt 2 is not supported.

There is no need to import the components as they will be registered globally by the nuxt module.

```vue
<template>
  <RplButton>My Button</RplButton>
</template>
```

#### Custom icons

Within a Nuxt application or layer just place custom icons (svgs) within an `assets/icons` directory, they can then be used with the `RplIcon` component. For example `assets/icons/icon-moon.svg` can be used as `<RplIcon name="icon-moon" />`

## Usage (Vue)

To use a component, import it from `@dpc-sdp/ripple-ui-core/vue`, note the addition of `/vue`.

```vue
<script setup>
  import { RplButton } from '@dpc-sdp/ripple-ui-core/vue';
</script>

<template>
  <RplButton>My Button</RplButton>
</template>
```

Some global styles will also need to be imported, do this at the root of your project (usually in your app.vue or index.js file).

```js
import '@dpc-sdp/ripple-ui-core/style';
```
