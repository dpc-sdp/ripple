//@ts-nocheck runtime imports
import { defineEventHandler, H3Event } from 'h3'
import { createHandler, logger } from '@dpc-sdp/ripple-tide-api'
import { createProxyMiddleware } from 'http-proxy-middleware'
import verifyCaptcha from '../../../utils/verifyCaptcha'

export const createWebformProxyHandler = async (event: H3Event) => {
  const nuxtConfig = useRuntimeConfig()
  const formId = event.context.params?.formId

  if (!formId) {
    throw new BadRequestError('Form id is required')
  }

  try {
    await verifyCaptcha(event)
  } catch (error) {
    logger.error(`CAPTCHA validation error`, {
      error,
      label: 'TideWebformHandler'
    })
    sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Unable to verify CAPTCHA'
      })
    )
    return
  }

  const proxyMiddleware = createProxyMiddleware({
    target: nuxtConfig.public.tide.baseUrl,
    pathRewrite: {
      '^/api/tide/': '/api/v1/'
    },
    on: {
      proxyReq(proxyReq) {
        const basicAuthUser = nuxtConfig.tide.webformSubmit.username
        const basicAuthPass = nuxtConfig.tide.webformSubmit.password

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

  return createHandler(event, 'TideWebformHandler', async () => {
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
  return createWebformProxyHandler(event)
})
