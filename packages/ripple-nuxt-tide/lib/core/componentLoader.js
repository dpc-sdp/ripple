import coreComponents from './../config/tide.load-components'
let customComponents = {}
try {
  const customComponentsLoadConfig = require('~/tide/tide.load-components.js').default
  if (customComponentsLoadConfig) {
    customComponents = {
      ...customComponentsLoadConfig
    }
  }
} catch (error) {
  console.warn('please add /tide/tide.load-components.js to your project directory')
}

export const loadComponent = (name) => {
  // TODO: move all core components import from here to "/nuxt-tide/lib/conifg/tide.load-components.js" after we take nuxt-tide out of nuxt project.
  switch (name) {
    case 'rpl-breadcrumbs':
      return () => import(/* webpackChunkName: 'rpl-breadcrumbs' */ '@dpc-sdp/ripple-breadcrumbs')
    case 'rpl-card-box':
      return () => import(/* webpackChunkName: 'rpl-card-box' */ '@dpc-sdp/ripple-card').then(m => m.RplCardBox)
    case 'rpl-card-carousel':
      // this is already mounted in no-ssr
      return 'rpl-card-carousel'
    case 'rpl-card-cta':
      return () => import(/* webpackChunkName: 'rpl-card-cta' */ '@dpc-sdp/ripple-card').then(m => m.RplCardCta)
    case 'rpl-card-event':
      return () => import(/* webpackChunkName: 'rpl-card-event' */ '@dpc-sdp/ripple-card').then(m => m.RplCardEvent)
    case 'rpl-card-emergency-contact':
      return () => import(/* webpackChunkName: 'rpl-card-emergency-contact' */ '@dpc-sdp/ripple-card').then(m => m.RplCardEmergencyContact)
    case 'rpl-card-promotion':
      return () => import(/* webpackChunkName: 'rpl-card-promotion' */ '@dpc-sdp/ripple-card').then(m => m.RplCardPromotion)
    case 'rpl-related-links':
      return () => import(/* webpackChunkName: 'rpl-related-links' */ '@dpc-sdp/ripple-related-links')
    case 'rpl-whats-next':
      return () => import(/* webpackChunkName: 'rpl-whats-next' */ '@dpc-sdp/ripple-whats-next')
    case 'rpl-site-section-navigation':
      return () => import(/* webpackChunkName: 'rpl-site-section-navigation' */ '@dpc-sdp/ripple-site-section-navigation')
    case 'rpl-contact':
      return () => import(/* webpackChunkName: 'rpl-contact' */ '@dpc-sdp/ripple-contact')
    case 'rpl-share-this':
      return () => import(/* webpackChunkName: 'rpl-share-this' */ '@dpc-sdp/ripple-share-this')
    case 'rpl-card-image-navigation':
      return () => import(/* webpackChunkName: 'rpl-card-image-navigation' */ '@dpc-sdp/ripple-card').then(m => m.RplCardImageNavigation)
    case 'rpl-card-keydates':
      return () => import(/* webpackChunkName: 'rpl-card-keydates' */ '@dpc-sdp/ripple-card').then(m => m.RplCardKeydates)
    case 'rpl-card-navigation':
      return () => import(/* webpackChunkName: 'rpl-card-navigation' */ '@dpc-sdp/ripple-card').then(m => m.RplCardNavigation)
    case 'rpl-card-navigation-featured':
      return () => import(/* webpackChunkName: 'rpl-card-navigation-featured' */ '@dpc-sdp/ripple-card').then(m => m.RplCardNavigationFeatured)
    case 'rpl-campaign-primary':
      return () => import(/* webpackChunkName: 'rpl-campaign-primary' */ '@dpc-sdp/ripple-campaign-primary')
    case 'rpl-campaign-secondary':
      return () => import(/* webpackChunkName: 'rpl-campaign-secondary' */ '@dpc-sdp/ripple-campaign-secondary')
    case 'rpl-call-to-action':
      return () => import(/* webpackChunkName: 'rpl-call-to-action' */ '@dpc-sdp/ripple-call-to-action')
    case 'rpl-latest-events':
      return () => import(/* webpackChunkName: 'rpl-latest-events' */ '@dpc-sdp/ripple-event').then(m => m.RplLatestEvents)
    case 'rpl-featured-news':
      return () => import(/* webpackChunkName: 'rpl-featured-news' */ '@dpc-sdp/ripple-news').then(m => m.RplFeaturedNews)
    case 'rpl-news-listing':
      return () => import(/* webpackChunkName: 'rpl-news-listing' */ '@dpc-sdp/ripple-news').then(m => m.RplNewsListing)
    case 'rpl-markup':
      return () => import(/* webpackChunkName: 'rpl-markup' */ '@dpc-sdp/ripple-markup')
    case 'rpl-timeline':
      return () => import(/* webpackChunkName: 'rpl-timeline' */ '@dpc-sdp/ripple-timeline')
    case 'rpl-intro-banner':
      return () => import(/* webpackChunkName: 'rpl-intro-banner' */ '@dpc-sdp/ripple-hero-banner').then(m => m.RplIntroBanner)
    case 'rpl-hero-banner':
      return () => import(/* webpackChunkName: 'rpl-hero-banner' */ '@dpc-sdp/ripple-hero-banner').then(m => m.RplHeroBanner)
    case 'rpl-hero-banner-cta':
      return () => import(/* webpackChunkName: 'rpl-hero-banner-cta' */ '@dpc-sdp/ripple-hero-banner').then(m => m.RplHeroBannerCta)
    case 'rpl-publish-date-and-author':
      return () => import(/* webpackChunkName: 'rpl-publish-date-and-author' */ '@dpc-sdp/ripple-publish-date-and-author')
    case 'rpl-publication-download-print':
      return () => import(/* webpackChunkName: 'rpl-publication-download-print' */ '@dpc-sdp/ripple-publication').then(m => m.RplPublicationDownloadPrint)
    case 'rpl-publication-image':
      return () => import(/* webpackChunkName: 'rpl-publication-image' */ '@dpc-sdp/ripple-publication').then(m => m.RplPublicationImage)
    case 'rpl-search-form':
      return () => import(/* webpackChunkName: 'rpl-search-form' */ '@dpc-sdp/ripple-search').then(m => m.RplSearchForm)
    case 'rpl-image-gallery':
      // this is already mounted in no-ssr
      return 'rpl-image-gallery'
    case 'rpl-accordion':
      return () => import(/* webpackChunkName: 'rpl-accordion' */ '@dpc-sdp/ripple-accordion')
    case 'tide-vic-free-wifi-map':
      // this is already mounted in no-ssr
      return 'tide-vic-free-wifi-map'
    case 'tide-map-prevention-family-violence':
      // this is already mounted in no-ssr
      return 'tide-map-prevention-family-violence'
    case 'app-form':
      return () => import(/* webpackChunkName: 'app-form' */ '@dpc-sdp/ripple-nuxt-tide/lib/components/AppForm')
    case 'tide-login':
      return () => import(/* webpackChunkName: 'tide-login' */ '@dpc-sdp/ripple-nuxt-tide/modules/authenticated-content/components/TideLogin')
    default:
      if (coreComponents[name]) {
        return coreComponents[name]
      } else if (customComponents && customComponents[name]) {
        return customComponents[name]
      } else {
        return null
      }
  }
}

export const dComponentLoader = (cmp, sidebar) => {
  if (cmp.data) {
    cmp.data.childColsBp = getCols(cmp.childCols, sidebar)
  }
  return {
    ...cmp,
    component: loadComponent(cmp.name),
    class: getClass(cmp, sidebar),
    cols: getCols(cmp.cols, sidebar)
  }
}

export const dComponentsLoader = (components = [], sidebar) => {
  if (Array.isArray(components)) {
    return components.map(cmp => dComponentLoader(cmp, sidebar))
  }
  return []
}

export const getCols = (cols, sidebar = false) => {
  if (cols) {
    if (sidebar && cols.narrow) {
      return cols.narrow
    }

    if (cols.wide) {
      return cols.wide
    }

    return cols
  }

  return {}
}

export const getClass = (component, sidebar = false) => {
  if (component.class) {
    if (sidebar && component.class.narrow) {
      return component.class.narrow
    }

    if (component.class.wide) {
      return component.class.wide
    }

    return component.class
  }

  return []
}

export default {
  loadComponent,
  dComponentsLoader,
  dComponentLoader
}
