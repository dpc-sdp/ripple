import { logger } from '@dpc-sdp/ripple-nuxt-tide/lib/core'

export default function ({ $axios, app, res, isDev }) {

  $axios.onRequest(config => {
    // Log all axios' requests
    if (process.server) {
      const baseURL = config.baseURL.length > 1 ? config.baseURL.substring(0, config.baseURL.length - 1) : ''
      const fullUrl = baseURL + config.url
      logger.info('Making %s request to %s', config.method.toUpperCase(), fullUrl, {label: 'Axios', requestId: config.headers['X-Request-Id']})
      logger.debug('Headers %O', config.headers, {label: 'Axios'})
    }
  })

  $axios.onError(error => {
    let code
    if (error.code) {
      code = error.code
    } else if (error.response) {
      code = error.response.status
    }

    let responseUrl = error.request?.path || error.request?.responseURL || error.config?.url || ''

    // Check what kind of request it is.
    const routeRequest = responseUrl.includes('/route?')
    const authPreviewRequest = responseUrl.includes('&current_version=') || responseUrl.includes('&resourceVersion=')
    const shareRequest = responseUrl.includes('/share_link/')

    // Axios use 'ECONNABORTED' for error timeout.
    // https://github.com/axios/axios/issues/1543
    if (code === 'ECONNABORTED') {
      if (process.server || isDev) {
        logger.error("Request timeout: '%s'", responseUrl, {label: 'Axios'})
      }
    }

    // Set http status code if a route, preview or share request failed.
    if (routeRequest || authPreviewRequest || shareRequest) {
      // We hide 403 and show it as 404
      code = code === 403 ? 404 : code

      app.tideResErrCode = code

      if (typeof res !== 'undefined') {
        res.statusCode = code
      }
    }
  })
}
