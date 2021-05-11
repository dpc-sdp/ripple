# Tide Modules

This directory contains your custom Tide modules.

Tide Modules are `@dpc-sdp/ripple-nuxt-tide` extensions which can extend its core
functionality and add endless integrations.

## Register your Tide modules

In your project `tide/tide.config.js` add your Tide module as below:

```Javascript
const tideConfig = {
  modules: [
    'my-tide-module'
  ]
}

module.exports = tideConfig
```

## Register NPM package to Tide

In your project `tide/tide.config.js`, add site specific custom config as below:

```Javascript
const tideConfig = {
  nodeModules: [
    ['@other-org/custom-tide-module'],
    ['@other-org/custom-tide-module-with-configs', { optionA: 'my value', optionB: 'other value' }]
  ]
}
```

## Write a basic Module

### Module name

We use `Kebab` name convention for module name. Example `my-tide-module`.

Always add project specific name prefix on your module name. For example, your
project name is `Multicultural commission`, then you can use `mc` as your prefix.

Always use name to tell what this module is doing. For example, the module is going
to add a custom content type called `location`, then your module name should be `mc-location`.

### Module files

Please have a look at the docs for developing Tide modules https://github.com/dpc-sdp/ripple/blob/develop/packages/ripple-nuxt-tide/modules/README.md
