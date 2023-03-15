export interface IRplDataLayerEventPayload {
  event: string
  element_id: string
  element_text?: string
  label?: string
  name?: string
  platform_event: string
  component?: string
}

export const gaEvent = (gaEvent: IRplDataLayerEventPayload) => {
  if (!window) {
    throw new Error('GA events are only callable in a browser context')
  } else if (!window.dataLayer) {
    throw new Error('dataLayer was not initialised correctly')
  }
  window.dataLayer.push(gaEvent)
}
