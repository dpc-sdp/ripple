import { TidePageApi, getSiteSection } from '@dpc-sdp/ripple-tide-api'

export const map = async (src, tidePageApi: TidePageApi) => {
  if (!src.field_show_site_section_nav) {
    return null
  }

  // With the correct site/section id, we can now choose the correct site data from 'field_node_site'
  const siteData = getSiteSection(src._sectionId, src)

  if (!siteData) {
    return null
  }

  // Finally, this site data will contain a reference to the menu we need to fetch
  const menuData = siteData.field_site_main_menu
  // if a menu is deleted Drupal returns an id of 'missing'
  if (menuData?.id === 'missing') {
    return null
  }
  const menu = await tidePageApi.getSiteMenu(
    tidePageApi.site,
    menuData,
    src.path?.alias || src.path?.url
  )

  return {
    title:
      siteData.field_site_name || src.field_landing_page_nav_title,
    items: menu
  }
}

export const includes = ['field_node_site.field_site_main_menu']
