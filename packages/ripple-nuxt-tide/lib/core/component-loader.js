import coreComponents from './../config/tide.load-components'
import logger from './logger'
// The order of loading dynamic components config is custom module > custom root > core modules > core.
const loadComponent = (name, dynamicComponentsConfig) => {
  let component = null
  if (dynamicComponentsConfig.length > 0) {
    // Revers the order to let custom to override core.
    const cmpConfigs = dynamicComponentsConfig.reverse()
    cmpConfigs.every(path => {
      let cmpsConfig
      // Narrow the required pattern as Webpack will load all possible files based on dynamic require.
      // If we load all js under the config dir, some files like nuxt plugin will fail the compilation as these file requires special loader.
      // https://webpack.js.org/guides/dependency-management/#require-with-expression
      let pathMiddle = path.replace('tide.load-components', '')
      if (pathMiddle.includes('~/tide/')) {
        pathMiddle = pathMiddle.replace('~/', '')
        cmpsConfig = require(`~/${pathMiddle}tide.load-components`).default
      } else if (pathMiddle.includes('./../../modules/')) {
        pathMiddle = pathMiddle.replace('./../../modules/', '')
        cmpsConfig = require(`./../../modules/${pathMiddle}tide.load-components`).default
      } else if (pathMiddle.includes('/node_modules/')) {
        pathMiddle = pathMiddle.replace('~/node_modules/', '')
        cmpsConfig = require(`~/node_modules/${pathMiddle}tide.load-components`).default
      }

      if (cmpsConfig && cmpsConfig[name]) {
        component = cmpsConfig[name]
        return false
      } else {
        return true
      }
    })
  }

  if (component !== null) {
    return component
  }

  // TODO: move all below to core or core module load-components config.
  switch (name) {
    case 'rpl-card-box':
      return () => import(/* webpackChunkName: 'rpl-card-box' */ '@dpc-sdp/ripple-card').then(m => m.RplCardBox)
    case 'rpl-card-carousel':
      return () => import(/* webpackChunkName: 'rpl-card-carousel' */ '@dpc-sdp/ripple-card').then(m => m.RplCardCarousel)
    case 'rpl-card-cta':
      return () => import(/* webpackChunkName: 'rpl-card-cta' */ '@dpc-sdp/ripple-card').then(m => m.RplCardCta)
    case 'rpl-card-emergency-contact':
      return () => import(/* webpackChunkName: 'rpl-card-emergency-contact' */ '@dpc-sdp/ripple-card').then(m => m.RplCardEmergencyContact)
    case 'rpl-card-promotion':
      return () => import(/* webpackChunkName: 'rpl-card-promotion' */ '@dpc-sdp/ripple-card').then(m => m.RplCardPromotion)
    case 'rpl-site-section-navigation':
      return () => import(/* webpackChunkName: 'rpl-site-section-navigation' */ '@dpc-sdp/ripple-site-section-navigation')
    case 'rpl-card-image-navigation':
      return () => import(/* webpackChunkName: 'rpl-card-image-navigation' */ '@dpc-sdp/ripple-card').then(m => m.RplCardImageNavigation)
    case 'rpl-card-keydates':
      return () => import(/* webpackChunkName: 'rpl-card-keydates' */ '@dpc-sdp/ripple-card').then(m => m.RplCardKeydates)
    case 'rpl-card-navigation':
      return () => import(/* webpackChunkName: 'rpl-card-navigation' */ '@dpc-sdp/ripple-card').then(m => m.RplCardNavigation)
    case 'rpl-card-nav':
      return () => import(/* webpackChunkName: 'rpl-card-nav' */ '@dpc-sdp/ripple-card').then(m => m.RplCardNav)
    case 'rpl-card-promo':
      return () => import(/* webpackChunkName: 'rpl-card-promo' */ '@dpc-sdp/ripple-card').then(m => m.RplCardPromo)
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
    case 'rpl-complex-image':
      return () => import(/* webpackChunkName: 'rpl-complex-image' */ '@dpc-sdp/ripple-image-gallery').then(m => m.RplComplexImage)
    case 'rpl-image-gallery':
      return () => import(/* webpackChunkName: 'rpl-image-gallery' */ '@dpc-sdp/ripple-image-gallery').then(m => m.RplImageGallery)
    case 'rpl-accordion':
      return () => import(/* webpackChunkName: 'rpl-accordion' */ '@dpc-sdp/ripple-accordion')
    case 'rpl-data-table':
      return () => import(/* webpackChunkName: 'rpl-data-table' */ '@dpc-sdp/ripple-data-table')
    case 'tide-login':
      return () => import(/* webpackChunkName: 'tide-login' */ '@dpc-sdp/ripple-nuxt-tide/modules/authenticated-content/components/TideLogin')
    default:
      if (coreComponents[name]) {
        return coreComponents[name]
      } else {
        if (process.server) {
          logger.error(`Couldn't find component "%s" in mapping config.`, name)
        }
        return null
      }
  }
}

const dComponentLoader = (cmp, sidebar, dynamicComponentsConfig) => {
  if (cmp.data) {
    cmp.data.childColsBp = getCols(cmp.childCols, sidebar)
  }
  return {
    ...cmp,
    component: loadComponent(cmp.name, dynamicComponentsConfig),
    class: getClass(cmp, sidebar),
    cols: getCols(cmp.cols, sidebar)
  }
}

const dComponentsLoader = (components = [], sidebar, dynamicComponentsConfig) => {
  if (Array.isArray(components)) {
    return components.map(cmp => dComponentLoader(cmp, sidebar, dynamicComponentsConfig))
  }
  return []
}

const getCols = (cols, sidebar = false) => {
  if (cols) {
    if (sidebar && cols.narrow) {
      return cols.narrow
    }

    if (cols.wide) {
      return cols.wide
    }

    return cols
  }

  return null
}

const getClass = (component, sidebar = false) => {
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
  dComponentsLoader,
  dComponentLoader
}
