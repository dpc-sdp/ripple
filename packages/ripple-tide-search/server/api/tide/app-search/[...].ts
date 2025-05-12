import { defineEventHandler, H3Event, proxyRequest, getRequestURL } from 'h3'
import { createHandler, logger } from '@dpc-sdp/ripple-tide-api'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event: H3Event) => {
  const label = 'TideAppSearchProxyHandler'
  const { tide, public: config } = useRuntimeConfig()

  return createHandler(event, label, async () => {
    const route = getRequestURL(event)
    const target =
      config.tide.appSearch.endpointBase +
      route.pathname.replace('/api/tide/app-search', '/api/as/v1/engines')

    logger.info(`Proxy ${route.href} request to ${target}`, { label })

    return await proxyRequest(event, target, {
      headers: {
        Authorization: `Bearer ${tide.appSearch.privateSearchKey}`
      },
      onResponse(_event) {
        _event.node.res.removeHeader('access-control-allow-origin')
      }
    })
  })
})
