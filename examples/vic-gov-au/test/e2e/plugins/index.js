const cucumber = require('cypress-cucumber-preprocessor').default
const percyHealthCheck = require('@percy/cypress/task')

// Environment variables that need exposing to cypress go here - use the example site .env file
require('dotenv').config()

let momentNow

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
    SEARCH_ENDPOINT: `https://${process.env.SEARCH_HASH}.${process.env.SEARCH_URL}/${process.env.SEARCH_INDEX}/_search`
  }
  on('task', percyHealthCheck)
  on('task', {
    stubDate (datetime = 'April 10, 2019 00:00:00') {
      const moment = require('moment')
      momentNow = moment.now
      moment.now = function () {
        return +new Date(datetime)
      }
      return null
    },
    resetDate () {
      const moment = require('moment')
      moment.now = momentNow
      return null
    }
  })

  return config
}
