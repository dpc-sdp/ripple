import {
  getImageFromField,
  getBody,
  getField,
  getBodyFromField,
  getMediaPath,
  getLinkFromField,
  getSiteKeyValues,
  getPlainText,
  TideSiteApi
} from '@dpc-sdp/ripple-tide-api'
import {
  map as siteAlertsMapping,
  includes as siteAlertsIncludes
} from './alerts/site-alerts-mapping.js'
import processSiteSocialLinks from '../utils/processSiteSocialLinks.js'
import sanitizeHtml from 'sanitize-html'

export default {
  mapping: {
    name: 'name',
    shortName: 'field_short_name',
    _src: (src: any) =>
      process.env.NODE_ENV === 'development' ? src : undefined,
    siteAlerts: siteAlertsMapping,
    slogan: (src) =>
      sanitizeHtml(getBodyFromField(src, 'field_site_slogan', ''), {
        allowedTags: [],
        allowedAttributes: {}
      }),
    favicon: (src) => getImageFromField(src, 'field_site_favicon'),
    appIcon: (src) => getImageFromField(src, 'field_site_app_icon'),
    siteLogo: (src) => {
      if (src.field_site_logo) {
        return {
          href: '/',
          src: getMediaPath(src, 'field_site_logo'),
          altText: src.field_site_logo.meta?.alt || src.field_site_name,
          printSrc: getMediaPath(src, 'field_print_friendly_logo')
        }
      }

      return null
    },
    homePageId: (src: any) => getField(src, 'field_site_homepage.id'),
    showQuickExit: 'field_site_show_exit_site',
    acknowledgementHeader: (src: any) => {
      if (src.field_prominence_ack_to_country) {
        return src.field_prominence_ack_to_country
      }

      return src.field_acknowledgement_to_country
    },
    cornerGraphic: {
      top: (src: any) => getImageFromField(src, 'field_top_corner_graphic'),
      bottom: (src: any) =>
        getImageFromField(src, 'field_bottom_corner_graphic')
    },
    contentRatingText: (src: any) => {
      return src.hasOwnProperty('field_additional_comment')
        ? getBodyFromField(src, 'field_additional_comment')
        : '<p>If you need a response, please use our <a href="/contact-us" class="rpl-text-link rpl-u-focusable-inline">contact us form</a>.</p>'
    },
    acknowledgementFooter: (src: any) => {
      return getPlainText(src?.field_acknowledgement_to_country)
    },
    copyrightHtml: (src: any) => {
      return getBody(src.field_site_footer_text?.processed)
    },
    footerLogos: (src: any) => {
      return src.field_site_footer_logos.map((logo) => {
        const link = getLinkFromField(logo, 'field_paragraph_cta')
        const image =
          getImageFromField(logo, 'field_paragraph_media.field_media_image') ||
          getImageFromField(logo, 'field_feature_image')

        return {
          alt: link?.text,
          url: link?.url,
          src: image?.src
        }
      })
    },
    theme: (src: any) => getSiteKeyValues('field_site_theme_values', src) || {},
    featureFlags: (src: any) =>
      getSiteKeyValues('field_site_feature_flags', src) || {},
    socialImages: (src: any) => {
      const socialImages = {
        twitter: {},
        og: {}
      }
      if (
        src.field_site_og_image &&
        src.field_site_og_image.hasOwnProperty('field_media_image')
      ) {
        socialImages.og =
          getImageFromField(src, [
            'field_site_og_image',
            'field_media_image'
          ]) || {}
      }
      if (
        src.field_site_twitter_image &&
        src.field_site_twitter_image.hasOwnProperty('field_media_image')
      ) {
        socialImages.twitter =
          getImageFromField(src, [
            'field_site_twitter_image',
            'field_media_image'
          ]) || {}
      }
      return socialImages
    },
    menus: {
      menuMain: async (src: any, tideSiteApi: TideSiteApi) => {
        return await tideSiteApi.getSiteMenu(
          tideSiteApi.site,
          src.field_site_main_menu
        )
      },
      menuFooter: async (src: any, tideSiteApi: TideSiteApi) => {
        return await tideSiteApi.getSiteMenu(
          tideSiteApi.site,
          src.field_site_footer_menu
        )
      }
    },
    socialLinks: (src: any) => {
      return processSiteSocialLinks(src.field_site_social_links || [])
    },
    sitemap: {
      showTableOfContents: 'field_show_table_of_contents',
      tableOfContentsTitle: 'field_title_of_table_of_contents'
    }
  },
  includes: [
    ...siteAlertsIncludes,
    'field_site_favicon',
    'field_site_app_icon',
    'field_site_og_image',
    'field_site_og_image.field_media_image',
    'field_site_twitter_image',
    'field_site_twitter_image.field_media_image',
    'field_site_main_menu',
    'field_site_footer_menu',
    'field_site_logo',
    'field_print_friendly_logo',
    'field_top_corner_graphic',
    'field_bottom_corner_graphic',
    'field_site_footer_logos',
    'field_site_footer_logos.field_paragraph_media.field_media_image',
    'field_site_footer_logos.field_feature_image'
  ]
}
