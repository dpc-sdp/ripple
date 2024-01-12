import addCucumberPreprocessorPluginPkg from '@badeball/cypress-cucumber-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { initPlugin } from '@frsource/cypress-plugin-visual-regression-diff/plugins'
import apiMocking from './apiMock.js'
const { addCucumberPreprocessorPlugin } = addCucumberPreprocessorPluginPkg

export const rplCypressConfigPlugin = async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config)
  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)]
    })
  )
  on('task', { ...apiMocking })
  initPlugin(on, config)
  return config
}
