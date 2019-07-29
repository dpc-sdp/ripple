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
  {
    value: 'authenticatedContent',
    name: 'Authenticated Content',
    default: false
  },
  {
    value: 'dataDrivenComponent',
    name: 'Data Driven Component',
    default: false
  }
]

const OPTIONS = {
  name: {
    name: 'name',
    message: 'Project name',
    type: 'string',
    default: '{outFolder}'
  },
  description: {
    name: 'description',
    message: 'Project description',
    default: ({ name }) => {
      return `${name || config.name}.vic.gov.au`
    }
  },
  backendurl: {
    name: 'backendurl',
    message: 'Enter backend content repository url',
    default: `http://develop.content.vic.gov.au`
  },
  siteid: {
    name: 'siteid',
    message: 'Site ID',
    default: '4'
  },
  authuser: {
    name: 'authuser',
    message: 'Enter basic auth shield username',
    default: 'dpc'
  },
  authpass: {
    name: 'authpass',
    message: 'Enter auth password',
    default: 'sdp'
  },
  gtmtoken: {
    name: 'gtmtoken',
    message: 'Enter Google Tag Manager Token',
    default: 'GA-123456-1'
  },
  modules: {
    name: 'modules',
    message: 'Choose tide modules to install',
    type: 'checkbox',
    choices: [...TIDE_MODULES],
    default: TIDE_MODULES.filter(m => m.default === true).map(m => m.value)
  },
  author: {
    name: 'author',
    type: 'string',
    message: 'Author name',
    default: '{gitUser.name}',
    store: true
  },
  pm: {
    name: 'pm',
    message: 'Choose a package manager',
    choices: ['npm', 'yarn'],
    type: 'list',
    default: 'yarn'
  },
  e2e: {
    name: 'e2e',
    message: 'Add E2E tests?',
    type: 'confirm',
    default: true
  },
  examples: {
    name: 'examples',
    message: 'Add code examples?',
    type: 'confirm',
    default: false
  },
  searchhash: {
    name: 'searchhash',
    type: 'string',
    message: 'Elasticsearch search hash',
    default: '',
    store: true
  },
  searchurl: {
    name: 'searchurl',
    type: 'string',
    message: 'Elasticsearch URL',
    default: 'elasticdev.sdp.vic.gov.au',
    store: true
  },
  searchindex: {
    name: 'searchindex',
    type: 'string',
    message: 'Elasticsearch index',
    default: '',
    store: true
  },
  searchusername: {
    name: 'searchusername',
    type: 'string',
    message: 'Elasticsearch username',
    default: '',
    store: true
  },
  searchpassword: {
    name: 'searchpassword',
    type: 'string',
    message: 'Elasticsearch password',
    default: '',
    store: true
  },
  adminuser: {
    name: 'adminuser',
    type: 'string',
    message: 'Admin username (For E2E tests)',
    default: '',
    store: true
  },
  adminpass: {
    name: 'adminpass',
    type: 'string',
    message: 'Admin password (For E2E tests)',
    default: '',
    store: true
  }
}

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
  if (!config[option.name]) {
    prompts.push(option)
  }
})

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
      },
      {
        type: 'add',
        files: ['_.env'],
        transform: true
      }
    ]

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
        '_package.json': 'package.json',
        '_.env': '.env'
      }
    })

    if (results.e2e) {
      actions.push({
        type: 'add',
        files: ['**'],
        templateDir: 'template/_tests/_common'
      })

      // only add tests for enabled modules
      results.modules.forEach(tideModule => {
        const hasTests = fs.existsSync(path.resolve(__dirname, `./template/_tests/_modules/test/e2e/integration/${tideModule}`))
        if (hasTests) {
          actions.push(
            {
              type: 'add',
              files: [`./test/e2e/integration/${tideModule}/**`, `./test/e2e/fixtures/${tideModule}/**`],
              templateDir: 'template/_tests/_modules'
            }
          )
        }
      })
    }

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
