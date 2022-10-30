import { getImageFromField } from './../utils/mapping-utils.js'
import TideSite from './../services/tide-site.js'

export default {
  mapping: {
    name: 'name',
    siteLogo: (src) => {
      if (src.field_site_logo) {
        return {
          url: src.field_site_logo.url,
          meta: src.field_site_logo.meta
        }
      }
    },
    acknowledgement: 'field_prominence_ack_to_country',
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
    'field_site_footer_menu'
  ]
}
