// TODO : Move this to a separate middleware
import logger from './../core/logger'

const tideSideBar = async (context, pageData, headersConfig) => {
  const sidebarToggles = (pageData.tidePage.field_show_related_content ||
    pageData.tidePage.field_show_social_sharing ||
    pageData.tidePage.field_show_whats_next ||
    pageData.tidePage.field_show_site_section_nav ||
    pageData.tidePage.field_show_publication_nav ||
    pageData.tidePage.field_landing_page_show_contact)

  if (sidebarToggles === false) {
    pageData.tideLayout.sidebar = false
    return
  }

  pageData.tideLayout.sidebar = true
  pageData.tidePage.sidebarComponents = []

  // Related content
  if (pageData.tidePage.field_show_related_content) {
    const links = pageData.tidePage.field_related_links
      .filter(link => link.field_paragraph_link && link.field_paragraph_link.title)
      .map(link => {
        return {
          text: link.field_paragraph_link.title,
          url: link.field_paragraph_link.url ? link.field_paragraph_link.url : link.field_paragraph_link.uri
        }
      })

    if (links && links.length > 0) {
      pageData.tidePage.sidebarComponents.push({
        name: 'rpl-related-links',
        order: 101,
        data: {
          title: 'Related links',
          links
        }
      })
    }
  }
  //  Whats next
  if (pageData.tidePage.field_show_whats_next) {
    const links = pageData.tidePage.field_whats_next
      .filter(link => link.field_paragraph_link && link.field_paragraph_link.title)
      .map(link => {
        return {
          text: link.field_paragraph_link.title,
          url: link.field_paragraph_link.url
            ? link.field_paragraph_link.url
            : link.field_paragraph_link.uri
        }
      })

    if (links) {
      pageData.tidePage.sidebarComponents.push({
        name: 'rpl-whats-next',
        order: 103,
        data: {
          title: 'What\'s next?',
          links
        }
      })
    }
  }
  // site section
  if (pageData.tidePage.section) {
    // TODO: SDPA-4675 It's unnecessary query site data here, as we can get the site section data from page field_node_site, which includes the menu ids.
    // We should just get the menu here, which can reduce Tide requests number from at 3 to 1 here.
    const siteSectionData = await context.app.$tide.getSiteData(headersConfig, pageData.tidePage.section)

    if (siteSectionData instanceof Error) {
      if (process.server) {
        logger.error('Could not get site section data from Tide API.', { error: siteSectionData, label: 'Middleware' })
      }
    } else {
      // Section navigation component will only use the main menu.
      const addSectionNavMenu = siteSectionData.hierarchicalMenus.menuMain
      // save alerts if site section has them
      if (context.app.$tide.isModuleEnabled('alert')) {
        if (siteSectionData.site_alerts && siteSectionData.site_alerts.length > 0) {
          await context.store.dispatch('tideAlerts/setAlerts', { alerts: siteSectionData.site_alerts, siteSection: siteSectionData.drupal_internal__tid })
        }
      }

      if (pageData.tidePage.field_show_site_section_nav && addSectionNavMenu && pageData.tidePage.field_landing_page_nav_title) {
        pageData.tidePage.sidebarComponents.push({
          name: 'rpl-site-section-navigation',
          order: 100,
          data: {
            menu: addSectionNavMenu,
            title: pageData.tidePage.field_landing_page_nav_title,
            activeLink: context.route.path
          }
        })
      }
    }
  }

  // contact us
  if (pageData.tidePage.field_landing_page_show_contact && pageData.tidePage.field_landing_page_contact) {
    pageData.tidePage.appContact = await context.app.$tideMapping.get(pageData.tidePage.field_landing_page_contact)
    if (pageData.tidePage.appContact && (pageData.tidePage.appContact instanceof Array || pageData.tidePage.appContact instanceof Object)) {
      const contact = pageData.tidePage.appContact
      const componentName = 'rpl-contact'
      const order = 104

      if (Array.isArray(contact)) {
        for (const key in contact) {
          pageData.tidePage.sidebarComponents.push({
            name: componentName,
            order: order,
            data: contact[key].data
          })
        }
      } else { // TODO this is added for backward compatibility - remove this Object support when we stop supporting single contact in API
        pageData.tidePage.sidebarComponents.push({
          name: componentName,
          order: order,
          data: contact.data
        })
      }
    }
  }

  // social sharing
  if (pageData.tidePage.field_show_social_sharing) {
    const currentSiteDomain = context.store.state.tide.currentDomain
    pageData.tidePage.sidebarComponents.push({
      name: 'rpl-share-this',
      order: 105,
      data: {
        title: 'Share this page',
        url: `https://${currentSiteDomain}${context.route.path}`
      }
    })
  }

  return true
}

export default tideSideBar
