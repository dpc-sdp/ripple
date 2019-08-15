import { get } from 'lodash'
import moment from 'moment'

export default ({ app, store }) => {
  // Register Tide Site Vuex module
  if (store) {
    const storeModule = {
      namespaced: true,
      state: () => ({
        sitesDomainMap: null
      }),
      mutations: {
        setSitesDomainMap (state, sitesDomainMap) {
          state.sitesDomainMap = sitesDomainMap
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
    // That causes the moudle store states will be reset in client side.
    // We only need to mutate the state in server side.
    // So after state created, we don't register again in client side.
    if (!store.state.tideSite) {
      store.registerModule('tideSite', storeModule)
    }
  }
  // this refetches sitedata after route loads if it hasnt been fetched for a while
  if (process.client) {
    const fetchInterval = 1 // interval in minutes to refetch
    app.router.afterHooks.push(() => {
      const lastFetched = get(store, 'state.tide.siteData.lastFetched')
      if (lastFetched) {
        const lastFetchedTime = moment(lastFetched)
        const now = moment()
        if (now.diff(lastFetchedTime, 'minutes') >= fetchInterval) {
          store.dispatch('tide/setSiteData')
        }
      }
    })
  }
}
