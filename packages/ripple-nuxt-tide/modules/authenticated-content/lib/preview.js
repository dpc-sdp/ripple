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
  const jwtDecode = require('jwt-decode')
  const { exp } = jwtDecode(token)
  // Token expiry timestamp is in a shorter format, match them for comparison
  const now = parseInt(Date.now().toString().slice(0, exp.toString().length))
  return exp < now
}

export { isPreviewPath }
export { isTokenExpired }
export default isPreviewPath
