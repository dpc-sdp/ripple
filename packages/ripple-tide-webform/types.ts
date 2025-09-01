import type { FormKitSchemaNode } from '@formkit/core'

export interface TideWebform {
  title: string
  formId: string
  hideFormOnSubmit?: boolean
  successMessageTitle: string
  successMessageHTML: string
  errorMessageTitle: string
  errorMessageHTML: string
  schema: FormKitSchemaNode[]
  captchaConfig: MappedCaptchaConfig
}

export interface TideWebformElement {
  '#type': string
  '#title': string
  '#required'?: boolean
  '#required_error'?: string
  '#description'?: string
  '#help_title'?: string
  [key: string]: any
}

/**
 * @description Raw API field response
 */
export interface ApiWebForm {
  drupal_internal__id: string
  elements: TideWebformElement[]
  meta: {
    drupal_internal__target_id: string
  }
  settings?: {
    confirmation_type?: string
    confirmation_url?: string
    confirmation_title?: string
    confirmation_message?: string
    submission_exception_message?: string
    form_reset?: boolean
  }
  third_party_settings?: {
    tide_webform?: ApiCaptchaSettings
  }
}

/**
 * @description Raw API field response
 */
export interface ApiField {
  drupal_internal__id: string
  field_paragraph_title: string
  field_paragraph_webform: ApiWebForm
}

export interface ApiPage {
  moderation_state?: string
}

export enum CaptchaType {
  RECAPTCHA_V2 = 'google_recaptcha_v2',
  RECAPTCHA_V3 = 'google_recaptcha_v3',
  TURNSTILE = 'cloudfare_turnstile'
}

export interface ApiCaptchaSettings {
  enable_captcha: 0 | 1
  captcha_type: CaptchaType
  score_threshold: string | null
  captcha_details: {
    term_id: string
    captcha_id: string
    site_key: string
  }
}

export interface MappedCaptchaConfig {
  enabled: boolean
  type: CaptchaType
  siteKey: string
  siteIdentifier: string
  scoreThreshold?: number
}
