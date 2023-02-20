import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild'
import apiMocking from './apiMock'

import * as createBundler from '@bahmutov/cypress-esbuild-preprocessor'

export default {
  baseUrl: 'http://localhost:3000',
  specPattern: '**/*.{feature,feature.ts}',
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
}
