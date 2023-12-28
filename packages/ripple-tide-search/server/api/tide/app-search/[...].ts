//@ts-nocheck runtime imports
import { defineEventHandler, H3Event } from 'h3'
import { createHandler, logger } from '@dpc-sdp/ripple-tide-api'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const createAppSearchHandler = async (event: H3Event) => {
  const runtimeConfig = useRuntimeConfig()
  const proxyMiddleware = createProxyMiddleware({
    target: runtimeConfig.public.tide.appSearch.endpointBase,
    pathRewrite: {
      '^/api/tide/app-search': '/api/as/v1/engines/'
    },
    on: {
      proxyReq(proxyReq) {
        proxyReq.setHeader(
          'Authorization',
          `Bearer ${runtimeConfig.tide.appSearch.privateSearchKey}`
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
