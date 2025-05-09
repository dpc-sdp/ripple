import { defineEventHandler, H3Event, proxyRequest } from 'h3'
import { createHandler } from '@dpc-sdp/ripple-tide-api'

export default defineEventHandler(async (event: H3Event) => {
  const { public: config } = useRuntimeConfig()

  return createHandler(event, 'TideSitemapProxyHandler', async () => {
    const route = getRequestURL(event)
    const target = `${config.tide.baseUrl}/site-${config.tide.site}/sitemap.xml${route.search}`

    return await proxyRequest(event, target)
  })
})
