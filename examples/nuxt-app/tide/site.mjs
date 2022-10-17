import { getImageFromField } from '@dpc-sdp/ripple-tide-api'
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
    socialImages: (src) => {
      const socialImages = {
        twitter: {},
        og: {}
      }
      if (
        src.field_site_og_image &&
        src.field_site_og_image.hasOwnProperty('field_media_image')
      ) {
        socialImages.og = getImageFromField(src, ['field_site_og_image'])
      }
      if (
        src.field_site_twitter_image &&
        src.field_site_twitter_image.hasOwnProperty('field_media_image')
      ) {
        socialImages.twitter = getImageFromField(src, [
          'field_site_twitter_image'
        ])
      }
      return socialImages
    },
    menus: async function (src, tideSiteApi) {
      const menuMain = await tideSiteApi.getSiteMenu(tideSiteApi.site, src.field_site_main_menu)
      const menuFooter = await tideSiteApi.getSiteMenu(tideSiteApi.site, src.field_site_footer_menu)

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
