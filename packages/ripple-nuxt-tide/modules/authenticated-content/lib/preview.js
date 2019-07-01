import cookieparser from 'cookieparser'
import Cookie from 'js-cookie'

let serverToken = null

/**
 * Check if path is for a preview page.
 * @param {String} path current route.path
 */
function isPreviewPath (path) {
  return (path.indexOf('/preview/') === 0)
}

/**
 * Decode a JWT token and test exipration date.
 * @param {String} token JWT token
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
 */
function getToken () {
  if (process.client) {
    return Cookie.get('auth')
  } else {
    return serverToken
  }
}

/**
 * Client / Server use.
 * Clear auth token.
 */
function clearToken () {
  if (process.client) {
    Cookie.remove('auth')
  } else {
    serverToken = null
  }
}

/**
 * Client use only.
 * Store auth token in cookies.
 * @param {String} token JWT token
 */
function clientSetToken (token) {
  Cookie.set('auth', token)
}

/**
 * Server use only.
 * Store request header auth token to memory for page rendering.
 * @param {Object} cookies Request header cookies
 */
function serverSetToken (cookies) {
  if (cookies) {
    const parsed = cookieparser.parse(cookies)
    if (parsed.auth) {
      if (!isTokenExpired(parsed.auth)) {
        serverToken = parsed.auth
        return true
      }
    }
  }
  return false
}

export { isPreviewPath }
export { isTokenExpired }
export { getToken }
export { clearToken }
export { clientSetToken }
export { serverSetToken }
export default isPreviewPath
