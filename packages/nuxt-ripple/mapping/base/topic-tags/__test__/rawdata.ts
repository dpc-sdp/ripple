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
    id: '54e48008-bfe2-4770-9be9-8fa44f6fb1af',
    links: {
      self: {
        href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af?resourceVersion=id%3A574'
      }
    },
    attributes: {
      drupal_internal__nid: 464,
      drupal_internal__vid: 574,
      langcode: 'en',
      revision_timestamp: '2024-11-18T06:09:06+00:00',
      revision_log: null,
      status: true,
      title: 'Topic and tags',
      created: '2024-11-18T16:44:58+11:00',
      changed: '2024-11-18T17:09:06+11:00',
      promote: true,
      sticky: false,
      default_langcode: true,
      revision_translation_affected: true,
      moderation_state: 'published',
      metatag: [
        {
          tag: 'meta',
          attributes: {
            name: 'title',
            content:
              'Topic and tags | Single Digital Presence Content Management System'
          }
        },
        {
          tag: 'link',
          attributes: {
            rel: 'canonical',
            href: 'https://develop.content.reference.sdp.vic.gov.au/test-tt'
          }
        },
        { tag: 'meta', attributes: { property: 'og:locale', content: 'en-AU' } }
      ],
      path: {
        alias: '/test-tt',
        pid: 3286,
        langcode: 'en',
        url: '/test-tt',
        origin_alias: '/site-8888/test-tt',
        origin_url: '/test-tt'
      },
      field_landing_page_bg_colour: 'white',
      field_landing_page_hero_theme: null,
      field_landing_page_intro_text: null,
      field_landing_page_nav_title: 'Site-section Navigation',
      field_landing_page_show_contact: false,
      field_landing_page_summary: '..',
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
      field_show_whats_next: false
    },
    relationships: {
      node_type: {
        data: {
          type: 'node_type--node_type',
          id: '1f020dbf-3dd1-4f0f-8d83-0dbfb20d017d',
          meta: { drupal_internal__target_id: 'landing_page' }
        },
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/node_type?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/node_type?resourceVersion=id%3A574'
          }
        }
      },
      revision_uid: {
        data: null,
        links: {
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/revision_uid?resourceVersion=id%3A574'
          }
        }
      },
      uid: {
        data: null,
        links: {
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/uid?resourceVersion=id%3A574'
          }
        }
      },
      field_bottom_graphical_image: {
        data: null,
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_bottom_graphical_image?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_bottom_graphical_image?resourceVersion=id%3A574'
          }
        }
      },
      field_content_category: {
        data: [
          {
            type: 'taxonomy_term--content_category',
            id: '0a99de42-2a84-4a9d-90a5-a82dd0a20f7a',
            meta: { drupal_internal__target_id: 9147 }
          }
        ],
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_content_category?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_content_category?resourceVersion=id%3A574'
          }
        }
      },
      field_featured_image: {
        data: null,
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_featured_image?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_featured_image?resourceVersion=id%3A574'
          }
        }
      },
      field_graphical_image: {
        data: null,
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_graphical_image?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_graphical_image?resourceVersion=id%3A574'
          }
        }
      },
      field_landing_page_component: {
        data: [],
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_landing_page_component?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_landing_page_component?resourceVersion=id%3A574'
          }
        }
      },
      field_landing_page_contact: {
        data: [],
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_landing_page_contact?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_landing_page_contact?resourceVersion=id%3A574'
          }
        }
      },
      field_landing_page_c_primary: {
        data: null,
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_landing_page_c_primary?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_landing_page_c_primary?resourceVersion=id%3A574'
          }
        }
      },
      field_landing_page_c_secondary: {
        data: null,
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_landing_page_c_secondary?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_landing_page_c_secondary?resourceVersion=id%3A574'
          }
        }
      },
      field_landing_page_header: {
        data: [],
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_landing_page_header?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_landing_page_header?resourceVersion=id%3A574'
          }
        }
      },
      field_landing_page_hero_banner: {
        data: null,
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_landing_page_hero_banner?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_landing_page_hero_banner?resourceVersion=id%3A574'
          }
        }
      },
      field_landing_page_hero_image: {
        data: null,
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_landing_page_hero_image?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_landing_page_hero_image?resourceVersion=id%3A574'
          }
        }
      },
      field_landing_page_hero_logo: {
        data: null,
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_landing_page_hero_logo?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_landing_page_hero_logo?resourceVersion=id%3A574'
          }
        }
      },
      field_landing_page_key_journeys: {
        data: null,
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_landing_page_key_journeys?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_landing_page_key_journeys?resourceVersion=id%3A574'
          }
        }
      },
      field_node_primary_site: {
        data: {
          type: 'taxonomy_term--sites',
          id: '11dede11-10c0-111e1-1100-000000000040',
          meta: { drupal_internal__target_id: 8888 }
        },
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_node_primary_site?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_node_primary_site?resourceVersion=id%3A574'
          }
        }
      },
      field_node_site: {
        data: [
          {
            type: 'taxonomy_term--sites',
            id: '11dede11-10c0-111e1-1100-000000000040',
            meta: { drupal_internal__target_id: 8888 }
          }
        ],
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_node_site?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_node_site?resourceVersion=id%3A574'
          }
        }
      },
      field_related_links: {
        data: [],
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_related_links?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_related_links?resourceVersion=id%3A574'
          }
        }
      },
      field_tags: {
        data: [
          {
            type: 'taxonomy_term--tags',
            id: '11dede11-10c0-111e1-1101-000000000010',
            meta: { drupal_internal__target_id: 9180 }
          },
          {
            type: 'taxonomy_term--tags',
            id: '11dede11-10c0-111e1-1101-000000000011',
            meta: { drupal_internal__target_id: 9181 }
          }
        ],
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_tags?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_tags?resourceVersion=id%3A574'
          }
        }
      },
      field_topic: {
        data: {
          type: 'taxonomy_term--topic',
          id: '11dede11-10c0-111e1-1102-000000000020',
          meta: { drupal_internal__target_id: 9192 }
        },
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_topic?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_topic?resourceVersion=id%3A574'
          }
        }
      },
      field_whats_next: {
        data: [],
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/field_whats_next?resourceVersion=id%3A574'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af/relationships/field_whats_next?resourceVersion=id%3A574'
          }
        }
      }
    }
  },
  included: [
    {
      type: 'taxonomy_term--sites',
      id: '11dede11-10c0-111e1-1100-000000000040',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040?resourceVersion=id%3A342'
        }
      },
      attributes: {
        drupal_internal__tid: 8888,
        drupal_internal__revision_id: 342,
        revision_created: '2024-11-17T11:17:39+00:00',
        revision_log_message: null,
        status: true,
        name: 'Demo Site',
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Demo Site | Single Digital Presence Content Management System'
            }
          },
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/sites/demo-site'
            }
          },
          {
            tag: 'meta',
            attributes: { property: 'og:locale', content: 'en-AU' }
          }
        ],
        field_acknowledgement_to_country:
          'The Victorian Government acknowledges Aboriginal and Torres Strait Islander people as the Traditional Custodians of the land and acknowledges and pays respect to their Elders, past and present.',
        field_additional_comment: {
          value:
            '\u003Cp\u003E\u003Cspan\u003EIf you need a response, please use our \u003C/span\u003E\u003Ca class=\u0022rpl-text-link rpl-u-focusable-inline\u0022 href=\u0022https://www.vic.gov.au/contact-us\u0022\u003Econtact us form\u003C/a\u003E\u003Cspan\u003E.\u003C/span\u003E\u003C/p\u003E',
          format: 'rich_text',
          processed:
            '\u003Cp\u003E\u003Cspan\u003EIf you need a response, please use our \u003C/span\u003E\u003Ca class=\u0022rpl-text-link rpl-u-focusable-inline\u0022 href=\u0022https://www.vic.gov.au/contact-us\u0022\u003Econtact us form\u003C/a\u003E\u003Cspan\u003E.\u003C/span\u003E\u003C/p\u003E'
        },
        field_prominence_ack_to_country: null,
        field_show_table_of_contents: true,
        field_site_domains: 'www.demo.vic.gov.au',
        field_site_feature_flags: [],
        field_site_footer_text: null,
        field_site_show_exit_site: false,
        field_site_slogan: null,
        field_site_social_links: [],
        field_site_theme_values: [],
        field_title_of_table_of_contents: 'Jump to'
      },
      relationships: {
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/relationships/revision_user?resourceVersion=id%3A342'
            }
          }
        },
        field_bottom_corner_graphic: {
          data: null,
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/field_bottom_corner_graphic?resourceVersion=id%3A342'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/relationships/field_bottom_corner_graphic?resourceVersion=id%3A342'
            }
          }
        },
        field_print_friendly_logo: {
          data: null,
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/field_print_friendly_logo?resourceVersion=id%3A342'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/relationships/field_print_friendly_logo?resourceVersion=id%3A342'
            }
          }
        },
        field_site_favicon: {
          data: null,
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/field_site_favicon?resourceVersion=id%3A342'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/relationships/field_site_favicon?resourceVersion=id%3A342'
            }
          }
        },
        field_site_footer_logos: {
          data: [],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/field_site_footer_logos?resourceVersion=id%3A342'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/relationships/field_site_footer_logos?resourceVersion=id%3A342'
            }
          }
        },
        field_site_footer_menu: {
          data: {
            type: 'menu--menu',
            id: '78fd1a92-e20e-4639-9396-a1b7ed73b8d4',
            meta: { drupal_internal__target_id: 'footer-tide-demo' }
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/field_site_footer_menu?resourceVersion=id%3A342'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/relationships/field_site_footer_menu?resourceVersion=id%3A342'
            }
          }
        },
        field_site_homepage: {
          data: {
            type: 'node--landing_page',
            id: '11dede11-10c0-111e1-1100-000000000330',
            meta: { drupal_internal__target_id: 184 }
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/field_site_homepage?resourceVersion=id%3A342'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/relationships/field_site_homepage?resourceVersion=id%3A342'
            }
          }
        },
        field_site_logo: {
          data: null,
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/field_site_logo?resourceVersion=id%3A342'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/relationships/field_site_logo?resourceVersion=id%3A342'
            }
          }
        },
        field_site_main_menu: {
          data: {
            type: 'menu--menu',
            id: '565a73f0-60ca-4340-9f21-2dee79179270',
            meta: { drupal_internal__target_id: 'main-tide-demo' }
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/field_site_main_menu?resourceVersion=id%3A342'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/relationships/field_site_main_menu?resourceVersion=id%3A342'
            }
          }
        },
        field_site_og_image: {
          data: null,
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/field_site_og_image?resourceVersion=id%3A342'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/relationships/field_site_og_image?resourceVersion=id%3A342'
            }
          }
        },
        field_site_twitter_image: {
          data: null,
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/field_site_twitter_image?resourceVersion=id%3A342'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/relationships/field_site_twitter_image?resourceVersion=id%3A342'
            }
          }
        },
        field_top_corner_graphic: {
          data: null,
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/field_top_corner_graphic?resourceVersion=id%3A342'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/relationships/field_top_corner_graphic?resourceVersion=id%3A342'
            }
          }
        },
        site_alerts: {
          data: [
            {
              type: 'node--alert',
              id: '11dede11-10c0-111e1-1100-000000000350',
              meta: { drupal_internal__target_id: 201 }
            },
            {
              type: 'node--alert',
              id: '08aaff50-d5d3-4d05-8932-0e1d723a218e',
              meta: { drupal_internal__target_id: 199 }
            },
            {
              type: 'node--alert',
              id: '587d6ee7-8bbf-4f6a-954d-a4e63a530159',
              meta: { drupal_internal__target_id: 200 }
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/site_alerts?resourceVersion=id%3A342'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/sites/11dede11-10c0-111e1-1100-000000000040/relationships/site_alerts?resourceVersion=id%3A342'
            }
          }
        }
      }
    },
    {
      type: 'menu--menu',
      id: '565a73f0-60ca-4340-9f21-2dee79179270',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/menu/menu/565a73f0-60ca-4340-9f21-2dee79179270'
        }
      },
      attributes: {
        langcode: 'en',
        status: true,
        dependencies: [],
        drupal_internal__id: 'main-tide-demo',
        label: 'Main menu - demo.vic.gov.au',
        description: 'Demo main menu',
        locked: false
      }
    },
    {
      type: 'taxonomy_term--tags',
      id: '11dede11-10c0-111e1-1101-000000000010',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/tags/11dede11-10c0-111e1-1101-000000000010?resourceVersion=id%3A319'
        }
      },
      attributes: {
        drupal_internal__tid: 9180,
        drupal_internal__revision_id: 319,
        langcode: 'en',
        revision_created: '2024-11-17T11:17:39+00:00',
        revision_log_message: null,
        status: true,
        name: 'Demo Tag',
        description: null,
        weight: 0,
        changed: '2024-11-17T11:17:39+00:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Demo Tag | Single Digital Presence Content Management System'
            }
          },
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/tags/demo-tag'
            }
          },
          {
            tag: 'meta',
            attributes: { property: 'og:locale', content: 'en-AU' }
          }
        ],
        path: { alias: '/tags/demo-tag', pid: 1000, langcode: 'en' }
      },
      relationships: {
        vid: {
          data: {
            type: 'taxonomy_vocabulary--taxonomy_vocabulary',
            id: '41649943-5bfa-4c01-a10a-683e2bc83ded',
            meta: { drupal_internal__target_id: 'tags' }
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/tags/11dede11-10c0-111e1-1101-000000000010/vid?resourceVersion=id%3A319'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/tags/11dede11-10c0-111e1-1101-000000000010/relationships/vid?resourceVersion=id%3A319'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/tags/11dede11-10c0-111e1-1101-000000000010/relationships/revision_user?resourceVersion=id%3A319'
            }
          }
        },
        parent: {
          data: [
            {
              type: 'taxonomy_term--tags',
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
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/tags/11dede11-10c0-111e1-1101-000000000010/parent?resourceVersion=id%3A319'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/tags/11dede11-10c0-111e1-1101-000000000010/relationships/parent?resourceVersion=id%3A319'
            }
          }
        }
      }
    },
    {
      type: 'taxonomy_term--tags',
      id: '11dede11-10c0-111e1-1101-000000000011',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/tags/11dede11-10c0-111e1-1101-000000000011?resourceVersion=id%3A320'
        }
      },
      attributes: {
        drupal_internal__tid: 9181,
        drupal_internal__revision_id: 320,
        langcode: 'en',
        revision_created: '2024-11-17T11:17:39+00:00',
        revision_log_message: null,
        status: true,
        name: 'Another Demo Tag',
        description: null,
        weight: 0,
        changed: '2024-11-17T11:17:39+00:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Another Demo Tag | Single Digital Presence Content Management System'
            }
          },
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/tags/another-demo-tag'
            }
          },
          {
            tag: 'meta',
            attributes: { property: 'og:locale', content: 'en-AU' }
          }
        ],
        path: { alias: '/tags/another-demo-tag', pid: 1001, langcode: 'en' }
      },
      relationships: {
        vid: {
          data: {
            type: 'taxonomy_vocabulary--taxonomy_vocabulary',
            id: '41649943-5bfa-4c01-a10a-683e2bc83ded',
            meta: { drupal_internal__target_id: 'tags' }
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/tags/11dede11-10c0-111e1-1101-000000000011/vid?resourceVersion=id%3A320'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/tags/11dede11-10c0-111e1-1101-000000000011/relationships/vid?resourceVersion=id%3A320'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/tags/11dede11-10c0-111e1-1101-000000000011/relationships/revision_user?resourceVersion=id%3A320'
            }
          }
        },
        parent: {
          data: [
            {
              type: 'taxonomy_term--tags',
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
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/tags/11dede11-10c0-111e1-1101-000000000011/parent?resourceVersion=id%3A320'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/tags/11dede11-10c0-111e1-1101-000000000011/relationships/parent?resourceVersion=id%3A320'
            }
          }
        }
      }
    },
    {
      type: 'taxonomy_term--topic',
      id: '11dede11-10c0-111e1-1102-000000000020',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/topic/11dede11-10c0-111e1-1102-000000000020?resourceVersion=id%3A331'
        }
      },
      attributes: {
        drupal_internal__tid: 9192,
        drupal_internal__revision_id: 331,
        langcode: 'en',
        revision_created: '2024-11-17T11:17:39+00:00',
        revision_log_message: null,
        status: true,
        name: 'Demo Topic',
        description: null,
        weight: 0,
        changed: '2024-11-17T11:17:39+00:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'meta',
            attributes: {
              name: 'title',
              content:
                'Demo Topic | Single Digital Presence Content Management System'
            }
          },
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/topic/demo-topic'
            }
          },
          {
            tag: 'meta',
            attributes: { property: 'og:locale', content: 'en-AU' }
          }
        ],
        path: { alias: '/topic/demo-topic', pid: 1012, langcode: 'en' }
      },
      relationships: {
        vid: {
          data: {
            type: 'taxonomy_vocabulary--taxonomy_vocabulary',
            id: '4b949eaa-401e-48a0-802f-da2496743e6d',
            meta: { drupal_internal__target_id: 'topic' }
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/topic/11dede11-10c0-111e1-1102-000000000020/vid?resourceVersion=id%3A331'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/topic/11dede11-10c0-111e1-1102-000000000020/relationships/vid?resourceVersion=id%3A331'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/topic/11dede11-10c0-111e1-1102-000000000020/relationships/revision_user?resourceVersion=id%3A331'
            }
          }
        },
        parent: {
          data: [
            {
              type: 'taxonomy_term--topic',
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
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/topic/11dede11-10c0-111e1-1102-000000000020/parent?resourceVersion=id%3A331'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/taxonomy_term/topic/11dede11-10c0-111e1-1102-000000000020/relationships/parent?resourceVersion=id%3A331'
            }
          }
        }
      }
    }
  ],
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/54e48008-bfe2-4770-9be9-8fa44f6fb1af?include=field_node_site%2Cfield_tags%2Cfield_topic%2Cfield_landing_page_contact%2Cfield_landing_page_contact.field_paragraph_phones%2Cfield_landing_page_contact.field_paragraph_social_media%2Cfield_related_links%2Cfield_whats_next%2Cfield_node_site.field_site_main_menu%2Cfield_landing_page_hero_banner%2Cfield_landing_page_key_journeys%2Cfield_landing_page_hero_logo.field_media_image%2Cfield_landing_page_hero_image.field_media_image%2Cfield_graphical_image.field_media_image%2Cfield_bottom_graphical_image.field_media_image%2Cfield_landing_page_c_primary.field_block_image.field_media_image%2Cfield_landing_page_c_secondary.field_block_image.field_media_image%2Cfield_landing_page_header%2Cfield_landing_page_component.field_paragraph_media.field_media_image%2Cfield_landing_page_component.field_paragraph_topic%2Cfield_landing_page_component.field_paragraph_items.field_paragraph_reference.field_event_details%2Cfield_landing_page_component.field_paragraph_items.field_paragraph_reference.field_topic%2Cfield_landing_page_component.field_paragraph_items.field_paragraph_reference.field_featured_image.field_media_image%2Cfield_landing_page_component.field_paragraph_items.field_paragraph_keydates%2Cfield_landing_page_component.field_paragraph_items.field_paragraph_media.field_media_image%2Cfield_landing_page_component.field_paragraph_accordion%2Cfield_landing_page_component.field_reusable_paragraph.paragraphs.field_paragraph_accordion%2Cfield_landing_page_component.field_paragraph_keydates%2Cfield_landing_page_component.field_statistic_block%2Cfield_landing_page_component.field_reusable_paragraph.paragraphs.field_statistic_block%2Cfield_landing_page_component.field_timeline.field_paragraph_media.field_media_image%2Cfield_landing_page_component.field_reusable_paragraph.paragraphs.field_timeline.field_paragraph_media.field_media_image%2Cfield_landing_page_component.field_paragraph_media_gallery.field_gallery_media.field_media_image%2Cfield_landing_page_component.field_paragraph_media_gallery.field_gallery_media.field_media_image%2Cfield_landing_page_component.field_paragraph_items.field_paragraph_reference.field_event_details%2Cfield_landing_page_component.field_paragraph_items.field_paragraph_reference.field_topic%2Cfield_landing_page_component.field_paragraph_items.field_paragraph_reference.field_featured_image.field_media_image%2Cfield_landing_page_component.field_paragraph_items.field_paragraph_keydates%2Cfield_landing_page_component.field_paragraph_items.field_paragraph_media.field_media_image%2Cfield_landing_page_component.field_reusable_paragraph.paragraphs.field_paragraph_media_gallery.field_gallery_media.field_media_image%2Cfield_landing_page_component.field_reusable_paragraph.paragraphs.field_paragraph_items.field_paragraph_reference.field_event_details%2Cfield_landing_page_component.field_reusable_paragraph.paragraphs.field_paragraph_items.field_paragraph_reference.field_topic%2Cfield_landing_page_component.field_reusable_paragraph.paragraphs.field_paragraph_items.field_paragraph_reference.field_featured_image.field_media_image%2Cfield_landing_page_component.field_reusable_paragraph.paragraphs.field_paragraph_items.field_paragraph_keydates%2Cfield_landing_page_component.field_reusable_paragraph.paragraphs.field_paragraph_items.field_paragraph_media.field_media_image%2Cfield_landing_page_component.field_paragraph_webform%2Cfield_landing_page_component.field_complex_image_media.field_media_image%2Cfield_landing_page_component.field_reusable_paragraph.paragraphs.field_complex_image_media.field_media_image%2Cfield_landing_page_component.field_compact_card%2Cfield_landing_page_component.field_compact_card.field_paragraph_media.field_media_image\u0026site=8888'
    }
  }
}
