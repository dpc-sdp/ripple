import eventListeners from './lib/index'

declare module '@nuxt/schema' {
  interface AppConfigInput {
    ripple?: {
      analytics?: {
        routeChange: boolean | Function
        eventListeners: Record<string, any>
      }
    }
  }
}

export default defineAppConfig({
  ripple: {
    analytics: {
      eventListeners
    }
  }
})
