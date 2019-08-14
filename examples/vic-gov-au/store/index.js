import { logger } from '@dpc-sdp/ripple-nuxt-tide/lib/core'

export const actions = {
  async nuxtServerInit ({ dispatch }) {
    try {
      await dispatch('tide/init')
    } catch (error) {
      if (process.server) {
        logger.error('Tide API server has an error.', { error, label: 'App' })
      }
      throw error
    }
  }
}
