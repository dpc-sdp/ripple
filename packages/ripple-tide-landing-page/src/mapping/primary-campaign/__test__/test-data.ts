export const testData = {
  jsonapi: {
    version: '1.0',
    meta: {
      links: {
        self: {
          href: 'http://jsonapi.org/format/1.0/'
        }
      }
    }
  },
  data: {
    type: 'node--landing_page',
    id: '1e6502ab-523a-4161-9433-1baa149e7f2d',
    links: {
      self: {
        href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1e6502ab-523a-4161-9433-1baa149e7f2d?resourceVersion=id%3A5947'
      }
    },
    attributes: {
      drupal_internal__nid: 2245,
      drupal_internal__vid: 5947,
      langcode: 'en',
      revision_timestamp: '2022-10-31T05:29:52+00:00',
      revision_log: null,
      status: true,
      title: 'Ripple 2 landing page title',
      created: '2022-10-25T16:21:15+11:00',
      changed: '2022-10-31T16:29:52+11:00',
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
            href: 'https://develop.content.reference.sdp.vic.gov.au/ripple-2-landing-page'
          }
        },
        {
          tag: 'meta',
          attributes: {
            name: 'title',
            content:
              'Ripple 2 landing page title | Single Digital Presence Content Management System'
          }
        }
      ],
      path: {
        alias: '/ripple-2-landing-page',
        pid: 10035,
        langcode: 'en',
        url: '/ripple-2-landing-page',
        origin_alias: '/site-8888/ripple-2-landing-page',
        origin_url: '/ripple-2-landing-page'
      },
      field_landing_page_bg_colour: 'white',
      field_landing_page_hero_theme: 'dark',
      field_landing_page_intro_text: "Here's the introduction text",
      field_landing_page_nav_title: 'Site-section Navigation',
      field_landing_page_show_contact: true,
      field_landing_page_summary: 'Ripple 2 landing page summary',
      field_metatags: null,
      field_node_display_headings: 'showH2AndH3',
      field_show_ack_of_country: true,
      field_show_content_rating: true,
      field_show_c_primary_caption: true,
      field_show_hero_image_caption: false,
      field_show_related_content: true,
      field_show_site_section_nav: true,
      field_show_social_sharing: true,
      field_show_table_of_content: true,
      field_show_topic_term_and_tags: true,
      field_show_whats_next: true
    },
    relationships: {
      field_landing_page_c_primary: {
        data: {
          type: 'block_content--campaign',
          id: '11dede11-10c0-111e1-1100-000000000200'
        },
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1e6502ab-523a-4161-9433-1baa149e7f2d/field_landing_page_c_primary?resourceVersion=id%3A5947'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1e6502ab-523a-4161-9433-1baa149e7f2d/relationships/field_landing_page_c_primary?resourceVersion=id%3A5947'
          }
        }
      }
    }
  },
  included: [
    {
      type: 'block_content--campaign',
      id: '11dede11-10c0-111e1-1100-000000000200',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/block_content/campaign/11dede11-10c0-111e1-1100-000000000200'
        }
      },
      attributes: {
        drupal_internal__id: 4,
        drupal_internal__revision_id: 4,
        langcode: 'en',
        revision_created: '2022-10-06T02:35:09+00:00',
        revision_log: null,
        status: true,
        info: 'Demo Campaign block',
        changed: '2022-10-06T02:35:09+00:00',
        reusable: true,
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1e6502ab-523a-4161-9433-1baa149e7f2d'
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
        body: {
          value:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vobis voluptatum perceptarum recordatio vitam beatam facit</p>\n',
          format: 'rich_text',
          processed: '<p>Test processed HTML</p>',
          summary: null
        },
        field_block_cta: {
          uri: 'https://www.vic.gov.au',
          title: 'Find out more',
          options: []
        },
        field_block_title: 'Demo Campaign'
      },
      relationships: {
        block_content_type: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/block_content/campaign/11dede11-10c0-111e1-1100-000000000200/relationships/block_content_type'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/block_content/campaign/11dede11-10c0-111e1-1100-000000000200/relationships/revision_user'
            }
          }
        },
        field_block_image: {
          data: {
            type: 'media--image',
            id: '11dede11-10c0-111e1-1100-000000000123'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/block_content/campaign/11dede11-10c0-111e1-1100-000000000200/field_block_image'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/block_content/campaign/11dede11-10c0-111e1-1100-000000000200/relationships/field_block_image'
            }
          }
        }
      }
    },
    {
      type: 'media--image',
      id: '11dede11-10c0-111e1-1100-000000000123',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123?resourceVersion=id%3A25'
        }
      },
      attributes: {
        drupal_internal__mid: 25,
        drupal_internal__vid: 25,
        langcode: 'en',
        revision_created: '2022-10-06T02:35:09+00:00',
        revision_log_message: null,
        status: true,
        name: 'Demo: Melbourne skyline at dusk',
        created: '2022-10-06T13:35:09+11:00',
        changed: '2022-10-06T13:35:09+11:00',
        default_langcode: true,
        revision_translation_affected: true,
        metatag: [
          {
            tag: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1e6502ab-523a-4161-9433-1baa149e7f2d'
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
        field_media_caption: 'TEST_MEDIA_CAPTION',
        field_media_restricted: true
      },
      relationships: {
        bundle: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/relationships/bundle?resourceVersion=id%3A25'
            }
          }
        },
        revision_user: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/relationships/revision_user?resourceVersion=id%3A25'
            }
          }
        },
        uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/relationships/uid?resourceVersion=id%3A25'
            }
          }
        },
        thumbnail: {
          data: {
            type: 'file--file',
            id: '09781229-5502-4e93-8a45-bb85b8ca2263',
            meta: {
              alt: 'Demo: Melbourne skyline at dusk',
              title: null,
              width: 2560,
              height: 650
            }
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/thumbnail?resourceVersion=id%3A25'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/relationships/thumbnail?resourceVersion=id%3A25'
            }
          }
        },
        field_license_type: {
          data: {
            type: 'taxonomy_term--license_type',
            id: '11dede11-10c0-111e1-1100-000000000030'
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/field_license_type?resourceVersion=id%3A25'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/relationships/field_license_type?resourceVersion=id%3A25'
            }
          }
        },
        field_media_audience: {
          data: null,
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/field_media_audience?resourceVersion=id%3A25'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/relationships/field_media_audience?resourceVersion=id%3A25'
            }
          }
        },
        field_media_department: {
          data: null,
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/field_media_department?resourceVersion=id%3A25'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/relationships/field_media_department?resourceVersion=id%3A25'
            }
          }
        },
        field_media_image: {
          data: {
            type: 'file--file',
            id: '09781229-5502-4e93-8a45-bb85b8ca2263',
            meta: {
              alt: 'Demo: Melbourne skyline at dusk',
              title: 'Demo: Melbourne skyline at dusk',
              width: 2560,
              height: 650
            }
          },
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/field_media_image?resourceVersion=id%3A25'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/relationships/field_media_image?resourceVersion=id%3A25'
            }
          }
        },
        field_media_site: {
          data: [
            {
              type: 'taxonomy_term--sites',
              id: '11dede11-10c0-111e1-1100-000000000040'
            },
            {
              type: 'taxonomy_term--sites',
              id: '11dede11-10c0-111e1-1100-000000000045'
            }
          ],
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/field_media_site?resourceVersion=id%3A25'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/relationships/field_media_site?resourceVersion=id%3A25'
            }
          }
        },
        field_media_topic: {
          data: null,
          links: {
            related: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/field_media_topic?resourceVersion=id%3A25'
            },
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/media/image/11dede11-10c0-111e1-1100-000000000123/relationships/field_media_topic?resourceVersion=id%3A25'
            }
          }
        }
      }
    },
    {
      type: 'file--file',
      id: '09781229-5502-4e93-8a45-bb85b8ca2263',
      links: {
        self: {
          href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/file/file/09781229-5502-4e93-8a45-bb85b8ca2263'
        }
      },
      attributes: {
        drupal_internal__fid: 43,
        langcode: 'en',
        filename: 'Melbourne-skyline-at-dusk.jpg',
        uri: {
          value: 'public://tide_demo_content/Melbourne-skyline-at-dusk.jpg',
          url: '/sites/default/files/tide_demo_content/Melbourne-skyline-at-dusk.jpg'
        },
        filemime: 'image/jpeg',
        filesize: 169663,
        status: true,
        created: '2022-10-06T02:35:09+00:00',
        changed: '2022-10-06T02:35:09+00:00',
        url: 'https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-skyline-at-dusk.jpg'
      },
      relationships: {
        uid: {
          data: null,
          links: {
            self: {
              href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/file/file/09781229-5502-4e93-8a45-bb85b8ca2263/relationships/uid'
            }
          }
        }
      }
    }
  ],
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1e6502ab-523a-4161-9433-1baa149e7f2d?include=field_landing_page_c_primary.field_block_image.field_media_image&site=8888'
    }
  }
}

