export interface IRplDataLayerEventPayload {
  event: string
  element_id?: string
  element_text?: string
  label?: string
  name?: string
  file_name?: string
  file_extension?: string
  file_url?: string
  form_id?: string
  form_name?: string
  type?: string
  value?: string
  component?: string
  platform_event: string
}

export const gaEvent = (gaEvent: IRplDataLayerEventPayload) => {
  if (!window) {
    throw new Error('GA events are only callable in a browser context')
  } else if (!window.dataLayer) {
    throw new Error('dataLayer was not initialised correctly')
  }
  window.dataLayer.push(gaEvent)
}
