import { metatagConverter, pathToClass } from './tide-helper'
import { isTokenExpired, clientGetToken, serverGetToken, clientClearToken, clientSetProperties } from '../../modules/authenticated-content/lib/authenticate'
import { isPreviewPath } from '../../modules/authenticated-content/lib/preview'
import logger from './logger'

// Fetch page data from Tide API by current path
export default async function (context, results) {
  results.tidePage = null
  results.tideErrorType = null
  // TODO: refactor below page process logic.
  // Currently we just put logic here for a quick work,
  // review them and move them into tide modules if possible.
  let sidebar = false
  const mapping = context.app.$tideMapping
  let tideParams = {}

  const authContentEnabled = context.app.$tide.isModuleEnabled('authenticatedContent')
  let authToken = null
  if (authContentEnabled) {
    // Get JWT token
    if (process.client) {
      authToken = clientGetToken()
    } else {
      authToken = serverGetToken(context.req.headers.cookie)
    }
    if (authToken) {
      // If token expired clear the persisted state
      if (isTokenExpired(authToken)) {
        if (process.client) {
          clientClearToken(context.store)
        }
        authToken = null
      }
    }
    if (process.client) {
      clientSetProperties(context.route.path, context.store)
    }
  }

  try {
    let response = null

    if (authContentEnabled && isPreviewPath(context.route.path)) {
      if (!authToken) {
        return context.redirect('/login?destination=' + context.req.url)
      }
      const { 2: type, 3: id, 4: rev } = context.route.path.split('/')
      const section = context.route.query.section ? context.route.query.section : null
      response = await context.app.$tide.getPreviewPage(type, id, rev, section, tideParams, authToken)
    } else {
      response = await context.app.$tide.getPageByPath(context.route.fullPath, tideParams, authToken)
    }

    // If redirect required.
    if (response.redirect_url) {
      return context.redirect(response.status_code, response.redirect_url)
    }

    if (context.route.path === '/') {
      response.appIsHome = true
    }

    // Page type logic
    switch (response.type) {
      case 'media--embedded_video':
        response.appPageTitle = response.name
        sidebar = true
        break

      default:
        response.appPageTitle = response.title
    }
    results.tidePage = response
  } catch (error) {
    results.tidePage = false
    switch (context.app.tideResErrCode) {
      case 404:
        results.tideErrorType = '404'
        break

      default:
        results.tideErrorType = 'other'
        if (process.server) {
          logger.error('Failed to get the page data.', { error })
        }
    }
  }

  context.store.dispatch('tide/setCurrentUrl', context.route.fullPath)

  if (results.tidePage) {
    // Allow custom class on page, custom middleware can extend this class for custom styling.
    results.tidePage.class = []
    // Add page classes based on tide page path
    let pageClass
    if (context.route.path === '/') {
      pageClass = 'home'
    } else {
      pageClass = pathToClass(context.route.path)
    }
    results.tidePage.class.push(`tide-page--${pageClass}`)

    // Preprocess data
    let asyncTasks = []
    const addComponentFromPromise = (promise, name) => {
      const addMapping = promise.then(res => {
        results.tidePage[name] = res
      })
      asyncTasks.push(addMapping)
    }

    // Sidebar logic
    // TODO: Update below check list for more sidebar items
    if (results.tidePage.field_show_related_content ||
        results.tidePage.field_show_social_sharing ||
        results.tidePage.field_show_whats_next ||
        results.tidePage.field_show_site_section_nav ||
        results.tidePage.field_show_publication_nav ||
        results.tidePage.field_landing_page_show_contact) {
      sidebar = true
    }

    // Head logic
    results.tidePage.appMetatag = metatagConverter(results.tidePage.metatag_normalized)

    try {
      // Get dynamic components for landing page Header
      if (results.tidePage.field_landing_page_header) {
        const getMapping = mapping.get(results.tidePage.field_landing_page_header, 'landingPageHeader')
        addComponentFromPromise(getMapping, 'appHeaderComponents')
      }

      // Get dynamic components for landing page
      if (results.tidePage.field_landing_page_component) {
        const getMapping = mapping.get(results.tidePage.field_landing_page_component, 'landingPageComponents')
        addComponentFromPromise(getMapping, 'appDComponents')
      }

      if (!results.tidePage.sidebarComponents || !Array.isArray(results.tidePage.sidebarComponents)) {
        results.tidePage.sidebarComponents = []
      }

      // TODO : Move this to a separate middleware
      if (sidebar) {
        // Related content
        if (results.tidePage.field_show_related_content) {
          const links = results.tidePage.field_related_links
            .filter(link => link.field_paragraph_link && link.field_paragraph_link.title)
            .map(link => {
              return {
                text: link.field_paragraph_link.title,
                url: link.field_paragraph_link.url ? link.field_paragraph_link.url : link.field_paragraph_link.uri
              }
            })

          if (links && links.length > 0) {
            results.tidePage.sidebarComponents.push({
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
        if (results.tidePage.field_show_whats_next) {
          const links = results.tidePage.field_whats_next
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
            results.tidePage.sidebarComponents.push({
              name: 'rpl-whats-next',
              order: 103,
              data: {
                title: 'What\'s next?',
                links
              }
            })
          }
        }
        // site section nav
        if (results.tidePage.field_show_site_section_nav) {
          const addSectionNavMenu = await context.app.$tide.getSiteData(results.tidePage.section).then(appSectionData => {
            // Section navigation component will only use the main menu.
            return appSectionData.hierarchicalMenus.menuMain
          })
          if (addSectionNavMenu && results.tidePage.field_landing_page_nav_title) {
            results.tidePage.sidebarComponents.push({
              name: 'rpl-site-section-navigation',
              order: 100,
              data: {
                menu: addSectionNavMenu,
                title: results.tidePage.field_landing_page_nav_title,
                activeLink: context.route.path
              }
            })
          }
        }

        // contact us
        if (results.tidePage.field_landing_page_show_contact && results.tidePage.field_landing_page_contact) {
          results.tidePage.appContact = await mapping.get(results.tidePage.field_landing_page_contact)
          if (results.tidePage.appContact) {
            results.tidePage.sidebarComponents.push({
              name: 'rpl-contact',
              order: 104,
              data: results.tidePage.appContact.data
            })
          }
        }

        // social sharing
        if (results.tidePage.field_show_social_sharing) {
          results.tidePage.sidebarComponents.push({
            name: 'rpl-share-this',
            order: 105,
            data: {
              title: 'Share this',
              url: context.store.state.absoluteUrl
            }
          })
        }
      }
    } catch (error) {
      // TODO: Take some action if above mapping error happens.
      if (process.server) {
        logger.error('Failed to get the mapped component.', { error })
      }
    }

    // Hero banner
    // Hero banner background image
    let heroBgImage = ''
    if (results.tidePage.field_landing_page_hero_image && results.tidePage.field_landing_page_hero_image.field_media_image) {
      heroBgImage = results.tidePage.field_landing_page_hero_image.field_media_image.url
    }

    results.tidePage.appHeroBgImage = heroBgImage

    // Hero banner Core fields
    let heroBanner = {
      type: 'heroBanner',
      pageTitle: results.tidePage.appPageTitle,
      introText: results.tidePage.field_news_intro_text || results.tidePage.field_landing_page_intro_text || results.tidePage.field_page_intro_text || results.tidePage.field_profile_intro_text || ''
    }

    // Add hero banner modifier(paragraphs)
    if (results.tidePage.field_landing_page_hero_banner) {
      heroBanner = Object.assign(heroBanner, results.tidePage.field_landing_page_hero_banner)
    }

    // Additional fields may will be moved into core or modifier
    heroBanner.keyJourneys = results.tidePage.field_landing_page_key_journeys || {}
    heroBanner.theme = results.tidePage.field_landing_page_hero_theme
    heroBanner.showLinks = !heroBgImage
    heroBanner.logo = results.tidePage.field_landing_page_hero_logo ? results.tidePage.field_landing_page_hero_logo.field_media_image.url : null

    // Add bottom graphic.
    if (!heroBgImage && !results.tidePage.field_landing_page_c_primary) {
      const hasBottomImage = (results.tidePage.field_bottom_graphical_image && results.tidePage.field_bottom_graphical_image.field_media_image)
      heroBanner.backgroundGraphic = (hasBottomImage) ? results.tidePage.field_bottom_graphical_image.field_media_image.url : '/img/header-pattern-bottom.png'
    }

    addComponentFromPromise(mapping.get(heroBanner), 'appHeroBanner')

    // Landing pages
    if (results.tidePage.field_landing_page_c_primary) {
      addComponentFromPromise(mapping.get(results.tidePage.field_landing_page_c_primary), 'appCampaignPrimary')
    }

    if (results.tidePage.field_landing_page_c_secondary) {
      const cSecondary = results.tidePage.field_landing_page_c_secondary
      cSecondary.type = cSecondary.type + '--field_landing_page_c_secondary'
      addComponentFromPromise(mapping.get(cSecondary), 'appCampaignSecondary')
    }

    // breadcrumbs
    if (results.tidePage.path) {
      const { breadcrumbs } = require('@dpc-sdp/ripple-nuxt-tide/lib/core/breadcrumbs')
      const path = results.tidePage.path ? results.tidePage.path.alias : context.route.path
      results.tidePage.breadcrumbs = breadcrumbs(path, results.tidePage.appPageTitle, context.store.state.tide.siteData.hierarchicalMenus.menuMain)
    }

    // Load all components asynchronously, allow fail
    asyncTasks = asyncTasks.map(task => task.catch(error => {
      if (process.server) {
        logger.error('Tide async task is failed in resolve', { error, label: 'Middleware' })
      }
    }))

    await Promise.all(asyncTasks)
  }
  // Add Page meta tags
  if (results.tidePage) {
    // Set details.
    const title = results.tidePage.appMetatag.title || results.tidePage.appPageTitle || 'Page not found'
    const description = results.tidePage.appMetatag.description || results.tidePage.field_news_intro_text || results.tidePage.field_landing_page_intro_text || results.tidePage.field_page_intro_text || ''
    const url = context.store.state.absoluteUrl || ''
    // Set image.
    const mediaImage = results.tidePage.field_featured_image ? results.tidePage.field_featured_image.field_media_image : null
    const image = mediaImage ? mediaImage.url : ''
    const imageAlt = mediaImage ? mediaImage.meta.alt : ''
    const siteSection = results.tidePage.field_node_site && results.tidePage.field_node_site.find(site => site.drupal_internal__tid === parseInt(results.tidePage.section, 10))

    results.tidePage.head = {
      htmlAttrs: {
        lang: results.tidePage.langcode || 'en'
      },
      title: title,
      meta: [
        { name: 'description', hid: 'description', content: description },
        // Open Graph
        { name: 'og:title', hid: 'og:title', content: title },
        { name: 'og:description', hid: 'og:description', content: description },
        { name: 'og:type', hid: 'og:type', content: 'website' },
        { name: 'og:url', hid: 'og:url', content: url },
        { name: 'og:image', hid: 'og:image', content: image },
        // Twitter Card
        { name: 'twitter:card', hid: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', hid: 'twitter:site', content: url },
        { name: 'twitter:title', hid: 'twitter:title', content: title },
        { name: 'twitter:description', hid: 'twitter:description', content: description },
        { name: 'twitter:image', hid: 'twitter:image', content: image },
        { name: 'twitter:image:alt', hid: 'hid:image:alt', content: imageAlt },
        // Custom page meta
        { name: 'sitesection', content: siteSection ? siteSection.name : '' },
        { name: 'content-type', content: results.tidePage.type && results.tidePage.type.replace('node--', '') }
      ]
    }
  }

  results.tideLayout = {
    sidebar: sidebar
  }

  return results
}
