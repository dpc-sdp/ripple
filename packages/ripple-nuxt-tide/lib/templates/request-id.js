import { generateId } from '@dpc-sdp/ripple-nuxt-tide/lib/core/tide-helper'
import middleware from './middleware'

middleware['request-id'] = async (context) => {
  const { req, route, isHMR } = context;

  if (isHMR) {
    return
  }

  // Set request id for all Tide requests within the same route
  if (req && req.requestId) {
    // Nuxt req is server only variable, we pass the server request id to here.
    route.requestId = req.requestId
  } else {
    // Generate a request id if it's a client side navigation.
    route.requestId = generateId()
  }
}
