---
to: app.config.ts
---
import pkg from './package.json'
import { getDpcPkgs } from '@dpc-sdp/ripple-tide-api/utils'
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  project: {
    name: pkg.name,
    version: pkg.version
  },
  ripple: {
    packages: getDpcPkgs({ ...pkg.dependencies, ...pkg.devDependencies }),
    version: pkg.dependencies['@dpc-sdp/nuxt-ripple'],
    // featureFlags and theme are usually populated from the Tide site taxonomy values. Use these for local testing development. See https://ripple.sdp.vic.gov.au/framework/guides/brand-application 
    featureFlags: {},
    theme: {}
  }
})