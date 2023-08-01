---
to: cypress.config.ts
---
import { defineConfig } from 'cypress'
import { rplCypressConfigPlugin } from '@dpc-sdp/ripple-test-utils'

export default defineConfig({
  env: {
    searchIndex: process.env.NUXT_PUBLIC_TIDE_APP_SEARCH_ENGINE_NAME
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: '**/*.{feature,feature.ts}',
    async setupNodeEvents (
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      await rplCypressConfigPlugin(on, config)
      return config
    }
  },
  blockHosts: ['*youtube.com', '*doubleclick.net']
})
