import 'dotenv/config'
import { defineConfig } from 'cypress'
import * as rplCypressConfigPkg from '@dpc-sdp/ripple-test-utils'

export default defineConfig({
  projectId: 'mie4kg',
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: '**/*.{feature,feature.ts}',
    supportFile: false,
    supportFolder: './test',
    downloadsFolder: './test/downloads',
    fixturesFolder: './test/fixtures',
    videosFolder: './test/videos',
    screenshotsFolder: './test/screenshots',
    async setupNodeEvents(on, config) {
      await rplCypressConfigPkg.rplCypressConfigPlugin(on, config)
      return config
    }
  },
  blockHosts: ['*youtube.com', '*doubleclick.net']
})
