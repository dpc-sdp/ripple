import { get } from 'lodash'
import moment from 'moment'
import { log } from 'util';

export default ({ app, store }) => {
  // Register Tide Site Vuex module
  if (store) {
    const storeModule = {
      namespaced: true,
      state: () => ({
        sitesDomainMap: null,
        siteSection: null
      }),
      mutations: {
        setSitesDomainMap (state, sitesDomainMap) {
          state.sitesDomainMap = sitesDomainMap
        },
        setSiteSection (state, id) {
          state.siteSection = id
        }
      },
      actions: {
        async init ({ commit }) {
          if (process.server) {
            const sitesDomainMap = await app.$tide.getSitesDomainMap()
            commit('setSitesDomainMap', sitesDomainMap)
          }
        }
      }
    }
    // In SSR, Vuex regiseter store module on both server side and client side.
    // That causes the module store states will be reset in client side.
    // We only need to mutate the state in server side.
    // So after state created, we don't register again in client side.
    store.registerModule('tideSite', storeModule, { preserveState: !!store.state.tideSite })
  }

  if (process.client) {
    // this refetches sitedata after route loads if it hasnt been fetched for a while
    const refetchSiteDataMiddleware = (from, to, next) => {
      const fetchInterval = 1 // interval in minutes to refetch
      const lastFetched = get(store, 'state.tide.siteData.lastFetched')
      if (lastFetched) {
        const lastFetchedTime = moment(lastFetched)
        const now = moment()
        if (now.diff(lastFetchedTime, 'minutes') >= fetchInterval) {
          console.log('1 MINUTE ELAPSED - FETCH NEW SITE DATA')
          store.dispatch('tide/setSiteData')
        }
      }
      next()
    }

    app.router.beforeHooks.push(refetchSiteDataMiddleware)
  }
}
