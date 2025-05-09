import { defineEventHandler, H3Event, proxyRequest } from 'h3'
import { createHandler } from '@dpc-sdp/ripple-tide-api'

export default defineEventHandler(async (event: H3Event) => {
  const { tide, public: config } = useRuntimeConfig()

  return createHandler(event, 'TideElasticsearchProxyHandler', async () => {
    const route = getRequestURL(event)
    const target =
      config.tide.elasticsearch.host +
      route.pathname.replace('/api/tide/elasticsearch', '')
    const headers = {}

    const basicAuthUser = tide.elasticsearch.username
    const basicAuthPass = tide.elasticsearch.password

    // if a username and password is provided, set the basic Authorization header
    if (basicAuthUser && basicAuthPass) {
      const basicAuthBase64 = Buffer.from(
        `${basicAuthUser}:${basicAuthPass}`
      ).toString('base64')
      headers['Authorization'] = `Basic ${basicAuthBase64}`
    }

    return await proxyRequest(event, target, { headers })
  })
})
