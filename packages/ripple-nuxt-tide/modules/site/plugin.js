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
}
