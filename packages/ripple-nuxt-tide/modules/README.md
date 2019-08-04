# Adding a submodule to nuxt-tide

## Add submodule

A new submodule ("newmodule") folder should be added within this folder `./`.

It can include:

* `index.vue` file for rendering the page.
* `tide.config.js` for defining any field reference relationships.
* `module.js` for adding any custom vendors / plugins / routes / proxies, etc.
* `mapping-filters.js` for defining any field mappings.

## Register submodule in nuxt-tide

In `../lib/module.js`, under the `nuxtTide` function, submodule configurations
need to be added within the switch statement.

```js
case 'newmodule':
  // For config
  config = require('@dpc-sdp/ripple-nuxt-tide/modules/newmodule/tide.config.js')
  // For Module
  moduleHook = require('@dpc-sdp/ripple-nuxt-tide/modules/newmodule/module.js')
  // For Mapping Filters
  mappingFilters = require('@dpc-sdp/ripple-nuxt-tide/modules/newmodule/mapping-filters.js')
  break
```

## Add submodule page to Tide.vue

In `../lib/pages/Tide.vue`, add the new submodule `index.vue` to the `pageType`
switch statement.

```js
case 'node--newmodule':
  return () => import('./../../modules/newmodule/index.vue')
```

## Enable submodule in nuxt.config.js

In `../../../nuxt.config.js`, add `newmodule: 1` to enable submodule.

```js
// Tide submodules, 1 for enable, 0 for disable.
// Should match the Tide backend modules.
modules: {
  // ...
  newmodule: 1
},
```
