# Example for using ripple in Vue.js(Not Nuxt.js)

This is a example for using Ripple in a Vue.js app. For using it in Nuxt.js, please check [ripple-nuxt-ui](https://github.com/dpc-sdp/ripple/blob/develop/packages/ripple-nuxt-ui/README.md)

## Intro

This example is created by Vue cli as a clean project.

Two Ripple components installed just for demo how to install them.

### Dependencies

Install below dev dependencies in your Vue project to make icon work.

```
npm install sass-resources-loader --save-dev
```

### Webpack configs

Some config required for making things like icon working.

Check [/vue.config.js](/vue.config.js) for more details.

### Using Ripple components

Check [/src/App.vue](/src/App.vue) and [/src/components/HelloRipple.vue](/src/components/HelloRipple.vue) for more details.

### Install Ripple plugin

Optionally install [Ripple plugin]((https://github.com/dpc-sdp/ripple/tree/develop/packages/components/Atoms/Global#rploptions)) if you need to use some options.

We added it in this [/src/main.js](/src/main.js).

## Project setup
```
yarn install
```
or
```
npm install
```

### Compiles and hot-reloads for development
```
yarn serve
```
or
```
npm run serve
```
