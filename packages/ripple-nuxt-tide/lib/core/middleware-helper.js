import coreMiddleware from './middleware'
import logger from './logger'

const getMiddleware = (middlewareConfig) => {
  let middleware = []
  if (middlewareConfig.length > 0) {
    middlewareConfig.forEach(path => {
      try {
        let additionalMiddleware
        // Narrow the required pattern as Webpack will load all possible files based on dynamic require.
        // If we load all js under the config dir, some files like nuxt plugin will fail the compilation as these file requires special loader.
        // https://webpack.js.org/guides/dependency-management/#require-with-expression
        let pathMiddle = path.replace('tide.middleware', '')
        if (pathMiddle.includes('~/tide/')) {
          pathMiddle = pathMiddle.replace('~/', '')
          additionalMiddleware = require(`~/${pathMiddle}tide.middleware`).default
        } else if (pathMiddle.includes('./../../modules/')) {
          pathMiddle = pathMiddle.replace('./../../modules/', '')
          additionalMiddleware = require(`./../../modules/${pathMiddle}tide.middleware`).default
        }
        for (const item in additionalMiddleware) {
          middleware.push(additionalMiddleware[item])
        }
      } catch {
        if (process.server) {
          logger.error(`Tide middleware couldn't be found in file "${path}".`)
        }
      }
    })
  }

  return middleware
}

export const callMiddleware = async (middlewareConfig, context) => {
  const pageData = {}
  try {
    // Call core middleware first
    await coreMiddleware(context, pageData)

    // Call other middleware, the order is core modules > custom root > custom modules.
    const middleware = getMiddleware(middlewareConfig)
    if (process.env.TIDE_DEBUG && process.server) {
      logger.log('debug', 'Tide middleware will be called: %O', middleware)
    }
    for (const item of middleware) {
      await item(context, pageData)
    }
  } catch (error) {
    if (process.server) {
      logger.error('Tide middleware got an error:', error)
    }
  }

  return pageData
}
