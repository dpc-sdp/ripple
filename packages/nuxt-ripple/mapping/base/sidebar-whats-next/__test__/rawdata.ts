/**
 * This fixture was generated from this reference page:
 * https://develop.reference.sdp.vic.gov.au/rpl2test-sidebar-related-links
 *
 * The api call to get this data was:
 * https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1de5a395-bc1b-4bdd-a0c8-9dab428abecf?site=8888&include=field_related_links
 *
 * Extra (empty) relationship and includes fields were removed for simplicity
 */

// eslint-disable-next-line
export const rawData = {
  jsonapi: {
    version: '1.0',
    meta: { links: { self: { href: 'http://jsonapi.org/format/1.0/' } } }
  },
  data: {
    type: 'node--landing_page',
    id: '1de5a395-bc1b-4bdd-a0c8-9dab428abecf',
    links: {
      self: {
        href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1de5a395-bc1b-4bdd-a0c8-9dab428abecf?resourceVersion=id%3A4858'
      }
    },
    attributes: {
      drupal_internal__nid: 136,
      drupal_internal__vid: 4858,
      langcode: 'en',
      revision_timestamp: '2022-10-25T20:37:57+00:00',
      revision_log: null,
      status: true,
      title: 'RPL2TEST - Sidebar related links',
      created: '2022-10-07T15:41:52+11:00',
      changed: '2022-10-26T07:37:57+11:00',
      promote: true,
      sticky: false,
      default_langcode: true,
      revision_translation_affected: true,
      moderation_state: 'published',
      metatag: [
        {
          tag: 'link',
          attributes: {
            rel: 'canonical',
            href: 'https://develop.content.reference.sdp.vic.gov.au/rpl2test-sidebar-related-links'
          }
        },
        {
          tag: 'meta',
          attributes: {
            name: 'title',
            content:
              'RPL2TEST - Sidebar related links | Single Digital Presence Content Management System'
          }
        }
      ],
      path: {
        alias: '/rpl2test-sidebar-related-links',
        pid: 655,
        langcode: 'en',
        url: '/rpl2test-sidebar-related-links',
        origin_alias: '/site-8888/rpl2test-sidebar-related-links',
        origin_url: '/rpl2test-sidebar-related-links'
      },
      field_landing_page_bg_colour: 'white',
      field_landing_page_hero_theme: null,
      field_landing_page_intro_text: null,
      field_landing_page_nav_title: 'Site-section Navigation',
      field_landing_page_show_contact: false,
      field_landing_page_summary:
        'This page data is used in a unit test in the ripple 2 codebase, please don\u0027t edit',
      field_metatags: null,
      field_node_display_headings: 'showH2',
      field_show_ack_of_country: false,
      field_show_content_rating: true,
      field_show_c_primary_caption: false,
      field_show_hero_image_caption: false,
      field_show_related_content: false,
      field_show_site_section_nav: false,
      field_show_social_sharing: true,
      field_show_table_of_content: false,
      field_show_topic_term_and_tags: true,
      field_show_whats_next: true
    },
    relationships: {
      field_whats_next: {
        data: [
          {
            type: 'paragraph--links',
            id: '9e657868-f144-43a5-ad25-55631389a93d',
            meta: { target_revision_id: 6522 }
          },
          {
            type: 'paragraph--links',
            id: '39ec6fff-595e-45e1-8991-dd8fdf5d22b5',
            meta: { target_revision_id: 6523 }
          }
        ],
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1de5a395-bc1b-4bdd-a0c8-9dab428abecf/field_whats_next?resourceVersion=id%3A4858'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1de5a395-bc1b-4bdd-a0c8-9dab428abecf/relationships/field_whats_next?resourceVersion=id%3A4858'
          }
        }
      }
    }
  },
  included: [
    {
      type: 'paragraph--links',
      id: '9e657868-f144-43a5-ad25-55631389a93d',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/links/9e657868-f144-43a5-ad25-55631389a93d'
        }
      },
      attributes: {
        drupal_internal__id: 4974,
        drupal_internal__revision_id: 6522,
        langcode: 'en',
        status: true,
        created: '2022-10-25T20:37:20+00:00',
        parent_id: '136',
        parent_type: 'node',
        parent_field_name: 'field_whats_next',
        behavior_settings: [],
        default_langcode: true,
        revision_translation_affected: true,
        field_paragraph_link: {
          uri: 'entity:node/landing_page/6177414a-ef37-4c63-9c2a-79e37464d76e',
          title: 'Demo publication',
          options: [],
          entity: {
            uri: 'entity:node/1281',
            entity_type: 'node',
            entity_id: '1281',
            bundle: 'landing_page',
            uuid: '6177414a-ef37-4c63-9c2a-79e37464d76e'
          },
          url: '/sdpta-related-links-landing-page-17-10-2022-0',
          origin_url: '/sdpta-related-links-landing-page-17-10-2022-0'
        }
      },
      relationships: {
        entity_type: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/links/9e657868-f144-43a5-ad25-55631389a93d/relationships/entity_type'
            }
          }
        }
      }
    },
    {
      type: 'paragraph--links',
      id: '39ec6fff-595e-45e1-8991-dd8fdf5d22b5',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/links/39ec6fff-595e-45e1-8991-dd8fdf5d22b5'
        }
      },
      attributes: {
        drupal_internal__id: 4975,
        drupal_internal__revision_id: 6523,
        langcode: 'en',
        status: true,
        created: '2022-10-25T20:37:41+00:00',
        parent_id: '136',
        parent_type: 'node',
        parent_field_name: 'field_whats_next',
        behavior_settings: [],
        default_langcode: true,
        revision_translation_affected: true,
        field_paragraph_link: {
          uri: 'entity:node/publication/ac891c18-9d46-469b-9e80-fabb6ea04481',
          title: 'Testing link',
          options: [],
          entity: {
            uri: 'entity:node/187',
            entity_type: 'node',
            entity_id: '187',
            bundle: 'publication',
            uuid: 'ac891c18-9d46-469b-9e80-fabb6ea04481'
          },
          url: '/sdpta-publication-test-content-publication-08-10-2022',
          origin_url: '/sdpta-publication-test-content-publication-08-10-2022'
        }
      },
      relationships: {
        entity_type: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/links/39ec6fff-595e-45e1-8991-dd8fdf5d22b5/relationships/entity_type'
            }
          }
        }
      }
    }
  ],
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1de5a395-bc1b-4bdd-a0c8-9dab428abecf?include=field_whats_next\u0026site=8888'
    }
  }
}
