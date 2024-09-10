import { ref } from 'vue'
import { CaptchaType, MappedCaptchaConfig } from '../types'
import type { Script } from '@unhead/schema'
import { getCaptchaElementId } from '@dpc-sdp/ripple-ui-forms'

const getThirdPartyScript = (
  captchaConfig: MappedCaptchaConfig
): Script | null => {
  switch (captchaConfig.type) {
    case CaptchaType.RECAPTCHA_V3:
      return {
        src: `https://www.google.com/recaptcha/api.js?render=${captchaConfig.siteKey}`,
        tagPosition: 'head',
        async: false,
        defer: false
      }
    case CaptchaType.RECAPTCHA_V2:
      return {
        src: 'https://www.google.com/recaptcha/api.js?render=explicit',
        tagPosition: 'head',
        async: false,
        defer: true
      }
    case CaptchaType.TURNSTILE:
      return {
        src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
        tagPosition: 'head',
        async: false,
        defer: false
      }
    default:
      return null
  }
}

const initialiseCaptcha = (
  formId: string,
  captchaConfig: MappedCaptchaConfig,
  _window: any
) => {
  const captchaElementId = getCaptchaElementId(formId)

  switch (captchaConfig.type as CaptchaType) {
    case CaptchaType.RECAPTCHA_V2:
      if (_window && _window.grecaptcha) {
        return _window.grecaptcha.render(captchaElementId, {
          sitekey: captchaConfig.siteKey,
          theme: 'light'
        })
      }
      break
    case CaptchaType.TURNSTILE:
      if (_window && _window.turnstile) {
        return _window.turnstile.ready(function () {
          _window.turnstile.render(`#${captchaElementId}`, {
            sitekey: captchaConfig.siteKey
          })
        })
      }
      break
    default:
      return null
  }
}

const reset = (
  widgetId: string,
  captchaConfig: MappedCaptchaConfig,
  _window: any
) => {
  switch (captchaConfig.type as CaptchaType) {
    case CaptchaType.RECAPTCHA_V2:
      if (_window && _window.grecaptcha) {
        _window.grecaptcha.reset(widgetId)
      }
      break
    case CaptchaType.TURNSTILE:
      if (_window && _window.turnstile) {
        _window.turnstile.reset(widgetId)
      }
      break
    default:
  }
}

export const useCaptchaWidget = (
  formId: string,
  captchaConfig: MappedCaptchaConfig
): any => {
  const widgetId = ref(null)

  if (!captchaConfig?.enabled) {
    return {}
  }

  const scriptTag = getThirdPartyScript(captchaConfig)

  if (scriptTag) {
    useHead({
      script: [scriptTag]
    })
  }

  onMounted(() => {
    widgetId.value = initialiseCaptcha(formId, captchaConfig, window)
  })

  return {
    resetCaptcha: () => {
      if (widgetId.value !== null) {
        reset(widgetId.value, captchaConfig, window)
      }
    }
  }
}

export default useCaptchaWidget
