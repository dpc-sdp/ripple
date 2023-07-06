//@ts-nocheck runtime imports
import { defineEventHandler, H3Event } from 'h3'
import { createHandler, logger } from '@dpc-sdp/ripple-tide-api'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const createSearchHandler = async (event: H3Event) => {
  const config = useRuntimeConfig()

  const proxyMiddleware = createProxyMiddleware({
    target: config.public.tide.appSearch.endpointBase,
    pathRewrite: {
      '^/api/tide/search': '/api/as/v1/engines/'
    },
    on: {
      proxyReq(proxyReq, req, res) {
        proxyReq.setHeader(
          'Authorization',
          `Bearer ${config.tide.appSearch.privateSearchKey}`
        )
      }
    },
    logger: logger,
    changeOrigin: true
  })

  return createHandler(event, 'TideSearchHandler', async () => {
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
  return createSearchHandler(event)
})
