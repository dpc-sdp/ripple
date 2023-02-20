---
to: app.config.ts
---
import { defineNuxtConfig } from 'nuxt/config'
import pkg from './package.json'
export default defineAppConfig({
  project: {
    name: '<%= name %>',
    version: pkg.version,
  },
  ripple: {
    version: pkg.dependencies['@dpc-sdp/nuxt-ripple'],
    featureFlags: {},
    theme: {}
  }
})
