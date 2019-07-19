// const { join } = require('path')

const validate = require('validate-npm-package-name')
const args = require('minimist')(process.argv.slice(2))

const prompts = []

let {
  name,
  description,
  modules,
  author,
  backendurlValue,
  siteidValue,
  authuserValue,
  authpassValue,
  gtmTokenValue } = args

if (!name) {
  prompts.push(
    {
      name: 'name',
      message: 'Project name',
      default: '{outFolder}'
    }
  )
}

if (!description) {
  prompts.push(
    {
      name: 'description',
      message: 'Project description',
      default: `{name}.vic.gov.au`
    },
  )
}

if (!backendurlValue) {
  prompts.push(
    {
      name: 'backendurl',
      message: 'Enter backend url',
      default: `{name}.vic.gov.au`
    }
  )
}

if (!siteidValue) {
  prompts.push(
    {
      name: 'siteid',
      message: 'Site ID',
      default: '4'
    }
  )
}

if (!authuserValue) {
  prompts.push(
    {
      name: 'authuser',
      message: 'Enter auth username',
      default: 'dpc'
    }
  )
}

if (!authpassValue) {
  prompts.push(
    {
      name: 'authpass',
      message: 'Enter auth password',
      default: 'sdp'
    }
  )
}

if (!gtmTokenValue) {
  prompts.push(
    {
      name: 'gtmtoken',
      message: 'Enter Google Tag Manager Token',
      default: 'GA-123456-1'
    }
  )
}

if (!modules) {
  prompts.push(
    {
      name: 'modules',
      message: 'Choose tide modules to install',
      type: 'checkbox',
      choices: [
        {
          name: 'Site',
          value: 'site'
        },
        {
          name: 'Page',
          value: 'page'
        },
        {
          name: 'Landing Page',
          value: 'landingPage'
        },
        {
          name: 'Events',
          value: 'event'
        },
        {
          name: 'News',
          value: 'news'
        },
        {
          name: 'Grants',
          value: 'grant'
        },
        {
          name: 'Profiles',
          value: 'profile'
        },
        {
          name: 'Media',
          value: 'media'
        },
        {
          name: 'Webforms',
          value: 'webform'
        },
        {
          name: 'Search',
          value: 'search'
        },
        {
          name: 'Publications',
          value: 'publication'
        },
        {
          name: 'Monsido',
          value: 'monsido'
        },
        {
          name: 'Authenticated content',
          value: 'authenticatedContent'
        }
      ],
      default: ['site', 'page', 'landingPage', 'event', 'news', 'grant', 'profile', 'media', 'webform', 'search']
    }
  )
}

if (!author) {
  prompts.push(
    {
      name: 'author',
      type: 'string',
      message: 'Author name',
      default: '{gitUser.name}',
      store: true
    }
  )
}

prompts.push(
  {
    name: 'pm',
    message: 'Choose a package manager',
    choices: ['npm', 'yarn'],
    type: 'list',
    default: 'yarn'
  }
)

module.exports = {
  prompts,
  templateData () {
    const gtmToken = gtmTokenValue ? gtmTokenValue : this.answers.gtmtoken
    const tideModules = modules ? modules.split(',') : []
    const siteModule = tideModules ? tideModules.includes('site') : this.answers.modules.includes('site')
    const pageModule = tideModules ? tideModules.includes('page') : this.answers.modules.includes('page')
    const eventModule = tideModules ? tideModules.includes('event') : this.answers.modules.includes('event')
    const newsModule = tideModules ? tideModules.includes('news') : this.answers.modules.includes('news')
    const grantModule = tideModules ? tideModules.includes('grant') : this.answers.modules.includes('grant')
    const mediaModule = tideModules ? tideModules.includes('media') : this.answers.modules.includes('media')
    const publicationModule = tideModules ? tideModules.includes('publication') : this.answers.modules.includes('publication')
    const profileModule = tideModules ? tideModules.includes('profile') : this.answers.modules.includes('profile')
    const landingPageModule = tideModules ? tideModules.includes('landingPage') : this.answers.modules.includes('landingPage')
    const webformModule = tideModules ? tideModules.includes('webform') : this.answers.modules.includes('webform')
    const searchModule = tideModules ? tideModules.includes('search') : this.answers.modules.includes('search')
    const monsidoModule = tideModules ? tideModules.includes('monsido') : this.answers.modules.includes('monsido')
    const authenticatedContentModule = tideModules ? tideModules.includes('authenticatedContent') : this.answers.modules.includes('authenticatedContent')
    const dataDrivenComponentModule = tideModules ? tideModules.includes('dataDrivenComponent') : this.answers.modules.includes('dataDrivenComponent')
    const alertModule = tideModules ? tideModules.includes('alert') : this.answers.modules.includes('alert')
    const gtmModule = gtmToken ? 'yes' : 'no'
    const backendurl = backendurlValue ? backendurlValue : this.answers.backendurl
    const siteid = siteidValue ? siteidValue : this.answers.siteid
    const authuser = authuserValue ? authuserValue : this.answers.authuser
    const authpass = authpassValue ? authpassValue : this.answers.authpass

    return {
      author: author || this.answers.author,
      name: name || this.answers.name,
      description: description || this.answers.description,
      siteModule: siteModule ? 'yes' : 'no',
      pageModule: pageModule ? 'yes' : 'no',
      eventModule: eventModule ? 'yes' : 'no',
      newsModule: newsModule ? 'yes' : 'no',
      grantModule: grantModule ? 'yes' : 'no',
      mediaModule: mediaModule ? 'yes' : 'no',
      webformModule: webformModule ? 'yes' : 'no',
      searchModule: searchModule ? 'yes' : 'no',
      publicationModule: publicationModule ? 'yes' : 'no',
      profileModule: profileModule ? 'yes' : 'no',
      landingPageModule: landingPageModule ? 'yes' : 'no',
      monsidoModule: monsidoModule ? 'yes' : 'no',
      authenticatedContentModule: authenticatedContentModule ? 'yes' : 'no',
      dataDrivenComponentModule: dataDrivenComponentModule ? 'yes' : 'no',
      alertModule: alertModule ? 'yes' : 'no',
      gtmModule,
      backendurl,
      siteid,
      authuser,
      authpass,
      gtmToken
    }
  },
  actions () {
    console.log('name', name || this.answers.name)
    const validation = validate(name || this.answers.name)
    validation.warnings && validation.warnings.forEach((warn) => {
      console.warn('Warning:', warn)
    })
    validation.errors && validation.errors.forEach((err) => {
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
        files: [
          '_package.json'
        ]
      }
    ]

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
