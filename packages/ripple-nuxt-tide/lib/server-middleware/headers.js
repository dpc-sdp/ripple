// Set Ripple app headers

module.exports = function (req, res, next) {
  // Add header to all response from Ripple app
  res.setHeader('X-SDP-APP-TYPE', 'ripple')
  next()
}
