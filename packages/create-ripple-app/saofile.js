const fs = require('fs')
const path = require('path')
const validate = require('validate-npm-package-name')
const args = require('minimist')(process.argv.slice(2))
const TIDE_MODULES = require('./tidemodules')
const OPTIONS = require('./options')

// Set options from a config file path relative to CWD
const configFile = args.config
let configFileArgs = {}
if (configFile && fs.existsSync(__dirname, configFile)) {
  configFileArgs = require(path.resolve(process.cwd(), configFile))
}

// set options from params
const paramArgs = {
  ...args
}

const config = {
  ...configFileArgs,
  ...paramArgs
}

// set options via interactive prompt if not defined by config
const prompts = []
Object.values(OPTIONS).forEach(option => {
  if (config[option.name] === undefined) {
    prompts.push(option)
  }
})

module.exports = {
  prompts () {
    return prompts
  },
  templateData () {
    if (config.modules && !Array.isArray(config.modules)) {
      config.modules = config.modules.split(',')
    }
    const results = {
      ...this.answers,
      ...config
    }

    const tideModules = {}

    TIDE_MODULES.map(m => m.value).forEach(module => {
      if (results.modules.includes(module)) {
        tideModules[module] = 'yes'
      } else {
        tideModules[module] = 'no'
      }
    })

    const customcss = fs.existsSync(`${this.outDir}/assets/_custom.scss`)

    return {
      ...results,
      ...tideModules,
      customcss
    }
  },
  actions () {
    if (config.modules && !Array.isArray(config.modules)) {
      config.modules = config.modules.split(',')
    }

    const results = {
      ...this.answers,
      ...config
    }

    const validation = validate(results.name)

    validation.warnings &&
      validation.warnings.forEach(warn => {
        console.warn('Warning:', warn)
      })
    validation.errors &&
      validation.errors.forEach(err => {
        console.error('Error:', err)
      })
    validation.errors && validation.errors.length && process.exit(1)

    const actions = [
      {
        type: 'add',
        files: '**',
        templateDir: 'template/nuxt'
      },
      {
        type: 'add',
        files: ['_package.json']
      },
      {
        type: 'add',
        files: ['_.env'],
        transform: true
      }
    ]

    const removePath = (path, actions) => {
      if (fs.existsSync(`${this.outDir}${path}`)) {
        return actions.push({
          type: 'remove',
          files: path
        })
      }
    }
    const movePath = (from, to, actions) => {
      if (fs.existsSync(`${this.outDir}${from}`)) {
        return actions.push({
          type: 'move',
          patterns: {
            from: to
          }
        })
      }
    }

    removePath('/pages/Sitemap.vue', actions)
    movePath('/tide.config.js', '/tide/tide.config.js', actions)

    if (!fs.existsSync(`${this.outDir}/assets/_theme.scss`)) {
      actions.push({
        type: 'add',
        files: ['_theme.scss']
      })
      actions.push({
        type: 'move',
        patterns: {
          '_theme.scss': 'assets/_theme.scss'
        }
      })
    }

    if (!fs.existsSync(`${this.outDir}/static`)) {
      actions.push({
        type: 'add',
        files: ['**'],
        templateDir: 'template/_static'
      })
    }

    if (!fs.existsSync(`${this.outDir}/tide`)) {
      actions.push({
        type: 'add',
        files: ['**'],
        templateDir: 'template/_tide'
      })
    }

    if (results.examples) {
      actions.push({
        type: 'add',
        files: ['**'],
        templateDir: 'template/_example'
      })
    }

    actions.push({
      type: 'move',
      patterns: {
        '_package.json': 'package.json',
        '_.env': '.env'
      }
    })

    if (results.unit) {
      actions.push({
        type: 'move',
        patterns: {
          '_jest.config.js': 'jest.config.js'
        }
      })
    }

    if (results.e2e || results.smoke) {
      actions.push({
        type: 'add',
        files: ['**'],
        templateDir: 'template/_tests/_common'
      })
    }

    if (results.smoke) {
      actions.push({
        type: 'add',
        files: ['**'],
        templateDir: 'template/_tests/_smoke'
      })
    }

    if (results.e2e) {
      // only add tests for enabled modules
      results.modules.forEach(tideModule => {
        const hasTests = fs.existsSync(path.resolve(__dirname, `./template/_tests/_modules/test/e2e/integration/core-modules/${tideModule}`))
        if (hasTests) {
          actions.push(
            {
              type: 'add',
              files: [`./test/e2e/integration/core-modules/${tideModule}/**`, `./test/e2e/fixtures/${tideModule}/**`],
              templateDir: 'template/_tests/_modules'
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
      ...config
    }

    await this.npmInstall({ npmClient: results.pm })

    const isNewFolder = this.outDir !== process.cwd()
    const cd = () => {
      if (isNewFolder) {
        console.log(`\t${this.chalk.cyan('cd')} ${this.outFolder}`)
      }
    }

    console.log()
    console.log(this.chalk.bold(`  To get started:\n`))
    cd()
    console.log(`\t${results.pm} run dev\n`)
    console.log(this.chalk.bold(`  To build & start for production:\n`))
    cd()
    console.log(`\t${results.pm} run build`)
    console.log(`\t${results.pm} start`)
    console.log()
  }
}
