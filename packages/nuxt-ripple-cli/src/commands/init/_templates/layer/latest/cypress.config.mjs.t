---
to: cypress.config.mjs
---
import 'dotenv/config'
import { defineConfig } from 'cypress'
import * as rplCypressConfigPkg from '@dpc-sdp/ripple-test-utils'

export default defineConfig({
  env: {
    searchIndex: process.env.NUXT_PUBLIC_TIDE_APP_SEARCH_ENGINE_NAME,
    NUXT_PUBLIC_TIDE_SITE: process.env.NUXT_PUBLIC_TIDE_SITE
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    specPattern: '**/*.{feature,feature.ts}',
    async setupNodeEvents(on, config) {
      await rplCypressConfigPkg.rplCypressConfigPlugin(on, config)
      return config
    }
  },
  blockHosts: ['*youtube.com', '*doubleclick.net']
})
