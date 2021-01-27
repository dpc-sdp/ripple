import { logger } from '@dpc-sdp/ripple-nuxt-tide/lib/core'

export default function ({ $auth, $axios }) {

  $auth.onError((error, name, endpoint) => {
    if (process.server) {
      logger.debug('Auth error: "%O"', name, { error, label: 'Tide preview' })
    }
  })

  $axios.onError(error => {
    // Sometime BE will return login page instead of json error response if token is invalid
    if (error.response?.status === 401 && error.response?.data?.error === undefined) {
      logger.debug('Aixos error with no proper error, e.g HTML login page', { error, label: 'Tide preview' })
      $auth.reset()
    }
  })

}
