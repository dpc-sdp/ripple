import { breadcrumbs } from '@dpc-sdp/ripple-nuxt-tide/lib/core/breadcrumbs'

// Add breadcrumbs to page data
export default (context, pageData) => {
  if (pageData.tidePage && pageData.tidePage.path) {
    const path = pageData.tidePage.path ? pageData.tidePage.path.alias : context.route.path
    pageData.tidePage.breadcrumbs = breadcrumbs(path, pageData.tidePage.appPageTitle, context.store.state.tide.siteData.hierarchicalMenus.menuMain)
  }
}
