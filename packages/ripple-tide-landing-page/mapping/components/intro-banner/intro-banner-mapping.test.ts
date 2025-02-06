import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { expect, describe, it } from 'vitest'
import { introBannerMapping, ITideIntroBanner } from './intro-banner-mapping'

const rawData = {
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/introduction_banner/2a467da2-a321-457c-bce5-ad56862d4d96'
    }
  },
  meta: {
    target_revision_id: 9807
  },
  drupal_internal__id: 5810,
  drupal_internal__revision_id: 9807,
  langcode: 'en',
  status: true,
  created: '2022-10-31T09:00:35+11:00',
  parent_id: '2245',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_header',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: true,
  field_banner_display_type: 'featured_links',
  field_banner_type: 'featured_links',
  field_call_to_action_title: 'With button',
  field_paragraph_body: {
    value:
      '<p>The <strong>introduction</strong> banner <em>summary</em></p>\r\n',
    format: 'rich_text',
    processed:
      '<p>The <strong>introduction</strong> banner <em>summary</em></p>'
  },
  field_paragraph_links: [
    {
      uri: 'entity:node/landing_page/d092838f-dfa8-4703-a6dd-65a8eb3db643',
      title: 'Test intro banner link 1',
      options: [],
      entity: {
        uri: 'entity:node/1028',
        entity_type: 'node',
        entity_id: '1028',
        bundle: 'landing_page',
        uuid: 'd092838f-dfa8-4703-a6dd-65a8eb3db643'
      },
      url: '/sdpta-content-collection-lp-news-grid-view-thumbnail-dc-adc-sites-landing-page-15-10-2022-0',
      origin_url:
        '/sdpta-content-collection-lp-news-grid-view-thumbnail-dc-adc-sites-landing-page-15-10-2022-0'
    },
    {
      uri: 'entity:node/publication_page/dd97cc89-0fd6-400a-9b7c-85aa372ecba9',
      title: 'Test intro banner link 2',
      options: [],
      entity: {
        uri: 'entity:node/49',
        entity_type: 'node',
        entity_id: '49',
        bundle: 'publication_page',
        uuid: 'dd97cc89-0fd6-400a-9b7c-85aa372ecba9'
      },
      url: '/17-be-pub-1-create-parent-page/17-be-pub-page-1-child-page/17-be-pub-page-1-child-page-chapter-1',
      origin_url:
        '/17-be-pub-1-create-parent-page/17-be-pub-page-1-child-page/17-be-pub-page-1-child-page-chapter-1'
    },
    {
      uri: 'entity:node/landing_page/07f93b04-daac-4b0e-a1e6-882a70b4e1b9',
      title: 'Test intro banner link 3',
      options: [],
      entity: {
        uri: 'entity:node/1087',
        entity_type: 'node',
        entity_id: '1087',
        bundle: 'landing_page',
        uuid: '07f93b04-daac-4b0e-a1e6-882a70b4e1b9'
      },
      url: '/sdpta-content-collection-lp-list-view-topic-12-landing-page-16-10-2022',
      origin_url:
        '/sdpta-content-collection-lp-list-view-topic-12-landing-page-16-10-2022'
    }
  ],
  field_paragraph_title: 'The introduction banner title 2 (with icon)',
  id: '2a467da2-a321-457c-bce5-ad56862d4d96',
  type: 'paragraph--introduction_banner'
}

describe('introBannerMapping', () => {
  it('maps a raw json api response to the correct structure', () => {
    const result: TideDynamicPageComponent<ITideIntroBanner> = {
      component: 'TideLandingPageIntroBanner',
      id: '5810',
      props: {
        title: 'The introduction banner title 2 (with icon)',
        withIcon: false,
        links: {
          title: 'With button',
          items: [
            {
              text: 'Test intro banner link 1',
              url: '/sdpta-content-collection-lp-news-grid-view-thumbnail-dc-adc-sites-landing-page-15-10-2022-0'
            },
            {
              text: 'Test intro banner link 2',
              url: '/17-be-pub-1-create-parent-page/17-be-pub-page-1-child-page/17-be-pub-page-1-child-page-chapter-1'
            },
            {
              text: 'Test intro banner link 3',
              url: '/sdpta-content-collection-lp-list-view-topic-12-landing-page-16-10-2022'
            }
          ],
          type: 'link',
          more: null
        },
        html: '<p>The <strong>introduction</strong> banner <em>summary</em></p>'
      }
    }

    expect(introBannerMapping(rawData)).toEqual(result)
  })

  it('maps a raw json api response to the correct structure - withIcon', () => {
    const result: TideDynamicPageComponent<ITideIntroBanner> = {
      component: 'TideLandingPageIntroBanner',
      id: '5810',
      props: {
        title: 'The introduction banner title 2 (with icon)',
        withIcon: true,
        links: {
          title: 'With button',
          items: [
            {
              text: 'Test intro banner link 1',
              url: '/sdpta-content-collection-lp-news-grid-view-thumbnail-dc-adc-sites-landing-page-15-10-2022-0'
            },
            {
              text: 'Test intro banner link 2',
              url: '/17-be-pub-1-create-parent-page/17-be-pub-page-1-child-page/17-be-pub-page-1-child-page-chapter-1'
            },
            {
              text: 'Test intro banner link 3',
              url: '/sdpta-content-collection-lp-list-view-topic-12-landing-page-16-10-2022'
            }
          ],
          type: 'link',
          more: null
        },
        html: '<p>The <strong>introduction</strong> banner <em>summary</em></p>'
      }
    }

    expect(
      introBannerMapping({ ...rawData, field_banner_type: 'with_icon' })
    ).toEqual(result)
  })
})
