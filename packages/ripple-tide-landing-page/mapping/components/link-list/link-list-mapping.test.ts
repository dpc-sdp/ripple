import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { expect, describe, it } from 'vitest'
import { linkListMapping, ITideLinkList } from './link-list-mapping'

const rawData = {
  meta: {
    target_revision_id: 1644,
    drupal_internal__target_id: 1250
  },
  drupal_internal__id: 1250,
  drupal_internal__revision_id: 1644,
  langcode: 'en',
  status: true,
  created: '2025-03-31T00:01:28+00:00',
  parent_id: '149',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_component',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: true,
  field_paragraph_title: 'test title',
  field_paragraph_link_list: [
    {
      meta: {
        target_revision_id: 1642,
        drupal_internal__target_id: 1248
      },
      drupal_internal__id: 1248,
      drupal_internal__revision_id: 1642,
      langcode: 'en',
      status: true,
      created: '2025-03-31T00:01:28+00:00',
      parent_id: '1250',
      parent_type: 'paragraph',
      parent_field_name: 'field_paragraph_link_list',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: true,
      field_paragraph_link: {
        uri: 'entity:node/event/5d10a7df-ea5c-42ea-9678-5b8c416e1f89',
        title: 'Test link text',
        options: [],
        entity: {
          uri: 'entity:node/109',
          entity_type: 'node',
          entity_id: '109',
          bundle: 'event',
          uuid: '5d10a7df-ea5c-42ea-9678-5b8c416e1f89'
        },
        url: '/clone-clone-clone-event-base-page-4-feature-image',
        origin_url: '/clone-clone-clone-event-base-page-4-feature-image'
      },
      id: '8d0f9d03-ec35-4230-9040-5df98a64aa9c',
      type: 'paragraph--links'
    },
    {
      meta: {
        target_revision_id: 1643,
        drupal_internal__target_id: 1249
      },
      drupal_internal__id: 1249,
      drupal_internal__revision_id: 1643,
      langcode: 'en',
      status: true,
      created: '2025-03-31T00:02:17+00:00',
      parent_id: '1250',
      parent_type: 'paragraph',
      parent_field_name: 'field_paragraph_link_list',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: true,
      field_paragraph_link: {
        uri: 'entity:node/landing_page/5f617766-6d11-4631-842f-c4727e2be1b3',
        title: 'Another link',
        options: [],
        entity: {
          uri: 'entity:node/133',
          entity_type: 'node',
          entity_id: '133',
          bundle: 'landing_page',
          uuid: '5f617766-6d11-4631-842f-c4727e2be1b3'
        },
        url: '/landing-page-all-components-and-features',
        origin_url: '/landing-page-all-components-and-features'
      },
      id: '9ae5c32b-e401-4042-8899-8b9485770301',
      type: 'paragraph--links'
    }
  ],
  id: '832fec88-9b95-4e29-9d96-891dcedba11b',
  type: 'paragraph--link_list'
}

describe('linkListMapping', () => {
  it('maps a raw json api response to the correct structure', () => {
    const result: TideDynamicPageComponent<ITideLinkList> = {
      component: 'TideLandingPageLinkList',
      title: 'test title',
      id: '1250',
      props: {
        items: [
          {
            id: '1248',
            text: 'Test link text',
            url: '/clone-clone-clone-event-base-page-4-feature-image'
          },
          {
            id: '1249',
            text: 'Another link',
            url: '/landing-page-all-components-and-features'
          }
        ]
      }
    }

    expect(
      linkListMapping({ ...rawData, field_statistics_grid_theme: true })
    ).toEqual(result)
  })
})
