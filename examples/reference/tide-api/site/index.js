import { fieldMappingUtils as utils } from '@dpc-sdp/ripple-tide-api'
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
      const socialImages = {}
      if (
        src.field_site_og_image &&
        src.field_site_og_image.hasOwnProperty('field_media_image')
      ) {
        socialImages.og = utils.getImageFromField(src, ['field_site_og_image'])
      }
      if (
        src.field_site_twitter_image &&
        src.field_site_twitter_image.hasOwnProperty('field_media_image')
      ) {
        socialImages.twitter = utils.getImageFromField(src, [
          'field_site_twitter_image'
        ])
      }
      return socialImages
    },
    menus: async function (src) {
      const menuFields = {
        menuMain: 'field_site_main_menu',
        menuFooter: 'field_site_footer_menu'
      }
      const menus = await this.getSiteMenus(src, menuFields)
      if (menus) {
        return menus
      }
      return []
    }
  },
  includes: [
    'field_site_og_image',
    'field_site_og_image.field_media_image',
    'field_site_main_menu',
    'field_site_footer_menu'
  ]
}
