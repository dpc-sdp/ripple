import 'dotenv/config'
import { defineConfig } from 'cypress'
import * as rplCypressConfigPkg from '@dpc-sdp/ripple-test-utils'

export default defineConfig({
  projectId: 'mie4kg',
  env: {
    searchIndex: process.env.NUXT_PUBLIC_TIDE_APP_SEARCH_ENGINE_NAME,
    NUXT_PUBLIC_TIDE_SITE: process.env.NUXT_PUBLIC_TIDE_SITE
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: '**/*.{feature,feature.ts}',
    supportFile: false,
    downloadsFolder: './test/downloads',
    fixturesFolder: './test/fixtures',
    videosFolder: './test/videos',
    screenshotsFolder: './test/screenshots',
    async setupNodeEvents(on, config) {
      await rplCypressConfigPkg.rplCypressConfigPlugin(on, config)
      return config
    }
  },
  retries: {
    runMode: 3,
    openMode: 0
  },
  blockHosts: ['*youtube.com', '*doubleclick.net']
})
