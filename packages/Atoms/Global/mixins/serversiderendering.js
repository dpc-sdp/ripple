/**
 * Adds a Boolean property `isClientSide` to check if window is available.
 */
const serversiderendering = {
  data () {
    return {
      isClientSide: (typeof window !== 'undefined')
    }
  }
}

export default serversiderendering
