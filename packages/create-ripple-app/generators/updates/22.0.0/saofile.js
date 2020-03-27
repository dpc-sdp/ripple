const fs = require('fs')
const path = require('path')
const common = require('./../../common')
const templateDir = './../../../template'

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
          data.version = '22.0.0'
          data.dependencies['@dpc-sdp/ripple-nuxt-tide'] = `1.7.0`
          data.devDependencies['@dpc-sdp/ripple-test-tools'] = `1.7.0`
          data.scripts['cy:run'] = `cypress run -b chrome -e TAGS='not @skip or @smoke'`
          data.scripts['cy:record'] = `cypress run -b chrome -e TAGS='not @skip or @smoke' --record  --parallel --group $CIRCLE_JOB`
          if (data['cypress-cucumber-preprocessor']) {
            data['cypress-cucumber-preprocessor'].step_definitions = 'test/e2e/integration/'
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
        const hasTests = fs.existsSync(path.resolve(__dirname, `${templateDir}/_tests/_modules/test/e2e/integration/core-modules/${tideModule}`))
        if (hasTests) {
          actions.push(
            {
              type: 'add',
              files: [`./test/e2e/integration/core-modules/${tideModule}/**`, `./test/e2e/fixtures/${tideModule}/**`],
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
    console.log('Update to 22.0.0 complete!')
  }
}
