// Log server connection
import logger from './../core/logger'
const url = require('url')

module.exports = function (req, res, next) {
  // req is the Node.js http request object
  const status = res.statusCode
  const method = req.method.toUpperCase()
  const reqUrl = url.parse(req.url)
  const reqPath = decodeURI(reqUrl.pathname)
  if (reqPath.includes('/api/v')) {
    logger.debug('Proxy %s request to %s, res status code: %s.', method, process.env.CONTENT_API_SERVER + reqPath, status, { label: 'Connect', requestQuery: reqUrl.query, requestId: req.headers['x-request-id'] })
  } else {
    logger.info('Server got request: %s %s %s', status, method, reqPath, { label: 'Connect', requestQuery: reqUrl.query, requestId: req.requestId })
  }
  // next is a function to call to invoke the next middleware
  // Don't forget to call next at the end if your middleware is not an endpoint!
  next()
}
