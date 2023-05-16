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
      // this can be a boolean to load the default behavior
      // or optional a function to overload the default behavior
      routeChange: true,
      eventListeners
    }
  }
})
