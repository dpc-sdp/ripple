export interface IRplAnalyticsEventPayload {
  page_url?: string
  event: string
  element_id?: string
  element_text?: string
  label?: string
  name?: string
  file_name?: string
  file_extension?: string
  file_size?: string
  link_url?: string
  form_name?: string
  form_id?: string
  field_id?: string
  type?: string
  value?: string
  component?: string
  platform_event: string
}

export const trackEvent = (payload: IRplAnalyticsEventPayload) => {
  if (!window) {
    throw new Error('dataLayer events are only callable in a browser context')
  } else if (!window.dataLayer) {
    throw new Error('dataLayer was not initialised correctly')
  }
  window.dataLayer.push(payload)
}
