// This custom middleware allows you to override the data passed to the Tide page
// The `pageData` param can be modified for variables used on the page.
import { getPageHeadConfig } from '@dpc-sdp/ripple-nuxt-tide/lib/core/tide-helper.js'

export default {
  tideMedia: (context, pageData) => {
    if (!pageData.tidePage) {
      return
    }

    switch (pageData.tidePage.type) {
      case 'media--embedded_video':
        pageData.tideLayout.sidebar = true
        const title = pageData.tidePage.name
        pageData.tidePage.appPageTitle = title
        pageData.tidePage.appHeroBanner.data.title = title

        const headData = {
          langcode: pageData.tidePage.langcode,
          title,
          description: '',
          url: context.store.state.tide.currentUrl,
          pageType: 'embedded_video',
          image: pageData.tidePage.thumbnail.url,
          imageAlt: pageData.tidePage.thumbnail.meta.alt
        }
        context.store.dispatch('tide/setPageHead', getPageHeadConfig(headData))
        break
    }
  }
}
