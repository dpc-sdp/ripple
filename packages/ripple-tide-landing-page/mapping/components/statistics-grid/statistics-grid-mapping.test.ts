import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { expect, describe, it } from 'vitest'
import {
  statisticsGridMapping,
  ITideStatsGrid
} from './statistics-grid-mapping'

const rawData = {
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/statistics_grid/99cd91cf-1d09-4fc7-83e9-45cfe77f3379'
    }
  },
  meta: { target_revision_id: 7441 },
  drupal_internal__id: 5380,
  drupal_internal__revision_id: 7441,
  langcode: 'en',
  status: true,
  created: '2022-10-27T22:05:54+00:00',
  parent_id: '2245',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_component',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: true,
  field_statistics_grid_theme: false,
  field_statistic_block: [
    {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/statistic_block/22461fef-86a7-480e-b864-03a5cd5012a1'
        }
      },
      meta: { target_revision_id: 7436 },
      drupal_internal__id: 5378,
      drupal_internal__revision_id: 7436,
      langcode: 'en',
      status: true,
      created: '2022-10-27T22:05:54+00:00',
      parent_id: '5380',
      parent_type: 'paragraph',
      parent_field_name: 'field_statistic_block',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: null,
      field_statistic_body: 'Label 1',
      field_statistic_heading: 'Value 1',
      id: '22461fef-86a7-480e-b864-03a5cd5012a1',
      type: 'paragraph--statistic_block'
    },
    {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/statistic_block/a246c4cc-f776-48c1-9c2d-56fd28606406'
        }
      },
      meta: { target_revision_id: 7437 },
      drupal_internal__id: 5379,
      drupal_internal__revision_id: 7437,
      langcode: 'en',
      status: true,
      created: '2022-10-27T22:05:54+00:00',
      parent_id: '5380',
      parent_type: 'paragraph',
      parent_field_name: 'field_statistic_block',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: null,
      field_statistic_body: 'Label 2',
      field_statistic_heading: 'Value 2',
      id: 'a246c4cc-f776-48c1-9c2d-56fd28606406',
      type: 'paragraph--statistic_block'
    }
  ],
  id: '99cd91cf-1d09-4fc7-83e9-45cfe77f3379',
  type: 'paragraph--statistics_grid'
}

describe('statisticsGridMapping', () => {
  it('maps a raw json api response to the correct structure - onLight variant', () => {
    const result: TideDynamicPageComponent<ITideStatsGrid> = {
      component: 'TideLandingPageStatsGrid',
      id: '5380',
      props: {
        variant: 'onLight',
        items: [
          {
            id: '5378',
            label: 'Label 1',
            value: 'Value 1'
          },
          {
            id: '5379',
            label: 'Label 2',
            value: 'Value 2'
          }
        ]
      }
    }

    expect(
      statisticsGridMapping({ ...rawData, field_statistics_grid_theme: true })
    ).toEqual(result)
  })

  it('maps a raw json api response to the correct structure - onDark variant', () => {
    const result: TideDynamicPageComponent<ITideStatsGrid> = {
      component: 'TideLandingPageStatsGrid',
      id: '5380',
      props: {
        variant: 'onDark',
        items: [
          {
            id: '5378',
            label: 'Label 1',
            value: 'Value 1'
          },
          {
            id: '5379',
            label: 'Label 2',
            value: 'Value 2'
          }
        ]
      }
    }

    expect(
      statisticsGridMapping({ ...rawData, field_statistics_grid_theme: false })
    ).toEqual(result)
  })
})
