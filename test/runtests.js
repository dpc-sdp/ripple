// runs Cypress end-to-end tests using Cypress Node module API
// https://on.cypress.io/module-api

const cypress = require('cypress')
const globby = require('globby')
const { Nuxt } = require('nuxt')
const fs = require('fs')
const path = require('path')

globby('./examples/**/test/e2e/cypress.json')
  .then(folders => {
    folders.forEach(async configPath => {
      const cypressPath = path.dirname(configPath)
      const appPath = path.resolve(cypressPath, './../../')
      const config = require(`${appPath}/nuxt.config.js`)
      console.log(config)
      try {
        const nuxt = new Nuxt(config)
        await nuxt.ready()
        console.log('ready')
      } catch (error) {
        console.log(error)
      }
      // cypress.run({
      //   project: cypressPath
      // }).then((results) => {
      //   console.log(results)
      // }).catch((err) => {
      //   console.error(err)
      // })
    })
  })
