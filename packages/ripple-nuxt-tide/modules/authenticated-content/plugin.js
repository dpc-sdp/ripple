export default ({ app, store }) => {
  // Register Tide Protected Content Vuex module
  if (store) {
    const storeModule = {
      namespaced: true,
      state: () => ({
        isAuthenticated: null,
        isPreview: null
      }),
      mutations: {
        setAuthenticated (state, isAuthenticated) {
          state.isAuthenticated = isAuthenticated
        },
        setPreview (state, isPreview) {
          state.isPreview = isPreview
        }
      },
      actions: {
        setAuthenticated ({ commit }, setAuthenticated) {
          commit('setAuthenticated', setAuthenticated)
        },
        setPreview ({ commit }, setPreview) {
          commit('setPreview', setPreview)
        }
      }
    }

    // In SSR, Vuex regiseter store module on both server side and client side.
    // That causes the moudle store states will be reset in client side.
    // We only need to mutate the state in server side.
    // So after state created, we don't register again in client side.
    store.registerModule('tideAuthenticatedContent', storeModule, { preserveState: !!store.state.tideAuthenticatedContent })
  }
}
