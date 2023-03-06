// eslint-disable-next-line
export const rawData = {
  jsonapi: {
    version: '1.0',
    meta: { links: { self: { href: 'http://jsonapi.org/format/1.0/' } } }
  },
  data: [
    {
      type: 'taxonomy_term--sites',
      id: '31255b89-65e3-4eb6-af81-4d3674b26eb3',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/31255b89-65e3-4eb6-af81-4d3674b26eb3'
        }
      },
      attributes: {
        drupal_internal__tid: 8970,
        drupal_internal__revision_id: 109,
        revision_created: '2022-11-17T07:49:00+00:00',
        revision_log_message: null,
        status: true,
        name: 'Third demo site',
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/sites/third-demo-site'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Third demo site | Single Digital Presence Content Management System'
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
        field_title_of_table_of_contents: 'Jump to'
      },
      relationships: {
        site_alerts: {
          data: [
            { type: 'node--alert', id: '253f5c6b-29b4-4e24-9312-4da69bf27e32' },
            { type: 'node--alert', id: 'fabc6c5c-ad02-4b2a-a129-86c6f1eefb05' },
            { type: 'node--alert', id: 'b9308945-a73e-4ab0-bfdf-61b8b9cd600e' },
            { type: 'node--alert', id: 'dbb21011-faa8-487c-938f-27658a18b9cf' },
            { type: 'node--alert', id: '2defd9c6-eb3b-4ebf-992e-7d2f174da89f' },
            { type: 'node--alert', id: 'a476dce6-cc82-4bbe-aa74-1118afe31be6' },
            { type: 'node--alert', id: '6748d9aa-1f8a-4dc8-833a-9013a109eaf4' },
            { type: 'node--alert', id: '5989f17e-810f-44be-9083-9802808ea960' },
            { type: 'node--alert', id: '1a0dce6a-57e6-4f13-8263-4054fa1cc09e' },
            { type: 'node--alert', id: '67d48527-5c4f-4cb8-9fa7-57c3c721445b' }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/31255b89-65e3-4eb6-af81-4d3674b26eb3/site_alerts'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/31255b89-65e3-4eb6-af81-4d3674b26eb3/relationships/site_alerts'
            }
          }
        }
      }
    }
  ],
  included: [
    {
      type: 'node--alert',
      id: '253f5c6b-29b4-4e24-9312-4da69bf27e32',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/253f5c6b-29b4-4e24-9312-4da69bf27e32?resourceVersion=id%3A2841'
        }
      },
      attributes: {
        drupal_internal__nid: 1379,
        drupal_internal__vid: 2841,
        langcode: 'en',
        revision_timestamp: '2022-11-21T22:35:52+00:00',
        revision_log: null,
        status: true,
        title: 'Demo alert title',
        created: '2022-11-22T09:35:52+11:00',
        changed: '2022-11-22T09:35:52+11:00',
        promote: false,
        sticky: false,
        default_langcode: true,
        revision_translation_affected: true,
        moderation_state: 'published',
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/demo-alert-title'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Demo alert title | Single Digital Presence Content Management System'
            }
          }
        ],
        path: {
          alias: '/demo-alert-title',
          pid: 4848,
          langcode: 'en',
          url: '/demo-alert-title',
          origin_alias: '/site-8970/demo-alert-title',
          origin_url: '/demo-alert-title'
        },
        field_call_to_action: {
          uri: 'entity:node/landing_page/11dede11-10c0-111e1-1100-000000000330',
          title: 'Test link',
          options: [],
          entity: {
            uri: 'entity:node/65',
            entity_type: 'node',
            entity_id: '65',
            bundle: 'landing_page',
            uuid: '11dede11-10c0-111e1-1100-000000000330'
          },
          url: 'https://www.demo.vic.gov.au/demo-landing-page',
          origin_url: '/demo-landing-page'
        }
      },
      relationships: {
        node_type: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/253f5c6b-29b4-4e24-9312-4da69bf27e32/relationships/node_type?resourceVersion=id%3A2841'
            }
          }
        },
        revision_uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/253f5c6b-29b4-4e24-9312-4da69bf27e32/relationships/revision_uid?resourceVersion=id%3A2841'
            }
          }
        },
        uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/253f5c6b-29b4-4e24-9312-4da69bf27e32/relationships/uid?resourceVersion=id%3A2841'
            }
          }
        },
        field_alert_type: {
          data: {
            type: 'taxonomy_term--alert_type',
            id: '11dede11-10c0-111e1-1100-000000000150'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/253f5c6b-29b4-4e24-9312-4da69bf27e32/field_alert_type?resourceVersion=id%3A2841'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/253f5c6b-29b4-4e24-9312-4da69bf27e32/relationships/field_alert_type?resourceVersion=id%3A2841'
            }
          }
        },
        field_node_primary_site: {
          data: {
            type: 'taxonomy_term--sites',
            id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/253f5c6b-29b4-4e24-9312-4da69bf27e32/field_node_primary_site?resourceVersion=id%3A2841'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/253f5c6b-29b4-4e24-9312-4da69bf27e32/relationships/field_node_primary_site?resourceVersion=id%3A2841'
            }
          }
        },
        field_node_site: {
          data: [
            {
              type: 'taxonomy_term--sites',
              id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/253f5c6b-29b4-4e24-9312-4da69bf27e32/field_node_site?resourceVersion=id%3A2841'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/253f5c6b-29b4-4e24-9312-4da69bf27e32/relationships/field_node_site?resourceVersion=id%3A2841'
            }
          }
        }
      }
    },
    {
      type: 'node--alert',
      id: 'fabc6c5c-ad02-4b2a-a129-86c6f1eefb05',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/fabc6c5c-ad02-4b2a-a129-86c6f1eefb05?resourceVersion=id%3A2840'
        }
      },
      attributes: {
        drupal_internal__nid: 1378,
        drupal_internal__vid: 2840,
        langcode: 'en',
        revision_timestamp: '2022-11-21T22:35:24+00:00',
        revision_log: null,
        status: true,
        title: 'Emergency title',
        created: '2022-11-22T09:35:24+11:00',
        changed: '2022-11-22T09:35:24+11:00',
        promote: false,
        sticky: false,
        default_langcode: true,
        revision_translation_affected: true,
        moderation_state: 'published',
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/emergency-title'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Emergency title | Single Digital Presence Content Management System'
            }
          }
        ],
        path: {
          alias: '/emergency-title',
          pid: 4846,
          langcode: 'en',
          url: '/emergency-title',
          origin_alias: '/site-8970/emergency-title',
          origin_url: '/emergency-title'
        },
        field_call_to_action: {
          uri: 'entity:node/landing_page/11dede11-10c0-111e1-1100-000000000330',
          title: 'Test link',
          options: [],
          entity: {
            uri: 'entity:node/65',
            entity_type: 'node',
            entity_id: '65',
            bundle: 'landing_page',
            uuid: '11dede11-10c0-111e1-1100-000000000330'
          },
          url: 'https://www.demo.vic.gov.au/demo-landing-page',
          origin_url: '/demo-landing-page'
        }
      },
      relationships: {
        node_type: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/fabc6c5c-ad02-4b2a-a129-86c6f1eefb05/relationships/node_type?resourceVersion=id%3A2840'
            }
          }
        },
        revision_uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/fabc6c5c-ad02-4b2a-a129-86c6f1eefb05/relationships/revision_uid?resourceVersion=id%3A2840'
            }
          }
        },
        uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/fabc6c5c-ad02-4b2a-a129-86c6f1eefb05/relationships/uid?resourceVersion=id%3A2840'
            }
          }
        },
        field_alert_type: {
          data: {
            type: 'taxonomy_term--alert_type',
            id: 'b8a0d575-90be-493f-acd4-0ce985939f9f'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/fabc6c5c-ad02-4b2a-a129-86c6f1eefb05/field_alert_type?resourceVersion=id%3A2840'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/fabc6c5c-ad02-4b2a-a129-86c6f1eefb05/relationships/field_alert_type?resourceVersion=id%3A2840'
            }
          }
        },
        field_node_primary_site: {
          data: {
            type: 'taxonomy_term--sites',
            id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/fabc6c5c-ad02-4b2a-a129-86c6f1eefb05/field_node_primary_site?resourceVersion=id%3A2840'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/fabc6c5c-ad02-4b2a-a129-86c6f1eefb05/relationships/field_node_primary_site?resourceVersion=id%3A2840'
            }
          }
        },
        field_node_site: {
          data: [
            {
              type: 'taxonomy_term--sites',
              id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/fabc6c5c-ad02-4b2a-a129-86c6f1eefb05/field_node_site?resourceVersion=id%3A2840'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/fabc6c5c-ad02-4b2a-a129-86c6f1eefb05/relationships/field_node_site?resourceVersion=id%3A2840'
            }
          }
        }
      }
    },
    {
      type: 'node--alert',
      id: 'b9308945-a73e-4ab0-bfdf-61b8b9cd600e',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/b9308945-a73e-4ab0-bfdf-61b8b9cd600e?resourceVersion=id%3A2839'
        }
      },
      attributes: {
        drupal_internal__nid: 1377,
        drupal_internal__vid: 2839,
        langcode: 'en',
        revision_timestamp: '2022-11-21T22:32:45+00:00',
        revision_log: null,
        status: true,
        title: 'Traffic title',
        created: '2022-11-22T09:32:45+11:00',
        changed: '2022-11-22T09:32:45+11:00',
        promote: false,
        sticky: false,
        default_langcode: true,
        revision_translation_affected: true,
        moderation_state: 'published',
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/traffic-title'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Traffic title | Single Digital Presence Content Management System'
            }
          }
        ],
        path: {
          alias: '/traffic-title',
          pid: 4844,
          langcode: 'en',
          url: '/traffic-title',
          origin_alias: '/site-8970/traffic-title',
          origin_url: '/traffic-title'
        },
        field_call_to_action: {
          uri: 'entity:node/landing_page/11dede11-10c0-111e1-1100-000000000330',
          title: 'Test link',
          options: [],
          entity: {
            uri: 'entity:node/65',
            entity_type: 'node',
            entity_id: '65',
            bundle: 'landing_page',
            uuid: '11dede11-10c0-111e1-1100-000000000330'
          },
          url: 'https://www.demo.vic.gov.au/demo-landing-page',
          origin_url: '/demo-landing-page'
        }
      },
      relationships: {
        node_type: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/b9308945-a73e-4ab0-bfdf-61b8b9cd600e/relationships/node_type?resourceVersion=id%3A2839'
            }
          }
        },
        revision_uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/b9308945-a73e-4ab0-bfdf-61b8b9cd600e/relationships/revision_uid?resourceVersion=id%3A2839'
            }
          }
        },
        uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/b9308945-a73e-4ab0-bfdf-61b8b9cd600e/relationships/uid?resourceVersion=id%3A2839'
            }
          }
        },
        field_alert_type: {
          data: {
            type: 'taxonomy_term--alert_type',
            id: '6d8db189-3296-4f9b-900a-126bd2894269'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/b9308945-a73e-4ab0-bfdf-61b8b9cd600e/field_alert_type?resourceVersion=id%3A2839'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/b9308945-a73e-4ab0-bfdf-61b8b9cd600e/relationships/field_alert_type?resourceVersion=id%3A2839'
            }
          }
        },
        field_node_primary_site: {
          data: {
            type: 'taxonomy_term--sites',
            id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/b9308945-a73e-4ab0-bfdf-61b8b9cd600e/field_node_primary_site?resourceVersion=id%3A2839'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/b9308945-a73e-4ab0-bfdf-61b8b9cd600e/relationships/field_node_primary_site?resourceVersion=id%3A2839'
            }
          }
        },
        field_node_site: {
          data: [
            {
              type: 'taxonomy_term--sites',
              id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/b9308945-a73e-4ab0-bfdf-61b8b9cd600e/field_node_site?resourceVersion=id%3A2839'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/b9308945-a73e-4ab0-bfdf-61b8b9cd600e/relationships/field_node_site?resourceVersion=id%3A2839'
            }
          }
        }
      }
    },
    {
      type: 'node--alert',
      id: 'dbb21011-faa8-487c-938f-27658a18b9cf',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/dbb21011-faa8-487c-938f-27658a18b9cf?resourceVersion=id%3A2838'
        }
      },
      attributes: {
        drupal_internal__nid: 1376,
        drupal_internal__vid: 2838,
        langcode: 'en',
        revision_timestamp: '2022-11-21T22:32:24+00:00',
        revision_log: null,
        status: true,
        title: 'Notification title',
        created: '2022-11-22T09:32:24+11:00',
        changed: '2022-11-22T09:32:24+11:00',
        promote: false,
        sticky: false,
        default_langcode: true,
        revision_translation_affected: true,
        moderation_state: 'published',
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/notification-title'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Notification title | Single Digital Presence Content Management System'
            }
          }
        ],
        path: {
          alias: '/notification-title',
          pid: 4842,
          langcode: 'en',
          url: '/notification-title',
          origin_alias: '/site-8970/notification-title',
          origin_url: '/notification-title'
        },
        field_call_to_action: {
          uri: 'entity:node/landing_page/11dede11-10c0-111e1-1100-000000000330',
          title: 'Test link',
          options: [],
          entity: {
            uri: 'entity:node/65',
            entity_type: 'node',
            entity_id: '65',
            bundle: 'landing_page',
            uuid: '11dede11-10c0-111e1-1100-000000000330'
          },
          url: 'https://www.demo.vic.gov.au/demo-landing-page',
          origin_url: '/demo-landing-page'
        }
      },
      relationships: {
        node_type: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/dbb21011-faa8-487c-938f-27658a18b9cf/relationships/node_type?resourceVersion=id%3A2838'
            }
          }
        },
        revision_uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/dbb21011-faa8-487c-938f-27658a18b9cf/relationships/revision_uid?resourceVersion=id%3A2838'
            }
          }
        },
        uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/dbb21011-faa8-487c-938f-27658a18b9cf/relationships/uid?resourceVersion=id%3A2838'
            }
          }
        },
        field_alert_type: {
          data: {
            type: 'taxonomy_term--alert_type',
            id: '51fc6b4a-3f30-4c94-b976-0f499f46371d'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/dbb21011-faa8-487c-938f-27658a18b9cf/field_alert_type?resourceVersion=id%3A2838'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/dbb21011-faa8-487c-938f-27658a18b9cf/relationships/field_alert_type?resourceVersion=id%3A2838'
            }
          }
        },
        field_node_primary_site: {
          data: {
            type: 'taxonomy_term--sites',
            id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/dbb21011-faa8-487c-938f-27658a18b9cf/field_node_primary_site?resourceVersion=id%3A2838'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/dbb21011-faa8-487c-938f-27658a18b9cf/relationships/field_node_primary_site?resourceVersion=id%3A2838'
            }
          }
        },
        field_node_site: {
          data: [
            {
              type: 'taxonomy_term--sites',
              id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/dbb21011-faa8-487c-938f-27658a18b9cf/field_node_site?resourceVersion=id%3A2838'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/dbb21011-faa8-487c-938f-27658a18b9cf/relationships/field_node_site?resourceVersion=id%3A2838'
            }
          }
        }
      }
    },
    {
      type: 'node--alert',
      id: '2defd9c6-eb3b-4ebf-992e-7d2f174da89f',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/2defd9c6-eb3b-4ebf-992e-7d2f174da89f?resourceVersion=id%3A2837'
        }
      },
      attributes: {
        drupal_internal__nid: 1375,
        drupal_internal__vid: 2837,
        langcode: 'en',
        revision_timestamp: '2022-11-21T22:32:03+00:00',
        revision_log: null,
        status: true,
        title: 'Fire title',
        created: '2022-11-22T09:32:03+11:00',
        changed: '2022-11-22T09:32:03+11:00',
        promote: false,
        sticky: false,
        default_langcode: true,
        revision_translation_affected: true,
        moderation_state: 'published',
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/fire-title'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Fire title | Single Digital Presence Content Management System'
            }
          }
        ],
        path: {
          alias: '/fire-title',
          pid: 4840,
          langcode: 'en',
          url: '/fire-title',
          origin_alias: '/site-8970/fire-title',
          origin_url: '/fire-title'
        },
        field_call_to_action: {
          uri: 'entity:node/landing_page/11dede11-10c0-111e1-1100-000000000330',
          title: 'Test link',
          options: [],
          entity: {
            uri: 'entity:node/65',
            entity_type: 'node',
            entity_id: '65',
            bundle: 'landing_page',
            uuid: '11dede11-10c0-111e1-1100-000000000330'
          },
          url: 'https://www.demo.vic.gov.au/demo-landing-page',
          origin_url: '/demo-landing-page'
        }
      },
      relationships: {
        node_type: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/2defd9c6-eb3b-4ebf-992e-7d2f174da89f/relationships/node_type?resourceVersion=id%3A2837'
            }
          }
        },
        revision_uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/2defd9c6-eb3b-4ebf-992e-7d2f174da89f/relationships/revision_uid?resourceVersion=id%3A2837'
            }
          }
        },
        uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/2defd9c6-eb3b-4ebf-992e-7d2f174da89f/relationships/uid?resourceVersion=id%3A2837'
            }
          }
        },
        field_alert_type: {
          data: {
            type: 'taxonomy_term--alert_type',
            id: '72785a34-a587-412c-b39c-600949d32456'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/2defd9c6-eb3b-4ebf-992e-7d2f174da89f/field_alert_type?resourceVersion=id%3A2837'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/2defd9c6-eb3b-4ebf-992e-7d2f174da89f/relationships/field_alert_type?resourceVersion=id%3A2837'
            }
          }
        },
        field_node_primary_site: {
          data: {
            type: 'taxonomy_term--sites',
            id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/2defd9c6-eb3b-4ebf-992e-7d2f174da89f/field_node_primary_site?resourceVersion=id%3A2837'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/2defd9c6-eb3b-4ebf-992e-7d2f174da89f/relationships/field_node_primary_site?resourceVersion=id%3A2837'
            }
          }
        },
        field_node_site: {
          data: [
            {
              type: 'taxonomy_term--sites',
              id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/2defd9c6-eb3b-4ebf-992e-7d2f174da89f/field_node_site?resourceVersion=id%3A2837'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/2defd9c6-eb3b-4ebf-992e-7d2f174da89f/relationships/field_node_site?resourceVersion=id%3A2837'
            }
          }
        }
      }
    },
    {
      type: 'node--alert',
      id: 'a476dce6-cc82-4bbe-aa74-1118afe31be6',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/a476dce6-cc82-4bbe-aa74-1118afe31be6?resourceVersion=id%3A2836'
        }
      },
      attributes: {
        drupal_internal__nid: 1370,
        drupal_internal__vid: 2836,
        langcode: 'en',
        revision_timestamp: '2022-11-21T22:31:44+00:00',
        revision_log: null,
        status: true,
        title: 'Flood title',
        created: '2022-11-22T09:28:16+11:00',
        changed: '2022-11-22T09:31:44+11:00',
        promote: false,
        sticky: false,
        default_langcode: true,
        revision_translation_affected: true,
        moderation_state: 'published',
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/test-title'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Flood title | Single Digital Presence Content Management System'
            }
          }
        ],
        path: {
          alias: '/test-title',
          pid: 4828,
          langcode: 'en',
          url: '/test-title',
          origin_alias: '/site-8970/test-title',
          origin_url: '/test-title'
        },
        field_call_to_action: {
          uri: 'entity:node/landing_page/11dede11-10c0-111e1-1100-000000000330',
          title: 'Test link',
          options: [],
          entity: {
            uri: 'entity:node/65',
            entity_type: 'node',
            entity_id: '65',
            bundle: 'landing_page',
            uuid: '11dede11-10c0-111e1-1100-000000000330'
          },
          url: 'https://www.demo.vic.gov.au/demo-landing-page',
          origin_url: '/demo-landing-page'
        }
      },
      relationships: {
        node_type: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/a476dce6-cc82-4bbe-aa74-1118afe31be6/relationships/node_type?resourceVersion=id%3A2836'
            }
          }
        },
        revision_uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/a476dce6-cc82-4bbe-aa74-1118afe31be6/relationships/revision_uid?resourceVersion=id%3A2836'
            }
          }
        },
        uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/a476dce6-cc82-4bbe-aa74-1118afe31be6/relationships/uid?resourceVersion=id%3A2836'
            }
          }
        },
        field_alert_type: {
          data: {
            type: 'taxonomy_term--alert_type',
            id: 'd9eb4a6c-3c6d-4b5e-9dc6-3add61232e7a'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/a476dce6-cc82-4bbe-aa74-1118afe31be6/field_alert_type?resourceVersion=id%3A2836'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/a476dce6-cc82-4bbe-aa74-1118afe31be6/relationships/field_alert_type?resourceVersion=id%3A2836'
            }
          }
        },
        field_node_primary_site: {
          data: {
            type: 'taxonomy_term--sites',
            id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/a476dce6-cc82-4bbe-aa74-1118afe31be6/field_node_primary_site?resourceVersion=id%3A2836'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/a476dce6-cc82-4bbe-aa74-1118afe31be6/relationships/field_node_primary_site?resourceVersion=id%3A2836'
            }
          }
        },
        field_node_site: {
          data: [
            {
              type: 'taxonomy_term--sites',
              id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/a476dce6-cc82-4bbe-aa74-1118afe31be6/field_node_site?resourceVersion=id%3A2836'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/a476dce6-cc82-4bbe-aa74-1118afe31be6/relationships/field_node_site?resourceVersion=id%3A2836'
            }
          }
        }
      }
    },
    {
      type: 'node--alert',
      id: '6748d9aa-1f8a-4dc8-833a-9013a109eaf4',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/6748d9aa-1f8a-4dc8-833a-9013a109eaf4?resourceVersion=id%3A2835'
        }
      },
      attributes: {
        drupal_internal__nid: 1372,
        drupal_internal__vid: 2835,
        langcode: 'en',
        revision_timestamp: '2022-11-21T22:31:21+00:00',
        revision_log: null,
        status: true,
        title: 'Medical title',
        created: '2022-11-22T09:29:28+11:00',
        changed: '2022-11-22T09:31:17+11:00',
        promote: false,
        sticky: false,
        default_langcode: true,
        revision_translation_affected: true,
        moderation_state: 'published',
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/test-title-0'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Medical title | Single Digital Presence Content Management System'
            }
          }
        ],
        path: {
          alias: '/test-title-0',
          pid: 4832,
          langcode: 'en',
          url: '/test-title-0',
          origin_alias: '/site-8970/test-title-0',
          origin_url: '/test-title-0'
        },
        field_call_to_action: {
          uri: 'entity:node/landing_page/11dede11-10c0-111e1-1100-000000000330',
          title: 'Test link',
          options: [],
          entity: {
            uri: 'entity:node/65',
            entity_type: 'node',
            entity_id: '65',
            bundle: 'landing_page',
            uuid: '11dede11-10c0-111e1-1100-000000000330'
          },
          url: 'https://www.demo.vic.gov.au/demo-landing-page',
          origin_url: '/demo-landing-page'
        }
      },
      relationships: {
        node_type: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/6748d9aa-1f8a-4dc8-833a-9013a109eaf4/relationships/node_type?resourceVersion=id%3A2835'
            }
          }
        },
        revision_uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/6748d9aa-1f8a-4dc8-833a-9013a109eaf4/relationships/revision_uid?resourceVersion=id%3A2835'
            }
          }
        },
        uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/6748d9aa-1f8a-4dc8-833a-9013a109eaf4/relationships/uid?resourceVersion=id%3A2835'
            }
          }
        },
        field_alert_type: {
          data: {
            type: 'taxonomy_term--alert_type',
            id: '040cf527-b430-4832-af9f-baa246bbe7d8'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/6748d9aa-1f8a-4dc8-833a-9013a109eaf4/field_alert_type?resourceVersion=id%3A2835'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/6748d9aa-1f8a-4dc8-833a-9013a109eaf4/relationships/field_alert_type?resourceVersion=id%3A2835'
            }
          }
        },
        field_node_primary_site: {
          data: {
            type: 'taxonomy_term--sites',
            id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/6748d9aa-1f8a-4dc8-833a-9013a109eaf4/field_node_primary_site?resourceVersion=id%3A2835'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/6748d9aa-1f8a-4dc8-833a-9013a109eaf4/relationships/field_node_primary_site?resourceVersion=id%3A2835'
            }
          }
        },
        field_node_site: {
          data: [
            {
              type: 'taxonomy_term--sites',
              id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/6748d9aa-1f8a-4dc8-833a-9013a109eaf4/field_node_site?resourceVersion=id%3A2835'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/6748d9aa-1f8a-4dc8-833a-9013a109eaf4/relationships/field_node_site?resourceVersion=id%3A2835'
            }
          }
        }
      }
    },
    {
      type: 'node--alert',
      id: '5989f17e-810f-44be-9083-9802808ea960',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/5989f17e-810f-44be-9083-9802808ea960?resourceVersion=id%3A2833'
        }
      },
      attributes: {
        drupal_internal__nid: 1371,
        drupal_internal__vid: 2833,
        langcode: 'en',
        revision_timestamp: '2022-11-21T22:31:05+00:00',
        revision_log: null,
        status: true,
        title: 'Lightning title',
        created: '2022-11-22T09:28:27+11:00',
        changed: '2022-11-22T09:31:00+11:00',
        promote: false,
        sticky: false,
        default_langcode: true,
        revision_translation_affected: true,
        moderation_state: 'published',
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/clone-test-title'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Lightning title | Single Digital Presence Content Management System'
            }
          }
        ],
        path: {
          alias: '/clone-test-title',
          pid: 4830,
          langcode: 'en',
          url: '/clone-test-title',
          origin_alias: '/site-8970/clone-test-title',
          origin_url: '/clone-test-title'
        },
        field_call_to_action: {
          uri: 'entity:node/landing_page/11dede11-10c0-111e1-1100-000000000330',
          title: 'Test link',
          options: [],
          entity: {
            uri: 'entity:node/65',
            entity_type: 'node',
            entity_id: '65',
            bundle: 'landing_page',
            uuid: '11dede11-10c0-111e1-1100-000000000330'
          },
          url: 'https://www.demo.vic.gov.au/demo-landing-page',
          origin_url: '/demo-landing-page'
        }
      },
      relationships: {
        node_type: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/5989f17e-810f-44be-9083-9802808ea960/relationships/node_type?resourceVersion=id%3A2833'
            }
          }
        },
        revision_uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/5989f17e-810f-44be-9083-9802808ea960/relationships/revision_uid?resourceVersion=id%3A2833'
            }
          }
        },
        uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/5989f17e-810f-44be-9083-9802808ea960/relationships/uid?resourceVersion=id%3A2833'
            }
          }
        },
        field_alert_type: {
          data: {
            type: 'taxonomy_term--alert_type',
            id: '52e80024-4f43-4a8c-8ee5-655d7643fa87'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/5989f17e-810f-44be-9083-9802808ea960/field_alert_type?resourceVersion=id%3A2833'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/5989f17e-810f-44be-9083-9802808ea960/relationships/field_alert_type?resourceVersion=id%3A2833'
            }
          }
        },
        field_node_primary_site: {
          data: {
            type: 'taxonomy_term--sites',
            id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/5989f17e-810f-44be-9083-9802808ea960/field_node_primary_site?resourceVersion=id%3A2833'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/5989f17e-810f-44be-9083-9802808ea960/relationships/field_node_primary_site?resourceVersion=id%3A2833'
            }
          }
        },
        field_node_site: {
          data: [
            {
              type: 'taxonomy_term--sites',
              id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/5989f17e-810f-44be-9083-9802808ea960/field_node_site?resourceVersion=id%3A2833'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/5989f17e-810f-44be-9083-9802808ea960/relationships/field_node_site?resourceVersion=id%3A2833'
            }
          }
        }
      }
    },
    {
      type: 'node--alert',
      id: '1a0dce6a-57e6-4f13-8263-4054fa1cc09e',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/1a0dce6a-57e6-4f13-8263-4054fa1cc09e?resourceVersion=id%3A2830'
        }
      },
      attributes: {
        drupal_internal__nid: 1374,
        drupal_internal__vid: 2830,
        langcode: 'en',
        revision_timestamp: '2022-11-21T22:30:49+00:00',
        revision_log: null,
        status: true,
        title: 'Pollution title',
        created: '2022-11-22T09:30:49+11:00',
        changed: '2022-11-22T09:30:49+11:00',
        promote: false,
        sticky: false,
        default_langcode: true,
        revision_translation_affected: true,
        moderation_state: 'published',
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/pollution-title'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Pollution title | Single Digital Presence Content Management System'
            }
          }
        ],
        path: {
          alias: '/pollution-title',
          pid: 4838,
          langcode: 'en',
          url: '/pollution-title',
          origin_alias: '/site-8970/pollution-title',
          origin_url: '/pollution-title'
        },
        field_call_to_action: {
          uri: 'entity:node/landing_page/11dede11-10c0-111e1-1100-000000000330',
          title: 'Test link',
          options: [],
          entity: {
            uri: 'entity:node/65',
            entity_type: 'node',
            entity_id: '65',
            bundle: 'landing_page',
            uuid: '11dede11-10c0-111e1-1100-000000000330'
          },
          url: 'https://www.demo.vic.gov.au/demo-landing-page',
          origin_url: '/demo-landing-page'
        }
      },
      relationships: {
        node_type: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/1a0dce6a-57e6-4f13-8263-4054fa1cc09e/relationships/node_type?resourceVersion=id%3A2830'
            }
          }
        },
        revision_uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/1a0dce6a-57e6-4f13-8263-4054fa1cc09e/relationships/revision_uid?resourceVersion=id%3A2830'
            }
          }
        },
        uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/1a0dce6a-57e6-4f13-8263-4054fa1cc09e/relationships/uid?resourceVersion=id%3A2830'
            }
          }
        },
        field_alert_type: {
          data: {
            type: 'taxonomy_term--alert_type',
            id: '75f69a61-9f3d-44b4-8b81-4a829900d7d9'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/1a0dce6a-57e6-4f13-8263-4054fa1cc09e/field_alert_type?resourceVersion=id%3A2830'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/1a0dce6a-57e6-4f13-8263-4054fa1cc09e/relationships/field_alert_type?resourceVersion=id%3A2830'
            }
          }
        },
        field_node_primary_site: {
          data: {
            type: 'taxonomy_term--sites',
            id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/1a0dce6a-57e6-4f13-8263-4054fa1cc09e/field_node_primary_site?resourceVersion=id%3A2830'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/1a0dce6a-57e6-4f13-8263-4054fa1cc09e/relationships/field_node_primary_site?resourceVersion=id%3A2830'
            }
          }
        },
        field_node_site: {
          data: [
            {
              type: 'taxonomy_term--sites',
              id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/1a0dce6a-57e6-4f13-8263-4054fa1cc09e/field_node_site?resourceVersion=id%3A2830'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/1a0dce6a-57e6-4f13-8263-4054fa1cc09e/relationships/field_node_site?resourceVersion=id%3A2830'
            }
          }
        }
      }
    },
    {
      type: 'node--alert',
      id: '67d48527-5c4f-4cb8-9fa7-57c3c721445b',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/67d48527-5c4f-4cb8-9fa7-57c3c721445b?resourceVersion=id%3A2824'
        }
      },
      attributes: {
        drupal_internal__nid: 1369,
        drupal_internal__vid: 2824,
        langcode: 'en',
        revision_timestamp: '2022-11-21T22:27:32+00:00',
        revision_log: null,
        status: true,
        title: 'Heat wave title',
        created: '2022-11-22T09:27:33+11:00',
        changed: '2022-11-22T09:27:32+11:00',
        promote: false,
        sticky: false,
        default_langcode: true,
        revision_translation_affected: true,
        moderation_state: 'published',
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/heat-wave-title'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Heat wave title | Single Digital Presence Content Management System'
            }
          }
        ],
        path: {
          alias: '/heat-wave-title',
          pid: 4826,
          langcode: 'en',
          url: '/heat-wave-title',
          origin_alias: '/site-8970/heat-wave-title',
          origin_url: '/heat-wave-title'
        },
        field_call_to_action: {
          uri: 'entity:node/landing_page/11dede11-10c0-111e1-1100-000000000330',
          title: 'Test link',
          options: [],
          entity: {
            uri: 'entity:node/65',
            entity_type: 'node',
            entity_id: '65',
            bundle: 'landing_page',
            uuid: '11dede11-10c0-111e1-1100-000000000330'
          },
          url: 'https://www.demo.vic.gov.au/demo-landing-page',
          origin_url: '/demo-landing-page'
        }
      },
      relationships: {
        node_type: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/67d48527-5c4f-4cb8-9fa7-57c3c721445b/relationships/node_type?resourceVersion=id%3A2824'
            }
          }
        },
        revision_uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/67d48527-5c4f-4cb8-9fa7-57c3c721445b/relationships/revision_uid?resourceVersion=id%3A2824'
            }
          }
        },
        uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/67d48527-5c4f-4cb8-9fa7-57c3c721445b/relationships/uid?resourceVersion=id%3A2824'
            }
          }
        },
        field_alert_type: {
          data: {
            type: 'taxonomy_term--alert_type',
            id: '21b06384-78ed-4c0f-b1e5-ad98a9a31c3d'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/67d48527-5c4f-4cb8-9fa7-57c3c721445b/field_alert_type?resourceVersion=id%3A2824'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/67d48527-5c4f-4cb8-9fa7-57c3c721445b/relationships/field_alert_type?resourceVersion=id%3A2824'
            }
          }
        },
        field_node_primary_site: {
          data: {
            type: 'taxonomy_term--sites',
            id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/67d48527-5c4f-4cb8-9fa7-57c3c721445b/field_node_primary_site?resourceVersion=id%3A2824'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/67d48527-5c4f-4cb8-9fa7-57c3c721445b/relationships/field_node_primary_site?resourceVersion=id%3A2824'
            }
          }
        },
        field_node_site: {
          data: [
            {
              type: 'taxonomy_term--sites',
              id: '31255b89-65e3-4eb6-af81-4d3674b26eb3'
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/67d48527-5c4f-4cb8-9fa7-57c3c721445b/field_node_site?resourceVersion=id%3A2824'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/alert/67d48527-5c4f-4cb8-9fa7-57c3c721445b/relationships/field_node_site?resourceVersion=id%3A2824'
            }
          }
        }
      }
    },
    {
      type: 'taxonomy_term--alert_type',
      id: '11dede11-10c0-111e1-1100-000000000150',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/11dede11-10c0-111e1-1100-000000000150'
        }
      },
      attributes: {
        drupal_internal__tid: 8968,
        drupal_internal__revision_id: 107,
        langcode: 'en',
        revision_created: '2022-11-10T00:59:26+00:00',
        revision_log_message: null,
        status: true,
        name: 'Demo Alert Type',
        description: null,
        weight: 0,
        changed: '2022-11-10T00:59:26+00:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/alerttype/demo-alert-type'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Demo Alert Type | Single Digital Presence Content Management System'
            }
          }
        ],
        path: { alias: '/alerttype/demo-alert-type', pid: 454, langcode: 'en' }
      },
      relationships: {
        vid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/11dede11-10c0-111e1-1100-000000000150/relationships/vid'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/11dede11-10c0-111e1-1100-000000000150/relationships/revision_user'
            }
          }
        },
        parent: {
          data: [
            {
              type: 'taxonomy_term--alert_type',
              id: 'virtual',
              meta: {
                links: {
                  help: {
                    href: 'https://www.drupal.org/docs/8/modules/json-api/core-concepts#virtual',
                    meta: {
                      about:
                        'Usage and meaning of the \u0027virtual\u0027 resource identifier.'
                    }
                  }
                }
              }
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/11dede11-10c0-111e1-1100-000000000150/parent'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/11dede11-10c0-111e1-1100-000000000150/relationships/parent'
            }
          }
        }
      }
    },
    {
      type: 'taxonomy_term--alert_type',
      id: 'b8a0d575-90be-493f-acd4-0ce985939f9f',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/b8a0d575-90be-493f-acd4-0ce985939f9f'
        }
      },
      attributes: {
        drupal_internal__tid: 4,
        drupal_internal__revision_id: 4,
        langcode: 'en',
        revision_created: '2022-07-25T09:05:31+00:00',
        revision_log_message: null,
        status: true,
        name: 'Emergency',
        description: null,
        weight: 100,
        changed: '2022-07-25T09:05:31+00:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/alerttype/emergency'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Emergency | Single Digital Presence Content Management System'
            }
          }
        ],
        path: { alias: '/alerttype/emergency', pid: 1, langcode: 'en' }
      },
      relationships: {
        vid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/b8a0d575-90be-493f-acd4-0ce985939f9f/relationships/vid'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/b8a0d575-90be-493f-acd4-0ce985939f9f/relationships/revision_user'
            }
          }
        },
        parent: {
          data: [
            {
              type: 'taxonomy_term--alert_type',
              id: 'virtual',
              meta: {
                links: {
                  help: {
                    href: 'https://www.drupal.org/docs/8/modules/json-api/core-concepts#virtual',
                    meta: {
                      about:
                        'Usage and meaning of the \u0027virtual\u0027 resource identifier.'
                    }
                  }
                }
              }
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/b8a0d575-90be-493f-acd4-0ce985939f9f/parent'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/b8a0d575-90be-493f-acd4-0ce985939f9f/relationships/parent'
            }
          }
        }
      }
    },
    {
      type: 'taxonomy_term--alert_type',
      id: '6d8db189-3296-4f9b-900a-126bd2894269',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/6d8db189-3296-4f9b-900a-126bd2894269'
        }
      },
      attributes: {
        drupal_internal__tid: 11,
        drupal_internal__revision_id: 11,
        langcode: 'en',
        revision_created: '2022-07-25T09:05:31+00:00',
        revision_log_message: null,
        status: true,
        name: 'Traffic',
        description: null,
        weight: 100,
        changed: '2022-07-25T09:05:31+00:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/alerttype/traffic'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Traffic | Single Digital Presence Content Management System'
            }
          }
        ],
        path: { alias: '/alerttype/traffic', pid: 8, langcode: 'en' }
      },
      relationships: {
        vid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/6d8db189-3296-4f9b-900a-126bd2894269/relationships/vid'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/6d8db189-3296-4f9b-900a-126bd2894269/relationships/revision_user'
            }
          }
        },
        parent: {
          data: [
            {
              type: 'taxonomy_term--alert_type',
              id: 'virtual',
              meta: {
                links: {
                  help: {
                    href: 'https://www.drupal.org/docs/8/modules/json-api/core-concepts#virtual',
                    meta: {
                      about:
                        'Usage and meaning of the \u0027virtual\u0027 resource identifier.'
                    }
                  }
                }
              }
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/6d8db189-3296-4f9b-900a-126bd2894269/parent'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/6d8db189-3296-4f9b-900a-126bd2894269/relationships/parent'
            }
          }
        }
      }
    },
    {
      type: 'taxonomy_term--alert_type',
      id: '51fc6b4a-3f30-4c94-b976-0f499f46371d',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/51fc6b4a-3f30-4c94-b976-0f499f46371d'
        }
      },
      attributes: {
        drupal_internal__tid: 12,
        drupal_internal__revision_id: 12,
        langcode: 'en',
        revision_created: '2022-07-25T09:05:31+00:00',
        revision_log_message: null,
        status: true,
        name: 'Notification',
        description: null,
        weight: 100,
        changed: '2022-07-25T09:05:31+00:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/alerttype/notification'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Notification | Single Digital Presence Content Management System'
            }
          }
        ],
        path: { alias: '/alerttype/notification', pid: 9, langcode: 'en' }
      },
      relationships: {
        vid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/51fc6b4a-3f30-4c94-b976-0f499f46371d/relationships/vid'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/51fc6b4a-3f30-4c94-b976-0f499f46371d/relationships/revision_user'
            }
          }
        },
        parent: {
          data: [
            {
              type: 'taxonomy_term--alert_type',
              id: 'virtual',
              meta: {
                links: {
                  help: {
                    href: 'https://www.drupal.org/docs/8/modules/json-api/core-concepts#virtual',
                    meta: {
                      about:
                        'Usage and meaning of the \u0027virtual\u0027 resource identifier.'
                    }
                  }
                }
              }
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/51fc6b4a-3f30-4c94-b976-0f499f46371d/parent'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/51fc6b4a-3f30-4c94-b976-0f499f46371d/relationships/parent'
            }
          }
        }
      }
    },
    {
      type: 'taxonomy_term--alert_type',
      id: '72785a34-a587-412c-b39c-600949d32456',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/72785a34-a587-412c-b39c-600949d32456'
        }
      },
      attributes: {
        drupal_internal__tid: 5,
        drupal_internal__revision_id: 5,
        langcode: 'en',
        revision_created: '2022-07-25T09:05:31+00:00',
        revision_log_message: null,
        status: true,
        name: 'Fire',
        description: null,
        weight: 100,
        changed: '2022-07-25T09:05:31+00:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/alerttype/fire'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Fire | Single Digital Presence Content Management System'
            }
          }
        ],
        path: { alias: '/alerttype/fire', pid: 2, langcode: 'en' }
      },
      relationships: {
        vid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/72785a34-a587-412c-b39c-600949d32456/relationships/vid'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/72785a34-a587-412c-b39c-600949d32456/relationships/revision_user'
            }
          }
        },
        parent: {
          data: [
            {
              type: 'taxonomy_term--alert_type',
              id: 'virtual',
              meta: {
                links: {
                  help: {
                    href: 'https://www.drupal.org/docs/8/modules/json-api/core-concepts#virtual',
                    meta: {
                      about:
                        'Usage and meaning of the \u0027virtual\u0027 resource identifier.'
                    }
                  }
                }
              }
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/72785a34-a587-412c-b39c-600949d32456/parent'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/72785a34-a587-412c-b39c-600949d32456/relationships/parent'
            }
          }
        }
      }
    },
    {
      type: 'taxonomy_term--alert_type',
      id: 'd9eb4a6c-3c6d-4b5e-9dc6-3add61232e7a',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/d9eb4a6c-3c6d-4b5e-9dc6-3add61232e7a'
        }
      },
      attributes: {
        drupal_internal__tid: 6,
        drupal_internal__revision_id: 6,
        langcode: 'en',
        revision_created: '2022-07-25T09:05:31+00:00',
        revision_log_message: null,
        status: true,
        name: 'Flood',
        description: null,
        weight: 100,
        changed: '2022-07-25T09:05:31+00:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/alerttype/flood'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Flood | Single Digital Presence Content Management System'
            }
          }
        ],
        path: { alias: '/alerttype/flood', pid: 3, langcode: 'en' }
      },
      relationships: {
        vid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/d9eb4a6c-3c6d-4b5e-9dc6-3add61232e7a/relationships/vid'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/d9eb4a6c-3c6d-4b5e-9dc6-3add61232e7a/relationships/revision_user'
            }
          }
        },
        parent: {
          data: [
            {
              type: 'taxonomy_term--alert_type',
              id: 'virtual',
              meta: {
                links: {
                  help: {
                    href: 'https://www.drupal.org/docs/8/modules/json-api/core-concepts#virtual',
                    meta: {
                      about:
                        'Usage and meaning of the \u0027virtual\u0027 resource identifier.'
                    }
                  }
                }
              }
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/d9eb4a6c-3c6d-4b5e-9dc6-3add61232e7a/parent'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/d9eb4a6c-3c6d-4b5e-9dc6-3add61232e7a/relationships/parent'
            }
          }
        }
      }
    },
    {
      type: 'taxonomy_term--alert_type',
      id: '040cf527-b430-4832-af9f-baa246bbe7d8',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/040cf527-b430-4832-af9f-baa246bbe7d8'
        }
      },
      attributes: {
        drupal_internal__tid: 7,
        drupal_internal__revision_id: 7,
        langcode: 'en',
        revision_created: '2022-07-25T09:05:31+00:00',
        revision_log_message: null,
        status: true,
        name: 'Medical',
        description: null,
        weight: 100,
        changed: '2022-07-25T09:05:31+00:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/alerttype/medical'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Medical | Single Digital Presence Content Management System'
            }
          }
        ],
        path: { alias: '/alerttype/medical', pid: 4, langcode: 'en' }
      },
      relationships: {
        vid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/040cf527-b430-4832-af9f-baa246bbe7d8/relationships/vid'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/040cf527-b430-4832-af9f-baa246bbe7d8/relationships/revision_user'
            }
          }
        },
        parent: {
          data: [
            {
              type: 'taxonomy_term--alert_type',
              id: 'virtual',
              meta: {
                links: {
                  help: {
                    href: 'https://www.drupal.org/docs/8/modules/json-api/core-concepts#virtual',
                    meta: {
                      about:
                        'Usage and meaning of the \u0027virtual\u0027 resource identifier.'
                    }
                  }
                }
              }
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/040cf527-b430-4832-af9f-baa246bbe7d8/parent'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/040cf527-b430-4832-af9f-baa246bbe7d8/relationships/parent'
            }
          }
        }
      }
    },
    {
      type: 'taxonomy_term--alert_type',
      id: '52e80024-4f43-4a8c-8ee5-655d7643fa87',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/52e80024-4f43-4a8c-8ee5-655d7643fa87'
        }
      },
      attributes: {
        drupal_internal__tid: 8,
        drupal_internal__revision_id: 8,
        langcode: 'en',
        revision_created: '2022-07-25T09:05:31+00:00',
        revision_log_message: null,
        status: true,
        name: 'Lightning',
        description: null,
        weight: 100,
        changed: '2022-07-25T09:05:31+00:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/alerttype/lightning'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Lightning | Single Digital Presence Content Management System'
            }
          }
        ],
        path: { alias: '/alerttype/lightning', pid: 5, langcode: 'en' }
      },
      relationships: {
        vid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/52e80024-4f43-4a8c-8ee5-655d7643fa87/relationships/vid'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/52e80024-4f43-4a8c-8ee5-655d7643fa87/relationships/revision_user'
            }
          }
        },
        parent: {
          data: [
            {
              type: 'taxonomy_term--alert_type',
              id: 'virtual',
              meta: {
                links: {
                  help: {
                    href: 'https://www.drupal.org/docs/8/modules/json-api/core-concepts#virtual',
                    meta: {
                      about:
                        'Usage and meaning of the \u0027virtual\u0027 resource identifier.'
                    }
                  }
                }
              }
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/52e80024-4f43-4a8c-8ee5-655d7643fa87/parent'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/52e80024-4f43-4a8c-8ee5-655d7643fa87/relationships/parent'
            }
          }
        }
      }
    },
    {
      type: 'taxonomy_term--alert_type',
      id: '75f69a61-9f3d-44b4-8b81-4a829900d7d9',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/75f69a61-9f3d-44b4-8b81-4a829900d7d9'
        }
      },
      attributes: {
        drupal_internal__tid: 9,
        drupal_internal__revision_id: 9,
        langcode: 'en',
        revision_created: '2022-07-25T09:05:31+00:00',
        revision_log_message: null,
        status: true,
        name: 'Pollution',
        description: null,
        weight: 100,
        changed: '2022-07-25T09:05:31+00:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/alerttype/pollution'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Pollution | Single Digital Presence Content Management System'
            }
          }
        ],
        path: { alias: '/alerttype/pollution', pid: 6, langcode: 'en' }
      },
      relationships: {
        vid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/75f69a61-9f3d-44b4-8b81-4a829900d7d9/relationships/vid'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/75f69a61-9f3d-44b4-8b81-4a829900d7d9/relationships/revision_user'
            }
          }
        },
        parent: {
          data: [
            {
              type: 'taxonomy_term--alert_type',
              id: 'virtual',
              meta: {
                links: {
                  help: {
                    href: 'https://www.drupal.org/docs/8/modules/json-api/core-concepts#virtual',
                    meta: {
                      about:
                        'Usage and meaning of the \u0027virtual\u0027 resource identifier.'
                    }
                  }
                }
              }
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/75f69a61-9f3d-44b4-8b81-4a829900d7d9/parent'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/75f69a61-9f3d-44b4-8b81-4a829900d7d9/relationships/parent'
            }
          }
        }
      }
    },
    {
      type: 'taxonomy_term--alert_type',
      id: '21b06384-78ed-4c0f-b1e5-ad98a9a31c3d',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/21b06384-78ed-4c0f-b1e5-ad98a9a31c3d'
        }
      },
      attributes: {
        drupal_internal__tid: 10,
        drupal_internal__revision_id: 10,
        langcode: 'en',
        revision_created: '2022-07-25T09:05:31+00:00',
        revision_log_message: null,
        status: true,
        name: 'Heat wave',
        description: null,
        weight: 100,
        changed: '2022-07-25T09:05:31+00:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/alerttype/heat-wave'
            }
          },
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Heat wave | Single Digital Presence Content Management System'
            }
          }
        ],
        path: { alias: '/alerttype/heat-wave', pid: 7, langcode: 'en' }
      },
      relationships: {
        vid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/21b06384-78ed-4c0f-b1e5-ad98a9a31c3d/relationships/vid'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/21b06384-78ed-4c0f-b1e5-ad98a9a31c3d/relationships/revision_user'
            }
          }
        },
        parent: {
          data: [
            {
              type: 'taxonomy_term--alert_type',
              id: 'virtual',
              meta: {
                links: {
                  help: {
                    href: 'https://www.drupal.org/docs/8/modules/json-api/core-concepts#virtual',
                    meta: {
                      about:
                        'Usage and meaning of the \u0027virtual\u0027 resource identifier.'
                    }
                  }
                }
              }
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/21b06384-78ed-4c0f-b1e5-ad98a9a31c3d/parent'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/alert_type/21b06384-78ed-4c0f-b1e5-ad98a9a31c3d/relationships/parent'
            }
          }
        }
      }
    }
  ],
  meta: { count: '1' },
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites?filter%5Bdrupal_internal__tid%5D=8970\u0026include=site_alerts%2Csite_alerts.field_alert_type\u0026site=8970'
    }
  }
}
