import 'dotenv/config'
import { defineConfig } from 'cypress'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')

import { resolve } from 'pathe'
import apiMocking from './test/mockttp'
const testFolder = resolve(__dirname, './test')

export default defineConfig({
  projectId: 'mie4kg',
  env: {
    searchIndex: process.env.NUXT_PUBLIC_TIDE_APP_SEARCH_ENGINE_NAME,
    products_url: '/products'
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: '**/*.{feature,feature.ts}',
    supportFile: `${testFolder}/support/index.ts`,
    supportFolder: testFolder,
    downloadsFolder: `${testFolder}/downloads`,
    fixturesFolder: `${testFolder}/fixtures`,
    videosFolder: `${testFolder}/videos`,
    screenshotsFolder: `${testFolder}/screenshots`,
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin(on, config)
      // implement node event listeners here
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)]
        })
      )
      on('task', { ...apiMocking })

      return config
    }
  },
  blockHosts: ['*youtube.com', '*doubleclick.net']
})
