import tideDefaultPageTypes from '../config/tide.page-types'

export const getTemplate = (type, pageTypes = []) => {
  let templates = tideDefaultPageTypes.pageTemplates

  if (pageTypes.length > 0) {
    pageTypes.forEach(path => {
      try {
        let morePageTypes
        // Narrow the required pattern as Webpack will load all possible files based on dynamic require.
        // If we load all js under the config dir, some files like nuxt plugin will fail the compilation as these file requires special loader.
        // https://webpack.js.org/guides/dependency-management/#require-with-expression
        let pathMiddle = path.replace('tide.page-types', '')

        if (pathMiddle.includes('~/tide/')) {
          pathMiddle = pathMiddle.replace('~/tide/', '')
          morePageTypes = require(`~/tide/${pathMiddle}tide.page-types`).default
        } else if (pathMiddle.includes('./../../modules/')) {
          pathMiddle = pathMiddle.replace('./../../modules/', '')
          morePageTypes = require(`./../../modules/${pathMiddle}tide.page-types`).default
        }
        templates = { ...templates, ...morePageTypes.pageTemplates }
      } catch {
        if (process.server) {
          console.error(`Page template couldn't be found in file "${path}".`)
        }
      }
    })
  }
  return templates[type]
}
