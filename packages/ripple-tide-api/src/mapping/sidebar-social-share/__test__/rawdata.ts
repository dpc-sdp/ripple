/**
 * This fixture was generated from this reference page:
 * https://develop.reference.sdp.vic.gov.au/rpl2test-sidebar-related-links
 *
 * The api call to get this data was:
 * https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1de5a395-bc1b-4bdd-a0c8-9dab428abecf?site=8888&include=field_related_links
 *
 * Extra stuff was removed
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
        href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1de5a395-bc1b-4bdd-a0c8-9dab428abecf?resourceVersion=id%3A217'
      }
    },
    attributes: {
      drupal_internal__nid: 136,
      drupal_internal__vid: 217,
      langcode: 'en',
      revision_timestamp: '2022-10-07T04:41:52+00:00',
      revision_log: null,
      status: true,
      title: 'RPL2TEST - Sidebar related links',
      created: '2022-10-07T15:41:52+11:00',
      changed: '2022-10-07T15:41:52+11:00',
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
      field_show_related_content: true,
      field_show_site_section_nav: false,
      field_show_social_sharing: true,
      field_show_table_of_content: false,
      field_show_topic_term_and_tags: true,
      field_show_whats_next: false
    },
    relationships: {
      node_type: {
        data: null,
        links: {
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1de5a395-bc1b-4bdd-a0c8-9dab428abecf/relationships/node_type?resourceVersion=id%3A217'
          }
        }
      },
      revision_uid: {
        data: null,
        links: {
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1de5a395-bc1b-4bdd-a0c8-9dab428abecf/relationships/revision_uid?resourceVersion=id%3A217'
          }
        }
      },
      uid: {
        data: null,
        links: {
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1de5a395-bc1b-4bdd-a0c8-9dab428abecf/relationships/uid?resourceVersion=id%3A217'
          }
        }
      },
      field_bottom_graphical_image: {
        data: null,
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1de5a395-bc1b-4bdd-a0c8-9dab428abecf/field_bottom_graphical_image?resourceVersion=id%3A217'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1de5a395-bc1b-4bdd-a0c8-9dab428abecf/relationships/field_bottom_graphical_image?resourceVersion=id%3A217'
          }
        }
      }
    }
  },
  included: [],
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1de5a395-bc1b-4bdd-a0c8-9dab428abecf?include=field_related_links\u0026site=8888'
    }
  }
}
