import { defineEventHandler, H3Event, sendError, createError } from 'h3'
import { createProxyHandler, logger } from '@dpc-sdp/ripple-tide-api'
import { BadRequestError } from '@dpc-sdp/ripple-tide-api/errors'
import verifyCaptcha from '../../../utils/verifyCaptcha'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event: H3Event) => {
  const { tide, public: config } = useRuntimeConfig()
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

  return createProxyHandler(event, 'TideWebformHandler', {
    changeOrigin: true,
    target: config.tide.baseUrl,
    pathRewrite: {
      '/api/tide/': '/api/v1/'
    },
    basicAuth: {
      username: tide.webformSubmit.username,
      password: tide.webformSubmit.password
    }
  })
})
