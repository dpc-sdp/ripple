import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { expect, describe, it } from '@jest/globals'
import { timelineMapping, ITideTimeline } from './timeline-mapping'

const rawData = {
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/timelines/21a369f3-f18d-421e-a424-a6f5337adf34'
    }
  },
  meta: {
    target_revision_id: 9937
  },
  drupal_internal__id: 6212,
  drupal_internal__revision_id: 9937,
  langcode: 'en',
  status: true,
  created: '2022-11-01T22:24:07+00:00',
  parent_id: '2245',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_component',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: true,
  field_paragraph_title: 'Testing timeline title',
  field_timeline: [
    {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/timeline/59d19aa9-e22d-4b46-bdfa-90933f397a4d'
        }
      },
      meta: {
        target_revision_id: 9934
      },
      drupal_internal__id: 6210,
      drupal_internal__revision_id: 9934,
      langcode: 'en',
      status: true,
      created: '2022-11-02T09:24:07+11:00',
      parent_id: '6212',
      parent_type: 'paragraph',
      parent_field_name: 'field_timeline',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: null,
      field_current_milestone: false,
      field_paragraph_body: {
        value: '<p>Milestone 1 <strong>summary</strong> <em>text</em></p>\r\n',
        format: 'rich_text',
        processed: '<p>Milestone 1 <strong>summary</strong> <em>text</em></p>'
      },
      field_paragraph_cta_text: 'Milestone text 1',
      field_paragraph_date_range: {
        value: '2022-06-02T09:00:00+10:00',
        end_value: '2022-11-12T14:00:00+11:00'
      },
      field_paragraph_link: {
        uri: 'entity:node/landing_page/38602962-2e4c-4553-b3f2-0f1fbf34c2e1',
        title: '',
        options: [],
        entity: {
          uri: 'entity:node/348',
          entity_type: 'node',
          entity_id: '348',
          bundle: 'landing_page',
          uuid: '38602962-2e4c-4553-b3f2-0f1fbf34c2e1'
        },
        url: '/sdpta-content-collection-lp-news-grid-view-thumbnail-dc-adc-sites-landing-page-10-10-2022-1',
        origin_url:
          '/sdpta-content-collection-lp-news-grid-view-thumbnail-dc-adc-sites-landing-page-10-10-2022-1'
      },
      field_paragraph_summary: null,
      field_paragraph_title: 'Milestone title 1',
      field_paragraph_media: {
        links: {
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000122?resourceVersion=id%3A24'
          }
        },
        meta: {},
        drupal_internal__mid: 24,
        drupal_internal__vid: 24,
        langcode: 'en',
        revision_created: '2022-10-06T02:35:09+00:00',
        revision_log_message: null,
        status: true,
        name: 'Demo: Bendigo Hospital',
        created: '2022-10-06T13:35:09+11:00',
        changed: '2022-10-06T13:35:09+11:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/11dede11-10c0-111e1-1100-000000000330'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content: '| Single Digital Presence Content Management System'
            }
          }
        ],
        path: {
          alias: null,
          pid: null,
          langcode: 'en'
        },
        field_media_alignment: null,
        field_media_caption: null,
        field_media_restricted: true,
        thumbnail: {
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/file/file/02219ca9-24e7-4646-93ec-8fec924842ef'
            }
          },
          meta: {
            alt: 'Demo: Bendigo Hospital',
            title: null,
            width: 1280,
            height: 959
          },
          drupal_internal__fid: 42,
          langcode: 'en',
          filename: 'Bendigo-Hospital.jpg',
          uri: {
            value: 'public://tide_demo_content/Bendigo-Hospital.jpg',
            url: '/sites/default/files/tide_demo_content/Bendigo-Hospital.jpg'
          },
          filemime: 'image/jpeg',
          filesize: 123081,
          status: true,
          created: '2022-10-06T02:35:09+00:00',
          changed: '2022-10-06T02:35:09+00:00',
          url: 'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Bendigo-Hospital.jpg',
          id: '02219ca9-24e7-4646-93ec-8fec924842ef',
          type: 'file--file'
        },
        field_license_type: {
          type: 'taxonomy_term--license_type',
          id: '11dede11-10c0-111e1-1100-000000000030'
        },
        field_media_image: {
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/file/file/02219ca9-24e7-4646-93ec-8fec924842ef'
            }
          },
          meta: {
            alt: 'Demo: Bendigo Hospital',
            title: 'Demo: Bendigo Hospital.jpg',
            width: 1280,
            height: 959
          },
          drupal_internal__fid: 42,
          langcode: 'en',
          filename: 'Bendigo-Hospital.jpg',
          uri: {
            value: 'public://tide_demo_content/Bendigo-Hospital.jpg',
            url: '/sites/default/files/tide_demo_content/Bendigo-Hospital.jpg'
          },
          filemime: 'image/jpeg',
          filesize: 123081,
          status: true,
          created: '2022-10-06T02:35:09+00:00',
          changed: '2022-10-06T02:35:09+00:00',
          url: 'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Bendigo-Hospital.jpg',
          id: '02219ca9-24e7-4646-93ec-8fec924842ef',
          type: 'file--file'
        },
        field_media_site: [
          {
            links: {
              self: {
                href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040'
              }
            },
            meta: {},
            drupal_internal__tid: 8888,
            drupal_internal__revision_id: 72,
            revision_created: '2022-10-06T02:35:09+00:00',
            revision_log_message: null,
            status: true,
            name: 'Demo Site',
            revision_translation_affected: true,
            metatag: [
              {
                tag: 'link',
                attributes: {
                  rel: 'canonical',
                  href: 'https://develop.content.reference.sdp.vic.gov.au/sites/demo-site'
                }
              },
              {
                tag: 'meta',
                attributes: {
                  name: 'title',
                  content:
                    'Demo Site | Single Digital Presence Content Management System'
                }
              }
            ],
            field_acknowledgement_to_country:
              'The Victorian Government acknowledges Aboriginal and Torres Strait Islander people as the Traditional Custodians of the land and acknowledges and pays respect to their Elders, past and present.',
            field_prominence_ack_to_country: null,
            field_show_table_of_contents: true,
            field_site_domains: 'www.demo.vic.gov.au',
            field_site_footer_text: null,
            field_site_show_exit_site: false,
            field_site_slogan: null,
            field_site_social_links: [],
            field_title_of_table_of_contents: 'Jump to',
            field_site_footer_logos: [],
            field_site_footer_menu: {
              type: 'menu--menu',
              id: 'c11162e4-3c89-400c-a54d-98c05d648028'
            },
            field_site_homepage: {
              type: 'node--landing_page',
              id: '11dede11-10c0-111e1-1100-000000000330'
            },
            field_site_main_menu: {
              links: {
                self: {
                  href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/menu/menu/9a03bac7-0806-43cc-8e9f-f6701164f9f9'
                }
              },
              meta: {},
              langcode: 'en',
              status: true,
              dependencies: [],
              drupal_internal__id: 'main-tide-demo',
              label: 'Main menu - demo.vic.gov.au',
              description: 'Demo main menu',
              locked: false,
              id: '9a03bac7-0806-43cc-8e9f-f6701164f9f9',
              type: 'menu--menu'
            },
            site_alerts: [
              {
                type: 'node--alert',
                id: 'd4036837-9d36-4b7b-a2f5-c143232075c8'
              },
              {
                type: 'node--alert',
                id: '86604fe5-ff44-4549-b675-48be9c5d5df2'
              },
              {
                type: 'node--alert',
                id: '11dede11-10c0-111e1-1100-000000000350'
              }
            ],
            id: '11dede11-10c0-111e1-1100-000000000040',
            type: 'taxonomy_term--sites'
          },
          {
            type: 'taxonomy_term--sites',
            id: '11dede11-10c0-111e1-1100-000000000045'
          }
        ],
        id: '11dede11-10c0-111e1-1100-000000000122',
        type: 'media--image'
      },
      id: '59d19aa9-e22d-4b46-bdfa-90933f397a4d',
      type: 'paragraph--timeline'
    },
    {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/timeline/9b38f1ea-e08f-458f-b25f-91bec223d1e5'
        }
      },
      meta: {
        target_revision_id: 9935
      },
      drupal_internal__id: 6211,
      drupal_internal__revision_id: 9935,
      langcode: 'en',
      status: true,
      created: '2022-11-02T09:26:26+11:00',
      parent_id: '6212',
      parent_type: 'paragraph',
      parent_field_name: 'field_timeline',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: null,
      field_current_milestone: true,
      field_paragraph_body: {
        value:
          '<p>Milestone 2&nbsp;<strong>summary</strong> <em>text</em></p>\r\n',
        format: 'rich_text',
        processed: '<p>Milestone 2 <strong>summary</strong> <em>text</em></p>'
      },
      field_paragraph_cta_text: 'Milestone text 2',
      field_paragraph_date_range: {
        value: '2022-10-05T10:00:00+11:00',
        end_value: '2022-11-26T18:00:00+11:00'
      },
      field_paragraph_link: {
        uri: 'entity:node/landing_page/74bac221-723a-4baf-a359-093c225bbb2f',
        title: '',
        options: [],
        entity: {
          uri: 'entity:node/696',
          entity_type: 'node',
          entity_id: '696',
          bundle: 'landing_page',
          uuid: '74bac221-723a-4baf-a359-093c225bbb2f'
        },
        url: '/sdpta-debug-wysiwyg-landing-page-12-10-2022-0',
        origin_url: '/sdpta-debug-wysiwyg-landing-page-12-10-2022-0'
      },
      field_paragraph_summary: null,
      field_paragraph_title: 'Milestone title 2',
      id: '9b38f1ea-e08f-458f-b25f-91bec223d1e5',
      type: 'paragraph--timeline'
    },
    {
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/timeline/99e2bd54-a7c9-4c2c-88ef-488ffd9d5492'
        }
      },
      meta: {
        target_revision_id: 9936
      },
      drupal_internal__id: 6213,
      drupal_internal__revision_id: 9936,
      langcode: 'en',
      status: true,
      created: '2022-11-02T09:28:44+11:00',
      parent_id: '6212',
      parent_type: 'paragraph',
      parent_field_name: 'field_timeline',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: true,
      field_current_milestone: false,
      field_paragraph_body: null,
      field_paragraph_cta_text: null,
      field_paragraph_date_range: null,
      field_paragraph_link: null,
      field_paragraph_summary: null,
      field_paragraph_title: 'Milestone 3 title',
      id: '99e2bd54-a7c9-4c2c-88ef-488ffd9d5492',
      type: 'paragraph--timeline'
    }
  ],
  id: '21a369f3-f18d-421e-a424-a6f5337adf34',
  type: 'paragraph--timelines'
}

