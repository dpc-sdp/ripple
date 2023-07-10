export interface IRplAnalyticsEventPayload {
  // Base properties
  event: string
  name?: string
  page_url?: string
  platform_event: string
  // Component properties
  label?: string
  element_id?: string
  element_text?: string
  link_url?: string
  file_name?: string
  file_extension?: string
  file_size?: string
  form_id?: string
  form_name?: string
  field_id?: string
  type?: string
  value?: string
  component?: string
  // Route properties
  content_type?: string
  search_term?: string
  site_section?: string
  breadcrumbs?: string[]
  word_count?: number
  avg_read_time?: string
  image_count?: number
  content_section_count?: number
}

export const trackEvent = (payload: IRplAnalyticsEventPayload) => {
  if (!window) {
    throw new Error('dataLayer events are only callable in a browser context')
  } else if (!window.dataLayer) {
    throw new Error('dataLayer was not initialised correctly')
  }
  window.dataLayer.push(payload)
}
