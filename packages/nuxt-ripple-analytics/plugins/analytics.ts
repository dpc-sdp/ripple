import {
  defineNuxtPlugin,
  useAppConfig,
  useRuntimeConfig,
  addRouteMiddleware
} from '#app'
import { loadScript } from '@gtm-support/core'
import { trackEvent } from '../lib/tracker'

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
  const appConfig = useAppConfig()?.ripple?.analytics
  const runtimeConfig = useRuntimeConfig()?.tide?.analytics
  const eventListeners: Record<string, any> = appConfig?.eventListeners

  /* @ts-ignore process is extended by webpack */
  if (process.client) {
    nuxtApp.vueApp.use({
      install(app: any) {
        const rplEventBus = app._context?.provides?.$rplEvent
        setupDataLayer()
        setupGTM(runtimeConfig?.GTM)
        if (rplEventBus) {
          if (eventListeners) {
            /* Here we iterate over all imported events and add listeners to Mitt event bus */
            const evtKeys = Object.keys(eventListeners)
            if (evtKeys.length > 0) {
              evtKeys.forEach((key) => {
                rplEventBus.on(key, eventListeners[key]())
              })
            }
          }
          if (appConfig?.routeChange) {
            let routeChangeMiddleware = (to) => {
              trackEvent({
                event: 'routeChange',
                name: document.title,
                page_url: to.fullPath,
                platform_event: 'page/routeChange'
              })
            }

            if (typeof appConfig?.routeChange === 'function') {
              routeChangeMiddleware = appConfig?.routeChange
            }

            addRouteMiddleware('routeChange', routeChangeMiddleware, {
              global: true
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
