import { defineEventHandler, H3Event, proxyRequest, getRequestURL } from 'h3'
import { createHandler, logger } from '@dpc-sdp/ripple-tide-api'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event: H3Event) => {
  const label = 'TideSitemapProxyHandler'
  const { public: config } = useRuntimeConfig()

  return createHandler(event, label, async () => {
    const route = getRequestURL(event)
    const target = `${config.tide.baseUrl}/site-${config.tide.site}/sitemap.xml${route.search}`

    logger.info(`Proxy ${route.href} request to ${target}`, { label })

    return await proxyRequest(event, target)
  })
})
