const sao = require('./mock')
const path = require('path')

describe('Test new project generator', () => {
  const generator = path.join(__dirname, './../generators/new')
  test('basic project setup', async () => {
    const mockPromptAnswers = {
      pm: 'npm',
      version: '1.2.0'
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

    const stream = await sao({ generator, logLevel: 2, config }, mockPromptAnswers)

    expect(stream.fileList.includes('package.json')).toEqual(true)
    expect(stream.fileList.includes('jest.config.js')).toEqual(false)
  })
})
