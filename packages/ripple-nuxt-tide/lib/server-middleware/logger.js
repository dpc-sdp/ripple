// Log server connection
import logger from './../core/logger'
const url = require('url')

module.exports = function (req, res, next) {
  // req is the Node.js http request object
  const status = res.statusCode
  const method = req.method.toUpperCase()
  const reqUrl = decodeURI((url.parse(req.url)).pathname)
  if (!reqUrl.includes('api/v1/')) {
    logger.info('Server got request: %s %s %s', status, method, reqUrl, { label: 'connect' })
  } else {
    logger.info('Proxy %s %s to backend, %s.', method, reqUrl, status, { label: 'connect' })
  }
  // next is a function to call to invoke the next middleware
  // Don't forget to call next at the end if your middleware is not an endpoint!
  next()
}
