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

    if (results.integration) {
      actions.push(
        {
          type: 'add',
          files: ['**'],
          templateDir: `${templateDir}/_tests/_common`
        }
      )
    }

    if (results.integration) {
      actions.push({
        type: 'add',
        files: ['**'],
        templateDir: `${templateDir}/_tests/_smoke`
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
