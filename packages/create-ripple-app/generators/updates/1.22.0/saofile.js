const fs = require('fs')
const path = require('path')
const common = require('./../../common')
const templateDir = './../../../template'
const log = require('./../../../logger')

module.exports = {
  ...common,
  templateDir,
  actions () {
    const results = {
      ...this.answers,
      ...this.sao.opts.config
    }
    const actions = [
      {
        type: 'modify',
        files: 'package.json',
        handler (data, filepath) {
          data.sdp_version = '1.22.0'
          data.dependencies['@dpc-sdp/ripple-nuxt-tide'] = `1.7.0`
          data.devDependencies['@dpc-sdp/ripple-test-tools'] = `1.7.0`
          data.devDependencies['axe-core'] = `^3.5.2`
          data.devDependencies['cypress'] = `^4.1.0`
          data.devDependencies['cypress-axe'] = `^0.5.3`
          data.devDependencies['cypress-cucumber-preprocessor'] = `^2.0.1`

          data.scripts['cy:run'] = `cypress run -b chrome -e TAGS='not @skip or @smoke' --record  --parallel --group $CIRCLE_JOB`
          data.scripts['cy:run-local'] = `cypress run -b chrome -e TAGS='not @skip or @smoke'`
          data.scripts['test:e2e-local'] = `cross-env TEST=1 BASIC_AUTH=0 start-server-and-test start:build http://localhost:3000 cy:run-local`
          data.scripts['test:e2e'] = `cross-env TEST=1 BASIC_AUTH=0 start-server-and-test start http://localhost:3000 cy:run`
          data.scripts['test:smoke'] = `cross-env TEST=1 start-server-and-test start http://localhost:3000 cy:run-smoke`

          if (data['cypress-cucumber-preprocessor']) {
            data['cypress-cucumber-preprocessor'].step_definitions = 'test/e2e/integration/'
            data['cypress-cucumber-preprocessor'].cucumberJson = {
              generate: true,
              outputFolder: 'test/e2e/results/cucumber',
              filePrefix: results.name + '-'
            }
          }
          return data
        }
      },
      {
        type: 'add',
        files: ['_cypress.json'],
        transform: true
      },
      {
        type: 'move',
        patterns: {
          '_cypress.json': 'cypress.json'
        }
      }
    ]

    if (results.smoke || results.e2e) {
      actions.push(
        {
          type: 'add',
          files: ['**'],
          transform: true,
          templateDir: `${templateDir}/_tests/_common`
        }
      )
    }

    if (results.smoke) {
      actions.push({
        type: 'add',
        files: ['**'],
        transform: true,
        templateDir: `${templateDir}/_tests/_smoke`
      })
    }
    if (results.e2e) {
      // only add tests for enabled modules
      results.modules.forEach(tideModule => {
        const hasTests = fs.existsSync(path.resolve(__dirname, `${templateDir}/_tests/_modules/test/e2e/integration/modules/${tideModule}`))
        if (hasTests) {
          actions.push(
            {
              type: 'add',
              files: [`./test/e2e/integration/modules/${tideModule}/**`, `./test/e2e/fixtures/modules/${tideModule}/**`],
              transform: true,
              templateDir: `${templateDir}/_tests/_modules`
            }
          )
        }
      })
    }

    return actions
  },
  async completed () {
    log('Update to 1.22.0 complete!')
  }
}
