import createRippleTideApiServer from '@dpc-sdp/ripple-tide-api'
const port = 3000

const app = createRippleTideApiServer({
  apiBase: 'api',
  apiVersion: 'v2',
  debug: process.env.NODE_ENV === 'development',
  auth: {
    username: 'dpc',
    password: 'sdp'
  },
  modules: {
    page: true,
    landing_page: true,
    event: true
  },
  tide: {
    apiPrefix: 'api/v1',
    site: 4,
    baseUrl: process.env.CONTENT_API_SERVER
  }
})

app.listen(port, () => {
  console.info(`Application is running on port: ${port}`)
})
