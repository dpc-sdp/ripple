import { CaptchaType, MappedCaptchaConfig } from '../types'

const getGoogleRecaptchaV3Response = async (
  _window: any,
  captchaConfig: MappedCaptchaConfig
) => {
  return await _window?.grecaptcha.execute(captchaConfig.siteKey, {
    action: 'submit'
  })
}

const getGoogleRecaptchaV2Response = (_window: any) => {
  return _window?.grecaptcha.getResponse()
}

const getCloudfareTurnstileResponse = (_window: any) => {
  return _window?.turnstile.getResponse()
}

const getResponse = async (
  captchaConfig: MappedCaptchaConfig,
  _window: any
) => {
  switch (captchaConfig.type) {
    case CaptchaType.RECAPTCHA_V3:
      return await getGoogleRecaptchaV3Response(_window, captchaConfig)
    case CaptchaType.RECAPTCHA_V2:
      return getGoogleRecaptchaV2Response(_window)
    case CaptchaType.TURNSTILE:
      return getCloudfareTurnstileResponse(_window)
    default:
      throw new Error(`Captcha type not implemented: '${captchaConfig.type}'`)
  }
}

export const getCaptchaResponse = async (
  captchaConfig?: MappedCaptchaConfig,
  _window?: any
) => {
  if (!captchaConfig?.enabled) {
    return null
  }

  const response = await getResponse(captchaConfig, _window)

  if (!response) {
    throw new Error(
      'Failed to get captcha response token, but the form requires a CAPTCHA'
    )
  }

  return response
}
