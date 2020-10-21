import appHandler from './index'
import templates from './example-template'
import { Client } from '@elastic/elasticsearch'

require('dotenv').config()

const port = 3001

const app = appHandler({
  apiBase: 'search',
  apiVersion: 'v1',
  client: new Client({
    node: 'https://' + process.env.SEARCH_HASH + '.' + process.env.SEARCH_URL,
    auth: {
      username: process.env.SEARCH_AUTH_USERNAME,
      password: process.env.SEARCH_AUTH_PASSWORD
    }
  }),
  index: process.env.SEARCH_INDEX,
  log: {
    level: process.env.SEARCH_LOG
  },
  templates,
  cacheAge: 30,
  tide: {
    site: 4,
    search: {
      index: process.env.SEARCH_INDEX
    },
    baseUrl: 'https://develop.content.vic.gov.au/'
  }
})

app.listen(port, () => {
  console.log(`Application is running on port: ${port}`)
})
