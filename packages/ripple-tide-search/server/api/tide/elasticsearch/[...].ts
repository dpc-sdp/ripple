import { defineEventHandler, H3Event, proxyRequest, getRequestURL } from 'h3'
import { createHandler, logger } from '@dpc-sdp/ripple-tide-api'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event: H3Event) => {
  const { tide, public: config } = useRuntimeConfig()
  const label = 'TideElasticsearchProxyHandler'

  return createHandler(event, label, async () => {
    const route = getRequestURL(event)
    const target =
      config.tide.elasticsearch.host +
      route.pathname.replace('/api/tide/elasticsearch', '')
    const headers = {}

    const basicAuthUser = tide.elasticsearch.username
    const basicAuthPass = tide.elasticsearch.password

    // If a username and password are provided, set the basic Authorization header
    if (basicAuthUser && basicAuthPass) {
      const basicAuthBase64 = Buffer.from(
        `${basicAuthUser}:${basicAuthPass}`
      ).toString('base64')
      headers['Authorization'] = `Basic ${basicAuthBase64}`
    }

    logger.info(`Proxy ${route.href} request to ${target}`, { label })

    return await proxyRequest(event, target, {
      headers,
      onResponse(_event) {
        _event.node.res.removeHeader('access-control-allow-origin')
      }
    })
  })
})
