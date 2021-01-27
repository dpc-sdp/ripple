import { tide, Mapping, TideSearchApi } from '@dpc-sdp/ripple-nuxt-tide/lib/core'
import { serverSetProperties } from '@dpc-sdp/ripple-nuxt-tide/modules/authenticated-content/lib/authenticate'

export default ({ app, req, store , route }, inject) => {
  // We need to serialize functions, so use `serialize` instead of `JSON.stringify`.
  // https://github.com/nuxt-community/modules/issues/170
  // https://www.npmjs.com/package/serialize-javascript
  const options = <%= serialize(options) %>

  const config = options

  // Inject `tide` key
  // -> app.$tide
  // -> this.$tide in vue components
  // -> this.$tide in store actions/mutations
  const tideService = tide(app.$axios, options.site, config)
  inject('tide', tideService)
  const getBaseUrl = () => {
    const apiRoot = options.searchApi ? `/${options.searchApi.apiBase}/${options.searchApi.apiVersion}` : '/search-api/v2/'

    if (process.env.SEARCH_API_BASE_URL) {
      return process.env.SEARCH_API_BASE_URL + apiRoot
    }
    if (req) {
      return req.protocol + '://' + req.headers.host + apiRoot
    } else if (typeof window !== 'undefined') {
      return window.location.origin + apiRoot
    }
  }
  if (options.searchApi) {
    inject('tideSearchApi', new TideSearchApi({
      client: app.$axios,
      baseUrl: getBaseUrl()
    }))
  }
  inject('tideMapping', new Mapping(config, tideService))

  // Register Tide Vuex module
  if (store) {
    const storeModule = {
      namespaced: true,
      state: () => ({
        host: null,
        protocol: null,
        currentUrl: null,
        currentDomain: null,
        siteData: null,
        pageData: null,
        pageHead: null
      }),
      mutations: {
        setHost (state, host) {
          state.host = host
        },
        setProtocol (state, protocol) {
          state.protocol = protocol
        },
        setCurrentUrl (state, currentUrl) {
          state.currentUrl = currentUrl
        },
        setCurrentDomain (state, currentDomain) {
          state.currentDomain = currentDomain
        },
        setSiteData (state, siteData) {
          state.siteData = siteData
        },
        setPageData (state, pageData) {
          state.pageData = pageData
        },
        setPageHead (state, pageHead) {
          state.pageHead = pageHead
        }
      },
      actions: {
        async init ({ commit, dispatch }, { requestId = null } = {}) {
          if (process.server) {
            await dispatch('setSiteData', { requestId })
            commit('setHost', req.headers.host)

            // Set protocol
            const protocol = process.server ? (req.connection.encrypted ? 'https:' : 'http:') : window.location.protocol
            commit('setProtocol', protocol)

            // Load site module store.
            if (config.modules.site === 1) {
              await store.dispatch('tideSite/init', { requestId })
            }
            // Load authenticated content store.
            if (config.modules.authenticatedContent === 1) {
              serverSetProperties(req.headers.cookie, route.path, store)
            }
          }
        },
        async setSiteData ({ commit }, { requestId = null } = {}) {
          const headersConfig = { requestId }
          let siteData = await app.$tide.getSiteData(headersConfig)
          if (siteData instanceof Error) {
            // If got a Nuxt auth session expire error, try again.
            // As Nuxt auth should reset auth on error, retry should pass.
            if (siteData.name === 'ExpiredAuthSessionError') {
              siteData = await app.$tide.getSiteData(headersConfig)
              if (siteData instanceof Error) {
                throw siteData
              }
            } else {
              throw siteData
            }
          }
          siteData.lastFetched = Date.now()
          commit('setSiteData', siteData)

          if (siteData.field_site_domains) {
            // Current site domain should be the first one in site domains
            const siteDomain = siteData.field_site_domains.valueOf().split('\r\n', 1)
            commit('setCurrentDomain', siteDomain[0])
          }

          if (config.modules.alert === 1) {
            if (siteData.site_alerts && siteData.site_alerts.length > 0) {
              await store.dispatch('tideAlerts/setAlerts', { alerts: siteData.site_alerts, siteSection: siteData.drupal_internal__tid })
            }
          }
        },
        setCurrentUrl ({ commit }, fullPath) {
          const url = store.state.tide.protocol + '//' + store.state.tide.host + fullPath
          commit('setCurrentUrl', url)
        },
        setPageData ({ commit }, pageData) {
          commit('setPageData', pageData)
        },
        setPageHead ({ commit }, head) {
          commit('setPageHead', head)
        }
      }
    }

    // In SSR, Vuex register store module on both server side and client side.
    // That causes the module store states will be reset in client side.
    // Use `{ preserveState: true }` to skip reset states when register module.
    // https://github.com/vuejs/vuex/issues/1130
    // https://vuex.vuejs.org/guide/modules.html#dynamic-module-registration
    store.registerModule('tide', storeModule, { preserveState: !!store.state.tide })
  }
}
