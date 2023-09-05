//@ts-nocheck runtime imports
import { defineEventHandler, H3Event } from 'h3'
import { createHandler, logger } from '@dpc-sdp/ripple-tide-api'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const createElasticSearchHandler = async (event: H3Event) => {
  const config = useRuntimeConfig()

  const proxyMiddleware = createProxyMiddleware({
    target: config.public.tide.elasticsearch.host || '',
    pathRewrite: {
      '^/api/tide/elasticsearch': ''
    },
    logger: logger,
    changeOrigin: true
  })

  return createHandler(event, 'TideElasticSearchHandler', async () => {
    await new Promise((resolve, reject) => {
      proxyMiddleware(event.node.req, event.node.res, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  })
}

export default defineEventHandler(async (event: H3Event) => {
  return createElasticSearchHandler(event)
})
