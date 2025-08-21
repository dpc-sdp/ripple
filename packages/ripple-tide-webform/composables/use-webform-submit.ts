import { $fetch } from 'ofetch'
import { ref, useRuntimeConfig, useAppConfig } from '#imports'
import { MappedCaptchaConfig } from '../types'

export function useWebformSubmit(
  formId: string,
  captchaConfig?: MappedCaptchaConfig | null
) {
  const postForm = async (
    formId: string,
    formData = {},
    maybeCaptchaResponse: string | null
  ) => {
    const { public: config } = useRuntimeConfig()

    const formResource = 'webform_submission'

    const body = {
      data: {
        type: formResource,
        attributes: {
          remote_addr: '0.0.0.0', // IP placeholder for Tide validation, incase the IP is required.
          data: JSON.stringify(formData)
        }
      }
    }

    // TODO: Add better error handling/log for form API error.
    // It's blocked by Tide webform response issue SDPA-477.
    // Currently the Tide webform has no right response.
    const url = `/api/tide/${formResource}/${formId}`
    const { data, error } = await $fetch(url, {
      method: 'POST',
      baseURL: config.apiUrl || '',
      body,
      params: {
        site: config.tide.site
      },
      headers: {
        'Content-Type': 'application/vnd.api+json;charset=UTF-8',
        'x-captcha-response': maybeCaptchaResponse || undefined
      }
    })

    if (error) {
      throw error
    }

    if (!data) {
      throw new Error('Form submission failed')
    }

    return data
  }

  const submissionState = ref({
    status: 'idle',
    title: '',
    message: '',
    receipt: ''
  })

  interface FormConfig {
    formId: string
    successMessageTitle: string
    successMessageHTML: string
    errorMessageTitle: string
    errorMessageHTML: string
  }

  const isHoneypotTriggered = () => {
    const honeypotElement: HTMLInputElement | null = document.querySelector(
      `#${formId}-important-email`
    )

    return honeypotElement && !!honeypotElement.value
  }

  const submitHandler = async (
    props: FormConfig,
    data: any,
    captchaWidgetId?: string
  ) => {
    submissionState.value = {
      status: 'submitting',
      title: '',
      message: '',
      receipt: ''
    }

    // If there's a value in the honeypot, just show a success message without actually submitting the form
    if (isHoneypotTriggered()) {
      submissionState.value = {
        status: 'success',
        title: props.successMessageTitle,
        message: props.successMessageHTML,
        receipt: ''
      }

      return
    }

    let maybeCaptchaResponse = null

    try {
      maybeCaptchaResponse = await getCaptchaResponse(
        formId,
        captchaConfig,
        captchaWidgetId,
        window
      )
    } catch (e) {
      trackError(e)
      console.error(e)

      submissionState.value = {
        status: 'error',
        title: props.errorMessageTitle,
        message: 'Invalid CAPTCHA',
        receipt: ''
      }

      return
    }

    try {
      // custom handlers can be defined in appConfig.ripple.form.submitHandlers to process formData before submission
      const appConfig = useAppConfig()?.ripple as
        | {
            form?: {
              submitHandlers?: Record<
                string,
                (formData: any, props: any) => any
              >
            }
          }
        | undefined
      const customFormHandlers = appConfig?.form?.submitHandlers

      let processedFormData = data

      if (
        customFormHandlers &&
        typeof customFormHandlers === 'object' &&
        Object.keys(customFormHandlers).length > 0
      ) {
        for (const handler of Object.values(customFormHandlers)) {
          if (typeof handler === 'function') {
            if (handler.constructor.name === 'AsyncFunction') {
              processedFormData = await handler(processedFormData, props)
            } else {
              processedFormData = handler(processedFormData, props)
            }
          }
        }
      }

      const resData = await postForm(
        props.formId,
        processedFormData,
        maybeCaptchaResponse
      )

      const [code, note] = resData.attributes?.notes?.split('|') || []

      // Upstream error
      if (code && Number.isInteger(+code) && (+code <= 199 || +code >= 300)) {
        submissionState.value = {
          status: 'error',
          title: props.errorMessageTitle,
          message: note || props.errorMessageHTML,
          receipt: ''
        }
      } else {
        submissionState.value = {
          status: 'success',
          title: props.successMessageTitle,
          message: note || props.successMessageHTML,
          receipt: resData.attributes?.serial
        }
      }
    } catch (error) {
      trackError(error)
      console.error(error)

      submissionState.value = {
        status: 'error',
        title: props.errorMessageTitle,
        message: props.errorMessageHTML,
        receipt: ''
      }
    }
  }

  return {
    submissionState,
    submitHandler
  }
}
