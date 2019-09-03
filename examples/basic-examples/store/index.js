export const actions = {
  async nuxtServerInit ({ dispatch }) {
    try {
      await dispatch('tide/init')
    } catch (error) {
      if (process.server) {
        console.error(`Tide API server error: ${error}`)
      }
      throw error
    }
  }
}
