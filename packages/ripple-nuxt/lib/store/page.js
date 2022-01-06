import { getpageHead } from '@dpc-sdp/ripple-nuxt/lib/helpers'

export const state = () => ({
  head: {},
  type: ''
})

export const mutations = {
  setHead(state, payload) {
    state.head = payload
  },
  setType(state, payload) {
    state.type = payload
  }
}

export const actions = {
  async setPageHead({ commit, state, rootState }, { page, path }) {
    const head = getpageHead(
      page,
      rootState.site.data,
      rootState.site.hostname,
      path
    )
    if (head) {
      commit('setHead', head)
    }
  },
  async setType({ commit, state, rootState }, pageType) {
    if (pageType) {
      commit('setType', pageType)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
