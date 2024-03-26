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
    on: {
      proxyReq(proxyReq) {
        const basicAuthUser = config.tide.elasticsearch.username
        const basicAuthPass = config.tide.elasticsearch.password

        // if a username and password is provided, set the basic Authorization header
        if (basicAuthUser && basicAuthPass) {
          const basicAuthBase64 = Buffer.from(
            `${basicAuthUser}:${basicAuthPass}`
          ).toString('base64')
          proxyReq.setHeader('Authorization', `Basic ${basicAuthBase64}`)
        }
      }
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
