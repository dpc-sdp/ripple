// Log server connection
import { generateId } from './../core/tide-helper'
import logger from '../core/logger'
const { URL } = require('url')

module.exports = function (req, res, next) {
  // req is the Node.js http request object
  let reqUrl = ''
  try {
    reqUrl = new URL({ toString: () => req.url })
  } catch (e) {
    reqUrl = ''
  }
  const reqPathname = reqUrl.pathname ? decodeURI(reqUrl.pathname) : ''
  if (!reqPathname.includes('/api/v')) {
    req.requestId = generateId()
  }
  // next is a function to call to invoke the next middleware
  // Don't forget to call next at the end if your middleware is not an endpoint!
  next()
}
