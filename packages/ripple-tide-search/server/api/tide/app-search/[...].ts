import { defineEventHandler, H3Event, proxyRequest } from 'h3'
import { createHandler } from '@dpc-sdp/ripple-tide-api'

export default defineEventHandler(async (event: H3Event) => {
  const { tide, public: config } = useRuntimeConfig()

  return createHandler(event, 'TideAppSearchProxyHandler', async () => {
    const route = getRequestURL(event)
    const target =
      config.tide.appSearch.endpointBase +
      route.pathname.replace('/api/tide/app-search', '/api/as/v1/engines/')

    return await proxyRequest(event, target, {
      headers: {
        Authorization: `Bearer ${tide.appSearch.privateSearchKey}`
      }
    })
  })
})
