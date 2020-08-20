import appHandler from './index'
require('dotenv').config()

const port = 3000

const app = appHandler({
  apiBase: 'api',
  apiVersion: 'v2',
  auth: {
    username: 'dpc',
    password: 'sdp'
  },
  tide: {
    site: 4,
    baseUrl: 'https://develop.content.vic.gov.au/',
    search: {
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
