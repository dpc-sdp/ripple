// Log server connection
import { generateId } from './../core/tide-helper'
const url = require('url')

module.exports = function (req, res, next) {
  // req is the Node.js http request object
  const reqUrl = decodeURI((url.parse(req.url)).pathname)
  if (!reqUrl.includes('/api/v')) {
    req.requestId = generateId()
  }
  // next is a function to call to invoke the next middleware
  // Don't forget to call next at the end if your middleware is not an endpoint!
  next()
}
