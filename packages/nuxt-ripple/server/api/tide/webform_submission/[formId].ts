import { defineEventHandler, H3Event, proxyRequest } from 'h3'
import { createHandler, logger } from '@dpc-sdp/ripple-tide-api'
import { BadRequestError } from '@dpc-sdp/ripple-tide-api/errors'
import verifyCaptcha from '../../../utils/verifyCaptcha'

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

  return createHandler(event, 'TideWebformProxyHandler', async () => {
    const route = getRequestURL(event)
    const target =
      config.tide.baseUrl + route.pathname.replace('/api/tide/', '/api/v1/')
    const headers = {}

    const basicAuthUser = tide.webformSubmit.username
    const basicAuthPass = tide.webformSubmit.password

    // if a username and password is provided, set the basic Authorization header
    if (basicAuthUser && basicAuthPass) {
      const basicAuthBase64 = Buffer.from(
        `${basicAuthUser}:${basicAuthPass}`
      ).toString('base64')
      headers['Authorization'] = `Basic ${basicAuthBase64}`
    }

    return await proxyRequest(event, target, { headers })
  })
})
