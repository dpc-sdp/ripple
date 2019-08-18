const cucumber = require('cypress-cucumber-preprocessor').default
const tideAdmin = require('@dpc-sdp/ripple-test-tools')

// Environment variables that need exposing to cypress go here - use the example site .env file
require('dotenv').config()

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())

  tideAdmin(on, config)

  config.env = {
    ADMIN_USERNAME: process.env.CYPRESS_ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.CYPRESS_ADMIN_PASSWORD,
    CONTENT_API_AUTH_USER: process.env.CONTENT_API_AUTH_USER,
    CONTENT_API_AUTH_PASS: process.env.CONTENT_API_AUTH_PASS,
    CONTENT_API_SERVER: process.env.CONTENT_API_SERVER
  }

  return config
}
