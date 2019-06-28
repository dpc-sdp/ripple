// import customMiddleware from '~/tide.middleware'

export const additionalMiddleware = (modules) => {
  let moduleMiddleware = {}

  if (modules.publication) {
    const publicationMiddleWare = require('@dpc-sdp/ripple-nuxt-tide/modules/publication/tide.middleware.js').default
    moduleMiddleware = {
      ...publicationMiddleWare
    }
  }
  return { ...moduleMiddleware }
}
