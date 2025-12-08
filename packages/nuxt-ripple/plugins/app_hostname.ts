import { defineNuxtPlugin } from '#app'
import { useRuntimeConfig } from '#imports'

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

  if (
    process.env.NODE_ENV === 'development' &&
    ['localhost', '[::1]'].includes(host)
  ) {
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
