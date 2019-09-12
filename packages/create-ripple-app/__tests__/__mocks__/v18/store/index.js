export const actions = {
  async nuxtServerInit ({ dispatch }, { req }) {
    try {
      await dispatch('tide/init', { requestId: req.requestId })
    } catch (error) {
      if (process.server) {
        console.error(`Tide API server error: ${error}`)
      }
      throw error
    }
  }
}
