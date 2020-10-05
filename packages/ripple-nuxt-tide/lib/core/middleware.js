import logger from './logger'
import tideSideBar from './../middleware/sidebar.js'
import tideBreadCrumbs from './../middleware/breadcrumbs.js'
import tideMisc from './../middleware/misc.js'
import tideBanners from './../middleware/banners.js'
import tidePageHead from './../middleware/page-head.js'
import { tideAuthenticatedContent } from './../../modules/authenticated-content/lib/middleware'
import { tidePreview, tideShare } from '../../modules/preview/lib/helpers'
import { isPreviewPath, isShareLinkPath } from './path'
import { getSiteSectionData } from './utils/site-section.js'

// Fetch page data from Tide API by current path
/**
 * Tide dynamic route page async data processing.
 * @param {Object} context Nuxt context
 * @param {Object} pageData Tide page data
 * @param {string} pageData.tidePage - The Tide page data object, fields and processed data.
 * @param {string} pageData.tideErrorType - The error type user will see, '400' or 'other'.
 * @param {Object} pageData.tideLayout - Page layout configs.
 * @param {boolean} pageData.tideLayout.sidebar - Show sidebar.
 */
export default async function (context, pageData) {
  const mapping = context.app.$tideMapping
  let tideParams = {}
  const authToken = tideAuthenticatedContent(context, pageData)
  const headersConfig = { authToken, requestId: context.route.requestId }

  try {
    let response = null
    const isPreviewModuleEnabled = context.app.$tide.isModuleEnabled('preview')

    if (isPreviewModuleEnabled && isShareLinkPath(context.route.path)) {
      response = await tideShare(context, headersConfig)
    } else if (isPreviewModuleEnabled && isPreviewPath(context.route.path)) {
      response = await tidePreview(context, headersConfig)
    } else {
      response = await context.app.$tide.getPageByPath(context.route.path, tideParams, headersConfig)
    }

    // If redirect required, redirect.
    if (response && response.redirect_url) {
      return context.redirect(response.status_code, response.redirect_url)
    }

    pageData.tidePage = response
  } catch (error) {
    // Only show 404 or 500 to end user.
    // Handle error details internally and log them to log database.
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

  if (pageData.tidePage) {
    pageData.tidePage.appPageTitle = pageData.tidePage.title

    // Get site section data
    if (pageData.tidePage.section && pageData.tidePage.field_node_site) {
      pageData.tidePage.appSection = getSiteSectionData(pageData.tidePage.section, pageData.tidePage.field_node_site)
    }

    // Preprocess data
    // A list of async tasks to run concurrently.
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

    try {
      // Though below fields are called `landing_page_xxx`, but they are used by multiple content types in CMS.
      // So we'd just keep them in here.
      // Get dynamic components for page Header
      if (pageData.tidePage.field_landing_page_header) {
        const getMapping = mapping.get(pageData.tidePage.field_landing_page_header, 'landingPageHeader')
        addComponentFromPromise(getMapping, 'appHeaderComponents')
      }

      // Get dynamic components for page
      if (pageData.tidePage.field_landing_page_component) {
        const getMapping = mapping.get(pageData.tidePage.field_landing_page_component, 'landingPageComponents')
        addComponentFromPromise(getMapping, 'appDComponents')
      }

      asyncTasks.push(tideBanners(context, pageData))
      asyncTasks.push(tideSideBar(context, pageData, headersConfig))
    } catch (error) {
      if (process.server) {
        logger.error('Failed to get the mapped component.', { error, label: 'Middleware' })
      }
    }

    // Load all components asynchronously, allow fail.
    // This will allow a page rendered with a component failed in mapping.
    // However, the error will be logged.
    asyncTasks = asyncTasks.map(task => task.catch(error => {
      if (process.server) {
        logger.error('Tide async task is failed in resolve', { error, label: 'Middleware' })
      }
    }))

    await Promise.all(asyncTasks)
  }

  tideMisc(context, pageData)
  tideBreadCrumbs(context, pageData)
  tidePageHead(context, pageData)

  return pageData
}
