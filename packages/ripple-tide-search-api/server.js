import appHandler from './index'
import templates from './example-template'

require('dotenv').config()

const port = 3001

const app = appHandler({
  apiBase: 'search',
  apiVersion: 'v1',
  templates,
  cacheAge: 30,
  tide: {
    site: 4,
    search: {
      service: process.env.SEARCH_SERVICE,
      index: process.env.SEARCH_INDEX,
      url: 'https://' + process.env.SEARCH_HASH + '.' + process.env.SEARCH_URL,
      log: 'trace',
      auth: {
        username: process.env.SEARCH_AUTH_USERNAME,
        password: process.env.SEARCH_AUTH_PASSWORD
      }
    },
    baseUrl: 'https://develop.content.vic.gov.au/'
  }
})

app.listen(port, () => {
  console.log(`Application is running on port: ${port}`)
})
