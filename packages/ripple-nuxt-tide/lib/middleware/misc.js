import { clientDoNotTrack, serverDoNotTrack } from './../core/tracking'
import { metatagConverter, pathToClass } from './../core/tide-helper'

// Add breadcrumbs to page data
export default (context, pageData) => {
  if (pageData.tidePage) {
    // meta tag
    let metatag = pageData.tidePage.hasOwnProperty('metatag_normalized') ? pageData.tidePage.metatag_normalized : pageData.tidePage.metatag
    pageData.tidePage.appMetatag = metatagConverter(metatag)

    // Homepage
    if (context.route.path === '/') {
      pageData.tidePage.appIsHome = true
    }

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

    // Set current url
    context.store.dispatch('tide/setCurrentUrl', context.route.fullPath)

    // Do Not Track
    pageData.tidePage.doNotTrack = process.server ? serverDoNotTrack(context.req.headers) : clientDoNotTrack()
  }
}
