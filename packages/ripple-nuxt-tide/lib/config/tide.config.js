const tideConfig = {
  // `internal` config is for SDP internal use only, not able to be extended.
  internal: {
    sdpPageBase: [
      'field_node_site.field_site_main_menu',
      'field_node_site.field_site_og_image.field_media_image',
      'field_featured_image.field_media_image',
      'field_node_site.field_site_twitter_image.field_media_image',
      'field_tags',
      'field_topic',
      'field_related_links'
    ],
    // SDP content types share the same base fields in `sdpPageBase`.
    sdpPageTypes: [
      'page',
      'landingPage',
      'publication',
      'profile',
      'grant',
      'news',
      'event'
    ]
  },

  // Tide API query relationship fields.
  include: {},

  mapping: {
    // Mapping config for individual Tide fields.
    tideField: {
      'heroBanner': {
        component: 'rpl-hero-banner',
        props: {
          title: 'pageTitle',
          introText: 'introText',
          linkHeading: ['keyJourneys', 'field_paragraph_title'],
          links: {
            field: ['keyJourneys', 'field_paragraph_links'],
            filters: ['paragraphKeyJourneyLinks']
          },
          moreLink: {
            field: ['keyJourneys', 'field_paragraph_cta'],
            filters: ['paragraphCta']
          },
          theme: 'theme',
          showLinks: 'showLinks',
          logo: 'logo',
          backgroundGraphic: 'backgroundGraphic'
        }
      },

      'paragraph--hero_banner_with_cta': {
        component: 'rpl-hero-banner-cta',
        props: {
          title: 'pageTitle',
          introText: 'introText',
          theme: 'theme',
          ctaText: 'field_paragraph_freetext',
          linkPrimary: {
            field: 'field_paragraph_cta',
            filters: ['paragraphCta']
          },
          linkSecondary: {
            field: 'field_paragraph_link_text',
            filters: ['paragraphCta']
          }
        }
      },

      'block_content--campaign': {
        component: 'rpl-campaign-primary',
        props: {
          title: 'field_block_title',
          summary: ['body', 'processed'],
          link: {
            field: 'field_block_cta',
            filters: ['paragraphCta']
          },
          image: {
            field: ['field_block_image', 'field_media_image'],
            filters: ['fieldMediaImage']
          },
          caption: {
            filters: ['campaignCaption']
          }
        }
      },

      'block_content--campaign--field_landing_page_c_secondary': {
        component: 'rpl-campaign-secondary',
        props: {
          title: 'field_block_title',
          summary: ['body', 'processed'],
          link: {
            field: 'field_block_cta',
            filters: ['paragraphCta']
          },
          'image': {
            field: ['field_block_image', 'field_media_image'],
            filters: ['cardImage']
          }
        }
      },

      'block_content--campaign_with_video--field_landing_page_c_secondary': {
        component: 'rpl-campaign-secondary',
        props: {
          title: 'field_block_title',
          summary: ['body', 'processed'],
          link: {
            field: 'field_block_cta',
            filters: ['paragraphCta']
          },
          'image': {
            field: ['field_block_image', 'field_media_image'],
            filters: ['cardImage']
          },
          video: {
            field: 'field_block_embedded_video',
            filters: ['embeddedVideo']
          }
        }
      },

      'paragraph--contact_us': {
        component: 'rpl-contact',
        props: {
          title: 'field_paragraph_title',
          name: 'field_paragraph_name',
          department: 'field_paragraph_department_name',
          postal: {
            field: ['field_paragraph_postal_address'],
            filters: ['paragraphLocation']
          },
          address: {
            field: ['field_paragraph_location'],
            filters: ['paragraphLocation']
          },
          phone: {
            field: ['field_paragraph_phones'],
            filters: ['paragraphPhones']
          },
          email: 'field_paragraph_email',
          social: {
            field: ['field_paragraph_social_media'],
            filters: ['paragraphSocial']
          }
        }
      }
    }
  }
}

export default tideConfig
