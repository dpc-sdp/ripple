---
to: app.config.ts
---
import pkg from './package.json'
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  project: {
    name: pkg.name,
    version: pkg.version
  },
  ripple: {
    version: pkg.dependencies['@dpc-sdp/nuxt-ripple'],
    featureFlags: {
      contentCollectionSearchConnector: 'elasticsearch'
    },
    theme: {}
  }
})
