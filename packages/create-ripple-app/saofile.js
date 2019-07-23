const fs = require('fs')
const path = require('path')
const validate = require('validate-npm-package-name')
const args = require('minimist')(process.argv.slice(2))

const TIDE_MODULES = [
  { value: 'site', name: 'Site', default: true },
  { value: 'alert', name: 'Alert', default: true },
  { value: 'page', name: 'Page', default: true },
  { value: 'landingPage', name: 'Landing Page', default: true },
  { value: 'event', name: 'Event', default: true },
  { value: 'news', name: 'News', default: true },
  { value: 'grant', name: 'Grant', default: true },
  { value: 'gtm', name: 'Google Tag Manager', default: true },
  { value: 'profile', name: 'Profile', default: true },
  { value: 'media', name: 'Media', default: true },
  { value: 'webform', name: 'Webform', default: true },
  { value: 'search', name: 'Search', default: true },
  { value: 'publication', name: 'Publication', default: false },
  { value: 'monsido', name: 'Monsido', default: true },
  { value: 'authenticatedContent', name: 'Authenticated Content', default: false },
  { value: 'dataDrivenComponent', name: 'Data Driven Component', default: false }
]

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

// set options via interactive prompt
const prompts = []

if (!config.name) {
  prompts.push({
    name: 'name',
    message: 'Project name',
    default: '{outFolder}'
  })
}

if (!config.description) {
  prompts.push({
    name: 'description',
    message: 'Project description',
    default: ({name}) => {
      return `${name}.vic.gov.au`
    }
  })
}

if (!config.backendurl) {
  prompts.push({
    name: 'backendurl',
    message: 'Enter backend content repository url',
    default: `http://develop.content.vic.gov.au`
  })
}

if (!config.siteid) {
  prompts.push({
    name: 'siteid',
    message: 'Site ID',
    default: '4'
  })
}

if (!config.authuser) {
  prompts.push({
    name: 'authuser',
    message: 'Enter auth username',
    default: 'dpc'
  })
}

if (!config.authpass) {
  prompts.push({
    name: 'authpass',
    message: 'Enter auth password',
    default: 'sdp'
  })
}

if (!config.gtmtoken) {
  prompts.push({
    name: 'gtmtoken',
    message: 'Enter Google Tag Manager Token',
    default: 'GA-123456-1'
  })
}

if (!config.modules) {
  prompts.push({
    name: 'modules',
    message: 'Choose tide modules to install',
    type: 'checkbox',
    choices: [
      ...TIDE_MODULES
    ],
    default: TIDE_MODULES.filter(m => m.default === true).map(m => m.value)
  })
}

if (!config.author) {
  prompts.push({
    name: 'author',
    type: 'string',
    message: 'Author name',
    default: '{gitUser.name}',
    store: true
  })
}

if (!config.pm && prompts.length > 0) {
  prompts.push({
    name: 'pm',
    message: 'Choose a package manager',
    choices: ['npm', 'yarn'],
    type: 'list',
    default: 'yarn'
  })
} else {
  // set package manager to yarn if its the only config missing
  config.pm = 'yarn'
}

if (!config.e2e) {
  prompts.push({
    name: 'e2e',
    message: 'Add E2E tests?',
    type: 'confirm',
    default: true
  })
}

if (!config.examples) {
  prompts.push({
    name: 'examples',
    message: 'Add code examples?',
    type: 'confirm',
    default: false
  })
}

module.exports = {
  prompts () {
    return prompts
  },
  templateData () {
    const results = {
      ...this.answers,
      ...config
    }

    const paramModules = results.modules || []
    const tideModules = {}

    TIDE_MODULES.map(m => m.value).forEach(module => {
      if (paramModules.includes(module) || results.modules.includes(module)) {
        tideModules[module] = 'yes'
      } else {
        tideModules[module] = 'no'
      }
    })

    return {
      ...results,
      ...tideModules
    }
  },
  actions () {
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
      }
    ]

    if (results.e2e) {
      actions.push({
        type: 'add',
        files: ['**'],
        templateDir: 'template/_tests'
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
        gitignore: '.gitignore',
        '_package.json': 'package.json'
      }
    })

    return actions
  },
  async completed () {
    // this.gitInit()

    await this.npmInstall({ npmClient: this.answers.pm })

    const isNewFolder = this.outDir !== process.cwd()
    const cd = () => {
      if (isNewFolder) {
        console.log(`\t${this.chalk.cyan('cd')} ${this.outFolder}`)
      }
    }

    console.log()
    console.log(this.chalk.bold(`  To get started:\n`))
    cd()
    console.log(`\t${this.answers.pm} run dev\n`)
    console.log(this.chalk.bold(`  To build & start for production:\n`))
    cd()
    console.log(`\t${this.answers.pm} run build`)
    console.log(`\t${this.answers.pm} start`)
    console.log()
  }
}
