import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { expect, describe, it } from '@jest/globals'
import { dataTableMapping, ITideDataTable } from './data-table-mapping'

const rawData = {
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/data_table/1fea8825-5848-451d-a515-cf6bc1f36f67?resourceVersion=id%3A2115'
    }
  },
  meta: { target_revision_id: 2115, drupal_internal__target_id: 1936 },
  drupal_internal__id: 1936,
  drupal_internal__revision_id: 2115,
  langcode: 'en',
  status: true,
  created: '2023-04-28T23:40:45+00:00',
  parent_id: '430',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_component',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: true,
  field_data_table_content: {
    value: {
      '0': ['Row One Column One', 'Row One Column Two', 'Row One Column Three'],
      '1': ['Row Two Column One', 'Row Two Column Two', 'Row Two Column Three'],
      '2': [
        'Row Three Column One',
        'Row Three Column Two',
        'Row Three Column Three'
      ],
      caption: ''
    },
    format: null,
    caption: ''
  },
  field_first_column_table_header: false,
  field_first_row_table_header: true,
  field_table_orientation: true,
  id: '1fea8825-5848-451d-a515-cf6bc1f36f67',
  type: 'paragraph--data_table'
}

describe('introBannerMapping', () => {
  it('maps a raw json api response to the correct structure', () => {
    const result: TideDynamicPageComponent<ITideDataTable> = {
      component: 'TideLandingPageDataTable',
      id: '1936',
      props: {
        caption: '',
        headingType: { horizontal: true, vertical: false },
        orientation: 'row',
        columns: [
          { label: 'Row One Column One', objectKey: 'col0', isHTML: true },
          { label: 'Row One Column Two', objectKey: 'col1', isHTML: true },
          { label: 'Row One Column Three', objectKey: 'col2', isHTML: true }
        ],
        items: [
          {
            col0: 'Row Two Column One',
            col1: 'Row Two Column Two',
            col2: 'Row Two Column Three'
          },
          {
            col0: 'Row Three Column One',
            col1: 'Row Three Column Two',
            col2: 'Row Three Column Three'
          }
        ]
      }
    }

    expect(dataTableMapping(rawData)).toEqual(result)
  })

  it('maps a table without a header row', () => {
    const result: TideDynamicPageComponent<ITideDataTable> = {
      component: 'TideLandingPageDataTable',
      id: '1936',
      props: {
        caption: '',
        headingType: { horizontal: false, vertical: false },
        orientation: 'row',
        columns: [
          { objectKey: 'col0', isHTML: true },
          { objectKey: 'col1', isHTML: true },
          { objectKey: 'col2', isHTML: true }
        ],
        items: [
          {
            col0: 'Row One Column One',
            col1: 'Row One Column Two',
            col2: 'Row One Column Three'
          },
          {
            col0: 'Row Two Column One',
            col1: 'Row Two Column Two',
            col2: 'Row Two Column Three'
          },
          {
            col0: 'Row Three Column One',
            col1: 'Row Three Column Two',
            col2: 'Row Three Column Three'
          }
        ]
      }
    }

    expect(
      dataTableMapping({ ...rawData, field_first_row_table_header: false })
    ).toEqual(result)
  })
})
