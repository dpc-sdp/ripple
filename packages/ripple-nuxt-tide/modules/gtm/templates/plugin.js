import { logger } from '@dpc-sdp/ripple-nuxt-tide/lib/core'

// Google Tag Manager Class to be injected
class GTM {
  constructor (ctx, options) {
    this.ctx = ctx
    this.options = options
  }
  init () {
    window[this.options.layer] = window[this.options.layer] || []

    this.pushEvent({
      event: 'gtm.js',
      'gtm.start': new Date().getTime()
    })

    if (!this.options.respectDoNotTrack && this.options.pageTracking && !this.hasDNT()) {
      this.initPageTracking()
    }
  }
  // the timeout here is needed to await the data for the title to be updated - it is configurable in options if those requests are taking longer.
  initPageTracking () {
    this.ctx.app.router.afterEach((to, from) => {
      setTimeout(() => {
        window[this.options.layer].push(to.gtm || { event: 'routeChange', pageType: 'PageView', pageUrl: to.fullPath, pageTitle: document.title })
      }, this.options.timeout || 1000)
    })
  }

  validateObj (data) {
    if (!window || !window[this.options.layer]) {
      throw new Error('missing GTM dataLayer')
    }
    if (typeof data !== 'object') {
      throw new Error('data should be an object')
    }
  }

  pushEvent (obj) {
    try {
      this.validateObj(obj)
      if (!obj.hasOwnProperty('event')) {
        throw new Error('missing event property')
      }
      window[this.options.layer].push(obj)
    } catch (error) {
      logger.error('Failed to push event.', { error, label: 'GTM' })
    }
  }

  pushObj (obj) {
    try {
      this.validateObj(obj)
      window[this.options.layer].push(obj)
    } catch (error) {
      logger.error('Failed to push event.', { error, label: 'GTM' })
    }
  }

  hasDNT () {
    return window.doNotTrack === '1' ||
      navigator.doNotTrack === 'yes' ||
      navigator.doNotTrack === '1' ||
      navigator.msDoNotTrack === '1' ||
      (window.external && window.external.msTrackingProtectionEnabled && window.external.msTrackingProtectionEnabled())
  }
}

export default function(ctx, inject) {
  const options = <%= JSON.stringify(options) %>

  // Create a new Auth instance
  const $gtm = new GTM(ctx, options)
  inject('gtm', $gtm)

  $gtm.init()
}
