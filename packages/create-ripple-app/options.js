const TIDE_MODULES = require('./tidemodules')

module.exports = {
  name: {
    name: 'name',
    message: 'Project name',
    type: 'string',
    default: '{outFolder}'
  },
  release: {
    name: 'release',
    message: 'Release Version (SDP Release)',
    type: 'string',
    default: 'latest',
    store: true
  },
  domain: {
    name: 'domain',
    message: 'Domain',
    default: ({ name }) => {
      return `${name}.vic.gov.au`
    }
  },
  backendurl: {
    name: 'backendurl',
    message: 'Enter backend content repository url',
    default: ``
  },
  siteid: {
    name: 'siteid',
    message: 'Site ID',
    default: '4'
  },
  authuser: {
    name: 'authuser',
    message: 'Enter basic auth shield username',
    default: ''
  },
  authpass: {
    name: 'authpass',
    message: 'Enter auth password',
    default: ''
  },
  oauthclientid: {
    name: 'oauthclientid',
    message: 'Enter backend content OAuth client id',
    default: ``
  },
  gtmtoken: {
    name: 'gtmtoken',
    message: 'Enter Google Tag Manager Token',
    default: ''
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
  smoke: {
    name: 'smoke',
    message: 'Add Integration tests?',
    type: 'confirm',
    default: true
  },
  unit: {
    name: 'unit',
    message: 'Add unit tests?',
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
    default: 'elastic.sdp2.sdp.vic.gov.au',
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
    message: 'Drupal user name for E2E automation',
    default: '',
    store: true
  },
  adminpass: {
    name: 'adminpass',
    type: 'string',
    message: 'Drupal user pass for E2E automation',
    default: '',
    store: true
  }
}
