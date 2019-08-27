/* eslint-disable no-undef */
const csv = require('csvtojson')
const faker = require('faker')

function rippleCommands () {
  Cypress.Commands.add('csvFixture', fixturePath => {
    const csvToJson = async data => {
      faker.locale = 'en_AU'
      const csvData = await csv().fromString(data)
      if (csvData) {
        return csvData.reduce((o, val) => {
          let value = val.value
          if (value.length === 0 && val.Random && val.Random.length > 0) {
            if (val.Random.charAt(0) === '{') {
              value = faker.fake(val.Random)
            } else if (val.Random.charAt(0) === '[') {
              const randomValues = val.Random.substr(
                1,
                val.Random.length - 2
              ).split(',')
              value =
                randomValues[Math.floor(Math.random() * randomValues.length)]
            }
          }
          o[Cypress._.camelCase(val.key)] = value
          return o
        }, {})
      }
    }

    cy.fixture(fixturePath).then(async data => {
      const fixtureData = await csvToJson(data)
      return fixtureData
    })
  })

  Cypress.Commands.add('TideCreateNode', fixturePath => {
    cy.log('test/e2e/fixtures/' + fixturePath + '.yml')
    cy.readFile('test/e2e/fixtures/' + fixturePath + '.yml').as('yaml')
    cy.get('@yaml').then(data => {
      cy.task('createNodeFromYAML', data).as('nodeCreated')
      cy.log('@nodeCreated')
    })
  })

  Cypress.Commands.add('TideDeleteNode', nodeId => {
    cy.task('deleteNode', nodeId)
  })
}

module.exports = rippleCommands
