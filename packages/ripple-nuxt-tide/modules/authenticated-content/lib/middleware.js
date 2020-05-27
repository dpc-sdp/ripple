import { isTokenExpired, clientGetToken, serverGetToken, clientClearToken, clientSetProperties } from './authenticate'
import { isPreviewPath } from './preview'

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

const tidePreview = async (context, pageData, authToken, headersConfig) => {
  // Preview
  if (isPreviewPath(context.route.path)) {
    if (!authToken) {
      return context.redirect('/login?destination=' + context.req.url)
    }
    const { 2: type, 3: id, 4: rev } = context.route.path.split('/')
    const section = context.route.query.section ? context.route.query.section : null
    const response = await context.app.$tide.getPreviewPage(type, id, rev, section, {}, headersConfig)
    return response
  } else {
    return false
  }
}

export { tideAuthenticatedContent }
export { tidePreview }
