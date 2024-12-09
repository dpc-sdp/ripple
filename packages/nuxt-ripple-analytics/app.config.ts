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
      eventListeners
    },
    featureFlags: {
      newRelicBrowserBeacon: 'bam.nr-data.net',
      newRelicBrowserJSErrorsEnabled: true,
      newRelicBrowserCookiesEnabled: false,
      newRelicBrowserDistributedTracingEnabled: false,
      newRelicBrowserAjaxDenyList: ['bam.nr-data.net']
    }
  }
})
