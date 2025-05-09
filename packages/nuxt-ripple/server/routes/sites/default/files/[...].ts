import { defineEventHandler, H3Event, proxyRequest } from 'h3'
import { createHandler } from '@dpc-sdp/ripple-tide-api'

export default defineEventHandler(async (event: H3Event) => {
  const { public: config } = useRuntimeConfig()

  return createHandler(event, 'TideFileProxyHandler', async () => {
    const route = getRequestURL(event)
    const target = `${config.tide.baseUrl}${route.pathname}${route.search}`
    const headers = {
      'X-Sdp-Request-Location': 'tide'
    }
    if (config.isStatic) {
      headers['User-Agent'] = 'Quant'
    }

    // Proxy the request to the tide backend
    return await proxyRequest(event, target, {
      headers,
      onResponse(_event) {
        _event.node.res.setHeader('X-Sdp-App-Type', 'tide')
      }
    })
  })
})
