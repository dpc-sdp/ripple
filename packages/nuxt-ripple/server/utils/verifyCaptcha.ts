import { useRuntimeConfig } from '#imports'
import { logger } from '@dpc-sdp/ripple-tide-api'
import {
  ApplicationError,
  UnauthorisedError
} from '@dpc-sdp/ripple-tide-api/errors'

import type { H3Event } from 'h3'
import {
  CaptchaType,
  MappedCaptchaConfig
} from '@dpc-sdp/ripple-tide-webform/types'

const logLabel = 'Verify CAPTCHA'

const genericCaptchaVerify = async (
  verifyUrl: string,
  secretKey: string,
  responseToken: string,
  responseCallback: (response: any, statusCode: number) => boolean
) => {
  try {
    const formData = new FormData()

    formData.append('secret', secretKey)
    formData.append('response', responseToken)

    const response = await $fetch.raw(verifyUrl, {
      method: 'POST',
      body: formData
    })

    const statusCode = response.status
    const verifyResponse = response._data

    const isValid = responseCallback(verifyResponse, statusCode)

    if (!isValid) {
      logger.error('CAPTCHA verification failed', {
        label: logLabel,
        statusCode,
        response: verifyResponse
      })
    }

    return isValid
  } catch (error) {
    return false
  }
}

const verifyGoogleRecaptchaV3 = async (
  secretKey: string,
  captchaConfig: MappedCaptchaConfig,
  captchaResponse: string
) => {
  const defaultScoreThreshold = 0.5

  const scoreThreshold =
    typeof captchaConfig?.scoreThreshold === 'number'
      ? captchaConfig?.scoreThreshold
      : defaultScoreThreshold

  return await genericCaptchaVerify(
    'https://www.google.com/recaptcha/api/siteverify',
    secretKey,
    captchaResponse,
    (verifyResponse) => {
      return (
        !!verifyResponse?.success && verifyResponse?.score >= scoreThreshold
      )
    }
  )
}

const verifyGoogleRecaptchaV2 = async (
  secretKey: string,
  captchaResponse: string
) => {
  return await genericCaptchaVerify(
    'https://www.google.com/recaptcha/api/siteverify',
    secretKey,
    captchaResponse,
    (verifyResponse, statusCode) => {
      const QUOTA_EXCEEDED_STATUS_CODE = 429

      if (statusCode === QUOTA_EXCEEDED_STATUS_CODE) {
        // If any quotas are hit, allow the submission
        // We don't want to block genuine requests to the form, but we log an error
        logger.error('Recaptcha V2 quota reached, allowing all submissions', {
          label: logLabel
        })

        return true
      }

      return !!verifyResponse?.success
    }
  )
}

const verifyCloudfareTurnstile = async (
  secretKey: string,
  captchaResponse: string
) => {
  return await genericCaptchaVerify(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    secretKey,
    captchaResponse,
    (verifyResponse) => {
      return !!verifyResponse?.success
    }
  )
}

const verify = async (
  secretKey: string,
  captchaConfig: MappedCaptchaConfig,
  captchaResponse?: string
) => {
  if (!captchaResponse) {
    return false
  }

  switch (captchaConfig?.type) {
    case CaptchaType.RECAPTCHA_V3:
      return await verifyGoogleRecaptchaV3(
        secretKey,
        captchaConfig,
        captchaResponse
      )
    case CaptchaType.RECAPTCHA_V2:
      return await verifyGoogleRecaptchaV2(secretKey, captchaResponse)
    case CaptchaType.TURNSTILE:
      return await verifyCloudfareTurnstile(secretKey, captchaResponse)
    default:
      return false
  }
}

const verifyCaptcha = async (event: H3Event) => {
  const config = useRuntimeConfig()
  const captchaResponse = getHeader(event, 'x-captcha-response')
  const formId = event.context.params?.formId
  let webform

  try {
    webform = await $fetch('/api/tide/webform', {
      baseURL: config.apiUrl || '',
      params: {
        id: formId
      }
    })
  } catch (error) {
    throw new ApplicationError(
      `Couldn't get webform data, unable to continue because we don't know if a captcha is required`,
      { cause: error }
    )
  }

  if (!webform) {
    throw new ApplicationError(
      `Couldn't get webform data, unable to continue because we don't know if a captcha is required`
    )
  }

  const formHasCaptcha = webform?.captchaConfig?.enabled

  if (!formHasCaptcha) {
    return true
  }

  const secretKey =
    config.tide.captchaSecret[webform?.captchaConfig?.siteIdentifier]

  if (!secretKey) {
    throw new ApplicationError(
      `Secret key missing for site identifier: ${webform?.captchaConfig?.siteIdentifier} (site key: ${webform?.captchaConfig?.siteKey})`
    )
  }

  const isValid = await verify(
    secretKey,
    webform?.captchaConfig,
    captchaResponse
  )

  if (!isValid) {
    throw new UnauthorisedError('Failed to verify CAPTCHA response token')
  }

  logger.info('CAPTCHA verification successful', {
    label: logLabel,
    formId
  })
}

export default verifyCaptcha