export const testDataNull = {
  jsonapi: {
    version: '1.0',
    meta: {
      links: {
        self: {
          href: 'http://jsonapi.org/format/1.0/'
        }
      }
    }
  },
  data: {
    type: 'node--landing_page',
    id: '1e6502ab-523a-4161-9433-1baa149e7f2d',
    links: {
      self: {
        href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1e6502ab-523a-4161-9433-1baa149e7f2d?resourceVersion=id%3A5947'
      }
    },
    attributes: {
      drupal_internal__nid: 2245,
      drupal_internal__vid: 5947,
      langcode: 'en',
      revision_timestamp: '2022-10-31T05:29:52+00:00',
      revision_log: null,
      status: true,
      title: 'Ripple 2 landing page title',
      created: '2022-10-25T16:21:15+11:00',
      changed: '2022-10-31T16:29:52+11:00',
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
            href: 'https://develop.content.reference.sdp.vic.gov.au/ripple-2-landing-page'
          }
        },
        {
          tag: 'meta',
          attributes: {
            name: 'title',
            content:
              'Ripple 2 landing page title | Single Digital Presence Content Management System'
          }
        }
      ],
      path: {
        alias: '/ripple-2-landing-page',
        pid: 10035,
        langcode: 'en',
        url: '/ripple-2-landing-page',
        origin_alias: '/site-8888/ripple-2-landing-page',
        origin_url: '/ripple-2-landing-page'
      },
      field_landing_page_bg_colour: 'white',
      field_landing_page_hero_theme: 'dark',
      field_landing_page_intro_text: "Here's the introduction text",
      field_landing_page_nav_title: 'Site-section Navigation',
      field_landing_page_show_contact: true,
      field_landing_page_summary: 'Ripple 2 landing page summary',
      field_metatags: null,
      field_node_display_headings: 'showH2AndH3',
      field_show_ack_of_country: true,
      field_show_content_rating: true,
      field_show_c_primary_caption: true,
      field_show_hero_image_caption: false,
      field_show_related_content: true,
      field_show_site_section_nav: true,
      field_show_social_sharing: true,
      field_show_table_of_content: true,
      field_show_topic_term_and_tags: true,
      field_show_whats_next: true
    },
    relationships: {
      field_landing_page_c_primary: {
        data: null,
        links: {
          related: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1e6502ab-523a-4161-9433-1baa149e7f2d/field_landing_page_c_primary?resourceVersion=id%3A5947'
          },
          self: {
            href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1e6502ab-523a-4161-9433-1baa149e7f2d/relationships/field_landing_page_c_primary?resourceVersion=id%3A5947'
          }
        }
      }
    }
  },
  included: [],
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/node/landing_page/1e6502ab-523a-4161-9433-1baa149e7f2d?include=field_landing_page_c_primary.field_block_image.field_media_image&site=8888'
    }
  }
}
