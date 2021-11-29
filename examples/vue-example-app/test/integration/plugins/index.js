const cucumber = require('cypress-cucumber-preprocessor').default

// Environment variables that need exposing to cypress go here - use the example site .env file
require('dotenv').config()

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())

  config.env = {}

  return config
}
