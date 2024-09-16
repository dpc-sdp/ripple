import {
  CaptchaType,
  type ApiWebForm,
  type MappedCaptchaConfig
} from './../types'

export const getCaptchaSettings = (
  webform: ApiWebForm
): MappedCaptchaConfig => {
  const scoreThreshold =
    webform?.third_party_settings?.tide_webform_captcha?.score_threshold

  return {
    enabled:
      webform?.third_party_settings?.tide_webform_captcha?.enable_captcha === 1,
    type: webform?.third_party_settings?.tide_webform_captcha
      ?.captcha_type as CaptchaType,
    siteKey: (webform?.third_party_settings?.tide_webform_captcha
      ?.captcha_details?.site_key || '') as string,
    siteIdentifier: (webform?.third_party_settings?.tide_webform_captcha
      ?.captcha_details?.term_id || '') as string,
    scoreThreshold:
      typeof scoreThreshold === 'number' ? scoreThreshold : undefined
  }
}
