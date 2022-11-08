import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { expect, describe, it } from '@jest/globals'
import { basicTextMapping, ITideBasicText } from './basic-text-mapping'

const rawData = {
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/basic_text/ae1ffcca-fd04-4733-ae35-85a65d6d6452'
    }
  },
  meta: { target_revision_id: 7411 },
  drupal_internal__id: 4768,
  drupal_internal__revision_id: 7411,
  langcode: 'en',
  status: true,
  created: '2022-10-25T05:43:39+00:00',
  parent_id: '2245',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_component',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: null,
  field_paragraph_body: {
    value: '<h2>Test value</h2>',
    format: 'rich_text',
    processed: '<h2>Test processed</h2>'
  },
  id: 'ae1ffcca-fd04-4733-ae35-85a65d6d6452',
  type: 'paragraph--basic_text'
}

const result: TideDynamicPageComponent<ITideBasicText> = {
  component: 'RplContent',
  id: '4768',
  props: {
    html: '<h2>Test processed</h2>'
  }
}

describe('basicTextMapping', () => {
  it('maps a raw json api response to the correct structure', () => {
    expect(basicTextMapping(rawData)).toEqual(result)
  })
})
