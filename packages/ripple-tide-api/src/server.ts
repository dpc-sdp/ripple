import createRippleTideApiServer from './create-server'
import env from 'dotenv'

//.env
env.config()
const PORT = process.env.PORT || 3001
const SERVER_URL = process.env.SERVER_URL || 'http://localhost'

const app = createRippleTideApiServer({
  apiBase: 'api',
  apiVersion: 'v2',
  debug: process.env.NODE_ENV === 'development',
  site: 4,
  siteMapping: {
    mapping: {
      name: 'name'
    },
    includes: [
      'field_site_logo'
    ]
  },
  modules: {
    landing_page: {
      mapping: {
        title: 'title'
      },
      includes: []
    }
  },
  auth: {
    username: 'dpc',
    password: 'dpc',
  },
  tide: {
    apiPrefix: 'api/v1',
    site: 4,
    baseUrl: process.env.CONTENT_API_SERVER || '',
    auth: {
      username: 'dpc',
      password: 'sdp',
    }
  }
})

app.listen(PORT, () => {
  console.info(`Service starting at ${SERVER_URL}:${PORT}`)
}) 