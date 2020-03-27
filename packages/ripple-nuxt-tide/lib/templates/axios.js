import { logger } from '@dpc-sdp/ripple-nuxt-tide/lib/core'

export default function ({ $axios, app, res, error }) {

  $axios.onRequest(config => {
    // Log all axios' requests
    if (process.server) {
      const baseURL = config.baseURL.length > 1 ? config.baseURL.substring(0, config.baseURL.length - 1) : ''
      const fullUrl = baseURL + config.url
      logger.info('Making %s request to %s', config.method.toUpperCase(), fullUrl, {label: 'Axios', requestId: config.headers['X-Request-Id']})
      logger.debug('Headers %O', config.headers, {label: 'Axios'})
    }
  })

  $axios.onResponseError(err => {
    let statusCode
    let message = 'Error'
    if (err.code) {
      statusCode = err.code
    } else if (err.response) {
      statusCode = err.response.status
    }

    const responseUrl = err.request.path || err.request.responseURL || err.config.url

    // Check what kind of request it is.
    const routeRequest = responseUrl.includes('/route?')
    const authPreviewRequest = responseUrl.includes('&current_version=') || responseUrl.includes('&resourceVersion=')

    // Set http status code if a route or preview request failed.
    if (routeRequest || authPreviewRequest) {
      // We hide 403 and show it as 404
      if (statusCode > 400 && statusCode < 500) {
        message = 'Page not found'
      } else if (statusCode > 499) {
        message = 'Error fetching page'
      }
      logger.info(`${message} - ${err.config.url}`, {label: 'Axios', requestId: err.config.headers['X-Request-Id']})
    } else {
      logger.info('Error fetching request', err.config.url, {label: 'Axios', requestId: err.config.headers['X-Request-Id']})
    }
    return Promise.reject({ statusCode, message })
  })
}
