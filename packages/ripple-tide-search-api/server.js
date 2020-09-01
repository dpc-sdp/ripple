import appHandler from './index'
import templates from './example-template'
require('dotenv').config()

const port = 3001

const app = appHandler({
  apiBase: 'search',
  apiVersion: 'v1',
  auth: {
    username: 'dpc',
    password: 'sdp'
  },
  tide: {
    site: 4,
    baseUrl: 'https://develop.content.vic.gov.au/',
    search: {
      cacheAge: 30,
      templates,
      service: process.env.SEARCH_SERVICE,
      index: process.env.SEARCH_INDEX,
      url: 'https://' + process.env.SEARCH_HASH + '.' + process.env.SEARCH_URL,
      log: process.env.SEARCH_LOG,
      auth: {
        username: process.env.SEARCH_AUTH_USERNAME,
        password: process.env.SEARCH_AUTH_PASSWORD
      }
    }
  }
})

app.listen(port, () => {
  console.log(`Application is running on port: ${port}`)
})
