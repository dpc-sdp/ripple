import { isTokenExpired, clientGetToken, serverGetToken, clientClearToken, clientSetProperties } from './authenticate'

const tideAuthenticatedContent = (context, pageData) => {
  let authToken = null
  const authContentEnabled = context.app.$tide.isModuleEnabled('authenticatedContent')

  if (!authContentEnabled) {
    return authToken
  }

  // Get JWT token
  if (process.client) {
    authToken = clientGetToken()
  } else {
    authToken = serverGetToken(context.req.headers.cookie)
  }
  if (authToken) {
    // If token expired clear the persisted state
    if (isTokenExpired(authToken)) {
      if (process.client) {
        clientClearToken(context.store)
      }
      authToken = null
    }
  }
  if (process.client) {
    clientSetProperties(context.route.path, context.store)
  }

  return authToken
}

export { tideAuthenticatedContent }
