import { logger } from '@dpc-sdp/ripple-nuxt-tide/lib/core'

export default function ({ $axios, app, res }) {

  $axios.onRequest(config => {
    // Log all axios' requests
    if (process.server) {
      const baseURL = config.baseURL.length > 1 ? config.baseURL.substring(0, config.baseURL.length - 1) : ''
      const fullUrl = baseURL + config.url
      logger.info('Making %s request to %s', config.method.toUpperCase(), fullUrl, {label: 'Axios', requestId: config.headers['X-Request-Id']})
      logger.debug('Headers %O', config.headers, {label: 'Axios'})
    }
    // Preview links authorisation.
    if (app.$auth) {
      config.headers.common['Authorization'] = `${app.$auth.getToken('drupal')}`
    }
  })

  $axios.onError(error => {
    let code
    if (error.code) {
      code = error.code
    } else if (error.response) {
      code = error.response.status
    }

    const responseUrl = error.request.path || error.request.responseURL || error.config.url

    // Check what kind of request it is.
    const routeRequest = responseUrl.includes('/route?')
    const authPreviewRequest = responseUrl.includes('&current_version=') || responseUrl.includes('&resourceVersion=')

    // Set http status code if a route or preview request failed.
    if (routeRequest || authPreviewRequest) {
      // We hide 403 and show it as 404
      code = code === 403 ? 404 : code

      app.tideResErrCode = code

      if (typeof res !== 'undefined') {
        res.statusCode = code
      }
    }
  })
}
