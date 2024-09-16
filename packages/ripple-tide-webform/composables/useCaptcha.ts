import { ref } from 'vue'
import { CaptchaType, MappedCaptchaConfig } from '../types'
import type { Script } from '@unhead/schema'
import { getCaptchaElementId } from '@dpc-sdp/ripple-ui-forms'

const v3ScriptReadyEventNamePrefix = 'recaptchaV3Ready'
const v2ScriptReadyEventName = 'recaptchaV2Ready'
const turnstileScriptReadyEventName = 'turnstileReady'

const getThirdPartyScript = (
  captchaConfig: MappedCaptchaConfig
): Script | null => {
  switch (captchaConfig.type) {
    case CaptchaType.RECAPTCHA_V3: {
      const onLoadCallbackName = `onloadCallbackV3${captchaConfig.siteIdentifier}`
      const eventName = `${v3ScriptReadyEventNamePrefix}-${captchaConfig.siteIdentifier}`

      if (window) {
        window[onLoadCallbackName] = () => {
          window.dispatchEvent(new Event(eventName))
        }
      }

      return {
        key: `${CaptchaType.RECAPTCHA_V3}-${captchaConfig.siteKey}`,
        src: `https://www.google.com/recaptcha/api.js?render=${captchaConfig.siteKey}&onload=${onLoadCallbackName}`,
        tagPosition: 'head',
        async: false,
        defer: false
      }
    }
    case CaptchaType.RECAPTCHA_V2: {
      const onLoadCallbackName = 'onloadCallbackV2'

      if (window) {
        window[onLoadCallbackName] = () => {
          window.dispatchEvent(new Event(v2ScriptReadyEventName))
        }
      }

      return {
        key: CaptchaType.RECAPTCHA_V2,
        src: `https://www.google.com/recaptcha/api.js?render=explicit&onload=${onLoadCallbackName}`,
        tagPosition: 'head',
        async: false,
        defer: true
      }
    }
    case CaptchaType.TURNSTILE: {
      const onLoadCallbackName = 'onloadCallbackTurnstile'

      if (window) {
        window[onLoadCallbackName] = () => {
          window.dispatchEvent(new Event(turnstileScriptReadyEventName))
        }
      }

      return {
        src: `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=${onLoadCallbackName}`,
        tagPosition: 'head',
        async: false,
        defer: false
      }
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
        return _window.turnstile.render(`#${captchaElementId}`, {
          sitekey: captchaConfig.siteKey,
          // We set the 'action' as the formId so it can be identified in the analytics dashboard
          action: formId
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

const waitForV3Script = (
  captchaConfig: MappedCaptchaConfig,
  readyCallback: () => void
) => {
  if (window) {
    if (window.grecaptcha?.render) {
      readyCallback()
    } else {
      window.addEventListener(
        `${v3ScriptReadyEventNamePrefix}-${captchaConfig.siteIdentifier}`,
        () => {
          readyCallback()
        },
        false
      )
    }
  }
}

const waitForV2Script = (readyCallback: () => void) => {
  if (window) {
    if (window.grecaptcha?.render) {
      readyCallback()
    } else {
      window.addEventListener(
        v2ScriptReadyEventName,
        () => {
          readyCallback()
        },
        false
      )
    }
  }
}

const waitForTurnstileScript = (readyCallback: () => void) => {
  if (window) {
    if (window.turnstile?.render) {
      readyCallback()
    } else {
      window.addEventListener(
        turnstileScriptReadyEventName,
        () => {
          readyCallback()
        },
        false
      )
    }
  }
}

export const useIsCaptchaReady = (
  captchaConfig?: MappedCaptchaConfig | null
): any => {
  const isCaptchaReady = ref(false)

  if (!captchaConfig?.enabled) {
    return isCaptchaReady
  }

  switch (captchaConfig.type as CaptchaType) {
    case CaptchaType.RECAPTCHA_V3:
      waitForV3Script(captchaConfig, () => {
        isCaptchaReady.value = true
      })
      break
    case CaptchaType.RECAPTCHA_V2:
      waitForV2Script(() => {
        isCaptchaReady.value = true
      })
      break
    case CaptchaType.TURNSTILE:
      waitForTurnstileScript(() => {
        isCaptchaReady.value = true
      })
      break
    default:
      return false
  }

  return isCaptchaReady
}

export const useResetCaptcha = (
  widgetId: string | null,
  captchaConfig: MappedCaptchaConfig | null
) => {
  if (captchaConfig && widgetId !== null && widgetId !== undefined) {
    reset(widgetId, captchaConfig, window)
  }
}

export const useCaptchaScripts = (captchaConfig: MappedCaptchaConfig): any => {
  if (!captchaConfig?.enabled) {
    return {}
  }

  const scriptTag = getThirdPartyScript(captchaConfig)

  if (scriptTag) {
    useHead(
      {
        script: [scriptTag]
      },
      {
        mode: 'client'
      }
    )
  }
}

export const useCaptchaWidget = (
  formId: string,
  captchaConfig: MappedCaptchaConfig | null
): any => {
  const widgetId = ref(null)

  if (!captchaConfig?.enabled) {
    return {}
  }

  widgetId.value = initialiseCaptcha(formId, captchaConfig, window)

  return {
    widgetId: widgetId.value,
    resetCaptcha: () => {
      if (widgetId.value !== null) {
        reset(widgetId.value, captchaConfig, window)
      }
    }
  }
}

export const useCaptcha = (
  formId: string,
  captchaConfig: MappedCaptchaConfig | null
) => {
  const captchaWidgetId = ref<string | null>(null)

  const isCaptchaScriptReady = useIsCaptchaReady(captchaConfig)
  const isCaptchaElementReady = ref(false)
  const isCaptchaReady = computed(() => {
    return isCaptchaScriptReady.value && isCaptchaElementReady.value
  })

  if (captchaConfig) {
    useCaptchaScripts(captchaConfig)
  }

  // Sometimes the captcha element isn't rendered on load, so we provide a callback for telling us when it's ready
  const onCaptchaElementReady = () => {
    isCaptchaElementReady.value = true
  }
  provide('onCaptchaElementReady', onCaptchaElementReady)

  watch(isCaptchaReady, (isReady) => {
    if (isReady) {
      const { widgetId } = useCaptchaWidget(formId, captchaConfig)
      captchaWidgetId.value = widgetId
    }
  })

  return { isCaptchaReady, captchaWidgetId }
}

export default useCaptcha
