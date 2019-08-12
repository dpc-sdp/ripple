import { tide, Mapping, logger } from '@dpc-sdp/ripple-nuxt-tide/lib/core'
import { search } from '@dpc-sdp/ripple-nuxt-tide/modules/search/index.js'
import { serverSetProperties } from '@dpc-sdp/ripple-nuxt-tide/modules/authenticated-content/lib/authenticate'

export default ({ env, app, req, res, store , route}, inject) => {
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
  inject('tideSearch', search(options.search, app.router, options.site))

  app.$axios.onRequest(config => {
    // Log all axios' requests
    if (process.server) {
      logger.info('Making %s request to %s', config.method.toUpperCase(), config.url, {label: 'Axios'})
      logger.debug('Headers %O', config.headers, {label: 'Axios'})
    }
  })

  // If a request is failed, set a error status code
  // TODO: we may need to review this global error handling, feel we should handle in each call so we have better control.
  app.$axios.onError(error => {
    const responseUrl = error.request.path || error.request.responseURL
    const errMessage = 'Request to Tide "' + responseUrl + '" failed.'

    // Check what kind of request it is.
    const routeRequest = responseUrl.includes('/route?')
    const authPreviewRequest = responseUrl.includes('&current_version=') || responseUrl.includes('&resourceVersion=')

    let code
    if (error.code) {
      code = error.code
    } else if (error.response) {
      code = error.response.status
    }

    // Set http status code if a route or preview request failed.
    if (routeRequest || authPreviewRequest) {
      // We hide 403 and show it as 404
      code = code === 403 ? 404 : code

      app.tideResErrCode = code

      if (typeof res !== 'undefined') {
        res.statusCode = code
      }

      if (code !== 404 && process.server) {
        logger.error(errMessage, { error, label: 'Axios' })
      }
    } else {
      // All other requests failure should be invisible for end user.
      // We only log them in sever console.
      if (process.server) {
        logger.error(errMessage, { error, label: 'Axios' })
      }
      return Promise.resolve({ error: true })
    }
  })

  // Register Tide Vuex module
  if (store) {
    const storeModule = {
      namespaced: true,
      state: () => ({
        host: null,
        protocol: null,
        currentUrl: null,
        siteData: null
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
        }
      },
      actions: {
        async init ({ commit, dispatch }) {
          if (process.server) {
            const siteData = await app.$tide.getSiteData()
            if (siteData instanceof Error) {
              throw siteData
            }
            commit('setSiteData', siteData)
            commit('setHost', req.headers.host)

            // Set protocol
            const protocol = process.server ? (req.connection.encrypted ? 'https:' : 'http:') : window.location.protocol
            commit('setProtocol', protocol)

            // Load site module store.
            if (config.modules.site === 1) {
              await store.dispatch('tideSite/init')
            }
            // Load alert module store.
            if (config.modules.alert === 1) {
              await store.dispatch('tideAlerts/init')
            }
            // Load authenticated content store.
            if (config.modules.authenticatedContent === 1) {
              serverSetProperties(req.headers.cookie, route.path, store)
            }
          }
        },
        setCurrentUrl ({ commit }, fullPath) {
          const url = store.state.tide.protocol + '//' + store.state.tide.host + fullPath
          commit('setCurrentUrl', url)
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
