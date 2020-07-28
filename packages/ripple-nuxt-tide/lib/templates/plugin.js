import { tide, Mapping } from '@dpc-sdp/ripple-nuxt-tide/lib/core'
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
  inject('tideMapping', new Mapping(config, tideService))

  // Register Tide Vuex module
  if (store) {
    const storeModule = {
      namespaced: true,
      state: () => ({
        host: null,
        protocol: null,
        currentUrl: null,
        siteData: null,
        pageData: null,
        pageHead: null,
        theme: null
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
        setSiteData (state, siteData) {
          state.siteData = siteData
        },
        setPageData (state, pageData) {
          state.pageData = pageData
        },
        setPageHead (state, pageHead) {
          state.pageHead = pageHead
        },
        setTheme (state, theme) {
          state.theme = theme
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
          let siteName
          const nonProdUrls = ['develop', 'master', 'release']
          if (route.query.site) {
            siteName = `${route.query.site}`
          } else if (req.headers.host.includes('localhost')) {
            siteName = 'vic.gov.au'
          } else if (nonProdUrls.includes[req.headers.host]) {
            siteName = req.headers.host.replace(new RegExp(nonProdUrls.join('|') + '.', 'gi'), '')
          } else {
            siteName = `${req.headers.host}`
          }

          const siteData = await app.$tide.getSiteData(headersConfig, siteName)
          if (siteData instanceof Error) {
            throw siteData
          }
          if (siteName) {
            const theme = await app.$axios.get(`/${siteName}.json`).then(res => res.data)
            if (theme) {
              commit('setTheme', theme)
            }
          }
          siteData.lastFetched = Date.now()
          commit('setSiteData', siteData)


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
