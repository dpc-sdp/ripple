import { defineNuxtPlugin, useAppConfig, useRuntimeConfig } from '#app'
import { loadScript } from '@gtm-support/core'
import { trackEvent } from '../lib/tracker'
import routeChange from '../lib/routeChange'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

const setupDataLayer = () => {
  /*eslint-disable no-prototype-builtins */
  if (typeof window !== undefined && !window.hasOwnProperty('dataLayer')) {
    window.dataLayer = []
  }
}

const setupGTM = (GTM_ID: string) => {
  if (GTM_ID) {
    // Add tracking code to page with loadScript
    loadScript(GTM_ID, { defer: true, compatibility: false })
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig()?.ripple
  const runtimeConfig = useRuntimeConfig()?.public?.tide
  const eventListeners: Record<string, any> =
    appConfig?.analytics?.eventListeners

  /* @ts-ignore process is extended by webpack */
  if (process.client) {
    nuxtApp.hook('tide:page', ({ page, site }) => {
      const route = useRoute()

      if (appConfig?.analytics?.routeChange === false) return

      let payload = routeChange({ route, site, page })

      // let the main nuxt app and layers extend or override the payload
      if (typeof appConfig?.analytics?.routeChange === 'object') {
        Object.values(appConfig?.analytics?.routeChange).forEach((callback) => {
          if (typeof callback === 'function') {
            payload = callback({ payload, route, site, page })
          }
        })
      }

      trackEvent(payload)
    })

    nuxtApp.vueApp.use({
      install(app: any) {
        const rplEventBus = app._context?.provides?.$rplEvent
        setupDataLayer()
        setupGTM(runtimeConfig?.analytics?.GTM)
        // Check for site-specific GTM container
        const site = nuxtApp?.payload.data?.[`site-${runtimeConfig.site}`]
        if (site?.featureFlags?.gtmContainerID) {
          setupGTM(site?.featureFlags?.gtmContainerID)
        }
        if (rplEventBus && eventListeners) {
          /* Here we iterate over all imported events and add listeners to Mitt event bus */
          const evtKeys = Object.keys(eventListeners)
          if (evtKeys.length > 0) {
            evtKeys.forEach((key) => {
              rplEventBus.on(key, eventListeners[key]())
            })
          }
        } else {
          console.error(
            'Error: (ripple-analytics) could not instantiate rplEvent Bus for analytics'
          )
        }
      }
    })
  }
})
