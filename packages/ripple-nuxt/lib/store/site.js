export const state = () => ({
  data: null,
  hostname: null
})

export const mutations = {
  setSite (state, payload) {
    state.data = payload
  },
  setHost (state, payload) {
    if (!state.hostname && payload) {
      state.hostname = payload
    }
  }
}

export const actions = {
  async init ({ commit }, { req, app, $config }) {
    try {
      const { data } = await app.$tideApi.get(`/site/${$config.SITEID}`)
      commit('setHost', req.protocol + '://' + req.headers.host)
      commit('setSite', data)
    } catch (error) {
      console.error('Error fetching site data', error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
