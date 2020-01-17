// Set Ripple app headers
import { RPL_HEADER } from './../config/constants'

module.exports = function (req, res, next) {
  // Add header to all response from Ripple app
  res.setHeader(RPL_HEADER.APP_TYPE, 'ripple')
  next()
}
