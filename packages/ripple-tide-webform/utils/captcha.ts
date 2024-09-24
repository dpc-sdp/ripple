import { CaptchaType, MappedCaptchaConfig } from '../types'

const getGoogleRecaptchaV3Response = async (
  _window: any,
  captchaConfig: MappedCaptchaConfig,
  formId: string
) => {
  return await _window?.grecaptcha.execute(captchaConfig.siteKey, {
    // We set the 'action' as the formId so it can be identified in the analytics dashboard
    action: formId
  })
}

const getGoogleRecaptchaV2Response = (
  _window: any,
  captchaWidgetId?: string
) => {
  return _window?.grecaptcha.getResponse(captchaWidgetId)
}

const getCloudfareTurnstileResponse = (
  _window: any,
  captchaWidgetId?: string
) => {
  return _window?.turnstile.getResponse(captchaWidgetId)
}

const getResponse = async (
  formId: string,
  captchaConfig: MappedCaptchaConfig,
  captchaWidgetId?: string,
  _window?: any
) => {
  switch (captchaConfig.type) {
    case CaptchaType.RECAPTCHA_V3:
      return await getGoogleRecaptchaV3Response(_window, captchaConfig, formId)
    case CaptchaType.RECAPTCHA_V2:
      return getGoogleRecaptchaV2Response(_window, captchaWidgetId)
    case CaptchaType.TURNSTILE:
      return getCloudfareTurnstileResponse(_window, captchaWidgetId)
    default:
      throw new Error(`Captcha type not implemented: '${captchaConfig.type}'`)
  }
}

export const getCaptchaResponse = async (
  formId: string,
  captchaConfig?: MappedCaptchaConfig,
  captchaWidgetId?: string,
  _window?: any
) => {
  if (!captchaConfig?.enabled) {
    return null
  }

  const response = await getResponse(
    formId,
    captchaConfig,
    captchaWidgetId,
    _window
  )

  if (!response) {
    throw new Error(
      'Failed to get captcha response token, but the form requires a CAPTCHA'
    )
  }

  return response
}
