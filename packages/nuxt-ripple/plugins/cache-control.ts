import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook('error', (error, { event }) => {
    if (event && (error as any).statusCode === 404) {
      setHeader(event, 'cache-control', 'public,max-age=30,must-revalidate')
    }
    if (event && (error as any).statusCode === 500) {
      setHeader(event, 'cache-control', 'no-cache')
    }
  })
})