describe('timelineMapping', () => {
  it('maps a raw json api response to the correct structure', () => {
    const result: TideDynamicPageComponent<ITideTimeline> = {
      component: 'TideLandingPageTimeline',
      id: '6212',
      title: 'Testing timeline title',
      props: {
        items: [
          {
            id: '6210',
            title: 'Milestone title 1',
            subtitle: 'Milestone text 1',
            url: '/sdpta-content-collection-lp-news-grid-view-thumbnail-dc-adc-sites-landing-page-10-10-2022-1',
            description:
              '<p>Milestone 1 <strong>summary</strong> <em>text</em></p>',
            image: {
              alt: 'Demo: Bendigo Hospital',
              focalPoint: undefined,
              height: 959,
              src: '/sites/default/files/tide_demo_content/Bendigo-Hospital.jpg',
              title: 'Demo: Bendigo Hospital.jpg',
              width: 1280
            },
            current: false,
            dateStart: '2022-06-02T09:00:00+10:00',
            dateEnd: '2022-11-12T14:00:00+11:00'
          },
          {
            id: '6211',
            title: 'Milestone title 2',
            subtitle: 'Milestone text 2',
            url: '/sdpta-debug-wysiwyg-landing-page-12-10-2022-0',
            description:
              '<p>Milestone 2&nbsp;<strong>summary</strong> <em>text</em></p>',
            image: null,
            current: true,
            dateStart: '2022-10-05T10:00:00+11:00',
            dateEnd: '2022-11-26T18:00:00+11:00'
          },
          {
            id: '6213',
            title: 'Milestone 3 title',
            subtitle: null,
            url: '',
            description: '',
            image: null,
            current: false,
            dateStart: null,
            dateEnd: null
          }
        ]
      }
    }

    expect(
      timelineMapping({ ...rawData, field_statistics_grid_theme: true })
    ).toEqual(result)
  })
})
