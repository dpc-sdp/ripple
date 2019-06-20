export default ({ app, store }) => {
  // Register Tide Protected Content Vuex module
  if (store) {
    const storeModule = {
      namespaced: true,
      state: () => ({
        token: null
      }),
      mutations: {
        setToken (state, token) {
          state.token = token
        }
      },
      actions: {
        clearToken ({ commit }) {
          commit('setToken', null)
        },
        setToken ({ commit }, token) {
          commit('setToken', token)
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
