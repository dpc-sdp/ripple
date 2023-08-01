import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'
import * as createBundlerDefault from '@bahmutov/cypress-esbuild-preprocessor'
import apiMocking from './apiMock'

export const rplCypressConfigPlugin = async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config)
  const createBundler = createBundlerDefault
  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)]
    })
  )
  on('task', { ...apiMocking })

  return config
}
