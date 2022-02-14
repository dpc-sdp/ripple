export default {
  mapping: {
    /* Name of site */
    name: 'name',
    /* Logo to use in header */
    siteLogo: (src): { url: String; meta: string } => {
      if (src.field_site_logo) {
        return {
          url: src.field_site_logo.url,
          meta: src.field_site_logo.meta
        }
      }
    },
    acknowledgement: 'field_prominence_ack_to_country',
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
