export const actions = {
  async nuxtServerInit ({ dispatch }, context) {
    await dispatch('site/init', context)
  }
}
