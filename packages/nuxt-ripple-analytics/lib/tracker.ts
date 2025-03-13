export interface IRplAnalyticsEventPayload {
  // Base properties
  event: string
  name?: string
  page_url?: string
  page_title?: string
  platform_event: string
  // Component properties
  label?: string
  element_id?: string
  element_text?: string
  link_url?: string
  link_domain?: string
  file_name?: string
  file_extension?: string
  file_size?: string
  form_id?: string
  form_name?: string
  form_valid?: boolean
  form_data?: boolean
  field_id?: string
  filters?: string
  type?: string
  value?: string
  index?: number
  theme?: string
  section?: string
  count?: number
  mode?: string
  component?: string
  component_options?: string
  // Route properties
  status_code?: number
  content_type?: string
  content_status?: string
  content_topic?: string
  content_tags?: string[]
  search_term?: string
  site_section?: string
  publication_name?: string
  breadcrumbs?: string[]
  production?: boolean
  google_analytics?: {
    prod_measurement_id?: string
    uat_measurement_id?: string
  }
}

/**
 * Maps the payload object to meet analytics requirements.
 */
const mapPayload = (payload: IRplAnalyticsEventPayload) => {
  const { $app_origin } = useNuxtApp()

  return Object.fromEntries(
    Object.entries(payload).map(([key, value]) => {
      let newValue = value

      // Set 'empty' values to undefined
      if (
        value === null ||
        value === '' ||
        (Array.isArray(value) && !value.length)
      ) {
        newValue = undefined
      }

      // Prepend origin to relative link_urls
      if (key === 'link_url' && value?.match(/^\//)) {
        newValue = `${$app_origin}${value}`
      }

      return [key, newValue]
    })
  )
}

export const trackEvent = (payload: IRplAnalyticsEventPayload) => {
  if (!window) {
    throw new Error('dataLayer events are only callable in a browser context')
  } else if (!window.dataLayer) {
    throw new Error('dataLayer was not initialised correctly')
  }

  window.dataLayer.push(mapPayload(payload))
}
