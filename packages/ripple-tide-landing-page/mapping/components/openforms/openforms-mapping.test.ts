import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { expect, describe, it } from '@jest/globals'
import { openFormsMapping, ITideOpenForms } from './openforms-mapping'

const rawData = {
  links: {
    self: {
      href: 'https://develop.content.vic.gov.au/api/v1/paragraph/form_embed_openforms/051fbf96-4722-488e-8409-6a8ced4e55db?resourceVersion=id%3A4187158'
    }
  },
  meta: {
    target_revision_id: 4187158,
    drupal_internal__target_id: 2197735
  },
  drupal_internal__id: 2197735,
  drupal_internal__revision_id: 4187158,
  langcode: 'en',
  status: true,
  created: '2023-08-31T04:41:47+00:00',
  parent_id: '34793',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_component',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: true,
  field_form_link: {
    uri: 'https://au.openforms.com/Form/e3942530-e860-476c-a349-b04e013c5e0f',
    title: '',
    options: []
  },
  id: '051fbf96-4722-488e-8409-6a8ced4e55db',
  type: 'paragraph--form_embed_openforms'
}

describe('openformsMapping', () => {
  it('maps a raw json api response to the correct structure', () => {
    const result: TideDynamicPageComponent<ITideOpenForms> = {
      component: 'TideLandingPageOpenForms',
      id: '2197735',
      props: {
        formLink:
          'https://au.openforms.com/Form/e3942530-e860-476c-a349-b04e013c5e0f'
      }
    }

    expect(openFormsMapping(rawData)).toEqual(result)
  })
})
