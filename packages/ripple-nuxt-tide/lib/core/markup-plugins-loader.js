import corePlugins from '../config/markup-plugins'
import logger from './logger'

const loader = (pluginConfig = []) => {
  let plugins = corePlugins
  if (pluginConfig.length > 0) {
    pluginConfig.forEach(path => {
      let morePlugins
      // Narrow the required pattern as Webpack will load all possible files based on dynamic require.
      // If we load all js under the config dir, some files like nuxt plugin will fail the compilation as these file requires special loader.
      // https://webpack.js.org/guides/dependency-management/#require-with-expression
      let pathMiddle = path.replace('tide.markup-plugins', '')

      try {
        if (pathMiddle.includes('~/tide/')) {
          pathMiddle = pathMiddle.replace('~/', '')
          morePlugins = require(`~/${pathMiddle}tide.markup-plugins`).default
        } else if (pathMiddle.includes('./../../modules/')) {
          pathMiddle = pathMiddle.replace('./../../modules/', '')
          morePlugins = require(`./../../modules/${pathMiddle}tide.markup-plugins`).default
        }

        if (Array.isArray(morePlugins) && morePlugins.length > 0) {
          plugins = [ ...plugins, ...morePlugins ]
        }
      } catch (error) {
        if (process.server) {
          logger.error(`Markup plugins couldn't be found in file "%s".`, path, error)
        }
      }
    })
  }
  return plugins
}

export default loader
