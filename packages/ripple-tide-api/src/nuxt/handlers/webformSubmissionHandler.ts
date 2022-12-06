import { defineEventHandler } from 'h3'
import { createProxyMiddleware } from 'http-proxy-middleware'

const apiProxyMiddleware = createProxyMiddleware({
  target: process.env.NUXT_PUBLIC_TIDE_CONTENT_API_BASE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/tide/': '/api/v1/' },
  headers: {
    'Content-Type': 'application/vnd.api+json;charset=UTF-8'
  }
}) as any

export default defineEventHandler(async (event) => {
  await new Promise((resolve, reject) => {
    const next = (err?: unknown) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    }

    apiProxyMiddleware(event.req, event.res, next)
  })
})
