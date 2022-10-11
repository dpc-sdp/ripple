import { getBody } from '@dpc-sdp/ripple-tide-api'
import { getTideFormFields } from './utils/index.js'
import type { TideLandingPageComponent } from './../types'
export default {
  'paragraph--introduction_banner': (field): TideLandingPageComponent => {
    return {
      component: 'TideLandingPageIntroBanner',
      id: field.drupal_internal__id,
      props: {
        title: field?.field_paragraph_title,
        links: field?.field_paragraph_links.map((link) => ({
          title: link.title,
          url: link.uri || link.url
        })),
        html: getBody(field?.field_paragraph_body?.processed)
      }
    }
  },
  'paragraph--basic_text': (field): TideLandingPageComponent => {
    return {
      component: 'RplContent',
      id: field.drupal_internal__id,
      props: {
        html: getBody(field?.field_paragraph_body?.processed)
      }
    }
  },
  'paragraph--accordion': (field): TideLandingPageComponent => {
    return {
      component: 'TideLandingPageAccordion',
      id: field.drupal_internal__id,
      props: {
        id: field.drupal_internal__id,
        title: field.field_paragraph_title,
        numbered: field.field_paragraph_accordion_style === 'numbered',
        items: field.field_paragraph_accordion.map((acc) => {
          return {
            title: acc.field_paragraph_accordion_name,
            content: getBody(acc?.field_paragraph_accordion_body?.value)
          }
        })
      }
    }
  },
  'paragraph--embedded_webform': (field): TideLandingPageComponent => {
    return {
      component: 'TideLandingPageWebForm',
      id: field.drupal_internal__id,
      props: {
        title: field.field_paragraph_title,
        schema: getTideFormFields(field.field_paragraph_webform)
      }
    }
  }
}
