const cucumber = require('cypress-cucumber-preprocessor').default
const rippleTasks = require('@dpc-sdp/ripple-test-tools/tasks')
const { prepareAudit } = require('cypress-audit')
// Environment variables that need exposing to cypress go here - use the example site .env file
require('dotenv').config()

const mockServer = require('mockttp').getLocal()

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())

  config.env = {
    SITE_ID: '4',
    ADMIN_USERNAME: process.env.CYPRESS_ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.CYPRESS_ADMIN_PASSWORD,
    CONTENT_API_AUTH_USER: process.env.CONTENT_API_AUTH_USER,
    CONTENT_API_AUTH_PASS: process.env.CONTENT_API_AUTH_PASS,
    CONTENT_API_SERVER: process.env.CONTENT_API_SERVER,
    SEARCH_AUTH_USERNAME: process.env.SEARCH_AUTH_USERNAME,
    SEARCH_AUTH_PASSWORD: process.env.SEARCH_AUTH_PASSWORD,
    SEARCH_API_BASE_URL: process.env.SEARCH_API_BASE_URL,
    SEARCH_ENDPOINT: `https://${process.env.SEARCH_HASH}.${process.env.SEARCH_URL}/${process.env.SEARCH_INDEX}/_search`
  }

  on('task', rippleTasks)

  // Cypress audit
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions)
  })

  return config
}

process.on('SIGINT', function () {
  mockServer.stop().then(() => {
    console.info('\nMock server manager was gracefully shut down')
    process.exit()
  })
})
