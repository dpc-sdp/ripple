import eventListeners from './lib/index'

declare module '@nuxt/schema' {
  interface AppConfigInput {
    ripple?: {
      analytics?: {
        GTM: string
        routeChange: string | Function
        eventListeners: Record<string, any>
      }
    }
  }
}

export default defineAppConfig({
  ripple: {
    analytics: {
      // This will likely be shared across all SDP properties, but is configurable through appConfig
      GTM: 'GTM-KF8NCW2',
      // this can be a boolean to load the default behavior or an optional function to overload the default behavior
      routeChange: true,
      eventListeners
    }
  }
})
