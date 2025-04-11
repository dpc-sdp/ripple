import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  let host = ''
  let protocol = 'https'

  const {
    public: { isStatic, siteUrl }
  } = useRuntimeConfig()

  // Get host in case of server side request
  if (import.meta.env.SSR) {
    host = nuxtApp?.ssrContext?.event?.req?.headers?.host || ''
  } else {
    host = window.location.host
  }

  if (process.env.NODE_ENV === 'development' && host.startsWith('localhost')) {
    protocol = 'http'
  }

  let origin = new URL(`${protocol}://${host}`)

  if (isStatic) {
    origin = new URL(siteUrl)
  }

  // Extract origin and set data in app context
  return {
    provide: {
      app_origin: origin.origin,
      app_hostname: origin.hostname
    }
  }
})
