
const cucumber = require('cypress-cucumber-preprocessor').default
const tideAdmin = require('@dpc-sdp/ripple-test-tools')

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())

  tideAdmin(on, config)

  // Environment variables that need exposing to cypress go here
  if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
    require('dotenv').config()
  }

  config.env = {
    ADMIN_USERNAME: process.env.CYPRESS_ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.CYPRESS_ADMIN_PASSWORD,
    AUTH_USER: process.env.CONTENT_API_AUTH_USER,
    AUTH_PASS: process.env.CONTENT_API_AUTH_PASS,
    CONTENT_API_SERVER: process.env.CONTENT_API_SERVER
  }

  return config
}
