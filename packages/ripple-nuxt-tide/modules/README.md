# Adding a core submodule to `ripple-nuxt-tide`

## Add submodule

A new submodule ("newmodule") folder should be added within this folder `./`.

It can include:

#### `module.js`

For adding any custom vendors / plugins / routes / proxies, etc. Have a look at [Nuxt ModuleContainer](https://nuxtjs.org/api/internals-module-container) to learn more.

#### `tide.config.js`

```Javascript
const tideConfig = {
  // Include config is used for Tide API query relationship.
  include: {
    // Add custom content type config here.
    // Please convert Tide content type name to camelcase.
    // e.g 'landing-page' => 'landingPage'
    // Find an example in `https://github.com/dpc-sdp/ripple/blob/develop/packages/ripple-nuxt-tide/modules/event/tide.config.js`.
  },

  mapping: {
    // Find an example in https://github.com/dpc-sdp/ripple/blob/develop/packages/ripple-nuxt-tide/modules/event/tide.config.js
  }
}

module.exports = tideConfig
```

#### `tide.mapping-filters.js`

  If you need to preprocess the API field value during the mapping(in above `mapping` section of `tide.config.js`), you can use existing mapping filters or create new filter in this config file.
  Check an example in https://github.com/dpc-sdp/ripple/blob/develop/packages/ripple-nuxt-tide/modules/landing-page/mapping-filters.js

#### `tide.middleware.js`

  Check the doc in [example-middleware](https://github.com/dpc-sdp/ripple/tree/develop/examples/basic-examples/tide/modules/example-middleware/README.md)

#### `tide.load-components.js`

  This custom component load config is for user want to add a custom component in the dynamic component mapping.

  For example:
  You added a custom component named `YourCustomComponent.vue` in Nuxt `components/` dir.
  And you added the custom map config in `tide.config.js` because it will be dynamically mapped and added into landing page.
  Then you need to add load config like below to load the component dynamically.

  ```Javascript
  export default {
    'your-custom-component': () => import(/* webackChunkName: 'your-custom-component' */ '~/components/YourCustomComponent')
  }
  ```

#### `tide.page-types.js`

  Used for load a Tide(Drupal) content type page template.

  ```Javascript
  export default {
    pageTemplates: {
      'node--event': () => import('./pages/index.vue')
    }
  }
  ```

#### `tide.markup-plugins.js`

  Used for load custom markup plugins.

## Register core submodule in ripple-nuxt-tide

Now the core submodules are auto loaded as long as they are inside this directory, no extra register work required.

## Enable core submodule in nuxt.config.js

In `nuxt.config.js`, add `newmodule: 1` to enable submodule.

```js
// Tide submodules, 1 for enable, 0 for disable.
// Should match the Tide backend modules.
modules: {
  // ...
  newmodule: 1
},
```
