const fs = require('fs')
const path = require('path')
const templateDir = './../../template'
const common = require('./../common')

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
        type: 'add',
        files: '**',
        templateDir: `${templateDir}/nuxt`,
        transform: true
      },
      {
        type: 'add',
        files: ['_package.json', '_.env', 'gitignore'],
        transform: true
      },
      {
        type: 'move',
        patterns: {
          gitignore: '.gitignore',
          '_package.json': 'package.json',
          '_.env': '.env'
        }
      }
    ]

    if (results.examples) {
      actions.push({
        type: 'add',
        files: ['**'],
        templateDir: '/_example'
      },
      {
        type: 'add',
        files: ['**'],
        templateDir: '/_tide'
      }
      )
    }

    if (results.unit) {
      actions.push({
        type: 'add',
        files: 'jest.config.js'
      })
    }

    if (results.smoke || results.e2e) {
      actions.push(
        {
          type: 'add',
          files: ['**'],
          templateDir: `${templateDir}/_tests/_common`
        }
      )
    }

    if (results.smoke) {
      actions.push({
        type: 'add',
        files: ['**'],
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
              templateDir: `${templateDir}/_tests/_modules`
            }
          )
        }
      })
    }

    return actions
  },
  async completed () {
    const results = {
      ...this.answers,
      ...this.sao.opts.config
    }
    await this.npmInstall({ npmClient: results.pm })
    console.log('complete!')
  }
}
