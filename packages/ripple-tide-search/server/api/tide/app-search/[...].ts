//@ts-nocheck runtime imports
import { defineEventHandler, H3Event } from 'h3'
import { createHandler, logger } from '@dpc-sdp/ripple-tide-api'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const createAppSearchHandler = async (event: H3Event) => {
  const { public: config } = useRuntimeConfig()

  const proxyMiddleware = createProxyMiddleware({
    target: config.tide.appSearch.endpointBase,
    pathRewrite: {
      '^/api/tide/app-search': ''
    },
    on: {
      proxyReq(proxyReq) {
        proxyReq.setHeader(
          'Authorization',
          `Bearer ${config.tide.appSearch.searchKey}`
        )
      }
    },
    logger: logger,
    changeOrigin: true
  })

  return createHandler(event, 'TideAppSearchHandler', async () => {
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
  return createAppSearchHandler(event)
})
