import {
  CaptchaType,
  type ApiWebForm,
  type MappedCaptchaConfig
} from './../types'
import { camelCase } from 'lodash-es'

export const getCaptchaSettings = (
  webform: ApiWebForm
): MappedCaptchaConfig => {
  const scoreThreshold =
    webform?.third_party_settings?.tide_webform?.score_threshold

  const siteIdentifier = camelCase(
    (webform?.third_party_settings?.tide_webform?.captcha_details?.captcha_id ||
      '') as string
  )

  return {
    enabled: webform?.third_party_settings?.tide_webform?.enable_captcha === 1,
    type: webform?.third_party_settings?.tide_webform
      ?.captcha_type as CaptchaType,
    siteKey: (webform?.third_party_settings?.tide_webform?.captcha_details
      ?.site_key || '') as string,
    siteIdentifier,
    scoreThreshold:
      typeof scoreThreshold === 'number' ? scoreThreshold : undefined
  }
}
