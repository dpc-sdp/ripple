// Grid columns setting for cards.
const { cardColsSetting } = require('../../lib/config/layout.config.js')

// TODO: This `edgeClasses` is kind of deprecated in design.
// It can make a dynamic landing page component(e.g CTA) grow to edge, but none item is using it now.
// Should be reviewed in Beta and remove if not needed anymore.
// const edgeClasses = {
//   wide: ['rpl-edge--on-all', 'rpl-site-constrain--on-all'],
//   narrow: ['rpl-edge--below-l', 'rpl-site-constrain--below-l']
// }

module.exports = {
  include: {
    landingPage: [
      'field_whats_next',
      'field_graphical_image',
      'field_graphical_image.field_media_image',
      'field_bottom_graphical_image',
      'field_bottom_graphical_image.field_media_image',
      'field_landing_page_hero_logo',
      'field_landing_page_hero_logo.field_media_image',
      'field_landing_page_hero_image',
      'field_landing_page_hero_image.field_media_image',
      'field_landing_page_hero_banner',
      'field_landing_page_c_primary',
      'field_landing_page_c_primary.field_block_image',
      'field_landing_page_c_primary.field_block_image.field_media_image',
      'field_landing_page_c_secondary',
      'field_landing_page_c_secondary.field_block_image',
      'field_landing_page_c_secondary.field_block_image.field_media_image',
      'field_landing_page_c_secondary.field_block_embedded_video',
      'field_landing_page_key_journeys',
      'field_landing_page_contact',
      'field_landing_page_contact.field_paragraph_phones',
      'field_landing_page_contact.field_paragraph_social_media',
      'field_landing_page_header',
      'field_landing_page_component',
      'field_landing_page_component.field_paragraph_media',
      'field_landing_page_component.field_paragraph_media.field_media_image',
      'field_landing_page_component.field_paragraph_topic',
      'field_landing_page_component.field_timeline',
      'field_landing_page_component.field_timeline.field_paragraph_media',
      'field_landing_page_component.field_timeline.field_paragraph_media.field_media_image',
      'field_landing_page_component.field_paragraph_accordion',
      'field_landing_page_component.field_paragraph_keydates',
      'field_landing_page_component.field_paragraph_reference',
      'field_landing_page_component.field_paragraph_reference.field_topic',
      'field_landing_page_component.field_paragraph_reference.field_featured_image',
      'field_landing_page_component.field_paragraph_reference.field_featured_image.field_media_image',
      'field_landing_page_component.field_paragraph_media_gallery',
      'field_landing_page_component.field_paragraph_media_gallery.field_gallery_media',
      'field_landing_page_component.field_paragraph_media_gallery.field_gallery_media.field_media_image',
      'field_landing_page_component.field_paragraph_items',
      'field_landing_page_component.field_paragraph_items.field_paragraph_reference',
      'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_event_details',
      'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_topic',
      'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_featured_image',
      'field_landing_page_component.field_paragraph_items.field_paragraph_reference.field_featured_image.field_media_image',
      'field_landing_page_component.field_paragraph_items.field_paragraph_keydates',
      'field_landing_page_component.field_paragraph_items.field_paragraph_media',
      'field_landing_page_component.field_paragraph_items.field_paragraph_media.field_media_image',
      'field_landing_page_component.field_complex_image_media',
      'field_landing_page_component.field_complex_image_media.field_media_image'
    ]
  },

  mapping: {
    landingPageHeader: {
      'paragraph--introduction_banner': {
        component: 'rpl-intro-banner',
        props: {
          'title': 'field_paragraph_title',
          'introText': 'field_paragraph_summary',
          'links': {
            field: 'field_paragraph_links',
            filters: ['paragraphKeyJourneyLinks']
          },
          'showLinks': {
            value: true
          }
        },
        class: ['rpl-site-constrain--on-all']
      },
      'paragraph--embedded_search_form': {
        component: 'rpl-search-form',
        props: {
          'searchPlaceholder': {
            filters: ['embeddedSearchPlaceholder']
          },
          'type': 'field_paragraph_search_block',
          'searchTarget': 'field_paragraph_search_url',
          'linkTarget': 'field_paragraph_search_target',
          'theme': {
            filters: ['embeddedSearchTheme']
          }
        },
        class: ['rpl-site-constrain--on-all']
      }
    },

    // Mapping for landing page `field_landing_page_component` field paragraphs.
    landingPageComponents: {
      'paragraph--basic_text': {
        component: 'rpl-markup',
        props: {
          'html': ['field_paragraph_body', 'processed']
        }
      },

      'paragraph--accordion': {
        component: 'rpl-accordion',
        props: {
          'title': 'field_paragraph_title',
          'type': ['field_paragraph_accordion_style'],
          'accordions': {
            field: 'field_paragraph_accordion',
            filters: ['accordionContent']
          },
          'single': {
            value: false
          }
        }
      },

      'paragraph--card_navigation': {
        component: 'rpl-card-navigation',
        props: {
          'title': 'field_paragraph_title',
          'summary': ['field_paragraph_summary'],
          'link': {
            field: 'field_paragraph_link',
            filters: ['paragraphLink']
          }
        },
        cols: {
          wide: { l: 6 },
          narrow: {}
        }
      },

      'paragraph--card_navigation_auto': {
        component: 'rpl-card-navigation',
        props: {
          'title': ['field_paragraph_reference', 'title'],
          'summary': {
            field: 'field_paragraph_reference',
            filters: ['autoCardSummary']
          },
          'link': {
            // To send the item itself into filters by not using 'field'.
            filters: ['autoCardLink']
          }
        },
        cols: {
          wide: { l: 6 },
          narrow: {}
        }
      },

      'paragraph--card_navigation_featured': {
        component: 'rpl-card-navigation-featured',
        props: {
          'title': 'field_paragraph_title',
          'summary': ['field_paragraph_summary'],
          'url': [
            ['field_paragraph_link', 'url'],
            ['field_paragraph_link', 'uri']
          ],
          'image': ['field_paragraph_media', 'field_media_image', 'url']
        }
      },

      'paragraph--card_navigation_featured_auto': {
        component: 'rpl-card-navigation-featured',
        props: {
          'title': ['field_paragraph_reference', 'title'],
          'summary': {
            field: 'field_paragraph_reference',
            filters: ['autoCardSummary']
          },
          'url': ['field_paragraph_reference', 'path', 'url'],
          'image': ['field_paragraph_reference', 'field_featured_image', 'field_media_image', 'url']
        }
      },

      'paragraph--card_keydates': {
        component: 'rpl-card-keydates',
        props: {
          'title': {
            value: 'Key calendar dates'
          },
          'keydates': {
            field: 'field_paragraph_keydates',
            filters: ['paragraphKeydates']
          },
          'link': {
            field: 'field_paragraph_cta',
            filters: ['paragraphCta']
          }
        },
        cols: cardColsSetting
      },

      'paragraph--call_to_action': {
        expression: (item) => {
          return item.field_paragraph_cta_style
        },
        components: [
          {
            case: 'banner',
            component: 'rpl-call-to-action',
            props: {
              'title': 'field_paragraph_title',
              'summary': {
                field: 'field_paragraph_body',
                filters: ['formattedTextDecode']
              },
              'link': {
                field: 'field_paragraph_cta',
                filters: ['paragraphCta']
              },
              'image': {
                field: 'field_paragraph_media',
                filters: ['paragraphCtaImage']
              }
            },
            class: {
              wide: ['rpl-call-to-action--without-sidebar'],
              narrow: ['rpl-call-to-action--with-sidebar']
            }
          },

          {
            case: 'card',
            component: 'rpl-card-cta',
            props: {
              'title': 'field_paragraph_title',
              'summary': {
                field: 'field_paragraph_body',
                filters: ['formattedTextDecode']
              },
              'link': {
                field: 'field_paragraph_cta',
                filters: ['paragraphCta']
              },
              'image': ['field_paragraph_media', 'field_media_image', 'url']
            },
            cols: cardColsSetting
          }
        ]
      },

      'paragraph--card_event': {
        component: 'rpl-card-event',
        props: {
          'image': ['field_paragraph_media', 'field_media_image', 'url'],
          'dateStart': ['field_paragraph_date_range', 'value'],
          'dateEnd': ['field_paragraph_date_range', 'end_value'],
          'location': ['field_paragraph_location', 'locality'],
          'title': 'field_paragraph_title',
          'summary': ['field_paragraph_summary'],
          'link': {
            field: 'field_paragraph_cta',
            filters: ['paragraphCta']
          }
        },
        cols: cardColsSetting
      },

      'paragraph--card_promotion': {
        component: 'rpl-card-promotion',
        props: {
          'image': ['field_paragraph_media', 'field_media_image', 'url'],
          'date': 'field_paragraph_date',
          'topic': ['field_paragraph_topic', 0, 'name'],
          'title': 'field_paragraph_title',
          'summary': ['field_paragraph_summary'],
          'link': {
            field: 'field_paragraph_link',
            filters: ['paragraphCta']
          }
        },
        cols: cardColsSetting
      },

      'paragraph--card_promotion_auto': {
        component: 'rpl-card-promotion',
        props: {
          'image': [
            ['field_paragraph_reference', 'field_featured_image', 'field_media_image', 'url'],
            ['field_paragraph_reference', 'field_media_image', 'url']
          ],
          'date': [
            ['field_paragraph_reference', 'field_paragraph_date'],
            // News specific date field.
            ['field_paragraph_reference', 'field_news_date']
          ],
          'topic': {
            filters: ['autoCardTopic']
          },
          'title': ['field_paragraph_reference', 'title'],
          'summary': {
            field: 'field_paragraph_reference',
            filters: ['autoCardSummary']
          },
          'link': {
            // To send the item itself into filters by not using 'field'.
            filters: ['autoCardLink']
          }
        },
        cols: cardColsSetting
      },

      'paragraph--media_gallery': {
        component: 'rpl-image-gallery',
        ssr: false,
        props: {
          'galleryData': {
            field: ['field_paragraph_media_gallery', 'field_gallery_media'],
            filters: ['galleryContent']
          },
          'enlargeText': 'Click to enlarge'
        }
      },

      'paragraph--card_carousel': {
        component: 'rpl-card-carousel',
        ssr: false,
        props: {
          'title': 'field_paragraph_title',
          'cards': {
            filters: ['cardCarousel']
          }
        },
        childCols: cardColsSetting
      },

      'paragraph--timelines': {
        component: 'rpl-timeline',
        ssr: false,
        props: {
          'title': 'field_paragraph_title',
          'list': {
            field: ['field_timeline'],
            filters: ['timelineList']
          }
        }
      },

      'paragraph--user_authentication_block': {
        component: 'tide-login',
        props: {
          'redirect': ['field_next_page', 'url'] // @TODO update fieldname to match contentapi final structure
        }
      },

      'paragraph--complex_image': {
        component: 'rpl-complex-image',
        props: {
          'title': 'field_complex_image_title',
          'source': 'field_complex_image_source',
          'html': ['field_complex_image_data', 'processed'],
          'fullscreen': 'field_complex_image_full_label',
          'download': 'field_complex_image_dl_label',
          'expand': 'field_complex_image_data_label',
          'expandTitle': 'field_complex_image_title',
          'image': {
            field: 'field_complex_image_media',
            filters: ['paragraphCtaImage']
          }
        }
      }

    }
  }
}
