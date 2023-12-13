import { defineNuxtPlugin } from '#app'
import { logger } from '@dpc-sdp/ripple-tide-api'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      logger
    }
  }
})
