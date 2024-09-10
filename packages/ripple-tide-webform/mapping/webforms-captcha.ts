import {
  CaptchaType,
  type ApiWebForm,
  type MappedCaptchaConfig
} from './../types'

export const getCaptchaSettings = (
  webform: ApiWebForm
): MappedCaptchaConfig => {
  return {
    enabled: webform?.third_party_settings?.tide_webform?.enable_captcha === 1,
    type: CaptchaType.RECAPTCHA_V2,
    siteKey: (webform?.third_party_settings?.tide_webform?.captcha_details
      ?.site_key || '') as string,
    siteIdentifier: (webform?.third_party_settings?.tide_webform
      ?.captcha_details?.term_id || '') as string
  }
}
