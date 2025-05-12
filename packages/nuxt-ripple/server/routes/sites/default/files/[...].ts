import { defineEventHandler, H3Event, proxyRequest, getRequestURL } from 'h3'
import { createHandler, logger } from '@dpc-sdp/ripple-tide-api'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event: H3Event) => {
  const label = 'TideFileProxyHandler'
  const { public: config } = useRuntimeConfig()

  return createHandler(event, label, async () => {
    const route = getRequestURL(event)
    const target = `${config.tide.baseUrl}${route.pathname}${route.search}`
    const headers = {
      'X-Sdp-Request-Location': 'tide'
    }
    if (config.isStatic) {
      headers['User-Agent'] = 'Quant'
    }

    logger.info(`Proxy ${route.href} request to ${target}`, { label })

    // Proxy the request to the tide backend
    return await proxyRequest(event, target, {
      headers,
      onResponse(_event) {
        _event.node.res.setHeader('X-Sdp-App-Type', 'tide')
      }
    })
  })
})
