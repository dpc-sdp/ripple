import cookieparser from 'cookieparser'
import Cookie from 'js-cookie'

const authCookieName = 'authenticatedContent'
const nullValue = '{"tideAuthenticatedContent":{"token":null}}'
/**
 * Decode a JWT token and test exipration date.
 * @param {String} token JWT token
 * @return {Boolean} is expired
 */
function isTokenExpired (token) {
  if (token && token !== nullValue) {
    const jwtDecode = require('jwt-decode')
    const { exp } = jwtDecode(token)
    // Token expiry timestamp is in a shorter format, match them for comparison
    const now = parseInt(Date.now().toString().slice(0, exp.toString().length))
    return exp < now
  } else {
    return true
  }
}

/**
 * Client use only.
 * Get auth token.
 * @return {String} auth token
 */
function clientGetToken () {
  return Cookie.get(authCookieName)
}

/**
 * Client use only.
 * Store auth token in cookies.
 * @param {String} token JWT token
 * @param {Object} store vuex store object
 */
function clientSetToken (token, store) {
  Cookie.set(authCookieName, token)
  store.dispatch('tideAuthenticatedContent/setAuthenticated', true)
}

/**
 * Client use only.
 * Clear auth token.
 * @param {Object} store vuex store object
 */
function clientClearToken (store) {
  if (process.client) {
    Cookie.remove(authCookieName)
  }
  store.dispatch('tideAuthenticatedContent/setAuthenticated', false)
}

/**
 * Server use only.
 * Get auth token from cookies.
 * @param {String} serverCookie request header cookies
 */
function serverGetToken (serverCookie) {
  if (serverCookie) {
    const parsed = cookieparser.parse(serverCookie)
    if (parsed && parsed.authenticatedContent !== nullValue) {
      return parsed[authCookieName] ? parsed[authCookieName] : null
    } else {
      return null
    }
  } else {
    return null
  }
}

/**
 * Sever use only.
 * Store authentication values in vuex.
 * @param {String} serverCookies request header cookies
 * @param {String} path route path
 * @param {Object} store vuex store object
 */
function serverSetProperties (serverCookies, path, store) {
  const token = serverGetToken(serverCookies)
  setAuthProperties(token, path, store)
}

/**
 * Client use only.
 * Store authentication values in vuex.
 * @param {String} serverCookies request header cookies
 * @param {String} path route path
 * @param {Object} store vuex store object
 */
function clientSetProperties (path, store) {
  const token = clientGetToken()
  setAuthProperties(token, path, store)
}

/**
 * Store authentication values in vuex.
 * @param {String} token request header cookies
 * @param {String} path route path
 * @param {Object} store vuex store object
 */
function setAuthProperties (token, path, store) {
  const isAuthenticated = token && !isTokenExpired(token)
  store.dispatch('tideAuthenticatedContent/setAuthenticated', isAuthenticated)
}

/**
 * Check if current user is authenticated.
 * @param {Object} store vuex store object
 * @return {Boolean} is user authenticated
 */
function isAuthenticated (store) {
  return store.state.tideAuthenticatedContent.isAuthenticated
}

export { isTokenExpired }
export { clientGetToken }
export { clientSetToken }
export { clientClearToken }
export { clientSetProperties }
export { serverGetToken }
export { serverSetProperties }
export { isAuthenticated }
