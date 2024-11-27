import { defineNuxtPlugin } from '#app'
import trackError from '../utils/trackError'

export default defineNuxtPlugin((nuxtApp) => {
  /* @ts-ignore process is extended by webpack */
  if (process.client) {
    nuxtApp.vueApp.use({
      install(app: any) {
        useNewRelicBrowserAgent()

        const existingErrorHandler = app.config.errorHandler

        // Catch all vue errors
        app.config.errorHandler = (error: Error) => {
          console.error(error)
          trackError(error)

          // Allow multiple error handlers to run
          if (
            existingErrorHandler &&
            typeof existingErrorHandler === 'function'
          ) {
            existingErrorHandler(error)
          }
        }
      }
    })
  }
})
