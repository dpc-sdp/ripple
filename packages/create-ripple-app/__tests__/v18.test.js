const sao = require('./mock')
const path = require('path')

describe('Test v18 update generator', () => {
  const generator = path.join(__dirname, './../generators/updates/18.0.0')

  test('Updates package.json', async () => {
    const mockPromptAnswers = {
      pm: 'npm',
      version: '1.3.0',
      release: '18.0.0'
    }
    const config = {
      name: 'vic-gov-au',
      domain: 'vic.gov.au',
      backendurl: 'https://www.develop.content.vic.gov.au/',
      siteid: '4',
      authuser: 'dpc',
      authpass: 'sdp',
      gtmtoken: 'GTM-12345-1',
      modules: [
        'site',
        'page',
        'landingPage',
        'event',
        'news',
        'grant',
        'profile',
        'publication',
        'media',
        'webform',
        'search',
        'authenticatedContent',
        'dataDrivenComponent',
        'alert',
        'gtm'
      ],
      author: 'DPC',
      pm: 'npm',
      e2e: true,
      smoke: true,
      unit: false,
      examples: false,
      searchhash: '',
      searchurl: 'elasticdev.sdp.vic.gov.au',
      searchindex: '',
      searchusername: '',
      searchpassword: ''
    }
    const outDir = path.resolve(__dirname, './__mocks__/v18')
    const stream = await sao({ generator, outDir, logLevel: 2, config }, mockPromptAnswers)
    const pkgRaw = await stream.readFile('package.json')
    const pkg = JSON.parse(pkgRaw)
    expect(pkg.dependencies['@dpc-sdp/ripple-nuxt-tide']).toEqual('^1.3.0')
  })
})
