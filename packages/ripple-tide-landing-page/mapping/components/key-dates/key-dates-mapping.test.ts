import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { expect, describe, it } from 'vitest'
import { keyDatesMapping, ITideKeyDates } from './key-dates-mapping'

const rawData = {
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/card_keydates/f116f5b4-f3fe-4371-ab48-67ceebb96b3b'
    }
  },
  meta: { target_revision_id: 7426 },
  drupal_internal__id: 4776,
  drupal_internal__revision_id: 7426,
  langcode: 'en',
  status: true,
  created: '2022-10-25T05:51:47+00:00',
  parent_id: '2245',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_component',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: null,
  field_paragraph_cta: {
    uri: 'entity:node/landing_page/7615b16d-6d76-479d-81cf-a657a1dd4873',
    title: 'Test CTA Text',
    options: [],
    entity: {
      uri: 'entity:node/66',
      entity_type: 'node',
      entity_id: '66',
      bundle: 'landing_page',
      uuid: '7615b16d-6d76-479d-81cf-a657a1dd4873'
    },
    url: '/sample-link',
    origin_url: '/sample-link'
  },
  field_paragraph_keydates: [
    {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/keydates/34b299f3-b008-4f7f-a098-6fb8f931626e'
        }
      },
      meta: { target_revision_id: 7424 },
      drupal_internal__id: 4775,
      drupal_internal__revision_id: 7424,
      langcode: 'en',
      status: true,
      created: '2022-10-25T05:51:47+00:00',
      parent_id: '4776',
      parent_type: 'paragraph',
      parent_field_name: 'field_paragraph_keydates',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: null,
      field_paragraph_keydate: '4th October 2022',
      field_paragraph_link: null,
      field_paragraph_summary: 'Get ready for it',
      field_paragraph_title: 'Oranges Day Eve',
      id: '34b299f3-b008-4f7f-a098-6fb8f931626e',
      type: 'paragraph--keydates'
    },
    {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/keydates/dfc09360-9d00-41ef-ace7-8c0e15b4b157'
        }
      },
      meta: { target_revision_id: 7425 },
      drupal_internal__id: 5377,
      drupal_internal__revision_id: 7425,
      langcode: 'en',
      status: true,
      created: '2022-10-27T21:38:06+00:00',
      parent_id: '4776',
      parent_type: 'paragraph',
      parent_field_name: 'field_paragraph_keydates',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: null,
      field_paragraph_keydate: '5th October 2022',
      field_paragraph_link: null,
      field_paragraph_summary: "It's oranges day",
      field_paragraph_title: 'Oranges Day',
      id: 'dfc09360-9d00-41ef-ace7-8c0e15b4b157',
      type: 'paragraph--keydates'
    }
  ],
  id: 'f116f5b4-f3fe-4371-ab48-67ceebb96b3b',
  type: 'paragraph--card_keydates'
}

describe('keyDatesMapping', () => {
  it('maps a raw json api response to the correct structure', () => {
    const result: TideDynamicPageComponent<ITideKeyDates> = {
      id: '4776',
      component: 'TideLandingPageKeyDatesCard',
      layout: 'card',
      props: {
        title: 'Key calendar dates',
        ctaTitle: 'Test CTA Text',
        url: '/sample-link',
        items: [
          {
            title: '4th October 2022',
            subtitle: 'Oranges Day Eve',
            content: 'Get ready for it'
          },
          {
            title: '5th October 2022',
            subtitle: 'Oranges Day',
            content: `It's oranges day`
          }
        ]
      }
    }

    expect(keyDatesMapping(rawData)).toEqual(result)
  })
})
