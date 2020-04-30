import { metatagConverter, pathToClass } from './tide-helper'
import { isTokenExpired, clientGetToken, serverGetToken, clientClearToken, clientSetProperties } from '../../modules/authenticated-content/lib/authenticate'
import { isPreviewPath } from '../../modules/authenticated-content/lib/preview'
import { clientDoNotTrack, serverDoNotTrack } from './tracking'
import logger from './logger'

// Fetch page data from Tide API by current path
export default async function (context, pageData) {
  pageData.tidePage = null
  pageData.tideErrorType = null

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

  const headersConfig = { authToken, requestId: context.route.requestId }

  try {
    let response = null

    if (authContentEnabled && isPreviewPath(context.route.path)) {
      if (!authToken) {
        return context.redirect('/login?destination=' + context.req.url)
      }
      const { 2: type, 3: id, 4: rev } = context.route.path.split('/')
      const section = context.route.query.section ? context.route.query.section : null
      response = await context.app.$tide.getPreviewPage(type, id, rev, section, tideParams, headersConfig)
    } else {
      response = await context.app.$tide.getPageByPath(context.route.path, tideParams, headersConfig)
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
    pageData.tidePage = response
  } catch (error) {
    pageData.tidePage = false
    switch (context.app.tideResErrCode) {
      case 404:
        pageData.tideErrorType = '404'
        context.store.dispatch('tide/setPageHead', { title: 'Page not found' })
        if (typeof context.res !== 'undefined') {
          context.res.statusCode = 404
        }
        break

      default:
        pageData.tideErrorType = 'other'
        context.store.dispatch('tide/setPageHead', { title: 'Error' })
        if (process.server) {
          if (typeof context.res !== 'undefined') {
            context.res.statusCode = 500
          }
          if (process.server) {
            logger.error('Failed to get the page data.', { error, label: 'Middleware' })
          }
        }
    }
  }

  context.store.dispatch('tide/setCurrentUrl', context.route.fullPath)

  if (pageData.tidePage) {
    // Allow custom class on page, custom middleware can extend this class for custom styling.
    pageData.tidePage.class = []
    // Add page classes based on tide page path
    let pageClass
    if (context.route.path === '/') {
      pageClass = 'home'
    } else {
      pageClass = pathToClass(context.route.path)
    }
    pageData.tidePage.class.push(`tide-page--${pageClass}`)

    // Preprocess data
    let asyncTasks = []
    const addComponentFromPromise = (promise, name) => {
      const addMapping = promise.then(res => {
        pageData.tidePage[name] = res
      }).catch(error => {
        if (process.server) {
          logger.error('Failed to add component for "%s"', name, { error, label: 'Middleware' })
        }
      })
      asyncTasks.push(addMapping)
    }

    // Sidebar logic
    // TODO: Update below check list for more sidebar items
    if (pageData.tidePage.field_show_related_content ||
        pageData.tidePage.field_show_social_sharing ||
        pageData.tidePage.field_show_whats_next ||
        pageData.tidePage.field_show_site_section_nav ||
        pageData.tidePage.field_show_publication_nav ||
        pageData.tidePage.field_landing_page_show_contact) {
      sidebar = true
    }

    // Head logic
    pageData.tidePage.appMetatag = metatagConverter(pageData.tidePage.metatag_normalized)

    try {
      // Get dynamic components for landing page Header
      if (pageData.tidePage.field_landing_page_header) {
        const getMapping = mapping.get(pageData.tidePage.field_landing_page_header, 'landingPageHeader')
        addComponentFromPromise(getMapping, 'appHeaderComponents')
      }

      // Get dynamic components for landing page
      if (pageData.tidePage.field_landing_page_component) {
        const getMapping = mapping.get(pageData.tidePage.field_landing_page_component, 'landingPageComponents')
        addComponentFromPromise(getMapping, 'appDComponents')
      }

      if (!pageData.tidePage.sidebarComponents || !Array.isArray(pageData.tidePage.sidebarComponents)) {
        pageData.tidePage.sidebarComponents = []
      }

      // TODO : Move this to a separate middleware
      if (sidebar) {
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
          pageData.tidePage.appContact = await mapping.get(pageData.tidePage.field_landing_page_contact)
          if (pageData.tidePage.appContact) {
            pageData.tidePage.sidebarComponents.push({
              name: 'rpl-contact',
              order: 104,
              data: pageData.tidePage.appContact.data
            })
          }
        }

        // social sharing
        if (pageData.tidePage.field_show_social_sharing) {
          pageData.tidePage.sidebarComponents.push({
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
      if (process.server) {
        logger.error('Failed to get the mapped component.', { error, label: 'Middleware' })
      }
    }

    // Hero banner
    // Hero banner background image
    let heroBgImage = ''
    if (pageData.tidePage.field_landing_page_hero_image && pageData.tidePage.field_landing_page_hero_image.field_media_image) {
      heroBgImage = pageData.tidePage.field_landing_page_hero_image.field_media_image.url
    }

    pageData.tidePage.appHeroBgImage = heroBgImage

    // Hero banner Core fields
    let heroBanner = {
      type: 'heroBanner',
      pageTitle: pageData.tidePage.appPageTitle,
      introText: pageData.tidePage.field_news_intro_text || pageData.tidePage.field_landing_page_intro_text || pageData.tidePage.field_page_intro_text || pageData.tidePage.field_profile_intro_text || ''
    }

    // Add hero banner modifier(paragraphs)
    if (pageData.tidePage.field_landing_page_hero_banner) {
      heroBanner = Object.assign(heroBanner, pageData.tidePage.field_landing_page_hero_banner)
    }

    // Additional fields may will be moved into core or modifier
    heroBanner.keyJourneys = pageData.tidePage.field_landing_page_key_journeys || {}
    heroBanner.theme = pageData.tidePage.field_landing_page_hero_theme
    heroBanner.showLinks = !heroBgImage
    heroBanner.logo = pageData.tidePage.field_landing_page_hero_logo ? pageData.tidePage.field_landing_page_hero_logo.field_media_image.url : null

    // Add bottom graphic.
    if (!heroBgImage && !pageData.tidePage.field_landing_page_c_primary) {
      const hasBottomImage = (pageData.tidePage.field_bottom_graphical_image && pageData.tidePage.field_bottom_graphical_image.field_media_image)
      heroBanner.backgroundGraphic = (hasBottomImage) ? pageData.tidePage.field_bottom_graphical_image.field_media_image.url : '/img/header-pattern-bottom.png'
    }

    addComponentFromPromise(mapping.get(heroBanner), 'appHeroBanner')

    // Store Page Data.
    let imageCaption = null
    if (pageData.tidePage.field_show_hero_image_caption) {
      imageCaption = pageData.tidePage.field_landing_page_hero_image && pageData.tidePage.field_landing_page_hero_image.field_media_caption
    }
    context.store.dispatch('tide/setPageData', { imageCaption })

    // Landing pages
    if (pageData.tidePage.field_landing_page_c_primary) {
      pageData.tidePage.field_landing_page_c_primary.field_show_c_primary_caption = pageData.tidePage.field_show_c_primary_caption
      addComponentFromPromise(mapping.get(pageData.tidePage.field_landing_page_c_primary), 'appCampaignPrimary')
    }

    if (pageData.tidePage.field_landing_page_c_secondary) {
      const cSecondary = pageData.tidePage.field_landing_page_c_secondary
      cSecondary.type = cSecondary.type + '--field_landing_page_c_secondary'
      addComponentFromPromise(mapping.get(cSecondary), 'appCampaignSecondary')
    }

    // breadcrumbs
    if (pageData.tidePage.path) {
      const { breadcrumbs } = require('@dpc-sdp/ripple-nuxt-tide/lib/core/breadcrumbs')
      const path = pageData.tidePage.path ? pageData.tidePage.path.alias : context.route.path
      pageData.tidePage.breadcrumbs = breadcrumbs(path, pageData.tidePage.appPageTitle, context.store.state.tide.siteData.hierarchicalMenus.menuMain)
    }

    // Do Not Track
    pageData.tidePage.doNotTrack = process.server ? serverDoNotTrack(context.req.headers) : clientDoNotTrack()

    // Load all components asynchronously, allow fail
    asyncTasks = asyncTasks.map(task => task.catch(error => {
      if (process.server) {
        logger.error('Tide async task is failed in resolve', { error, label: 'Middleware' })
      }
    }))

    await Promise.all(asyncTasks)
  }
  // Add Page meta tags
  if (pageData.tidePage) {
    // Set details.
    const title = pageData.tidePage.appMetatag.title || pageData.tidePage.appPageTitle || ''
    const description = pageData.tidePage.appMetatag.description || pageData.tidePage.field_news_intro_text || pageData.tidePage.field_landing_page_intro_text || pageData.tidePage.field_page_intro_text || pageData.tidePage.field_landing_page_summary || ''
    const url = context.store.state.tide.currentUrl || ''
    const siteSection = pageData.tidePage.section && pageData.tidePage.field_node_site && pageData.tidePage.field_node_site.find(site => site.drupal_internal__tid === parseInt(pageData.tidePage.section, 10))

    // Set image.
    const featuredImage = pageData.tidePage.field_featured_image ? pageData.tidePage.field_featured_image.field_media_image : null
    const sectionImage = siteSection && siteSection.field_site_og_image ? siteSection.field_site_og_image.field_media_image : null
    const primaryImage = pageData.tidePage.field_node_primary_site && pageData.tidePage.field_node_primary_site.field_site_og_image ? pageData.tidePage.field_node_primary_site.field_site_og_image.field_media_image : null
    const mediaImage = (featuredImage || sectionImage || primaryImage || null)
    const image = mediaImage ? mediaImage.url : `${context.store.state.tide.protocol + '//' + context.store.state.tide.host}/img/social-media-image.jpg`
    const imageAlt = mediaImage ? mediaImage.meta.alt : ''

    context.store.dispatch('tide/setPageHead', {
      htmlAttrs: {
        lang: pageData.tidePage.langcode || 'en'
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
        { name: 'content-type', content: pageData.tidePage.type && pageData.tidePage.type.replace('node--', '') }
      ]
    })
  }

  pageData.tideLayout = {
    sidebar: sidebar
  }

  return pageData
}
