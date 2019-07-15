import cookieparser from 'cookieparser'
import Cookie from 'js-cookie'

const authCookieName = 'authenticatedContent'
let serverToken = null

/**
 * Decode a JWT token and test exipration date.
 * @param {String} token JWT token
 * @return {Boolean} is expired
 */
function isTokenExpired (token) {
  if (token) {
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
 * Client / Server use.
 * Get auth token.
 * @return {String} auth token
 */
function getToken () {
  if (process.client) {
    return Cookie.get(authCookieName)
  } else {
    return serverToken
  }
}

/**
 * Client / Server use.
 * Clear auth token.
 * @param {Object} store vuex store object
 */
function clearToken (store) {
  if (process.client) {
    Cookie.remove(authCookieName)
  } else {
    serverToken = null
  }
  store.dispatch('tideAuthenticatedContent/setAuthenticated', false)
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
 * Server use only.
 * Store request header auth token to memory for page rendering.
 * @param {Object} cookies Request header cookies
 * @param {Object} store vuex store object
 */
function serverSetToken (cookies, store) {
  let isAuth = false
  if (cookies) {
    const parsed = cookieparser.parse(cookies)
    // Check if authenticated content cookie is set
    if (parsed[authCookieName] && parsed[authCookieName] !== '{"tideAuthenticatedContent":{"token":null}}') {
      if (!isTokenExpired(parsed[authCookieName])) {
        serverToken = parsed[authCookieName]
        isAuth = true
      }
    }
  }
  store.dispatch('tideAuthenticatedContent/setAuthenticated', isAuth)
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
export { getToken }
export { clearToken }
export { clientSetToken }
export { serverSetToken }
export { isAuthenticated }
