//@ts-nocheck runtime imports
import { defineEventHandler, H3Event } from 'h3'
import { createHandler, logger } from '@dpc-sdp/ripple-tide-api'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const createFilesProxyHandler = async (event: H3Event) => {
  const { public: config } = useRuntimeConfig()

  const proxyMiddleware = createProxyMiddleware({
    target: config.tide.baseUrl,
    logger: logger,
    changeOrigin: true,
    on: {
      proxyReq(proxyReq) {
        proxyReq.setHeader('X-Sdp-Request-Location', 'tide')
      },
      proxyRes(proxyRes) {
        if (proxyRes?.headers) {
          proxyRes.headers['X-Sdp-App-Type'] = 'tide'
        }
      }
    }
  })

  return createHandler(event, 'TideFilesProxyHandler', async () => {
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
  return createFilesProxyHandler(event)
})
