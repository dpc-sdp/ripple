import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { expect, describe, it } from '@jest/globals'
import { accordionMapping, ITideAccordion } from './accordion-mapping'

const rawData = {
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/accordion/0ac1fd07-cd86-4875-806b-95209b5a6339'
    }
  },
  meta: { target_revision_id: 7414 },
  drupal_internal__id: 4771,
  drupal_internal__revision_id: 7414,
  langcode: 'en',
  status: true,
  created: '2022-10-25T05:45:09+00:00',
  parent_id: '2245',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_component',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: null,
  field_paragraph_accordion_style: 'basic',
  field_paragraph_title: 'TEST_TITLE',
  field_paragraph_accordion: [
    {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/accordion_content/af888d2d-9711-477f-b642-faa14649fa71'
        }
      },
      meta: { target_revision_id: 7412 },
      drupal_internal__id: 4769,
      drupal_internal__revision_id: 7412,
      langcode: 'en',
      status: true,
      created: '2022-10-25T05:45:09+00:00',
      parent_id: '4771',
      parent_type: 'paragraph',
      parent_field_name: 'field_paragraph_accordion',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: null,
      field_paragraph_accordion_body: {
        value: '<p>Test value 1</p>',
        format: 'rich_text',
        processed: '<p>Test processed 1</p>'
      },
      field_paragraph_accordion_name: 'Apples',
      id: 'af888d2d-9711-477f-b642-faa14649fa71',
      type: 'paragraph--accordion_content'
    },
    {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/accordion_content/0c8b250d-27ec-4d55-8f90-a57c936e02f3'
        }
      },
      meta: { target_revision_id: 7413 },
      drupal_internal__id: 4770,
      drupal_internal__revision_id: 7413,
      langcode: 'en',
      status: true,
      created: '2022-10-25T05:47:03+00:00',
      parent_id: '4771',
      parent_type: 'paragraph',
      parent_field_name: 'field_paragraph_accordion',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: null,
      field_paragraph_accordion_body: {
        value: '<p>Test value 2</p>',
        format: 'rich_text',
        processed: '<p>Test processed 2</p>'
      },
      field_paragraph_accordion_name: 'Oranges',
      id: '0c8b250d-27ec-4d55-8f90-a57c936e02f3',
      type: 'paragraph--accordion_content'
    }
  ],
  id: '0ac1fd07-cd86-4875-806b-95209b5a6339',
  type: 'paragraph--accordion'
}

describe('accordionMapping', () => {
  it('maps a raw json api response to the correct structure', () => {
    const result: TideDynamicPageComponent<ITideAccordion> = {
      component: 'TideLandingPageAccordion',
      id: '4771',
      title: 'TEST_TITLE',
      props: {
        id: '4771',
        numbered: false,
        items: [
          {
            id: '4769',
            title: 'Apples',
            content: '<p>Test processed 1</p>'
          },
          {
            id: '4770',
            title: 'Oranges',
            content: '<p>Test processed 2</p>'
          }
        ]
      }
    }

    expect(accordionMapping(rawData)).toEqual(result)
  })

  it('maps a raw json api response to the correct structure (numbered)', () => {
    const result: TideDynamicPageComponent<ITideAccordion> = {
      component: 'TideLandingPageAccordion',
      id: '4771',
      title: 'TEST_TITLE',
      props: {
        id: '4771',
        numbered: true,
        items: [
          {
            id: '4769',
            title: 'Apples',
            content: '<p>Test processed 1</p>'
          },
          {
            id: '4770',
            title: 'Oranges',
            content: '<p>Test processed 2</p>'
          }
        ]
      }
    }

    expect(
      accordionMapping({
        ...rawData,
        field_paragraph_accordion_style: 'numbered'
      })
    ).toEqual(result)
  })
})
