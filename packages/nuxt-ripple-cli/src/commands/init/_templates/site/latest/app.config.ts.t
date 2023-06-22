---
to: app.config.ts
---
import { defineAppConfig } from '#imports'
import pkg from './package.json'

export default defineAppConfig({
  project: {
    name: pkg.name,
    version: pkg.version,
  },
  ripple: {
    version: pkg.dependencies['@dpc-sdp/nuxt-ripple'],
    featureFlags: {
      contentCollectionSearchConnector: 'elasticsearch'
    },
    theme: {}
  }
})
