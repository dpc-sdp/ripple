import eventListeners from './lib/index'

declare module '@nuxt/schema' {
  interface AppConfigInput {
    ripple?: {
      analytics?: {
        routeChange: boolean | Record<string, Function>
        eventListeners: Record<string, any>
      }
    }
  }
}

export default defineAppConfig({
  ripple: {
    analytics: {
      routeChange: true,
      eventListeners
    }
  }
})
