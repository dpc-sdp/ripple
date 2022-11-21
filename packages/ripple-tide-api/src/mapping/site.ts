import {
  getImageFromField,
  getBody,
  getLinkFromField
} from './../utils/mapping-utils.js'
import TideSite from './../services/tide-site.js'

export default {
  mapping: {
    name: 'name',
    _src: (src) => (process.env.NODE_ENV === 'development' ? src : undefined),
    siteLogo: (src) => {
      if (src.field_site_logo) {
        return {
          href: '/',
          src: src.field_site_logo.url,
          altText: src.field_site_logo.meta?.alt
        }
      }

      return null
    },
    showQuickExit: 'field_site_show_exit_site',
    acknowledgementHeader: (src) => {
      if (src.field_prominence_ack_to_country) {
        return src.field_prominence_ack_to_country
      }

      return src.field_acknowledgement_to_country
    },
    acknowledgementFooter: 'field_acknowledgement_to_country',
    copyrightHtml: (src) => {
      return getBody(src.field_site_footer_text?.processed)
    },
    footerLogos: (src) => {
      return src.field_site_footer_logos.map((logo) => {
        const link = getLinkFromField(logo, 'field_paragraph_cta')
        const image = getImageFromField(
          logo,
          'field_paragraph_media.field_media_image'
        )

        return {
          alt: link?.text,
          url: link?.url,
          src: image?.src
        }
      })
    },
    theme: (src) => {
      if (src.field_site_theme_values) {
        return src.field_site_theme_values.reduce((map, obj) => {
          map[obj.key] = obj.value
          return map
        }, {})
      }
    },
    socialImages: (src) => {
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
    menus: async function (src, tideSiteApi: TideSite) {
      const menuMain = await tideSiteApi.getSiteMenu(
        tideSiteApi.site,
        src.field_site_main_menu
      )
      const menuFooter = await tideSiteApi.getSiteMenu(
        tideSiteApi.site,
        src.field_site_footer_menu
      )

      return {
        menuMain,
        menuFooter
      }
    }
  },
  includes: [
    'field_site_og_image',
    'field_site_og_image.field_media_image',
    'field_site_main_menu',
    'field_site_footer_menu',
    'field_site_logo',
    'field_site_footer_logos',
    'field_site_footer_logos.field_paragraph_media.field_media_image'
  ]
}
