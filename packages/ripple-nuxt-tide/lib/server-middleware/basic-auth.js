// Server middleware - only allow users who pass
const auth = require('basic-auth')

module.exports = function (req, res, next) {
  const credentials = auth(req)
  // We need to use same credentials as Content API, as we are using proxy to send API requests.
  const authUser = process.env.CONTENT_API_AUTH_USER
  const authPass = process.env.CONTENT_API_AUTH_PASS
  if (!credentials || credentials.name !== authUser || credentials.pass !== authPass) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="Access the site"')
    return res.end('Access denied')
  }
  next()
}
