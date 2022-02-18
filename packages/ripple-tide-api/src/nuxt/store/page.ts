import headMetaMapping from './../utils/head.js'

export const getpageHead = (pageData, siteData, currentUrl) => {
  let head = {
    meta: []
  }

  if (pageData && pageData.type && siteData && currentUrl) {
    if (headMetaMapping.hasOwnProperty('default')) {
      head = headMetaMapping.default(head, pageData, siteData, currentUrl)
    }

    if (headMetaMapping.hasOwnProperty(pageData.type)) {
      head = headMetaMapping[pageData.type](
        head,
        pageData,
        siteData,
        currentUrl
      )
    }
  }
  return head
}

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
  async setPageHead({ commit, rootState }, { page, path }) {
    const head = getpageHead(page, rootState.site.data, rootState.site.hostname)
    if (head) {
      commit('setHead', head)
    }
  },
  async setType({ commit }, pageType) {
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
