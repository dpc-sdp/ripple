import { defineEventHandler, H3Event } from 'h3'
import { createProxyHandler } from '@dpc-sdp/ripple-tide-api'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event: H3Event) => {
  const { public: config } = useRuntimeConfig()

  return createProxyHandler(event, 'TideSitemapProxyHandler', {
    changeOrigin: true,
    target: config.tide.baseUrl,
    pathRewrite: {
      '/sitemap.xml': `/site-${config.tide.site}/sitemap.xml`
    }
  })
})
