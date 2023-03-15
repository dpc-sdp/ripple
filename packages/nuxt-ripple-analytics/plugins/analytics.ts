import { defineNuxtPlugin, useAppConfig, addRouteMiddleware } from '#app'
import { loadScript } from '@gtm-support/core'
import { gaEvent } from './../lib/ga-event'
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

const setupGTM = (GTM_ID) => {
  if (GTM_ID) {
    // Add tracking code to page with loadScript
    loadScript(GTM_ID, { defer: true, compatibility: false })
  }
}

const startPageTracking = (ctx) => {
  ctx.app.router.afterEach((to) => {
    setTimeout(() => {
      ctx.$gtm.push(
        to.gtm || {
          routeName: to.name,
          pageType: 'PageView',
          pageUrl: '<%= options.routerBase %>' + to.fullPath,
          pageTitle: (typeof document !== 'undefined' && document.title) || '',
          event: '<%= options.pageViewEventName %>'
        }
      )
    }, 250)
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useAppConfig()
  const eventListeners: Record<string, any> =
    config.ripple.analytics.eventListeners

  /* @ts-ignore process is extended by webpack */
  if (process.client) {
    nuxtApp.vueApp.use({
      install(app: any) {
        const rplEventBus = app._context?.provides?.$rplEvent
        setupDataLayer()
        setupGTM(config.ripple?.analytics.GTM)
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
          if (config.ripple?.analytics?.routeChange) {
            const routeChangeMiddleware = (to) => {
              gaEvent({
                event: 'routeChange',
                name: document.title,
                pageUrl: to.fullPath,
                platform_event: 'page/routeChange'
              })
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
