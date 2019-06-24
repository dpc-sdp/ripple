// Server middleware - only allow users who pass
const auth = require('basic-auth')

export default function (req, res, next) {
  const credentials = auth(req)
  if (!credentials || credentials.name !== process.env.AUTH_USER || credentials.pass !== process.env.AUTH_PASS) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="Access the site"')
    res.end('Access denied')
  }
  next()
}
